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

export async function GET(request, context) {
    console.log("\n--- [GET /api/applications/received] ---");
    try {
        await dbConnect();
        console.log("Database connected.");

        const auth = await verifyAuth(request);
        if (auth.error) {
            console.error("Auth failed:", auth.error);
            return NextResponse.json({ message: auth.error }, { status: auth.status });
        }

        const { user: host } = auth;
        console.log(`Authenticated user: ${host.email}`);

        if (host.role !== 'host') {
            console.log("Authorization failed: User is not a host.");
            return NextResponse.json({ message: "Access denied. Only hosts can view received applications." }, { status: 403 });
        }

        const { searchParams } = new URL(request.url);
        const page = parseInt(searchParams.get('page') || '1', 10);
        const limit = parseInt(searchParams.get('limit') || '5', 10);
        const skip = (page - 1) * limit;

        console.log(`Fetching applications for hostId: ${host.userId}, Page: ${page}, Limit: ${limit}`);

        // Find applications for this host, focusing on actionable ones
        const query = {
            hostId: host.userId,
            status: { $in: ['Pending', 'Approved'] } // Only show pending or approved applications
        };

        const applications = await Application.find(query)
            .populate({
                path: 'applicantId',
                select: 'firstName lastName email phone' // Get renter's details
            })
            .populate({
                path: 'listingId',
                select: 'listingTitle photos address town propertyType roomSize monthlyRent' // Get listing details
            })
            .sort({ createdAt: -1 }) // Newest first
            .skip(skip)
            .limit(limit);

        const totalApplications = await Application.countDocuments(query);
        const totalPages = Math.ceil(totalApplications / limit);

        console.log(`Found ${applications.length} applications on this page. Total: ${totalApplications}.`);

        // Format data for easier frontend use
        const formattedData = applications.map(app => ({
            _id: app._id,
            status: app.status,
            createdAt: app.createdAt,
            updatedAt: app.updatedAt,
            leaseLength: app.leaseLength,
            preferredMoveIn: app.preferredMoveIn,
            // Populated Applicant (Renter)
            applicant: app.applicantId,
            // Populated Listing
            listing: app.listingId,
        }));

        return NextResponse.json({
            message: "Applications fetched successfully!",
            data: formattedData,
            pagination: {
                currentPage: page,
                totalPages: totalPages,
                totalApplications: totalApplications,
                limit: limit,
            }
        }, { status: 200 });

    } catch (error) {
        console.error("Error fetching received applications:", error);
        return NextResponse.json(
            { message: "An error occurred.", error: error.message },
            { status: 500 }
        );
    }
}