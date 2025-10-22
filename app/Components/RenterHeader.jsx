"use client";

import { useState, useEffect } from "react";
import { Search, Bell, LogOut,Heart} from "lucide-react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

export default function RenterHeader() {
  const [renter, setRenter] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchRenterDetails = async () => {
      try {
        const response = await fetch("/api/user/me");
        if (!response.ok) {
          throw new Error("Failed to fetch renter details");
        }
        const result = await response.json();
        setRenter(result.data);
      } catch (error) {
        console.error("Error fetching renter:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRenterDetails();
  }, []);

  // ✅ Logout function
  const handleLogout = () => {
    Cookies.remove("token");
    localStorage.clear();
    router.push("/");
  };

  const getInitials = (firstName, lastName) => {
    if (!firstName || !lastName) return "...";
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
      {/* Search Bar */}
      <div className="flex-1 max-w-lg relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
        <input
          type="text"
          placeholder="Search properties, cities, or amenities..."
          className="w-full pl-10 pr-4 py-2 rounded-full text-sm bg-gray-100 focus:ring-green-500 focus:outline-none"
        />
      </div>

      {/* Right Side */}
      <div className="flex items-center space-x-4">
        <Heart className="h-6 w-6 text-gray-500 hover:text-red-500 cursor-pointer" />
      <div className="flex items-center space-x-4">
        <Bell className="text-gray-500 h-6 w-6 cursor-pointer hover:text-green-600" />
</div>
        {/* User Info */}
        <div className="flex items-center space-x-2 bg-gray-100 p-1 rounded-full cursor-pointer">
          <div className="bg-red-400 text-white rounded-full h-8 w-8 flex items-center justify-center text-sm font-semibold">
            {renter ? getInitials(renter.firstName, renter.lastName) : "..."}
          </div>
          <div className="text-sm hidden sm:block">
            <p className="font-semibold text-gray-800">
              {renter ? `${renter.firstName} ${renter.lastName}` : "Loading..."}
            </p>
            <p className="text-gray-500 text-xs">{renter ? renter.email : "..."}</p>
          </div>
        </div>

        {/* ✅ Logout Button */}
        <button
          onClick={handleLogout}
          title="Logout"
          className="p-2 rounded-full hover:bg-gray-200 transition"
        >
          <LogOut className="h-5 w-5 text-gray-600" />
        </button>
      </div>
    </header>
  );
}
