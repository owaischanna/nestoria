"use client";

import { useState, useEffect } from "react";
import { Search, Bell, LogOut, Heart, User } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function RenterHeader() {
  const { user, loading, logout } = useAuth();

  const getInitials = (firstName, lastName) => {
    if (firstName && lastName) {
      return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
    } else if (firstName) {
      return `${firstName.charAt(0)}`.toUpperCase();
    }
    return null;
  };

  const displayName = user
    ? `${user.firstName || ''} ${user.lastName || ''}`.trim() || user.email
    : 'Loading...';

  const displayInitials = user ? getInitials(user.firstName, user.lastName) : null;

  if (loading) {
    return (
      <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-4 bg-white shadow-sm gap-3 sm:gap-0 animate-pulse">
        <div className="w-full sm:flex-1 sm:max-w-lg h-10 bg-gray-200 rounded-full mt-10 sm:mt-0"></div>
        <div className="flex items-center justify-between sm:justify-end sm:space-x-4 w-full sm:w-auto">
          <div className="h-6 w-6 bg-gray-200 rounded-full"></div>
          <div className="flex items-center space-x-2">
            <div className="h-8 w-8 bg-gray-200 rounded-full"></div>
            <div className="space-y-2 hidden md:block">
              <div className="h-4 w-24 bg-gray-200 rounded"></div>
              <div className="h-3 w-32 bg-gray-200 rounded"></div>
            </div>
          </div>
          <div className="h-10 w-10 bg-gray-200 rounded-full"></div>
        </div>
      </header>
    );
  }

  return (
    <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-4 bg-white shadow-sm gap-3 sm:gap-0">
      
      {/* ✅ Search Bar — centered on mobile + pushed down to avoid hamburger overlap */}
      <div className="w-full sm:flex-1 sm:max-w-lg relative mt-10 sm:mt-0 flex justify-center">
        <div className="w-full max-w-sm relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            type="text"
            placeholder="Search properties, cities, or amenities..."
            className="w-full pl-10 pr-4 py-2 rounded-full text-sm bg-gray-100 focus:ring-green-500 focus:outline-none"
          />
        </div>
      </div>

      {/* ✅ Right Section */}
      <div className="flex items-center justify-between sm:justify-end sm:space-x-4 w-full sm:w-auto">
        
        {/* Heart Icon - Hidden on mobile */}
        <Heart className="h-6 w-6 text-gray-500 hover:text-red-500 cursor-pointer hidden sm:block" />
        
        <Bell className="text-gray-500 h-6 w-6 cursor-pointer hover:text-green-600" />

        {/* ✅ User Icon + Info */}
        <div className="flex items-center space-x-2 bg-gray-100 p-1 rounded-full cursor-pointer">
          <div className="bg-orange-500 text-white rounded-full h-8 w-8 flex items-center justify-center text-sm font-semibold">
            {displayInitials ? (
              displayInitials
            ) : (
              <User className="w-4 h-4" />
            )}
          </div>

          {/* ✅ Hide text on very small screens */}
          <div className="text-sm hidden md:block">
            <p className="font-semibold text-gray-800">{displayName}</p>
            <p className="text-gray-500 text-xs">{user?.email}</p>
          </div>
        </div>

        {/* ✅ Logout */}
        <button
          onClick={logout}
          title="Logout"
          className="p-2 rounded-full hover:bg-gray-200 transition"
        >
          <LogOut className="h-5 w-5 text-gray-600" />
        </button>
      </div>
    </header>
  );
}