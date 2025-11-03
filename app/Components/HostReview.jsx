// components/HostReviewsRatings.js
"use client";

import { useState, useEffect } from 'react'; // Added useState and useEffect
import HostHeader from './HostHeader';
import HostSidebar from './HostSidebar';
import HostRatingGuidelines from './HostRatingGuideline';

import { Star, ChevronDown, BookOpen } from 'lucide-react'; 

// --- Mock Data (Expanded and Updated) ---
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

// ADDED: 4 more reviews with varied ratings and dates for sorting
const allReviews = [
    {
        name: "Alex Kim",
        avatar: "https://i.pravatar.cc/150?img=5",
        listing: "Modern Studio Room",
        duration: "6 month",
        timeAgo: "3 days ago",
        date: "2025-10-31T10:00:00Z", // <-- Added date for sorting
        rating: 5.0,
        comment: "Margaret was an exceptional host! The room was exactly as described - clean, comfortable, and in a great location just a short walk from my university. She was always available to answer questions and made the check-in process seamless. I would definitely recommend this place.",
    },
    {
        name: "Samantha Lee",
        avatar: "https://i.pravatar.cc/150?img=8",
        listing: "Bright Downtown Loft",
        duration: "3 month",
        timeAgo: "1 day ago",
        date: "2025-11-02T14:30:00Z", // <-- Most recent
        rating: 4.0,
        comment: "Great location and a very clean space. The host was responsive. A bit noisy at night due to the central location, but that's to be expected. Overall, a good stay.",
    },
    {
        name: "James Rodriguez",
        avatar: "https://i.pravatar.cc/150?img=3",
        listing: "Cozy Room",
        duration: "6 month",
        timeAgo: "5 days ago",
        date: "2025-10-29T18:00:00Z",
        rating: 5.0,
        comment: null,
    },
    {
        name: "David Chen",
        avatar: "https://i.pravatar.cc/150?img=11",
        listing: "Cozy Room",
        duration: "1 month",
        timeAgo: "2 weeks ago",
        date: "2025-10-20T09:00:00Z",
        rating: 2.0, // <-- Lowest rating
        comment: "The location was convenient, but the cleanliness was not up to par. There were issues with the Wi-Fi which made it difficult to work. Host tried to help but the problem persisted.",
    },
    {
        name: "Maria Garcia",
        avatar: "https://i.pravatar.cc/150?img=1",
        listing: "Modern Studio Room",
        duration: "12 month",
        timeAgo: "1 month ago",
        date: "2025-10-03T11:00:00Z",
        rating: 4.0,
        comment: null,
    },
    {
        name: "Peter Jones",
        avatar: "https://i.pravatar.cc/150?img=12",
        listing: "Bright Downtown Loft",
        duration: "2 month",
        timeAgo: "2 months ago",
        date: "2025-09-03T16:45:00Z", // <-- Oldest
        rating: 5.0,
        comment: "Absolutely fantastic stay. The loft is beautiful, and the host went above and beyond to make me feel welcome. Highly recommended!",
    },
];

// --- Sub-Component: StarRating (Unchanged) ---
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

// --- Sub-Component: ProgressBar (Unchanged) ---
const ProgressBar = ({ percentage }) => (
    <div className="h-2 bg-gray-200 rounded-full w-full">
        <div 
            className="h-2 bg-orange-500 rounded-full" 
            style={{ width: `${percentage}%` }}
        ></div>
    </div>
);

// --- Sub-Component: SingleReviewCard (Unchanged) ---
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

// --- Main Export Component (UPDATED with sorting logic) ---
const HostReviewsRatings = () => {
    const [showGuidelines, setShowGuidelines] = useState(false);
    // --- STATE MANAGEMENT FOR SORTING ---
    const [sortBy, setSortBy] = useState('Most Recent');
    const [displayedReviews, setDisplayedReviews] = useState(allReviews);

    const { averageRating, totalReviews, breakdown, categories } = mockReviewData;

    // --- SORTING LOGIC ---
    useEffect(() => {
        // Create a copy to avoid mutating the original array
        const sortedReviews = [...allReviews]; 

        if (sortBy === 'Most Recent') {
            sortedReviews.sort((a, b) => new Date(b.date) - new Date(a.date));
        } else if (sortBy === 'Highest Rating') {
            sortedReviews.sort((a, b) => b.rating - a.rating);
        } else if (sortBy === 'Lowest Rating') {
            sortedReviews.sort((a, b) => a.rating - b.rating);
        }

        setDisplayedReviews(sortedReviews);
    }, [sortBy]); // This effect runs whenever 'sortBy' changes

    const renderReviewsContent = () => (
        <div className="flex-1 p-8 pt-6">
            
            {/* Page Header */}
            <div className="flex justify-between items-start mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Reviews & Ratings</h1> 
                    <p className="text-base text-gray-600">Manage and respond to reviews from your tenants</p>
                </div>
                <button 
                    onClick={() => setShowGuidelines(true)}
                    className="flex items-center space-x-2 border border-green-500 text-green-600 py-2 px-3 rounded-md text-sm font-medium hover:bg-green-50 transition shadow-sm">
                    <BookOpen size={16} />
                    <span>Guidelines</span>
                </button>
            </div>

            {/* Reviews Summary Card */}
            <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 mb-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Left: Rating Breakdown */}
                    <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-3">Rating Breakdown</h3>
                        <div className="flex items-end mb-4">
                            <span className="text-5xl font-bold text-gray-900">{averageRating.toFixed(1)}</span>
                            <div className="ml-2">
                                <StarRating rating={averageRating} />
                                <p className="text-xs text-gray-500">Based on {totalReviews} reviews</p>
                            </div>
                        </div>
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

            {/* Recent Reviews Section */}
            <h2 className="text-xl font-semibold text-gray-900 mb-3">
                Recent Reviews ({allReviews.length})
            </h2>

            <div className="flex justify-end space-x-3 mb-4">
                {/* --- UPDATED: Sort Dropdown now functional --- */}
                <div className="relative">
                    <select
                        value={sortBy} // Controlled component
                        onChange={(e) => setSortBy(e.target.value)} // State updater
                        className="py-1.5 pl-3 pr-8 text-sm border border-gray-300 rounded-md bg-white text-gray-700 appearance-none focus:outline-none focus:ring-1 focus:ring-orange-500 cursor-pointer"
                    >
                        <option>Most Recent</option>
                        <option>Highest Rating</option>
                        <option>Lowest Rating</option>
                    </select>
                    <ChevronDown size={14} className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                </div>
                {/* Property filter (still non-functional as requested) */}
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

            {/* --- UPDATED: Review List now renders from state --- */}
            <div className="space-y-4">
                {displayedReviews.map((review, index) => (
                    <SingleReviewCard key={index} review={review} />
                ))}
            </div>

        </div>
    );

    return (
        <div className="flex flex-col h-screen bg-white overflow-hidden">
            <div className="flex flex-1 overflow-hidden">
                <HostSidebar />
                <div className="flex flex-col flex-1 overflow-y-auto bg-gray-50">
                    <HostHeader /> 
                    {showGuidelines ? (
                        <HostRatingGuidelines onBack={() => setShowGuidelines(false)} />
                    ) : (
                        renderReviewsContent()
                    )}
                </div>
            </div>
        </div>
    );
};

export default HostReviewsRatings;