import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import dbConnect from '@/lib/mongodb';
import User from '@/app/models/User';
import Listing from '@/app/models/Listing'; // Import Listing to count properties
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
 * @description GET the logged-in user's profile and host statistics.
 */
export async function GET(request) {
    console.log("\n--- [GET /api/user/me] ---");
    try {
        await dbConnect();
        console.log("Database connected.");

        const auth = await verifyAuth(request);
        if (auth.error) {
            console.error("Auth failed:", auth.error);
            return NextResponse.json({ message: auth.error }, { status: auth.status });
        }

        const { user: decodedToken } = auth;
        console.log(`Authenticated user: ${decodedToken.email}`);

        const user = await User.findById(decodedToken.userId).select('-password').lean(); // .lean() for a plain object
        if (!user) {
            return NextResponse.json({ message: "User not found." }, { status: 404 });
        }

        // --- Calculate Host Statistics ---
        let stats = {};
        if (user.role === 'host') {
            console.log("User is a host. Fetching stats...");
            const totalProperties = await Listing.countDocuments({ hostId: user._id });

            // NOTE: Bookings, Reviews, and Response Rate require separate models.
            // We will return mock data for these for now.
            stats = {
                totalProperties: totalProperties,
                activeBookings: 0, // Mock: Replace with logic from 'Booking' model
                totalReviews: 0,   // Mock: Replace with logic from 'Review' model
                responseRate: "N/A" // Mock: Calculate based on messages
            };
            console.log("Stats calculated:", stats);
        }

        return NextResponse.json({
            message: "User details fetched successfully!",
            data: {
                user: user,
                stats: stats
            }
        }, { status: 200 });

    } catch (error) {
        console.error("Error fetching user details:", error);
        return NextResponse.json({ message: "An error occurred.", error: error.message }, { status: 500 });
    }
}

/**
 * @description UPDATE the logged-in host's profile data.
 */
export async function PUT(request) {
    console.log("\n--- [PUT /api/user/me] ---");
    try {
        await dbConnect();
        console.log("Database connected.");

        const auth = await verifyAuth(request);
        if (auth.error) {
            console.error("Auth failed:", auth.error);
            return NextResponse.json({ message: auth.error }, { status: auth.status });
        }

        const { user: decodedToken } = auth;
        console.log(`Authenticated user: ${decodedToken.email}`);

        // Ensure user is a host to update host-specific fields
        if (decodedToken.role !== 'host') {
            return NextResponse.json({ message: "Only hosts can update profile data." }, { status: 403 });
        }

        const body = await request.json();

        // Define which fields are allowed to be updated via this route
        const allowedUpdates = {
            firstName: body.firstName,
            lastName: body.lastName,
            location: body.location,
            about: body.about,
            languages: body.languages,
            interests: body.interests,
            emergencyContact: body.emergencyContact,
            hostingPreferences: body.hostingPreferences
            // Add 'profileImage' here once you have an upload mechanism
        };

        // Remove any undefined fields to avoid overwriting existing data
        Object.keys(allowedUpdates).forEach(key => {
            if (allowedUpdates[key] === undefined) {
                delete allowedUpdates[key];
            }
        });

        console.log("Attempting to update profile with data:", allowedUpdates);

        const updatedUser = await User.findByIdAndUpdate(
            decodedToken.userId,
            { $set: allowedUpdates },
            { new: true, runValidators: true } // Return the new document and run schema validators
        ).select('-password');

        if (!updatedUser) {
            return NextResponse.json({ message: "User not found." }, { status: 404 });
        }

        console.log("Profile updated successfully.");

        return NextResponse.json({
            message: "Profile updated successfully!",
            data: updatedUser
        }, { status: 200 });

    } catch (error) {
        console.error("Error updating user profile:", error);
        if (error.name === 'ValidationError') {
            return NextResponse.json({ message: "Validation Error", error: error.message }, { status: 400 });
        }
        return NextResponse.json({ message: "An error occurred.", error: error.message }, { status: 500 });
    }
}