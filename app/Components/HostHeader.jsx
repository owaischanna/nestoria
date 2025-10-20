"use client";

import { Search, Bell } from "lucide-react";

export default function HostHeader() {
  return (
    <header className="flex items-center justify-between p-4 bg-white shadow-sm">
      {/* Search bar */}
      <div className="flex-1 max-w-lg relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
        <input
          type="text"
          placeholder="Search by location, university, or amenities..."
          className="w-full pl-10 pr-4 py-2 rounded-full text-sm bg-gray-100 focus:ring-green-500 focus:outline-none"
        />
      </div>

      {/* User Section */}
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
  );
}
