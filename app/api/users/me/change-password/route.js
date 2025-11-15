import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import User from '@/app/models/User';
import { verifyToken } from '@/lib/auth'; // Import your new auth function
import bcrypt from 'bcryptjs';

export async function POST(req) {
    try {
        const decoded = await verifyToken(); // Use verifyToken
        if (!decoded) { // Check if decoded object exists
            return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
        }

        const { currentPassword, newPassword } = await req.json();

        if (!currentPassword || !newPassword) {
            return NextResponse.json({ message: 'Please provide current and new passwords.' }, { status: 400 });
        }

        if (newPassword.length < 8) {
            return NextResponse.json({ message: 'New password must be at least 8 characters long.' }, { status: 400 });
        }

        await dbConnect();

        const user = await User.findById(decoded.userId).select('+password'); // Use decoded.userId
        if (!user) {
            return NextResponse.json({ message: 'User not found' }, { status: 404 });
        }

        const isMatch = await bcrypt.compare(currentPassword, user.password);
        if (!isMatch) {
            return NextResponse.json({ message: 'Current password incorrect.' }, { status: 403 });
        }

        const hashedNewPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedNewPassword;
        await user.save();

        return NextResponse.json({ success: true, message: 'Password changed successfully!' }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: 'Error changing password', error: error.message }, { status: 500 });
    }
}