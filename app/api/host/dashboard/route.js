import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import { verifyToken } from '@/lib/auth';
import Listing from '@/app/models/Listing';
async function getAnalytics(hostId, listings) {
    return {
        totalEarnings: "€4,250",
        activeBookings: 7,
        occupancyRate: "85%",
        averageRating: "4.8⭐",
        pendingResponses: 2,
        totalReviews: 24,
    };
}
async function getRecentActivity(hostId) {
    return [
        { type: "booking", name: "Sarah Chen", price: "Cozy Room... €750/month", time: "2 hours ago" },
        { type: "review", name: "James Rodriguez", rating: 4, time: "Yesterday" },
        { type: "payment", name: "Steve Joe", amount: "€750", time: "2 days ago" },
        { type: "payment", name: "Alex Kim", amount: "€750", time: "2 days ago" },
    ];
}

/**
 * Fetches the host's actual listings from the database.
 */
async function getHostListings(hostId) {
    const listings = await Listing.find({ hostId })
        .select('listingTitle monthlyRent photos moveInDate') // Only select data needed for the card
        .sort({ createdAt: -1 })
        .lean();
    return listings.map(listing => ({
        id: listing._id,
        title: listing.listingTitle,
        price: `€${listing.monthlyRent}/month`,
        status: new Date(listing.moveInDate) > new Date() ? "Available" : "Occupied", // Simple logic
        imageSrc: listing.photos.cover,
        views: Math.floor(Math.random() * 50) + 10, // Mocked views
        messages: Math.floor(Math.random() * 10) + 1, // Mocked messages
    }));
}


// --- API HANDLER ---

export async function GET(req) {
    try {
        await dbConnect();

        // 1. Verify user is a host
        const decoded = await verifyToken();
        if (!decoded) {
            return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
        }

        if (decoded.role !== 'host') {
            return NextResponse.json({ message: 'Forbidden: User is not a host' }, { status: 403 });
        }

        const hostId = decoded.userId;

        // 2. Fetch all data in parallel
        const [
            listings,
            analytics,
            recentActivity
        ] = await Promise.all([
            getHostListings(hostId),
            getAnalytics(hostId, []), // Pass listings to analytics if needed
            getRecentActivity(hostId)
        ]);

        // 3. Return the combined dashboard data
        return NextResponse.json({
            success: true,
            data: {
                listings,
                analytics,
                recentActivity
            }
        }, { status: 200 });

    } catch (error) {
        return NextResponse.json(
            { message: 'An error occurred fetching dashboard data', error: error.message },
            { status: 500 }
        );
    }
}