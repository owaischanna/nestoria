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
  MapPin, Bed, Bath, Edit, Trash2, Eye, Loader2, X
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

const HostListingCard = ({ listing, onEdit, onDelete }) => {
  const amenityIcons = {
    Wifi: Wifi, Kitchen: Utensils, Parking: Car,
    Laundry: Shirt, Pets: PawPrint, Garden: Leaf,
  };
  const imageUrl = listing.photos?.cover || 'https://via.placeholder.com/256x256?text=No+Image';
  const status = listing.status || "Available";

  return (
    <div className="flex flex-col sm:flex-row border border-gray-200 rounded-lg overflow-hidden shadow-sm bg-white mb-6">
      <div className="w-full sm:w-64 h-48 flex-shrink-0 bg-gray-100">
        <img src={imageUrl} alt={listing.listingTitle} className="w-full h-full object-cover" />
      </div>
      <div className="flex-1 p-4 sm:p-5 flex flex-col justify-between">
        <div>
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-2 gap-2">
            <h3 className="text-lg sm:text-xl font-bold text-gray-800">{listing.listingTitle}</h3>
            <ListingStatusBadge status={status} />
          </div>
          <p className="text-sm text-gray-500 flex items-center mb-3 sm:mb-4">
            <MapPin className="w-4 h-4 mr-1 text-gray-400" />
            <span className="truncate">{listing.address}, {listing.town}</span>
          </p>
          <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-6 mb-3 sm:mb-4 text-sm text-gray-600 gap-2">
            <span className="font-semibold text-green-700 text-xl sm:text-2xl">€{listing.monthlyRent}/month</span>
            <div className="flex items-center space-x-4">
              <span className="flex items-center space-x-1"><Bed className="w-4 h-4" /> {listing.propertyType}</span>
              <span className="flex items-center space-x-1"><Bath className="w-4 h-4" /> {listing.bathroomType}</span>
              <span>{listing.roomSize} sqft</span>
            </div>
          </div>
          <div className="flex flex-wrap gap-2 mb-3 sm:mb-4">
            {listing.utilities?.slice(0, 5).map((util, index) => {
              const Icon = amenityIcons[util] || Leaf;
              return <ListingAmenity key={index} icon={Icon} label={util} />;
            })}
          </div>
        </div>
        <div className="border-t border-gray-100 pt-3 sm:pt-4 flex justify-end items-center">
          <div className="flex flex-wrap gap-2 sm:flex-nowrap sm:space-x-2 w-full sm:w-auto">
            <button onClick={() => onEdit(listing)} className="flex items-center space-x-1 text-sm font-medium text-gray-700 border border-gray-300 px-3 py-1 rounded hover:bg-gray-50 transition flex-1 sm:flex-none justify-center">
              <Edit className="w-4 h-4" /> <span className="hidden xs:inline">Edit</span>
            </button>
            <button onClick={() => onDelete(listing)} className="flex items-center space-x-1 text-sm font-medium text-red-600 border border-red-300 px-3 py-1 rounded hover:bg-red-50 transition flex-1 sm:flex-none justify-center">
              <Trash2 className="w-4 h-4" /> <span className="hidden xs:inline">Delete</span>
            </button>
            <button className="flex items-center space-x-1 text-sm font-medium text-white bg-green-600 px-3 py-1 rounded hover:bg-green-700 transition flex-1 sm:flex-none justify-center">
              <Eye className="w-4 h-4" /> <span className="hidden xs:inline">View Live</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const EditListingModal = ({ listing, onClose, onSubmit, isSubmitting }) => {
  const [formData, setFormData] = useState({
    listingTitle: listing.listingTitle || '',
    monthlyRent: listing.monthlyRent || 0,
    description: listing.description || '',
  });

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'number' ? Number(value) : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex justify-center items-center p-4">
      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-xl w-full max-w-lg">
        <div className="flex justify-between items-center p-4 border-b">
          <h3 className="text-lg font-semibold text-gray-800">Edit Listing</h3>
          <button type="button" onClick={onClose} className="text-gray-400 hover:text-gray-600"><X className="w-5 h-5" /></button>
        </div>
        <div className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Listing Title</label>
            <input type="text" name="listingTitle" value={formData.listingTitle} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-lg" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Monthly Rent (€)</label>
            <input type="number" name="monthlyRent" value={formData.monthlyRent} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-lg" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea name="description" value={formData.description} onChange={handleChange} rows="4" className="w-full p-2 border border-gray-300 rounded-lg" />
          </div>
        </div>
        <div className="flex justify-end items-center p-4 bg-gray-50 border-t rounded-b-lg space-x-3">
          <button type="button" onClick={onClose} disabled={isSubmitting} className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50">Cancel</button>
          <button type="submit" disabled={isSubmitting} className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 disabled:bg-gray-400 flex items-center">
            {isSubmitting && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
            {isSubmitting ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </form>
    </div>
  );
};

const DeleteConfirmationModal = ({ listing, onClose, onConfirm, isSubmitting }) => (
  <div className="fixed inset-0 bg-black/50 z-50 flex justify-center items-center p-4">
    <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
      <div className="p-6">
        <h3 className="text-lg font-semibold text-gray-800">Confirm Deletion</h3>
        <p className="text-sm text-gray-600 mt-2">Are you sure you want to delete the listing "{listing.listingTitle}"? This action cannot be undone.</p>
      </div>
      <div className="flex justify-end items-center p-4 bg-gray-50 border-t rounded-b-lg space-x-3">
        <button type="button" onClick={onClose} disabled={isSubmitting} className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50">Cancel</button>
        <button type="button" onClick={onConfirm} disabled={isSubmitting} className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 disabled:bg-gray-400 flex items-center">
          {isSubmitting && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
          {isSubmitting ? 'Deleting...' : 'Delete'}
        </button>
      </div>
    </div>
  </div>
);

const MyListingsContent = ({ onAddListing }) => {
  const [listings, setListings] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoadingListings, setIsLoadingListings] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const [editingListing, setEditingListing] = useState(null);
  const [deletingListing, setDeletingListing] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const scrollContainerRef = useRef(null);
  const initialFetchDone = useRef(false);

  const fetchListings = useCallback(async (pageToFetch) => {
    if (isLoadingListings && pageToFetch > 1) return;
    setIsLoadingListings(true);
    const toastId = (pageToFetch === 1 && !initialFetchDone.current) ? toast.loading('Fetching your listings...') : null;

    try {
      const response = await fetch(`/api/listings?page=${pageToFetch}&limit=5`);
      const result = await response.json();
      if (!response.ok) throw new Error(result.message || 'Failed to fetch listings.');

      setListings(prev => pageToFetch === 1 ? result.data : [...prev, ...result.data]);
      setCurrentPage(result.pagination.currentPage);
      setTotalPages(result.pagination.totalPages);
      setHasMore(result.pagination.currentPage < result.pagination.totalPages);

      if (toastId) toast.success('Listings loaded!', { id: toastId });
    } catch (error) {
      if (toastId) toast.error(`Error: ${error.message}`, { id: toastId });
      else toast.error(error.message);
      setHasMore(false);
    } finally {
      setIsLoadingListings(false);
      if (pageToFetch === 1) initialFetchDone.current = true;
    }
  }, [isLoadingListings, hasMore]);

  useEffect(() => {
    if (!initialFetchDone.current) {
      fetchListings(1);
    }
  }, [fetchListings]);

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

  const handleEdit = (listing) => setEditingListing(listing);
  const handleDelete = (listing) => setDeletingListing(listing);
  const handleCloseModals = () => { setEditingListing(null); setDeletingListing(null); };

  const handleUpdateListing = async (updatedData) => {
    if (!editingListing) return;
    setIsSubmitting(true);
    const toastId = toast.loading('Updating listing...');
    try {
      const response = await fetch(`/api/listings/${editingListing._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedData),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.message || 'Failed to update.');

      toast.success('Listing updated!', { id: toastId });
      handleCloseModals();
      fetchListings(1);
    } catch (error) {
      toast.error(error.message, { id: toastId });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleConfirmDelete = async () => {
    if (!deletingListing) return;
    setIsSubmitting(true);
    const toastId = toast.loading('Deleting listing...');
    try {
      const response = await fetch(`/api/listings/${deletingListing._id}`, { method: 'DELETE' });
      const result = await response.json();
      if (!response.ok) throw new Error(result.message || 'Failed to delete.');

      toast.success('Listing deleted.', { id: toastId });
      handleCloseModals();
      setListings(prev => prev.filter(l => l._id !== deletingListing._id)); // Optimistic UI update
    } catch (error) {
      toast.error(error.message, { id: toastId });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div ref={scrollContainerRef} className="p-4 sm:p-8 h-full overflow-y-auto">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 sm:mb-8 gap-4">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">My Listings</h1>
        <button
          className="flex items-center space-x-2 text-sm font-semibold text-white bg-green-600 px-4 py-2 rounded shadow-md hover:bg-green-700 transition w-full sm:w-auto justify-center"
          onClick={onAddListing}
        >
          <Plus className="w-4 h-4" />
          <span>Add New Listing</span>
        </button>
      </div>
      <div className="flex justify-between items-center mb-4 sm:mb-6 border-b border-gray-200 pb-3 sm:pb-4">
        <div className="flex items-center space-x-4 sm:space-x-6 text-sm text-gray-600">
          <span><span className="font-bold text-lg text-gray-800">{listings.length}</span> Displayed Listings</span>
        </div>
      </div>
      <div className="space-y-4 sm:space-y-6">
        {listings.length > 0 ? (
          listings.map((listing) => (
            <HostListingCard
              key={listing._id}
              listing={listing}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))
        ) : (
          !isLoadingListings && <p className="text-center text-gray-500 py-8 sm:py-10">No listings found. Add your first one!</p>
        )}
      </div>
      {isLoadingListings && (<div className="flex justify-center py-6"><Loader2 className="w-6 h-6 text-green-600 animate-spin" /></div>)}
      {!hasMore && listings.length > 0 && (<p className="text-center text-gray-500 py-6">You've reached the end of your listings.</p>)}

      {editingListing && (
        <EditListingModal
          listing={editingListing}
          onClose={handleCloseModals}
          onSubmit={handleUpdateListing}
          isSubmitting={isSubmitting}
        />
      )}
      {deletingListing && (
        <DeleteConfirmationModal
          listing={deletingListing}
          onClose={handleCloseModals}
          onConfirm={handleConfirmDelete}
          isSubmitting={isSubmitting}
        />
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