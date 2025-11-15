"use client";

import { Heart, MapPin, Bed, Bath, LayoutGrid, ArrowDown, Loader2, ArrowLeft } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast'; // Added toast import
import RenterHeader from './RenterHeader';
import Sidebar from './RenterSidebar';
import MultiStepApplicationForm from './MultiStepApplicationForm';

// Updated PropertyCard to handle favorite logic
const PropertyCard = ({ property, onApplyClick, isFavorited, onToggleFavorite }) => {
  const { title, location, price, petFee, currency, features, tags, imageSrc, id } = property; // Added 'id'
  const [isTogglingFavorite, setIsTogglingFavorite] = useState(false);

  const featureIcons = {
    "Room": <Bed size={16} />,
    "Bath": <Bath size={16} />,
    "sqft": <LayoutGrid size={16} />,
  };

  const tagColors = {
    "Dogs Welcome": "bg-yellow-600 text-white",
    "Cats Welcome": "bg-orange-600 text-white",
    "Pet Friendly": "bg-green-600 text-white",
    "Pets Allowed": "bg-green-600 text-white",
  };

  // Added favorite click handler
  const handleFavoriteClick = async (e) => {
    e.stopPropagation();
    if (isTogglingFavorite) return;
    setIsTogglingFavorite(true);
    try {
      await onToggleFavorite(id);
    } finally {
      setIsTogglingFavorite(false);
    }
  };

  return (
    <div className="flex flex-col md:flex-row border border-gray-200 rounded-xl shadow-sm overflow-hidden bg-white p-4 md:p-6 transition-shadow hover:shadow-lg">

      <div className="relative w-full md:w-[240px] h-48 md:h-48 rounded-lg overflow-hidden mb-4 md:mb-0 md:mr-6 flex-shrink-0">
        <img
          src={imageSrc || "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=240&q=80"}
          alt={title}
          className="w-full h-full object-cover"
        />
        <span className="absolute top-2 left-2 flex items-center bg-green-500 text-white px-2 py-0.5 rounded-full text-xs font-medium shadow-md">
          <span role="img" aria-label="paw" className="mr-1">🐾</span>
          Pet Friendly
        </span>
        {/* Updated favorite button */}
        <button
          onClick={handleFavoriteClick}
          disabled={isTogglingFavorite}
          className="absolute top-2 right-2 p-1 bg-white rounded-full shadow-md hover:scale-105 transition disabled:opacity-50"
          aria-label={isFavorited ? "Remove from favorites" : "Add to favorites"}
        >
          <Heart
            size={18}
            className={isFavorited ? "text-red-500 fill-red-500" : "text-gray-500 fill-gray-100"}
          />
        </button>
      </div>

      <div className="flex-grow flex flex-col justify-between py-1">
        <div>
          <h2 className="text-lg md:text-xl font-semibold text-gray-900 mb-1">{title}</h2>
          <div className="flex items-center text-sm text-gray-500 mb-3">
            <MapPin size={16} className="mr-1 text-gray-400" />
            {location}
          </div>

          <div className="flex flex-wrap gap-x-3 md:gap-x-4 gap-y-1 text-xs md:text-sm text-gray-600 mb-3 md:mb-4">
            {features.map((feature, index) => {
              const icon = feature.includes('sqft') ? featureIcons['sqft'] :
                feature.includes('Bath') ? featureIcons['Bath'] :
                  feature.includes('Room') ? featureIcons['Room'] : null;
              return (
                <span key={index} className="flex items-center">
                  {icon || <span className="mr-1">•</span>}
                  {feature}
                </span>
              );
            })}
          </div>

          <div className="flex flex-wrap gap-1 md:gap-2 mb-3 md:mb-4">
            {tags.map((tag, index) => (
              <span key={index}
                className={`inline-flex items-center px-2 py-0.5 md:px-2.5 md:py-0.5 rounded text-xs font-medium ${tagColors[tag] || 'bg-gray-100 text-gray-800'}`}>
                {tag}
              </span>
            ))}
          </div>
        </div>

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

      <div className="w-full md:w-1/6 flex justify-start md:justify-end text-left md:text-right pt-3 md:pt-1 flex-shrink-0 mt-3 md:mt-0 border-t md:border-t-0 border-gray-200 md:border-none pt-3 md:pt-0">
        <div className="text-lg md:text-xl font-bold text-gray-700">
          <span className="text-xl md:text-2xl">{currency}{price}</span>
          <span className="text-sm md:text-base font-normal text-gray-500 ml-1">/month</span>
          {petFee && <p className="text-xs text-gray-500 mt-1">Pet fee: €{petFee}/month</p>}
        </div>
      </div>
    </div>
  );
};

const PetFriendlyProperties = () => {
  const { user: authUser, loading: authLoading } = useAuth();
  const router = useRouter();

  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showApplicationForm, setShowApplicationForm] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [totalProperties, setTotalProperties] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [sortBy, setSortBy] = useState('bestMatch');
  const [favoriteStatus, setFavoriteStatus] = useState({}); // Added favorite state

  const fetchProperties = async () => {
    if (!authUser) return;

    setLoading(true);
    setError(null);

    try {
      const params = new URLSearchParams({
        sortBy,
        page: currentPage.toString(),
        limit: '10'
      });

      console.log('🐾 Fetching pet-friendly properties...');
      const response = await fetch(`/api/listings/pet-friendly?${params}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include'
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to fetch properties');
      }

      const data = await response.json();
      console.log('✅ Received', data.properties.length, 'pet-friendly properties');

      if (data.success) {
        setProperties(data.properties);
        setTotalProperties(data.totalProperties);
        setTotalPages(data.totalPages);
        checkFavoriteStatus(data.properties.map(p => p.id)); // Check favorites
      } else {
        throw new Error(data.message || 'Failed to load properties');
      }
    } catch (err) {
      setError(err.message);
      console.error('❌ Error fetching properties:', err);
    } finally {
      setLoading(false);
    }
  };

  // Added function to check favorite status
  const checkFavoriteStatus = async (listingIds) => {
    if (!listingIds || listingIds.length === 0) return;

    try {
      console.log('🔍 Checking favorite status for', listingIds.length, 'listings');

      const response = await fetch('/api/favorites/check', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({ listingIds })
      });

      if (response.ok) {
        const data = await response.json();
        setFavoriteStatus(data.favorites);
        console.log('✅ Favorite status checked:', data.count, 'favorited');
      }
    } catch (error) {
      console.error('❌ Error checking favorites:', error);
    }
  };

  // Added function to toggle favorite
  const handleToggleFavorite = async (listingId) => {
    try {
      console.log('❤️ Toggling favorite for listing:', listingId);

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
        setFavoriteStatus(prev => ({
          ...prev,
          [listingId]: data.isFavorited
        }));

        toast.success(data.message);
        console.log('✅', data.action, 'favorite');
      } else {
        toast.error(data.message || 'Failed to update favorites');
      }
    } catch (error) {
      console.error('❌ Error toggling favorite:', error);
      toast.error('Failed to update favorites');
    }
  };

  useEffect(() => {
    if (!authLoading && (!authUser || authUser.role !== 'renter')) {
      router.push('/');
      return;
    }
    if (authUser) {
      fetchProperties();
    }
  }, [authUser, authLoading, router, sortBy, currentPage]);

  const handleApplyClick = (property) => {
    console.log('📝 Apply clicked for:', property.title);
    setSelectedProperty(property);
    setShowApplicationForm(true);
  };

  const handleCloseForm = () => {
    console.log('❌ Closing application form');
    setShowApplicationForm(false);
    setSelectedProperty(null);
  };

  const handleSortChange = (e) => {
    const value = e.target.value;
    console.log('🔄 Changing sort to:', value);
    const sortMap = {
      'Best Match': 'bestMatch',
      'PriceLow': 'priceLow',
      'PriceHigh': 'priceHigh',
      'Newest': 'newest'
    };
    setSortBy(sortMap[value] || 'bestMatch');
    setCurrentPage(1);
  };

  if (showApplicationForm && selectedProperty) {
    return (
      <div className="flex min-h-screen bg-gray-50">
        <Sidebar />
        <div className="flex-1 flex flex-col">
          <RenterHeader />
          <div className="flex-1 overflow-y-auto bg-gray-50">
            <div className="h-full">
              <div className="p-4 sm:p-6 bg-white border-b border-gray-200 flex items-center sticky top-0 z-10">
                <button
                  onClick={handleCloseForm}
                  className="flex items-center text-gray-600 hover:text-gray-800 mr-4 transition-colors"
                >
                  <ArrowLeft className="w-5 h-5 mr-2" />
                  <span className="text-sm font-medium">Back to Listings</span>
                </button>
                <h2 className="text-lg sm:text-xl font-semibold text-gray-800">
                  Apply for {selectedProperty.title}
                </h2>
              </div>
              <MultiStepApplicationForm
                property={selectedProperty}
                listing={selectedProperty}
                onClose={handleCloseForm}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (authLoading) {
    return (
      <div className="flex min-h-screen bg-gray-50">
        <Sidebar />
        <div className="flex-1 flex flex-col">
          <RenterHeader />
          <main className="flex-1 flex items-center justify-center">
            <Loader2 className="w-8 h-8 animate-spin text-orange-500" />
          </main>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <RenterHeader />

        <div className="flex-1 p-4 md:p-6 lg:p-8 xl:p-10 overflow-y-auto bg-gray-50">

          <div className="mb-4 md:mb-6 p-4 md:p-6 rounded-xl shadow-lg border border-gray-100 bg-white">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Pet-Friendly Properties</h1>
            <p className="text-xs md:text-sm text-gray-600 mb-3 md:mb-4">
              {totalProperties} {totalProperties === 1 ? 'property' : 'properties'} found
            </p>

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-t pt-3 md:pt-4 gap-2">
              <div className="flex items-center text-xs md:text-sm font-medium text-orange-600">
                <span className="mr-1 md:mr-2">🐾</span>
                Showing pet-friendly apartments
              </div>

              <div className="relative inline-block text-left">
                <select
                  className="py-1.5 md:py-2 pl-2 md:pl-3 pr-6 md:pr-8 text-xs md:text-sm border border-gray-300 rounded-md bg-white text-gray-700 appearance-none focus:outline-none focus:ring-1 focus:ring-orange-500 cursor-pointer w-full sm:w-auto"
                  defaultValue="Best Match"
                  onChange={handleSortChange}
                >
                  <option value="Best Match">Best Match</option>
                  <option value="PriceLow">Price (Low to High)</option>
                  <option value="PriceHigh">Price (High to Low)</option>
                  <option value="Newest">Newest</option>
                </select>
                <ArrowDown
                  size={14}
                  className="absolute right-1.5 md:right-2 top-1/2 -translate-y-1/C/Users/Arslan/AppData/Local/Temp/babel-20241015-18456-1qf0i0a.7h6r/PetFriendlyProperties.js 2 text-gray-400 pointer-events-none"
                />
              </div>
            </div>
          </div>

          {loading && (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
            </div>
          )}

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
              <p className="text-red-800 text-sm">{error}</p>
              <button
                onClick={fetchProperties}
                className="mt-2 text-xs text-red-600 hover:text-red-800 underline"
              >
                Try again
              </button>
            </div>
          )}

          {!loading && !error && properties.length === 0 && (
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 text-center">
              <span className="text-6xl mb-4 block">🐾</span>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No pet-friendly properties found</h3>
              <p className="text-sm text-gray-600">
                Check back later for new pet-friendly listings.
              </p>
            </div>
          )}

          {!loading && !error && properties.length > 0 && (
            <>
              <div className="space-y-4 md:space-y-6">
                {properties.map((property) => (
                  // Updated PropertyCard call
                  <PropertyCard
                    key={property.id}
                    property={property}
                    onApplyClick={handleApplyClick}
                    isFavorited={favoriteStatus[property.id] || false}
                    onToggleFavorite={handleToggleFavorite}
                  />
                ))}
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
      </div>
    </div>
  );
};

export default PetFriendlyProperties;