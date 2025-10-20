import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import User from '@/app/models/User';
import bcrypt from 'bcryptjs';

export async function POST(req) {
    await dbConnect();

    try {
        const {
            firstName,
            lastName,
            email,
            password,
            role,
            country,
            state,
            zip,
            phone
        } = await req.json();

        // Check for required fields
        if (!firstName || !lastName || !email || !password || !role) {
            return NextResponse.json(
                { message: 'Missing required fields: firstName, lastName, email, password, and role are required.' },
                { status: 400 }
            );
        }

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return NextResponse.json(
                { message: 'User with this email already exists.' },
                { status: 400 }
            );
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            role,
            country,
            state,
            zip,
            phone
        });

        return NextResponse.json(
            { message: 'User created successfully.', userId: user._id },
            { status: 201 }
        );
    } catch (error) {
        return NextResponse.json(
            { message: 'An error occurred during user creation.', error: error.message },
            { status: 500 }
        );
    }
}