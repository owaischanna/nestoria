"use client";

import {
  Menu, Search, Heart, Bell, User, MapPin, DollarSign,
  FileText, Briefcase, ChevronRight, ChevronLeft,
  CheckCircle, Upload, FileCheck, Star, X
} from "lucide-react";

import { useState } from "react";

// --- Application Form Component (Full Screen) ---
const ApplicationFormContainer = ({ onClose }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Step 1: Personal Information
    fullName: "Anna Chen",
    email: "anna.chen@nyu.edu",
    phone: "+1 (555) 123-4567",
    dateOfBirth: "March 15, 1999",
    currentAddress: "789 University Place, Apt 4C, New York, NY 10003",
    
    // Step 2: Occupation & Status
    employmentStatus: "Student",
    university: "New York University (NYU)",
    programOfStudy: "Computer Science - Master's Degree",
    graduationDate: "May 2025",
    monthlyIncome: "$2,500 (Family support + Part-time work)",
    
    // Step 3: Documents
    moveInDate: "September 1, 2024",
    leaseLength: "6 Months",
  });

  const [uploadedFiles, setUploadedFiles] = useState({
    passport: false,
    financial: false,
  });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleFileUpload = (fileType, file) => {
    setUploadedFiles(prev => ({
      ...prev,
      [fileType]: true
    }));
    console.log(`Uploaded ${fileType}:`, file.name);
  };

  const nextStep = () => {
    setCurrentStep(prev => Math.min(prev + 1, 4));
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    nextStep(); // Move to success page
  };

  // Progress steps
  const steps = [
    { number: 1, title: "Personal Info" },
    { number: 2, title: "Occupation" },
    { number: 3, title: "Documents" },
    { number: 4, title: "Review" }
  ];

  // Property details
  const propertyDetails = {
    name: "Cozy Room Near NYU Campus",
    location: "Greenwich Village, Manhattan",
    price: "$750/month",
    details: [
      "Private Room",
      "Shared Bathroom", 
      "120 sqft",
      "Available Sep 1"
    ],
    host: {
      name: "Margaret Johnson",
      rating: "4.8",
      reviews: "24 reviews",
      since: "2025"
    }
  };

  return (
    <div className="fixed inset-0 bg-white z-50 overflow-y-auto">
      {/* Close Button */}
      <div className="absolute top-4 right-4 z-50">
        <button
          onClick={onClose}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <X className="w-6 h-6 text-gray-600" />
        </button>
      </div>

      <div className="max-w-4xl mx-auto py-8 px-6">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between mb-4">
            {steps.map((step, index) => (
              <div key={step.number} className="flex flex-col items-center flex-1">
                <div className="flex items-center w-full">
                  {/* Connector line */}
                  {index > 0 && (
                    <div
                      className={`flex-1 h-1 ${
                        currentStep >= step.number ? "bg-green-600" : "bg-gray-200"
                      }`}
                    />
                  )}
                  
                  {/* Step circle */}
                  <div
                    className={`flex items-center justify-center w-8 h-8 rounded-full ${
                      currentStep >= step.number
                        ? "bg-green-600 text-white"
                        : "bg-gray-200 text-gray-500"
                    } font-semibold text-sm`}
                  >
                    {currentStep > step.number ? <CheckCircle className="w-4 h-4" /> : step.number}
                  </div>
                  
                  {/* Connector line */}
                  {index < steps.length - 1 && (
                    <div
                      className={`flex-1 h-1 ${
                        currentStep > step.number ? "bg-green-600" : "bg-gray-200"
                      }`}
                    />
                  )}
                </div>
                <span
                  className={`text-xs mt-2 ${
                    currentStep >= step.number ? "text-green-600 font-semibold" : "text-gray-500"
                  }`}
                >
                  {step.title}
                </span>
              </div>
            ))}
          </div>

          {/* Property Header */}
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold text-gray-800">{propertyDetails.name}</h3>
                <p className="text-sm text-gray-600">{propertyDetails.location}</p>
                <p className="text-lg font-bold text-green-700 mt-1">{propertyDetails.price}</p>
                <div className="flex flex-wrap gap-2 mt-2">
                  {propertyDetails.details.map((detail, index) => (
                    <span key={index} className="text-xs text-gray-500">• {detail}</span>
                  ))}
                </div>
              </div>
              <div className="text-right">
                <div className="flex items-center gap-1 mb-1">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm font-semibold">{propertyDetails.host.rating}</span>
                  <span className="text-sm text-gray-500">({propertyDetails.host.reviews})</span>
                </div>
                <p className="text-sm text-gray-600">Host since {propertyDetails.host.since}</p>
              </div>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Step 1: Personal Information */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Personal Information</h2>
                <p className="text-gray-600">Please fill out all required information to complete your application</p>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      value={formData.fullName}
                      onChange={(e) => handleInputChange("fullName", e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleInputChange("phone", e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Current Address *
                    </label>
                    <textarea
                      value={formData.currentAddress}
                      onChange={(e) => handleInputChange("currentAddress", e.target.value)}
                      rows={3}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Date of Birth *
                    </label>
                    <input
                      type="text"
                      value={formData.dateOfBirth}
                      onChange={(e) => handleInputChange("dateOfBirth", e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                      required
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Occupation & Status */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Occupation & Status</h2>
                <p className="text-gray-600">Tell us about your academic and employment situation</p>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Employment Status *
                  </label>
                  <div className="flex gap-4">
                    {["Student", "Employed", "Self-Employed"].map((status) => (
                      <label key={status} className="flex items-center">
                        <input
                          type="radio"
                          name="employmentStatus"
                          value={status}
                          checked={formData.employmentStatus === status}
                          onChange={(e) => handleInputChange("employmentStatus", e.target.value)}
                          className="mr-2 text-green-600 focus:ring-green-500"
                        />
                        <span className="text-gray-700">{status}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Program of Study *
                    </label>
                    <input
                      type="text"
                      value={formData.programOfStudy}
                      onChange={(e) => handleInputChange("programOfStudy", e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Monthly Income/Support *
                    </label>
                    <input
                      type="text"
                      value={formData.monthlyIncome}
                      onChange={(e) => handleInputChange("monthlyIncome", e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                      required
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Document Upload */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Upload Required Documents</h2>
                <p className="text-gray-600">Please upload the following documents to complete your application</p>
              </div>

              {/* Upload Guidelines */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-semibold text-blue-800 mb-2">Document Upload Guidelines</h4>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>• Upload clear, high-quality scans or photos</li>
                  <li>• Ensure all text is readable and corners are visible</li>
                  <li>• Accepted formats: PDF, JPG, PNG (max 10MB each)</li>
                  <li>• All documents must be current and valid</li>
                </ul>
              </div>

              {/* Identity Documents */}
              <div className="space-y-4">
                <h3 className="font-semibold text-gray-800 text-lg">Identity Documents</h3>
                
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-green-500 transition-colors">
                  <Upload className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                  <h4 className="font-semibold text-gray-700 mb-2 text-lg">Upload Passport or State ID</h4>
                  <p className="text-gray-500 mb-4">
                    Drag & drop files here or click to browse
                  </p>
                  <input
                    type="file"
                    onChange={(e) => handleFileUpload("passport", e.target.files[0])}
                    className="hidden"
                    id="passport-upload"
                    accept=".pdf,.jpg,.jpeg,.png"
                  />
                  <label
                    htmlFor="passport-upload"
                    className="inline-block px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 cursor-pointer font-medium"
                  >
                    Choose File
                  </label>
                  {uploadedFiles.passport && (
                    <div className="flex items-center justify-center mt-3 text-green-600">
                      <FileCheck className="w-5 h-5 mr-2" />
                      <span className="font-medium">File uploaded successfully</span>
                    </div>
                  )}
                  <p className="text-sm text-gray-500 mt-3">
                    For international students: Passport required
                  </p>
                </div>
              </div>

              {/* Financial Verification */}
              <div className="space-y-4">
                <h3 className="font-semibold text-gray-800 text-lg">Financial Verification</h3>
                
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-green-500 transition-colors">
                  <Upload className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                  <h4 className="font-semibold text-gray-700 mb-2 text-lg">Upload Financial Documents</h4>
                  <p className="text-gray-500 mb-4">
                    Bank statements, scholarship letters, or sponsor letters
                  </p>
                  <input
                    type="file"
                    onChange={(e) => handleFileUpload("financial", e.target.files[0])}
                    className="hidden"
                    id="financial-upload"
                    accept=".pdf,.jpg,.jpeg,.png"
                  />
                  <label
                    htmlFor="financial-upload"
                    className="inline-block px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 cursor-pointer font-medium"
                  >
                    Choose File
                  </label>
                  {uploadedFiles.financial && (
                    <div className="flex items-center justify-center mt-3 text-green-600">
                      <FileCheck className="w-5 h-5 mr-2" />
                      <span className="font-medium">File uploaded successfully</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Review & Submit */}
          {currentStep === 4 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Review & Submit Application</h2>
                <p className="text-gray-600">Please review all information before submitting your application</p>
              </div>

              <div className="space-y-6">
                {/* Personal Information */}
                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="font-semibold text-gray-800 text-lg mb-4">Personal Information</h3>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div><span className="text-gray-600">Full Name:</span> {formData.fullName}</div>
                    <div><span className="text-gray-600">Email:</span> {formData.email}</div>
                    <div><span className="text-gray-600">Phone:</span> {formData.phone}</div>
                    <div><span className="text-gray-600">Date of Birth:</span> {formData.dateOfBirth}</div>
                    <div className="col-span-2">
                      <span className="text-gray-600">Address:</span> {formData.currentAddress}
                    </div>
                  </div>
                </div>

                {/* Occupation & Status */}
                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="font-semibold text-gray-800 text-lg mb-4">Occupation & Status</h3>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div><span className="text-gray-600">Employment Status:</span> {formData.employmentStatus}</div>
                    <div><span className="text-gray-600">Program:</span> {formData.programOfStudy}</div>
                    <div className="col-span-2">
                      <span className="text-gray-600">Monthly Income:</span> {formData.monthlyIncome}
                    </div>
                  </div>
                </div>

                {/* Lease Preferences */}
                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="font-semibold text-gray-800 text-lg mb-4">Lease Preferences</h3>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div><span className="text-gray-600">Preferred Move-in Date:</span> {formData.moveInDate}</div>
                    <div><span className="text-gray-600">Preferred Lease Length:</span> {formData.leaseLength}</div>
                  </div>
                </div>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <p className="text-sm text-yellow-800">
                  <strong>Note:</strong> By submitting this application, you agree to our terms and conditions. 
                  The landlord will review your application and contact you within 3-5 business days.
                </p>
              </div>
            </div>
          )}

          {/* Step 5: Success Page */}
          {currentStep === 5 && (
            <div className="text-center py-12">
              <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-6" />
              <h2 className="text-4xl font-bold text-gray-800 mb-4">Application Submitted!</h2>
              <p className="text-xl text-gray-600 mb-8">You'll be notified once your application gets accepted.</p>
              
              <div className="bg-green-50 border border-green-200 rounded-lg p-6 max-w-md mx-auto mb-8">
                <p className="text-green-700">
                  Your application for <strong>{propertyDetails.name}</strong> has been successfully submitted to {propertyDetails.host.name}.
                </p>
              </div>

              <div className="space-x-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-8 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 font-semibold text-lg"
                >
                  Back to Dashboard
                </button>
                <button
                  type="button"
                  onClick={() => setCurrentStep(1)}
                  className="px-8 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-semibold text-lg"
                >
                  Apply to Another Property
                </button>
              </div>
            </div>
          )}

          {/* Navigation Buttons - Hidden on success page */}
          {currentStep < 5 && (
            <div className="flex justify-between mt-12 pt-8 border-t">
              <button
                type="button"
                onClick={prevStep}
                disabled={currentStep === 1}
                className={`flex items-center px-8 py-3 rounded-lg ${
                  currentStep === 1
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                } font-medium`}
              >
                <ChevronLeft className="w-5 h-5 mr-2" />
                Previous
              </button>

              {currentStep < 4 ? (
                <button
                  type="button"
                  onClick={nextStep}
                  className="flex items-center px-8 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium"
                >
                  Next
                  <ChevronRight className="w-5 h-5 ml-2" />
                </button>
              ) : (
                <button
                  type="submit"
                  className="px-8 py-3 bg-amber-600 text-white rounded-lg hover:bg-amber-700 font-semibold text-lg"
                >
                  Submit Application
                </button>
              )}
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default ApplicationFormContainer;