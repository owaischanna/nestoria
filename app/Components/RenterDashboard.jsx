"use client";

import {
  Menu, Search, Heart, Bell, User, MapPin, DollarSign,
  FileText, Briefcase, ChevronRight
} from "lucide-react";

import { useState } from "react";

import ApplicationFormContainer from "./ApplicationForm"; // ✅ your form component

// --- Header Component ---
const Header = () => (
  <header className="flex items-center justify-between p-4 border-b border-gray-200 bg-white sticky top-0 z-10">
    {/* Logo */}
    <div className="flex items-center space-x-2">
      <img
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0HFWiXvgfpFSXkpGQHyGt2iHrEiBRvM_T-A&s"
        alt="BeakVia Logo"
        className="h-6 w-auto"
      />
      <span className="text-lg font-bold text-green-700">BeakVia</span>
    </div>

    {/* Search Bar */}
    <div className="flex-1 max-w-xl mx-8">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
        <input
          type="text"
          placeholder="Search by location, university, or amenities..."
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-1 focus:ring-green-500 text-sm"
        />
      </div>
    </div>

    {/* User Actions */}
    <div className="flex items-center space-x-4">
      <Heart className="h-6 w-6 text-gray-500 hover:text-red-500 cursor-pointer" />
      <div className="relative">
        <Bell className="h-6 w-6 text-gray-500 hover:text-green-600 cursor-pointer" />
        <span className="absolute top-0 right-0 block h-2 w-2 rounded-full ring-2 ring-white bg-red-500"></span>
      </div>
      <div className="flex items-center space-x-2 cursor-pointer p-1 rounded-full bg-gray-100 hover:bg-gray-200">
        <div className="bg-red-400 text-white rounded-full h-8 w-8 flex items-center justify-center text-sm font-semibold">
          AC
        </div>
        <div className="text-sm leading-tight hidden sm:block">
          <p className="font-semibold text-gray-800">Anna Chen</p>
          <p className="text-gray-500">Student at NYU</p>
        </div>
        <Menu className="h-5 w-5 text-gray-500 ml-1 hidden sm:block" />
      </div>
    </div>
  </header>
);

// --- Stat Card Component ---
const iconsMap = {
  FileText: FileText,
  Heart: Heart,
  DollarSign: DollarSign,
  Briefcase: Briefcase,
};

const StatCard = ({ iconName, title, value, subtext, colorClass }) => {
  const Icon = iconsMap[iconName];
  const borderClass = colorClass || "border-l-4 border-gray-300";

  return (
    <div
      className={`p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col justify-between bg-white ${borderClass}`}
    >
      <div className="flex justify-between items-start mb-2">
        <h4 className="text-xs font-semibold text-gray-500 uppercase">{title}</h4>
        {Icon && <Icon className="h-5 w-5 text-gray-400" />}
      </div>
      <p className="text-2xl font-bold text-gray-800">{value}</p>
      {subtext && <p className="text-xs text-gray-500 mt-1">{subtext}</p>}
    </div>
  );
};

// --- Listing Components ---
const ListingBadge = ({ text, type }) => {
  let color = "bg-gray-100 text-gray-700";
  if (type === "student") color = "bg-yellow-100 text-yellow-700";
  if (type === "female") color = "bg-pink-100 text-pink-700";
  if (type === "available") color = "bg-green-100 text-green-700";

  return (
    <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${color}`}>
      {text}
    </span>
  );
};

const ListingCard = ({ roomName, location, price, details, badges, imageUrl, onApply }) => (
  <div className="flex border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition duration-300 bg-white">
    {/* Image */}
    <div className="w-48 flex-shrink-0">
      <img src={imageUrl} alt={roomName} className="w-full h-full object-cover" />
    </div>

    {/* Content */}
    <div className="flex-1 p-4 flex justify-between">
      <div>
        <h5 className="text-lg font-semibold text-gray-800">{roomName}</h5>
        <p className="text-sm text-gray-500 flex items-center mb-2">
          <MapPin className="h-3 w-3 mr-1" />
          {location}
        </p>
        <p className="text-sm text-gray-600 mb-3">{details}</p>

        {/* Badges */}
        <div className="flex flex-wrap gap-2 mb-4">
          {badges.map((badge, index) => (
            <ListingBadge key={index} text={badge.text} type={badge.type} />
          ))}
        </div>

        {/* Actions */}
        <div className="flex space-x-3">
          <button className="text-sm font-medium text-green-700 border border-green-700 px-3 py-1 rounded hover:bg-green-50 transition">
            Message
          </button>
          <button
            onClick={onApply}
            className="text-sm font-medium text-white bg-amber-600 px-3 py-1 rounded hover:bg-amber-700 transition"
          >
            Apply
          </button>
        </div>
      </div>

      {/* Price */}
      <div className="text-right">
        <p className="text-xl font-bold text-green-700">
          {price}
          <span className="text-sm font-normal text-gray-500">/month</span>
        </p>
        <Heart className="h-5 w-5 text-gray-400 mt-2 hover:text-red-500 cursor-pointer" />
      </div>
    </div>
  </div>
);

// --- Dashboard Content ---
const DashboardContent = ({ onApply }) => {
  const imageUrl =
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0HFWiXvgfpFSXkpGQHyGt2iHrEiBRvM_T-A&s";

  const listings = [
    {
      roomName: "Cozy Room Near NYU Campus",
      location: "Greenwich Village, Manhattan",
      price: "$750",
      details: "Private Room · 2 Housemates · WiFi Included · 5min to Subway",
      badges: [
        { text: "Student Friendly", type: "student" },
        { text: "Female Only", type: "female" },
        { text: "Available Sep 1", type: "available" },
      ],
      imageUrl,
    },
    {
      roomName: "Modern Room in Brooklyn",
      location: "Williamsburg, Brooklyn",
      price: "$850",
      details: "Private Room · WiFi Included",
      badges: [
        { text: "Student Friendly", type: "student" },
        { text: "Available Sep 1", type: "available" },
      ],
      imageUrl,
    },
  ];

  return (
    <main className="flex-1 p-8 bg-gray-50 overflow-y-auto">
      {/* Welcome Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Welcome, Anna!</h1>
          <p className="text-gray-600 mt-1">
            Let's find your perfect home away from home
          </p>
        </div>
        <div className="flex items-center space-x-2 bg-white border border-yellow-400 text-yellow-700 p-2 rounded-full text-sm font-medium shadow-sm cursor-pointer hover:bg-yellow-50">
          <User className="w-4 h-4" />
          <span>Profile **90% Complete**</span>
          <ChevronRight className="w-4 h-4" />
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-4 gap-6 mb-10">
        <StatCard iconName="FileText" title="Active Applications" value={<>3</>} subtext="2 pending responses" colorClass="border-l-4 border-blue-500" />
        <StatCard iconName="Heart" title="Saved Favorites" value={<>7</>} subtext="3 new this week" colorClass="border-l-4 border-red-500" />
        <StatCard iconName="DollarSign" title="Budget Range" value={<>$600-900</>} subtext="Per month" colorClass="border-l-4 border-green-500" />
        <StatCard iconName="Briefcase" title="Preferred Move-in" value={<span className="text-xl font-bold text-purple-600">Sep 1</span>} subtext="2024" colorClass="border-l-4 border-purple-500" />
      </div>

      {/* Recommended Listings */}
      <div className="mb-10">
        <div className="flex justify-between items-end mb-4">
          <h2 className="text-xl font-bold text-gray-800">Recommended for You</h2>
          <div className="flex items-center space-x-4">
            <div className="text-xs font-semibold text-green-700 py-1 px-3 bg-green-200 rounded-full">
              95% Match
            </div>
            <a href="#" className="text-sm font-medium text-gray-600 hover:text-green-700">
              View all
            </a>
          </div>
        </div>
        <div className="space-y-4">
          {listings.map((listing, index) => (
            <ListingCard key={index} {...listing} onApply={onApply} />
          ))}
        </div>
      </div>
    </main>
  );
};

// --- Modal ---
const Modal = ({ children, onClose }) => (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
    <div className="bg-white rounded-lg shadow-lg w-full max-w-lg relative p-6">
      <button
        onClick={onClose}
        className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
      >
        ✕
      </button>
      {children}
    </div>
  </div>
);

// --- Main Dashboard ---
const RenterDashboard = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);

  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <DashboardContent onApply={() => setIsFormOpen(true)} />
      </div>

      {isFormOpen && (
        <Modal onClose={() => setIsFormOpen(false)}>
          <ApplicationFormContainer onClose={() => setIsFormOpen(false)} />
        </Modal>
      )}
    </div>
  );
};

export default RenterDashboard;
