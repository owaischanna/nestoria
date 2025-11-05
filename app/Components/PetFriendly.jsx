// components/PetFriendlyProperties.js
"use client";

// --- EXTERNAL COMPONENT IMPORTS ---
import RenterHeader from './RenterHeader';
import Sidebar from './RenterSidebar';

import { Heart, MapPin, Search, Bed, Bath, LayoutGrid, ArrowDown, DollarSign } from 'lucide-react'; 

// --- Mock Data ---
const mockProperties = [
    {
      title: "Pet-Friendly Apartment Near Central Park",
      location: "Upper West Side, Cantabria",
      price: 1200,
      petFee: 50,
      currency: "$",
      features: ["1 Room", "1 Bath", "450 sqft"],
      tags: ["Dogs Welcome", "Cats Welcome"],
      imageSrc: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOgziMScOHDsVglNc-id0yJKnfFd_DN20hmg&s",
    },
    {
      title: "Pet-Friendly Apartment Near Central Park",
      location: "Upper West Side, Cantabria",
      price: 1200,
      petFee: 50,
      currency: "$",
      features: ["1 Room", "1 Bath", "450 sqft"],
      tags: ["Dogs Welcome", "Cats Welcome"],
      imageSrc: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOgziMScOHDsVglNc-id0yJKnfFd_DN20hmg&s",
    },
    {
      title: "Pet-Friendly Apartment Near Central Park",
      location: "Upper West Side, Cantabria",
      price: 1200,
      petFee: 50,
      currency: "$",
      features: ["1 Room", "1 Bath", "450 sqft"],
      tags: ["Dogs Welcome", "Cats Welcome"],
      imageSrc: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOgziMScOHDsVglNc-id0yJKnfFd_DN20hmg&s",
    },
];

// --- Sub-Component: PropertyCard (Adapted for Pet-Friendly look) ---
const PropertyCard = ({ property }) => {
  const { title, location, price, petFee, currency, features, tags, imageSrc } = property;

  const featureIcons = {
    "Room": <Bed size={16} />,
    "Bath": <Bath size={16} />,
    "sqft": <LayoutGrid size={16} />,
  };

  const tagColors = {
    "Dogs Welcome": "bg-yellow-600 text-white", // Yellow/Orange background for 'Dogs Welcome'
    "Cats Welcome": "bg-orange-600 text-white", // Orange background for 'Cats Welcome'
  };

  return (
    <div className="flex border border-gray-200 rounded-xl shadow-sm overflow-hidden bg-white p-4 transition-shadow hover:shadow-lg">
      
      {/* 1. Image and Pet-Friendly Badge */}
      <div className="relative w-[240px] h-48 rounded-lg overflow-hidden mr-6 flex-shrink-0">
        <img
          src={imageSrc}
          alt={title}
          className="w-full h-full object-cover"
        />
        {/* Pet-Friendly Badge */}
        <span className="absolute top-2 left-2 flex items-center bg-green-500 text-white px-2 py-0.5 rounded-full text-xs font-medium shadow-md">
            <span role="img" aria-label="paw" className="mr-1">🐾</span>
            Pet Friendly
        </span>
        {/* Favorite Button */}
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

          {/* Features (Room/Bath/Sqft) */}
          <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-gray-600 mb-4">
            {features.map((feature, index) => {
              const [value, label] = feature.split(' ');
              const icon = featureIcons[label] || featureIcons[label.toLowerCase()] || featureIcons[label.split(' ')[1]];
              return (
                <span key={index} className="flex items-center">
                    {icon || <span className="mr-1">•</span>}
                    {value} <span className="text-gray-500 ml-1">{label}</span>
                </span>
              );
            })}
          </div>

          {/* Pet Tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            {tags.map((tag, index) => (
                <span key={index} 
                    className={`inline-flex items-center px-2.5 py-0.5 rounded text-xs font-medium ${tagColors[tag] || 'bg-gray-100 text-gray-800'}`}>
                    {tag}
                </span>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-3">
          <button className="px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 hover:bg-gray-50 transition">
            Message Host
          </button>
          <button className="px-4 py-2 text-sm font-medium rounded-md text-white bg-orange-500 hover:bg-orange-600 transition shadow-md">
            Apply
          </button>
        </div>
      </div>

      {/* 3. Price */}
      <div className="w-1/6 flex justify-end text-right pt-1 flex-shrink-0">
        <div className="text-xl font-bold text-gray-700">
          <span className="text-2xl">{currency}{price}</span>
          <span className="text-base font-normal text-gray-500 ml-1">/month</span>
          <p className="text-xs text-gray-500 mt-1">Pet fee: ${petFee}/month</p>
        </div>
      </div>
    </div>
  );
};

// --- Main Export Component: PetFriendlyProperties (Page Layout) ---
const PetFriendlyProperties = () => {
    return (
        <div className="flex min-h-screen bg-gray-50">
            {/* Sidebar - First in the layout */}
            <Sidebar />
            
            {/* Main Content Area */}
            <div className="flex-1 flex flex-col">
                {/* RenterHeader - Below Sidebar */}
                <RenterHeader />
                
                {/* Main Content Area (Scrollable) */}
                <div className="flex-1 p-6 md:p-8 lg:p-10 overflow-y-auto bg-gray-50">
                    
                    {/* Heading and Summary Section */}
                    <div className="mb-6">
                        <h1 className="text-3xl font-bold text-gray-900">Pet-Friendly Properties</h1>
                        <p className="text-sm text-gray-600 mb-4">47 properties found</p>

                        <div className="flex items-center justify-between border-t pt-4">
                            {/* Quick Filter Tag */}
                            <div className="flex items-center text-sm font-medium text-orange-600">
                                <span className="mr-2">🐾</span>
                                Showing pet-friendly apartments
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
                            <PropertyCard key={index} property={property} /> 
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PetFriendlyProperties;