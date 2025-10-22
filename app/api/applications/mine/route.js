import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import dbConnect from '@/lib/mongodb';
import User from '@/app/models/User';
import Listing from '@/app/models/Listing';
import Application from '@/app/models/Application';
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

export async function GET(request) {
    console.log("\n--- [GET /api/applications/mine] ---");
    try {
        await dbConnect();

        const auth = await verifyAuth(request);
        if (auth.error) {
            console.error("Auth failed:", auth.error);
            return NextResponse.json({ message: auth.error }, { status: auth.status });
        }
        const { user: applicant } = auth;

        // Verify user role
        if (applicant.role !== 'renter') {
            return NextResponse.json({ message: "Only renters can view their applications." }, { status: 403 });
        }

        console.log(`Fetching applications for applicantId: ${applicant.userId}`);

        // Pagination parameters
        const { searchParams } = new URL(request.url);
        const page = parseInt(searchParams.get('page') || '1', 10);
        const limit = parseInt(searchParams.get('limit') || '5', 10); // Default to 5 per page
        const skip = (page - 1) * limit;

        console.log(`Pagination - Page: ${page}, Limit: ${limit}, Skip: ${skip}`);

        // Fetch applications for the logged-in renter
        const applications = await Application.find({ applicantId: applicant.userId })
            .populate({
                path: 'listingId', // Populate details from the associated Listing
                select: 'listingTitle address town photos monthlyRent propertyType bathroomType roomSize moveInDate hostId' // Select fields needed for display
            })
            .populate({
                path: 'hostId', // Populate basic host info
                select: 'firstName lastName'
            })
            .sort({ createdAt: -1 }) // Show newest first
            .skip(skip)
            .limit(limit);

        // Get total count for pagination info
        const totalApplications = await Application.countDocuments({ applicantId: applicant.userId });
        const totalPages = Math.ceil(totalApplications / limit);

        console.log(`Found ${applications.length} applications on this page. Total: ${totalApplications}. Total pages: ${totalPages}.`);

        // Format data slightly for frontend convenience (optional)
        const formattedApplications = applications.map(app => {
            const appObj = app.toObject(); // Convert Mongoose doc to plain object
            // Ensure nested populated data is included correctly
            return {
                ...appObj,
                listing: appObj.listingId, // Rename for clarity
                host: appObj.hostId,      // Rename for clarity
                listingId: appObj.listingId?._id, // Keep IDs if needed separately
                hostId: appObj.hostId?._id
            };
        });


        return NextResponse.json({
            message: "Applications fetched successfully!",
            data: formattedApplications,
            pagination: {
                currentPage: page,
                totalPages: totalPages,
                totalApplications: totalApplications,
                limit: limit,
            }
        }, { status: 200 });

    } catch (error) {
        console.error("Error fetching applications:", error);
        return NextResponse.json(
            { message: "An error occurred.", error: error.message },
            { status: 500 }
        );
    }
}