// MyBookingsPage.jsx
"use client";

import React from 'react';
import { 
    Download, MapPin, Star, Clock, Home, Users, Square
} from 'lucide-react';

// Assume DashboardLayout is available as established
import RenterHeader from './RenterHeader';
import Sidebar from './RenterSidebar';

// --- MOCK DATA ---
const bookingsData = {
    summary: {
        active: 2,
        checkIns: 1,
        checkOuts: 1,
        totalSpent: '$1,900',
    },
    currentBookings: [
        {
            id: 1,
            status: 'Check-in Today', // Status is dynamic, but hardcoded here
            title: 'Modern Studio in Brooklyn',
            location: 'Williamsburg, Brooklyn',
            host: {
                name: 'Margaret Johnson',
                rating: 4.8,
                reviews: 24,
                avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=80&q=80',
            },
            leasePeriod: 'Oct 28, 2024 - Apr 28, 2025',
            remainingMonths: '6 months remaining',
            monthlyRent: '$950/month',
            totalPaid: '$950',
            nextDue: 'Nov 1',
            paymentsCount: '1 of 6 payments',
            propertyType: 'Studio',
            roomType: 'Private',
            size: '400 sqft',
            checkInScheduled: '2:00 PM - 3:00 PM',
            propertyAddress: '245 Berry St, Apt 3B, Brooklyn, NY 11211',
            hostContact: '+1 (555) 234-5678',
        },
        {
            id: 2,
            status: 'Active Booking',
            title: 'Cozy Room Near NYU Campus',
            location: 'Greenwich Village, Manhattan',
            host: {
                name: 'Margaret Johnson',
                rating: 4.8,
                reviews: 24,
                avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=80&q=80',
            },
            leasePeriod: 'Nov 1, 2024 - May 1, 2025',
            remainingMonths: '6 months remaining',
            monthlyRent: '$950/month',
            totalPaid: '$950',
            nextDue: 'Nov 1',
            paymentsCount: '1 of 6 payments',
            propertyType: 'Studio',
            roomType: 'Private',
            size: '400 sqft',
            checkInScheduled: '2:00 PM - 3:00 PM',
            propertyAddress: '245 Berry St, Apt 3B, Brooklyn, NY 11211',
            hostContact: '+1 (555) 234-5678',
        },
    ]
}

// --- Sub-Component: BookingCard ---
const BookingCard = ({ booking }) => {
    // Helper to determine status style
    const getStatusStyle = (status) => {
        if (status.includes('Today')) return "bg-orange-100 text-orange-700";
        if (status.includes('Active')) return "bg-green-100 text-green-700";
        return "bg-gray-100 text-gray-700";
    }

    return (
        <div className="flex bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 p-6 space-x-6 mb-6">
            
            {/* Left Section: Image and Property Info */}
            <div className="flex-shrink-0 w-48 relative">
                <img 
                    src={`https://enzahome.pk/cdn/shop/files/baselbed.jpg?v=1740996046&width=500`} // Placeholder image
                    alt={booking.title}
                    className="w-full h-full object-cover rounded-lg"
                />
            </div>

            {/* Middle Section: Details */}
            <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start">
                    <h3 className="text-xl font-bold text-gray-900 truncate">{booking.title}</h3>
                    <span className={`px-3 py-1 text-sm font-semibold rounded-lg ${getStatusStyle(booking.status)}`}>
                        {booking.status.toUpperCase()}
                    </span>
                </div>
                
                <p className="text-sm text-gray-500 flex items-center mt-1">
                    <MapPin className="w-4 h-4 mr-1" />
                    {booking.location}
                </p>

                {/* Host Info */}
                <div className="flex items-center mt-3 space-x-3 text-sm">
                    <img 
                        src={booking.host.avatar}
                        alt={booking.host.name}
                        className="w-8 h-8 rounded-full object-cover"
                    />
                    <p className="font-semibold text-gray-800">{booking.host.name}</p>
                    <span className="flex items-center text-amber-500">
                        <Star className="w-4 h-4 fill-amber-500" />
                        <span className="ml-1 text-gray-600">{booking.host.rating} ({booking.host.reviews} reviews)</span>
                    </span>
                </div>

                {/* Lease and Financials Grid */}
                <div className="grid grid-cols-3 gap-y-2 mt-4 text-sm">
                    <div className="col-span-1">
                        <p className="font-medium text-gray-700">Lease Period</p>
                        <p className="text-gray-500">{booking.leasePeriod}</p>
                        <p className="text-xs text-amber-600">{booking.remainingMonths}</p>
                    </div>
                    <div className="col-span-1">
                        <p className="font-medium text-gray-700">Monthly Rent</p>
                        <p className="text-green-600 font-bold">{booking.monthlyRent}</p>
                        <p className="text-xs text-gray-500">Next due: {booking.nextDue}</p>
                    </div>
                    <div className="col-span-1">
                        <p className="font-medium text-gray-700">Total Paid</p>
                        <p className="text-gray-900 font-semibold">{booking.totalPaid}</p>
                        <p className="text-xs text-gray-500">{booking.paymentsCount}</p>
                    </div>
                </div>

                {/* Check-in Details */}
                <div className="mt-5 pt-4 border-t border-gray-100">
                    <p className="text-base font-semibold text-gray-800 mb-2">Check-in Details</p>
                    <div className="flex justify-between text-sm">
                        <div className="space-y-2">
                            <div className="flex items-center text-blue-600">
                                <Clock className="w-4 h-4 mr-2" />
                                <span className="font-medium">Scheduled Time</span>
                            </div>
                            <p className="ml-6 font-bold text-blue-600">{booking.checkInScheduled} <span className="text-xs text-red-500 ml-2">TODAY</span></p>
                        </div>
                        <div className="space-y-2">
                            <div className="font-medium text-gray-700">Property Address</div>
                            <p className="text-gray-500">{booking.propertyAddress}</p>
                        </div>
                        <div className="space-y-2">
                            <div className="font-medium text-gray-700">Host Contact</div>
                            <p className="text-gray-500">{booking.hostContact}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Section: Property Specs and Actions */}
            <div className="flex flex-col justify-between items-end pl-6 border-l border-gray-100">
                <div className="text-sm space-y-2 mb-4">
                    <div className="flex items-center text-gray-600">
                        <Home className="w-4 h-4 mr-2" />
                        <span>{booking.propertyType}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                        <Users className="w-4 h-4 mr-2" />
                        <span>{booking.roomType}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                        <Square className="w-4 h-4 mr-2" />
                        <span>{booking.size}</span>
                    </div>
                </div>
                
                <div className="flex flex-col space-y-2 w-full min-w-[150px]">
                    <button className="text-sm font-medium text-amber-600 hover:text-amber-700">
                        Get Directions
                    </button>
                    <button className="py-2 px-4 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition shadow-md">
                        Call Host
                    </button>
                    <button className="py-2 px-4 text-sm font-medium text-white bg-amber-600 rounded-lg hover:bg-amber-700 transition shadow-md">
                        Check-in
                    </button>
                </div>
            </div>
        </div>
    );
};


// --- Main Page Content ---
const MyBookingsContent = () => {
    const summary = bookingsData.summary;

    // Component for the summary stat boxes
    const StatBox = ({ value, label }) => (
        <div className="p-4 bg-white rounded-xl shadow-sm border border-gray-200 min-w-[150px]">
            <p className="text-3xl font-bold text-gray-900">{value}</p>
            <p className="text-sm text-gray-500">{label}</p>
        </div>
    );

    return (
        <div className="flex-1 p-8 bg-gray-50 overflow-y-auto">
            
            {/* Page Header */}
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">My Bookings</h1>
                    <p className="text-gray-600">Manage your confirmed bookings and upcoming stays</p>
                </div>
                <button className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 transition shadow-sm">
                    <Download className="w-5 h-5" />
                    <span>Export</span>
                </button>
            </div>

            {/* Summary Stats */}
            <div className="flex space-x-6 mb-10">
                <StatBox value={summary.active} label="Active Bookings" />
                <StatBox value={summary.checkIns} label="Check-ins" />
                <StatBox value={summary.checkOuts} label="Check-outs" />
                <StatBox value={summary.totalSpent} label="Total Spent" />
            </div>

            {/* Current Bookings Section */}
            <div>
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold text-gray-800">
                        Current Bookings ({bookingsData.currentBookings.length})
                    </h2>
                    {/* Placeholder for 'All Status' dropdown */}
                    <div className="text-sm text-gray-500 border border-gray-300 rounded-lg px-3 py-1.5 cursor-pointer hover:bg-white">
                        All Status <span className="ml-1">↓</span>
                    </div>
                </div>
                
                {/* Bookings List */}
                <div className="space-y-6">
                    {bookingsData.currentBookings.map(booking => (
                        <BookingCard key={booking.id} booking={booking} />
                    ))}
                </div>
            </div>
        </div>
    );
};

// --- Full Page Component ---
const MyBookingsPage = () => {
    return (
  <div className="flex min-h-screen">
            {/* Sidebar on the left */}
            <Sidebar />

            {/* Page content on the right */}
            <div className="flex-1 flex flex-col overflow-hidden bg-gray-50">
                {/* Renter Header at the top */}
                <RenterHeader />

                {/* Main Message Content */}
                <main className="flex-1 overflow-y-auto">
                    <MyBookingsContent />
                </main>
            </div>
        </div>
    );
};

export default MyBookingsPage;