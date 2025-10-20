// CheckInsContent.jsx
"use client";
import React from "react";
import {
  Calendar,
  Clock,
  Edit,
  ListChecks,
  Menu,
  CheckCircle,
} from "lucide-react";

// ✅ Import your existing Host Layout Components
import HostSidebar from "../Components/HostSidebar";
import HostHeader from "../Components/HostHeader";


// --- Preparation Status Badge ---
const PrepStatusBadge = ({ label, isCompleted }) => (
  <span
    className={`text-xs font-semibold px-2 py-1 rounded-full ${
      isCompleted
        ? "bg-green-100 text-green-700"
        : "bg-yellow-100 text-yellow-700"
    }`}
  >
    {isCompleted ? (
      <CheckCircle className="w-3 h-3 inline mr-1" />
    ) : null}
    {label}
  </span>
);

// --- Check-in Card ---
const CheckInCard = ({ tenant }) => (
  <div className="flex border border-gray-200 rounded-lg overflow-hidden shadow-sm bg-white mb-6">
    {/* Left Column */}
    <div className="flex-1 p-5">
      <div className="flex items-center mb-3">
        <img
          src={tenant.avatarUrl}
          alt={tenant.name}
          className="w-12 h-12 rounded-full mr-4 object-cover"
        />
        <div>
          <h3 className="text-lg font-bold text-gray-800">{tenant.name}</h3>
          <div className="text-sm text-gray-600 space-x-3">
            <span>{tenant.occupation}</span>
            <span>• {tenant.age} years old</span>
            <span className="text-xs text-blue-600">New tenant</span>
          </div>
        </div>
      </div>

      <h4 className="font-semibold text-gray-800">{tenant.listingTitle}</h4>
      <p className="text-sm text-gray-500 mb-4">
        Room {tenant.room} • {tenant.location}
      </p>

      <div className="grid grid-cols-2 gap-y-2 text-sm text-gray-700 mb-4">
        <div className="flex items-center">
          <Clock className="w-4 h-4 mr-2 text-gray-500" />
          Scheduled Time:
          <span className="font-medium ml-1 text-blue-600">
            {tenant.scheduledTime}
          </span>
        </div>
        <div>
          Contact: <span className="font-medium ml-1">{tenant.contact}</span>
        </div>
        <div>
          Lease Period:{" "}
          <span className="font-medium ml-1">{tenant.leasePeriod}</span>
        </div>
        <div>
          Lease Duration:{" "}
          <span className="font-medium ml-1">{tenant.leaseDuration}</span>
        </div>
      </div>

      {/* Preparation Status */}
      <div className="border-t border-gray-100 pt-4">
        <p className="text-sm font-semibold text-gray-700 mb-2">
          Check-in Preparation Status
        </p>
        <div className="flex flex-wrap gap-2">
          <PrepStatusBadge
            label="Room Cleaned"
            isCompleted={tenant.prepStatus.roomCleaned}
          />
          <PrepStatusBadge
            label="Keys Ready"
            isCompleted={tenant.prepStatus.keysReady}
          />
          <PrepStatusBadge
            label="Welcome Pack"
            isCompleted={tenant.prepStatus.welcomePack}
          />
          <PrepStatusBadge
            label="Inventory"
            isCompleted={tenant.prepStatus.inventory}
          />
        </div>
      </div>
    </div>

    {/* Right Column */}
    <div className="w-60 flex-shrink-0 p-5 border-l border-gray-100 flex flex-col justify-between items-end">
      <div className="text-right">
        <span className="text-xs font-semibold bg-green-100 text-green-700 px-2 py-1 rounded-full">
          Check-in Today
        </span>
        <p className="text-2xl font-bold text-green-700 mt-2">
          {tenant.monthlyRent}
        </p>
        <p className="text-sm text-gray-500">{tenant.leaseDuration}</p>
      </div>

      <div className="flex flex-col space-y-2 w-full">
        <button className="text-sm font-medium text-gray-700 border border-gray-300 px-3 py-2 rounded hover:bg-gray-50">
          Message Tenant
        </button>
        <button className="text-sm font-medium text-orange-600 border border-orange-300 px-3 py-2 rounded hover:bg-orange-50 flex items-center justify-center">
          <Edit className="w-4 h-4 mr-1" /> Reschedule
        </button>
        <button className="text-sm font-medium text-white bg-green-600 px-3 py-2 rounded hover:bg-green-700 flex items-center justify-center">
          <CheckCircle className="w-4 h-4 mr-1" /> Start Check-in
        </button>
      </div>
    </div>
  </div>
);

// --- Main Component ---
const CheckInsContent = () => {
  const mockTenants = [
    {
      id: 1,
      name: "Alex Kim",
      avatarUrl: "alex_kim_avatar.jpg",
      occupation: "Columbia University",
      age: 24,
      listingTitle: "Modern Studio Apartment",
      room: "B",
      location: "Williamsburg, Brooklyn",
      scheduledTime: "2:00 PM - 3:00 PM",
      contact: "+1 (555) 123-4567",
      leasePeriod: "Oct 28, 2024 - Oct 28, 2025",
      leaseDuration: "12 month lease",
      monthlyRent: "$950/month",
      prepStatus: {
        roomCleaned: true,
        keysReady: true,
        welcomePack: true,
        inventory: false,
      },
    },
    {
      id: 2,
      name: "Emma Martinez",
      avatarUrl: "emma_martinez_avatar.jpg",
      occupation: "Marketing Intern",
      age: 24,
      listingTitle: "Modern Studio Apartment",
      room: "B",
      location: "Williamsburg, Brooklyn",
      scheduledTime: "2:00 PM - 3:00 PM",
      contact: "+1 (555) 123-4567",
      leasePeriod: "Oct 28, 2024 - Oct 28, 2025",
      leaseDuration: "12 month lease",
      monthlyRent: "$950/month",
      prepStatus: {
        roomCleaned: true,
        keysReady: true,
        welcomePack: false,
        inventory: false,
      },
    },
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      {/* ✅ Host Sidebar */}
      <HostSidebar />

      {/* Main Content Area */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* ✅ Host Header */}
        <HostHeader />

        {/* Page Content */}
        <div className="flex flex-1 overflow-hidden">
          {/* Nested Sidebar */}
        

          {/* Main Check-in Section */}
          <div className="flex-1 p-8 overflow-y-auto">
            <div className="flex justify-between items-center mb-8">
              <h1 className="text-3xl font-bold text-gray-800">Check-ins</h1>
              <button className="flex items-center space-x-2 text-sm font-semibold text-gray-700 border border-gray-300 px-4 py-2 rounded shadow-sm hover:bg-gray-50 transition">
                <ListChecks className="w-4 h-4" />
                <span>Checklist</span>
              </button>
            </div>

            <div className="flex space-x-8 mb-8 text-sm border-b border-gray-200 pb-4">
              <div className="text-center">
                <p className="font-bold text-2xl text-orange-600">2</p>
                <p className="text-sm text-gray-500">Today</p>
              </div>
              <div className="text-center">
                <p className="font-bold text-2xl text-blue-600">4</p>
                <p className="text-sm text-gray-500">This Week</p>
              </div>
              <div className="text-center">
                <p className="font-bold text-2xl text-gray-600">3</p>
                <p className="text-sm text-gray-500">Next Week</p>
              </div>
              <div className="text-center">
                <p className="font-bold text-2xl text-green-600">8</p>
                <p className="text-sm text-gray-500">Completed</p>
              </div>
            </div>

            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-800">
                Today's Check-ins ({mockTenants.length})
              </h2>
              <p className="text-sm font-medium text-gray-600 flex items-center">
                <Calendar className="w-4 h-4 mr-1" /> October 28, 2024
              </p>
            </div>

            <div className="space-y-4">
              {mockTenants.map((tenant) => (
                <CheckInCard key={tenant.id} tenant={tenant} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckInsContent;
