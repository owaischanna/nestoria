import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import dbConnect from '@/lib/mongodb';
import User from '@/app/models/User';
import Conversation from '@/app/models/Conversation';
import Message from '@/app/models/Message'; // Needed for last message details

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

export async function GET(request) {
    console.log("\n--- [GET /api/conversations] ---");
    try {
        await dbConnect();

        const auth = await verifyAuth(request);
        if (auth.error) {
            return NextResponse.json({ message: auth.error }, { status: auth.status });
        }
        const { user } = auth;

        console.log(`Fetching conversations for user: ${user.userId}`);

        const conversations = await Conversation.find({ participants: user.userId })
            .populate({
                path: 'participants',
                match: { _id: { $ne: user.userId } }, // Populate the *other* participant
                select: 'firstName lastName email' // Select fields you need
            })
            .populate({
                path: 'lastMessage',
                select: 'content sender createdAt readBy' // Select fields for the preview
            })
            .sort({ updatedAt: -1 }); // Sort by most recently updated

        console.log(`Found ${conversations.length} conversations.`);

        return NextResponse.json({
            message: "Conversations fetched successfully.",
            data: conversations
        }, { status: 200 });

    } catch (error) {
        console.error("Error fetching conversations:", error);
        return NextResponse.json(
            { message: "An error occurred.", error: error.message },
            { status: 500 }
        );
    }
}