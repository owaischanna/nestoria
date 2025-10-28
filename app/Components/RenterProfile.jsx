"use client";
import React, { useState } from 'react';
import { 
  Check, X, Edit2, MapPin, Calendar, Mail, Phone, CheckCircle, 
  Upload, FileText, Shield, Loader2, User, Camera, Home,
  BookOpen, GraduationCap, Briefcase, DollarSign, Wifi,
  Utensils, Car, Shirt, PawPrint, TreePine, Save, ArrowLeft
} from 'lucide-react';
import RenterHeader from './RenterHeader';
import Sidebar from './RenterSidebar';

const RenterProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // State for contact verification
  const [contactInfo, setContactInfo] = useState({
    email: 'anna.chen@nyu.edu',
    phone: '+1 (555) 123-4567',
    isEmailVerified: true,
    isPhoneVerified: false,
    emailVerificationDate: 'Oct 28, 2024'
  });

  // State for document uploads
  const [documents, setDocuments] = useState({
    identity: {
      type: 'Government-issued Photo ID',
      status: 'uploaded',
      file: 'Driver\'s License uploaded successfully',
      size: '2.3 MB',
      uploadedAt: '5 minutes ago',
      fileUrl: null,
      verified: false
    },
    financial: {
      type: 'Bank Statement',
      status: 'uploaded',
      file: 'Chase bank statement uploaded',
      size: '1.8 MB',
      uploadedAt: '3 minutes ago',
      fileUrl: null,
      verified: false
    }
  });

  // State for profile data
  const [profileData, setProfileData] = useState({
    basic: {
      firstName: 'Anna',
      lastName: 'Chen',
      email: 'anna.chen@nyu.edu',
      dateOfBirth: '1999-03-15',
      nationality: 'Singapore',
      profilePhoto: null
    },
    about: {
      bio: `Hi! I'm Anna, a Computer Science graduate student at University of Barcelona from Singapore. I'm looking for a clean, quiet place to live while I complete my Master's degree. I'm responsible, respectful, and enjoy studying in a peaceful environment.

I don't smoke or have pets, and I'm generally quiet and focused on my studies. I enjoy cooking, reading, and exploring NYC's coffee shops and museums in my free time. I'm looking for a place where I can feel at home while pursuing my academic goals.`,
      isStudent: true,
      university: 'University of Barcelona',
      program: 'Computer Science',
      degreeLevel: 'Master\'s',
      occupation: 'Graduate Student'
    },
    housing: {
      budgetMin: 600,
      budgetMax: 900,
      preferredLocation: 'Cantabria',
      roomType: 'private',
      bathroomPreference: 'private',
      mustHaveFeatures: ['wifi', 'kitchen']
    }
  });

  const [isUploading, setIsUploading] = useState(false);
  const [isVerifyingPhone, setIsVerifyingPhone] = useState(false);

  // Handle phone verification
  const handlePhoneVerification = async () => {
    setIsVerifyingPhone(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setContactInfo(prev => ({
      ...prev,
      isPhoneVerified: true
    }));
    setIsVerifyingPhone(false);
  };

  // Handle document upload
  const handleDocumentUpload = (docType, file) => {
    setIsUploading(true);
    setTimeout(() => {
      setDocuments(prev => ({
        ...prev,
        [docType]: {
          ...prev[docType],
          status: 'uploaded',
          file: file.name,
          size: `${(file.size / 1024 / 1024).toFixed(1)} MB`,
          uploadedAt: 'Just now',
          fileUrl: URL.createObjectURL(file),
          verified: false // Reset verification when new file is uploaded
        }
      }));
      setIsUploading(false);
    }, 1500);
  };

  // Handle file input change
  const handleFileChange = (docType, event) => {
    const file = event.target.files[0];
    if (file) {
      handleDocumentUpload(docType, file);
    }
  };

  // Handle document verification
  const handleDocumentVerification = (docType) => {
    setDocuments(prev => ({
      ...prev,
      [docType]: {
        ...prev[docType],
        verified: true
      }
    }));
  };

  // Handle profile data changes
  const handleProfileChange = (section, field, value) => {
    setProfileData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  // Handle feature toggle
  const handleFeatureToggle = (feature) => {
    const currentFeatures = [...profileData.housing.mustHaveFeatures];
    const newFeatures = currentFeatures.includes(feature)
      ? currentFeatures.filter(f => f !== feature)
      : [...currentFeatures, feature];
    
    handleProfileChange('housing', 'mustHaveFeatures', newFeatures);
  };

  // Save profile changes
  const handleSaveProfile = async () => {
    setIsSubmitting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsSubmitting(false);
    setIsEditing(false);
  };

  // Cancel editing
  const handleCancelEdit = () => {
    setIsEditing(false);
  };

  // Edit Form - All sections vertically
  const EditProfileForm = () => (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-4">
          <button
            onClick={handleCancelEdit}
            className="flex items-center space-x-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Profile</span>
          </button>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Edit Your Profile</h2>
            <p className="text-gray-600">Update your profile to increase your chances of finding the perfect home</p>
          </div>
        </div>
        <button
          onClick={handleSaveProfile}
          disabled={isSubmitting}
          className="flex items-center space-x-2 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Save className="w-4 h-4" />
          )}
          <span>{isSubmitting ? 'Saving...' : 'Save Changes'}</span>
        </button>
      </div>

      {/* All Forms in Vertical Layout */}
      <div className="space-y-12">
        
        {/* Basic Information Section */}
        <section>
          <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
            <User className="w-6 h-6 mr-3 text-green-600" />
            Basic Information
          </h3>
          
          <div className="space-y-6">
            <div>
              <h4 className="text-lg font-semibold text-gray-800 mb-4">Profile Photo</h4>
              <div className="flex items-center space-x-6">
                <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center">
                  {profileData.basic.profilePhoto ? (
                    <img 
                      src={profileData.basic.profilePhoto} 
                      alt="Profile" 
                      className="w-20 h-20 rounded-full object-cover"
                    />
                  ) : (
                    <User className="w-8 h-8 text-gray-400" />
                  )}
                </div>
                <div className="space-y-2">
                  <label className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors cursor-pointer">
                    <Camera className="w-4 h-4" />
                    <span>Upload New Photo</span>
                    <input 
                      type="file" 
                      className="hidden" 
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files[0];
                        if (file) {
                          const reader = new FileReader();
                          reader.onload = (e) => {
                            handleProfileChange('basic', 'profilePhoto', e.target.result);
                          };
                          reader.readAsDataURL(file);
                        }
                      }}
                    />
                  </label>
                  <button 
                    onClick={() => handleProfileChange('basic', 'profilePhoto', null)}
                    className="flex items-center space-x-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <X className="w-4 h-4" />
                    <span>Remove Photo</span>
                  </button>
                </div>
              </div>
              <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <h5 className="font-semibold text-blue-900 mb-2">Photo Guidelines</h5>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• Use a clear, recent photo of yourself</li>
                  <li>• Help build trust with hosts</li>
                  <li>• JPG or PNG, max 5MB</li>
                </ul>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  First Name *
                </label>
                <input
                  type="text"
                  value={profileData.basic.firstName}
                  onChange={(e) => handleProfileChange('basic', 'firstName', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Last Name *
                </label>
                <input
                  type="text"
                  value={profileData.basic.lastName}
                  onChange={(e) => handleProfileChange('basic', 'lastName', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Email Address *
              </label>
              <input
                type="email"
                value={profileData.basic.email}
                onChange={(e) => handleProfileChange('basic', 'email', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Date of Birth *
                </label>
                <input
                  type="date"
                  value={profileData.basic.dateOfBirth}
                  onChange={(e) => handleProfileChange('basic', 'dateOfBirth', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Nationality/Country of Origin
                </label>
                <input
                  type="text"
                  value={profileData.basic.nationality}
                  onChange={(e) => handleProfileChange('basic', 'nationality', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
            </div>
          </div>
        </section>

        {/* About & Bio Section */}
        <section>
          <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
            <BookOpen className="w-6 h-6 mr-3 text-green-600" />
            About & Bio
          </h3>
          
          <div className="space-y-6">
            <div>
              <h4 className="text-lg font-semibold text-gray-800 mb-4">Tell hosts about yourself</h4>
              <textarea
                value={profileData.about.bio}
                onChange={(e) => handleProfileChange('about', 'bio', e.target.value)}
                rows={6}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Share your story, interests, and what makes you a great tenant..."
              />
            </div>

            <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
              <h5 className="font-semibold text-yellow-900 mb-3">Bio Writing Tips:</h5>
              <ul className="text-sm text-yellow-800 space-y-2">
                <li className="flex items-center">
                  <input type="checkbox" className="mr-3 rounded border-yellow-300 text-green-600 focus:ring-green-500" />
                  Mention your experience and background
                </li>
                <li className="flex items-center">
                  <input type="checkbox" className="mr-3 rounded border-yellow-300 text-green-600 focus:ring-green-500" />
                  Share your interests and hobbies
                </li>
                <li className="flex items-center">
                  <input type="checkbox" className="mr-3 rounded border-yellow-300 text-green-600 focus:ring-green-500" />
                  Explain what makes you stand out
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold text-gray-800 mb-4">Education & Occupation</h4>
              
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Are you a student?
                </label>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="studentStatus"
                      checked={profileData.about.isStudent}
                      onChange={() => handleProfileChange('about', 'isStudent', true)}
                      className="mr-3 text-green-600 focus:ring-green-500"
                    />
                    <span className="text-gray-700">Yes, I'm a student</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="studentStatus"
                      checked={!profileData.about.isStudent}
                      onChange={() => handleProfileChange('about', 'isStudent', false)}
                      className="mr-3 text-green-600 focus:ring-green-500"
                    />
                    <span className="text-gray-700">No, I'm working</span>
                  </label>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    University/Institution *
                  </label>
                  <input
                    type="text"
                    value={profileData.about.university}
                    onChange={(e) => handleProfileChange('about', 'university', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Programme *
                  </label>
                  <input
                    type="text"
                    value={profileData.about.program}
                    onChange={(e) => handleProfileChange('about', 'program', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
              </div>

              <div className="mt-4">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Degree Level *
                </label>
                <select
                  value={profileData.about.degreeLevel}
                  onChange={(e) => handleProfileChange('about', 'degreeLevel', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  <option value="Bachelor's">Bachelor's</option>
                  <option value="Master's">Master's</option>
                  <option value="PhD">PhD</option>
                  <option value="Associate">Associate</option>
                  <option value="Diploma">Diploma</option>
                </select>
              </div>
            </div>
          </div>
        </section>

        {/* Housing Preferences Section */}
        <section>
          <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
            <Home className="w-6 h-6 mr-3 text-green-600" />
            Housing Preferences
          </h3>
          
          <div className="space-y-6">
            <div>
              <h4 className="text-lg font-semibold text-gray-800 mb-4">
                Monthly Budget Range *
              </h4>
              <p className="text-sm text-gray-600 mb-4">
                What's your comfortable monthly budget for rent?
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Minimum
                  </label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                      type="number"
                      value={profileData.housing.budgetMin}
                      onChange={(e) => handleProfileChange('housing', 'budgetMin', parseInt(e.target.value))}
                      className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Maximum
                  </label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                      type="number"
                      value={profileData.housing.budgetMax}
                      onChange={(e) => handleProfileChange('housing', 'budgetMax', parseInt(e.target.value))}
                      className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Preferred Location *
              </label>
              <input
                type="text"
                value={profileData.housing.preferredLocation}
                onChange={(e) => handleProfileChange('housing', 'preferredLocation', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            <div>
              <h4 className="text-lg font-semibold text-gray-800 mb-4">Room & Property Preferences</h4>
              
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Room Type Preference *
                </label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[
                    { value: 'private', label: 'Private Room' },
                    { value: 'shared', label: 'Shared Room' },
                    { value: 'entire', label: 'Entire Place' }
                  ].map((type) => (
                    <label key={type.value} className="flex items-center p-4 border border-gray-300 rounded-lg hover:bg-gray-50 cursor-pointer">
                      <input
                        type="radio"
                        name="roomType"
                        value={type.value}
                        checked={profileData.housing.roomType === type.value}
                        onChange={(e) => handleProfileChange('housing', 'roomType', e.target.value)}
                        className="mr-3 text-green-600 focus:ring-green-500"
                      />
                      <span className="text-gray-700">{type.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Bathroom Preference
                </label>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="bathroom"
                      value="private"
                      checked={profileData.housing.bathroomPreference === 'private'}
                      onChange={(e) => handleProfileChange('housing', 'bathroomPreference', e.target.value)}
                      className="mr-3 text-green-600 focus:ring-green-500"
                    />
                    <span className="text-gray-700">Private</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="bathroom"
                      value="shared"
                      checked={profileData.housing.bathroomPreference === 'shared'}
                      onChange={(e) => handleProfileChange('housing', 'bathroomPreference', e.target.value)}
                      className="mr-3 text-green-600 focus:ring-green-500"
                    />
                    <span className="text-gray-700">Shared</span>
                  </label>
                </div>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-gray-800 mb-4">Must-Have Features</h4>
                <p className="text-sm text-gray-600 mb-4">Select features that are essential for you</p>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {[
                    { value: 'wifi', label: 'WIFI', icon: Wifi },
                    { value: 'kitchen', label: 'Kitchen Access', icon: Utensils },
                    { value: 'parking', label: 'Parking', icon: Car },
                    { value: 'laundry', label: 'Laundry', icon: Shirt },
                    { value: 'pets', label: 'Pet Friendly', icon: PawPrint },
                    { value: 'garden', label: 'Garden', icon: TreePine }
                  ].map((feature) => (
                    <label
                      key={feature.value}
                      className={`flex items-center space-x-2 p-3 border rounded-lg cursor-pointer transition-colors ${
                        profileData.housing.mustHaveFeatures.includes(feature.value)
                          ? 'bg-green-100 border-green-300 text-green-700'
                          : 'border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={profileData.housing.mustHaveFeatures.includes(feature.value)}
                        onChange={() => handleFeatureToggle(feature.value)}
                        className="hidden"
                      />
                      <feature.icon className="w-4 h-4" />
                      <span className="text-sm font-medium">{feature.label}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Required Documents Section */}
        <section>
          <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
            <FileText className="w-6 h-6 mr-3 text-green-600" />
            Required Documents
          </h3>
          
          <div className="space-y-6">
            <div>
              <h4 className="text-lg font-semibold text-gray-800 mb-4">Identity Documents</h4>
              <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h5 className="font-semibold text-gray-900 text-lg">{documents.identity.type}</h5>
                    <p className="text-gray-600 mt-1">Upload a clear photo of your government-issued ID</p>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-700 font-medium">{documents.identity.file}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      {documents.identity.size} - Uploaded {documents.identity.uploadedAt}
                    </p>
                  </div>
                  <label className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors cursor-pointer">
                    {isUploading ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <Upload className="w-4 h-4" />
                    )}
                    <span>{isUploading ? 'Uploading...' : 'Upload Document'}</span>
                    <input
                      type="file"
                      className="hidden"
                      accept=".pdf,.jpg,.jpeg,.png"
                      onChange={(e) => handleFileChange('identity', e)}
                      disabled={isUploading}
                    />
                  </label>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-lg font-semibold text-gray-800 mb-4">Financial Verification</h4>
              <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h5 className="font-semibold text-gray-900 text-lg">{documents.financial.type}</h5>
                    <p className="text-gray-600 mt-1">Upload your recent bank statement or proof of income</p>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-700 font-medium">{documents.financial.file}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      {documents.financial.size} - Uploaded {documents.financial.uploadedAt}
                    </p>
                  </div>
                  <label className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors cursor-pointer">
                    {isUploading ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <Upload className="w-4 h-4" />
                    )}
                    <span>{isUploading ? 'Uploading...' : 'Upload Document'}</span>
                    <input
                      type="file"
                      className="hidden"
                      accept=".pdf,.jpg,.jpeg,.png"
                      onChange={(e) => handleFileChange('financial', e)}
                      disabled={isUploading}
                    />
                  </label>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-lg font-semibold text-gray-800 mb-4">Additional Documents</h4>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 mb-2">Upload Supporting Document</p>
                <p className="text-sm text-gray-500 mb-4">
                  Drag & drop files here or click to browse
                </p>
                <label className="inline-flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors cursor-pointer">
                  <Upload className="w-4 h-4" />
                  <span>Browse Files</span>
                  <input type="file" className="hidden" multiple />
                </label>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );

  // Main Profile View
  const MainProfileView = () => (
    <div className="space-y-6">
      {/* Profile Header */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between">
          <div className="flex items-start space-x-4 mb-4 sm:mb-0">
            <div className="w-20 h-20 bg-gray-300 rounded-full flex items-center justify-center">
              {profileData.basic.profilePhoto ? (
                <img 
                  src={profileData.basic.profilePhoto} 
                  alt="Profile" 
                  className="w-20 h-20 rounded-full object-cover"
                />
              ) : (
                <span className="text-2xl font-bold text-gray-600">A</span>
              )}
            </div>
            <div>
              <div className="flex items-center space-x-2 mb-1">
                <h1 className="text-2xl font-bold text-gray-900">{profileData.basic.firstName} {profileData.basic.lastName}</h1>
                <span className="flex items-center px-2 py-1 bg-green-100 text-green-800 rounded text-xs font-medium">
                  <CheckCircle className="w-3 h-3 mr-1" />
                  Verified
                </span>
              </div>
              <p className="text-gray-700 font-medium mb-2">{profileData.about.occupation}</p>
              <div className="space-y-1 text-sm text-gray-600">
                <div className="flex items-center">
                  <span className="font-medium">A</span>
                  <span className="ml-1">24 years old</span>
                </div>
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-2" />
                  Member since Oct 2024
                </div>
                <div className="flex items-center">
                  <Mail className="w-4 h-4 mr-2" />
                  {contactInfo.email}
                </div>
                <div className="flex items-center">
                  <Phone className="w-4 h-4 mr-2" />
                  {contactInfo.phone}
                </div>
                <div className="flex items-center">
                  <MapPin className="w-4 h-4 mr-2" />
                  Cantabria, Spain
                </div>
              </div>
            </div>
          </div>
          <button 
            onClick={() => setIsEditing(true)}
            className="flex items-center justify-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors w-full sm:w-auto"
          >
            <Edit2 className="w-4 h-4" />
            <span>Edit Profile</span>
          </button>
        </div>

        {/* Profile Badges */}
        <div className="mt-6 pt-6 border-t border-gray-200">
          <h3 className="text-sm font-semibold text-gray-700 mb-3">Profile Badges</h3>
          <div className="flex flex-wrap gap-2">
            {['Student', 'Identity Verified', 'Clean Tenant', 'Reliable'].map((badge) => (
              <span key={badge} className="px-3 py-1 bg-gray-100 text-gray-700 rounded text-sm">
                {badge}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Contact Verification */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Contact Verification</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Email */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-medium text-gray-900">Email Address</h3>
              {contactInfo.isEmailVerified ? (
                <Check className="h-5 w-5 text-green-600" />
              ) : (
                <X className="h-5 w-5 text-red-500" />
              )}
            </div>
            <p className="text-gray-600">{contactInfo.email}</p>
            {contactInfo.isEmailVerified && (
              <p className="text-xs text-gray-500 mt-1">
                Verified on {contactInfo.emailVerificationDate}
              </p>
            )}
          </div>

          {/* Phone */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-medium text-gray-900">Phone Number</h3>
              {contactInfo.isPhoneVerified ? (
                <Check className="h-5 w-5 text-green-600" />
              ) : (
                <X className="h-5 w-5 text-red-500" />
              )}
            </div>
            <p className="text-gray-600">{contactInfo.phone}</p>
            {!contactInfo.isPhoneVerified && (
              <div className="mt-3">
                <button
                  onClick={handlePhoneVerification}
                  disabled={isVerifyingPhone}
                  className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:bg-blue-400 disabled:cursor-not-allowed text-sm"
                >
                  {isVerifyingPhone ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Shield className="w-4 h-4" />
                  )}
                  <span>
                    {isVerifyingPhone ? 'Verifying...' : 'Verify Phone Number'}
                  </span>
                </button>
                <p className="text-xs text-gray-500 mt-2">
                  Hosts can contact you directly
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* About Section */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">About {profileData.basic.firstName}</h2>
        <div className="space-y-4 text-gray-700">
          <p>{profileData.about.bio}</p>
        </div>
      </div>

      {/* Personal Information */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Personal Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-medium text-gray-900 mb-2">Education</h3>
            <p className="text-gray-600">{profileData.about.program} ({profileData.about.degreeLevel})</p>
          </div>
          <div>
            <h3 className="font-medium text-gray-900 mb-2">Occupation</h3>
            <p className="text-gray-600">{profileData.about.occupation}</p>
          </div>
          <div>
            <h3 className="font-medium text-gray-900 mb-2">Nationality</h3>
            <p className="text-gray-600">{profileData.basic.nationality}</p>
          </div>
          <div>
            <h3 className="font-medium text-gray-900 mb-2">Languages</h3>
            <p className="text-gray-600">English, Mandarin</p>
          </div>
        </div>
      </div>

      {/* Housing Preferences */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Housing Preferences</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div>
            <h3 className="font-medium text-gray-900 mb-1">Budget Range</h3>
            <p className="text-gray-600">${profileData.housing.budgetMin} - ${profileData.housing.budgetMax}</p>
            <p className="text-xs text-gray-500">per month</p>
          </div>
          <div>
            <h3 className="font-medium text-gray-900 mb-1">Room Type</h3>
            <p className="text-gray-600">
              {profileData.housing.roomType === 'private' && 'Private Room'}
              {profileData.housing.roomType === 'shared' && 'Shared Room'}
              {profileData.housing.roomType === 'entire' && 'Entire Place'}
            </p>
          </div>
          <div>
            <h3 className="font-medium text-gray-900 mb-1">Preferred Location</h3>
            <p className="text-gray-600">{profileData.housing.preferredLocation}</p>
          </div>
        </div>
        
        <div>
          <h3 className="font-medium text-gray-900 mb-2">Must-Have Features</h3>
          <div className="flex flex-wrap gap-2">
            {profileData.housing.mustHaveFeatures.map((feature) => (
              <span key={feature} className="px-3 py-1 bg-green-100 text-green-800 rounded text-sm">
                {feature === 'wifi' && 'WIFI'}
                {feature === 'kitchen' && 'Kitchen Access'}
                {feature === 'parking' && 'Parking'}
                {feature === 'laundry' && 'Laundry'}
                {feature === 'pets' && 'Pet Friendly'}
                {feature === 'garden' && 'Garden'}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Required Documents with Verification Input */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Required Documents</h2>
        
        <div className="space-y-6">
          {/* Identity Documents */}
          <div>
            <h3 className="font-medium text-gray-900 mb-3">Identity Documents</h3>
            <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h4 className="font-medium text-gray-900">{documents.identity.type}</h4>
                  <p className="text-sm text-gray-600">{documents.identity.file}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    {documents.identity.size} - Uploaded {documents.identity.uploadedAt}
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  {documents.identity.verified ? (
                    <span className="flex items-center space-x-1 px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                      <Check className="w-4 h-4" />
                      <span>Verified</span>
                    </span>
                  ) : (
                    <button
                      onClick={() => handleDocumentVerification('identity')}
                      className="flex items-center space-x-1 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm hover:bg-blue-200 transition-colors"
                    >
                      <Shield className="w-4 h-4" />
                      <span>Verify</span>
                    </button>
                  )}
                </div>
              </div>
              <div className="flex space-x-2">
                <label className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors cursor-pointer">
                  <Upload className="w-4 h-4" />
                  <span>Upload New</span>
                  <input
                    type="file"
                    className="hidden"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={(e) => handleFileChange('identity', e)}
                  />
                </label>
                {documents.identity.fileUrl && (
                  <a 
                    href={documents.identity.fileUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                  >
                    <FileText className="w-4 h-4" />
                    <span>View Document</span>
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Financial Verification */}
          <div>
            <h3 className="font-medium text-gray-900 mb-3">Financial Verification</h3>
            <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h4 className="font-medium text-gray-900">{documents.financial.type}</h4>
                  <p className="text-sm text-gray-600">{documents.financial.file}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    {documents.financial.size} - Uploaded {documents.financial.uploadedAt}
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  {documents.financial.verified ? (
                    <span className="flex items-center space-x-1 px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                      <Check className="w-4 h-4" />
                      <span>Verified</span>
                    </span>
                  ) : (
                    <button
                      onClick={() => handleDocumentVerification('financial')}
                      className="flex items-center space-x-1 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm hover:bg-blue-200 transition-colors"
                    >
                      <Shield className="w-4 h-4" />
                      <span>Verify</span>
                    </button>
                  )}
                </div>
              </div>
              <div className="flex space-x-2">
                <label className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors cursor-pointer">
                  <Upload className="w-4 h-4" />
                  <span>Upload New</span>
                  <input
                    type="file"
                    className="hidden"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={(e) => handleFileChange('financial', e)}
                  />
                </label>
                {documents.financial.fileUrl && (
                  <a 
                    href={documents.financial.fileUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                  >
                    <FileText className="w-4 h-4" />
                    <span>View Document</span>
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <RenterHeader />
        <div className="flex-1 p-6">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col lg:flex-row gap-6">
              
              {/* Left Column - Stats Only */}
              <div className="w-full lg:w-1/4 space-y-6">
                
                {/* Profile Statistics */}
                <div className="bg-white rounded-lg border border-gray-200 p-5">
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">PROFILE STATISTICS</h2>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Total Applications</span>
                      <span className="font-bold text-gray-900">12</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Completed Stays</span>
                      <span className="font-bold text-gray-900">3</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Reviews Given</span>
                      <span className="font-bold text-gray-900">3</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Profile Views</span>
                      <span className="font-bold text-gray-900">47</span>
                    </div>
                  </div>
                </div>

                {/* Profile Completion */}
                <div className="bg-white rounded-lg border border-gray-200 p-5">
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">PROFILE COMPLETION</h2>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm text-gray-600">Profile Completion</span>
                    <span className="text-xl font-bold text-green-600">80%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
                    <div className="bg-green-600 h-2 rounded-full" style={{ width: '80%' }}></div>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">Complete your profile:</p>
                  <ul className="space-y-1 text-sm text-gray-600">
                    <li className="flex items-center">
                      <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mr-2"></span>
                      Add profile photo
                    </li>
                    <li className="flex items-center">
                      <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mr-2"></span>
                      Verify Phone Number
                    </li>
                  </ul>
                </div>

                {/* Application Tips */}
                <div className="bg-blue-50 rounded-lg border border-blue-200 p-5">
                  <h2 className="text-lg font-semibold text-blue-900 mb-3">APPLICATION TIPS</h2>
                  <ul className="space-y-2 text-sm text-blue-800">
                    <li>• Complete profiles get 60% more responses</li>
                    <li>• Add personal details to build trust</li>
                  </ul>
                </div>

              </div>

              {/* Right Column - All Other Content */}
              <div className="w-full lg:w-3/4">
                {isEditing ? <EditProfileForm /> : <MainProfileView />}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RenterProfile;