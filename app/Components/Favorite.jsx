"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
    Heart, MapPin, Menu, LayoutDashboard, Loader2, ArrowDown
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
import RenterHeader from './RenterHeader';
import Sidebar from './RenterSidebar';

const FavoriteCard = ({ listing, onRemoveFavorite }) => {
    const [isRemoving, setIsRemoving] = useState(false);

    const handleRemove = async (e) => {
        e.stopPropagation();

        if (isRemoving) return;

        setIsRemoving(true);

        try {
            await onRemoveFavorite(listing.id);
        } finally {
            setIsRemoving(false);
        }
    };

    return (
        <div className="bg-white rounded-xl shadow-md overflow-hidden relative border border-gray-100 hover:shadow-lg transition duration-300">
            <div className="relative h-48">
                <img
                    src={listing.imageUrl || "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=500&q=80"}
                    alt={listing.title}
                    className="w-full h-full object-cover"
                />
                <button
                    onClick={handleRemove}
                    disabled={isRemoving}
                    className="absolute top-3 right-3 p-1.5 bg-white/80 rounded-full text-red-500 hover:bg-white transition disabled:opacity-50"
                >
                    <Heart className="w-5 h-5 fill-red-500" />
                </button>

                {listing.hasPriceDrop && (
                    <span className="absolute bottom-3 left-3 px-3 py-1 text-xs font-semibold text-white bg-green-600 rounded-full">
                        Price Drop
                    </span>
                )}
            </div>

            <div className="p-4">
                <h3 className="text-base font-semibold text-gray-800 truncate">{listing.title}</h3>
                <p className="text-xs text-gray-500 flex items-center mt-1">
                    <MapPin className="w-3 h-3 mr-1" />
                    {listing.location}
                </p>

                <div className="flex items-center justify-between mt-3 mb-2">
                    <div>
                        <p className="text-xl font-bold text-green-700">
                            {listing.currency}{listing.price}
                            <span className="text-sm font-normal text-gray-500">/month</span>
                        </p>
                        {listing.wasPrice && (
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
};

const MyFavoritesContent = () => {
    const { user: authUser } = useAuth();
    const [favorites, setFavorites] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [sortBy, setSortBy] = useState('recent');
    const [totalFavorites, setTotalFavorites] = useState(0);
    const [priceRange, setPriceRange] = useState('N/A');
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const fetchFavorites = async () => {
        if (!authUser) return;

        setLoading(true);
        setError(null);

        try {
            const params = new URLSearchParams({
                page: currentPage.toString(),
                limit: '20',
                sortBy
            });

            console.log('💖 Fetching favorites...');
            const response = await fetch(`/api/favorites?${params}`, {
                method: 'GET',
                credentials: 'include'
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to fetch favorites');
            }

            const data = await response.json();

            if (data.success) {
                setFavorites(data.favorites);
                setTotalFavorites(data.totalFavorites);
                setPriceRange(data.priceRange);
                setTotalPages(data.totalPages);
                console.log('✅ Fetched', data.favorites.length, 'favorites');
            } else {
                throw new Error(data.message || 'Failed to load favorites');
            }
        } catch (err) {
            setError(err.message);
            console.error('❌ Error fetching favorites:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchFavorites();
    }, [authUser, sortBy, currentPage]);

    const handleRemoveFavorite = async (listingId) => {
        try {
            console.log('💔 Removing favorite:', listingId);

            const response = await fetch('/api/favorites/toggle', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify({ listingId })
            });

            const data = await response.json();

            if (data.success) {
                setFavorites(prev => prev.filter(fav => fav.id !== listingId));
                setTotalFavorites(prev => prev - 1);
                toast.success(data.message);
                console.log('✅ Removed from favorites');
            } else {
                toast.error(data.message || 'Failed to remove favorite');
            }
        } catch (error) {
            console.error('❌ Error removing favorite:', error);
            toast.error('Failed to remove favorite');
        }
    };

    const handleSortChange = (e) => {
        const value = e.target.value;
        console.log('🔄 Changing sort to:', value);
        const sortMap = {
            'Recently Added': 'recent',
            'Oldest First': 'oldest',
            'Price Low to High': 'priceLow',
            'Price High to Low': 'priceHigh'
        };
        setSortBy(sortMap[value] || 'recent');
        setCurrentPage(1);
    };

    if (loading) {
        return (
            <div className="flex-1 p-8 bg-gray-50 overflow-y-auto flex items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-orange-500" />
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex-1 p-8 bg-gray-50 overflow-y-auto">
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <p className="text-red-800 text-sm">{error}</p>
                    <button
                        onClick={fetchFavorites}
                        className="mt-2 text-xs text-red-600 hover:text-red-800 underline"
                    >
                        Try again
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="flex-1 p-8 bg-gray-50 overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">My Favorites</h1>
                    <p className="text-gray-600">Keep track of properties you're interested in</p>
                </div>

                <div className="relative inline-block text-left">
                    <select
                        className="py-2 pl-3 pr-8 text-sm border border-gray-300 rounded-md bg-white text-gray-700 appearance-none focus:outline-none focus:ring-1 focus:ring-orange-500 cursor-pointer"
                        defaultValue="Recently Added"
                        onChange={handleSortChange}
                    >
                        <option value="Recently Added">Recently Added</option>
                        <option value="Oldest First">Oldest First</option>
                        <option value="Price Low to High">Price Low to High</option>
                        <option value="Price High to Low">Price High to Low</option>
                    </select>
                    <ArrowDown
                        size={14}
                        className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                    />
                </div>
            </div>

            <div className="mb-8 p-4 bg-white rounded-xl shadow-sm border border-gray-200">
                <div className="flex space-x-8">
                    <div>
                        <p className="text-3xl font-bold text-gray-900">{totalFavorites}</p>
                        <p className="text-sm text-gray-500">Total Saved</p>
                    </div>
                    <div>
                        <p className="text-3xl font-bold text-blue-600">{priceRange}</p>
                        <p className="text-sm text-gray-500">Price Range</p>
                    </div>
                </div>
            </div>

            {favorites.length === 0 ? (
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 text-center">
                    <Heart size={48} className="mx-auto text-gray-400 mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">No favorites yet</h3>
                    <p className="text-sm text-gray-600">
                        Start adding properties to your favorites by clicking the heart icon on any listing.
                    </p>
                </div>
            ) : (
                <>
                    <div className="mb-10">
                        <h2 className="text-xl font-bold text-gray-800 mb-4">
                            Recently Added ({favorites.length})
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {favorites.map(listing => (
                                <FavoriteCard
                                    key={listing.favoriteId || listing.id}
                                    listing={listing}
                                    onRemoveFavorite={handleRemoveFavorite}
                                />
                            ))}
                        </div>
                    </div>

                    {totalPages > 1 && (
                        <div className="flex justify-center items-center gap-2 mt-8">
                            <button
                                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                                disabled={currentPage === 1}
                                className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Previous
                            </button>

                            <span className="text-sm text-gray-600">
                                Page {currentPage} of {totalPages}
                            </span>

                            <button
                                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                                disabled={currentPage === totalPages}
                                className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Next
                            </button>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

const MyFavoritesPage = () => {
    const { user, loading: authLoading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!authLoading && (!user || user.role !== 'renter')) {
            router.push('/');
        }
    }, [user, authLoading, router]);

    if (authLoading) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-orange-500" />
            </div>
        );
    }

    if (!user || user.role !== 'renter') {
        return null;
    }

    return (
        <div className="flex min-h-screen">
            <Sidebar />

            <div className="flex-1 flex flex-col overflow-hidden bg-gray-50">
                <RenterHeader />

                <main className="flex-1 overflow-y-auto">
                    <MyFavoritesContent />
                </main>
            </div>
        </div>
    );
};

export default MyFavoritesPage;