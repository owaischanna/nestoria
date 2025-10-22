// MultiStepApplicationForm.jsx
import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, CheckCircle, Upload, Calendar, X, Star, MapPin, Home, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';

// --- Utility Components ---
const StepStatusBar = ({ currentStep, totalSteps }) => (
    <div className="flex justify-between items-center mb-6">
        {[...Array(totalSteps)].map((_, index) => (
            <div
                key={index}
                className={`flex-1 h-1 rounded-full mx-1 ${index + 1 <= currentStep ? 'bg-green-600' : 'bg-gray-300'
                    }`}
            ></div>
        ))}
    </div>
);

// File Upload Component
const FileUpload = ({ title, required = false, acceptedFiles = [], onFileUpload, uploadedFiles = [] }) => {
    const [isDragging, setIsDragging] = useState(false);

    const handleDragOver = (e) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
        setIsDragging(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragging(false);
        const files = Array.from(e.dataTransfer.files);
        handleFiles(files);
    };

    const handleFileInput = (e) => {
        const files = Array.from(e.target.files);
        handleFiles(files);
    };

    const handleFiles = (files) => {
        files.forEach(file => {
            if (file.size > 10 * 1024 * 1024) {
                alert('File size must be less than 10MB');
                return;
            }
            const allowedTypes = ['image/jpeg', 'image/png', 'application/pdf'];
            if (!allowedTypes.includes(file.type)) {
                alert('Only JPG, PNG, and PDF files are allowed');
                return;
            }
            onFileUpload(file);
        });
    };

    const removeFile = (fileName) => {
        onFileUpload(null, fileName);
    };

    return (
        <div className="border border-gray-300 p-4 rounded-lg space-y-3">
            <p className="font-semibold text-gray-800 flex items-center">
                {title}
                {required && <span className="text-red-500 text-xs font-normal ml-2">REQUIRED</span>}
            </p>

            <div
                className={`text-center p-6 border-2 border-dashed rounded-lg transition-colors ${isDragging ? 'border-green-500 bg-green-50' : 'border-gray-300 bg-gray-50'
                    }`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
            >
                <Upload className="w-8 h-8 mx-auto text-gray-400 mb-2" />
                <p className="text-sm text-gray-600 mb-2">Drag & drop files here or click to browse</p>
                <p className="text-xs text-gray-400 mb-3">
                    Accepted formats: {acceptedFiles.join(', ')} (max 10MB each)
                </p>
                <label className="cursor-pointer">
                    <span className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 text-sm font-medium inline-block">
                        Choose File
                    </span>
                    <input
                        type="file"
                        className="hidden"
                        onChange={handleFileInput}
                        accept={acceptedFiles.map(ext => `.${ext}`).join(',')}
                        multiple
                    />
                </label>
            </div>

            {uploadedFiles.length > 0 && (
                <div className="space-y-2">
                    <p className="text-sm font-medium text-gray-700">Uploaded files:</p>
                    {uploadedFiles.map((file, index) => (
                        <div key={index} className="flex items-center justify-between bg-white p-2 rounded border">
                            <span className="text-sm text-gray-600 truncate flex-1">{file.name}</span>
                            <button
                                onClick={() => removeFile(file.name)}
                                className="text-red-500 hover:text-red-700 ml-2"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

// Property & Host Info Sidebar
const PropertyHostSidebar = ({ listing, host }) => (
    <div className="w-80 bg-gray-50 p-6 space-y-6 border-r border-gray-200">
        <div>
            <p className="text-xs font-semibold text-gray-500 uppercase mb-3">Applying For</p>

            {/* Property Image */}
            <div className="bg-white rounded-lg overflow-hidden shadow-sm mb-4">
                <img
                    src={listing?.photos?.cover || "https://via.placeholder.com/320x200?text=Property"}
                    alt={listing?.listingTitle}
                    className="w-full h-40 object-cover"
                />
            </div>

            {/* Property Details */}
            <div className="bg-white p-4 rounded-lg shadow-sm">
                <h4 className="font-semibold text-gray-800 mb-2">{listing?.listingTitle || 'Property Name'}</h4>
                <div className="space-y-2 text-sm text-gray-600">
                    <p className="flex items-center">
                        <MapPin className="w-3 h-3 mr-2" />
                        {listing?.address}, {listing?.town}
                    </p>
                    <p className="font-bold text-green-700 text-lg">€{listing?.monthlyRent}/month</p>
                    <div className="flex items-center space-x-2 text-xs">
                        <span className="flex items-center">
                            <Home className="w-3 h-3 mr-1" />
                            {listing?.roomType || 'Private Room'}
                        </span>
                        <span>•</span>
                        <span>{listing?.roomSize || '120'} sqft</span>
                    </div>
                    <p className="text-xs text-gray-500">
                        Available {listing?.availableFrom ? new Date(listing.availableFrom).toLocaleDateString() : 'Now'}
                    </p>
                </div>
            </div>
        </div>

        {/* Host Information */}
        <div className="bg-white p-4 rounded-lg shadow-sm">
            <h4 className="font-semibold text-gray-800 mb-3 text-sm">HOST INFORMATION</h4>
            <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-semibold text-lg">
                        {host?.firstName?.[0]}{host?.lastName?.[0]}
                    </span>
                </div>
                <div>
                    <p className="font-semibold text-gray-800">{host?.firstName} {host?.lastName}</p>
                    <div className="flex items-center space-x-1">
                        <Star className="w-3 h-3 text-yellow-500 fill-current" />
                        <span className="text-xs text-gray-600">4.8</span>
                        <span className="text-xs text-gray-600">•</span>
                        <span className="text-xs text-gray-600">24 reviews</span>
                    </div>
                    <p className="text-xs text-gray-500">Host since 2020</p>
                </div>
            </div>
        </div>

        {/* Progress Indicator */}
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
            <p className="text-xs font-semibold text-blue-800 mb-2">Application Progress</p>
            <p className="text-xs text-gray-600">Complete all steps to submit your application</p>
        </div>
    </div>
);

// --- Step Components ---
const Step1PersonalInfo = ({ applicationData, handleChange }) => (
    <div className="space-y-6">
        <div className="mb-4">
            <h3 className="text-xl font-semibold text-gray-800">Step 1 of 3: Personal Information</h3>
            <p className="text-sm text-gray-500">Please fill out all required information</p>
        </div>

        <div className="grid grid-cols-2 gap-4">
            <div>
                <label className="text-sm font-medium text-gray-700">Full Name *</label>
                <input
                    type="text"
                    name="fullName"
                    value={applicationData.fullName}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500 mt-1"
                    required
                />
            </div>
            <div>
                <label className="text-sm font-medium text-gray-700">Email Address *</label>
                <input
                    type="email"
                    name="email"
                    value={applicationData.email}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500 mt-1"
                    required
                />
            </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
            <div>
                <label className="text-sm font-medium text-gray-700">Phone Number *</label>
                <input
                    type="tel"
                    name="phone"
                    value={applicationData.phone}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500 mt-1"
                />
            </div>
            <div>
                <label className="text-sm font-medium text-gray-700">Date of Birth *</label>
                <input
                    type="date"
                    name="dob"
                    value={applicationData.dob}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500 mt-1"
                />
            </div>
        </div>

        <div>
            <label className="text-sm font-medium text-gray-700">Current Address *</label>
            <input
                type="text"
                name="currentAddress"
                value={applicationData.currentAddress}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500 mt-1"
            />
        </div>

        <div className="border-t pt-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Occupation & Status</h3>
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="text-sm font-medium text-gray-700">Employment Status *</label>
                    <div className="flex space-x-2 mt-1">
                        {['Student', 'Employed', 'Self-Employed'].map(status => (
                            <button
                                key={status}
                                type="button"
                                onClick={() => handleChange({ target: { name: 'employmentStatus', value: status } })}
                                className={`px-3 py-1 text-sm rounded-full transition ${applicationData.employmentStatus === status ? 'bg-orange-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                    }`}
                            >
                                {status}
                            </button>
                        ))}
                    </div>
                </div>
                <div>
                    <label className="text-sm font-medium text-gray-700">University/Institution *</label>
                    <input
                        type="text"
                        name="university"
                        value={applicationData.university}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500 mt-1"
                    />
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-4">
                <div>
                    <label className="text-sm font-medium text-gray-700">Program of Study *</label>
                    <input
                        type="text"
                        name="programOfStudy"
                        value={applicationData.programOfStudy}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500 mt-1"
                    />
                </div>
                <div>
                    <label className="text-sm font-medium text-gray-700">Expected Graduation *</label>
                    <input
                        type="text"
                        name="expectedGraduation"
                        value={applicationData.expectedGraduation}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500 mt-1"
                    />
                </div>
            </div>

            <div className="mt-4">
                <label className="text-sm font-medium text-gray-700">Monthly Income/Support *</label>
                <input
                    type="text"
                    name="monthlyIncome"
                    value={applicationData.monthlyIncome}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500 mt-1"
                />
            </div>
        </div>

        <div className="border-t pt-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Lease Preferences</h3>

            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="text-sm font-medium text-gray-700">Preferred Move-in Date *</label>
                    <input
                        type="date"
                        name="preferredMoveIn"
                        value={applicationData.preferredMoveIn}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500 mt-1"
                    />
                </div>
                <div>
                    <label className="text-sm font-medium text-gray-700">Preferred Lease Length *</label>
                    <div className="flex space-x-2 mt-1">
                        {['6 Months', '12 Months', 'Flexible'].map(term => (
                            <button
                                key={term}
                                type="button"
                                onClick={() => handleChange({ target: { name: 'leaseLength', value: term } })}
                                className={`px-3 py-1 text-sm rounded-full transition ${applicationData.leaseLength === term ? 'bg-orange-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                    }`}
                            >
                                {term}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            <div className="mt-4">
                <label className="text-sm font-medium text-gray-700">Additional Information</label>
                <textarea
                    name="additionalInfo"
                    value={applicationData.additionalInfo}
                    onChange={handleChange}
                    rows="4"
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500 mt-1"
                />
            </div>
        </div>
    </div>
);

const Step2Documents = ({ applicationData, handleFileUpload }) => (
    <div className="space-y-6">
        <div className="mb-4">
            <h3 className="text-xl font-semibold text-gray-800">Step 2 of 3: Upload Required Documents</h3>
            <p className="text-sm text-gray-500">Please upload the following documents</p>
        </div>

        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
            <p className="font-semibold text-blue-700 flex items-center text-sm">
                <CheckCircle className="w-4 h-4 mr-2" /> Document Upload Guidelines
            </p>
            <ul className="list-disc list-inside ml-4 mt-2 space-y-1 text-xs text-gray-700">
                <li>Upload clear, high-quality scans or photos</li>
                <li>Accepted formats: PDF, JPG, PNG (max 10MB each)</li>
                <li>All documents must be current and valid</li>
            </ul>
        </div>

        <div className="space-y-6">
            <FileUpload
                title="Identity Documents"
                required={true}
                acceptedFiles={['jpg', 'jpeg', 'png', 'pdf']}
                onFileUpload={(file) => handleFileUpload('identity', file)}
                uploadedFiles={applicationData.uploadedDocuments.filter(doc => doc.type === 'identity')}
            />

            <FileUpload
                title="Financial Verification"
                required={true}
                acceptedFiles={['jpg', 'jpeg', 'png', 'pdf']}
                onFileUpload={(file) => handleFileUpload('financial', file)}
                uploadedFiles={applicationData.uploadedDocuments.filter(doc => doc.type === 'financial')}
            />

            <FileUpload
                title="Additional Documents"
                required={false}
                acceptedFiles={['jpg', 'jpeg', 'png', 'pdf']}
                onFileUpload={(file) => handleFileUpload('additional', file)}
                uploadedFiles={applicationData.uploadedDocuments.filter(doc => doc.type === 'additional')}
            />
        </div>
    </div>
);

const Step3Review = ({ applicationData, listing }) => (
    <div className="space-y-6">
        <div className="mb-4">
            <h3 className="text-xl font-semibold text-gray-800">Step 3 of 3: Review & Submit</h3>
            <p className="text-sm text-gray-500">Please review all information before submitting</p>
        </div>

        <div className="border border-gray-200 p-4 rounded-lg bg-white">
            <div className="flex justify-between items-center mb-4">
                <h4 className="font-semibold text-gray-800">Personal Information</h4>
            </div>
            <div className="grid grid-cols-3 gap-4 text-sm">
                <div>
                    <p className="font-medium text-gray-600">Full Name</p>
                    <p className="text-gray-800">{applicationData.fullName}</p>
                </div>
                <div>
                    <p className="font-medium text-gray-600">Email</p>
                    <p className="text-gray-800">{applicationData.email}</p>
                </div>
                <div>
                    <p className="font-medium text-gray-600">Phone</p>
                    <p className="text-gray-800">{applicationData.phone}</p>
                </div>
            </div>
        </div>

        <div className="border border-gray-200 p-4 rounded-lg bg-white">
            <h4 className="font-semibold text-gray-800 mb-4">Occupation & Status</h4>
            <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                    <p className="font-medium text-gray-600">Employment Status</p>
                    <p className="text-gray-800">{applicationData.employmentStatus}</p>
                </div>
                <div>
                    <p className="font-medium text-gray-600">University</p>
                    <p className="text-gray-800">{applicationData.university}</p>
                </div>
            </div>
        </div>

        <div className="border border-gray-200 p-4 rounded-lg bg-white">
            <h4 className="font-semibold text-gray-800 mb-4">Uploaded Documents</h4>
            {applicationData.uploadedDocuments.length > 0 ? (
                <div className="space-y-2">
                    {applicationData.uploadedDocuments.map((doc, index) => (
                        <div key={index} className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                            <span className="text-sm text-gray-700">{doc.name}</span>
                            <CheckCircle className="w-5 h-5 text-green-600" />
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-gray-500 text-sm">No documents uploaded</p>
            )}
        </div>
    </div>
);

const Step4Success = ({ onClose }) => (
    <div className="text-center space-y-6 py-8">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
            <CheckCircle className="w-12 h-12 text-green-600" />
        </div>
        <h3 className="text-2xl font-bold text-gray-800">Application Submitted!</h3>
        <p className="text-gray-600">Your application has been sent to the host. They will review it and get back to you soon.</p>
        <button
            onClick={onClose}
            className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium"
        >
            Back to Dashboard
        </button>
    </div>
);

// --- Main Component ---
const MultiStepApplicationForm = ({ onClose, listing }) => {
    const [currentStep, setCurrentStep] = useState(1);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [applicationData, setApplicationData] = useState({
        fullName: '',
        email: '',
        phone: '',
        dob: '',
        currentAddress: '',
        employmentStatus: 'Student',
        university: '',
        programOfStudy: '',
        expectedGraduation: '',
        monthlyIncome: '',
        preferredMoveIn: '',
        leaseLength: '6 Months',
        additionalInfo: '',
        uploadedDocuments: []
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setApplicationData(prev => ({ ...prev, [name]: value }));
    };

    const handleFileUpload = async (type, file) => {
        if (!file) return;

        // Convert file to Base64
        const reader = new FileReader();
        reader.onloadend = () => {
            const base64String = reader.result;
            const newFile = {
                type,
                name: file.name,
                data: base64String,
                file: file
            };

            setApplicationData(prev => ({
                ...prev,
                uploadedDocuments: [...prev.uploadedDocuments, newFile]
            }));
        };
        reader.readAsDataURL(file);
    };

    const handleNext = () => {
        if (currentStep < 4) setCurrentStep(currentStep + 1);
    };

    const handleBack = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
        } else {
            onClose();
        }
    };

    const handleSubmit = async () => {
        setIsSubmitting(true);
        const toastId = toast.loading('Submitting application...');

        try {
            // Prepare documents for API (only base64 data)
            const documentsForAPI = applicationData.uploadedDocuments.map(doc => ({
                type: doc.type,
                name: doc.name,
                data: doc.data
            }));

            const payload = {
                listingId: listing._id,
                fullName: applicationData.fullName,
                email: applicationData.email,
                phone: applicationData.phone,
                dob: applicationData.dob,
                currentAddress: applicationData.currentAddress,
                employmentStatus: applicationData.employmentStatus,
                university: applicationData.university,
                programOfStudy: applicationData.programOfStudy,
                expectedGraduation: applicationData.expectedGraduation,
                monthlyIncome: applicationData.monthlyIncome,
                preferredMoveIn: applicationData.preferredMoveIn,
                leaseLength: applicationData.leaseLength,
                additionalInfo: applicationData.additionalInfo,
                uploadedDocuments: documentsForAPI
            };

            const response = await fetch('/api/applications', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.message || 'Failed to submit application');
            }

            toast.success('Application submitted successfully!', { id: toastId });
            handleNext();
        } catch (error) {
            toast.error(error.message, { id: toastId });
        } finally {
            setIsSubmitting(false);
        }
    };

    const renderStep = () => {
        switch (currentStep) {
            case 1:
                return <Step1PersonalInfo applicationData={applicationData} handleChange={handleChange} />;
            case 2:
                return <Step2Documents applicationData={applicationData} handleFileUpload={handleFileUpload} />;
            case 3:
                return <Step3Review applicationData={applicationData} listing={listing} />;
            case 4:
                return <Step4Success onClose={onClose} />;
            default:
                return null;
        }
    };

    const host = listing?.hostId || {};

    return (
        <div className="flex h-full bg-white">
            {/* Left Sidebar - Property & Host Info */}
            {currentStep !== 4 && <PropertyHostSidebar listing={listing} host={host} />}

            {/* Right Content - Form */}
            <div className="flex-1 p-8 overflow-y-auto">
                <div className="max-w-3xl mx-auto">
                    {/* Header */}
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-bold text-gray-800">Application Form</h2>
                        <div className="flex space-x-2">
                            {currentStep !== 4 && (
                                <button
                                    onClick={handleBack}
                                    disabled={isSubmitting}
                                    className="flex items-center text-sm font-semibold text-gray-600 border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-100 transition disabled:opacity-50"
                                >
                                    <ChevronLeft className="w-4 h-4 mr-1" /> Back
                                </button>
                            )}
                            {currentStep < 3 && (
                                <button
                                    onClick={handleNext}
                                    className="flex items-center text-sm font-semibold bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
                                >
                                    Continue <ChevronRight className="w-4 h-4 ml-1" />
                                </button>
                            )}
                            {currentStep === 3 && (
                                <button
                                    onClick={handleSubmit}
                                    disabled={isSubmitting}
                                    className="flex items-center text-sm font-semibold bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition disabled:opacity-50"
                                >
                                    {isSubmitting ? (
                                        <>
                                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                            Submitting...
                                        </>
                                    ) : (
                                        <>Submit Application</>
                                    )}
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Step Status Bar */}
                    {currentStep !== 4 && <StepStatusBar currentStep={currentStep} totalSteps={3} />}

                    {/* Content */}
                    <div className="mt-6">
                        {renderStep()}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MultiStepApplicationForm;