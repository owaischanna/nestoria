"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../context/AuthContext";
import toast from 'react-hot-toast';
import {
  Menu, Search, Heart, Bell, User, MapPin, DollarSign,
  FileText, Briefcase, ChevronRight, LogOut, Loader2
} from "lucide-react";
import ApplicationFormContainer from "./ApplicationForm";

const Header = () => {
  const { user: authUser, logout } = useAuth();
  const [userData, setUserData] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true);

  useEffect(() => {
    const fetchUserDetails = async () => {
      if (!authUser) return;
      setLoadingUser(true);
      try {
        const response = await fetch('/api/user/me');
        if (!response.ok) throw new Error('Failed to fetch user details');
        const result = await response.json();
        setUserData(result.data);
      } catch (error) {
        console.error("Error fetching user details:", error);
      } finally {
        setLoadingUser(false);
      }
    };
    fetchUserDetails();
  }, [authUser]);

  const getInitials = (firstName, lastName) => {
    if (!firstName) return '...';
    const firstInitial = firstName.charAt(0);
    const lastInitial = lastName ? lastName.charAt(0) : '';
    return `${firstInitial}${lastInitial}`.toUpperCase();
  };

  const isLoading = loadingUser || !userData;
  const userInitials = isLoading ? '...' : getInitials(userData?.firstName, userData?.lastName);
  const userName = isLoading ? 'Loading...' : `${userData?.firstName} ${userData?.lastName}`;
  const userEmail = isLoading ? '...' : userData?.email;

  return (
    <header className="flex items-center justify-between p-4 h-16 border-b border-gray-200 bg-white">
      <div className="flex items-center space-x-2">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0HFWiXvgfpFSXkpGQHyGt2iHrEiBRvM_T-A&s"
          alt="Nestoria Logo"
          className="h-7 w-auto"
        />
        <span className="text-xl font-bold text-green-700">Nestoria</span>
      </div>
      <div className="flex-1 max-w-xl mx-8">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search listings..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-1 focus:ring-green-500 text-sm"
          />
        </div>
      </div>
      <div className="flex items-center space-x-5">
        <Heart className="h-6 w-6 text-gray-500 hover:text-red-500 cursor-pointer transition-colors" />
        <div className="relative">
          <Bell className="h-6 w-6 text-gray-500 hover:text-green-600 cursor-pointer transition-colors" />
          <span className="absolute -top-1 -right-1 block h-2.5 w-2.5 rounded-full ring-2 ring-white bg-red-500"></span>
        </div>
        <div className="flex items-center space-x-2 cursor-pointer p-1 pr-3 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors">
          <div className={`bg-orange-500 text-white rounded-full h-8 w-8 flex items-center justify-center text-sm font-semibold`}>
            {userInitials}
          </div>
          <div className="text-sm leading-tight hidden xl:block">
            <p className="font-semibold text-gray-800 truncate">{userName}</p>
            <p className="text-gray-500 text-xs truncate">{userEmail}</p>
          </div>
        </div>
        <button onClick={logout} title="Logout" className="p-2 rounded-full text-gray-500 hover:bg-gray-100 hover:text-gray-700 transition-colors">
          <LogOut className="h-5 w-5" />
        </button>
      </div>
    </header>
  );
};

const iconsMap = { FileText, Heart, DollarSign, Briefcase };
const StatCard = ({ iconName, title, value, subtext, colorClass }) => {
  const Icon = iconsMap[iconName];
  return (
    <div className={`p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col justify-between bg-white ${colorClass || "border-l-4 border-gray-300"}`}>
      <div className="flex justify-between items-start mb-2">
        <h4 className="text-xs font-semibold text-gray-500 uppercase">{title}</h4>
        {Icon && <Icon className="h-5 w-5 text-gray-400" />}
      </div>
      <p className="text-2xl font-bold text-gray-800">{value}</p>
      {subtext && <p className="text-xs text-gray-500 mt-1">{subtext}</p>}
    </div>
  );
};

const ListingBadge = ({ text, type }) => {
  let color = "bg-gray-100 text-gray-700";
  if (type === "student") color = "bg-yellow-100 text-yellow-700";
  if (type === "female") color = "bg-pink-100 text-pink-700";
  if (type === "available") color = "bg-green-100 text-green-700";
  return <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${color}`}>{text}</span>;
};

const ListingCard = ({ listing, onApply, onMessage }) => (
  <div className="flex border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition duration-300 bg-white">
    <div className="w-48 flex-shrink-0 bg-gray-100">
      <img src={listing.photos?.cover || 'https://via.placeholder.com/192x192?text=No+Image'} alt={listing.listingTitle} className="w-full h-full object-cover" />
    </div>
    <div className="flex-1 p-4 flex justify-between">
      <div>
        <h5 className="text-lg font-semibold text-gray-800">{listing.listingTitle}</h5>
        <p className="text-sm text-gray-500 flex items-center mb-2">
          <MapPin className="h-3 w-3 mr-1" />
          {listing.address}, {listing.town}
        </p>
        <p className="text-sm text-gray-600 mb-3 line-clamp-2">{listing.description}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          <ListingBadge text="Student Friendly" type="student" />
          <ListingBadge text="Available Now" type="available" />
        </div>
        <div className="flex space-x-3">
          <button
            onClick={() => onMessage(listing.hostId._id || listing.hostId)}
            className="text-sm font-medium text-green-700 border border-green-700 px-3 py-1 rounded hover:bg-green-50 transition"
          >
            Message
          </button>
          <button onClick={onApply} className="text-sm font-medium text-white bg-amber-600 px-3 py-1 rounded hover:bg-amber-700 transition">
            Apply
          </button>
        </div>
      </div>
      <div className="text-right">
        <p className="text-xl font-bold text-green-700">
          €{listing.monthlyRent}
          <span className="text-sm font-normal text-gray-500">/month</span>
        </p>
        <Heart className="h-5 w-5 text-gray-400 mt-2 hover:text-red-500 cursor-pointer" />
      </div>
    </div>
  </div>
);

const DashboardContent = ({ onApply }) => {
  const { user } = useAuth();
  const router = useRouter();
  const [listings, setListings] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isInitiatingChat, setIsInitiatingChat] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const scrollContainerRef = useRef(null);
  const welcomeToastShown = useRef(false);

  const fetchListings = useCallback(async (pageToFetch) => {
    if (isLoading || !hasMore) return;
    setIsLoading(true);
    const toastId = pageToFetch === 1 ? toast.loading('Finding recommendations...') : null;

    try {
      const response = await fetch(`/api/listings/all?page=${pageToFetch}&limit=5`);
      const result = await response.json();
      if (!response.ok) throw new Error(result.message || 'Failed to fetch listings.');

      setListings(prev => pageToFetch === 1 ? result.data : [...prev, ...result.data]);
      setCurrentPage(result.pagination.currentPage);
      setHasMore(result.pagination.currentPage < result.pagination.totalPages);

      if (pageToFetch === 1) {
        toast.success('Recommendations loaded!', { id: toastId });
        // if (!welcomeToastShown.current && user?.firstName) {
        //   toast(`Welcome back, ${user.firstName}!`, { icon: '👋' });
        //   welcomeToastShown.current = true;
        // }
      } else if (toastId) {
        toast.dismiss(toastId); // Dismiss loading if it wasn't the first page but had a toast ID somehow
      }
    } catch (error) {
      toast.error(error.message, { id: toastId || 'fetch-listings-error' });
      setHasMore(false);
    } finally {
      setIsLoading(false);
    }
  }, [isLoading, hasMore, user?.firstName]); // Removed user dependency as it's stable within context

  const handleInitiateChat = async (hostId) => {
    console.log("handleInitiateChat called with hostId:", hostId); // <-- Add this log

    if (!hostId) {
      toast.error("Host ID is missing for this listing."); // <-- Add validation
      return;
    }

    if (isInitiatingChat) {
      console.log("Chat initiation already in progress."); // <-- Add this log
      return;
    }

    setIsInitiatingChat(true);
    const toastId = toast.loading('Opening chat...');
    console.log("Attempting to call API..."); // <-- Add this log

    try {
      const response = await fetch('/api/conversations/initiate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ hostId }),
      });

      console.log("API Response Status:", response.status); // <-- Add this log
      const result = await response.json();
      console.log("API Response Body:", result); // <-- Add this log

      if (!response.ok) {
        throw new Error(result.message || 'Failed to initiate chat.');
      }

      toast.success('Redirecting to chat...', { id: toastId });
      console.log("Redirecting to:", `/rentermessage?id=${result.conversationId}`); // <-- Add this log
      router.push(`/rentermessage?id=${result.conversationId}`);

    } catch (error) {
      console.error("Error initiating chat:", error); // <-- Add detailed error log
      toast.error(`Error: ${error.message}`, { id: toastId });
    } finally {
      setIsInitiatingChat(false);
    }
  };
  useEffect(() => {
    if (user) {
      fetchListings(1);
    }
  }, [user, fetchListings]); // Ensure fetchListings is stable or included correctly

  useEffect(() => {
    const container = scrollContainerRef.current;
    const handleScroll = () => {
      if (container && container.scrollHeight - container.scrollTop - container.clientHeight < 200 && !isLoading && hasMore) {
        fetchListings(currentPage + 1);
      }
    };
    container?.addEventListener('scroll', handleScroll);
    return () => container?.removeEventListener('scroll', handleScroll);
  }, [isLoading, hasMore, currentPage, fetchListings]);

  return (
    <main ref={scrollContainerRef} className="flex-1 p-8 bg-gray-50 overflow-y-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Welcome, {user?.firstName}!</h1>
          <p className="text-gray-600 mt-1">Let's find your perfect home away from home</p>
        </div>
        <div className="flex items-center space-x-2 bg-white border border-yellow-400 text-yellow-700 p-2 rounded-full text-sm font-medium shadow-sm cursor-pointer hover:bg-yellow-50">
          <User className="w-4 h-4" />
          <span>Profile **90% Complete**</span>
          <ChevronRight className="w-4 h-4" />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <StatCard iconName="FileText" title="Active Applications" value={<>3</>} subtext="2 pending responses" colorClass="border-l-4 border-blue-500" />
        <StatCard iconName="Heart" title="Saved Favorites" value={<>7</>} subtext="3 new this week" colorClass="border-l-4 border-red-500" />
        <StatCard iconName="DollarSign" title="Budget Range" value={<>$600-900</>} subtext="Per month" colorClass="border-l-4 border-green-500" />
        <StatCard iconName="Briefcase" title="Preferred Move-in" value={<span className="text-xl font-bold text-purple-600">Sep 1</span>} subtext="2024" colorClass="border-l-4 border-purple-500" />
      </div>
      <div className="mb-10">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Recommended for You</h2>
        <div className="space-y-4">
          {listings.length > 0 ? (
            listings.map(listing => (
              <ListingCard
                key={listing._id}
                listing={listing}
                onApply={onApply}
                onMessage={handleInitiateChat}
              />
            ))
          ) : (
            !isLoading && <p className="text-center text-gray-500 py-10">No recommendations found at the moment.</p>
          )}
        </div>
        {isLoading && (
          <div className="flex justify-center py-6">
            <Loader2 className="w-6 h-6 text-green-600 animate-spin" />
          </div>
        )}
        {!hasMore && listings.length > 0 && (
          <p className="text-center text-gray-500 py-6">You've seen all recommendations.</p>
        )}
      </div>
    </main>
  );
};

const Modal = ({ children, onClose }) => (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
    <div className="bg-white rounded-lg shadow-xl w-full max-w-lg relative p-6 max-h-[90vh] overflow-y-auto">
      <button onClick={onClose} className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 transition-colors">✕</button>
      {children}
    </div>
  </div>
);

const RenterDashboard = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && (!user || user.role !== 'renter')) {
      router.push('/');
    }
  }, [user, loading, router]);

  if (loading || !user || user.role !== 'renter') {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-gray-50">
        <p className="text-lg font-semibold text-gray-700">Loading your dashboard...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <DashboardContent onApply={() => setIsFormOpen(true)} />
      </div>
      {isFormOpen && (
        <Modal onClose={() => setIsFormOpen(false)}>
          <ApplicationFormContainer onClose={() => setIsFormOpen(false)} />
        </Modal>
      )}
    </div>
  );
};

export default RenterDashboard;