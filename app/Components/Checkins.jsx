"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../context/AuthContext";
import toast from 'react-hot-toast';
import {
  Calendar, Clock, Edit, ListChecks, Menu,
  CheckCircle, Loader2, MessageCircle, X,
  ChevronLeft, ChevronRight, Home, Wifi,
  DoorOpen, Kitchen, Shirt, TreePine,
  Flame, Shield, User, Mail, Phone, GraduationCap,
  FileText, Upload, CheckSquare, IdCard, BookOpen,
  Key, Lock, QrCode, ClipboardList, Star
} from "lucide-react";
import HostSidebar from "../Components/HostSidebar";
import HostHeader from "../Components/HostHeader";

const formatDate = (dateString) => {
  if (!dateString) return '';
  return new Date(dateString).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' });
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

// Step 5 - Final Checklist Component
const FinalChecklist = ({ application, onComplete, onBack }) => {
  const [finalChecklist, setFinalChecklist] = useState([
    { id: 1, label: "All documents signed and verified", completed: false },
    { id: 2, label: "Security deposit collected", completed: false },
    { id: 3, label: "First month's rent received", completed: false },
    { id: 4, label: "Emergency contact information confirmed", completed: false },
    { id: 5, label: "House rules acknowledgement received", completed: false },
    { id: 6, label: "Welcome package delivered", completed: false },
    { id: 7, label: "Maintenance contact information provided", completed: false },
    { id: 8, label: "Check-in photos taken", completed: false }
  ]);

  const toggleChecklistItem = (itemId) => {
    setFinalChecklist(prev => prev.map(item =>
      item.id === itemId ? { ...item, completed: !item.completed } : item
    ));
  };

  const completedItems = finalChecklist.filter(item => item.completed).length;
  const totalItems = finalChecklist.length;
  const completionPercentage = Math.round((completedItems / totalItems) * 100);

  const checkInProgress = [
    { step: 1, label: "Welcome & Identity", status: "completed" },
    { step: 2, label: "Property Tour", status: "completed" },
    { step: 3, label: "Documentation", status: "completed" },
    { step: 4, label: "Keys & Access", status: "completed" },
    { step: 5, label: "Final Checklist", status: "in-progress" }
  ];

  return (
    <div className="flex flex-col lg:flex-row gap-6">
      {/* Left Column - Check-in Progress & Host Info */}
      <div className="lg:w-1/3 space-y-6">
        {/* Host Profile Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center space-x-4 mb-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-indigo-600 text-white flex items-center justify-center text-base font-bold">
              MJ
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Margaret Johnson</h3>
              <p className="text-sm text-gray-500">Host since 2025</p>
            </div>
          </div>
        </div>

        {/* Check-in Progress */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">CHECK-IN PROGRESS</h3>
          <div className="space-y-4">
            {checkInProgress.map((item) => (
              <div key={item.step} className="flex items-center space-x-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                  item.status === 'completed' ? 'bg-green-100 text-green-700' :
                  item.status === 'in-progress' ? 'bg-blue-100 text-blue-700' :
                  'bg-gray-100 text-gray-400'
                }`}>
                  {item.status === 'completed' ? '✓' : item.step}
                </div>
                <div className="flex-1">
                  <p className={`text-sm font-medium ${
                    item.status === 'completed' ? 'text-green-700' :
                    item.status === 'in-progress' ? 'text-blue-700' :
                    'text-gray-500'
                  }`}>
                    {item.label}
                  </p>
                  <p className="text-xs text-gray-400 capitalize">{item.status.replace('-', ' ')}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tenant Details */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">TENANT DETAILS</h3>
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <User className="w-4 h-4 text-gray-400" />
              <span className="text-sm text-gray-700">{application.applicant?.firstName} {application.applicant?.lastName}</span>
            </div>
            <div className="flex items-center space-x-3">
              <GraduationCap className="w-4 h-4 text-gray-400" />
              <span className="text-sm text-gray-700">Columbia Student</span>
            </div>
            <div className="flex items-center space-x-3">
              <Phone className="w-4 h-4 text-gray-400" />
              <span className="text-sm text-gray-700">{application.applicant?.phone || '+1 (555) 123-4567'}</span>
            </div>
            <div className="flex items-center space-x-3">
              <Mail className="w-4 h-4 text-gray-400" />
              <span className="text-sm text-gray-700">{application.applicant?.email || 'alex.kim@columbia.edu'}</span>
            </div>
          </div>
        </div>

        {/* Progress Summary */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-6 text-white">
          <div className="text-center">
            <div className="text-3xl font-bold mb-2">{completedItems}/{totalItems}</div>
            <div className="text-blue-100 text-sm">Complete</div>
            <div className="w-full bg-blue-500 rounded-full h-2 mt-3">
              <div 
                className="bg-white h-2 rounded-full transition-all duration-300"
                style={{ width: `${completionPercentage}%` }}
              ></div>
            </div>
            <p className="text-blue-100 text-sm mt-2">{completionPercentage}% Complete</p>
          </div>
        </div>
      </div>

      {/* Right Column - Final Checklist Content */}
      <div className="lg:w-2/3">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-6 text-white">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-2xl font-bold">Final Checklist</h1>
                <p className="text-blue-100 mt-1">Step 5 of 5: Complete final verification and handover</p>
              </div>
              <button
                onClick={onBack}
                className="text-white hover:text-blue-200 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="bg-gray-100 px-6 py-3">
            <div className="flex justify-between items-center text-sm text-gray-600">
              <span>Step 5 of 5</span>
              <span>{completionPercentage}% Complete</span>
            </div>
            <div className="w-full bg-gray-300 rounded-full h-2 mt-2">
              <div
                className="bg-green-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${completionPercentage}%` }}
              ></div>
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            <div className="space-y-6">
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Final Verification Checklist</h3>
                
                <div className="space-y-3">
                  {finalChecklist.map((item) => (
                    <label key={item.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                      <input
                        type="checkbox"
                        checked={item.completed}
                        onChange={() => toggleChecklistItem(item.id)}
                        className="rounded border-gray-300 text-green-600 focus:ring-green-500 w-5 h-5"
                      />
                      <span className={`text-sm flex-1 ${item.completed ? 'text-gray-500 line-through' : 'text-gray-700'}`}>
                        {item.label}
                      </span>
                      {item.completed && (
                        <CheckCircle className="w-5 h-5 text-green-500" />
                      )}
                    </label>
                  ))}
                </div>

                {/* Completion Message */}
                {completionPercentage === 100 && (
                  <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                    <div className="flex items-center">
                      <Star className="w-6 h-6 text-green-600 mr-3" />
                      <div>
                        <h4 className="font-semibold text-green-800">Ready for Completion!</h4>
                        <p className="text-green-700 text-sm">All items completed. You can now finalize the check-in process.</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="border-t border-gray-200 p-6 bg-gray-50">
            <div className="flex justify-between items-center">
              <button
                onClick={onBack}
                className="flex items-center space-x-2 px-6 py-3 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Back</span>
              </button>

              <div className="flex space-x-3">
                <button
                  onClick={onBack}
                  className="px-6 py-3 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  Skip
                </button>
                <button
                  onClick={onComplete}
                  disabled={completionPercentage < 100}
                  className={`flex items-center space-x-2 px-6 py-3 rounded-lg transition-colors ${
                    completionPercentage === 100 
                      ? 'bg-green-600 text-white hover:bg-green-700' 
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  <CheckCircle className="w-4 h-4" />
                  <span>Complete Check-in</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Step 4 - Keys & Access Component
const KeysAccess = ({ application, onComplete, onBack }) => {
  const [accessItems, setAccessItems] = useState([
    { id: 1, label: "Main door key handed over", completed: false, type: "physical" },
    { id: 2, label: "Room key provided", completed: false, type: "physical" },
    { id: 3, label: "Mailbox key assigned", completed: false, type: "physical" },
    { id: 4, label: "Digital lock code set up", completed: false, type: "digital" },
    { id: 5, label: "Building access card activated", completed: false, type: "digital" },
    { id: 6, label: "Garage/gate remote provided", completed: false, type: "digital" },
    { id: 7, label: "Emergency key location explained", completed: false, type: "information" },
    { id: 8, label: "Key replacement policy discussed", completed: false, type: "information" }
  ]);

  const toggleAccessItem = (itemId) => {
    setAccessItems(prev => prev.map(item =>
      item.id === itemId ? { ...item, completed: !item.completed } : item
    ));
  };

  const completedItems = accessItems.filter(item => item.completed).length;
  const totalItems = accessItems.length;
  const completionPercentage = Math.round((completedItems / totalItems) * 100);

  const checkInProgress = [
    { step: 1, label: "Welcome & Identity", status: "completed" },
    { step: 2, label: "Property Tour", status: "completed" },
    { step: 3, label: "Documentation", status: "completed" },
    { step: 4, label: "Keys & Access", status: "in-progress" },
    { step: 5, label: "Final Checklist", status: "pending" }
  ];

  const getTypeIcon = (type) => {
    switch (type) {
      case 'physical':
        return <Key className="w-4 h-4 text-blue-600" />;
      case 'digital':
        return <QrCode className="w-4 h-4 text-green-600" />;
      case 'information':
        return <Lock className="w-4 h-4 text-orange-600" />;
      default:
        return <Key className="w-4 h-4 text-gray-600" />;
    }
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6">
      {/* Left Column - Same structure as other steps */}
      <div className="lg:w-1/3 space-y-6">
        {/* Host Profile Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center space-x-4 mb-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-indigo-600 text-white flex items-center justify-center text-base font-bold">
              MJ
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Margaret Johnson</h3>
              <p className="text-sm text-gray-500">Host since 2025</p>
            </div>
          </div>
        </div>

        {/* Check-in Progress */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">CHECK-IN PROGRESS</h3>
          <div className="space-y-4">
            {checkInProgress.map((item) => (
              <div key={item.step} className="flex items-center space-x-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                  item.status === 'completed' ? 'bg-green-100 text-green-700' :
                  item.status === 'in-progress' ? 'bg-blue-100 text-blue-700' :
                  'bg-gray-100 text-gray-400'
                }`}>
                  {item.status === 'completed' ? '✓' : item.step}
                </div>
                <div className="flex-1">
                  <p className={`text-sm font-medium ${
                    item.status === 'completed' ? 'text-green-700' :
                    item.status === 'in-progress' ? 'text-blue-700' :
                    'text-gray-500'
                  }`}>
                    {item.label}
                  </p>
                  <p className="text-xs text-gray-400 capitalize">{item.status.replace('-', ' ')}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tenant Details */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">TENANT DETAILS</h3>
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <User className="w-4 h-4 text-gray-400" />
              <span className="text-sm text-gray-700">{application.applicant?.firstName} {application.applicant?.lastName}</span>
            </div>
            <div className="flex items-center space-x-3">
              <GraduationCap className="w-4 h-4 text-gray-400" />
              <span className="text-sm text-gray-700">Columbia Student</span>
            </div>
            <div className="flex items-center space-x-3">
              <Phone className="w-4 h-4 text-gray-400" />
              <span className="text-sm text-gray-700">{application.applicant?.phone || '+1 (555) 123-4567'}</span>
            </div>
            <div className="flex items-center space-x-3">
              <Mail className="w-4 h-4 text-gray-400" />
              <span className="text-sm text-gray-700">{application.applicant?.email || 'alex.kim@columbia.edu'}</span>
            </div>
          </div>
        </div>

        {/* Progress Summary */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-6 text-white">
          <div className="text-center">
            <div className="text-3xl font-bold mb-2">{completedItems}/{totalItems}</div>
            <div className="text-blue-100 text-sm">Complete</div>
            <div className="w-full bg-blue-500 rounded-full h-2 mt-3">
              <div 
                className="bg-white h-2 rounded-full transition-all duration-300"
                style={{ width: `${completionPercentage}%` }}
              ></div>
            </div>
            <p className="text-blue-100 text-sm mt-2">{completionPercentage}% Complete</p>
          </div>
        </div>
      </div>

      {/* Right Column - Keys & Access Content */}
      <div className="lg:w-2/3">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-6 text-white">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-2xl font-bold">Keys & Access</h1>
                <p className="text-blue-100 mt-1">Step 4 of 5: Provide keys and access instructions</p>
              </div>
              <button
                onClick={onBack}
                className="text-white hover:text-blue-200 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="bg-gray-100 px-6 py-3">
            <div className="flex justify-between items-center text-sm text-gray-600">
              <span>Step 4 of 5</span>
              <span>{completionPercentage}% Complete</span>
            </div>
            <div className="w-full bg-gray-300 rounded-full h-2 mt-2">
              <div
                className="bg-green-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${completionPercentage}%` }}
              ></div>
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            <div className="space-y-6">
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Access Control Checklist</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {accessItems.map((item) => (
                    <label key={item.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                      <input
                        type="checkbox"
                        checked={item.completed}
                        onChange={() => toggleAccessItem(item.id)}
                        className="rounded border-gray-300 text-green-600 focus:ring-green-500 w-5 h-5"
                      />
                      <div className="flex items-center space-x-2 flex-1">
                        {getTypeIcon(item.type)}
                        <span className={`text-sm ${item.completed ? 'text-gray-500 line-through' : 'text-gray-700'}`}>
                          {item.label}
                        </span>
                      </div>
                    </label>
                  ))}
                </div>

                {/* Additional Information */}
                <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <h4 className="font-semibold text-blue-800 mb-2">Important Notes</h4>
                  <ul className="text-sm text-blue-700 space-y-1">
                    <li>• Keep a record of all keys provided</li>
                    <li>• Document any access codes or digital keys</li>
                    <li>• Explain key replacement procedures and costs</li>
                    <li>• Provide emergency contact for lockouts</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="border-t border-gray-200 p-6 bg-gray-50">
            <div className="flex justify-between items-center">
              <button
                onClick={onBack}
                className="flex items-center space-x-2 px-6 py-3 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Back</span>
              </button>

              <div className="flex space-x-3">
                <button
                  onClick={onBack}
                  className="px-6 py-3 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  Skip
                </button>
                <button
                  onClick={onComplete}
                  className="flex items-center space-x-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  <span>Next Step</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Step 3 - Documentation & Verification Component (Updated with file upload)
const DocumentationVerification = ({ application, onComplete, onBack }) => {
  const [documents, setDocuments] = useState({
    identity: [
      { id: 1, label: "Government-issued ID", status: "required", verified: false, uploaded: false, file: null },
      { id: 2, label: "Passport (International Students)", status: "required", verified: true, uploaded: true, file: null }
    ],
    financial: [
      { id: 3, label: "Bank Statement", status: "required", verified: false, uploaded: false, file: null },
      { id: 4, label: "Proof of Income", status: "required", verified: false, uploaded: false, file: null }
    ],
    additional: [
      { id: 5, label: "Student Enrollment Letter", status: "optional", verified: false, uploaded: false, file: null }
    ]
  });

  const handleFileUpload = (category, docId, file) => {
    if (file) {
      setDocuments(prev => ({
        ...prev,
        [category]: prev[category].map(doc =>
          doc.id === docId ? { ...doc, uploaded: true, file } : doc
        )
      }));
      toast.success('Document uploaded successfully!');
    }
  };

  const handleVerify = (category, docId) => {
    setDocuments(prev => ({
      ...prev,
      [category]: prev[category].map(doc =>
        doc.id === docId ? { ...doc, verified: true } : doc
      )
    }));
    toast.success('Document verified successfully!');
  };

  const completedDocs = Object.values(documents).flat().filter(doc => doc.verified).length;
  const totalRequiredDocs = Object.values(documents).flat().filter(doc => doc.status === "required").length;
  const completionPercentage = Math.round((completedDocs / totalRequiredDocs) * 100);

  const checkInProgress = [
    { step: 1, label: "Welcome & Identity", status: "completed" },
    { step: 2, label: "Property Tour", status: "completed" },
    { step: 3, label: "Documentation", status: "in-progress" },
    { step: 4, label: "Keys & Access", status: "pending" },
    { step: 5, label: "Final Checklist", status: "pending" }
  ];

  const getStatusBadge = (status) => {
    switch (status) {
      case 'required':
        return <span className="text-xs font-semibold px-2 py-1 bg-red-100 text-red-700 rounded-full">REQUIRED</span>;
      case 'optional':
        return <span className="text-xs font-semibold px-2 py-1 bg-gray-100 text-gray-700 rounded-full">OPTIONAL</span>;
      default:
        return null;
    }
  };

  const getActionButton = (doc, category) => {
    if (!doc.uploaded) {
      return (
        <label className="text-xs font-semibold px-3 py-1 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors cursor-pointer">
          <Upload className="w-3 h-3 inline mr-1" />
          Upload
          <input
            type="file"
            className="hidden"
            onChange={(e) => handleFileUpload(category, doc.id, e.target.files[0])}
            accept=".pdf,.jpg,.jpeg,.png"
          />
        </label>
      );
    }
    if (!doc.verified) {
      return (
        <button
          onClick={() => handleVerify(category, doc.id)}
          className="text-xs font-semibold px-3 py-1 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors"
        >
          Verify
        </button>
      );
    }
    return (
      <span className="text-xs font-semibold px-3 py-1 bg-green-100 text-green-700 rounded-lg">
        Verified
      </span>
    );
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6">
      {/* Left Column - Same structure as other steps */}
      <div className="lg:w-1/3 space-y-6">
        {/* Host Profile Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center space-x-4 mb-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-indigo-600 text-white flex items-center justify-center text-base font-bold">
              MJ
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Margaret Johnson</h3>
              <p className="text-sm text-gray-500">Host since 2025</p>
            </div>
          </div>
        </div>

        {/* Check-in Progress */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">CHECK-IN PROGRESS</h3>
          <div className="space-y-4">
            {checkInProgress.map((item) => (
              <div key={item.step} className="flex items-center space-x-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                  item.status === 'completed' ? 'bg-green-100 text-green-700' :
                  item.status === 'in-progress' ? 'bg-blue-100 text-blue-700' :
                  'bg-gray-100 text-gray-400'
                }`}>
                  {item.status === 'completed' ? '✓' : item.step}
                </div>
                <div className="flex-1">
                  <p className={`text-sm font-medium ${
                    item.status === 'completed' ? 'text-green-700' :
                    item.status === 'in-progress' ? 'text-blue-700' :
                    'text-gray-500'
                  }`}>
                    {item.label}
                  </p>
                  <p className="text-xs text-gray-400 capitalize">{item.status.replace('-', ' ')}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tenant Details */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">TENANT DETAILS</h3>
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <User className="w-4 h-4 text-gray-400" />
              <span className="text-sm text-gray-700">{application.applicant?.firstName} {application.applicant?.lastName}</span>
            </div>
            <div className="flex items-center space-x-3">
              <GraduationCap className="w-4 h-4 text-gray-400" />
              <span className="text-sm text-gray-700">Columbia Student</span>
            </div>
            <div className="flex items-center space-x-3">
              <Phone className="w-4 h-4 text-gray-400" />
              <span className="text-sm text-gray-700">{application.applicant?.phone || '+1 (555) 123-4567'}</span>
            </div>
            <div className="flex items-center space-x-3">
              <Mail className="w-4 h-4 text-gray-400" />
              <span className="text-sm text-gray-700">{application.applicant?.email || 'alex.kim@columbia.edu'}</span>
            </div>
          </div>
        </div>

        {/* Progress Summary */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-6 text-white">
          <div className="text-center">
            <div className="text-3xl font-bold mb-2">{completedDocs}/{totalRequiredDocs}</div>
            <div className="text-blue-100 text-sm">Complete</div>
            <div className="w-full bg-blue-500 rounded-full h-2 mt-3">
              <div 
                className="bg-white h-2 rounded-full transition-all duration-300"
                style={{ width: `${completionPercentage}%` }}
              ></div>
            </div>
            <p className="text-blue-100 text-sm mt-2">{completionPercentage}% Complete</p>
          </div>
        </div>
      </div>

      {/* Right Column - Documentation Content */}
      <div className="lg:w-2/3">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-6 text-white">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-2xl font-bold">Documentation & Verification</h1>
                <p className="text-blue-100 mt-1">Step 3 of 5: Collect and verify required documents</p>
              </div>
              <button
                onClick={onBack}
                className="text-white hover:text-blue-200 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="bg-gray-100 px-6 py-3">
            <div className="flex justify-between items-center text-sm text-gray-600">
              <span>Step 3 of 5</span>
              <span>{completionPercentage}% Complete</span>
            </div>
            <div className="w-full bg-gray-300 rounded-full h-2 mt-2">
              <div
                className="bg-green-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${completionPercentage}%` }}
              ></div>
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            <div className="space-y-6">
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Required Documents</h3>
                
                {/* Identity Documents */}
                <div className="mb-6">
                  <h4 className="font-semibold text-gray-700 mb-3 flex items-center">
                    <IdCard className="w-4 h-4 mr-2 text-blue-600" />
                    Identity Documents
                  </h4>
                  <div className="space-y-3">
                    {documents.identity.map((doc) => (
                      <div key={doc.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <input
                            type="checkbox"
                            checked={doc.verified}
                            readOnly
                            className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                          />
                          <span className={`text-sm ${doc.verified ? 'text-gray-500 line-through' : 'text-gray-700'}`}>
                            {doc.label}
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          {getStatusBadge(doc.status)}
                          {getActionButton(doc, 'identity')}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Financial Verification */}
                <div className="mb-6">
                  <h4 className="font-semibold text-gray-700 mb-3 flex items-center">
                    <FileText className="w-4 h-4 mr-2 text-green-600" />
                    Financial Verification
                  </h4>
                  <div className="space-y-3">
                    {documents.financial.map((doc) => (
                      <div key={doc.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <input
                            type="checkbox"
                            checked={doc.verified}
                            readOnly
                            className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                          />
                          <span className={`text-sm ${doc.verified ? 'text-gray-500 line-through' : 'text-gray-700'}`}>
                            {doc.label}
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          {getStatusBadge(doc.status)}
                          {getActionButton(doc, 'financial')}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Additional Documents */}
                <div>
                  <h4 className="font-semibold text-gray-700 mb-3 flex items-center">
                    <BookOpen className="w-4 h-4 mr-2 text-orange-600" />
                    Additional Documents
                  </h4>
                  <div className="space-y-3">
                    {documents.additional.map((doc) => (
                      <div key={doc.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <input
                            type="checkbox"
                            checked={doc.verified}
                            readOnly
                            className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                          />
                          <span className={`text-sm ${doc.verified ? 'text-gray-500 line-through' : 'text-gray-700'}`}>
                            {doc.label}
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          {getStatusBadge(doc.status)}
                          {getActionButton(doc, 'additional')}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="border-t border-gray-200 p-6 bg-gray-50">
            <div className="flex justify-between items-center">
              <button
                onClick={onBack}
                className="flex items-center space-x-2 px-6 py-3 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Back</span>
              </button>

              <div className="flex space-x-3">
                <button
                  onClick={onBack}
                  className="px-6 py-3 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  Skip
                </button>
                <button
                  onClick={onComplete}
                  className="flex items-center space-x-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  <span>Next Step</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Property Tour Component - Step 2 (Keep the same as before)
const PropertyTourContent = ({ application, onComplete, onBack }) => {
  const [tourData, setTourData] = useState({
    roomAndPrivate: [
      { id: 1, label: "Show tenant their private room", completed: false },
      { id: 2, label: "Demonstrate room features (lights, outlets, heating)", completed: false },
      { id: 3, label: "Explain storage spaces and closet organization", completed: false },
      { id: 4, label: "Show bathroom facilities and explain sharing", completed: false }
    ],
    commonAreas: [
      { id: 5, label: "Kitchen tour and appliance demonstration", completed: false },
      { id: 6, label: "Show living room and common areas", completed: false },
      { id: 7, label: "Laundry facilities and usage instructions", completed: false },
      { id: 8, label: "Outdoor spaces (garden, balcony, parking)", completed: false }
    ],
    safetyAndRules: [
      { id: 9, label: "Emergency exits and safety equipment locations", completed: false },
      { id: 10, label: "House rules explanation and Q&A", completed: false },
      { id: 11, label: "WiFi password and network setup", completed: false }
    ]
  });

  const toggleChecklistItem = (category, itemId) => {
    setTourData(prev => ({
      ...prev,
      [category]: prev[category].map(item =>
        item.id === itemId ? { ...item, completed: !item.completed } : item
      )
    }));
  };

  const completedItems = Object.values(tourData).flat().filter(item => item.completed).length;
  const totalItems = Object.values(tourData).flat().length;
  const completionPercentage = Math.round((completedItems / totalItems) * 100);

  const checkInProgress = [
    { step: 1, label: "Welcome & Identity", status: "completed" },
    { step: 2, label: "Property Tour", status: "in-progress" },
    { step: 3, label: "Documentation", status: "pending" },
    { step: 4, label: "Keys & Access", status: "pending" },
    { step: 5, label: "Final Checklist", status: "pending" }
  ];

  return (
    <div className="flex flex-col lg:flex-row gap-6">
      {/* Left Column - Same as Documentation component */}
      <div className="lg:w-1/3 space-y-6">
        {/* Host Profile Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center space-x-4 mb-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-indigo-600 text-white flex items-center justify-center text-base font-bold">
              MJ
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Margaret Johnson</h3>
              <p className="text-sm text-gray-500">Host since 2025</p>
            </div>
          </div>
        </div>

        {/* Check-in Progress */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">CHECK-IN PROGRESS</h3>
          <div className="space-y-4">
            {checkInProgress.map((item) => (
              <div key={item.step} className="flex items-center space-x-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                  item.status === 'completed' ? 'bg-green-100 text-green-700' :
                  item.status === 'in-progress' ? 'bg-blue-100 text-blue-700' :
                  'bg-gray-100 text-gray-400'
                }`}>
                  {item.status === 'completed' ? '✓' : item.step}
                </div>
                <div className="flex-1">
                  <p className={`text-sm font-medium ${
                    item.status === 'completed' ? 'text-green-700' :
                    item.status === 'in-progress' ? 'text-blue-700' :
                    'text-gray-500'
                  }`}>
                    {item.label}
                  </p>
                  <p className="text-xs text-gray-400 capitalize">{item.status.replace('-', ' ')}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tenant Details */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">TENANT DETAILS</h3>
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <User className="w-4 h-4 text-gray-400" />
              <span className="text-sm text-gray-700">{application.applicant?.firstName} {application.applicant?.lastName}</span>
            </div>
            <div className="flex items-center space-x-3">
              <GraduationCap className="w-4 h-4 text-gray-400" />
              <span className="text-sm text-gray-700">Columbia Student</span>
            </div>
            <div className="flex items-center space-x-3">
              <Phone className="w-4 h-4 text-gray-400" />
              <span className="text-sm text-gray-700">{application.applicant?.phone || '+1 (555) 123-4567'}</span>
            </div>
            <div className="flex items-center space-x-3">
              <Mail className="w-4 h-4 text-gray-400" />
              <span className="text-sm text-gray-700">{application.applicant?.email || 'alex.kim@columbia.edu'}</span>
            </div>
          </div>
        </div>

        {/* Progress Summary */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-6 text-white">
          <div className="text-center">
            <div className="text-3xl font-bold mb-2">{completedItems}/{totalItems}</div>
            <div className="text-blue-100 text-sm">Complete</div>
            <div className="w-full bg-blue-500 rounded-full h-2 mt-3">
              <div 
                className="bg-white h-2 rounded-full transition-all duration-300"
                style={{ width: `${completionPercentage}%` }}
              ></div>
            </div>
            <p className="text-blue-100 text-sm mt-2">{completionPercentage}% Complete</p>
          </div>
        </div>
      </div>

      {/* Right Column - Property Tour Content */}
      <div className="lg:w-2/3">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-6 text-white">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-2xl font-bold">Property Tour - {application.applicant?.firstName} {application.applicant?.lastName}</h1>
                <p className="text-blue-100 mt-1">Step 2 of 5: Show the property and explain house rules</p>
              </div>
              <button
                onClick={onBack}
                className="text-white hover:text-blue-200 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="bg-gray-100 px-6 py-3">
            <div className="flex justify-between items-center text-sm text-gray-600">
              <span>Step 2 of 5</span>
              <span>{completionPercentage}% Complete</span>
            </div>
            <div className="w-full bg-gray-300 rounded-full h-2 mt-2">
              <div
                className="bg-green-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${completionPercentage}%` }}
              ></div>
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            <div className="space-y-6">
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Property Tour Checklist</h3>
                
                {/* Room & Private Areas */}
                <div className="mb-6">
                  <h4 className="font-semibold text-gray-700 mb-3 flex items-center">
                    <DoorOpen className="w-4 h-4 mr-2 text-blue-600" />
                    Room & Private Areas
                  </h4>
                  <div className="space-y-2">
                    {tourData.roomAndPrivate.map((item) => (
                      <label key={item.id} className="flex items-center space-x-3">
                        <input
                          type="checkbox"
                          checked={item.completed}
                          onChange={() => toggleChecklistItem('roomAndPrivate', item.id)}
                          className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                        />
                        <span className={`text-sm ${item.completed ? 'text-gray-500 line-through' : 'text-gray-700'}`}>
                          {item.label}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Common Areas */}
                <div className="mb-6">
                  <h4 className="font-semibold text-gray-700 mb-3 flex items-center">
                    <Home className="w-4 h-4 mr-2 text-green-600" />
                    Common Areas
                  </h4>
                  <div className="space-y-2">
                    {tourData.commonAreas.map((item) => (
                      <label key={item.id} className="flex items-center space-x-3">
                        <input
                          type="checkbox"
                          checked={item.completed}
                          onChange={() => toggleChecklistItem('commonAreas', item.id)}
                          className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                        />
                        <span className={`text-sm ${item.completed ? 'text-gray-500 line-through' : 'text-gray-700'}`}>
                          {item.label}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Safety & House Rules */}
                <div>
                  <h4 className="font-semibold text-gray-700 mb-3 flex items-center">
                    <Shield className="w-4 h-4 mr-2 text-orange-600" />
                    Safety & House Rules
                  </h4>
                  <div className="space-y-2">
                    {tourData.safetyAndRules.map((item) => (
                      <label key={item.id} className="flex items-center space-x-3">
                        <input
                          type="checkbox"
                          checked={item.completed}
                          onChange={() => toggleChecklistItem('safetyAndRules', item.id)}
                          className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                        />
                        <span className={`text-sm ${item.completed ? 'text-gray-500 line-through' : 'text-gray-700'}`}>
                          {item.label}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="border-t border-gray-200 p-6 bg-gray-50">
            <div className="flex justify-between items-center">
              <button
                onClick={onBack}
                className="flex items-center space-x-2 px-6 py-3 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Back</span>
              </button>

              <div className="flex space-x-3">
                <button
                  onClick={onBack}
                  className="px-6 py-3 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  Skip
                </button>
                <button
                  onClick={onComplete}
                  className="flex items-center space-x-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  <span>Next Step</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Check In Card Component (Keep the same)
const CheckInCard = ({ application, onStartCheckIn }) => {
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
          <button 
            onClick={() => onStartCheckIn(application)}
            className="text-sm font-medium text-white bg-green-600 px-3 py-2 rounded-lg hover:bg-green-700 flex items-center justify-center transition"
          >
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
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [currentStep, setCurrentStep] = useState(2); // Start with step 2 (Property Tour)
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

  const handleStartCheckIn = (application) => {
    setSelectedApplication(application);
    setCurrentStep(2); // Start with Property Tour
  };

  const handleStepComplete = () => {
    if (currentStep < 5) {
      setCurrentStep(currentStep + 1);
    } else {
      handleCheckInComplete();
    }
  };

  const handleCheckInComplete = () => {
    setSelectedApplication(null);
    setCurrentStep(2);
    toast.success('Check-in process completed successfully!');
  };

  const handleBackToList = () => {
    setSelectedApplication(null);
    setCurrentStep(2);
  };

  const handleBackToPreviousStep = () => {
    if (currentStep > 2) {
      setCurrentStep(currentStep - 1);
    } else {
      handleBackToList();
    }
  };

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
          {!selectedApplication ? (
            <>
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
                  <CheckInCard 
                    key={app._id} 
                    application={app} 
                    onStartCheckIn={handleStartCheckIn}
                  />
                ))}

                {isLoading && currentPage > 1 && (
                  <div className="flex justify-center py-6"><Loader2 className="w-6 h-6 animate-spin text-gray-400" /></div>
                )}
                {!hasMore && applications.length > 0 && (
                  <p className="text-center text-gray-500 py-6 text-sm">You've reached the end of the list.</p>
                )}
              </div>
            </>
          ) : currentStep === 2 ? (
            <PropertyTourContent
              application={selectedApplication}
              onComplete={handleStepComplete}
              onBack={handleBackToList}
            />
          ) : currentStep === 3 ? (
            <DocumentationVerification
              application={selectedApplication}
              onComplete={handleStepComplete}
              onBack={handleBackToPreviousStep}
            />
          ) : currentStep === 4 ? (
            <KeysAccess
              application={selectedApplication}
              onComplete={handleStepComplete}
              onBack={handleBackToPreviousStep}
            />
          ) : currentStep === 5 ? (
            <FinalChecklist
              application={selectedApplication}
              onComplete={handleCheckInComplete}
              onBack={handleBackToPreviousStep}
            />
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default CheckInsContent;