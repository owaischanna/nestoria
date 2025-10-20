"use client";

import {
  Menu, Search, Heart, Bell, User, MapPin, DollarSign,
  FileText, Briefcase, ChevronRight, LogOut // ✅ Import LogOut icon
} from "lucide-react";

import { useState, useEffect } from "react"; // ✅ Import useEffect
import { useRouter } from "next/navigation"; // ✅ Import useRouter for redirection
import ApplicationFormContainer from "./ApplicationForm"; // your form component
import { useAuth } from "../context/AuthContext"; // ✅ Import the useAuth hook

// --- Header Component ---
const Header = () => {
  // ✅ Get user data and logout function from our AuthContext
  const { user, logout } = useAuth();

  // Fallback while user data is loading (optional, as parent handles this)
  if (!user) {
    return <div className="p-4 border-b">Loading user...</div>;
  }

  // Get user initials for the avatar
  const userInitials = user.firstName ? user.firstName.charAt(0).toUpperCase() : 'U';

  return (
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

        {/* ✅ Dynamic User Profile Display */}
        <div className="flex items-center space-x-2 cursor-pointer p-1 rounded-full bg-gray-100 hover:bg-gray-200">
          <div className="bg-red-400 text-white rounded-full h-8 w-8 flex items-center justify-center text-sm font-semibold">
            {userInitials}
          </div>
          <div className="text-sm leading-tight hidden sm:block">
            <p className="font-semibold text-gray-800">{user.firstName}</p>
            <p className="text-gray-500 capitalize">{user.role}</p>
          </div>
        </div>

        {/* ✅ Logout Button */}
        <button onClick={logout} title="Logout" className="p-2 rounded-full hover:bg-gray-200 transition">
          <LogOut className="h-5 w-5 text-gray-600" />
        </button>
      </div>
    </header>
  );
};

// --- Stat Card Component (Unchanged) ---
const iconsMap = { FileText, Heart, DollarSign, Briefcase };
const StatCard = ({ iconName, title, value, subtext, colorClass }) => {
  const Icon = iconsMap[iconName];
  return (
    <div className={`p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col justify-between bg-white ${colorClass || "border-l-4 border-gray-300"}`}>
      <div className="flex justify-between items-start mb-2">
        <h4 className="text-xs font-semibold text-gray-500 uppercase">{title}</h4>
        {Icon && <Icon className="h-5 w-5 text-gray-400" />}
      </div>
      <p className="text-2xl font-bold text-gray-800">{value}</p>
      {subtext && <p className="text-xs text-gray-500 mt-1">{subtext}</p>}
    </div>
  );
};

// --- Listing Components (Unchanged) ---
// ... (ListingBadge and ListingCard components remain the same)

// --- Dashboard Content Component ---
const DashboardContent = ({ onApply }) => {
  // ✅ Get user data to display a personalized welcome message
  const { user } = useAuth();
  const imageUrl = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0HFWiXvgfpFSXkpGQHyGt2iHrEiBRvM_T-A&s";

  // Dummy data for listings
  const listings = [
    { roomName: "Cozy Room Near NYU Campus", location: "Greenwich Village, Manhattan", price: "$750", details: "Private Room · 2 Housemates · WiFi Included · 5min to Subway", badges: [{ text: "Student Friendly", type: "student" }, { text: "Female Only", type: "female" }, { text: "Available Sep 1", type: "available" }], imageUrl },
    { roomName: "Modern Room in Brooklyn", location: "Williamsburg, Brooklyn", price: "$850", details: "Private Room · WiFi Included", badges: [{ text: "Student Friendly", type: "student" }, { text: "Available Sep 1", type: "available" }], imageUrl },
  ];

  return (
    <main className="flex-1 p-8 bg-gray-50 overflow-y-auto">
      {/* ✅ Dynamic Welcome Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Welcome, {user?.firstName}!</h1>
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
        <h2 className="text-xl font-bold text-gray-800 mb-4">Recommended for You</h2>
        <div className="space-y-4">
          {/* The ListingCard component is not defined in this snippet, assuming it exists */}
          {/* {listings.map((listing, index) => <ListingCard key={index} {...listing} onApply={onApply} />)} */}
        </div>
      </div>
    </main>
  );
};

// --- Modal Component (Unchanged) ---
const Modal = ({ children, onClose }) => (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
    <div className="bg-white rounded-lg shadow-lg w-full max-w-lg relative p-6">
      <button onClick={onClose} className="absolute top-2 right-2 text-gray-500 hover:text-gray-700">✕</button>
      {children}
    </div>
  </div>
);


// --- Main Dashboard Component ---
const RenterDashboard = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const { user, loading } = useAuth(); // ✅ Get user and loading state
  const router = useRouter();

  // ✅ This effect handles protection on the client-side
  useEffect(() => {
    // If loading is finished and there's still no user, redirect to the home/login page.
    if (!loading && !user) {
      // Assuming your sign-in page is at the root '/'
      router.push('/');
    }
  }, [user, loading, router]);


  // ✅ Show a full-page loading screen while we verify the user's session
  if (loading || !user) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-gray-50">
        <p className="text-lg font-semibold text-gray-700">Loading your dashboard...</p>
      </div>
    );
  }

  // ✅ If the user is authenticated, render the full dashboard
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