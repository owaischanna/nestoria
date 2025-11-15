"use client";

import { Plus, Loader2 } from "lucide-react";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../context/AuthContext";
import AddListingFormContainer from "./AddListing";
import toast from 'react-hot-toast';

// Default state for analytics to prevent errors on load
const initialAnalytics = {
    totalEarnings: "€0",
    activeBookings: 0,
    occupancyRate: "0%",
    averageRating: "N/A",
    pendingResponses: 0,
    totalReviews: 0,
};

export default function HostDashboardPage() {
    const [isAddingListing, setIsAddingListing] = useState(false);
    const { user, loading: authLoading } = useAuth();
    const router = useRouter();

    // State for our API data
    const [dashboardData, setDashboardData] = useState({
        listings: [],
        analytics: initialAnalytics,
        recentActivity: [], // We still receive this from the API, but won't use it
    });
    const [isLoadingData, setIsLoadingData] = useState(true);

    useEffect(() => {
        if (!authLoading && (!user || user.role !== "host")) {
            router.push("/");
        }

        // Fetch dashboard data if user is a host
        if (user && user.role === "host") {
            const fetchDashboardData = async () => {
                setIsLoadingData(true);
                try {
                    const response = await fetch('/api/host/dashboard');
                    const result = await response.json();

                    if (!response.ok) {
                        throw new Error(result.message || 'Failed to fetch dashboard data');
                    }

                    setDashboardData(result.data);
                } catch (error) {
                    toast.error(error.message);
                } finally {
                    setIsLoadingData(false);
                }
            };

            fetchDashboardData();
        }
    }, [user, authLoading, router]);

    const handleListingAdded = () => {
        setIsAddingListing(false);
        // TODO: Refresh data after adding a new listing
        // You would typically call fetchDashboardData() again here
        toast.success('Listing added successfully!');
    };

    // Destructure only what we need
    const { listings, analytics } = dashboardData;

    // Show a full-page loader for auth
    if (authLoading || !user) {
        return (
            <div className="flex h-screen w-full items-center justify-center bg-gray-50">
                <Loader2 className="w-8 h-8 animate-spin text-green-600" />
            </div>
        );
    }

    if (isAddingListing) {
        return (
            <main className="flex-1 overflow-y-auto px-4 sm:px-6">
                <AddListingFormContainer
                    onCancel={() => setIsAddingListing(false)}
                    onSuccess={handleListingAdded}
                />
            </main>
        );
    }

    return (
        <main className="flex-1 overflow-y-auto px-4 sm:px-6 py-6 bg-gray-50 w-full overflow-x-hidden">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">Welcome {user.firstName}!</h1>
                    <p className="text-gray-500 text-sm sm:text-base">Here’s what’s happening today</p>
                </div>

                <button
                    onClick={() => setIsAddingListing(true)}
                    className="flex items-center justify-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition w-full sm:w-auto"
                >
                    <Plus className="h-4 w-4" />
                    <span>Add New Listing</span>
                </button>
            </div>

            {/* Main content loader */}
            {isLoadingData ? (
                <div className="flex h-64 w-full items-center justify-center bg-gray-50">
                    <Loader2 className="w-8 h-8 animate-spin text-green-600" />
                </div>
            ) : (
                <>
                    {/* Stats Grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
                        <StatCard title="Total Earnings" value={analytics.totalEarnings} subtext="+12% vs last month" />
                        <StatCard title="Active Bookings" value={analytics.activeBookings} subtext={`${analytics.pendingResponses} pending`} />
                        <StatCard title="Occupancy Rate" value={analytics.occupancyRate} subtext="Based on your listings" />
                        <StatCard title="Average Rating" value={analytics.averageRating} subtext={`Based on ${analytics.totalReviews} reviews`} />
                    </div>

                    {/* Listings Grid (Replaces Main Grid) */}
                    <div className="bg-white rounded-lg shadow-sm p-5 border border-gray-100">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-semibold text-gray-800">Your Listings</h2>
                            <span className="text-sm text-gray-500 cursor-pointer">All Status</span>
                        </div>

                        {/* Grid layout for listings */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {listings.length > 0 ? (
                                listings.map((listing) => (
                                    <ListingCard key={listing.id} listing={listing} />
                                ))
                            ) : (
                                <p className="text-sm text-gray-500 text-center py-4 md:col-span-2 lg:col-span-3">
                                    You haven't added any listings yet.
                                </p>
                            )}
                        </div>
                    </div>
                </>
            )}
        </main>
    );
}

/* ===================== COMPONENTS ===================== */

const StatCard = ({ title, value, subtext }) => (
    <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-100">
        <h4 className="text-xs sm:text-sm font-semibold text-gray-500 mb-1">{title}</h4>
        <p className="text-xl sm:text-2xl font-bold text-gray-800">{value}</p>
        <p className="text-xs text-green-600 mt-1">{subtext}</p>
    </div>
);

// --- RecentActivityItem component has been removed ---

/**
 * Updated ListingCard component for a grid view
 */
const ListingCard = ({ listing }) => (
    <div className="flex flex-col rounded-lg overflow-hidden shadow-sm hover:shadow-md transition bg-white border border-gray-100">

        {/* Image */}
        <div className="w-full h-48 bg-gray-200">
            <img
                src={listing.imageSrc || "https://via.placeholder.com/300x200"}
                alt={listing.title}
                className="w-full h-full object-cover"
            />
        </div>

        {/* Info */}
        <div className="p-4 flex-1 flex flex-col justify-between">
            <div>
                <p className="font-semibold text-gray-800 truncate" title={listing.title}>
                    {listing.title}
                </p>
                <p className="text-green-600 font-medium text-lg">{listing.price}</p>
                <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${listing.status === "Available"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}>
                    {listing.status}
                </span>
            </div>

            {/* Stats */}
            <div className="flex justify-end items-center text-xs text-gray-500 gap-3 pt-3 mt-3 border-t border-gray-100">
                <span>👁 {listing.views}</span>
                <span>💬 {listing.messages}</span>
            </div>
        </div>
    </div>
);