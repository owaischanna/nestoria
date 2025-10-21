import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import dbConnect from '@/lib/mongodb';
import User from '@/app/models/User';
import Listing from '@/app/models/Listing';

// Helper function to get the user from the token
async function verifyAuth(request) {
    const token = request.cookies.get('authToken')?.value;

    if (!token) {
        return { error: "Missing authentication token.", status: 401 };
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        return { user: decoded };
    } catch (error) {
        return { error: "Invalid or expired token.", status: 401 };
    }
}

export async function POST(request) {
    await dbConnect();

    try {
        // 1. Authenticate the user
        const auth = await verifyAuth(request);
        if (auth.error) {
            return NextResponse.json({ message: auth.error }, { status: auth.status });
        }

        const { user } = auth;

        // 2. Authorize the user (Check if role is 'host')
        if (user.role !== 'host') {
            return NextResponse.json(
                { message: "Access denied. Only hosts can create listings." },
                { status: 403 } // 403 Forbidden
            );
        }

        // 3. Get the listing data from the request body
        const body = await request.json();

        // 4. Basic validation (you can expand this)
        const {
            listingTitle,
            monthlyRent,
            photos,
            propertyType,
            description,
            address,
            // ... all other fields
        } = body;

        if (!listingTitle || !monthlyRent || !photos || !photos.cover) {
            return NextResponse.json(
                { message: "Missing required fields: Title, Rent, and Cover Photo are required." },
                { status: 400 }
            );
        }

        // 5. Create and save the new listing
        // We add `hostId` from our authenticated user's token
        const newListing = new Listing({
            ...body,
            hostId: user.userId, // Link the listing to the host
        });

        await newListing.save();

        // 6. Send a success response
        return NextResponse.json(
            { message: "Listing created successfully!", listing: newListing },
            { status: 201 }
        );

    } catch (error) {
        console.error("Error creating listing:", error);

        if (error.name === 'ValidationError') {
            return NextResponse.json(
                { message: "Validation Error", error: error.message },
                { status: 400 }
            );
        }

        return NextResponse.json(
            { message: "An error occurred while creating the listing.", error: error.message },
            { status: 500 }
        );
    }
}


export async function GET(request) {
    console.log("\n--- [GET /api/listings] ---");
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

        // 2. Authorize the user (Check if role is 'host')
        if (user.role !== 'host') {
            console.log(`Authorization failed: User role is '${user.role}', not 'host'.`);
            return NextResponse.json({ message: "Access denied. Only hosts can view their listings." }, { status: 403 });
        }
        console.log("User authorized as 'host'.");

        // 3. Get Pagination Parameters from URL Query
        const { searchParams } = new URL(request.url);
        const page = parseInt(searchParams.get('page') || '1', 10);
        const limit = parseInt(searchParams.get('limit') || '5', 10); // Default limit to 5
        const skip = (page - 1) * limit;

        console.log(`Fetching listings for hostId: ${user.userId}, Page: ${page}, Limit: ${limit}, Skip: ${skip}`);

        // 4. Fetch Paginated Listings for the specific host
        const listings = await Listing.find({ hostId: user.userId })
            .sort({ createdAt: -1 }) // Sort by newest first
            .skip(skip)
            .limit(limit);

        // 5. Get Total Count for Pagination Info
        const totalListings = await Listing.countDocuments({ hostId: user.userId });
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
        console.error("\n--- [API CATCH BLOCK - GET] ---");
        console.error("An error occurred while fetching listings:", error.message);
        console.error("Full error object:", error);
        console.error("--- [END OF ERROR] ---");

        return NextResponse.json(
            { message: "An error occurred while fetching listings.", error: error.message },
            { status: 500 }
        );
    }
}