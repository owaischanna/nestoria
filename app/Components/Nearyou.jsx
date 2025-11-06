"use client";

import { Heart, MapPin, Wifi, Users, Calendar, ArrowDown } from 'lucide-react'; 
import { useState } from 'react';
import RenterHeader from './RenterHeader';
import Sidebar from './RenterSidebar';
import MultiStepApplicationForm from './MultiStepApplicationForm';

// --- Mock Data ---
const mockProperties = [
    {
      title: "Cory Room Near Campus",
      location: "Greenwich Village, Cartabria",
      price: 750,
      features: ["Private Room", "2 Housemates", "WIFI Included", "5 min to Subway"],
      tags: ["Student Friendly", "Female Only", "Available Sep 1"],
      imageSrc: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=80&q=80",
      currency: "€"
    },
    {
      title: "Modern Room in Cartabria",
      location: "Williamsburg, Cartabria",
      price: 700,
      features: ["Shared Room", "WIFI Included"],
      tags: ["Student Friendly", "Pet-Friendly", "Available Sep 25"],
      imageSrc: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=80&q=80",
      currency: "€"
    },
    {
      title: "Modern Room in Brooklyn",
      location: "Williamsburg, Brooklyn",
      price: 650,
      features: ["Private Room", "WIFI Included"],
      tags: ["Fully Furnished", "Female Only", "Available Sep 30"],
      imageSrc: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=80&q=80",
      currency: "€"
    },
];

// --- Sub-Component: PropertyCard ---
const PropertyCard = ({ property, onApplyClick }) => {
  const { title, location, price, features, tags, imageSrc, currency } = property;

  const tagColors = {
    "Student Friendly": "bg-blue-100 text-blue-800",
    "Female Only": "bg-yellow-100 text-yellow-800",
    "Pet-Friendly": "bg-green-100 text-green-800",
    "Fully Furnished": "bg-purple-100 text-purple-800",
  };

  const featureIcons = {
    "Private Room": <Wifi size={16} />,
    "2 Housemates": <Users size={16} />,
    "WIFI Included": <Wifi size={16} />,
    "Shared Room": <Users size={16} />,
    "5 min to Subway": <MapPin size={16} />,
  };
  
  const formatTag = (tag) => {
    if (tag.startsWith("Available")) {
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-500 text-white">
          <Calendar size={12} className="mr-1" />
          {tag}
        </span>
      );
    }
    const colorClass = tagColors[tag] || "bg-gray-100 text-gray-800";
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${colorClass}`}>
        {tag}
      </span>
    );
  };

  return (
    <div className="flex flex-col md:flex-row border border-gray-200 rounded-xl shadow-sm overflow-hidden bg-white p-4 md:p-6 transition-shadow hover:shadow-lg">
      
      {/* 1. Image and Heart Icon */}
      <div className="relative w-full md:w-[240px] h-48 md:h-48 rounded-lg overflow-hidden mb-4 md:mb-0 md:mr-6 flex-shrink-0">
        <img
          src={imageSrc}
          alt={title}
          className="w-full h-full object-cover"
        />
        <button
          className="absolute top-2 right-2 p-1 bg-white rounded-full shadow-md hover:scale-105 transition"
          aria-label="Add to favorites"
        >
          <Heart size={18} className="text-gray-500 fill-gray-100" />
        </button>
      </div>

      {/* 2. Details and Actions */}
      <div className="flex-grow flex flex-col justify-between py-1">
        <div>
          <h2 className="text-lg md:text-xl font-semibold text-gray-900 mb-1">{title}</h2>
          <div className="flex items-center text-sm text-gray-500 mb-3">
            <MapPin size={16} className="mr-1 text-gray-400" />
            {location}
          </div>

          {/* Features */}
          <div className="flex flex-wrap gap-x-3 md:gap-x-4 gap-y-1 text-xs md:text-sm text-gray-600 mb-3 md:mb-4">
            {features.map((feature, index) => (
              <span key={index} className="flex items-center">
                {featureIcons[feature] || <span className="mr-1">•</span>}
                {feature}
              </span>
            ))}
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-1 md:gap-2 mb-3 md:mb-4">
            {tags.map((tag, index) => (
              <span key={index}>{formatTag(tag)}</span>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
          <button className="px-3 md:px-4 py-2 border border-gray-300 text-xs md:text-sm font-medium rounded-md text-gray-700 hover:bg-gray-50 transition">
            Message Host
          </button>
          <button 
            className="px-3 md:px-4 py-2 text-xs md:text-sm font-medium rounded-md text-white bg-orange-500 hover:bg-orange-600 transition shadow-md"
            onClick={() => onApplyClick(property)}
          >
            Apply
          </button>
        </div>
      </div>

      {/* 3. Price */}
      <div className="w-full md:w-1/6 flex justify-start md:justify-end text-left md:text-right pt-3 md:pt-1 flex-shrink-0 mt-3 md:mt-0 border-t md:border-t-0 border-gray-200 md:border-none pt-3 md:pt-0">
        <div className="text-lg md:text-xl font-bold text-gray-700">
          <span className="text-xl md:text-2xl">{currency}{price}</span>
          <span className="text-sm md:text-base font-normal text-gray-500 ml-1">/month</span>
        </div>
      </div>
    </div>
  );
};


// --- Main Component: NearYou ---
const NearYouComponent = () => {
  const [showApplicationForm, setShowApplicationForm] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState(null);

  const handleApplyClick = (property) => {
    setSelectedProperty(property);
    setShowApplicationForm(true);
  };

  const handleCloseForm = () => {
    setShowApplicationForm(false);
    setSelectedProperty(null);
  };

  // Show application form on the same page
  if (showApplicationForm && selectedProperty) {
    return (
      <div className="flex min-h-screen bg-gray-50">
        {/* Sidebar - First in layout */}
        <Sidebar />
        
        {/* Main Content Area */}
        <div className="flex-1 flex flex-col">
          {/* RenterHeader - Below Sidebar */}
          <RenterHeader />
          
          {/* Application Form Content */}
          <div className="flex-1 overflow-y-auto">
            <MultiStepApplicationForm 
              property={selectedProperty}
              onClose={handleCloseForm}
            />
          </div>
        </div>
      </div>
    );
  }

  // Show property listings
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar - First in layout */}
      <Sidebar />
      
      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* RenterHeader - Below Sidebar */}
        <RenterHeader />
        
        {/* Main Content Area (Scrollable) */}
        <div className="flex-1 p-4 md:p-6 lg:p-8 xl:p-10 overflow-y-auto">
          
          {/* Heading and Summary Section */}
          <div className="mb-4 md:mb-6 p-4 md:p-6 rounded-xl shadow-lg border border-gray-100">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Near You</h1>
            <p className="text-xs md:text-sm text-gray-600 mb-1 md:mb-2">789 University Place, Apt 4C</p>
            <p className="text-xs md:text-sm text-gray-600 mb-2 md:mb-4">Cartabria, NY 10003</p>
            <p className="text-xs md:text-sm text-gray-600 mb-3 md:mb-4">47 properties found</p>

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-t pt-3 md:pt-4 gap-2">
                {/* Location Filter Tag */}
                <div className="flex items-center text-xs md:text-sm font-medium text-orange-600">
                    <MapPin size={16} className="mr-1 md:mr-2" />
                    Showing apartments near you
                </div>
                
                {/* Best Match Dropdown */}
                <div className="relative inline-block text-left">
                    <select
                        className="py-1.5 md:py-2 pl-2 md:pl-3 pr-6 md:pr-8 text-xs md:text-sm border border-gray-300 rounded-md bg-white text-gray-700 appearance-none focus:outline-none focus:ring-1 focus:ring-orange-500 cursor-pointer w-full sm:w-auto"
                        defaultValue="Best Match"
                    >
                        <option value="Best Match">Best Match</option>
                        <option value="PriceLow">Price (Low to High)</option>
                        <option value="PriceHigh">Price (High to Low)</option>
                        <option value="Newest">Newest</option>
                    </select>
                    <ArrowDown 
                        size={14} 
                        className="absolute right-1.5 md:right-2 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                    />
                </div>
            </div>
          </div>

          {/* Property Listings */}
          <div className="space-y-4 md:space-y-6">
            {mockProperties.map((property, index) => (
              <PropertyCard 
                key={index} 
                property={property} 
                onApplyClick={handleApplyClick}
              /> 
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NearYouComponent;