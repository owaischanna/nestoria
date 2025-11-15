import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Favorite from '@/app/models/Favorite';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';

async function verifyToken() {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get('authToken')?.value;

        if (!token) {
            return null;
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        return decoded;
    } catch (error) {
        return null;
    }
}

export async function POST(req) {
    console.log('\n🔍 Check Favorites Status API called');
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

        const { listingIds } = await req.json();

        if (!listingIds || !Array.isArray(listingIds)) {
            console.log('❌ Invalid listingIds');
            return NextResponse.json(
                { message: 'listingIds array is required.' },
                { status: 400 }
            );
        }

        console.log('📋 Checking favorite status for', listingIds.length, 'listings');

        const favorites = await Favorite.find({
            userId: decoded.userId,
            listingId: { $in: listingIds }
        }).select('listingId').lean();

        const favoritedIds = favorites.map(fav => fav.listingId.toString());

        const statusMap = {};
        listingIds.forEach(id => {
            statusMap[id] = favoritedIds.includes(id.toString());
        });

        console.log('✅ Found', favoritedIds.length, 'favorited out of', listingIds.length);

        return NextResponse.json({
            success: true,
            favorites: statusMap,
            count: favoritedIds.length
        }, { status: 200 });

    } catch (error) {
        console.error('💥 Error in Check Favorites Status API:', error);
        return NextResponse.json(
            {
                success: false,
                message: 'An error occurred while checking favorites.',
                error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
            },
            { status: 500 }
        );
    }
}