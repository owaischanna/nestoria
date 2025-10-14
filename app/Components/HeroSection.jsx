"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, MapPin, ChevronDown } from "lucide-react";
import AuthModal from "./AuthModal";

// Brand logo
const BrandLogo = () => (
  <div className="flex items-center space-x-2">
    <div className="w-6 h-6 bg-green-600 rounded-full" />
    <span className="text-xl font-bold text-gray-800">Nestoria</span>
  </div>
);

const NavBar = ({ onOpenAuth }) => {
  const [activeLink, setActiveLink] = useState("home");

  return (
    <nav className="fixed top-0 left-0 w-full bg-white shadow-md z-50">
      <div className="flex items-center justify-between px-8 py-4">
        {/* Left: Brand Logo */}
        <div className="flex-shrink-0">
          <BrandLogo />
        </div>

        {/* Right: Navigation Links and Get Started Button */}
        <div className="flex items-center space-x-6">
          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-4">
            <Link 
              href="#top" 
              className={`px-4 py-2 rounded-lg transition duration-150 font-medium ${
                activeLink === "home" 
                  ? "bg-green-600 text-white" 
                  : "text-gray-600 hover:bg-green-50"
              }`}
              onClick={() => setActiveLink("home")}
            >
              Home
            </Link>
            <Link 
              href="#about" 
              className={`px-4 py-2 rounded-lg transition duration-150 font-medium ${
                activeLink === "about" 
                  ? "bg-green-600 text-white" 
                  : "text-gray-600 hover:bg-green-50"
              }`}
              onClick={() => setActiveLink("about")}
            >
              About
            </Link>
            <Link 
              href="#how-it-works" 
              className={`px-4 py-2 rounded-lg transition duration-150 font-medium ${
                activeLink === "how-it-works" 
                  ? "bg-green-600 text-white" 
                  : "text-gray-600 hover:bg-green-50"
              }`}
              onClick={() => setActiveLink("how-it-works")}
            >
              How it works
            </Link>
            <Link 
              href="#testimonials" 
              className={`px-4 py-2 rounded-lg transition duration-150 font-medium ${
                activeLink === "testimonials" 
                  ? "bg-green-600 text-white" 
                  : "text-gray-600 hover:bg-green-50"
              }`}
              onClick={() => setActiveLink("testimonials")}
            >
              Testimonials
            </Link>
            <Link 
              href="#faq" 
              className={`px-4 py-2 rounded-lg transition duration-150 font-medium ${
                activeLink === "faq" 
                  ? "bg-green-600 text-white" 
                  : "text-gray-600 hover:bg-green-50"
              }`}
              onClick={() => setActiveLink("faq")}
            >
              FAQ
            </Link>
          </div>

          {/* Get Started Button */}
          <button
            onClick={onOpenAuth}
            className="flex items-center space-x-2 py-2 px-4 border border-green-600 text-green-600 rounded-lg hover:bg-green-50 transition duration-150 font-medium"
          >
            <span>Get Started</span>
            <span className="text-xl">→</span>
          </button>
        </div>
      </div>
    </nav>
  );
};


// Search Filter - Exact match to the image layout
// Search Filter - Expanded to right side with search icon
// Search Filter - Moved to left side and expanded to right
const SearchFilter = () => (
  <div className="bg-white p-6 rounded-xl shadow-2xl w-full mr-8"> {/* Added mr-8 for spacing from image */}
    
    {/* RENT LIST buttons on same line */}
    <div className="flex space-x-6 mb-6">
      <button className="text-gray-900 font-bold text-lg">RENT</button>
      <button className="text-gray-500 font-bold text-lg">LIST</button>
    </div>

    {/* Four columns layout with search button on right */}
    <div className="flex items-end gap-4">
      
      {/* Location Column */}
      <div className="flex-1">
        <label className="text-sm font-medium text-gray-700 block mb-2">Location</label>
        <div className="border border-gray-300 rounded-lg p-3">
          <select className="w-full bg-white text-gray-600 outline-none text-sm">
            <option>Select Your City</option>
          </select>
        </div>
      </div>

      {/* Apartment Type Column */}
      <div className="flex-1">
        <label className="text-sm font-medium text-gray-700 block mb-2">Apartment Type</label>
        <div className="border border-gray-300 rounded-lg p-3">
          <select className="w-full bg-white text-gray-600 outline-none text-sm">
            <option>Choose Property Type</option>
          </select>
        </div>
      </div>

      {/* Price Range Column */}
      <div className="flex-1">
        <label className="text-sm font-medium text-gray-700 block mb-2">Price Range</label>
        <div className="border border-gray-300 rounded-lg p-3">
          <select className="w-full bg-white text-gray-600 outline-none text-sm">
            <option>Choose Price Range</option>
          </select>
        </div>
      </div>

      {/* Search Button - Now on the same row */}
      <button className="bg-green-600 hover:bg-green-700 text-white p-4 rounded-lg transition duration-150 h-[52px] flex items-center justify-center">
        <Search className="w-5 h-5" />
      </button>
    </div>
  </div>
);

// Stats Section
const StatsSection = () => (
  <div className="flex justify-center space-x-12 relative z-20 pt-4">
    <div className="bg-white px-6 py-4 rounded-3xl shadow-xl flex items-center space-x-3 max-w-xs">
      <div className="flex -space-x-2">
        <img src="https://images.unsplash.com/photo-1502685104226-ee32379fefbe?auto=format&fit=crop&w=30&q=80" alt="User 1" className="w-8 h-8 rounded-full border-2 border-white object-cover" />
        <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=30&q=80" alt="User 2" className="w-8 h-8 rounded-full border-2 border-white object-cover" />
        <img src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=30&q=80" alt="User 3" className="w-8 h-8 rounded-full border-2 border-white object-cover" />
        <div className="w-8 h-8 rounded-full border-2 border-white bg-gray-200 flex items-center justify-center text-xs font-bold text-gray-600">+</div>
      </div>
      <p className="text-base font-bold text-gray-800">72k+ Happy Customers</p>
    </div>

    <div className="hidden sm:flex bg-white px-6 py-4 rounded-3xl shadow-xl items-center space-x-3 max-w-xs">
      <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
        <span className="text-green-600 text-xl font-bold">200+</span>
      </div>
      <p className="text-base font-bold text-gray-800">200+ New Listings Everyday!</p>
    </div>
  </div>
);

// Hero Section
const HeroSection = () => {
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  return (
    <div id="top" className="min-h-screen bg-white overflow-hidden pt-24">
      <NavBar onOpenAuth={() => setIsAuthOpen(true)} />
      <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />

      <div className="relative pt-10 pb-20 px-4">
        <div
          className="absolute bottom-0 left-1/2 w-[200vw] h-[200vw] sm:w-[150vw] sm:h-[150vw] rounded-full transform -translate-x-1/2 translate-y-1/2 z-0 opacity-80"
          style={{
            background: 'radial-gradient(circle, rgba(144, 238, 144, 0.4) 0%, rgba(255, 255, 255, 0) 60%)',
            filter: 'blur(100px)',
          }}
        />

        <div className="relative max-w-7xl mx-auto flex flex-col lg:flex-row items-start lg:items-center justify-between z-10">
          {/* Left Content */}
          <div className="lg:w-1/2 p-4 text-center lg:text-left relative z-20">
            <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 leading-tight">
              Find a perfect home you love..!
            </h1>
            <p className="mt-4 text-xl text-gray-600 max-w-md mx-auto lg:mx-0">
              One Roof, Many Generations, Endless Connections...
            </p>

            <div className="mt-16 flex justify-center lg:justify-start"> {/* moved down */}
              <SearchFilter />
            </div>
          </div>

          {/* Right Content */}
          <div className="lg:w-1/2 mt-4 lg:mt-0 p-4 relative z-10 -translate-y-8"> {/* moved up */}
            <div className="relative h-96 lg:h-[500px] w-full overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1572120360610-d971b9d7767c?auto=format&fit=crop&w=1200&q=80"
                alt="Modern house"
                className="absolute inset-0 w-full h-full object-cover rounded-2xl shadow-2xl"
              />
              <div className="absolute top-1/4 right-1/4 w-4 h-4 bg-green-400 rounded-full opacity-70 mix-blend-multiply" />
              <div className="absolute top-1/3 right-[10%] w-2 h-2 bg-green-600 rounded-full opacity-70 mix-blend-multiply" />
              <div className="absolute top-[20%] right-2 w-6 h-6 bg-green-300 rounded-full opacity-70 mix-blend-multiply" />
            </div>
          </div>
        </div>
      </div>

      <StatsSection />
    </div>
  );
};

export default HeroSection;
