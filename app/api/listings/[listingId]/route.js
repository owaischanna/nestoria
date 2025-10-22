import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import dbConnect from '@/lib/mongodb';
import Listing from '@/app/models/Listing';
import User from '@/app/models/User';
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

export async function GET(request, context) {
    // Log entry point immediately
    console.log("\n--- [GET /api/listings/[id] Triggered] ---");
    console.log("Timestamp:", new Date().toISOString());

    try {
        console.log("Attempting DB connection...");
        await dbConnect();
        console.log("DB connection successful.");

        // FIX: Extract listingId *after* the first await
        const listingId = context?.params?.listingId;
        console.log(`Extracted listingId: ${listingId}`); // Log after extraction

        // Validation now happens after extraction
        if (!listingId || !mongoose.Types.ObjectId.isValid(listingId)) {
            console.error("Validation Error: Invalid or missing listingId.");
            return NextResponse.json({ message: "Invalid listing ID." }, { status: 400 });
        }

        console.log(`Continuing fetch for listingId: ${listingId}`);

        const auth = await verifyAuth(request);
        if (auth.error) {
            console.error("Auth failed:", auth.error);
            return NextResponse.json({ message: auth.error }, { status: auth.status });
        }

        console.log(`Fetching listing details for ID: ${listingId}`);

        const listing = await Listing.findById(listingId)
            .populate({
                path: 'hostId',
                select: 'firstName lastName email createdAt'
            });

        if (!listing) {
            console.log(`Listing not found: ${listingId}`);
            return NextResponse.json({ message: "Listing not found." }, { status: 404 });
        }

        console.log(`Listing found: "${listing.listingTitle}"`);

        return NextResponse.json({
            message: "Listing details fetched successfully!",
            data: listing
        }, { status: 200 });

    } catch (error) {
        console.error("Error fetching listing details:", error);
        // Log the specific listingId that caused the error, if available
        const erroredListingId = context?.params?.listingId;
        console.error(`Error occurred for listingId: ${erroredListingId}`);
        return NextResponse.json(
            { message: "An error occurred.", error: error.message },
            { status: 500 }
        );
    }
}