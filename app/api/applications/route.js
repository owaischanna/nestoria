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

// Helper function to convert File objects to Base64 (needed on Frontend, placeholder here)
// async function fileToBase64(file) { /* ... implementation ... */ }

export async function POST(request) {
    console.log("\n--- [POST /api/applications] ---");
    try {
        await dbConnect();

        const auth = await verifyAuth(request);
        if (auth.error) {
            console.error("Auth failed:", auth.error);
            return NextResponse.json({ message: auth.error }, { status: auth.status });
        }
        const { user: applicant } = auth; // Logged-in user is the applicant

        // Renter role check (optional but recommended)
        if (applicant.role !== 'renter') {
            return NextResponse.json({ message: "Only renters can submit applications." }, { status: 403 });
        }

        const body = await request.json();
        const { listingId, uploadedDocuments: documentsBase64, ...applicationData } = body;

        // Validate essential data
        if (!listingId || !mongoose.Types.ObjectId.isValid(listingId)) {
            return NextResponse.json({ message: "Invalid or missing listing ID." }, { status: 400 });
        }
        if (!applicationData.fullName || !applicationData.email) {
            return NextResponse.json({ message: "Missing required fields: Full Name and Email." }, { status: 400 });
        }
        // Add more validation as needed (e.g., check required documents based on type)

        // Find the listing to get the hostId
        const listing = await Listing.findById(listingId).select('hostId');
        if (!listing) {
            return NextResponse.json({ message: "Listing not found." }, { status: 404 });
        }
        if (!listing.hostId) {
            return NextResponse.json({ message: "Listing is missing host information." }, { status: 500 });
        }

        console.log(`Submitting application for Listing: ${listingId} by Applicant: ${applicant.userId} to Host: ${listing.hostId}`);

        // IMPORTANT: Assume 'documentsBase64' is already an array of objects like:
        // { type: 'identity', name: 'passport.pdf', data: 'data:application/pdf;base64,...' }
        // The conversion from File object to Base64 MUST happen on the frontend before sending.

        const newApplication = new Application({
            ...applicationData,
            applicantId: applicant.userId,
            listingId: listingId,
            hostId: listing.hostId,
            uploadedDocuments: documentsBase64 || [], // Use the Base64 array
            status: 'Pending',
        });

        await newApplication.save();
        console.log("Application saved successfully:", newApplication._id);

        return NextResponse.json({
            message: "Application submitted successfully!",
            applicationId: newApplication._id
        }, { status: 201 });

    } catch (error) {
        console.error("Error submitting application:", error);
        if (error.name === 'ValidationError') {
            return NextResponse.json({ message: "Validation Error", error: error.message }, { status: 400 });
        }
        if (error instanceof SyntaxError && error.message.includes('JSON')) {
            return NextResponse.json({ message: "Error parsing request body. Ensure documents are sent correctly.", error: error.message }, { status: 400 });
        }
        return NextResponse.json(
            { message: "An error occurred.", error: error.message },
            { status: 500 }
        );
    }
}