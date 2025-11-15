import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
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

export async function GET(req) {
    console.log('\n🏷️ Under €800 API called');
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
        const sortBy = searchParams.get('sortBy') || 'bestMatch';
        const page = parseInt(searchParams.get('page')) || 1;
        const limit = parseInt(searchParams.get('limit')) || 10;
        const maxPrice = 800;

        console.log('📊 Query params:', { sortBy, page, limit, maxPrice });

        const filter = {
            monthlyRent: { $lt: maxPrice }
        };

        console.log('🔍 Fetching listings under €800...');
        const totalListings = await Listing.countDocuments(filter);
        console.log('📦 Total listings under €800:', totalListings);

        let sortOptions = {};
        switch (sortBy) {
            case 'priceLow':
                sortOptions = { monthlyRent: 1 };
                console.log('📈 Sorting by: Price Low to High');
                break;
            case 'priceHigh':
                sortOptions = { monthlyRent: -1 };
                console.log('📉 Sorting by: Price High to Low');
                break;
            case 'newest':
                sortOptions = { createdAt: -1 };
                console.log('🆕 Sorting by: Newest');
                break;
            case 'bestMatch':
            default:
                sortOptions = { createdAt: -1, monthlyRent: 1 };
                console.log('⭐ Sorting by: Best Match (Newest + Price)');
                break;
        }

        const listings = await Listing.find(filter)
            .sort(sortOptions)
            .skip((page - 1) * limit)
            .limit(limit)
            .populate('hostId', 'firstName lastName profileImage location languages about isVerified')
            .lean();

        console.log('✅ Found', listings.length, 'listings on page', page);

        const formattedListings = listings.map(listing => {
            const tags = [];

            if (listing.minDuration) {
                tags.push(`Min Stay: ${listing.minDuration}`);
            }

            if (listing.moveInDate) {
                const moveInDate = new Date(listing.moveInDate);
                tags.push(`Available ${moveInDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`);
            }

            if (listing.monthToMonth) {
                tags.push('Month-to-Month');
            }

            const features = [];

            if (listing.bathroomType) {
                features.push(listing.bathroomType === 'private' ? 'Private Bathroom' : 'Shared Bathroom');
            }

            if (listing.maxOccupancy) {
                features.push(`${listing.maxOccupancy} Max Occupancy`);
            }

            if (listing.utilities && (listing.utilities.includes('wifi') || listing.utilities.includes('WIFI'))) {
                features.push('WiFi Included');
            }

            if (listing.furnishingStatus === 'fully') {
                features.push('Fully Furnished');
            }

            return {
                id: listing._id,
                title: listing.listingTitle,
                description: listing.description,
                location: listing.address,
                price: listing.monthlyRent,
                currency: '€',
                propertyType: listing.propertyType,
                roomSize: listing.roomSize,
                maxOccupancy: listing.maxOccupancy,
                bathroomType: listing.bathroomType,
                furnishingStatus: listing.furnishingStatus,
                features,
                tags,
                imageSrc: listing.photos?.cover || null,
                additionalPhotos: {
                    room: listing.photos?.room || [],
                    common: listing.photos?.common || []
                },
                utilities: listing.utilities || [],
                securityDeposit: listing.securityDeposit,
                cleaningFee: listing.cleaningFee,
                houseRules: listing.houseRules,
                minDuration: listing.minDuration,
                maxDuration: listing.maxDuration,
                monthToMonth: listing.monthToMonth,
                moveInDate: listing.moveInDate,
                host: listing.hostId ? {
                    id: listing.hostId._id,
                    name: `${listing.hostId.firstName} ${listing.hostId.lastName}`,
                    firstName: listing.hostId.firstName,
                    profileImage: listing.hostId.profileImage,
                    location: listing.hostId.location,
                    languages: listing.hostId.languages,
                    about: listing.hostId.about,
                    isVerified: listing.hostId.isVerified
                } : null,
                createdAt: listing.createdAt,
                updatedAt: listing.updatedAt
            };
        });

        const totalPages = Math.ceil(totalListings / limit);

        console.log('✅ Returning', formattedListings.length, 'properties (page', page, 'of', totalPages, ')');

        return NextResponse.json({
            success: true,
            maxPrice: maxPrice,
            totalProperties: totalListings,
            currentPage: page,
            totalPages,
            limit,
            sortBy,
            properties: formattedListings
        }, { status: 200 });

    } catch (error) {
        console.error('💥 Error in Under €800 API:', error);
        return NextResponse.json(
            {
                success: false,
                message: 'An error occurred while fetching properties.',
                error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
            },
            { status: 500 }
        );
    }
}