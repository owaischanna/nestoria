"use client";

import { Plus } from "lucide-react";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../context/AuthContext";
import AddListingFormContainer from "./AddListing";

export default function HostDashboardPage() {
    const [isAddingListing, setIsAddingListing] = useState(false);
    const { user, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!loading && (!user || user.role !== "host")) {
            router.push("/");
        }
    }, [user, loading, router]);

    const handleListingAdded = () => setIsAddingListing(false);

    const recentActivity = [
        { type: "booking", name: "Sarah Chen", price: "Cozy Room... $750/month", time: "2 hours ago" },
        { type: "review", name: "James Rodriguez", time: "Yesterday" },
        { type: "payment", name: "Steve Joe", amount: "€750", time: "2 days ago" },
        { type: "payment", name: "Alex Kim", amount: "€750", time: "2 days ago" },
    ];

    const listings = [
        { title: "Cozy Room in Victorian House", price: "€750/month", status: "Available", views: 24, messages: 8 },
        { title: "Modern Studio Apartment", price: "€950/month", status: "Occupied", views: 18, messages: 5 },
    ];

    if (loading || !user) {
        return (
            <div className="flex h-screen w-full items-center justify-center bg-gray-50">
                <p className="text-lg font-semibold text-gray-700">Loading your dashboard...</p>
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

            {/* Stats Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
                <StatCard title="Total Earnings" value="€4,250" subtext="+12% vs last month" />
                <StatCard title="Active Bookings" value="7" subtext="2 pending responses" />
                <StatCard title="Occupancy Rate" value="85%" subtext="3 of 4 rooms occupied" />
                <StatCard title="Average Rating" value="4.8⭐" subtext="Based on 24 reviews" />
            </div>

            {/* Main Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Recent Activity */}
                <div className="lg:col-span-2 bg-white rounded-lg shadow-sm p-5 border border-gray-100">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="font-semibold text-gray-800">Recent Activity</h2>
                        <button className="text-sm text-green-600 font-medium hover:underline">
                            View all
                        </button>
                    </div>

                    <div className="space-y-4">
                        {recentActivity.map((item, index) => (
                            <RecentActivityItem key={index} item={item} />
                        ))}
                    </div>
                </div>

                {/* Listings */}
                <div className="bg-white rounded-lg shadow-sm p-5 border border-gray-100">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="font-semibold text-gray-800">Your Listings</h2>
                        <span className="text-sm text-gray-500 cursor-pointer">All Status</span>
                    </div>

                    <div className="space-y-4">
                        {listings.map((listing, index) => (
                            <ListingCard key={index} listing={listing} />
                        ))}
                    </div>
                </div>
            </div>
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

const RecentActivityItem = ({ item }) => (
    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center border-b border-gray-100 last:border-0 py-3 gap-3 sm:gap-0">

        {/* Left */}
        <div className="flex items-start space-x-3">
            <div className="w-8 h-8 rounded-full flex items-center justify-center bg-gray-100 text-gray-500 text-xs mt-1">
                {item.type === "booking" && "👤"}
                {item.type === "review" && "⭐"}
                {item.type === "payment" && "💲"}
            </div>

            <div>
                {item.type === "booking" && (
                    <>
                        <p className="text-gray-800 font-medium">New booking from {item.name}</p>
                        <p className="text-sm text-gray-500">{item.price}</p>
                    </>
                )}
                {item.type === "review" && (
                    <>
                        <p className="text-gray-800 font-medium">New review from {item.name}</p>
                        <p className="text-sm text-gray-500">⭐⭐⭐⭐</p>
                    </>
                )}
                {item.type === "payment" && (
                    <>
                        <p className="text-gray-800 font-medium">Payment from {item.name}</p>
                        <p className="text-sm text-gray-500">Amount: {item.amount}</p>
                    </>
                )}
                <p className="text-xs text-gray-400 mt-1">{item.time}</p>
            </div>
        </div>

        {/* Right actions */}
        <div className="flex gap-2 mt-2 sm:mt-0">

            {item.type === "booking" && (
                <>
                    <button className="px-3 py-1 bg-green-600 text-white rounded text-xs sm:text-sm hover:bg-green-700">
                        Accept
                    </button>
                    <button className="px-3 py-1 bg-red-500 text-white rounded text-xs sm:text-sm hover:bg-red-600">
                        Decline
                    </button>
                </>
            )}

            {item.type === "review" && (
                <button className="px-3 py-1 bg-gray-100 text-xs rounded hover:bg-gray-200">
                    View
                </button>
            )}

            {item.type === "payment" && (
                <span className="text-green-600 font-semibold text-base sm:text-lg">{item.amount}</span>
            )}

        </div>
    </div>
);

const ListingCard = ({ listing }) => (
    <div className="flex items-center sm:items-start flex-col sm:flex-row gap-3 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition bg-white border border-gray-100 p-3">

        {/* Image */}
        <div className="w-full sm:w-24 h-32 sm:h-24 bg-gray-200 rounded-md overflow-hidden">
            <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOgziMScOHDsVglNc-id0yJKnfFd_DN20hmg&s"
                alt={listing.title}
                className="w-full h-full object-cover"
            />
        </div>

        {/* Info */}
        <div className="flex-1 w-full">
            <p className="font-semibold text-gray-800">{listing.title}</p>
            <p className="text-green-600 font-medium text-lg">{listing.price}</p>

            <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                listing.status === "Available"
                    ? "bg-green-100 text-green-700"
                    : "bg-yellow-100 text-yellow-700"
            }`}>
                {listing.status}
            </span>
        </div>

        {/* Stats */}
        <div className="flex flex-row sm:flex-col items-center sm:items-end text-xs text-gray-500 gap-3 sm:gap-1">
            <span>👁 {listing.views}</span>
            <span>💬 {listing.messages}</span>
        </div>
    </div>
);
