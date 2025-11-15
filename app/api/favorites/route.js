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

export async function GET(req) {
    console.log('\n💖 Get Favorites API called');
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

        const { searchParams } = new URL(req.url);
        const page = parseInt(searchParams.get('page')) || 1;
        const limit = parseInt(searchParams.get('limit')) || 20;
        const sortBy = searchParams.get('sortBy') || 'recent';

        console.log('📊 Query params:', { page, limit, sortBy });

        console.log('🔍 Fetching favorites for user:', decoded.userId);

        const totalFavorites = await Favorite.countDocuments({ userId: decoded.userId });
        console.log('📦 Total favorites:', totalFavorites);

        let sortOptions = {};
        switch (sortBy) {
            case 'priceLow':
                sortOptions = { 'listing.monthlyRent': 1 };
                break;
            case 'priceHigh':
                sortOptions = { 'listing.monthlyRent': -1 };
                break;
            case 'oldest':
                sortOptions = { addedAt: 1 };
                break;
            case 'recent':
            default:
                sortOptions = { addedAt: -1 };
                break;
        }

        const favorites = await Favorite.find({ userId: decoded.userId })
            .sort(sortOptions.addedAt ? sortOptions : { addedAt: -1 })
            .skip((page - 1) * limit)
            .limit(limit)
            .populate({
                path: 'listingId',
                populate: {
                    path: 'hostId',
                    select: 'firstName lastName profileImage location languages about isVerified'
                }
            })
            .lean();

        console.log('✅ Found', favorites.length, 'favorites');

        const validFavorites = favorites.filter(fav => fav.listingId !== null);
        console.log('✅ Valid favorites (listing exists):', validFavorites.length);

        if (sortBy === 'priceLow' || sortBy === 'priceHigh') {
            validFavorites.sort((a, b) => {
                const priceA = a.listingId?.monthlyRent || 0;
                const priceB = b.listingId?.monthlyRent || 0;
                return sortBy === 'priceLow' ? priceA - priceB : priceB - priceA;
            });
        }

        const formattedFavorites = validFavorites.map(favorite => {
            const listing = favorite.listingId;

            const tags = [];

            if (listing.minDuration) {
                tags.push({ text: `Min Stay: ${listing.minDuration}`, color: 'text-gray-700 bg-gray-100' });
            }

            if (listing.moveInDate) {
                const moveInDate = new Date(listing.moveInDate);
                tags.push({
                    text: `Available ${moveInDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`,
                    color: 'text-gray-700 bg-gray-100'
                });
            }

            if (listing.furnishingStatus === 'fully' || listing.furnishingStatus === 'Fully Furnished') {
                tags.push({ text: 'Fully Furnished', color: 'text-orange-700 bg-orange-100' });
            }

            if (listing.utilities?.some(u => /pet friendly/i.test(u))) {
                tags.push({ text: 'Pet Friendly', color: 'text-green-700 bg-green-100' });
            }

            const features = [];
            if (listing.propertyType) features.push(listing.propertyType);
            if (listing.bathroomType) {
                features.push(listing.bathroomType === 'private' ? 'Private Bathroom' : 'Shared Bathroom');
            }

            const now = new Date();
            const addedDate = new Date(favorite.addedAt);
            const daysDiff = Math.floor((now - addedDate) / (1000 * 60 * 60 * 24));

            let addedText = 'Today';
            if (daysDiff === 1) addedText = '1 day ago';
            else if (daysDiff > 1 && daysDiff < 7) addedText = `${daysDiff} days ago`;
            else if (daysDiff >= 7 && daysDiff < 30) addedText = `${Math.floor(daysDiff / 7)} week${Math.floor(daysDiff / 7) > 1 ? 's' : ''} ago`;
            else if (daysDiff >= 30) addedText = `${Math.floor(daysDiff / 30)} month${Math.floor(daysDiff / 30) > 1 ? 's' : ''} ago`;

            return {
                favoriteId: favorite._id,
                id: listing._id,
                title: listing.listingTitle,
                description: listing.description,
                location: listing.address,
                price: listing.monthlyRent,
                currency: '€',
                type: listing.propertyType || 'Room',
                details: listing.bathroomType === 'private' ? 'Private' : 'Shared',
                available: listing.moveInDate
                    ? new Date(listing.moveInDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
                    : 'Contact Host',
                tags,
                features,
                added: addedText,
                addedAt: favorite.addedAt,
                imageSrc: listing.photos?.cover || null,
                imageUrl: listing.photos?.cover || null,
                additionalPhotos: {
                    room: listing.photos?.room || [],
                    common: listing.photos?.common || []
                },
                utilities: listing.utilities || [],
                securityDeposit: listing.securityDeposit,
                cleaningFee: listing.cleaningFee,
                monthlyRent: listing.monthlyRent,
                host: listing.hostId ? {
                    id: listing.hostId._id,
                    name: `${listing.hostId.firstName} ${listing.hostId.lastName}`,
                    firstName: listing.hostId.firstName,
                    profileImage: listing.hostId.profileImage,
                    location: listing.hostId.location,
                    isVerified: listing.hostId.isVerified
                } : null,
                hasPriceDrop: false
            };
        });

        const totalPages = Math.ceil(totalFavorites / limit);

        const prices = formattedFavorites.map(f => f.price);
        const minPrice = prices.length > 0 ? Math.min(...prices) : 0;
        const maxPrice = prices.length > 0 ? Math.max(...prices) : 0;
        const priceRange = prices.length > 0 ? `€${minPrice}-€${maxPrice}` : 'N/A';

        console.log('✅ Returning', formattedFavorites.length, 'favorites (page', page, 'of', totalPages, ')');
        console.log('💰 Price range:', priceRange);

        return NextResponse.json({
            success: true,
            totalFavorites: validFavorites.length,
            currentPage: page,
            totalPages,
            limit,
            sortBy,
            priceRange,
            minPrice,
            maxPrice,
            favorites: formattedFavorites
        }, { status: 200 });

    } catch (error) {
        console.error('💥 Error in Get Favorites API:', error);
        return NextResponse.json(
            {
                success: false,
                message: 'An error occurred while fetching favorites.',
                error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
            },
            { status: 500 }
        );
    }
}