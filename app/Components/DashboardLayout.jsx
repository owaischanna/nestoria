// // DashboardLayout.jsx
// "use client";

// import React from 'react';
// import { Menu, Search, Heart, Bell, User, ChevronRight } from 'lucide-react';
// import Sidebar from './Sidebar'; // Import the separated Sidebar component

// // --- 1. Header Component ---
// // Contains the Logo, Search Bar, and User Actions.
// const Header = () => (
//     <header className="flex items-center justify-between p-4 border-b border-gray-200 bg-white sticky top-0 z-10">
//         {/* Logo */}
//         <div className="flex items-center space-x-2">
//             <img
//                 src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0HFWiXvgfpFSXkpGQHyGt2iHrEiBRvM_T-A&s"
//                 alt="BeakVia Logo"
//                 className="h-6 w-auto"
//             />
//             <span className="text-lg font-bold text-green-700">BeakVia</span>
//         </div>

//         {/* Search Bar */}
//         <div className="flex-1 max-w-xl mx-8">
//             <div className="relative">
//                 <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
//                 <input
//                     type="text"
//                     placeholder="Search by location, university, or amenities..."
//                     className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-1 focus:ring-green-500 text-sm"
//                 />
//             </div>
//         </div>

//         {/* User Actions */}
//         <div className="flex items-center space-x-4">
//             <Heart className="h-6 w-6 text-gray-500 hover:text-red-500 cursor-pointer" />
//             <div className="relative">
//                 <Bell className="h-6 w-6 text-gray-500 hover:text-green-600 cursor-pointer" />
//                 <span className="absolute top-0 right-0 block h-2 w-2 rounded-full ring-2 ring-white bg-red-500"></span>
//             </div>
//             <div className="flex items-center space-x-2 cursor-pointer p-1 rounded-full bg-gray-100 hover:bg-gray-200">
//                 <div className="bg-red-400 text-white rounded-full h-8 w-8 flex items-center justify-center text-sm font-semibold">
//                     AC
//                 </div>
//                 <div className="text-sm leading-tight hidden sm:block">
//                     <p className="font-semibold text-gray-800">Anna Chen</p>
//                     <p className="text-gray-500">Student at NYU</p>
//                 </div>
//                 <Menu className="h-5 w-5 text-gray-500 ml-1 hidden sm:block" />
//             </div>
//         </div>
//     </header>
// );


// // --- 2. Dashboard Layout Component ---
// // Wraps the entire application content.
// const DashboardLayout = ({ children }) => {
//     return (
//         <div className="flex flex-col h-screen">
//             {/* The shared Header appears at the top of the entire screen */}
//             <Header /> 
            
//             <div className="flex flex-1 overflow-hidden">
//                 {/* The Sidebar is fixed on the left */}
//                 <Sidebar />
                
//                 {/* The children prop is the main content area (Dashboard, Applications, etc.) */}
//                 <div className="flex-1 overflow-y-auto bg-gray-50">
//                     {children}
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default DashboardLayout;



"use client";

import React from "react";
import { Menu, Search, Heart, Bell, LogOut } from "lucide-react";
import Sidebar from "./Sidebar";
import { useAuth } from "../context/AuthContext"; // ✅ import auth context

// --- Header Component (Dynamic) ---
const Header = () => {
  const { user, logout } = useAuth(); // ✅ get user data and logout function

  if (!user) {
    return (
      <header className="p-4 border-b bg-white">
        <p className="text-sm text-gray-600">Loading user...</p>
      </header>
    );
  }

  const userInitials = user.firstName
    ? user.firstName.charAt(0).toUpperCase()
    : "U";

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

        {/* ✅ Dynamic User Info */}
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
};

// --- Dashboard Layout Component ---
const DashboardLayout = ({ children }) => {
  return (
    <div className="flex flex-col h-screen">
      <Header /> {/* ✅ Now dynamic based on logged-in user */}
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <div className="flex-1 overflow-y-auto bg-gray-50">{children}</div>
      </div>
    </div>
  );
};

export default DashboardLayout;
