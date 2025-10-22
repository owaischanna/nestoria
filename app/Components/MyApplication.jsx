"use client";
import React, { useState } from "react";
import { FileText, ChevronDown } from "lucide-react";
import RenterHeader from "./RenterHeader";
import Sidebar from "./RenterSidebar";
import ListingDetail from "./ListingDetail";

// --- Mockup data (example) ---
const applications = [
  {
    id: 1,
    title: "Cozy Apartment",
    location: "Karachi, Pakistan",
    price: 450,
    status: "Pending",
    image: "https://enzahome.pk/cdn/shop/files/baselbed.jpg?v=1740996046&width=500",
    type: "Flat",
    details: "2 Bed • 2 Bath",
    size: "900 sqft",
    timeline: [
      { stage: "Application Submitted", date: "Oct 1, 2024", color: "text-blue-600" },
      { stage: "Host Reviewing", color: "text-yellow-600" },
    ],
  },
  {
    id: 2,
    title: "Luxury Studio",
    location: "Lahore, Pakistan",
    price: 700,
    status: "Approved",
    image: "https://enzahome.pk/cdn/shop/files/baselbed.jpg?v=1740996046&width=500",
    type: "Studio",
    details: "1 Bed • 1 Bath",
    size: "600 sqft",
    timeline: [
      { stage: "Application Submitted", date: "Sep 20, 2024", color: "text-blue-600" },
      { stage: "Host Approved", date: "Sep 25, 2024", color: "text-green-600" },
    ],
  },
];

// --- Application Card ---
const ApplicationCard = ({ application, onViewListing }) => {
  const isPending = application.status === "Pending";
  const isApproved = application.status === "Approved";

  return (
    <div className="border border-gray-200 rounded-xl p-6 mb-6 bg-white shadow-sm ml-6">
      <div className="flex space-x-6">
        {/* Image */}
        <div className="flex-shrink-0 w-32 h-32 rounded-lg overflow-hidden">
          <img
            src={application.image}
            alt={application.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Details */}
        <div className="flex-1 min-w-0">
          <div className="flex justify-between items-start mb-2">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">{application.title}</h3>
              <p className="text-sm text-gray-500">{application.location}</p>
              <p className="text-xl font-bold text-green-700 mt-1">
                ${application.price}
                <span className="text-sm font-normal text-gray-600">/month</span>
              </p>
            </div>
            <span
              className={`text-sm font-semibold px-3 py-1 rounded-full ${
                isPending
                  ? "bg-yellow-100 text-yellow-700"
                  : isApproved
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {application.status}
            </span>
          </div>

          {/* Timeline */}
          <div className="mt-4">
            <h4 className="font-semibold text-gray-700 mb-3">Application Timeline</h4>
            {application.timeline.map((item, index) => (
              <div key={index} className="flex items-start mb-2 relative">
                {index < application.timeline.length - 1 && (
                  <div className="absolute top-4 left-[9px] w-px h-full bg-gray-300 z-0" />
                )}
                <div
                  className={`w-2.5 h-2.5 rounded-full mt-1.5 mr-3 z-10 ${item.color.replace(
                    "text-",
                    "bg-"
                  )}`}
                />
                <div className="text-sm">
                  <p className={`font-medium ${item.color}`}>{item.stage}</p>
                  {item.date && <p className="text-xs text-gray-500">{item.date}</p>}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col items-end justify-between w-64 min-w-[150px]">
          <div className="text-right mb-4 pt-2">
            <div className="text-sm text-gray-500">{application.size}</div>
          </div>

          <div className="space-y-2 w-full">
            <button
              onClick={() => onViewListing(application)}
              className="w-full text-sm font-medium text-blue-600 border border-blue-600 hover:bg-blue-50 py-2 rounded-lg transition"
            >
              View Listing
            </button>

            {isPending && (
              <>
                <button className="w-full text-sm font-medium text-white bg-orange-500 hover:bg-orange-600 py-2 rounded-lg transition">
                  Message Host
                </button>
                <button className="w-full text-sm font-medium text-red-600 hover:text-red-700 py-1 transition">
                  Withdraw
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// --- MAIN PAGE ---
const MyApplicationsPage = () => {
  const [selectedListing, setSelectedListing] = useState(null);

  const totalApplied = applications.length;
  const pending = applications.filter((a) => a.status === "Pending").length;
  const approved = applications.filter((a) => a.status === "Approved").length;
  const rejected = applications.filter((a) => a.status === "Rejected").length;

  // ✅ If user has clicked a listing → show detail
  if (selectedListing) {
    return (
      <div className="flex">
        <Sidebar />
        <div className="flex-1 flex flex-col">
          <RenterHeader />
          <ListingDetail listing={selectedListing} onBack={() => setSelectedListing(null)} />
        </div>
      </div>
    );
  }

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <RenterHeader />

        <div className="flex justify-between items-center mb-6 ml-6 mr-5">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2 mt-4 ">My Applications</h1>
            <p className="text-gray-600">Track and manage your housing applications</p>
          </div>
          <button className="flex items-center text-sm font-medium text-gray-700 bg-white border border-gray-300 hover:bg-gray-100 px-4 py-2 rounded-lg transition">
            <FileText className="w-4 h-4 mr-2" />
            Application Tips
          </button>
        </div>

        {/* Summary */}
        <div className="mb-8 ml-6">
          <div className="flex space-x-6 border-b border-gray-200 pb-4">
            <div className="text-center">
              <p className="text-3xl font-bold text-gray-900">{totalApplied}</p>
              <p className="text-sm text-gray-500">Total Applied</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-yellow-600">{pending}</p>
              <p className="text-sm text-gray-500">Pending</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-green-600">{approved}</p>
              <p className="text-sm text-gray-500">Approved</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-red-600">{rejected}</p>
              <p className="text-sm text-gray-500">Rejected</p>
            </div>
          </div>
        </div>

        {/* Applications List */}
        <h2 className="text-xl font-semibold text-gray-900 mb-4 ml-6">
          Active Applications ({totalApplied})
        </h2>

        {applications.map((app) => (
          <ApplicationCard key={app.id} application={app} onViewListing={setSelectedListing} />
        ))}
      </div>
    </div>
  );
};

export default MyApplicationsPage;
