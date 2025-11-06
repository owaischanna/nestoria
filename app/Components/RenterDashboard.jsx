"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";
import {
  Heart,
  Bell,
  User,
  MapPin,
  DollarSign,
  EuroIcon,
  FileText,
  Briefcase,
  ChevronRight,
  Loader2,
  ArrowLeft,
  Menu,
  X,
} from "lucide-react";
import MultiStepApplicationForm from "./MultiStepApplicationForm";

const iconsMap = { FileText, Heart, EuroIcon, Briefcase };

const StatCard = ({ iconName, title, value, subtext, colorClass }) => {
  const Icon = iconsMap[iconName];
  return (
    <div
      className={`p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col justify-between bg-white ${colorClass || "border-l-4 border-gray-300"
        }`}
    >
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
  return (
    <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${color}`}>
      {text}
    </span>
  );
};

const ListingCard = ({ listing, onApply, onMessage }) => (
  <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden flex flex-col sm:flex-row h-auto sm:h-48">
    <div className="w-full sm:w-48 h-48 sm:h-full flex-shrink-0">
      <img
        src={
          listing.photos?.cover ||
          "https://via.placeholder.com/192x192?text=No+Image"
        }
        alt={listing.listingTitle}
        className="w-full h-full object-cover"
      />
    </div>
    <div className="flex-1 p-4 flex flex-col sm:flex-row justify-between">
      <div className="flex-1">
        <h5 className="text-lg font-semibold text-gray-800">
          {listing.listingTitle}
        </h5>
        <p className="text-sm text-gray-500 flex items-center mb-2">
          <MapPin className="h-3 w-3 mr-1" />
          {listing.address}, {listing.town}
        </p>
        <p className="text-sm text-gray-600 mb-3 line-clamp-2">
          {listing.description}
        </p>
        <div className="flex flex-wrap gap-2 mb-4">
          <ListingBadge text="Student Friendly" type="student" />
          <ListingBadge text="Available Now" type="available" />
        </div>
        <div className="flex flex-wrap gap-2 sm:space-x-3">
          <button
            onClick={() => onMessage(listing.hostId._id || listing.hostId)}
            className="text-sm font-medium text-green-700 border border-green-700 px-3 py-1 rounded hover:bg-green-50 transition flex-1 sm:flex-none text-center"
          >
            Message
          </button>
          <button
            onClick={() => onApply(listing)}
            className="text-sm font-medium text-white bg-amber-600 px-3 py-1 rounded hover:bg-amber-700 transition flex-1 sm:flex-none text-center"
          >
            Apply
          </button>
        </div>
      </div>
      <div className="flex justify-between items-center sm:items-end sm:flex-col mt-4 sm:mt-0">
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
  const hasFetchedInitial = useRef(false);

  const fetchListings = useCallback(
    async (pageToFetch) => {
      if (isLoading || !hasMore) return;
      setIsLoading(true);
      const toastId =
        pageToFetch === 1 ? toast.loading("Finding recommendations...") : null;

      try {
        const response = await fetch(`/api/listings/all?page=${pageToFetch}&limit=5`);
        const result = await response.json();
        if (!response.ok)
          throw new Error(result.message || "Failed to fetch listings.");

        setListings((prev) =>
          pageToFetch === 1 ? result.data : [...prev, ...result.data]
        );
        setCurrentPage(result.pagination.currentPage);
        setHasMore(result.pagination.currentPage < result.pagination.totalPages);

        if (pageToFetch === 1) {
          toast.success("Recommendations loaded!", { id: toastId });
        }
      } catch (error) {
        toast.error(error.message, { id: toastId || "fetch-listings-error" });
        setHasMore(false);
      } finally {
        setIsLoading(false);
      }
    },
    [isLoading, hasMore]
  );

  const handleInitiateChat = async (hostId) => {
    if (!hostId) {
      toast.error("Host ID is missing for this listing.");
      return;
    }

    if (isInitiatingChat) return;

    setIsInitiatingChat(true);
    const toastId = toast.loading("Opening chat...");

    try {
      const response = await fetch("/api/conversations/initiate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ hostId }),
      });

      const result = await response.json();

      if (!response.ok) throw new Error(result.message || "Failed to initiate chat.");

      toast.success("Redirecting to chat...", { id: toastId });
      router.push(`/rentermessage?id=${result.conversationId}`);
    } catch (error) {
      toast.error(`Error: ${error.message}`, { id: toastId });
    } finally {
      setIsInitiatingChat(false);
    }
  };

  // Fixed: Only fetch once on mount
  useEffect(() => {
    if (user && !hasFetchedInitial.current) {
      hasFetchedInitial.current = true;
      fetchListings(1);
    }
  }, [user]);

  useEffect(() => {
    const container = scrollContainerRef.current;
    const handleScroll = () => {
      if (
        container &&
        container.scrollHeight - container.scrollTop - container.clientHeight <
        200 &&
        !isLoading &&
        hasMore
      ) {
        fetchListings(currentPage + 1);
      }
    };
    container?.addEventListener("scroll", handleScroll);
    return () => container?.removeEventListener("scroll", handleScroll);
  }, [isLoading, hasMore, currentPage, fetchListings]);

  return (
    <main
      ref={scrollContainerRef}
      className="flex-1 p-4 sm:p-6 lg:p-8 bg-gray-50 overflow-y-auto"
    >
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 sm:mb-8 gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
            Welcome, {user?.firstName}!
          </h1>
          <p className="text-gray-600 mt-1 text-sm sm:text-base">
            Let's find your perfect home away from home
          </p>
        </div>
        <div className="flex items-center justify-between sm:justify-start bg-white border border-yellow-400 text-yellow-700 p-2 sm:p-3 rounded-full text-sm font-medium shadow-sm cursor-pointer hover:bg-yellow-50 w-full sm:w-auto">
          <div className="flex items-center">
            <User className="w-4 h-4 mr-2" />
            <span className="text-xs sm:text-sm">Profile 90% Complete</span>
          </div>
          <ChevronRight className="w-4 h-4 ml-2" />
        </div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8 sm:mb-10">
        <StatCard
          iconName="FileText"
          title="Active Applications"
          value={<>3</>}
          subtext="2 pending responses"
          colorClass="border-l-4 border-blue-500"
        />
        <StatCard
          iconName="Heart"
          title="Saved Favorites"
          value={<>7</>}
          subtext="3 new this week"
          colorClass="border-l-4 border-red-500"
        />
        <StatCard
          iconName="DollarSign"
          title="Budget Range"
          value={<>€600-900</>}
          subtext="Per month"
          colorClass="border-l-4 border-green-500"
        />
        <StatCard
          iconName="Briefcase"
          title="Preferred Move-in"
          value={<span className="text-xl font-bold text-purple-600">Sep 1</span>}
          subtext="2024"
          colorClass="border-l-4 border-purple-500"
        />
      </div>
      
      <div className="mb-8 sm:mb-10">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Recommended for You</h2>
        <div className="space-y-4 sm:space-y-6">
          {listings.length > 0 ? (
            listings.map((listing) => (
              <ListingCard
                key={listing._id}
                listing={listing}
                onApply={onApply}
                onMessage={handleInitiateChat}
              />
            ))
          ) : (
            !isLoading && (
              <p className="text-center text-gray-500 py-8 sm:py-10 text-sm sm:text-base">
                No recommendations found at the moment.
              </p>
            )
          )}
        </div>
        {isLoading && (
          <div className="flex justify-center py-6">
            <Loader2 className="w-6 h-6 text-green-600 animate-spin" />
          </div>
        )}
        {!hasMore && listings.length > 0 && (
          <p className="text-center text-gray-500 py-6 text-sm sm:text-base">
            You've seen all recommendations.
          </p>
        )}
      </div>
    </main>
  );
};

const ApplicationFormView = ({ onClose, selectedListing }) => (
  <div className="flex-1 bg-gray-50 overflow-y-auto">
    <div className="h-full">
      <div className="p-4 sm:p-6 bg-white border-b border-gray-200 flex items-center">
        <button
          onClick={onClose}
          className="flex items-center text-gray-600 hover:text-gray-800 mr-4"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h2 className="text-lg sm:text-xl font-semibold text-gray-800">
          Application Form
        </h2>
      </div>
      <MultiStepApplicationForm onClose={onClose} listing={selectedListing} />
    </div>
  </div>
);

const RenterDashboard = () => {
  const [currentView, setCurrentView] = useState("dashboard");
  const [selectedListing, setSelectedListing] = useState(null);
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && (!user || user.role !== "renter")) {
      router.push("/");
    }
  }, [user, loading, router]);

  if (loading || !user || user.role !== "renter") {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-gray-50">
        <p className="text-lg font-semibold text-gray-700">
          Loading your dashboard...
        </p>
      </div>
    );
  }

  const handleApply = (listing) => {
    setSelectedListing(listing);
    setCurrentView("application");
  };

  const handleCloseApplication = () => {
    setCurrentView("dashboard");
    setSelectedListing(null);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <div className="flex flex-1 overflow-hidden">
        {currentView === "dashboard" ? (
          <DashboardContent onApply={handleApply} />
        ) : (
          <ApplicationFormView onClose={handleCloseApplication} selectedListing={selectedListing} />
        )}
      </div>
    </div>
  );
};

export default RenterDashboard;