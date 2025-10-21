"use client";

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from "../context/AuthContext";
import toast from 'react-hot-toast';
import HostSidebar from "@/app/Components/HostSidebar";
import HostHeader from "./HostHeader";
import AddListingFormContainer from "./AddListing";
import {
  Plus, Wifi, Utensils, Car, Shirt, PawPrint, Leaf,
  MapPin, Bed, Bath, Edit, Trash2, Eye, Loader2
} from "lucide-react";

const ListingAmenity = ({ icon: Icon, label }) => (
  <div className="flex items-center text-xs text-gray-600 bg-gray-100 px-2 py-1 rounded-full space-x-1">
    <Icon className="w-3 h-3 text-green-700" />
    <span>{label}</span>
  </div>
);

const ListingStatusBadge = ({ status }) => {
  const color = status === "Available" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700";
  return <span className={`text-xs font-semibold px-3 py-1 rounded-full ${color}`}>{status}</span>;
};

const HostListingCard = ({ listing }) => {
  const amenityIcons = {
    Wifi: Wifi,
    Kitchen: Utensils,
    Parking: Car,
    Laundry: Shirt,
    Pets: PawPrint,
    Garden: Leaf,
  };

  const imageUrl = listing.photos?.cover || 'https://via.placeholder.com/256x256?text=No+Image';
  const status = listing.status || "Available";

  return (
    <div className="flex border border-gray-200 rounded-lg overflow-hidden shadow-sm bg-white mb-6">
      <div className="w-64 h-48 flex-shrink-0 bg-gray-100">
        <img
          src={imageUrl}
          alt={listing.listingTitle}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex-1 p-5 flex flex-col justify-between">
        <div>
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-xl font-bold text-gray-800">{listing.listingTitle}</h3>
            <ListingStatusBadge status={status} />
          </div>
          <p className="text-sm text-gray-500 flex items-center mb-4">
            <MapPin className="w-4 h-4 mr-1 text-gray-400" />
            {listing.address}, {listing.town}, {listing.state} {listing.zip}
          </p>
          <div className="flex items-center space-x-6 mb-4 text-sm text-gray-600">
            <span className="font-semibold text-green-700 text-2xl">
              €{listing.monthlyRent}/month
            </span>
            <span className="flex items-center space-x-1">
              <Bed className="w-4 h-4" /> {listing.propertyType}
            </span>
            <span className="flex items-center space-x-1">
              <Bath className="w-4 h-4" /> {listing.bathroomType}
            </span>
            <span>{listing.roomSize} sqft</span>
          </div>
          <div className="flex flex-wrap gap-2 mb-4">
            {listing.utilities?.slice(0, 5).map((util, index) => {
              const Icon = amenityIcons[util] || Leaf;
              return <ListingAmenity key={index} icon={Icon} label={util} />;
            })}
          </div>
        </div>
        <div className="border-t border-gray-100 pt-4 flex justify-end items-center">
          <div className="flex space-x-2">
            <button className="flex items-center space-x-1 text-sm font-medium text-gray-700 border border-gray-300 px-3 py-1 rounded hover:bg-gray-50 transition">
              <Edit className="w-4 h-4" /> Edit
            </button>
            <button className="flex items-center space-x-1 text-sm font-medium text-red-600 border border-red-300 px-3 py-1 rounded hover:bg-red-50 transition">
              <Trash2 className="w-4 h-4" /> Delete
            </button>
            <button className="flex items-center space-x-1 text-sm font-medium text-white bg-green-600 px-3 py-1 rounded hover:bg-green-700 transition">
              <Eye className="w-4 h-4" /> View Live
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const MyListingsContent = ({ onAddListing }) => {
  const [listings, setListings] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoadingListings, setIsLoadingListings] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const scrollContainerRef = useRef(null);
  const welcomeToastShown = useRef(false);

  const fetchListings = useCallback(async (pageToFetch) => {
    if (isLoadingListings || !hasMore) return;

    setIsLoadingListings(true);
    if (pageToFetch === 1) {
      toast.loading('Fetching your listings...', { id: 'fetch-listings' });
    }

    try {
      const response = await fetch(`/api/listings?page=${pageToFetch}&limit=5`);
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Failed to fetch listings.');
      }

      setListings(prev => pageToFetch === 1 ? result.data : [...prev, ...result.data]);
      setCurrentPage(result.pagination.currentPage);
      setTotalPages(result.pagination.totalPages);
      setHasMore(result.pagination.currentPage < result.pagination.totalPages);

      if (pageToFetch === 1) {
        toast.success('Listings loaded!', { id: 'fetch-listings' });
        // if (!welcomeToastShown.current) {
        //   toast('Welcome back!', { icon: '👋' }); // Re-added welcome toast as per user request
        //   welcomeToastShown.current = true;
        // }
      }

    } catch (error) {
      toast.error(`Error fetching listings: ${error.message}`, { id: 'fetch-listings' });
      setHasMore(false);
    } finally {
      setIsLoadingListings(false);
    }
  }, [isLoadingListings, hasMore]);

  useEffect(() => {
    fetchListings(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = container;
      if (scrollHeight - scrollTop - clientHeight < 200 && !isLoadingListings && hasMore) {
        fetchListings(currentPage + 1);
      }
    };

    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, [isLoadingListings, hasMore, currentPage, fetchListings]);

  return (
    <div ref={scrollContainerRef} className="p-8 h-full overflow-y-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">My Listings</h1>
        <button
          className="flex items-center space-x-2 text-sm font-semibold text-white bg-green-600 px-4 py-2 rounded shadow-md hover:bg-green-700 transition"
          onClick={onAddListing}
        >
          <Plus className="w-4 h-4" />
          <span>Add New Listing</span>
        </button>
      </div>

      <div className="flex justify-between items-center mb-6 border-b border-gray-200 pb-4">
        <div className="flex items-center space-x-6 text-sm text-gray-600">
          <span><span className="font-bold text-lg text-gray-800">{listings.length}</span> Displayed Listings</span>
        </div>
      </div>

      <div className="space-y-6">
        {listings.length > 0 ? (
          listings.map((listing) => (
            <HostListingCard key={listing._id} listing={listing} />
          ))
        ) : (
          !isLoadingListings && <p className="text-center text-gray-500 py-10">No listings found. Add your first one!</p>
        )}
      </div>

      {isLoadingListings && (
        <div className="flex justify-center py-6">
          <Loader2 className="w-6 h-6 text-green-600 animate-spin" />
        </div>
      )}

      {!hasMore && listings.length > 0 && (
        <p className="text-center text-gray-500 py-6">You've reached the end of your listings.</p>
      )}
    </div>
  );
};

export default function HostListingsPage() {
  const [mode, setMode] = useState("list");
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && (!user || user.role !== 'host')) {
      router.push('/');
    }
  }, [user, loading, router]);

  const handleAddListing = () => setMode("add");
  const handleCancelOrSuccess = () => setMode("list");

  if (loading || !user || user.role !== 'host') {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-gray-50">
        <p className="text-lg font-semibold text-gray-700">Loading...</p>
      </div>
    );
  }

  const pageContent =
    mode === "list" ? (
      <MyListingsContent onAddListing={handleAddListing} />
    ) : (
      <AddListingFormContainer
        onCancel={handleCancelOrSuccess}
        onSuccess={handleCancelOrSuccess}
      />
    );

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      <HostSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <HostHeader />
        <div className="flex-1 overflow-y-auto">
          {pageContent}
        </div>
      </div>
    </div>
  );
}