// MyFavoritesPage.jsx
"use client";

import React from 'react';
import { 
    Heart, MapPin, DollarSign, Menu, Search, Bell, User, 
    LayoutDashboard, FileText, MessageSquare, Calendar, CreditCard, Settings, HelpCircle 
} from 'lucide-react';
import RenterHeader from './RenterHeader';
import Sidebar from './RenterSidebar';


// --- MOCK DATA (EURO SYMBOL USED) ---
const favoriteListings = [
    {
        id: 1,
        title: "Cozy Room Near Campus",
        location: "Greenwich Village",
        price: "750",
        wasPrice: "800",
        type: "Private Room",
        details: "Shared",
        available: "Sep 1",
        tags: [
            { text: "Student Friendly", color: "text-blue-700 bg-blue-100" }
        ],
        added: "2 days ago",
        imageUrl: "https://enzahome.pk/cdn/shop/files/baselbed.jpg?v=1740996046&width=500",
        hasPriceDrop: true
    },
    {
        id: 2,
        title: "Modern Studio in Brooklyn",
        location: "Williamsburg",
        price: "950",
        type: "Shared Room",
        details: "Utilities included",
        available: "Sep 25",
        tags: [
            { text: "Fully Furnished", color: "text-orange-700 bg-orange-100" }
        ],
        added: "2 days ago",
        imageUrl: "https://enzahome.pk/cdn/shop/files/baselbed.jpg?v=1740996046&width=500",
        hasPriceDrop: false
    },
    {
        id: 3,
        title: "Modern Studio in Brooklyn",
        location: "Williamsburg",
        price: "950",
        type: "Shared Room",
        details: "Utilities included",
        available: "Sep 25",
        tags: [
            { text: "Fully Furnished", color: "text-orange-700 bg-orange-100" }
        ],
        added: "2 days ago",
        imageUrl: "https://enzahome.pk/cdn/shop/files/baselbed.jpg?v=1740996046&width=500",
        hasPriceDrop: false
    }
];

// --- Sub-Component: FavoriteCard (EURO SYMBOL USED) ---
const FavoriteCard = ({ listing }) => (
    <div className="bg-white rounded-xl shadow-md overflow-hidden relative border border-gray-100 hover:shadow-lg transition duration-300">
        {/* Image and Price Drop Tag */}
        <div className="relative h-48">
            <img 
                src={listing.imageUrl}
                alt={listing.title}
                className="w-full h-full object-cover"
            />
            {/* Heart Icon (Saved) */}
            <button className="absolute top-3 right-3 p-1.5 bg-white/80 rounded-full text-red-500 hover:bg-white transition">
                <Heart className="w-5 h-5 fill-red-500" />
            </button>
            
            {listing.hasPriceDrop && (
                <span className="absolute bottom-3 left-3 px-3 py-1 text-xs font-semibold text-white bg-green-600 rounded-full">
                    Price Drop
                </span>
            )}
        </div>

        {/* Card Body Content */}
        <div className="p-4">
            <h3 className="text-base font-semibold text-gray-800 truncate">{listing.title}</h3>
            <p className="text-xs text-gray-500 flex items-center mt-1">
                <MapPin className="w-3 h-3 mr-1" />
                {listing.location}
            </p>

            <div className="flex items-center justify-between mt-3 mb-2">
                <div>
                    {/* Price with Euro symbol (€) */}
                    <p className="text-xl font-bold text-green-700">
                        €{listing.price}
                        <span className="text-sm font-normal text-gray-500">/month</span>
                    </p>
                    {listing.wasPrice && (
                        // Was Price with Euro symbol (€) and calculation
                        <p className="text-xs text-red-500 mt-0.5">
                            Was €{listing.wasPrice} <span className="text-green-600 font-semibold">Save €{parseInt(listing.wasPrice) - parseInt(listing.price)}</span>
                        </p>
                    )}
                </div>
                <div className="text-right">
                    <p className="text-sm text-gray-600">{listing.type}</p>
                    <p className="text-xs text-gray-400">{listing.details}</p>
                </div>
            </div>

            {/* Tags/Badges */}
            <div className="flex flex-wrap gap-2 mt-3">
                <span className="text-xs font-medium px-2 py-0.5 rounded-full text-gray-700 bg-gray-100">
                    Available {listing.available}
                </span>
                {listing.tags.map((tag, index) => (
                    <span key={index} className={`text-xs font-medium px-2 py-0.5 rounded-full ${tag.color}`}>
                        {tag.text}
                    </span>
                ))}
            </div>
            
            <p className="text-xs text-gray-400 mt-3">Added {listing.added}</p>
        </div>
    </div>
);


// --- Main Page Content (EURO SYMBOL USED) ---
const MyFavoritesContent = () => {
    const totalSaved = favoriteListings.length;
    // Updated priceRange to use the Euro symbol (€)
    const priceRange = "€750-€950"; 
    const recentlyAddedCount = favoriteListings.length; 

    return (
        <div className="flex-1 p-8 bg-gray-50 overflow-y-auto">
            {/* Page Header */}
            
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">My Favorites</h1>
                    <p className="text-gray-600">Keep track of properties you're interested in</p>
                </div>
                {/* Grid/List View Toggle (Icons from image) */}
                <div className="flex space-x-2">
                    <button className="p-2 border border-green-600 bg-green-600 rounded-lg text-white">
                        <Menu className="w-5 h-5" /> {/* Represents grid/card view */}
                    </button>
                    <button className="p-2 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-100">
                        <LayoutDashboard className="w-5 h-5" /> {/* Represents list view */}
                    </button>
                </div>
            </div>

            {/* Summary Stats (EURO SYMBOL USED) */}
            <div className="mb-8 p-4 bg-white rounded-xl shadow-sm border border-gray-200">
                <div className="flex space-x-8">
                    <div>
                        <p className="text-3xl font-bold text-gray-900">{totalSaved}</p>
                        <p className="text-sm text-gray-500">Total Saved</p>
                    </div>
                    <div>
                        {/* Updated Price Range to show Euro symbol (€) */}
                        <p className="text-3xl font-bold text-blue-600">{priceRange}</p>
                        <p className="text-sm text-gray-500">Price Range</p>
                    </div>
                </div>
            </div>

            {/* Recently Added Section */}
            <div className="mb-10">
                <h2 className="text-xl font-bold text-gray-800 mb-4">
                    Recently Added ({recentlyAddedCount})
                </h2>
                
                {/* Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {favoriteListings.map(listing => (
                        <FavoriteCard key={listing.id} listing={listing} />
                    ))}
                </div>
            </div>
        </div>
    );
};

// --- Full Page Component ---
const MyFavoritesPage = () => {
    return (
        <div className="flex min-h-screen">
            {/* Sidebar on the left */}
            <Sidebar />

            {/* Page content on the right */}
            <div className="flex-1 flex flex-col overflow-hidden bg-gray-50">
                {/* Renter Header at the top */}
                <RenterHeader />

                {/* Main Message Content */}
                <main className="flex-1 overflow-y-auto">
                    <MyFavoritesContent />
                </main>
            </div>
        </div>
    );
};

export default MyFavoritesPage;