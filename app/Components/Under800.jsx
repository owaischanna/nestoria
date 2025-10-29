"use client";

import { Heart, MapPin, Wifi, Users, Calendar, ArrowDown, DollarSign } from 'lucide-react'; 
import { useState } from 'react';
import RenterHeader from './RenterHeader';
import Sidebar from './RenterSidebar';
import MultiStepApplicationForm from './MultiStepApplicationForm';

// --- Mock Data ---
const mockProperties = [
    {
      title: "Cozy Room Near Campus",
      location: "Greenwich Village, Manhattan",
      price: 750,
      features: ["Private Room", "2 Roommates", "WiFi Included", "5min to Subway"],
      tags: ["Student Friendly", "Female Only", "Available Sep 1"],
      imageSrc: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=80&q=80",
      currency: "€"
    },
    {
      title: "Modern Room in Brooklyn",
      location: "Williamsburg, Brooklyn",
      price: 700,
      features: ["Shared Room", "WiFi Included"],
      tags: ["Student Friendly", "Pet Friendly", "Available Sep 25"],
      imageSrc: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=80&q=80",
      currency: "€"
    },
    {
      title: "Modern Room in Brooklyn",
      location: "Williamsburg, Brooklyn",
      price: 650,
      features: ["Private Room", "WiFi Included"],
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
    "Pet Friendly": "bg-green-100 text-green-800",
    "Fully Furnished": "bg-purple-100 text-purple-800",
  };

  const featureIcons = {
    "Private Room": <Wifi size={16} />,
    "2 Roommates": <Users size={16} />,
    "WiFi Included": <Wifi size={16} />,
    "Shared Room": <Users size={16} />,
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
    <div className="flex border border-gray-200 rounded-xl shadow-sm overflow-hidden bg-white p-4 transition-shadow hover:shadow-lg">
      
      {/* 1. Image and Heart Icon */}
      <div className="relative w-[240px] h-48 rounded-lg overflow-hidden mr-6 flex-shrink-0">
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
          <h2 className="text-xl font-semibold text-gray-900 mb-1">{title}</h2>
          <div className="flex items-center text-sm text-gray-500 mb-3">
            <MapPin size={16} className="mr-1 text-gray-400" />
            {location}
          </div>

          {/* Features */}
          <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-gray-600 mb-4">
            {features.map((feature, index) => (
              <span key={index} className="flex items-center">
                {featureIcons[feature] || <span className="mr-1">•</span>}
                {feature}
              </span>
            ))}
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            {tags.map((tag, index) => (
              <span key={index}>{formatTag(tag)}</span>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-3">
          <button className="px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 hover:bg-gray-50 transition">
            Message Host
          </button>
          <button 
            className="px-4 py-2 text-sm font-medium rounded-md text-white bg-orange-500 hover:bg-orange-600 transition shadow-md"
            onClick={() => onApplyClick(property)}
          >
            Apply
          </button>
        </div>
      </div>

      {/* 3. Price */}
      <div className="w-1/6 flex justify-end text-right pt-1 flex-shrink-0">
        <div className="text-xl font-bold text-gray-700">
          <span className="text-2xl">{currency}{price}</span>
          <span className="text-base font-normal text-gray-500 ml-1">/month</span>
        </div>
      </div>
    </div>
  );
};


// --- Main Component: Under800 ---
const LisitngResultComponent = () => {
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
      <div className="flex flex-col h-screen overflow-hidden">
        <RenterHeader />
        <div className="flex flex-1 overflow-hidden">
          <Sidebar />
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
    <div className="flex flex-col h-screen overflow-hidden">
      {/* Renter Header */}
      <RenterHeader />
      
      {/* Main Content Area */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <Sidebar />
        
        {/* The main container for the content area */}
        <div className="flex-1 p-6 md:p-8 lg:p-10 overflow-y-auto">
          
          {/* Heading and Summary Section */}
          <div className="mb-6 p-6 rounded-xl shadow-lg border border-gray-100">
            <h1 className="text-3xl font-bold text-gray-900">Under €800</h1>
            <p className="text-sm text-gray-600 mb-4">47 properties found</p>

            <div className="flex items-center justify-between border-t pt-4">
                {/* Quick Filter Tag */}
                <div className="flex items-center text-sm font-medium text-orange-600">
                    <DollarSign size={18} className="mr-2" />
                    Showing under €800 apartments
                </div>
                
                {/* Best Match Dropdown */}
                <div className="relative inline-block text-left">
                    <select
                        className="py-2 pl-3 pr-8 text-sm border border-gray-300 rounded-md bg-white text-gray-700 appearance-none focus:outline-none focus:ring-1 focus:ring-orange-500 cursor-pointer"
                        defaultValue="Best Match"
                    >
                        <option value="Best Match">Best Match</option>
                        <option value="PriceLow">Price (Low to High)</option>
                        <option value="PriceHigh">Price (High to Low)</option>
                        <option value="Newest">Newest</option>
                    </select>
                    <ArrowDown 
                        size={16} 
                        className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                    />
                </div>
            </div>
          </div>

          {/* Property Listings */}
          <div className="space-y-6">
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

export default LisitngResultComponent;