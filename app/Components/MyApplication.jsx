"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../context/AuthContext";
import toast from 'react-hot-toast';
import {
  FileText, ChevronDown, Loader2, MapPin, MessageCircle, X,
  Heart, Bell, User, DollarSign, Briefcase, ChevronRight, LogOut, Search, Star
} from "lucide-react";
import RenterHeader from "./RenterHeader";
import Sidebar from "./RenterSidebar";
import ListingDetail from "./ListingDetail";

const formatDate = (dateString) => {
  if (!dateString) return '';
  return new Date(dateString).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
};

const ApplicationCard = ({ application, onViewListing, onMessageHost }) => {
  const { listing, host, status, createdAt, updatedAt } = application;
  const isPending = status === "Pending";
  const isApproved = status === "Approved";
  const isRejected = status === "Rejected";

  const timeline = [{ stage: "Application Submitted", date: formatDate(createdAt), color: "text-blue-600" }];
  if (status === "Approved") timeline.push({ stage: "Host Approved", date: formatDate(updatedAt), color: "text-green-600" });
  else if (status === "Rejected") timeline.push({ stage: "Application Rejected", date: formatDate(updatedAt), color: "text-red-600" });
  else if (status === "Pending") timeline.push({ stage: "Host Reviewing", color: "text-yellow-600" });

  const handleWithdraw = () => toast.error('Withdraw function not implemented.');

  return (
    <div className="border border-gray-200 rounded-xl p-6 mb-6 bg-white shadow-sm hover:shadow-md transition-shadow">
      <div className="flex flex-col sm:flex-row sm:space-x-6">
        <div className="flex-shrink-0 w-full sm:w-40 h-40 sm:h-auto rounded-lg overflow-hidden mb-4 sm:mb-0 bg-gray-100">
          <img src={listing?.photos?.cover || 'https://via.placeholder.com/160x160?text=Listing'} alt={listing?.listingTitle || 'Listing Image'} className="w-full h-full object-cover" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex justify-between items-start mb-2">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">{listing?.listingTitle || 'Listing Title'}</h3>
              <p className="text-sm text-gray-500 flex items-center"><MapPin className="w-4 h-4 mr-1 text-gray-400" /> {listing?.address}, {listing?.town}</p>
              <p className="text-xl font-bold text-green-700 mt-1">€{listing?.monthlyRent || 'N/A'}<span className="text-sm font-normal text-gray-600">/month</span></p>
            </div>
            <span className={`text-sm font-semibold px-3 py-1 rounded-full whitespace-nowrap ${isPending ? "bg-yellow-100 text-yellow-700" : isApproved ? "bg-green-100 text-green-700" : isRejected ? "bg-red-100 text-red-700" : "bg-gray-100 text-gray-700"}`}>{status}</span>
          </div>
          <div className="mt-4">
            <h4 className="font-semibold text-gray-700 mb-3 text-sm">Application Timeline</h4>
            {timeline.map((item, index) => (
              <div key={index} className="flex items-start mb-2 relative">
                {index < timeline.length - 1 && (<div className="absolute top-3 left-[5px] w-px h-full bg-gray-300 z-0" />)}
                <div className={`w-3 h-3 rounded-full mt-1 mr-3 z-10 flex-shrink-0 ${item.color.replace("text-", "bg-")}`} />
                <div className="text-sm"><p className={`font-medium ${item.color}`}>{item.stage}</p>{item.date && <p className="text-xs text-gray-500">{item.date}</p>}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col items-end justify-between w-full sm:w-48 mt-4 sm:mt-0 sm:min-w-[150px]">
          <div className="text-right mb-4 pt-2 text-sm text-gray-500 w-full"><p>{listing?.propertyType}</p><p>{listing?.roomSize} sqft</p></div>
          <div className="space-y-2 w-full">
            <button onClick={() => onViewListing(listing?._id)} className="w-full text-sm font-medium text-blue-600 border border-blue-600 hover:bg-blue-50 py-2 rounded-lg transition">View Listing</button>
            {(isPending || isApproved) && (<button onClick={() => onMessageHost(host?._id || listing?.hostId)} className="w-full text-sm font-medium text-white bg-orange-500 hover:bg-orange-600 py-2 rounded-lg transition flex items-center justify-center space-x-1"><MessageCircle className="w-4 h-4" /><span>Message Host</span></button>)}
            {isPending && (<button onClick={handleWithdraw} className="w-full text-sm font-medium text-red-600 hover:bg-red-50 py-1 transition flex items-center justify-center space-x-1"><X className="w-4 h-4" /> <span>Withdraw Application</span></button>)}
          </div>
        </div>
      </div>
    </div>
  );
};

const MyApplicationsPage = () => {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const [selectedListingId, setSelectedListingId] = useState(null);
  const [applications, setApplications] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalApplications, setTotalApplications] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [isInitiatingChat, setIsInitiatingChat] = useState(false);
  const scrollContainerRef = useRef(null);
  const initialFetchDone = useRef(false);

  const fetchApplications = useCallback(async (pageToFetch, isInitialLoad = false) => {
    if (isLoading && !isInitialLoad) return;
    setIsLoading(true);
    const toastId = isInitialLoad ? toast.loading('Loading applications...') : null;

    try {
      const response = await fetch(`/api/applications/mine?page=${pageToFetch}&limit=5`);
      const result = await response.json();
      if (!response.ok) throw new Error(result.message || 'Failed to fetch applications.');

      setApplications(prev => pageToFetch === 1 ? result.data : [...prev, ...result.data]);
      setCurrentPage(result.pagination.currentPage);
      setTotalPages(result.pagination.totalPages);
      setTotalApplications(result.pagination.totalApplications);
      setHasMore(result.pagination.currentPage < result.pagination.totalPages);

      if (toastId) toast.success('Applications loaded!', { id: toastId });

    } catch (error) {
      if (toastId) toast.error(error.message, { id: toastId });
      else toast.error(error.message);
      setHasMore(false);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleInitiateChat = async (hostId) => {
    if (!hostId || isInitiatingChat) return;
    setIsInitiatingChat(true);
    const toastId = toast.loading('Opening chat...');
    try {
      const response = await fetch('/api/conversations/initiate', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ hostId }) });
      const result = await response.json();
      if (!response.ok) throw new Error(result.message || 'Failed.');
      toast.success('Redirecting...', { id: toastId });
      router.push(`/rentermessage?id=${result.conversationId}`);
    } catch (error) {
      toast.error(`Error: ${error.message}`, { id: toastId });
    } finally {
      setIsInitiatingChat(false);
    }
  };

  useEffect(() => {
    if (!authLoading && (!user || user.role !== 'renter')) {
      router.push('/');
    } else if (user && !initialFetchDone.current) {
      fetchApplications(1, true);
      initialFetchDone.current = true;
    }
  }, [user, authLoading, router, fetchApplications]);

  useEffect(() => {
    const container = scrollContainerRef.current;
    const handleScroll = () => {
      if (container && (container.scrollHeight - container.scrollTop - container.clientHeight < 300) && !isLoading && hasMore) {
        fetchApplications(currentPage + 1);
      }
    };
    container?.addEventListener('scroll', handleScroll);
    return () => container?.removeEventListener('scroll', handleScroll);
  }, [isLoading, hasMore, currentPage, fetchApplications]);

  if (authLoading || (!user && !initialFetchDone.current)) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-gray-50">
        <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
      </div>
    );
  }

  if (!user || user.role !== 'renter') return null;

  const pending = applications.filter((a) => a.status === "Pending").length;
  const approved = applications.filter((a) => a.status === "Approved").length;
  const rejected = applications.filter((a) => a.status === "Rejected").length;

  if (selectedListingId) {
    return (
      <div className="flex min-h-screen bg-gray-100">
        <Sidebar />
        <div className="flex-1 flex flex-col">
          <RenterHeader />
          <ListingDetail
            listingId={selectedListingId}
            onBack={() => setSelectedListingId(null)}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div ref={scrollContainerRef} className="flex-1 flex flex-col overflow-y-auto">
        <RenterHeader />
        <div className="p-6 md:p-8 flex-1">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
            <div><h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-1">My Applications</h1><p className="text-gray-600 text-sm md:text-base">Track and manage applications</p></div>
            <button className="mt-4 md:mt-0 flex items-center text-sm font-medium text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 px-4 py-2 rounded-lg transition"><FileText className="w-4 h-4 mr-2" /> Application Tips</button>
          </div>
          <div className="mb-8 "><div className="flex flex-wrap gap-x-6 gap-y-2 border-b border-gray-200 pb-4"><div className="text-center"><p className="text-2xl md:text-3xl font-bold text-gray-900">{totalApplications}</p><p className="text-xs md:text-sm text-gray-500">Total</p></div><div className="text-center"><p className="text-2xl md:text-3xl font-bold text-yellow-600">{pending}</p><p className="text-xs md:text-sm text-gray-500">Pending</p></div><div className="text-center"><p className="text-2xl md:text-3xl font-bold text-green-600">{approved}</p><p className="text-xs md:text-sm text-gray-500">Approved</p></div><div className="text-center"><p className="text-2xl md:text-3xl font-bold text-red-600">{rejected}</p><p className="text-xs md:text-sm text-gray-500">Rejected</p></div></div></div>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Applications ({totalApplications})</h2>
          {isLoading && currentPage === 1 && (<div className="flex justify-center py-10"><Loader2 className="w-8 h-8 animate-spin text-gray-400" /></div>)}
          {!isLoading && applications.length === 0 && (<p className="text-center text-gray-500 py-10">No applications submitted yet.</p>)}
          {applications.map((app) => (<ApplicationCard key={app._id} application={app} onViewListing={setSelectedListingId} onMessageHost={handleInitiateChat} />))}
          {isLoading && currentPage > 1 && (<div className="flex justify-center py-6"><Loader2 className="w-6 h-6 animate-spin text-gray-400" /></div>)}
          {!hasMore && applications.length > 0 && (<p className="text-center text-gray-500 py-6 text-sm">End of applications.</p>)}
        </div>
      </div>
    </div>
  );
};

export default MyApplicationsPage;