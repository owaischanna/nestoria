// components/HostReviewsRatings.js (Updated to handle routing)
"use client";

import { useState } from 'react'; // Added useState
import HostHeader from './HostHeader';
import HostSidebar from './HostSidebar';
import HostRatingGuidelines from './HostRatingGuideline';// <-- Import the new component

import { Star, ChevronDown, BookOpen } from 'lucide-react'; 

// --- Mock Data (Kept the same) ---
const mockReviewData = {
    averageRating: 4.8,
    totalReviews: 47,
    breakdown: [
        { stars: 5, count: 28, percentage: 60 },
        { stars: 4, count: 15, percentage: 32 },
        { stars: 3, count: 3, percentage: 6 },
        { stars: 2, count: 1, percentage: 2 },
        { stars: 1, count: 0, percentage: 0 },
    ],
    categories: [
        { name: 'Cleanliness', rating: 4.9 },
        { name: 'Communication', rating: 4.8 },
        { name: 'Location', rating: 4.7 },
        { name: 'Value for Money', rating: 4.6 },
        { name: 'Check-in Experience', rating: 4.9 },
    ]
};

const recentReviews = [
    {
        name: "James Rodriguez",
        avatar: "https://i.pravatar.cc/150?img=3",
        listing: "Cozy Room",
        duration: "6 month",
        timeAgo: "3 days ago",
        rating: 5.0,
        comment: null,
    },
    {
        name: "Alex Kim",
        avatar: "https://i.pravatar.cc/150?img=5",
        listing: "Modern Studio Room",
        duration: "6 month",
        timeAgo: "3 days ago",
        rating: 5.0,
        comment: "Margaret was an exceptional host! The room was exactly as described - clean, comfortable, and in a great location just a short walk from my university. She was always available to answer questions and made the check-in process seamless. The house was quiet and perfect for studying, and I felt safe and welcome throughout my stay. The neighborhood is fantastic with lots of cafes, restaurants, and easy subway access. I especially appreciated the fully equipped kitchen and the beautiful backyard where I could relax between classes. I would definitely recommend this place to other students and would love to stay here again if I return to Spain. Thank you Margaret for making my time in Spain so memorable!",
    },
];

// --- Sub-Component: StarRating (Helper to display star icons) ---
const StarRating = ({ rating }) => {
    const fullStars = Math.floor(rating);
    const starArray = Array(5).fill(0).map((_, index) => {
        if (index < fullStars) {
            return <Star key={index} size={14} className="text-orange-500 fill-orange-500" />;
        }
        return <Star key={index} size={14} className="text-gray-300" />;
    });

    return (
        <div className="flex items-center space-x-0.5">
            {starArray}
        </div>
    );
};

// --- Sub-Component: ProgressBar (Helper for rating breakdown) ---
const ProgressBar = ({ percentage }) => (
    <div className="h-2 bg-gray-200 rounded-full w-full">
        <div 
            className="h-2 bg-orange-500 rounded-full" 
            style={{ width: `${percentage}%` }}
        ></div>
    </div>
);

// --- Sub-Component: SingleReviewCard ---
const SingleReviewCard = ({ review }) => {
    const { name, avatar, listing, duration, timeAgo, rating, comment } = review;
    
    return (
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
            <div className="flex justify-between items-start">
                <div className="flex items-start space-x-3">
                    <img 
                        src={avatar} 
                        alt={name} 
                        className="w-10 h-10 rounded-full object-cover shadow-sm" 
                    />
                    <div>
                        <p className="font-semibold text-gray-800 text-sm">{name}</p>
                        <p className="text-xs text-gray-500 flex items-center space-x-1">
                            <span>{listing}</span> 
                            <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                            <span>{duration}</span>
                            <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                            <span>{timeAgo}</span>
                        </p>
                    </div>
                </div>
                <div className="flex items-center space-x-1">
                    <StarRating rating={rating} />
                    <span className="text-sm font-medium text-gray-700">{rating.toFixed(1)}</span>
                </div>
            </div>
            {comment && (
                <div className="mt-3 pl-14">
                    <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">
                        {comment}
                    </p>
                </div>
            )}
        </div>
    );
};

// --- Main Export Component ---
const HostReviewsRatings = () => {
    // State to toggle between the main reviews page and the guidelines page
    const [showGuidelines, setShowGuidelines] = useState(false);
    
    const { averageRating, totalReviews, breakdown, categories } = mockReviewData;

    // --- Conditional Rendering Function ---
    const renderReviewsContent = () => (
        <div className="flex-1 p-8 pt-6">
            
            {/* --- Page Header --- */}
            <div className="flex justify-between items-start mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Reviews & Ratings</h1> 
                    <p className="text-base text-gray-600">Manage and respond to reviews from your tenants</p>
                </div>
                {/* Button to show Guidelines */}
                <button 
                    onClick={() => setShowGuidelines(true)} // <-- SET STATE TO TRUE
                    className="flex items-center space-x-2 border border-green-500 text-green-600 py-2 px-3 rounded-md text-sm font-medium hover:bg-green-50 transition shadow-sm">
                    <BookOpen size={16} />
                    <span>Guidelines</span>
                </button>
            </div>

            {/* --- Reviews Summary Card --- */}
            <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 mb-8">
                <div className="grid grid-cols-2 gap-8">
                    
                    {/* Left: Rating Breakdown */}
                    <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-3">Rating Breakdown</h3>
                        
                        {/* Average Rating */}
                        <div className="flex items-end mb-4">
                            <span className="text-5xl font-bold text-gray-900">{averageRating.toFixed(1)}</span>
                            <div className="ml-2">
                                <StarRating rating={averageRating} />
                                <p className="text-xs text-gray-500">Based on {totalReviews} reviews</p>
                            </div>
                        </div>

                        {/* Star Breakdown Bars */}
                        <div className="space-y-1">
                            {breakdown.map((item) => (
                                <div key={item.stars} className="flex items-center space-x-2">
                                    <span className="w-8 text-xs font-medium text-gray-700">{item.stars} star</span>
                                    <div className="flex-1">
                                        <ProgressBar percentage={item.percentage} />
                                    </div>
                                    <span className="w-8 text-right text-xs text-gray-500">{item.count}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right: Category Ratings */}
                    <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-5">Category Ratings</h3>
                        <div className="space-y-2">
                            {categories.map((category) => (
                                <div key={category.name} className="flex justify-between items-center pb-1 border-b border-gray-100">
                                    <span className="text-sm text-gray-700">{category.name}</span>
                                    <span className="text-base font-bold text-orange-500">{category.rating.toFixed(1)}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* --- Recent Reviews Section --- */}
            <h2 className="text-xl font-semibold text-gray-900 mb-3">
                Recent Reviews ({recentReviews.length})
            </h2>

            <div className="flex justify-end space-x-3 mb-4">
                {/* Dropdowns */}
                <div className="relative">
                    <select
                        className="py-1.5 pl-3 pr-8 text-sm border border-gray-300 rounded-md bg-white text-gray-700 appearance-none focus:outline-none focus:ring-1 focus:ring-orange-500 cursor-pointer"
                        defaultValue="Most Recent"
                    >
                        <option>Most Recent</option>
                        <option>Highest Rating</option>
                        <option>Lowest Rating</option>
                    </select>
                    <ChevronDown size={14} className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                </div>
                <div className="relative">
                    <select
                        className="py-1.5 pl-3 pr-8 text-sm border border-gray-300 rounded-md bg-white text-gray-700 appearance-none focus:outline-none focus:ring-1 focus:ring-orange-500 cursor-pointer"
                        defaultValue="All Properties"
                    >
                        <option>All Properties</option>
                        <option>Cozy Room</option>
                        <option>Modern Studio Room</option>
                    </select>
                    <ChevronDown size={14} className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                </div>
            </div>

            {/* Review List */}
            <div className="space-y-4">
                {recentReviews.map((review, index) => (
                    <SingleReviewCard key={index} review={review} />
                ))}
            </div>

        </div>
    );


    return (
        // Wrapper for the full page layout (Header/Sidebar/Content)
        <div className="flex flex-col h-screen bg-white overflow-hidden">
            
            <div className="flex flex-1 overflow-hidden">
                <HostSidebar />

                {/* Main Scrollable Area (Includes Header and Content) */}
                <div className="flex flex-col flex-1 overflow-y-auto bg-gray-50">
                    
                    <HostHeader /> 

                    {/* Conditional Content Rendering */}
                    {showGuidelines ? (
                        <HostRatingGuidelines onBack={() => setShowGuidelines(false)} /> // Pass handler to go back
                    ) : (
                        renderReviewsContent() // Render the main reviews page
                    )}
                </div>
            </div>
        </div>
    );
};

export default HostReviewsRatings;