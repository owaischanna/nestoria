import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Favorite from '@/app/models/Favorite';
import Application from '@/app/models/Application';
import Message from '@/app/models/Message';
import Conversation from '@/app/models/Conversation';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';

async function verifyToken() {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get('authToken')?.value;

        if (!token) {
            console.log('❌ No authToken cookie found');
            return null;
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log('✅ Token verified, userId:', decoded.userId, 'role:', decoded.role);
        return decoded;
    } catch (error) {
        console.error('❌ Token verification error:', error.message);
        return null;
    }
}

export async function GET(req) {
    console.log('\n📊 Sidebar Stats API called');
    await dbConnect();

    try {
        const decoded = await verifyToken();

        if (!decoded) {
            console.log('❌ Authentication failed');
            return NextResponse.json(
                { message: 'Unauthorized. Please login.' },
                { status: 401 }
            );
        }

        const userId = decoded.userId;
        console.log('📋 Fetching stats for user:', userId);

        console.log('❤️ Counting favorites...');
        const favoritesCount = await Favorite.countDocuments({ userId });
        console.log('✅ Favorites count:', favoritesCount);

        console.log('📝 Counting applications...');
        const applicationsCount = await Application.countDocuments({
            applicantId: userId
        });
        console.log('✅ Applications count:', applicationsCount);

        console.log('💬 Finding user conversations...');
        const conversations = await Conversation.find({
            participants: userId
        }).select('_id').lean();

        const conversationIds = conversations.map(conv => conv._id);
        console.log('✅ Found', conversationIds.length, 'conversations');

        console.log('💬 Counting unread messages...');
        const unreadMessagesCount = await Message.countDocuments({
            conversationId: { $in: conversationIds },
            sender: { $ne: userId },
            readBy: { $ne: userId }
        });
        console.log('✅ Unread messages count:', unreadMessagesCount);

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        console.log('📅 Counting today\'s new messages...');
        const newMessagesToday = await Message.countDocuments({
            conversationId: { $in: conversationIds },
            sender: { $ne: userId },
            createdAt: { $gte: today }
        });
        console.log('✅ New messages today:', newMessagesToday);

        console.log('📅 Counting today\'s new applications...');
        const newApplicationsToday = await Application.countDocuments({
            applicantId: userId,
            createdAt: { $gte: today }
        });
        console.log('✅ New applications today:', newApplicationsToday);

        console.log('📅 Counting today\'s new favorites...');
        const newFavoritesToday = await Favorite.countDocuments({
            userId,
            createdAt: { $gte: today }
        });
        console.log('✅ New favorites today:', newFavoritesToday);

        const stats = {
            success: true,
            counts: {
                favorites: favoritesCount,
                applications: applicationsCount,
                messages: unreadMessagesCount,
                unreadMessages: unreadMessagesCount
            },
            today: {
                newMessages: newMessagesToday,
                newApplications: newApplicationsToday,
                newFavorites: newFavoritesToday
            },
            hasAlerts: {
                messages: unreadMessagesCount > 0,
                applications: newApplicationsToday > 0,
                favorites: newFavoritesToday > 0
            }
        };

        console.log('✅ Stats compiled successfully');
        console.log('📊 Summary:', {
            favorites: favoritesCount,
            applications: applicationsCount,
            unreadMessages: unreadMessagesCount,
            newToday: newMessagesToday + newApplicationsToday + newFavoritesToday
        });

        return NextResponse.json(stats, { status: 200 });

    } catch (error) {
        console.error('💥 Error in Sidebar Stats API:', error);
        return NextResponse.json(
            {
                success: false,
                message: 'An error occurred while fetching stats.',
                error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
            },
            { status: 500 }
        );
    }
}