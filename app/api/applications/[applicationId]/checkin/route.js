import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import dbConnect from '@/lib/mongodb';
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

// Helper to find and validate the application and host
async function getApplicationAndValidateHost(applicationId, hostId) {
    if (!applicationId || !mongoose.Types.ObjectId.isValid(applicationId)) {
        return { error: "Invalid application ID." };
    }

    const application = await Application.findById(applicationId);
    if (!application) {
        return { error: "Application not found." };
    }

    if (application.hostId.toString() !== hostId) {
        return { error: "Access denied. You are not the host for this application." };
    }

    return { application };
}

/**
 * @description GET the current check-in progress for a specific application.
 */
export async function GET(request, { params }) {
    // *** CORRECT FIX: Access params *before* any await ***
    const { applicationId } = params;

    try {
        await dbConnect(); // Now it's safe to await

        console.log(`\n--- [GET /api/applications/${applicationId}/checkin] ---`);

        const auth = await verifyAuth(request);
        if (auth.error) return NextResponse.json({ message: auth.error }, { status: auth.status });

        const { user: host } = auth;
        if (host.role !== 'host') {
            return NextResponse.json({ message: "Access denied." }, { status: 403 });
        }

        const { application, error } = await getApplicationAndValidateHost(applicationId, host.userId);
        if (error) {
            return NextResponse.json({ message: error }, { status: 404 });
        }

        console.log("Check-in data fetched successfully.");
        return NextResponse.json({
            message: "Check-in data fetched.",
            data: application.checkIn || {} // Return checkIn sub-document
        }, { status: 200 });

    } catch (error) {
        console.error("Error fetching check-in data:", error);
        // 'applicationId' is already available from the top of the function
        console.error(`Error on /api/applications/${applicationId}/checkin:`, error.message);
        return NextResponse.json({ message: "An error occurred.", error: error.message }, { status: 500 });
    }
}

/**
 * @description UPDATE the check-in progress for a specific application.
 */
export async function PUT(request, { params }) {
    // *** CORRECT FIX: Access params *before* any await ***
    const { applicationId } = params;

    try {
        await dbConnect(); // Now it's safe to await

        console.log(`\n--- [PUT /api/applications/${applicationId}/checkin] ---`);

        const auth = await verifyAuth(request);
        if (auth.error) return NextResponse.json({ message: auth.error }, { status: auth.status });

        const { user: host } = auth;
        if (host.role !== 'host') {
            return NextResponse.json({ message: "Access denied." }, { status: 403 });
        }

        const { application, error } = await getApplicationAndValidateHost(applicationId, host.userId);
        if (error) {
            return NextResponse.json({ message: error }, { status: 404 });
        }

        const body = await request.json();
        // FIXED: Accept both 'step' and 'stepName' for compatibility
        const { step, stepName, data, currentStep } = body;
        const stepKey = step || stepName;

        if (!stepKey || !data) {
            return NextResponse.json({
                message: "Invalid payload. 'step' (or 'stepName') and 'data' are required."
            }, { status: 400 });
        }

        console.log(`Updating check-in step: ${stepKey}`);

        // Initialize checkIn object if it doesn't exist
        if (!application.checkIn) {
            application.checkIn = {};
        }

        // Update the specific checklist and the overall step number
        application.checkIn[stepKey] = data;
        if (currentStep !== undefined) {
            application.checkIn.currentStep = currentStep;
        }

        // Mark the checkIn field as modified to ensure Mongoose saves it
        application.markModified('checkIn');

        await application.save();

        console.log("Check-in data updated successfully.");
        return NextResponse.json({
            message: "Check-in progress saved.",
            data: application.checkIn
        }, { status: 200 });

    } catch (error) {
        console.error("Error saving check-in data:", error);
        // 'applicationId' is already available from the top of the function
        console.error(`Error on /api/applications/${applicationId}/checkin:`, error.message);
        return NextResponse.json({
            message: "An error occurred.",
            error: error.message
        }, { status: 500 });
    }
}