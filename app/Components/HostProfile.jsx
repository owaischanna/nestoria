"use client";

import React, { useState, useEffect } from "react";
import {
  MapPin, Calendar, Languages, Star, Edit2, CheckCircle, Wifi,
  Utensils, Car, Shirt, PawPrint, TreePine, Eye, MessageCircle,
  UserCheck, Clock, Trash2, ExternalLink, Loader2
} from "lucide-react";
import HostSidebar from "./HostSidebar";
import HostHeader from "./HostHeader";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/navigation";
import toast from 'react-hot-toast';

// Helper to format date
const formatDate = (dateString) => {
  if (!dateString) return 'N/A';
  return new Date(dateString).toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
};

// Helper for Initials
const getInitials = (firstName, lastName) => {
  if (!firstName) return '?';
  const first = firstName.charAt(0);
  const last = lastName ? lastName.charAt(0) : '';
  return `${first}${last}`.toUpperCase();
};

export default function HostProfile() {
  const { user: authUser, loading: authLoading } = useAuth();
  const router = useRouter();
  const [profileData, setProfileData] = useState(null);
  const [stats, setStats] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false); // State to toggle edit mode

  // State for editable fields
  const [editableData, setEditableData] = useState({
    about: "",
    interests: [],
    emergencyContact: { name: "", phone: "", relationship: "" },
    hostingPreferences: { guestTypes: [], stayDuration: [], smokingPolicy: "", petPolicy: "", visitorPolicy: "", responseTime: "" },
  });

  useEffect(() => {
    if (!authLoading && (!authUser || authUser.role !== 'host')) {
      router.push('/'); // Redirect if not a host
      return;
    }
    if (authUser) {
      fetchProfileData();
    }
  }, [authUser, authLoading, router]);

  const fetchProfileData = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/user/me');
      if (!response.ok) throw new Error('Failed to fetch profile data');
      const result = await response.json();
      setProfileData(result.data.user);
      setStats(result.data.stats);
      // Initialize editableData with fetched data or defaults
      setEditableData({
        about: result.data.user.about || "",
        interests: result.data.user.interests || [],
        emergencyContact: result.data.user.emergencyContact || { name: "", phone: "", relationship: "" },
        hostingPreferences: result.data.user.hostingPreferences || { guestTypes: [], stayDuration: [], smokingPolicy: "No Smoking", petPolicy: "No Pets", visitorPolicy: "Visitors Allowed with Notice", responseTime: "Within 4 hours" },
      });
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e, section = null, field = null) => {
    const { name, value } = e.target;
    if (section) {
      setEditableData(prev => ({
        ...prev,
        [section]: {
          ...prev[section],
          [field || name]: value
        }
      }));
    } else {
      setEditableData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleCheckboxChange = (section, field, value) => {
    setEditableData(prev => {
      const currentValues = prev[section][field] || [];
      const newValues = currentValues.includes(value)
        ? currentValues.filter(item => item !== value)
        : [...currentValues, value];
      return { ...prev, [section]: { ...prev[section], [field]: newValues } };
    });
  };

  const handleRadioChange = (section, field, value) => {
    setEditableData(prev => ({
      ...prev,
      [section]: { ...prev[section], [field]: value }
    }));
  };

  const handleSaveChanges = async () => {
    setIsSubmitting(true);
    const toastId = toast.loading('Saving changes...');
    try {
      const response = await fetch('/api/user/me', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editableData) // Send only the editable data
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.message || 'Failed to save changes');

      setProfileData(result.data); // Update profile with new data
      setEditableData({ // Reset editable state from new data
        about: result.data.about || "",
        interests: result.data.interests || [],
        emergencyContact: result.data.emergencyContact || { name: "", phone: "", relationship: "" },
        hostingPreferences: result.data.hostingPreferences || { guestTypes: [], stayDuration: [], smokingPolicy: "No Smoking", petPolicy: "No Pets", visitorPolicy: "Visitors Allowed with Notice", responseTime: "Within 4 hours" },
      });
      toast.success('Profile updated!', { id: toastId });
      setIsEditing(false); // Exit edit mode
    } catch (error) {
      toast.error(error.message, { id: toastId });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Add isSubmitting state
  const [isSubmitting, setIsSubmitting] = useState(false);


  if (isLoading || !profileData || !stats) {
    return (
      <div className="flex min-h-screen bg-gray-50">
        <HostSidebar />
        <div className="flex-1 flex flex-col">
          <HostHeader />
          <main className="flex-1 flex items-center justify-center">
            <Loader2 className="w-8 h-8 animate-spin text-green-600" />
          </main>
        </div>
      </div>
    );
  }

  const {
    firstName, lastName, email, location, createdAt, languages,
    isVerified, phone, isPhoneVerified, achievements, about, interests,
    emergencyContact, hostingPreferences
  } = profileData;

  return (
    <div className="flex min-h-screen bg-gray-50">
      <HostSidebar />
      <div className="flex-1 flex flex-col">
        <HostHeader />
        <main className="p-6 overflow-y-auto">
          <h1 className="text-2xl font-bold text-gray-800 mb-6">Profile</h1>
          <div className="flex flex-col lg:flex-row gap-6">
            <div className="lg:w-1/3 space-y-6">
              <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
                <h2 className="text-sm font-semibold text-gray-600 mb-4">HOST STATISTICS</h2>
                <ul className="text-sm text-gray-700 space-y-2">
                  <li className="flex justify-between"><span>Total Properties</span><span className="font-medium">{stats.totalProperties}</span></li>
                  <li className="flex justify-between"><span>Active Bookings</span><span className="font-medium">{stats.activeBookings}</span></li>
                  <li className="flex justify-between"><span>Total Reviews</span><span className="font-medium">{stats.totalReviews}</span></li>
                  <li className="flex justify-between"><span>Response Rate</span><span className="font-semibold text-green-600">{stats.responseRate}</span></li>
                </ul>
              </div>

              <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
                <h2 className="text-sm font-semibold text-gray-600 mb-3">PROFILE COMPLETION</h2>
                <div className="w-full bg-gray-200 rounded-full h-2 mb-2"><div className="bg-green-600 h-2 rounded-full" style={{ width: "85%" }}></div></div>
                <p className="text-xs text-gray-600 mb-2">Profile Completion <span className="font-medium">85%</span></p>
                <p className="text-xs text-gray-600">Complete your profile:</p>
                <ul className="text-xs text-yellow-600 mt-1 list-disc list-inside space-y-1">
                  {!profileData.profileImage && <li>Add Profile Photos</li>}
                  {!isPhoneVerified && <li>Verify Phone Number</li>}
                </ul>
              </div>
            </div>

            <div className="lg:w-2/3 space-y-6">
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <div className="flex justify-between items-start flex-wrap gap-3">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-bold text-xl">{getInitials(firstName, lastName)}</div>
                    <div>
                      <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">{firstName} {lastName} {isVerified && <span className="flex items-center text-green-600 text-sm"><CheckCircle size={16} className="mr-1" /> Verified Host</span>}</h2>
                      <p className="flex flex-wrap items-center text-gray-600 text-sm gap-2">
                        {location && <><MapPin size={14} /> {location}</>}
                        {location && <span>•</span>}
                        <Calendar size={14} /> Host since {formatDate(createdAt)}
                        {languages?.length > 0 && <span>•</span>}
                        {languages?.length > 0 && <><Languages size={14} /> {languages.join(', ')}</>}
                      </p>
                      <div className="flex items-center mt-1">
                        <div className="flex text-yellow-400">{Array.from({ length: 5 }).map((_, i) => (<Star key={i} size={16} fill={i < 4 ? "#facc15" : "none"} />))}</div>
                        <span className="ml-2 text-sm text-gray-600">({stats.totalReviews || 0} reviews)</span>
                      </div>
                    </div>
                  </div>
                  <button onClick={() => setIsEditing(!isEditing)} className={`px-4 py-2 text-sm rounded-lg flex items-center gap-2 transition-all ${isEditing ? 'bg-gray-200 text-gray-800' : 'bg-green-600 hover:bg-green-700 text-white'}`}>
                    <Edit2 size={16} /> {isEditing ? 'Cancel' : 'Edit Profile'}
                  </button>
                </div>
                {achievements?.length > 0 && <div className="mt-5"><h3 className="text-sm font-semibold text-gray-700 mb-2">Host Achievements</h3><div className="flex flex-wrap gap-2">{achievements.map(ach => (<span key={ach} className="px-3 py-1 rounded-full bg-yellow-100 text-yellow-700 text-sm font-medium">🌟 {ach}</span>))}</div></div>}
              </div>

              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <div className="flex justify-between items-center mb-3"><h3 className="text-base font-semibold text-gray-700">About {firstName}</h3>{!isEditing && <Edit2 size={16} className="text-gray-400 cursor-pointer hover:text-gray-600" onClick={() => setIsEditing(true)} />}</div>
                {isEditing ? (
                  <textarea name="about" value={editableData.about} onChange={handleInputChange} className="w-full h-40 p-2 border border-gray-300 rounded-lg text-sm" />
                ) : (
                  <p className="text-sm text-gray-700 leading-relaxed">{editableData.about || "No profile description provided."}</p>
                )}
                <div className="mt-4">
                  <h4 className="text-sm font-semibold text-gray-700 mb-2">Interests & Hobbies</h4>
                  {isEditing ? (
                    <input type="text" name="interests" value={editableData.interests.join(', ')} onChange={(e) => setEditableData(prev => ({ ...prev, interests: e.target.value.split(',').map(s => s.trim()) }))} className="w-full p-2 border border-gray-300 rounded-lg text-sm" placeholder="Gardening, Cooking, Reading..." />
                  ) : (
                    <div className="flex flex-wrap gap-2">{editableData.interests.length > 0 ? editableData.interests.map(tag => (<span key={tag} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">{tag}</span>)) : <p className="text-sm text-gray-500">No interests listed.</p>}</div>
                  )}
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-6">Contact Information</h2>
                <div className="space-y-6">
                  <div className="border-b pb-4"><label className="block text-sm font-semibold text-gray-700 mb-2">Email Address *</label><input type="email" value={email} className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed" readOnly /><p className="text-sm text-gray-500 mt-1">This is your primary contact email.</p></div>
                  <div className="border-b pb-4"><div className="flex justify-between items-center mb-2"><label className="block text-sm font-semibold text-gray-700">Phone Number</label><span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${isPhoneVerified ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>{isPhoneVerified ? 'Verified' : 'Not Verified'}</span></div><input type="tel" value={phone || 'N/A'} className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed" readOnly /><p className="text-sm text-gray-500 mt-1">Phone verification helps build trust.</p></div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-4">Emergency Contact</label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div><label className="block text-xs font-medium text-gray-600 mb-1">Contact Name</label><input type="text" name="name" value={editableData.emergencyContact.name} onChange={(e) => handleInputChange(e, 'emergencyContact')} readOnly={!isEditing} className={`w-full px-3 py-2 border border-gray-300 rounded-lg ${!isEditing ? 'bg-gray-100 cursor-not-allowed' : ''}`} /></div>
                      <div><label className="block text-xs font-medium text-gray-600 mb-1">Phone Number</label><input type="tel" name="phone" value={editableData.emergencyContact.phone} onChange={(e) => handleInputChange(e, 'emergencyContact')} readOnly={!isEditing} className={`w-full px-3 py-2 border border-gray-300 rounded-lg ${!isEditing ? 'bg-gray-100 cursor-not-allowed' : ''}`} /></div>
                      <div className="md:col-span-2"><label className="block text-xs font-medium text-gray-600 mb-1">Relationship</label><input type="text" name="relationship" value={editableData.emergencyContact.relationship} onChange={(e) => handleInputChange(e, 'emergencyContact')} readOnly={!isEditing} className={`w-full px-3 py-2 border border-gray-300 rounded-lg ${!isEditing ? 'bg-gray-100 cursor-not-allowed' : ''}`} /></div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-6">Hosting Preferences</h2>
                <div className="space-y-8">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Preferred Guest Types</h3>
                    <div className="flex flex-wrap gap-4">{["Students", "Young Professionals", "Business Travelers", "Families", "Couples"].map((type) => (<label key={type} className="flex items-center"><input type="checkbox" checked={editableData.hostingPreferences.guestTypes?.includes(type)} onChange={() => handleCheckboxChange('hostingPreferences', 'guestTypes', type)} disabled={!isEditing} className="rounded border-gray-300 text-green-600 focus:ring-green-500 disabled:bg-gray-200" /><span className="ml-2 text-sm text-gray-700">{type}</span></label>))}</div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Preferred Stay Duration</h3>
                    <div className="space-y-3">{[{ label: "Short-term (1-3 months)", key: "short" }, { label: "Medium-term (3-12 months)", key: "medium" }, { label: "Long-term (12+ months)", key: "long" }].map((item) => (<label key={item.key} className="flex items-center"><input type="checkbox" checked={editableData.hostingPreferences.stayDuration?.includes(item.key)} onChange={() => handleCheckboxChange('hostingPreferences', 'stayDuration', item.key)} disabled={!isEditing} className="rounded border-gray-300 text-green-600 focus:ring-green-500 disabled:bg-gray-200" /><span className="ml-2 text-sm text-gray-700">{item.label}</span></label>))}</div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div><h3 className="text-lg font-semibold text-gray-800 mb-4">Smoking Policy</h3><div className="space-y-2">{["No Smoking", "Smoking Allowed", "Smoking in Designated Areas"].map((policy) => (<label key={policy} className="flex items-center"><input type="radio" name="smokingPolicy" value={policy} checked={editableData.hostingPreferences.smokingPolicy === policy} onChange={(e) => handleRadioChange('hostingPreferences', 'smokingPolicy', e.target.value)} disabled={!isEditing} className="text-green-600 focus:ring-green-500 disabled:bg-gray-200" /><span className="ml-2 text-sm text-gray-700">{policy}</span></label>))}</div></div>
                    <div><h3 className="text-lg font-semibold text-gray-800 mb-4">Pet Policy</h3><div className="space-y-2">{["No Pets", "Pets Allowed", "Small Pets Only"].map((policy) => (<label key={policy} className="flex items-center"><input type="radio" name="petPolicy" value={policy} checked={editableData.hostingPreferences.petPolicy === policy} onChange={(e) => handleRadioChange('hostingPreferences', 'petPolicy', e.target.value)} disabled={!isEditing} className="text-green-600 focus:ring-green-500 disabled:bg-gray-200" /><span className="ml-2 text-sm text-gray-700">{policy}</span></label>))}</div></div>
                  </div>
                  <div><h3 className="text-lg font-semibold text-gray-800 mb-4">Guest Visits</h3><div className="space-y-2">{["No Visitors", "Visitors Allowed with Notice", "Visitors Allowed Freely"].map((policy) => (<label key={policy} className="flex items-center"><input type="radio" name="visitorPolicy" value={policy} checked={editableData.hostingPreferences.visitorPolicy === policy} onChange={(e) => handleRadioChange('hostingPreferences', 'visitorPolicy', e.target.value)} disabled={!isEditing} className="text-green-600 focus:ring-green-500 disabled:bg-gray-200" /><span className="ml-2 text-sm text-gray-700">{policy}</span></label>))}</div></div>
                  <div><h3 className="text-lg font-semibold text-gray-800 mb-4">Communication Preferences</h3><div className="flex items-center gap-4"><span className="text-sm text-gray-600">Expected Response Time:</span><select name="responseTime" value={editableData.hostingPreferences.responseTime} onChange={(e) => handleInputChange(e, 'hostingPreferences')} disabled={!isEditing} className={`border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 ${!isEditing ? 'bg-gray-100 cursor-not-allowed' : ''}`}><option>Within 1 hour</option><option>Within 2 hours</option><option>Within 4 hours</option><option>Within 12 hours</option><option>Within 24 hours</option></select></div></div>
                </div>
              </div>

              {isEditing && (
                <div className="flex justify-end pt-4 sticky bottom-0 bg-gray-50 py-4">
                  <button onClick={handleSaveChanges} disabled={isSubmitting} className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors flex items-center disabled:bg-gray-400">
                    {isSubmitting && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                    {isSubmitting ? 'Saving...' : 'Save Changes'}
                  </button>
                </div>
              )}

            </div>
          </div>
        </main>
      </div>
    </div>
  );
}