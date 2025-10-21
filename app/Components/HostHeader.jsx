"use client";

import { useState, useEffect } from "react";
import { Search, Bell } from "lucide-react";

export default function HostHeader() {
  const [host, setHost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHostDetails = async () => {
      try {
        const response = await fetch('/api/user/me');
        if (!response.ok) {
          throw new Error('Failed to fetch host details');
        }
        const result = await response.json();
        setHost(result.data);
      } catch (error) {
        console.error("Error fetching host:", error);
        // Optionally handle error state, e.g., show a fallback
      } finally {
        setLoading(false);
      }
    };

    fetchHostDetails();
  }, []);

  const getInitials = (firstName, lastName) => {
    if (!firstName || !lastName) return '...';
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  };

  if (loading) {
    return (
      <header className="flex items-center justify-between p-4 bg-white shadow-sm animate-pulse">
        <div className="flex-1 max-w-lg h-10 bg-gray-200 rounded-full"></div>
        <div className="flex items-center space-x-4 ml-4">
          <div className="h-6 w-6 bg-gray-200 rounded-full"></div>
          <div className="flex items-center space-x-2">
            <div className="h-10 w-10 bg-gray-200 rounded-full"></div>
            <div className="space-y-2">
              <div className="h-4 w-24 bg-gray-200 rounded"></div>
              <div className="h-3 w-32 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
      </header>
    );
  }

  return (
    <header className="flex items-center justify-between p-4 bg-white shadow-sm">
      <div className="flex-1 max-w-lg relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
        <input
          type="text"
          placeholder="Search by location, university, or amenities..."
          className="w-full pl-10 pr-4 py-2 rounded-full text-sm bg-gray-100 focus:ring-green-500 focus:outline-none"
        />
      </div>

      <div className="flex items-center space-x-4">
        <Bell className="text-gray-500 h-6 w-6 cursor-pointer hover:text-green-600" />
        <div className="flex items-center space-x-2 bg-gray-100 p-1 rounded-full cursor-pointer">
          <div className="bg-green-600 text-white rounded-full h-8 w-8 flex items-center justify-center text-sm font-semibold">
            {host ? getInitials(host.firstName, host.lastName) : '...'}
          </div>
          <div className="text-sm hidden sm:block">
            <p className="font-semibold text-gray-800">
              {host ? `${host.firstName} ${host.lastName}` : 'Loading...'}
            </p>
            <p className="text-gray-500 text-xs">
              {host ? host.email : '...'}
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}