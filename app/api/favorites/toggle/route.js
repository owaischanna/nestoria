import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Favorite from '@/app/models/Favorite';
import Listing from '@/app/models/Listing';
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

        console.log('✅ Token found in cookies');
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log('✅ Token verified, userId:', decoded.userId, 'role:', decoded.role);
        return decoded;
    } catch (error) {
        console.error('❌ Token verification error:', error.message);
        return null;
    }
}

export async function POST(req) {
    console.log('\n❤️ Toggle Favorite API called');
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

        const { listingId } = await req.json();

        if (!listingId) {
            console.log('❌ Missing listingId');
            return NextResponse.json(
                { message: 'Listing ID is required.' },
                { status: 400 }
            );
        }

        console.log('📋 Checking if listing exists:', listingId);
        const listing = await Listing.findById(listingId);

        if (!listing) {
            console.log('❌ Listing not found:', listingId);
            return NextResponse.json(
                { message: 'Listing not found.' },
                { status: 404 }
            );
        }

        console.log('🔍 Checking if already favorited...');
        const existingFavorite = await Favorite.findOne({
            userId: decoded.userId,
            listingId: listingId
        });

        if (existingFavorite) {
            console.log('💔 Removing from favorites...');
            await Favorite.deleteOne({ _id: existingFavorite._id });

            console.log('✅ Removed from favorites');
            return NextResponse.json({
                success: true,
                message: 'Removed from favorites.',
                isFavorited: false,
                action: 'removed'
            }, { status: 200 });
        } else {
            console.log('❤️ Adding to favorites...');
            const newFavorite = new Favorite({
                userId: decoded.userId,
                listingId: listingId
            });

            await newFavorite.save();

            console.log('✅ Added to favorites');
            return NextResponse.json({
                success: true,
                message: 'Added to favorites.',
                isFavorited: true,
                action: 'added'
            }, { status: 201 });
        }

    } catch (error) {
        console.error('💥 Error in Toggle Favorite API:', error);

        if (error.code === 11000) {
            console.log('⚠️ Duplicate favorite attempt');
            return NextResponse.json(
                { message: 'Already in favorites.' },
                { status: 400 }
            );
        }

        return NextResponse.json(
            {
                success: false,
                message: 'An error occurred while updating favorites.',
                error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
            },
            { status: 500 }
        );
    }
}