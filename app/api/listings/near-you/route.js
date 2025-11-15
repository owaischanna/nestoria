import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Listing from '@/app/models/Listing';
import User from '@/app/models/User';
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

function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371;
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;
    return distance;
}

async function geocodeAddress(address) {
    try {
        const encodedAddress = encodeURIComponent(address);
        const response = await fetch(
            `https://nominatim.openstreetmap.org/search?format=json&q=${encodedAddress}&limit=1`,
            {
                headers: {
                    'User-Agent': 'RoomRental-App/1.0'
                }
            }
        );

        const data = await response.json();

        if (data && data.length > 0) {
            return {
                lat: parseFloat(data[0].lat),
                lon: parseFloat(data[0].lon),
                displayName: data[0].display_name
            };
        }

        return null;
    } catch (error) {
        console.error('Geocoding error:', error);
        return null;
    }
}

export async function GET(req) {
    console.log('\n🚀 Near You API called');
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
        const maxDistance = parseFloat(searchParams.get('maxDistance')) || 50;
        const page = parseInt(searchParams.get('page')) || 1;
        const limit = parseInt(searchParams.get('limit')) || 10;
        const minPrice = parseFloat(searchParams.get('minPrice')) || 0;
        const maxPrice = parseFloat(searchParams.get('maxPrice')) || Infinity;

        console.log('📊 Query params:', { sortBy, maxDistance, page, limit });

        const user = await User.findById(decoded.userId).select('location country state renterHousing firstName');

        if (!user) {
            console.log('❌ User not found:', decoded.userId);
            return NextResponse.json(
                { message: 'User not found.' },
                { status: 404 }
            );
        }

        let userLocation = user.location;
        let locationSource = 'location field';

        if (!userLocation && user.state && user.country) {
            userLocation = `${user.state}, ${user.country}`;
            locationSource = 'state + country';
            console.log('📍 Using state + country:', userLocation);
        } else if (!userLocation && user.country) {
            userLocation = user.country;
            locationSource = 'country only';
            console.log('📍 Using country only:', userLocation);
        } else if (!userLocation && user.renterHousing?.preferredLocation) {
            userLocation = user.renterHousing.preferredLocation;
            locationSource = 'preferred location';
            console.log('📍 Using preferred location:', userLocation);
        } else if (userLocation) {
            console.log('📍 Using location field:', userLocation);
        }

        console.log('✅ User found:', user.firstName, '| Location:', userLocation, `(from ${locationSource})`);

        if (!userLocation) {
            console.log('❌ User has no location set');
            return NextResponse.json(
                { message: 'User location not found. Please update your profile with your location (Country and State).' },
                { status: 400 }
            );
        }

        console.log('🌍 Geocoding user location:', userLocation);
        const userCoords = await geocodeAddress(userLocation);

        if (!userCoords) {
            console.log('❌ Geocoding failed for:', userLocation);
            return NextResponse.json(
                { message: 'Could not geocode user location. Please check your location format (e.g., "City, Country").' },
                { status: 400 }
            );
        }

        console.log('✅ User coordinates:', userCoords.lat, userCoords.lon);

        const filter = {};

        if (minPrice > 0 || maxPrice < Infinity) {
            filter.monthlyRent = {};
            if (minPrice > 0) filter.monthlyRent.$gte = minPrice;
            if (maxPrice < Infinity) filter.monthlyRent.$lte = maxPrice;
        }

        console.log('🔍 Fetching listings from database...');
        const allListings = await Listing.find(filter)
            .populate('hostId', 'firstName lastName profileImage location languages about isVerified')
            .lean();

        console.log('📦 Found', allListings.length, 'total listings');

        const listingsWithDistance = [];

        for (const listing of allListings) {
            const listingCoords = await geocodeAddress(listing.address);

            if (listingCoords) {
                const distance = calculateDistance(
                    userCoords.lat,
                    userCoords.lon,
                    listingCoords.lat,
                    listingCoords.lon
                );

                if (distance <= maxDistance) {
                    listingsWithDistance.push({
                        ...listing,
                        distance: parseFloat(distance.toFixed(2)),
                        coordinates: {
                            lat: listingCoords.lat,
                            lon: listingCoords.lon
                        }
                    });
                }
            }
        }

        console.log('📍 Found', listingsWithDistance.length, 'listings within', maxDistance, 'km');

        let sortedListings = [...listingsWithDistance];

        switch (sortBy) {
            case 'distance':
                sortedListings.sort((a, b) => a.distance - b.distance);
                break;
            case 'priceLow':
                sortedListings.sort((a, b) => a.monthlyRent - b.monthlyRent);
                break;
            case 'priceHigh':
                sortedListings.sort((a, b) => b.monthlyRent - a.monthlyRent);
                break;
            case 'newest':
                sortedListings.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                break;
            case 'bestMatch':
            default:
                sortedListings.sort((a, b) => {
                    const distanceWeight = 0.5;
                    const priceWeight = 0.3;
                    const recencyWeight = 0.2;

                    const normalizedDistanceA = a.distance / maxDistance;
                    const normalizedDistanceB = b.distance / maxDistance;

                    const avgPrice = sortedListings.reduce((sum, l) => sum + l.monthlyRent, 0) / sortedListings.length;
                    const normalizedPriceA = Math.abs(a.monthlyRent - avgPrice) / avgPrice;
                    const normalizedPriceB = Math.abs(b.monthlyRent - avgPrice) / avgPrice;

                    const now = Date.now();
                    const ageA = (now - new Date(a.createdAt)) / (1000 * 60 * 60 * 24);
                    const ageB = (now - new Date(b.createdAt)) / (1000 * 60 * 60 * 24);
                    const normalizedAgeA = Math.min(ageA / 30, 1);
                    const normalizedAgeB = Math.min(ageB / 30, 1);

                    const scoreA = (normalizedDistanceA * distanceWeight) +
                        (normalizedPriceA * priceWeight) +
                        (normalizedAgeA * recencyWeight);
                    const scoreB = (normalizedDistanceB * distanceWeight) +
                        (normalizedPriceB * priceWeight) +
                        (normalizedAgeB * recencyWeight);

                    return scoreA - scoreB;
                });
                break;
        }

        const startIndex = (page - 1) * limit;
        const endIndex = startIndex + limit;
        const paginatedListings = sortedListings.slice(startIndex, endIndex);

        const formattedListings = paginatedListings.map(listing => {
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
                features.push('WIFI Included');
            }

            if (listing.furnishingStatus === 'fully') {
                features.push('Fully Furnished');
            }

            if (listing.distance <= 5) {
                features.push(`${listing.distance} km to You`);
            }

            return {
                id: listing._id,
                title: listing.listingTitle,
                description: listing.description,
                location: listing.address,
                distance: `${listing.distance} km`,
                distanceValue: listing.distance,
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
                coordinates: listing.coordinates,
                createdAt: listing.createdAt,
                updatedAt: listing.updatedAt
            };
        });

        console.log('✅ Returning', formattedListings.length, 'properties (page', page, 'of', Math.ceil(sortedListings.length / limit), ')');

        return NextResponse.json({
            success: true,
            userLocation: userLocation,
            locationSource: locationSource,
            userCoordinates: {
                lat: userCoords.lat,
                lon: userCoords.lon
            },
            filters: {
                minPrice,
                maxPrice: maxPrice === Infinity ? null : maxPrice,
                maxDistance: `${maxDistance} km`
            },
            totalProperties: sortedListings.length,
            currentPage: page,
            totalPages: Math.ceil(sortedListings.length / limit),
            limit,
            sortBy,
            properties: formattedListings
        }, { status: 200 });

    } catch (error) {
        console.error('💥 Error in Near You API:', error);
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