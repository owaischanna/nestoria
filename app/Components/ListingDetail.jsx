"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation'; // Import useRouter if needed for other actions
import toast from 'react-hot-toast';
import { ArrowLeft, Heart, MapPin, Wifi, Car, Users, Dog, Loader2, Star } from 'lucide-react'; // Added Loader2, Star
import { useAuth } from '../context/AuthContext'; // Import useAuth if needed for actions like apply/message later

// Helper to get initials
const getInitials = (firstName, lastName) => {
  if (!firstName) return '?';
  const first = firstName.charAt(0);
  const last = lastName ? lastName.charAt(0) : '';
  return `${first}${last}`.toUpperCase();
};

const ListingDetail = ({ listingId, onBack, onApply, onMessageHost }) => { // Accept listingId instead of the full object initially
  const [listingData, setListingData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter(); // Initialize router if needed

  useEffect(() => {
    if (!listingId) {
      setError("No listing ID provided.");
      setIsLoading(false);
      return;
    }

    const fetchListingDetails = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch(`/api/listings/${listingId}`);
        const result = await response.json();
        if (!response.ok) {
          throw new Error(result.message || 'Failed to fetch listing details.');
        }
        setListingData(result.data);
      } catch (err) {
        setError(err.message);
        toast.error(`Error loading listing: ${err.message}`);
      } finally {
        setIsLoading(false);
      }
    };

    fetchListingDetails();
  }, [listingId]); // Re-fetch if listingId changes

  // Loading State
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[calc(100vh-100px)]">
        <Loader2 className="w-12 h-12 animate-spin text-gray-400" />
      </div>
    );
  }

  // Error State
  if (error) {
    return (
      <div className="flex flex-col justify-center items-center h-[calc(100vh-100px)] text-center px-6">
        <p className="text-red-600 font-semibold mb-4">Failed to load listing details.</p>
        <p className="text-gray-500 mb-6">{error}</p>
        <button onClick={onBack} className="flex items-center text-sm font-semibold bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition"> <ArrowLeft className="w-4 h-4 mr-1" /> Go Back </button>
      </div>
    );
  }

  // No Data State (after fetch attempt)
  if (!listingData) {
    return (
      <div className="flex flex-col justify-center items-center h-[calc(100vh-100px)] text-center px-6">
        <p className="text-gray-500 mb-6">Listing data could not be found.</p>
        <button onClick={onBack} className="flex items-center text-sm font-semibold bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition"> <ArrowLeft className="w-4 h-4 mr-1" /> Go Back </button>
      </div>
    );
  }

  // --- Data Extraction ---
  const {
    listingTitle, address, town, state, zip, photos, monthlyRent,
    description, utilities, propertyType, bathroomType, roomSize, hostId: hostData
  } = listingData;

  const coverImage = photos?.cover || 'https://via.placeholder.com/800x400?text=Listing+Image';
  const additionalImages = [...(photos?.room || []), ...(photos?.common || [])].slice(0, 4); // Get up to 4 additional images

  return (
    <div className="w-full py-6 pl-0 pr-6 ml-6 overflow-y-auto">
      <div className="flex items-center justify-between mb-6">
        <button onClick={onBack} className="flex items-center text-gray-600 hover:text-gray-800 transition-colors">
          <ArrowLeft className="w-5 h-5 mr-2" />
          <span className="font-medium">Back</span>
        </button>
        <button className="flex items-center text-gray-400 hover:text-red-500 transition-colors">
          <Heart className="w-5 h-5 mr-6" />
        </button>
      </div>

      <div className="flex justify-between items-start mb-4 mr-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{listingTitle}</h1>
          <div className="flex items-center text-gray-600 mt-1">
            <MapPin className="w-4 h-4 mr-1" />
            <span>{address}, {town}, {state} {zip}</span>
          </div>
        </div>
        <div className="text-right flex-shrink-0 ml-4">
          <h2 className="text-3xl font-bold text-green-700">€{monthlyRent}</h2>
          <p className="text-gray-600">per month</p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6 mb-8 mr-6">
        <div className="col-span-2">
          <div className="rounded-xl overflow-hidden shadow-md border border-gray-200">
            <img src={coverImage} alt={listingTitle} className="w-full h-[400px] object-cover bg-gray-200" />
          </div>
          {additionalImages.length > 0 && (
            <div className="grid grid-cols-4 gap-3 mt-3">
              {additionalImages.map((imgSrc, index) => (
                <div key={index} className="rounded-lg overflow-hidden border border-gray-200 aspect-square bg-gray-100">
                  <img src={imgSrc} alt={`${listingTitle}-thumb-${index + 1}`} className="w-full h-full object-cover hover:opacity-90 transition" />
                </div>
              ))}
              {/* Placeholder if fewer than 4 images */}
              {[...Array(Math.max(0, 4 - additionalImages.length))].map((_, i) => <div key={`placeholder-${i}`} className="rounded-lg bg-gray-100 border border-gray-200 aspect-square"></div>)}
            </div>
          )}
        </div>

        <div className="col-span-1">
          <div className="border rounded-lg p-5 shadow-sm bg-white">
            <h3 className="font-semibold text-gray-900 mb-3">Your Host</h3>
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center mr-3 text-gray-600 font-semibold">
                {getInitials(hostData?.firstName, hostData?.lastName)}
              </div>
              <div>
                <p className="font-semibold">{hostData?.firstName} {hostData?.lastName}</p>
                <p className="text-xs text-gray-500">Host since {hostData?.createdAt ? new Date(hostData.createdAt).getFullYear() : 'N/A'}</p>
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <button onClick={() => onMessageHost(hostData?._id)} className="bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition">Contact Host</button>
              <button onClick={onApply} className="bg-orange-500 text-white py-3 rounded-lg font-semibold hover:bg-orange-600 transition">Apply Now</button>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-8 mr-6">
        <div className="col-span-2">
          <div className="flex flex-wrap gap-3 mb-6">
            {/* Tags could be dynamic based on listing data */}
            <span className="px-4 py-2 rounded-lg border bg-gray-100 text-gray-700 font-medium text-sm">Bedroom</span>
            <span className="px-4 py-2 rounded-lg border bg-gray-100 text-gray-700 font-medium text-sm">Kitchen</span>
            <span className="px-4 py-2 rounded-lg border bg-gray-100 text-gray-700 font-medium text-sm">Bathroom</span>
            {/* Add more tags dynamically */}
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">About this place</h2>
            <p className="text-gray-700 leading-relaxed">{description || 'No description provided.'}</p>
          </div>
          <div className="mt-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Amenities</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-sm text-gray-700">
              {utilities?.map((util, i) => ( // Display amenities from API
                <div key={i} className="flex items-center">
                  {util.toLowerCase().includes('wifi') && <Wifi className="w-4 h-4 mr-2 text-green-600" />}
                  {util.toLowerCase().includes('parking') && <Car className="w-4 h-4 mr-2 text-green-600" />}
                  {util.toLowerCase().includes('laundry') && <Users className="w-4 h-4 mr-2 text-green-600" />}
                  {/* Add more icons based on utility names */}
                  {util}
                </div>
              ))}
              {(!utilities || utilities.length === 0) && <p className="text-gray-500 col-span-full">No specific amenities listed.</p>}
            </div>
          </div>
        </div>
        {/* Optional Right Side Column for extra details/map */}
        {/* <div className="col-span-1"></div> */}
      </div>
    </div>
  );
};

export default ListingDetail;