"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../context/AuthContext";
import toast from 'react-hot-toast';
import {
  Calendar, Clock, Edit, ListChecks, Menu,
  CheckCircle, Loader2, MessageCircle, X
} from "lucide-react";
import HostSidebar from "../Components/HostSidebar";
import HostHeader from "../Components/HostHeader";

const formatDate = (dateString) => {
  if (!dateString) return '';
  return new Date(dateString).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' });
};

const formatTime = (dateString) => {
  if (!dateString) return 'TBD';
  return new Date(dateString).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};

const getInitials = (firstName, lastName) => {
  if (!firstName) return '?';
  const first = firstName.charAt(0);
  const last = lastName ? lastName.charAt(0) : '';
  return `${first}${last}`.toUpperCase();
};

const PrepStatusBadge = ({ label, isCompleted }) => (
  <span
    className={`text-xs font-semibold px-2 py-1 rounded-full ${isCompleted ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"
      }`}
  >
    {isCompleted && <CheckCircle className="w-3 h-3 inline mr-1" />}
    {label}
  </span>
);

const CheckInCard = ({ application }) => {
  const { applicant, listing, status, leaseLength, preferredMoveIn } = application;

  // Placeholder logic for prep status
  const prepStatus = { roomCleaned: true, keysReady: true, welcomePack: false, inventory: false };

  return (
    <div className="flex flex-col md:flex-row border border-gray-200 rounded-lg overflow-hidden shadow-sm bg-white mb-6">
      <div className="flex-1 p-5">
        <div className="flex items-center mb-3">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-indigo-600 text-white flex items-center justify-center text-base font-bold shadow-md flex-shrink-0 mr-4">
            {getInitials(applicant?.firstName, applicant?.lastName)}
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-800">{applicant?.firstName} {applicant?.lastName}</h3>
            <div className="text-sm text-gray-600 space-x-3">
              <span>{applicant?.email}</span>
            </div>
          </div>
        </div>

        <h4 className="font-semibold text-gray-800">{listing?.listingTitle}</h4>
        <p className="text-sm text-gray-500 mb-4">{listing?.address}, {listing?.town}</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-2 text-sm text-gray-700 mb-4">
          <div className="flex items-center">
            <Calendar className="w-4 h-4 mr-2 text-gray-500" />
            Move-in Date:
            <span className="font-medium ml-1 text-blue-600">{formatDate(preferredMoveIn)}</span>
          </div>
          <div>
            Contact: <span className="font-medium ml-1">{applicant?.phone || 'N/A'}</span>
          </div>
          <div>
            Lease Duration: <span className="font-medium ml-1">{leaseLength || 'N/A'}</span>
          </div>
        </div>

        <div className="border-t border-gray-100 pt-4">
          <p className="text-sm font-semibold text-gray-700 mb-2">Check-in Preparation Status</p>
          <div className="flex flex-wrap gap-2">
            <PrepStatusBadge label="Room Cleaned" isCompleted={prepStatus.roomCleaned} />
            <PrepStatusBadge label="Keys Ready" isCompleted={prepStatus.keysReady} />
            <PrepStatusBadge label="Welcome Pack" isCompleted={prepStatus.welcomePack} />
            <PrepStatusBadge label="Inventory" isCompleted={prepStatus.inventory} />
          </div>
        </div>
      </div>

      <div className="w-full md:w-60 flex-shrink-0 p-5 border-t md:border-t-0 md:border-l border-gray-100 bg-gray-50 flex flex-col justify-between items-end">
        <div className="text-right w-full">
          <span className={`text-xs font-semibold px-2 py-1 rounded-full ${status === 'Approved' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
            }`}>
            {status === 'Approved' ? 'Check-in Soon' : status}
          </span>
          <p className="text-2xl font-bold text-green-700 mt-2">€{listing?.monthlyRent}/month</p>
          <p className="text-sm text-gray-500">{leaseLength}</p>
        </div>
        <div className="flex flex-col space-y-2 w-full mt-4">
          <button className="text-sm font-medium text-gray-700 border border-gray-300 px-3 py-2 rounded-lg hover:bg-gray-50 transition">Message Tenant</button>
          <button className="text-sm font-medium text-orange-600 border border-orange-300 px-3 py-2 rounded-lg hover:bg-orange-50 flex items-center justify-center transition">
            <Edit className="w-4 h-4 mr-1" /> Reschedule
          </button>
          <button className="text-sm font-medium text-white bg-green-600 px-3 py-2 rounded-lg hover:bg-green-700 flex items-center justify-center transition">
            <CheckCircle className="w-4 h-4 mr-1" /> Start Check-in
          </button>
        </div>
      </div>
    </div>
  );
};

const CheckInsContent = () => {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const [applications, setApplications] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [totalApplications, setTotalApplications] = useState(0);
  const scrollContainerRef = useRef(null);
  const initialFetchDone = useRef(false);

  const fetchApplications = useCallback(async (pageToFetch, isInitialLoad = false) => {
    if (isLoading && !isInitialLoad) return;
    setIsLoading(true);
    const toastId = isInitialLoad ? toast.loading('Loading applications...') : null;

    try {
      const response = await fetch(`/api/applications/received?page=${pageToFetch}&limit=5`);
      const result = await response.json();
      if (!response.ok) throw new Error(result.message || 'Failed to fetch applications.');

      setApplications(prev => pageToFetch === 1 ? result.data : [...prev, ...result.data]);
      setCurrentPage(result.pagination.currentPage);
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

  useEffect(() => {
    if (!authLoading && (!user || user.role !== 'host')) {
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

  if (authLoading || !user || user.role !== 'host') {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-50">
        <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
      </div>
    );
  }

  const pendingCount = applications.filter(app => app.status === 'Pending').length;
  const approvedCount = applications.filter(app => app.status === 'Approved').length;

  return (
    <div className="flex h-screen bg-gray-50">
      <HostSidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <HostHeader />
        <div ref={scrollContainerRef} className="flex-1 p-8 overflow-y-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800">Applications & Check-ins</h1>
            <button className="flex items-center space-x-2 text-sm font-semibold text-gray-700 border border-gray-300 px-4 py-2 rounded-lg shadow-sm hover:bg-gray-50 transition">
              <ListChecks className="w-4 h-4" />
              <span>Checklist</span>
            </button>
          </div>

          <div className="flex space-x-8 mb-8 text-sm border-b border-gray-200 pb-4">
            <div className="text-center">
              <p className="font-bold text-2xl text-blue-600">{pendingCount}</p>
              <p className="text-sm text-gray-500">Pending</p>
            </div>
            <div className="text-center">
              <p className="font-bold text-2xl text-green-600">{approvedCount}</p>
              <p className="text-sm text-gray-500">Approved</p>
            </div>
            <div className="text-center">
              <p className="font-bold text-2xl text-gray-600">{totalApplications}</p>
              <p className="text-sm text-gray-500">Total</p>
            </div>
          </div>

          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-800">
              Upcoming Check-ins ({approvedCount})
            </h2>
            <p className="text-sm font-medium text-gray-600 flex items-center">
              <Calendar className="w-4 h-4 mr-1" /> {formatDate(new Date().toISOString())}
            </p>
          </div>

          <div className="space-y-4">
            {isLoading && currentPage === 1 && (
              <div className="flex justify-center py-10"><Loader2 className="w-8 h-8 animate-spin text-gray-400" /></div>
            )}

            {!isLoading && applications.length === 0 && (
              <div className="text-center py-10 text-gray-500">
                <p className="text-lg font-medium">No pending or approved applications found.</p>
                <p className="text-sm">When renters apply to your listings, they will appear here.</p>
              </div>
            )}

            {applications.map((app) => (
              <CheckInCard key={app._id} application={app} />
            ))}

            {isLoading && currentPage > 1 && (
              <div className="flex justify-center py-6"><Loader2 className="w-6 h-6 animate-spin text-gray-400" /></div>
            )}
            {!hasMore && applications.length > 0 && (
              <p className="text-center text-gray-500 py-6 text-sm">You've reached the end of the list.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckInsContent;