// "use client";

// import { Plus } from "lucide-react";
// import Image from "next/image";
// import houseImg from "../../assets/bed.jpeg";

// /* ---------- Dashboard Page ---------- */
// export default function HostDashboardPage() {
//   const recentActivity = [
//     { type: "booking", name: "John Doe", price: "$500", time: "2 hours ago" },
//     { type: "review", name: "Sarah Smith", time: "5 hours ago" },
//     { type: "payment", name: "Michael Green", amount: "$850", time: "1 day ago" },
//   ];

//   const listings = [
//     {
//       title: "Cozy Room in Victorian House",
//       price: "$750/month",
//       status: "Available",
//       views: 24,
//       messages: 8,
//     },
//     {
//       title: "Modern Studio Apartment",
//       price: "$950/month",
//       status: "Occupied",
//       views: 18,
//       messages: 5,
//     },
//   ];

//   return (
//     <main className="flex-1 overflow-y-auto p-6">
//       {/* Top Welcome + Button */}
//       <div className="flex justify-between items-center mb-6">
//         <div>
//           <h1 className="text-2xl font-bold text-gray-800">Welcome Margaret!</h1>
//           <p className="text-gray-500">Here's what's happening with your listings today</p>
//         </div>
//         <button className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700">
//           <Plus className="h-4 w-4" />
//           <span>Add New Listing</span>
//         </button>
//       </div>

//       {/* Stats Cards */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
//         <StatCard title="Total Earnings" value="$4,250" subtext="+12% vs last month" />
//         <StatCard title="Active Bookings" value="7" subtext="2 pending responses" />
//         <StatCard title="Occupancy Rate" value="85%" subtext="3 of 4 rooms occupied" />
//         <StatCard title="Average Rating" value="4.8⭐" subtext="Based on 24 reviews" />
//       </div>

//       {/* Recent Activity + Listings */}
//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//         {/* Recent Activity Section */}
//         <div className="lg:col-span-2 bg-white rounded-lg shadow-sm p-5">
//           <div className="flex justify-between items-center mb-4">
//             <h2 className="font-semibold text-gray-800">Recent Activity</h2>
//             <a href="#" className="text-sm text-green-600 font-medium hover:underline">
//               View all
//             </a>
//           </div>
//           <div className="space-y-4">
//             {recentActivity.map((item, index) => (
//               <RecentActivityItem key={index} item={item} />
//             ))}
//           </div>
//         </div>

//         {/* Listings Section */}
//         <div className="bg-white rounded-lg shadow-sm p-5">
//           <div className="flex justify-between items-center mb-4">
//             <h2 className="font-semibold text-gray-800">Your Listings</h2>
//             <span className="text-sm text-gray-500 cursor-pointer">All Status</span>
//           </div>
//           <div className="space-y-4">
//             {listings.map((listing, index) => (
//               <ListingCard key={index} listing={listing} />
//             ))}
//           </div>
//         </div>
//       </div>
//     </main>
//   );
// }

// /* ---------- Components ---------- */

// const StatCard = ({ title, value, subtext }) => (
//   <div className="bg-white rounded-lg shadow-sm p-4">
//     <h4 className="text-sm font-semibold text-gray-500 mb-1">{title}</h4>
//     <p className="text-2xl font-bold text-gray-800">{value}</p>
//     <p className="text-xs text-green-600 mt-1">{subtext}</p>
//   </div>
// );

// const RecentActivityItem = ({ item }) => (
//   <div className="flex justify-between items-center border-b border-gray-100 last:border-0 pb-3">
//     <div>
//       {item.type === "booking" && (
//         <p className="text-gray-800 font-medium">New booking request from {item.name}</p>
//       )}
//       {item.type === "review" && (
//         <p className="text-gray-800 font-medium">New review from {item.name}</p>
//       )}
//       {item.type === "payment" && (
//         <p className="text-gray-800 font-medium">Payment received from {item.name}</p>
//       )}
//       <p className="text-sm text-gray-500">{item.price || item.amount || ""}</p>
//       <p className="text-xs text-gray-400">{item.time}</p>
//     </div>
//     {item.type === "booking" && (
//       <div className="space-x-2">
//         <button className="px-3 py-1 bg-green-600 text-white rounded text-sm hover:bg-green-700">
//           Accept
//         </button>
//         <button className="px-3 py-1 bg-red-500 text-white rounded text-sm hover:bg-red-600">
//           Decline
//         </button>
//       </div>
//     )}
//     {item.type === "review" && (
//       <button className="px-3 py-1 bg-gray-100 text-sm rounded hover:bg-gray-200">
//         View
//       </button>
//     )}
//     {item.type === "payment" && (
//       <span className="text-green-600 font-medium">{item.amount}</span>
//     )}
//   </div>
// );

// const ListingCard = ({ listing }) => (
//   <div className="flex items-center space-x-3 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition bg-gray-50">
//     <div className="w-20 h-20 flex-shrink-0">
//       <Image src={houseImg} alt="listing" className="w-full h-full object-cover" />
//     </div>
//     <div className="flex-1">
//       <p className="font-semibold text-gray-800">{listing.title}</p>
//       <p className="text-green-600 font-medium text-sm">{listing.price}</p>
//       <span
//         className={`text-xs font-medium px-2 py-0.5 rounded-full ${
//           listing.status === "Available"
//             ? "bg-green-100 text-green-700"
//             : "bg-yellow-100 text-yellow-700"
//         }`}
//       >
//         {listing.status}
//       </span>
//     </div>
//     <div className="flex flex-col items-end text-xs text-gray-500">
//       <span>👁 {listing.views}</span>
//       <span>💬 {listing.messages}</span>
//     </div>
//   </div>
// );



// HostDashboardPage.jsx
"use client";

import { Plus, ChevronLeft } from "lucide-react";
import Image from "next/image";
import React, { useState } from 'react';
// Assuming the image import path is correct for your project
const houseImg = "../../assets/bed.jpeg"; 

// Import the multi-step form container
import AddListingFormContainer from "./AddListing";


// --- Main Export Component ---
export default function HostDashboardPage() {
    // State to toggle between the Dashboard view and the Add New Listing form view
    const [isAddingListing, setIsAddingListing] = useState(false);

    // Mock data for the Dashboard view
    const recentActivity = [
        { type: "booking", name: "Sarah Chen", price: "Cozy Room... $750/month", time: "2 hours ago" },
        { type: "review", name: "James Rodriguez", time: "Yesterday" },
        { type: "payment", name: "Steve Joe", amount: "€750", time: "2 days ago" },
        { type: "payment", name: "Alex Kim", amount: "€750", time: "2 days ago" },
    ];

    const listings = [
        {
            title: "Cozy Room in Victorian House",
            price: "€750/month",
            status: "Available",
            views: 24,
            messages: 8,
        },
        {
            title: "Modern Studio Apartment",
            price: "€950/month",
            status: "Occupied",
            views: 18,
            messages: 5,
        },
    ];

    // --- Conditional Rendering Logic ---
    if (isAddingListing) {
        // Render the Multi-Step Form Container when isAddingListing is true
        return (
            <main className="flex-1 overflow-y-auto">
                <AddListingFormContainer onCancel={() => setIsAddingListing(false)} />
            </main>
        );
    }

    // --- Default Dashboard View ---
    return (
        <main className="flex-1 overflow-y-auto p-6">
            {/* Top Welcome + Button (Updated to set isAddingListing to true) */}
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">Welcome Margaret!</h1>
                    <p className="text-gray-500">Here's what's happening with your listings today</p>
                </div>
                <button 
                    onClick={() => setIsAddingListing(true)} // Set state to switch view
                    className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
                >
                    <Plus className="h-4 w-4" />
                    <span>Add New Listing</span>
                </button>
            </div>

            {/* Stats Cards (Matched to image_d0445e.png) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <StatCard title="Total Earnings" value="€4,250" subtext="+12% vs last month" icon="€" />
                <StatCard title="Active Bookings" value="7" subtext="2 pending responses" icon="calendar" />
                <StatCard title="Occupancy Rate" value="85%" subtext="3 of 4 rooms occupied" icon="home" />
                <StatCard title="Average Rating" value="4.8⭐" subtext="Based on 24 reviews" icon="star" />
            </div>

            {/* Recent Activity + Listings */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Recent Activity Section */}
                <div className="lg:col-span-2 bg-white rounded-lg shadow-sm p-5">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="font-semibold text-gray-800">Recent Activity</h2>
                        <a href="#" className="text-sm text-green-600 font-medium hover:underline">
                            View all
                        </a>
                    </div>
                    <div className="space-y-4">
                        {recentActivity.map((item, index) => (
                            <RecentActivityItem key={index} item={item} />
                        ))}
                    </div>
                </div>

                {/* Listings Section */}
                <div className="bg-white rounded-lg shadow-sm p-5">
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

/* ---------- Components (Modified/Included for Completeness) ---------- */

const StatCard = ({ title, value, subtext }) => (
    <div className="bg-white rounded-lg shadow-sm p-4">
        <h4 className="text-sm font-semibold text-gray-500 mb-1">{title}</h4>
        <p className="text-2xl font-bold text-gray-800">{value}</p>
        <p className="text-xs text-green-600 mt-1">{subtext}</p>
    </div>
);

const RecentActivityItem = ({ item }) => (
    <div className="flex justify-between items-center border-b border-gray-100 last:border-0 pb-3 pt-3">
        {/* Placeholder for icon/avatar */}
        <div className='flex items-start space-x-3'>
             <div className="w-8 h-8 rounded-full flex items-center justify-center bg-gray-100 text-gray-500 text-xs mt-1">
                {item.type === "booking" && '👤'}
                {item.type === "review" && '⭐'}
                {item.type === "payment" && '💲'}
            </div>
            <div>
                {item.type === "booking" && (
                    <>
                        <p className="text-gray-800 font-medium">New booking request from Sarah Chen</p>
                        <p className="text-sm text-gray-500">Cozy Room... · 6 months</p>
                    </>
                )}
                {item.type === "review" && (
                    <>
                        <p className="text-gray-800 font-medium">New review from James Rodriguez</p>
                        <p className="text-sm text-gray-500">⭐⭐⭐⭐</p>
                    </>
                )}
                {item.type === "payment" && (
                     <>
                        <p className="text-gray-800 font-medium">Payment received from {item.name}</p>
                        <p className="text-sm text-gray-500">Modern Studio... · $750 monthly rent</p>
                    </>
                )}
                <p className="text-xs text-gray-400 mt-1">{item.time}</p>
            </div>
        </div>

        {/* Actions/Amounts */}
        {item.type === "booking" && (
            <div className="space-x-2 flex-shrink-0">
                <button className="px-3 py-1 bg-green-600 text-white rounded text-sm hover:bg-green-700">
                    Accept
                </button>
                <button className="px-3 py-1 bg-red-500 text-white rounded text-sm hover:bg-red-600">
                    Decline
                </button>
            </div>
        )}
        {item.type === "review" && (
            <button className="px-3 py-1 bg-gray-100 text-sm rounded hover:bg-gray-200">
                View
            </button>
        )}
        {item.type === "payment" && (
            <span className="text-green-600 font-medium text-lg">{item.amount}</span>
        )}
    </div>
);

const ListingCard = ({ listing }) => (
    <div className="flex items-center space-x-3 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition bg-white border border-gray-100 p-3">
        <div className="w-24 h-24 flex-shrink-0">
            {/* Replace with your actual image component */}
            <div className="w-full h-full bg-gray-200 rounded-md"></div> 
        </div>
        <div className="flex-1">
            <p className="font-semibold text-gray-800">{listing.title}</p>
            <p className="text-green-600 font-medium text-lg">{listing.price}</p>
            <span
                className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                    listing.status === "Available"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                }`}
            >
                {listing.status}
            </span>
        </div>
        <div className="flex flex-col items-end text-xs text-gray-500">
            <span>👁 {listing.views}</span>
            <span>💬 {listing.messages}</span>
        </div>
    </div>
);