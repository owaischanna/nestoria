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
    console.log('\n🐾 Pet-Friendly Properties API called');
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

        console.log('📊 Query params:', { sortBy, page, limit });

        const filter = {
            $or: [
                { utilities: { $regex: /pet friendly/i } },
                { utilities: { $regex: /pet-friendly/i } },
                { utilities: { $regex: /pets allowed/i } },
                { utilities: { $regex: /pets welcome/i } },
                { houseRules: { $regex: /pet friendly/i } },
                { houseRules: { $regex: /pets allowed/i } },
                { houseRules: { $regex: /pets welcome/i } },
                { description: { $regex: /pet friendly/i } },
                { description: { $regex: /pets allowed/i } },
                { description: { $regex: /pets welcome/i } }
            ]
        };

        console.log('🔍 Searching for pet-friendly listings...');
        const totalListings = await Listing.countDocuments(filter);
        console.log('📦 Total pet-friendly listings:', totalListings);

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

            const isPetFriendly = listing.utilities?.some(util =>
                /pet friendly|pet-friendly|pets allowed|pets welcome/i.test(util)
            );

            if (isPetFriendly) {
                tags.push('Pet Friendly');
            }

            const utilitiesLower = listing.utilities?.map(u => u.toLowerCase()) || [];
            const houseRulesLower = listing.houseRules?.toLowerCase() || '';
            const descriptionLower = listing.description?.toLowerCase() || '';

            const dogsAllowed =
                utilitiesLower.some(u => /dog|dogs/.test(u)) ||
                houseRulesLower.includes('dog') ||
                descriptionLower.includes('dog');

            const catsAllowed =
                utilitiesLower.some(u => /cat|cats/.test(u)) ||
                houseRulesLower.includes('cat') ||
                descriptionLower.includes('cat');

            if (dogsAllowed) tags.push('Dogs Welcome');
            if (catsAllowed) tags.push('Cats Welcome');

            if (!dogsAllowed && !catsAllowed && isPetFriendly) {
                tags.push('Pets Allowed');
            }

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

            if (listing.propertyType) {
                features.push(listing.propertyType);
            }

            if (listing.bathroomType) {
                features.push(listing.bathroomType === 'private' ? 'Private Bathroom' : 'Shared Bathroom');
            }

            if (listing.maxOccupancy) {
                features.push(`${listing.maxOccupancy}`);
            }

            if (listing.roomSize) {
                features.push(`${listing.roomSize} sqft`);
            }

            if (listing.utilities && listing.utilities.some(u => /wifi|internet/i.test(u))) {
                features.push('WiFi Included');
            }

            if (listing.furnishingStatus === 'fully' || listing.furnishingStatus === 'Fully Furnished') {
                features.push('Fully Furnished');
            }

            let petFee = null;
            const petFeeMatch = listing.houseRules?.match(/pet fee:?\s*\$?(\d+)/i) ||
                listing.description?.match(/pet fee:?\s*\$?(\d+)/i);
            if (petFeeMatch) {
                petFee = parseInt(petFeeMatch[1]);
            }

            return {
                id: listing._id,
                title: listing.listingTitle,
                description: listing.description,
                location: listing.address,
                price: listing.monthlyRent,
                petFee: petFee,
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
            totalProperties: totalListings,
            currentPage: page,
            totalPages,
            limit,
            sortBy,
            properties: formattedListings
        }, { status: 200 });

    } catch (error) {
        console.error('💥 Error in Pet-Friendly Properties API:', error);
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