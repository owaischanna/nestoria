"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
import {
  Check, X, Edit2, MapPin, Calendar, Mail, Phone, CheckCircle,
  Upload, FileText, Shield, Loader2, User, Camera, Home,
  BookOpen, GraduationCap, Briefcase, DollarSign, Wifi,
  Utensils, Car, Shirt, PawPrint, TreePine, Save, ArrowLeft
} from 'lucide-react';
import RenterHeader from './RenterHeader';
import Sidebar from './RenterSidebar';

const fileToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
};

const getInitials = (firstName, lastName) => {
  if (!firstName) return '?';
  const first = firstName.charAt(0);
  const last = lastName ? lastName.charAt(0) : '';
  return `${first}${last}`.toUpperCase();
};

const formatDate = (dateString) => {
  if (!dateString) return '';
  try {
    if (dateString.match(/^\d{4}-\d{2}-\d{2}$/)) {
      const [year, month, day] = dateString.split('-');
      return new Date(year, month - 1, day).toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
    }
    return new Date(dateString).toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  } catch (e) {
    return dateString;
  }
};

const DocumentUploadRow = ({ docType, title, onFileChange, isUploading, isVerified, uploadedDoc }) => (
  <div className="flex items-center justify-between">
    <div>
      <p className={`text-sm font-medium ${uploadedDoc ? 'text-gray-700' : 'text-gray-500'}`}>{uploadedDoc?.fileName || title}</p>
      {isVerified && <p className="text-xs text-green-600 mt-1">Verified</p>}
      {uploadedDoc && !isVerified && <p className="text-xs text-yellow-600 mt-1">Pending verification</p>}
    </div>
    <label className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors cursor-pointer text-sm">
      {isUploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
      <span>{isUploading ? 'Uploading...' : 'Upload'}</span>
      <input type="file" className="hidden" accept=".pdf,.jpg,.jpeg,.png" onChange={(e) => onFileChange(docType, e)} disabled={isUploading} />
    </label>
  </div>
);

const EditProfileForm = ({
  editableData,
  handleProfileChange,
  handleRootChange,
  handleFeatureToggle,
  handleCancelEdit,
  handleSaveProfile,
  isSubmitting,
  handleFileChange,
  isUploading,
  getDocument
}) => (
  <div className="bg-white rounded-lg border border-gray-200 p-6">
    <div className="flex items-center justify-between mb-8">
      <div className="flex items-center space-x-4">
        <button onClick={handleCancelEdit} className="flex items-center space-x-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
          <ArrowLeft className="w-4 h-4" /><span>Back to Profile</span>
        </button>
        <div><h2 className="text-2xl font-bold text-gray-900">Edit Your Profile</h2><p className="text-gray-600">Update your profile to find the perfect home</p></div>
      </div>
      <button onClick={handleSaveProfile} disabled={isSubmitting} className="flex items-center space-x-2 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed">
        {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
        <span>{isSubmitting ? 'Saving...' : 'Save Changes'}</span>
      </button>
    </div>

    <div className="space-y-12">
      <section>
        <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center"><User className="w-6 h-6 mr-3 text-green-600" />Basic Information</h3>
        <div className="space-y-6">
          <div>
            <h4 className="text-lg font-semibold text-gray-800 mb-4">Profile Photo</h4>
            <div className="flex items-center space-x-6">
              <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center">
                {editableData.renterBasic?.profilePhoto ? (
                  <img src={editableData.renterBasic.profilePhoto} alt="Profile" className="w-20 h-20 rounded-full object-cover" />
                ) : (
                  <User className="w-8 h-8 text-gray-400" />
                )}
              </div>
              <div className="space-y-2">
                <label className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors cursor-pointer"><Camera className="w-4 h-4" /><span>Upload New Photo</span>
                  <input type="file" className="hidden" accept="image/*" onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onload = (e) => { handleProfileChange('renterBasic', 'profilePhoto', e.target.result); };
                      reader.readAsDataURL(file);
                    }
                  }} />
                </label>
                <button onClick={() => handleProfileChange('renterBasic', 'profilePhoto', null)} className="flex items-center space-x-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"><X className="w-4 h-4" /><span>Remove Photo</span></button>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div><label className="block text-sm font-semibold text-gray-700 mb-2">First Name *</label><input type="text" value={editableData.firstName} onChange={(e) => handleRootChange('firstName', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500" /></div>
            <div><label className="block text-sm font-semibold text-gray-700 mb-2">Last Name *</label><input type="text" value={editableData.lastName} onChange={(e) => handleRootChange('lastName', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500" /></div>
          </div>
          <div><label className="block text-sm font-semibold text-gray-700 mb-2">Email Address *</label><input type="email" value={editableData.email} className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed" readOnly /></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div><label className="block text-sm font-semibold text-gray-700 mb-2">Date of Birth *</label><input type="date" value={editableData.renterBasic?.dateOfBirth || ''} onChange={(e) => handleProfileChange('renterBasic', 'dateOfBirth', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500" /></div>
            <div><label className="block text-sm font-semibold text-gray-700 mb-2">Nationality</label><input type="text" value={editableData.renterBasic?.nationality || ''} onChange={(e) => handleProfileChange('renterBasic', 'nationality', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500" /></div>
          </div>
        </div>
      </section>
      <section>
        <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center"><BookOpen className="w-6 h-6 mr-3 text-green-600" />About & Bio</h3>
        <div className="space-y-6">
          <div><h4 className="text-lg font-semibold text-gray-800 mb-4">Tell hosts about yourself</h4><textarea value={editableData.renterAbout?.bio || ''} onChange={(e) => handleProfileChange('renterAbout', 'bio', e.target.value)} rows={6} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500" placeholder="Share your story..." /></div>
          <div>
            <h4 className="text-lg font-semibold text-gray-800 mb-4">Education & Occupation</h4>
            <div className="mb-6"><label className="block text-sm font-semibold text-gray-700 mb-3">Are you a student?</label><div className="space-y-2"><label className="flex items-center"><input type="radio" name="studentStatus" checked={editableData.renterAbout?.isStudent === true} onChange={() => handleProfileChange('renterAbout', 'isStudent', true)} className="mr-3 text-green-600" /><span className="text-gray-700">Yes, I'm a student</span></label><label className="flex items-center"><input type="radio" name="studentStatus" checked={editableData.renterAbout?.isStudent === false} onChange={() => handleProfileChange('renterAbout', 'isStudent', false)} className="mr-3 text-green-600" /><span className="text-gray-700">No, I'm working</span></label></div></div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div><label className="block text-sm font-semibold text-gray-700 mb-2">{editableData.renterAbout?.isStudent ? 'University/Institution *' : 'Company'}</label><input type="text" value={editableData.renterAbout?.university || ''} onChange={(e) => handleProfileChange('renterAbout', 'university', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg" /></div>
              <div><label className="block text-sm font-semibold text-gray-700 mb-2">{editableData.renterAbout?.isStudent ? 'Program *' : 'Job Title'}</label><input type="text" value={editableData.renterAbout?.program || ''} onChange={(e) => handleProfileChange('renterAbout', 'program', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg" /></div>
            </div>
            <div className="mt-4"><label className="block text-sm font-semibold text-gray-700 mb-2">Degree Level *</label><select value={editableData.renterAbout?.degreeLevel || "Master's"} onChange={(e) => handleProfileChange('renterAbout', 'degreeLevel', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg"><option>Bachelor's</option><option>Master's</option><option>PhD</option><option>Associate</option><option>Diploma</option></select></div>
          </div>
        </div>
      </section>
      <section>
        <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center"><Home className="w-6 h-6 mr-3 text-green-600" />Housing Preferences</h3>
        <div className="space-y-6">
          <div>
            <h4 className="text-lg font-semibold text-gray-800 mb-4">Monthly Budget Range *</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div><label className="block text-sm font-semibold text-gray-700 mb-2">Minimum</label><div className="relative"><DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" /><input type="number" value={editableData.renterHousing?.budgetMin || 0} onChange={(e) => handleProfileChange('renterHousing', 'budgetMin', parseInt(e.target.value))} className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg" /></div></div>
              <div><label className="block text-sm font-semibold text-gray-700 mb-2">Maximum</label><div className="relative"><DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" /><input type="number" value={editableData.renterHousing?.budgetMax || 1000} onChange={(e) => handleProfileChange('renterHousing', 'budgetMax', parseInt(e.target.value))} className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg" /></div></div>
            </div>
          </div>
          <div><label className="block text-sm font-semibold text-gray-700 mb-2">Preferred Location *</label><input type="text" value={editableData.renterHousing?.preferredLocation || ''} onChange={(e) => handleProfileChange('renterHousing', 'preferredLocation', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg" /></div>
          <div>
            <h4 className="text-lg font-semibold text-gray-800 mb-4">Room & Property Preferences</h4>
            <div className="mb-6"><label className="block text-sm font-semibold text-gray-700 mb-3">Room Type *</label><div className="grid grid-cols-1 md:grid-cols-3 gap-4">{[{ value: 'private', label: 'Private Room' }, { value: 'shared', label: 'Shared Room' }, { value: 'entire', label: 'Entire Place' }].map(type => (<label key={type.value} className="flex items-center p-4 border border-gray-300 rounded-lg hover:bg-gray-50 cursor-pointer"><input type="radio" name="roomType" value={type.value} checked={editableData.renterHousing?.roomType === type.value} onChange={(e) => handleProfileChange('renterHousing', 'roomType', e.target.value)} className="mr-3 text-green-600" /><span className="text-gray-700">{type.label}</span></label>))}</div></div>
            <div className="mb-6"><label className="block text-sm font-semibold text-gray-700 mb-3">Bathroom</label><div className="space-y-2"><label className="flex items-center"><input type="radio" name="bathroom" value="private" checked={editableData.renterHousing?.bathroomPreference === 'private'} onChange={(e) => handleProfileChange('renterHousing', 'bathroomPreference', e.target.value)} className="mr-3 text-green-600" /><span className="text-gray-700">Private</span></label><label className="flex items-center"><input type="radio" name="bathroom" value="shared" checked={editableData.renterHousing?.bathroomPreference === 'shared'} onChange={(e) => handleProfileChange('renterHousing', 'bathroomPreference', e.target.value)} className="mr-3 text-green-600" /><span className="text-gray-700">Shared</span></label></div></div>
            <div>
              <h4 className="text-lg font-semibold text-gray-800 mb-4">Must-Have Features</h4>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {[{ value: 'wifi', label: 'WIFI', icon: Wifi }, { value: 'kitchen', label: 'Kitchen Access', icon: Utensils }, { value: 'parking', label: 'Parking', icon: Car }, { value: 'laundry', label: 'Laundry', icon: Shirt }, { value: 'pets', label: 'Pet Friendly', icon: PawPrint }, { value: 'garden', label: 'Garden', icon: TreePine }].map(feature => (
                  <label key={feature.value} className={`flex items-center space-x-2 p-3 border rounded-lg cursor-pointer ${editableData.renterHousing?.mustHaveFeatures?.includes(feature.value) ? 'bg-green-100 border-green-300 text-green-700' : 'border-gray-300 hover:bg-gray-50'}`}>
                    <input type="checkbox" checked={editableData.renterHousing?.mustHaveFeatures?.includes(feature.value)} onChange={() => handleFeatureToggle(feature.value)} className="hidden" />
                    <feature.icon className="w-4 h-4" /><span className="text-sm font-medium">{feature.label}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      <section>
        <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center"><FileText className="w-6 h-6 mr-3 text-green-600" />Required Documents</h3>
        <div className="space-y-6">
          <div>
            <h4 className="text-lg font-semibold text-gray-800 mb-4">Identity Documents</h4>
            <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
              <DocumentUploadRow docType="identity" title="No ID uploaded" onFileChange={handleFileChange} isUploading={isUploading} isVerified={getDocument('identity')?.isVerified} uploadedDoc={getDocument('identity')} />
            </div>
          </div>
          <div>
            <h4 className="text-lg font-semibold text-gray-800 mb-4">Financial Verification</h4>
            <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
              <DocumentUploadRow docType="financial" title="No financial doc uploaded" onFileChange={handleFileChange} isUploading={isUploading} isVerified={getDocument('financial')?.isVerified} uploadedDoc={getDocument('financial')} />
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
);

const MainProfileView = ({ profileData, stats, getDocument, handleFileChange, isUploading, isVerifyingPhone, setIsEditing }) => (
  <div className="space-y-6">
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex flex-col sm:flex-row sm:items-start justify-between">
        <div className="flex items-start space-x-4 mb-4 sm:mb-0">
          <div className="w-20 h-20 bg-gray-300 rounded-full flex items-center justify-center">
            {profileData.renterBasic?.profilePhoto ? (
              <img src={profileData.renterBasic.profilePhoto} alt="Profile" className="w-20 h-20 rounded-full object-cover" />
            ) : (
              <span className="text-2xl font-bold text-gray-600">{getInitials(profileData.firstName, profileData.lastName)}</span>
            )}
          </div>
          <div>
            <div className="flex items-center space-x-2 mb-1">
              <h1 className="text-2xl font-bold text-gray-900">{profileData.firstName} {profileData.lastName}</h1>
              {profileData.isEmailVerified && <span className="flex items-center px-2 py-1 bg-green-100 text-green-800 rounded text-xs font-medium"><CheckCircle className="w-3 h-3 mr-1" />Verified</span>}
            </div>
            <p className="text-gray-700 font-medium mb-2">{profileData.renterAbout?.occupation || 'Occupation not set'}</p>
            <div className="space-y-1 text-sm text-gray-600">
              <div className="flex items-center"><Calendar className="w-4 h-4 mr-2" />Member since {formatDate(profileData.createdAt)}</div>
              <div className="flex items-center"><Mail className="w-4 h-4 mr-2" />{profileData.email}</div>
              <div className="flex items-center"><Phone className="w-4 h-4 mr-2" />{profileData.phone || 'No phone provided'}</div>
              <div className="flex items-center"><MapPin className="w-4 h-4 mr-2" />{profileData.renterBasic?.nationality || 'Nationality not set'}</div>
            </div>
          </div>
        </div>
        <button onClick={() => setIsEditing(true)} className="flex items-center justify-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors w-full sm:w-auto">
          <Edit2 className="w-4 h-4" /><span>Edit Profile</span>
        </button>
      </div>
    </div>

    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-4">Contact Verification</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <div className="flex justify-between items-center mb-2"><h3 className="font-medium text-gray-900">Email Address</h3>{profileData.isEmailVerified ? <Check className="h-5 w-5 text-green-600" /> : <X className="h-5 w-5 text-red-500" />}</div>
          <p className="text-gray-600">{profileData.email}</p>
          {profileData.isEmailVerified && <p className="text-xs text-gray-500 mt-1">Verified</p>}
        </div>
        <div>
          <div className="flex justify-between items-center mb-2"><h3 className="font-medium text-gray-900">Phone Number</h3>{profileData.isPhoneVerified ? <Check className="h-5 w-5 text-green-600" /> : <X className="h-5 w-5 text-red-500" />}</div>
          <p className="text-gray-600">{profileData.phone || 'No phone provided'}</p>
          {!profileData.isPhoneVerified && profileData.phone && (
            <div className="mt-3">
              <button onClick={() => toast('Phone verification coming soon!', { icon: '🚧' })} disabled={isVerifyingPhone} className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:bg-blue-400 text-sm">
                {isVerifyingPhone ? <Loader2 className="w-4 h-4 animate-spin" /> : <Shield className="w-4 h-4" />}
                <span>{isVerifyingPhone ? 'Verifying...' : 'Verify Phone Number'}</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>

    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-4">About {profileData.firstName}</h2>
      <div className="space-y-4 text-gray-700 leading-relaxed"><p>{profileData.renterAbout?.bio || 'No bio provided. Click "Edit Profile" to add one!'}</p></div>
    </div>

    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-4">Personal Information</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div><h3 className="font-medium text-gray-900 mb-2">Education</h3><p className="text-gray-600">{profileData.renterAbout?.program || 'N/A'} ({profileData.renterAbout?.degreeLevel || 'N/A'})</p></div>
        <div><h3 className="font-medium text-gray-900 mb-2">Occupation</h3><p className="text-gray-600">{profileData.renterAbout?.occupation || 'N/A'}</p></div>
        <div><h3 className="font-medium text-gray-900 mb-2">Nationality</h3><p className="text-gray-600">{profileData.renterBasic?.nationality || 'N/A'}</p></div>
        <div><h3 className="font-medium text-gray-900 mb-2">Languages</h3><p className="text-gray-600">{profileData.languages?.join(', ') || 'N/A'}</p></div>
      </div>
    </div>

    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-4">Housing Preferences</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <div><h3 className="font-medium text-gray-900 mb-1">Budget Range</h3><p className="text-gray-600">€{profileData.renterHousing?.budgetMin || 0} - €{profileData.renterHousing?.budgetMax || 0}</p><p className="text-xs text-gray-500">per month</p></div>
        <div><h3 className="font-medium text-gray-900 mb-1">Room Type</h3><p className="text-gray-600 capitalize">{profileData.renterHousing?.roomType || 'N/A'}</p></div>
        <div><h3 className="font-medium text-gray-900 mb-1">Preferred Location</h3><p className="text-gray-600">{profileData.renterHousing?.preferredLocation || 'N/A'}</p></div>
      </div>
      <div>
        <h3 className="font-medium text-gray-900 mb-2">Must-Have Features</h3>
        <div className="flex flex-wrap gap-2">
          {profileData.renterHousing?.mustHaveFeatures?.length > 0 ? profileData.renterHousing.mustHaveFeatures.map(feature => (
            <span key={feature} className="px-3 py-1 bg-green-100 text-green-800 rounded text-sm capitalize">{feature}</span>
          )) : <p className="text-sm text-gray-500">No must-have features listed.</p>}
        </div>
      </div>
    </div>

    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-4">Required Documents</h2>
      <div className="space-y-6">
        <div>
          <h3 className="font-medium text-gray-900 mb-3">Identity Documents</h3>
          <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
            <DocumentUploadRow docType="identity" title="No ID uploaded" onFileChange={handleFileChange} isUploading={isUploading} isVerified={getDocument('identity')?.isVerified} uploadedDoc={getDocument('identity')} />
          </div>
        </div>
        <div>
          <h3 className="font-medium text-gray-900 mb-3">Financial Verification</h3>
          <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
            <DocumentUploadRow docType="financial" title="No financial doc uploaded" onFileChange={handleFileChange} isUploading={isUploading} isVerified={getDocument('financial')?.isVerified} uploadedDoc={getDocument('financial')} />
          </div>
        </div>
      </div>
    </div>
  </div>
);

const RenterProfile = () => {
  const { user: authUser, loading: authLoading } = useAuth();
  const router = useRouter();

  const [isEditing, setIsEditing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [isVerifyingPhone, setIsVerifyingPhone] = useState(false);

  const [profileData, setProfileData] = useState(null);
  const [stats, setStats] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const defaultEditableData = {
    firstName: '', lastName: '', email: '', phone: '',
    renterBasic: { dateOfBirth: '', nationality: '', profilePhoto: null },
    renterAbout: { bio: '', isStudent: true, university: '', program: '', degreeLevel: "Master's", occupation: 'Graduate Student' },
    renterHousing: { budgetMin: 0, budgetMax: 1000, preferredLocation: '', roomType: 'private', bathroomPreference: 'private', mustHaveFeatures: [] }
  };

  const [editableData, setEditableData] = useState(defaultEditableData);

  const fetchProfileData = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/user/me');
      if (!response.ok) throw new Error('Failed to fetch profile data');
      const result = await response.json();

      const userData = result.data.user;
      setProfileData(userData);
      setStats(result.data.stats);

      setEditableData({
        firstName: userData.firstName || '',
        lastName: userData.lastName || '',
        email: userData.email || '',
        phone: userData.phone || '',
        renterBasic: userData.renterBasic || defaultEditableData.renterBasic,
        renterAbout: userData.renterAbout || defaultEditableData.renterAbout,
        renterHousing: userData.renterHousing || defaultEditableData.renterHousing
      });
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!authLoading && (!authUser || authUser.role !== 'renter')) {
      router.push('/');
      return;
    }
    if (authUser) {
      fetchProfileData();
    }
  }, [authUser, authLoading, router]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleProfileChange = (section, field, value) => {
    setEditableData(prev => ({
      ...prev,
      [section]: { ...prev[section], [field]: value }
    }));
  };

  const handleRootChange = (e) => {
    const { name, value } = e.target;
    setEditableData(prev => ({ ...prev, [name]: value }));
  };

  const handleFeatureToggle = (feature) => {
    const currentFeatures = [...(editableData.renterHousing.mustHaveFeatures || [])];
    const newFeatures = currentFeatures.includes(feature)
      ? currentFeatures.filter(f => f !== feature)
      : [...currentFeatures, feature];
    handleProfileChange('renterHousing', 'mustHaveFeatures', newFeatures);
  };

  const handleFileChange = async (docType, event) => {
    const file = event.target.files[0];
    if (!file) return;

    setIsUploading(true);
    const toastId = toast.loading(`Uploading ${docType} document...`);

    try {
      const fileData = await fileToBase64(file);
      const payload = {
        docType: docType,
        fileName: file.name,
        fileSize: `${(file.size / 1024 / 1024).toFixed(1)} MB`,
        fileData: fileData
      };

      const response = await fetch('/api/user/documents', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const result = await response.json();
      if (!response.ok) throw new Error(result.message || 'File upload failed.');

      toast.success('Document uploaded!', { id: toastId });
      fetchProfileData();
    } catch (error) {
      toast.error(error.message, { id: toastId });
    } finally {
      setIsUploading(false);
      event.target.value = null;
    }
  };

  const handleSaveProfile = async () => {
    setIsSubmitting(true);
    const toastId = toast.loading('Saving profile...');

    try {
      const response = await fetch('/api/user/me', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editableData)
      });

      const result = await response.json();
      if (!response.ok) throw new Error(result.message || 'Failed to save profile.');

      const userData = result.data;
      setProfileData(userData);
      setEditableData({
        firstName: userData.firstName || '',
        lastName: userData.lastName || '',
        email: userData.email || '',
        phone: userData.phone || '',
        renterBasic: userData.renterBasic || defaultEditableData.renterBasic,
        renterAbout: userData.renterAbout || defaultEditableData.renterAbout,
        renterHousing: userData.renterHousing || defaultEditableData.renterHousing
      });

      toast.success('Profile saved!', { id: toastId });
      setIsEditing(false);
    } catch (error) {
      toast.error(error.message, { id: toastId });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditableData({
      firstName: profileData.firstName || '',
      lastName: profileData.lastName || '',
      email: profileData.email || '',
      phone: profileData.phone || '',
      renterBasic: profileData.renterBasic || defaultEditableData.renterBasic,
      renterAbout: profileData.renterAbout || defaultEditableData.renterAbout,
      renterHousing: profileData.renterHousing || defaultEditableData.renterHousing
    });
  };

  const getDocument = (docType) => {
    return profileData?.renterDocuments?.find(doc => doc.docType === docType);
  };

  if (authLoading || isLoading || !profileData || !stats) {
    return (
      <div className="flex min-h-screen bg-gray-50">
        <Sidebar />
        <div className="flex-1 flex flex-col">
          <RenterHeader />
          <main className="flex-1 flex items-center justify-center">
            <Loader2 className="w-8 h-8 animate-spin text-green-600" />
          </main>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-y-auto">
        <RenterHeader />
        <div className="flex-1 p-6">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col lg:flex-row gap-6">
              <div className="w-full lg:w-1/4 space-y-6">
                <div className="bg-white rounded-lg border border-gray-200 p-5">
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">PROFILE STATISTICS</h2>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center"><span className="text-sm text-gray-600">Total Applications</span><span className="font-bold text-gray-900">{stats?.totalApplications || 0}</span></div>
                    <div className="flex justify-between items-center"><span className="text-sm text-gray-600">Completed Stays</span><span className="font-bold text-gray-900">{stats?.completedStays || 0}</span></div>
                    <div className="flex justify-between items-center"><span className="text-sm text-gray-600">Reviews Given</span><span className="font-bold text-gray-900">{stats?.reviewsGiven || 0}</span></div>
                  </div>
                </div>
                <div className="bg-white rounded-lg border border-gray-200 p-5">
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">PROFILE COMPLETION</h2>
                  <div className="flex items-center justify-between mb-3"><span className="text-sm text-gray-600">Profile Completion</span><span className="text-xl font-bold text-green-600">80%</span></div>
                  <div className="w-full bg-gray-200 rounded-full h-2 mb-4"><div className="bg-green-600 h-2 rounded-full" style={{ width: '80%' }}></div></div>
                  <p className="text-sm text-gray-600 mb-2">Complete your profile:</p>
                  <ul className="space-y-1 text-sm text-gray-600">
                    {!profileData.renterBasic?.profilePhoto && <li className="flex items-center"><span className="w-1.5 h-1.5 bg-gray-400 rounded-full mr-2"></span>Add profile photo</li>}
                    {!profileData.isPhoneVerified && <li className="flex items-center"><span className="w-1.5 h-1.5 bg-gray-400 rounded-full mr-2"></span>Verify Phone Number</li>}
                  </ul>
                </div>
                <div className="bg-blue-50 rounded-lg border border-blue-200 p-5">
                  <h2 className="text-lg font-semibold text-blue-900 mb-3">APPLICATION TIPS</h2>
                  <ul className="space-y-2 text-sm text-blue-800">
                    <li>• Complete profiles get 60% more responses</li>
                    <li>• Add personal details to build trust</li>
                  </ul>
                </div>
              </div>
              <div className="w-full lg:w-3/4">
                {isEditing ?
                  <EditProfileForm
                    editableData={editableData}
                    handleProfileChange={handleProfileChange}
                    handleRootChange={handleRootChange}
                    handleFeatureToggle={handleFeatureToggle}
                    handleCancelEdit={handleCancelEdit}
                    handleSaveProfile={handleSaveProfile}
                    isSubmitting={isSubmitting}
                    handleFileChange={handleFileChange}
                    isUploading={isUploading}
                    getDocument={getDocument}
                  /> :
                  <MainProfileView
                    profileData={profileData}
                    stats={stats}
                    getDocument={getDocument}
                    handleFileChange={handleFileChange}
                    isUploading={isUploading}
                    isVerifyingPhone={isVerifyingPhone}
                    setIsEditing={setIsEditing}
                  />
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RenterProfile;