import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import dbConnect from '@/lib/mongodb';
import Listing from '@/app/models/Listing'; // Assuming your Listing model is here
import User from '@/app/models/User'; // Needed for role check if not in token

// Helper function to verify authentication (same as before)
async function verifyAuth(request) {
    const token = request.cookies.get('authToken')?.value;
    if (!token) {
        return { error: "Missing authentication token.", status: 401 };
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // Ensure the decoded token has the necessary role info
        if (!decoded || !decoded.role) {
            return { error: "Invalid token payload.", status: 401 };
        }
        return { user: decoded };
    } catch (error) {
        return { error: "Invalid or expired token.", status: 401 };
    }
}

export async function GET(request) {
    console.log("\n--- [GET /api/listings/all] ---");
    console.log("Timestamp:", new Date().toISOString());

    try {
        console.log("Attempting to connect to database...");
        await dbConnect();
        console.log("Database connection successful.");

        // 1. Authenticate the user
        console.log("Attempting to authenticate user...");
        const auth = await verifyAuth(request);
        if (auth.error) {
            console.log("Authentication failed:", auth.error);
            return NextResponse.json({ message: auth.error }, { status: auth.status });
        }
        const { user } = auth;
        console.log("User authenticated:", user.email);

        // 2. Authorize the user (Optional: Ensure role is 'renter' or just logged in)
        // If *any* logged-in user can see listings, you might skip this role check.
        // If only renters can see them:
        if (user.role !== 'renter') {
            console.log(`Authorization failed: User role is '${user.role}', not 'renter'.`);
            return NextResponse.json({ message: "Access denied. Only renters can view all listings." }, { status: 403 });
        }
        console.log("User authorized as 'renter'.");


        // 3. Get Pagination Parameters
        const { searchParams } = new URL(request.url);
        const page = parseInt(searchParams.get('page') || '1', 10);
        const limit = parseInt(searchParams.get('limit') || '5', 10); // Default limit 5
        const skip = (page - 1) * limit;

        console.log(`Fetching all listings. Page: ${page}, Limit: ${limit}, Skip: ${skip}`);

        // 4. Fetch Paginated Listings (No hostId filter)
        const listings = await Listing.find({}) // Fetch all listings
            .sort({ createdAt: -1 }) // Sort by newest first
            .skip(skip)
            .limit(limit)
            .populate('hostId', 'firstName lastName'); // Optionally populate host info (excluding sensitive fields)

        // 5. Get Total Count for Pagination
        const totalListings = await Listing.countDocuments({});
        const totalPages = Math.ceil(totalListings / limit);

        console.log(`Found ${listings.length} listings for this page. Total listings: ${totalListings}. Total pages: ${totalPages}.`);

        // 6. Send Response
        return NextResponse.json({
            message: "Listings fetched successfully!",
            data: listings,
            pagination: {
                currentPage: page,
                totalPages: totalPages,
                totalListings: totalListings,
                limit: limit,
            }
        }, { status: 200 });

    } catch (error) {
        console.error("\n--- [API CATCH BLOCK - GET /all] ---");
        console.error("An error occurred while fetching all listings:", error.message);
        console.error("Full error object:", error);
        console.error("--- [END OF ERROR] ---");

        return NextResponse.json(
            { message: "An error occurred while fetching listings.", error: error.message },
            { status: 500 }
        );
    }
}