"use client";

import React, { useState } from "react";
import HostSidebar from "@/app/Components/HostSidebar";
import HostHeader from "./HostHeader";
import AddListingFormContainer from "./AddListing";
import {
  Plus,
  Wifi,
  Utensils,
  Car,
  Shirt,
  PawPrint,
  Leaf,
  MapPin,
  Bed,
  Bath,
  Edit,
  Trash2,
  Eye,
} from "lucide-react";

// The rest of the Utility Components and HostListingCard remain the same...

// ============== Utility Components ==============
const ListingAmenity = ({ icon: Icon, label }) => (
  <div className="flex items-center text-xs text-gray-600 bg-gray-100 px-2 py-1 rounded-full space-x-1">
    <Icon className="w-3 h-3 text-green-700" />
    <span>{label}</span>
  </div>
);

const ListingStatusBadge = ({ status }) => {
  const color =
    status === "Available"
      ? "bg-green-100 text-green-700"
      : "bg-yellow-100 text-yellow-700";
  return (
    <span
      className={`text-xs font-semibold px-3 py-1 rounded-full ${color}`}
    >
      {status}
    </span>
  );
};

// ============== Listing Card Component ==============
const HostListingCard = ({ listing }) => (
  <div className="flex border border-gray-200 rounded-lg overflow-hidden shadow-sm bg-white mb-6">
    {/* Image */}
    <div className="w-64 flex-shrink-0">
      <img
        src={listing.imageUrl}
        alt={listing.title}
        className="w-full h-full object-cover"
      />
    </div>

    {/* Content */}
    <div className="flex-1 p-5">
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-xl font-bold text-gray-800">{listing.title}</h3>
        <ListingStatusBadge status={listing.status} />
      </div>

      <p className="text-sm text-gray-500 flex items-center mb-4">
        <MapPin className="w-4 h-4 mr-1 text-gray-400" />
        {listing.location}
      </p>

      <div className="flex items-center space-x-6 mb-4 text-sm text-gray-600">
        <span className="font-semibold text-green-700 text-2xl">
          {listing.price}
        </span>
        <span>{listing.utilities}</span>
        <span className="flex items-center space-x-1">
          <Bed className="w-4 h-4" /> {listing.roomType}
        </span>
        <span className="flex items-center space-x-1">
          <Bath className="w-4 h-4" /> {listing.bathType}
        </span>
        <span>{listing.sqft} sqft</span>
      </div>

      {/* Amenities */}
      <div className="flex flex-wrap gap-2 mb-4">
        {listing.amenities.map((amenity, index) => (
          <ListingAmenity
            key={index}
            icon={amenity.icon}
            label={amenity.label}
          />
        ))}
      </div>

      {/* Performance Metrics */}
      <div className="border-t border-gray-100 pt-4 flex justify-between items-center">
        <div className="flex space-x-6 text-sm">
          <div className="text-center">
            <p className="font-bold text-lg text-blue-600">
              {listing.performance.views}
            </p>
            <p className="text-xs text-gray-500">Total Views</p>
          </div>
          <div className="text-center">
            <p className="font-bold text-lg text-blue-600">
              {listing.performance.inquiries}
            </p>
            <p className="text-xs text-gray-500">Inquiries</p>
          </div>
          <div className="text-center">
            <p className="font-bold text-lg text-blue-600">
              {listing.performance.applications}
            </p>
            <p className="text-xs text-gray-500">Applications</p>
          </div>
          <div className="text-center">
            <p className="font-bold text-lg text-green-600">
              {listing.performance.responseRate}
            </p>
            <p className="text-xs text-gray-500">Response Rate</p>
          </div>
          <div className="text-center">
            <p className="font-bold text-lg text-red-600">
              {listing.performance.avgResponseTime}
            </p>
            <p className="text-xs text-gray-500">Avg Response</p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex space-x-2">
          <button className="flex items-center space-x-1 text-sm font-medium text-gray-700 border border-gray-300 px-3 py-1 rounded hover:bg-gray-50">
            <Edit className="w-4 h-4" /> Edit
          </button>
          <button className="flex items-center space-x-1 text-sm font-medium text-red-600 border border-red-300 px-3 py-1 rounded hover:bg-red-50">
            <Trash2 className="w-4 h-4" /> Delete
          </button>
          <button className="flex items-center space-x-1 text-sm font-medium text-white bg-green-600 px-3 py-1 rounded hover:bg-green-700">
            <Eye className="w-4 h-4" /> View Live
          </button>
        </div>
      </div>
    </div>
  </div>
);

// ============== My Listings Content Component (Modified to receive a handler) ==============
const MyListingsContent = ({ onAddListing }) => { // <--- Receive handler
  const listingsData = [
    {
      title: "Cozy Room in Victorian House",
      location: "Park Slope, Brooklyn",
      price: "$750/month",
      utilities: "Utilities included",
      roomType: "Private Room",
      bathType: "Shared Bath",
      sqft: "120",
      status: "Available",
      imageUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0HFWiXvgfpFSXkpGQHyGt2iHrEiBRvM_T-A&s",
      amenities: [
        { icon: Wifi, label: "WiFi" },
        { icon: Utensils, label: "Kitchen Access" },
        { icon: Car, label: "Parking" },
        { icon: Shirt, label: "Laundry" },
        { icon: PawPrint, label: "Pet Friendly" },
        { icon: Leaf, label: "Garden" },
      ],
      performance: {
        views: 124,
        inquiries: 18,
        applications: 8,
        responseRate: "92%",
        avgResponseTime: "2.4h",
      },
    },
  ];

  return (
    <div className="p-8">
      {/* Page Header and Actions */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">My Listings</h1>
        <button 
          className="flex items-center space-x-2 text-sm font-semibold text-white bg-green-600 px-4 py-2 rounded shadow-md hover:bg-green-700 transition"
          onClick={onAddListing} // <--- 3. Call the handler here
        >
          <Plus className="w-4 h-4" />
          <span>Add New Listing</span>
        </button>
      </div>

      {/* Stats and Filters */}
      <div className="flex justify-between items-center mb-6 border-b border-gray-200 pb-4">
        <div className="flex items-center space-x-6 text-sm text-gray-600">
          <span>
            <span className="font-bold text-lg text-gray-800">3</span> Total
            Listings
          </span>
          <span>
            <span className="font-bold text-lg text-green-600">2</span> Available
          </span>
          <span>
            <span className="font-bold text-lg text-orange-600">1</span>{" "}
            Occupied
          </span>
        </div>

        <div className="flex items-center space-x-3">
          <button className="text-sm font-semibold text-gray-800 border-b-2 border-green-600 pb-1">
            All Status
          </button>
          <button className="text-sm font-semibold text-gray-500 hover:text-gray-800">
            Recently Updated
          </button>
        </div>
      </div>

      {/* Listings List */}
      <div className="space-y-6">
        {listingsData.map((listing, index) => (
          <HostListingCard key={index} listing={listing} />
        ))}
      </div>
    </div>
  );
};

// ============== Final Page Layout (Modified for Mode Management) ==============
export default function HostListingsPage() {
  // 2. State to manage the mode
  const [mode, setMode] = useState("list"); // 'list' or 'add'

  // Handlers to switch modes
  const handleAddListing = () => setMode("add");
  const handleCancel = () => setMode("list");

  // Conditional Content
  const pageContent = 
    mode === "list" ? (
      <MyListingsContent onAddListing={handleAddListing} />
    ) : (
      // Pass the cancel handler to the form
      <AddListingFormContainer onCancel={handleCancel} />
    );

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <HostSidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <HostHeader />

        {/* 4. Conditionally render content */}
        <main className="flex-1 p-0 overflow-y-auto">
          {pageContent}
        </main>
      </div>
    </div>
  );
}