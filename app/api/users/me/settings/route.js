import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import User from '@/app/models/User';
import { verifyToken } from '@/lib/auth'; // Import your new auth function

export async function GET(req) {
    try {
        const decoded = await verifyToken(); // Use verifyToken
        if (!decoded) { // Check if decoded object exists
            return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
        }

        await dbConnect();

        const user = await User.findById(decoded.userId).select( // Use decoded.userId
            'uiTheme wantsLoginAlerts notificationPreferences privacySettings'
        );

        if (!user) {
            return NextResponse.json({ message: 'User not found' }, { status: 404 });
        }

        const settings = {
            uiTheme: user.uiTheme,
            wantsLoginAlerts: user.wantsLoginAlerts,
            notificationPreferences: user.notificationPreferences,
            privacySettings: user.privacySettings,
        };

        return NextResponse.json({ success: true, settings }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: 'Error fetching settings', error: error.message }, { status: 500 });
    }
}

export async function POST(req) {
    try {
        const decoded = await verifyToken(); // Use verifyToken
        if (!decoded) { // Check if decoded object exists
            return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
        }

        const newSettings = await req.json();

        await dbConnect();

        const updatedUser = await User.findByIdAndUpdate(
            decoded.userId, // Use decoded.userId
            {
                $set: {
                    uiTheme: newSettings.uiTheme,
                    wantsLoginAlerts: newSettings.wantsLoginAlerts,
                    notificationPreferences: newSettings.notificationPreferences,
                    privacySettings: newSettings.privacySettings,
                },
            },
            { new: true, runValidators: true }
        );

        if (!updatedUser) {
            return NextResponse.json({ message: 'User not found' }, { status: 404 });
        }

        return NextResponse.json({ success: true, message: 'Settings saved successfully!' }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: 'Error saving settings', error: error.message }, { status: 500 });
    }
}