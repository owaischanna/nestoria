import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import User from '@/app/models/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken'; // Import jsonwebtoken

export async function POST(req) {
    await dbConnect();

    try {
        const { email, password } = await req.json();

        const user = await User.findOne({ email });

        if (!user) {
            return NextResponse.json(
                { message: 'Invalid credentials.' },
                { status: 400 }
            );
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password);

        if (!isPasswordMatch) {
            return NextResponse.json(
                { message: 'Invalid credentials.' },
                { status: 400 }
            );
        }

        // **CHANGE:** Create a JWT token
        const token = jwt.sign(
            {
                userId: user._id,
                email: user.email,
                firstName: user.firstName,
                role: user.role
            },
            process.env.JWT_SECRET,
            { expiresIn: '7d' } // Token expires in 7 days
        );

        // **CHANGE:** Return the token in the response
        return NextResponse.json(
            { message: 'Login successful.', token },
            { status: 200 }
        );

    } catch (error) {
        return NextResponse.json(
            { message: 'An error occurred.', error: error.message },
            { status: 500 }
        );
    }
}