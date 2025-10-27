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

/**
 * @description GET a specific listing by its ID.
 */
export async function GET(request, context) {
    const listingId = context?.params?.listingId;
    console.log(`\n--- [GET /api/listings/${listingId}] ---`);

    if (!listingId || !mongoose.Types.ObjectId.isValid(listingId)) {
        return NextResponse.json({ message: "Invalid listing ID." }, { status: 400 });
    }

    try {
        await dbConnect();

        const auth = await verifyAuth(request);
        if (auth.error) {
            return NextResponse.json({ message: auth.error }, { status: auth.status });
        }

        const listing = await Listing.findById(listingId)
            .populate({
                path: 'hostId',
                select: 'firstName lastName email createdAt'
            });

        if (!listing) {
            return NextResponse.json({ message: "Listing not found." }, { status: 404 });
        }

        return NextResponse.json({
            message: "Listing details fetched successfully!",
            data: listing
        }, { status: 200 });

    } catch (error) {
        console.error("Error fetching listing details:", error);
        return NextResponse.json(
            { message: "An error occurred.", error: error.message },
            { status: 500 }
        );
    }
}

/**
 * @description UPDATE a specific listing by its ID.
 */
export async function PUT(request, context) {
    const listingId = context?.params?.listingId;
    console.log(`\n--- [PUT /api/listings/${listingId}] ---`);

    if (!listingId || !mongoose.Types.ObjectId.isValid(listingId)) {
        return NextResponse.json({ message: "Invalid listing ID." }, { status: 400 });
    }

    try {
        await dbConnect();

        const auth = await verifyAuth(request);
        if (auth.error) {
            return NextResponse.json({ message: auth.error }, { status: auth.status });
        }

        const { user: host } = auth;
        const body = await request.json();

        const listing = await Listing.findById(listingId);
        if (!listing) {
            return NextResponse.json({ message: "Listing not found." }, { status: 404 });
        }

        // Authorization: Check if the logged-in user is the host
        if (listing.hostId.toString() !== host.userId) {
            return NextResponse.json({ message: "Access denied. You are not the owner of this listing." }, { status: 403 });
        }

        // Exclude fields that shouldn't be updated this way
        delete body._id;
        delete body.hostId;
        delete body.createdAt;
        delete body.updatedAt;

        console.log(`Updating listing ${listingId} with data...`);

        const updatedListing = await Listing.findByIdAndUpdate(
            listingId,
            { $set: body }, // Use $set to apply updates
            { new: true, runValidators: true } // Return the new doc and run schema validation
        );

        return NextResponse.json({
            message: "Listing updated successfully!",
            data: updatedListing
        }, { status: 200 });

    } catch (error) {
        console.error("Error updating listing:", error);
        if (error.name === 'ValidationError') {
            return NextResponse.json({ message: "Validation Error", error: error.message }, { status: 400 });
        }
        return NextResponse.json(
            { message: "An error occurred while updating the listing.", error: error.message },
            { status: 500 }
        );
    }
}

/**
 * @description DELETE a specific listing by its ID.
 */
export async function DELETE(request, context) {
    const listingId = context?.params?.listingId;
    console.log(`\n--- [DELETE /api/listings/${listingId}] ---`);

    if (!listingId || !mongoose.Types.ObjectId.isValid(listingId)) {
        return NextResponse.json({ message: "Invalid listing ID." }, { status: 400 });
    }

    try {
        await dbConnect();

        const auth = await verifyAuth(request);
        if (auth.error) {
            return NextResponse.json({ message: auth.error }, { status: auth.status });
        }

        const { user: host } = auth;
        const listing = await Listing.findById(listingId);

        if (!listing) {
            return NextResponse.json({ message: "Listing not found." }, { status: 404 });
        }

        // Authorization: Check if the logged-in user is the host
        if (listing.hostId.toString() !== host.userId) {
            return NextResponse.json({ message: "Access denied. You are not the owner of this listing." }, { status: 403 });
        }

        console.log(`Deleting listing ${listingId}...`);

        await Listing.findByIdAndDelete(listingId);

        // You might also want to delete related applications, messages, etc.
        // For example: await Application.deleteMany({ listingId: listingId });

        return NextResponse.json({
            message: "Listing deleted successfully!"
        }, { status: 200 });

    } catch (error) {
        console.error("Error deleting listing:", error);
        return NextResponse.json(
            { message: "An error occurred while deleting the listing.", error: error.message },
            { status: 500 }
        );
    }
}