import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import dbConnect from '@/lib/mongodb';
import User from '@/app/models/User';
import Listing from '@/app/models/Listing';
import Application from '@/app/models/Application'; // Import Application model

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
    console.log("\n--- [GET /api/user/me] ---");
    try {
        await dbConnect();
        const auth = await verifyAuth(request);
        if (auth.error) {
            return NextResponse.json({ message: auth.error }, { status: auth.status });
        }

        const { user: decodedToken } = auth;
        const user = await User.findById(decodedToken.userId).select('-password').lean();
        if (!user) {
            return NextResponse.json({ message: "User not found." }, { status: 404 });
        }

        let stats = {};
        if (user.role === 'host') {
            const totalProperties = await Listing.countDocuments({ hostId: user._id });
            stats = {
                totalProperties: totalProperties,
                activeBookings: 0, // Mock
                totalReviews: 0,   // Mock
                responseRate: "N/A" // Mock
            };
        } else if (user.role === 'renter') {
            const totalApplications = await Application.countDocuments({ applicantId: user._id });
            const completedStays = 0; // Mock: Needs booking model logic
            const reviewsGiven = 0; // Mock: Needs review model logic
            stats = {
                totalApplications: totalApplications,
                completedStays: completedStays,
                reviewsGiven: reviewsGiven,
                profileViews: 0 // Mock
            };
        }

        return NextResponse.json({
            message: "User details fetched successfully!",
            data: { user, stats }
        }, { status: 200 });

    } catch (error) {
        console.error("Error fetching user details:", error);
        return NextResponse.json({ message: "An error occurred.", error: error.message }, { status: 500 });
    }
}

export async function PUT(request) {
    console.log("\n--- [PUT /api/user/me] ---");
    try {
        await dbConnect();
        const auth = await verifyAuth(request);
        if (auth.error) {
            return NextResponse.json({ message: auth.error }, { status: auth.status });
        }

        const { user: decodedToken } = auth;
        const body = await request.json();

        // Allowed fields for ANY user
        let allowedUpdates = {
            firstName: body.firstName,
            lastName: body.lastName,
        };

        // Add role-specific fields
        if (decodedToken.role === 'host') {
            Object.assign(allowedUpdates, {
                location: body.location,
                about: body.about,
                languages: body.languages,
                interests: body.interests,
                emergencyContact: body.emergencyContact,
                hostingPreferences: body.hostingPreferences
            });
        } else if (decodedToken.role === 'renter') {
            Object.assign(allowedUpdates, {
                phone: body.phone, // Renter can update phone
                renterBasic: body.renterBasic,
                renterAbout: body.renterAbout,
                renterHousing: body.renterHousing
            });
        }

        // Remove undefined fields
        Object.keys(allowedUpdates).forEach(key => {
            if (allowedUpdates[key] === undefined) {
                delete allowedUpdates[key];
            }
        });

        console.log("Attempting to update profile with data:", allowedUpdates);

        const updatedUser = await User.findByIdAndUpdate(
            decodedToken.userId,
            { $set: allowedUpdates },
            { new: true, runValidators: true }
        ).select('-password');

        if (!updatedUser) {
            return NextResponse.json({ message: "User not found." }, { status: 404 });
        }

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