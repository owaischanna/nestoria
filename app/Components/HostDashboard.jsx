"use client";

import { Search, Bell, Plus, Home, ClipboardList, Calendar, MessageSquare, Star, DollarSign, User, Settings, HelpCircle } from "lucide-react";
import { useState } from "react";
import Image from "next/image";
import houseImg from "../../assets/bed.jpeg"; // your image

export default function HostDashboard() {
  const [activeMenu, setActiveMenu] = useState("Dashboard");

  const menuItems = [
    { name: "Dashboard", icon: Home },
    { name: "My Listings", icon: ClipboardList, badge: 3 },
    { name: "Bookings", icon: Calendar },
    { name: "Messages", icon: MessageSquare, dot: true },
    { name: "Reviews", icon: Star },
    { name: "Payments", icon: DollarSign },
  ];

  const accountItems = [
    { name: "Profile", icon: User },
    { name: "Settings", icon: Settings },
    { name: "Help & Support", icon: HelpCircle },
  ];

  const listings = [
    { title: "Cozy Room in Victorian House", price: "$750/month", status: "Available", views: 24, messages: 8 },
    { title: "Modern Studio Apartment", price: "$950/month", status: "Occupied", views: 18, messages: 5 },
  ];

  const recentActivity = [
    { type: "booking", name: "Sarah Chen", price: "$850/month • 6 months", time: "2 hours ago" },
    { type: "review", name: "James Rodriguez", rating: 1, time: "Yesterday" },
    { type: "payment", name: "Steve Joe", amount: "$750", time: "2 days ago" },
    { type: "payment", name: "Alex Kim", amount: "$750", time: "2 days ago" },
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r flex flex-col justify-between">
        <div>
          <div className="p-6 flex items-center space-x-2">
            <div className="bg-green-600 h-6 w-6 rounded-full" />
            <span className="text-lg font-bold text-green-700">Nestoria</span>
          </div>
          <nav className="mt-4 space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeMenu === item.name;
              return (
                <button
                  key={item.name}
                  onClick={() => setActiveMenu(item.name)}
                  className={`w-full flex items-center justify-between px-4 py-2 text-sm font-medium ${
                    isActive ? "bg-green-600 text-white" : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <Icon className="h-4 w-4" />
                    <span>{item.name}</span>
                  </div>
                  {item.badge && (
                    <span className="bg-green-200 text-green-800 text-xs rounded-full px-2">{item.badge}</span>
                  )}
                  {item.dot && <span className="bg-red-500 h-2 w-2 rounded-full"></span>}
                </button>
              );
            })}
          </nav>
        </div>
        <div className="pb-4">
          {accountItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.name}
                className="w-full flex items-center px-4 py-2 text-sm text-gray-600 hover:bg-gray-100"
              >
                <Icon className="h-4 w-4 mr-3" />
                {item.name}
              </button>
            );
          })}
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top bar */}
        <header className="flex items-center justify-between p-4 bg-white border-b">
          <div className="flex-1 max-w-lg relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Search by location, university, or amenities..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full text-sm focus:ring-green-500 focus:outline-none"
            />
          </div>

          <div className="flex items-center space-x-4">
            <Bell className="text-gray-500 h-6 w-6 cursor-pointer hover:text-green-600" />
            <div className="flex items-center space-x-2 bg-gray-100 p-1 rounded-full cursor-pointer">
              <div className="bg-green-600 text-white rounded-full h-8 w-8 flex items-center justify-center text-sm font-semibold">
                MJ
              </div>
              <div className="text-sm hidden sm:block">
                <p className="font-semibold text-gray-800">Margaret Johnson</p>
                <p className="text-gray-500 text-xs">Host since 2025</p>
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Body */}
        <main className="flex-1 overflow-y-auto p-6">
          {/* Welcome & Stats */}
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Welcome Margaret!</h1>
              <p className="text-gray-500">Here's what's happening with your listings today</p>
            </div>
            <button className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700">
              <Plus className="h-4 w-4" />
              <span>Add New Listing</span>
            </button>
          </div>

          {/* Stat Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatCard title="Total Earnings" value="$4,250" subtext="+12% vs last month" />
            <StatCard title="Active Bookings" value="7" subtext="2 pending responses" />
            <StatCard title="Occupancy Rate" value="85%" subtext="3 of 4 rooms occupied" />
            <StatCard title="Average Rating" value="4.8⭐" subtext="Based on 24 reviews" />
          </div>

          {/* Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Recent Activity */}
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

            {/* Your Listings */}
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
      </div>
    </div>
  );
}

/* --- Components --- */

const StatCard = ({ title, value, subtext }) => (
  <div className="bg-white rounded-lg shadow-sm p-4 border">
    <h4 className="text-sm font-semibold text-gray-500 mb-1">{title}</h4>
    <p className="text-2xl font-bold text-gray-800">{value}</p>
    <p className="text-xs text-green-600 mt-1">{subtext}</p>
  </div>
);

const RecentActivityItem = ({ item }) => (
  <div className="flex justify-between items-center border-b last:border-0 pb-3">
    <div>
      {item.type === "booking" && (
        <p className="text-gray-800 font-medium">New booking request from {item.name}</p>
      )}
      {item.type === "review" && (
        <p className="text-gray-800 font-medium">New review from {item.name}</p>
      )}
      {item.type === "payment" && (
        <p className="text-gray-800 font-medium">Payment received from {item.name}</p>
      )}
      <p className="text-sm text-gray-500">{item.price || item.amount || ""}</p>
      <p className="text-xs text-gray-400">{item.time}</p>
    </div>
    {item.type === "booking" && (
      <div className="space-x-2">
        <button className="px-3 py-1 bg-green-600 text-white rounded text-sm">Accept</button>
        <button className="px-3 py-1 bg-red-500 text-white rounded text-sm">Decline</button>
      </div>
    )}
    {item.type === "review" && <button className="px-3 py-1 bg-gray-100 text-sm rounded">View</button>}
    {item.type === "payment" && <span className="text-green-600 font-medium">{item.amount}</span>}
  </div>
);

const ListingCard = ({ listing }) => (
  <div className="flex items-center space-x-3 border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition">
    <div className="w-20 h-20 flex-shrink-0">
      <Image src={houseImg} alt="listing" className="w-full h-full object-cover" />
    </div>
    <div className="flex-1">
      <p className="font-semibold text-gray-800">{listing.title}</p>
      <p className="text-green-600 font-medium text-sm">{listing.price}</p>
      <span
        className={`text-xs font-medium px-2 py-0.5 rounded-full ${
          listing.status === "Available" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"
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
