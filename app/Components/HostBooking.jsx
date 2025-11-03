"use client";

import React from "react";
import { Download, MapPin, Clock, Phone, CheckCircle } from "lucide-react";
import HostSidebar from "./HostSidebar";
import HstHeader from "./HostHeader";
// --- Utility Components ---
const StatusBadge = ({ status }) => {
  let colorClass = "bg-gray-100 text-gray-700";
  if (status === "Active Booking") colorClass = "bg-green-100 text-green-700";
  if (status === "Check-in Today") colorClass = "bg-blue-100 text-blue-700";

  return (
    <span
      className={`text-xs font-semibold px-3 py-1 rounded-full ${colorClass}`}
    >
      {status}
    </span>
  );
};

const PaymentStatus = ({ status, dateText }) => {
  const isPaid = status === "paid";
  const colorClass = isPaid
    ? "bg-green-100 text-green-700"
    : "bg-orange-100 text-orange-700";
  const icon = isPaid ? <CheckCircle className="w-4 h-4 mr-1" /> : null;

  return (
    <div className="flex items-center text-sm font-medium">
      <div className={`flex items-center px-3 py-1 rounded-full ${colorClass}`}>
        {icon}
        <span className="font-semibold">
          {isPaid ? "October rent paid" : "November due in 5 days"}
        </span>
      </div>
      <span className="text-xs text-gray-500 ml-3">{dateText}</span>
    </div>
  );
};

// --- Booking Card ---
const BookingCard = ({ booking }) => (
  <div className="border border-gray-200 rounded-lg overflow-hidden shadow-sm bg-white mb-6">
    <div className="flex p-5">
      {/* Image */}
      <div className="w-48 flex-shrink-0 mr-4">
        <img
          src={booking.imageUrl}
          alt={booking.title}
          className="w-full h-32 object-cover rounded-md"
        />
      </div>

      {/* Details */}
      <div className="flex-1">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-bold text-gray-800">{booking.title}</h3>
          <StatusBadge status={booking.status} />
        </div>

        <p className="text-sm text-gray-500 flex items-center mb-3">
          <MapPin className="w-4 h-4 mr-1 text-gray-400" />
          {booking.location}
        </p>

        {/* Host Info */}
        <div className="flex items-center space-x-2 mb-4">
          <div className="flex items-center">
            <img
              src={booking.host.avatarUrl}
              alt={booking.host.name}
              className="w-8 h-8 rounded-full mr-2"
            />
            <span className="text-sm font-medium text-gray-700">
              {booking.host.name}
            </span>
            <span className="text-xs text-gray-500 ml-1">
              ({booking.host.reviews} reviews)
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 border-t border-gray-100 pt-4">
          {/* Lease & Rent Info */}
          <div>
            <p className="text-xs font-semibold text-gray-500 uppercase mb-1">
              Lease Period
            </p>
            <p className="text-sm text-gray-800 font-medium">
              {booking.leasePeriod} ({booking.monthsRemaining})
            </p>
            <p className="text-2xl font-bold text-green-700 mt-2">
              {booking.monthlyRent}
            </p>
            <p className="text-xs text-gray-500">
              Total Paid: €{booking.totalPaid} (1 of 6 payments)
            </p>
          </div>

          {/* Check-in Details */}
          <div>
            <p className="text-xs font-semibold text-gray-500 uppercase mb-1">
              Check-in Details
            </p>
            <div className="flex items-center text-sm text-gray-800 mb-1">
              <Clock className="w-4 h-4 mr-2 text-gray-500" />
              Scheduled Time:{" "}
              <span className="font-medium ml-1 text-blue-600">
                {booking.checkInTime}
              </span>
            </div>
            <div className="flex items-start text-sm text-gray-800">
              <MapPin className="w-4 h-4 mr-2 mt-1 text-gray-500 flex-shrink-0" />
              <span className="font-medium">{booking.propertyAddress}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Actions Column */}
      <div className="flex flex-col justify-between items-end pl-5 border-l border-gray-100">
        <div>
          <p className="text-sm font-semibold text-gray-800 mb-1">
            {booking.roomType}
          </p>
          <p className="text-xs text-gray-500 mb-4">{booking.sqft}</p>
        </div>

        <div className="text-sm text-right">
          <PaymentStatus status={booking.paymentStatus} />
          <div className="flex space-x-2 mt-4">
            <button className="text-sm font-medium text-gray-700 border border-gray-300 px-3 py-1 rounded hover:bg-gray-50">
              Get Directions
            </button>
            <button className="text-sm font-medium text-white bg-blue-600 px-3 py-1 rounded hover:bg-blue-700 flex items-center">
              <Phone className="w-4 h-4 mr-1" /> Call Host
            </button>
            {booking.status === "Check-in Today" && (
              <button className="text-sm font-medium text-white bg-orange-600 px-3 py-1 rounded hover:bg-orange-700">
                Check-in
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  </div>
);

// --- Main Content ---
const MyBookingsContent = () => {
  const mockBookings = [
    {
      id: 1,
      title: "Modern Studio in Brooklyn",
      location: "Williamsburg, Brooklyn",
      status: "Check-in Today",
      imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOgziMScOHDsVglNc-id0yJKnfFd_DN20hmg&s",
      host: {
        name: "Margaret Johnson",
        reviews: 24,
        avatarUrl: "https://enzahome.pk/cdn/shop/files/baselbed.jpg?v=1740996046&width=500",
      },
      leasePeriod: "Oct 20, 2024 - Apr 28, 2025",
      monthsRemaining: "6 months remaining",
      monthlyRent: "€950/month",
      totalPaid: 950,
      checkInTime: "2:00 PM - 3:00 PM",
      propertyAddress: "245 Berry St, Apt 3B, Brooklyn, NY 11211",
      roomType: "Studio",
      sqft: "400 sqft",
      paymentStatus: "paid",
    },
    {
      id: 2,
      title: "Cozy Room Near NYU Campus",
      location: "Greenwich Village, Manhattan",
      status: "Active Booking",
      imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOgziMScOHDsVglNc-id0yJKnfFd_DN20hmg&s",
      host: {
        name: "Margaret Johnson",
        reviews: 24,
        avatarUrl: "https://enzahome.pk/cdn/shop/files/baselbed.jpg?v=1740996046&width=500",
      },
      leasePeriod: "Nov 1, 2024 - May 1, 2025",
      monthsRemaining: "6 months remaining",
      monthlyRent: "€750/month",
      totalPaid: 750,
      checkInTime: "2:00 PM - 3:00 PM",
      propertyAddress: "245 Berry St, Apt 3B, Brooklyn, NY 11211",
      roomType: "Private",
      sqft: "400 sqft",
      paymentStatus: "unpaid",
    },
  ];

  return (
    <div className="flex">
      {/* Sidebar */}
      <HostSidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <HstHeader />

        {/* Page Content */}
        <div className="p-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800">My Bookings</h1>
            <button className="flex items-center space-x-2 text-sm font-semibold text-gray-700 border border-gray-300 px-4 py-2 rounded shadow-sm hover:bg-gray-50 transition">
              <Download className="w-4 h-4" />
              <span>Export</span>
            </button>
          </div>

          {/* Stats */}
          <div className="flex space-x-6 mb-8 text-sm border-b border-gray-200 pb-4">
            <div className="text-center">
              <p className="font-bold text-2xl text-green-600">2</p>
              <p className="text-sm text-gray-500">Active Bookings</p>
            </div>
            <div className="text-center">
              <p className="font-bold text-2xl text-blue-600">1</p>
              <p className="text-sm text-gray-500">Check-ins</p>
            </div>
            <div className="text-center">
              <p className="font-bold text-2xl text-blue-600">1</p>
              <p className="text-sm text-gray-500">Check-out</p>
            </div>
            <div className="text-center">
              <p className="font-bold text-2xl text-red-600">$1,900</p>
              <p className="text-sm text-gray-500">Total Spent</p>
            </div>
          </div>

          {/* Bookings List */}
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            Current Bookings ({mockBookings.length})
          </h2>

          <div className="space-y-6">
            {mockBookings.map((booking) => (
              <BookingCard key={booking.id} booking={booking} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyBookingsContent;
