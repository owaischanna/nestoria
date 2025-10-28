import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import dbConnect from '@/lib/mongodb';
import User from '@/app/models/User';

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
    console.log("\n--- [POST /api/user/documents] ---");
    try {
        await dbConnect();

        const auth = await verifyAuth(request);
        if (auth.error) {
            return NextResponse.json({ message: auth.error }, { status: auth.status });
        }

        const { user: decodedToken } = auth;

        if (decodedToken.role !== 'renter') {
            return NextResponse.json({ message: "Only renters can upload documents." }, { status: 403 });
        }

        const body = await request.json();
        const { docType, fileName, fileSize, fileData } = body;

        if (!docType || !fileName || !fileData) {
            return NextResponse.json({ message: "Missing required fields: docType, fileName, and fileData." }, { status: 400 });
        }

        const newDocument = {
            docType,
            fileName,
            fileSize,
            fileData, // This is the Base64 string from the client
            isVerified: false,
            uploadedAt: new Date()
        };

        // Find the user and add the document
        // We use $pull to remove any existing doc of the same type, then $push the new one
        // This effectively replaces the document for 'identity' or 'financial'
        const updatedUser = await User.findByIdAndUpdate(
            decodedToken.userId,
            {
                $pull: { renterDocuments: { docType: docType } }
            },
            { new: true }
        );

        await User.findByIdAndUpdate(
            decodedToken.userId,
            {
                $push: { renterDocuments: newDocument }
            },
            { new: true, runValidators: true }
        ).select('-password');

        console.log(`Document '${fileName}' added for user ${decodedToken.email}`);

        return NextResponse.json({
            message: "Document uploaded successfully!",
            data: newDocument // Return the new document object
        }, { status: 201 });

    } catch (error) {
        console.error("Error uploading document:", error);
        return NextResponse.json(
            { message: "An error occurred.", error: error.message },
            { status: 500 }
        );
    }
}