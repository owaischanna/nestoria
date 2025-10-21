import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import dbConnect from '@/lib/mongodb';
import User from '@/app/models/User';
import Conversation from '@/app/models/Conversation';
import Message from '@/app/models/Message';
import mongoose from 'mongoose';

async function verifyAuth(request) {
    const token = request.cookies.get('authToken')?.value;
    if (!token) return { error: "Missing token.", status: 401 };
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        return { user: decoded };
    } catch (error) {
        return { error: "Invalid token.", status: 401 };
    }
}

export async function GET(request, context) { // Renamed second arg to 'context' for clarity
    console.log("\n--- [GET /api/messages/[id]] ---");
    console.log("Received context:", context); // Log the entire context object

    // Safely access params from context
    const conversationId = context?.params?.conversationId;
    console.log("Extracted conversationId:", conversationId); // Log the extracted ID

    if (!conversationId || !mongoose.Types.ObjectId.isValid(conversationId)) {
        console.error("Validation Error: Invalid or missing conversationId.");
        return NextResponse.json({ message: "Invalid conversation ID." }, { status: 400 });
    }

    // Log continues...
    console.log(`Processing GET request for conversationId: ${conversationId}`);

    try {
        await dbConnect();

        const auth = await verifyAuth(request);
        if (auth.error) {
            console.error("Auth failed:", auth.error);
            return NextResponse.json({ message: auth.error }, { status: auth.status });
        }
        const { user } = auth;

        const conversation = await Conversation.findOne({
            _id: conversationId,
            participants: user.userId
        }).populate({
            path: 'participants',
            select: 'firstName lastName email role'
        });

        if (!conversation) {
            console.log(`User ${user.userId} not authorized or conversation ${conversationId} not found.`);
            return NextResponse.json({ message: "Conversation not found or access denied." }, { status: 404 });
        }

        console.log(`Fetching messages for conversation: ${conversationId}`);

        const messages = await Message.find({ conversationId })
            .populate('sender', 'firstName lastName email role')
            .sort({ createdAt: 1 });

        console.log(`Found ${messages.length} messages.`);

        return NextResponse.json({
            message: "Messages fetched successfully.",
            data: {
                messages: messages,
                conversationDetails: conversation
            }
        }, { status: 200 });

    } catch (error) {
        console.error("Error fetching messages:", error);
        return NextResponse.json(
            { message: "An error occurred.", error: error.message },
            { status: 500 }
        );
    }
}