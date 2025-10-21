import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import dbConnect from '@/lib/mongodb';
import User from '@/app/models/User';
import Conversation from '@/app/models/Conversation';
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

export async function POST(request) {
    console.log("\n--- [POST /api/conversations/initiate] ---");
    try {
        await dbConnect();

        const auth = await verifyAuth(request);
        if (auth.error) {
            return NextResponse.json({ message: auth.error }, { status: auth.status });
        }
        const { user: renter } = auth; // The logged-in user is the renter

        const { hostId } = await request.json();

        if (!hostId || !mongoose.Types.ObjectId.isValid(hostId)) {
            return NextResponse.json({ message: "Invalid host ID provided." }, { status: 400 });
        }

        if (renter.userId === hostId) {
            return NextResponse.json({ message: "Cannot initiate conversation with yourself." }, { status: 400 });
        }

        console.log(`Initiating conversation between Renter: ${renter.userId} and Host: ${hostId}`);

        // Find existing conversation (order doesn't matter with $all)
        let conversation = await Conversation.findOne({
            participants: { $all: [renter.userId, hostId] }
        });

        if (conversation) {
            console.log("Existing conversation found:", conversation._id);
            return NextResponse.json({
                message: "Existing conversation found.",
                conversationId: conversation._id
            }, { status: 200 });
        } else {
            // Create new conversation
            console.log("No existing conversation found. Creating new one...");
            const newConversation = new Conversation({
                participants: [renter.userId, hostId]
            });
            await newConversation.save();
            console.log("New conversation created:", newConversation._id);
            return NextResponse.json({
                message: "New conversation created.",
                conversationId: newConversation._id
            }, { status: 201 });
        }

    } catch (error) {
        console.error("Error initiating conversation:", error);
        return NextResponse.json(
            { message: "An error occurred.", error: error.message },
            { status: 500 }
        );
    }
}