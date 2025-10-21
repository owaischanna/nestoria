import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import dbConnect from '@/lib/mongodb';
import User from '@/app/models/User';

async function verifyAuth(request) {
    const token = request.cookies.get('authToken')?.value;

    if (!token) {
        return { error: "Missing authentication token.", status: 401 };
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        return { user: decoded };
    } catch (error) {
        return { error: "Invalid or expired token.", status: 401 };
    }
}

export async function GET(request) {
    try {
        await dbConnect();

        const auth = await verifyAuth(request);
        if (auth.error) {
            return NextResponse.json({ message: auth.error }, { status: auth.status });
        }

        const { user: decodedToken } = auth;

        if (!decodedToken || !decodedToken.userId) {
            return NextResponse.json({ message: "Invalid token payload." }, { status: 401 });
        }

        const user = await User.findById(decodedToken.userId).select('-password');

        if (!user) {
            return NextResponse.json({ message: "User not found." }, { status: 404 });
        }

        return NextResponse.json({
            message: "User details fetched successfully!",
            data: user
        }, { status: 200 });

    } catch (error) {
        console.error("Error fetching user details:", error);
        return NextResponse.json(
            { message: "An error occurred while fetching user details.", error: error.message },
            { status: 500 }
        );
    }
}