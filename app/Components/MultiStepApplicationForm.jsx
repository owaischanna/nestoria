// MultiStepApplicationForm.jsx
import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, CheckCircle, Upload, Calendar, X, Star } from 'lucide-react';

// --- Utility Components for Steps ---

// Status Bar (Steps 1, 2, 3)
const StepStatusBar = ({ currentStep, totalSteps }) => (
    <div className="flex justify-between items-center mb-6">
        {[...Array(totalSteps)].map((_, index) => (
            <div
                key={index}
                className={`flex-1 h-1 rounded-full mx-1 ${
                    index + 1 <= currentStep ? 'bg-green-600' : 'bg-gray-300'
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
                className={`text-center p-6 border-2 border-dashed rounded-lg transition-colors ${
                    isDragging ? 'border-green-500 bg-green-50' : 'border-gray-300 bg-gray-50'
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

            {/* Uploaded Files Preview */}
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

// --- Step 1: Personal Information ---
const Step1PersonalInfo = ({ applicationData, handleChange }) => (
    <div className="space-y-6">
        <div className="text-center mb-2">
            <h3 className="text-xl font-semibold text-gray-800">Step 1 of 3: Personal Information</h3>
            <p className="text-sm text-gray-500">Please fill out all required information to complete your application</p>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700">Full Name * <span className="text-red-500 text-xs">REQUIRED</span></label>
                <input 
                    type="text" 
                    name="fullName" 
                    value={applicationData.fullName} 
                    onChange={handleChange} 
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500" 
                    placeholder="Anna Chen" 
                    required 
                />
            </div>
            <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700">Email Address * <span className="text-red-500 text-xs">REQUIRED</span></label>
                <input 
                    type="email" 
                    name="email" 
                    value={applicationData.email} 
                    onChange={handleChange} 
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500" 
                    placeholder="anna.chen@nyu.edu" 
                    required 
                />
            </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700">Phone Number *</label>
                <input 
                    type="tel" 
                    name="phone" 
                    value={applicationData.phone} 
                    onChange={handleChange} 
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500" 
                    placeholder="+1 (555) 123-4567" 
                />
            </div>
            <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700">Date of Birth *</label>
                <div className="relative">
                    <input 
                        type="date" 
                        name="dob" 
                        value={applicationData.dob} 
                        onChange={handleChange} 
                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500 pr-10" 
                    />
                    <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
                </div>
            </div>
        </div>

        <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">Current Address *</label>
            <input 
                type="text" 
                name="currentAddress" 
                value={applicationData.currentAddress} 
                onChange={handleChange} 
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500" 
                placeholder="789 University Place, Apt 4C, New York, NY 10003" 
            />
        </div>

        <div className="border-t pt-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Occupation & Status <span className="text-green-600 text-xs">IMPORTANT</span></h3>
            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                    <label className="text-sm font-medium text-gray-700">Employment Status *</label>
                    <div className="flex space-x-2">
                        {['Student', 'Employed', 'Self-Employed'].map(status => (
                            <button 
                                key={status} 
                                type="button" 
                                onClick={() => handleChange({ target: { name: 'employmentStatus', value: status } })}
                                className={`px-3 py-1 text-sm rounded-full transition ${
                                    applicationData.employmentStatus === status ? 'bg-orange-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                }`}
                            >
                                {status}
                            </button>
                        ))}
                    </div>
                </div>
                <div className="space-y-1">
                    <label className="text-sm font-medium text-gray-700">University/Institution *</label>
                    <input 
                        type="text" 
                        name="university" 
                        value={applicationData.university} 
                        onChange={handleChange} 
                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500" 
                        placeholder="New York University (NYU)" 
                    />
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-4">
                <div className="space-y-1">
                    <label className="text-sm font-medium text-gray-700">Program of Study *</label>
                    <input 
                        type="text" 
                        name="programOfStudy" 
                        value={applicationData.programOfStudy} 
                        onChange={handleChange} 
                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500" 
                        placeholder="Computer Science - Master's Degree" 
                    />
                </div>
                <div className="space-y-1">
                    <label className="text-sm font-medium text-gray-700">Expected Graduation *</label>
                    <input 
                        type="text" 
                        name="expectedGraduation" 
                        value={applicationData.expectedGraduation} 
                        onChange={handleChange} 
                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500" 
                        placeholder="May 2025" 
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
                    placeholder="$2,500 (Family support + Part-time work)" 
                />
                <p className="text-xs text-gray-500 mt-1">This helps hosts understand your ability to pay rent consistently</p>
            </div>
        </div>

        {/* Lease Preferences Section - ADDED */}
        <div className="border-t pt-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Lease Preferences</h3>
            
            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                    <label className="text-sm font-medium text-gray-700">Preferred Move-in Date *</label>
                    <div className="relative">
                        <input 
                            type="date" 
                            name="preferredMoveIn" 
                            value={applicationData.preferredMoveIn} 
                            onChange={handleChange} 
                            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500 pr-10" 
                        />
                        <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
                    </div>
                </div>
                <div className="space-y-1">
                    <label className="text-sm font-medium text-gray-700">Preferred Lease Length *</label>
                    <div className="flex space-x-2">
                        {['6 Months', '12 Months', 'Flexible'].map(term => (
                            <button 
                                key={term} 
                                type="button" 
                                onClick={() => handleChange({ target: { name: 'leaseLength', value: term } })}
                                className={`px-3 py-1 text-sm rounded-full transition ${
                                    applicationData.leaseLength === term ? 'bg-orange-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
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
                    placeholder="I am an international student from Singapore studying Computer Science at NYU. I am quiet, clean, and respectful. I don't smoke or have pets. I'm looking for a peaceful place to focus on my studies and would be happy to contribute to a friendly household environment."
                />
            </div>
        </div>
    </div>
);

// --- Step 2: Documents Upload ---
const Step2Documents = ({ applicationData, handleFileUpload }) => (
    <div className="space-y-6">
        <div className="text-center mb-2">
            <h3 className="text-xl font-semibold text-gray-800">Step 2 of 3: Upload Required Documents</h3>
            <p className="text-sm text-gray-500">Please upload the following documents to complete your application</p>
        </div>

        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 space-y-2 text-sm text-gray-700">
            <p className="font-semibold text-blue-700 flex items-center">
                <CheckCircle className="w-4 h-4 mr-2 text-blue-500"/> Document Upload Guidelines
            </p>
            <ul className="list-disc list-inside ml-4 space-y-1">
                <li>Upload clear, high-quality scans or photos</li>
                <li>Ensure all text is readable and corners are visible</li>
                <li>Accepted formats: PDF, JPG, PNG (max 10MB each)</li>
                <li>All documents must be current and valid</li>
            </ul>
        </div>
        
        <div className="space-y-6">
            <h4 className="text-lg font-semibold text-gray-800 flex justify-between items-center">
                Required Documents
                <span className="text-green-600 text-xs font-normal">
                    {applicationData.uploadedDocuments.filter(doc => doc.required).length}/
                    {applicationData.documents.filter(doc => doc.required).length} Complete
                </span>
            </h4>
            
            {/* Identity Documents */}
            <FileUpload
                title="Identity Documents"
                required={true}
                acceptedFiles={['jpg', 'jpeg', 'png', 'pdf']}
                onFileUpload={(file) => handleFileUpload('identity', file)}
                uploadedFiles={applicationData.uploadedDocuments.filter(doc => doc.type === 'identity')}
            />
            <p className="text-xs text-gray-500 -mt-2">For international students: Passport required</p>

            {/* Financial Verification */}
            <FileUpload
                title="Financial Verification"
                required={true}
                acceptedFiles={['jpg', 'jpeg', 'png', 'pdf']}
                onFileUpload={(file) => handleFileUpload('financial', file)}
                uploadedFiles={applicationData.uploadedDocuments.filter(doc => doc.type === 'financial')}
            />
            <p className="text-xs text-gray-500 -mt-2">Pay stubs, employment letter, or financial support letter</p>
            <p className="text-xs text-gray-500">Students: Family support letter or scholarship documents</p>

            {/* Additional Documents */}
            <FileUpload
                title="Additional Documents"
                required={false}
                acceptedFiles={['jpg', 'jpeg', 'png', 'pdf']}
                onFileUpload={(file) => handleFileUpload('additional', file)}
                uploadedFiles={applicationData.uploadedDocuments.filter(doc => doc.type === 'additional')}
            />
            <p className="text-xs text-gray-500 -mt-2">OPTIONAL - Any other supporting documents</p>
        </div>
    </div>
);

// Property Info Component for Review and Success steps
const PropertyInfo = () => (
    <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 mb-6">
        <h4 className="font-semibold text-gray-800 mb-3">Key Room Near NYU Campus</h4>
        <div className="space-y-1 text-sm text-gray-600">
            <p>Greenwich Village, Manhattan</p>
            <p className="font-bold text-green-700">€750/month</p>
            <p>Private Room • Shared Bathroom • 120 sqft</p>
            <p>Available Sep 1</p>
        </div>
    </div>
);

// Host Info Component for Success step
const HostInfo = () => (
    <div className="bg-white p-4 rounded-lg border border-gray-200 mb-6">
        <h4 className="font-semibold text-gray-800 mb-3">HOST INFORMATION</h4>
        <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                <span className="text-sm font-semibold">MJ</span>
            </div>
            <div>
                <p className="font-semibold">Margaret Johnson</p>
                <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    <span className="text-sm text-gray-600">4.8</span>
                    <span className="text-sm text-gray-600">•</span>
                    <span className="text-sm text-gray-600">24 reviews</span>
                </div>
                <p className="text-xs text-gray-500">Host since 2005</p>
            </div>
        </div>
    </div>
);

// --- Step 3: Review & Submit ---
// --- Step 3: Review & Submit ---
const Step3Review = ({ applicationData }) => {
    // Function to get file icon based on type
    const getFileIcon = (fileName) => {
        if (fileName?.toLowerCase().includes('.pdf')) {
            return (
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                    <span className="text-red-600 font-bold text-sm">PDF</span>
                </div>
            );
        } else if (fileName?.toLowerCase().match(/\.(jpg|jpeg|png|gif)$/)) {
            // For image files, show a thumbnail preview
            const file = applicationData.uploadedDocuments.find(doc => doc.name === fileName)?.file;
            if (file) {
                const url = URL.createObjectURL(file);
                return (
                    <img 
                        src={url} 
                        alt="Document preview" 
                        className="w-12 h-12 object-cover rounded-lg border border-gray-200"
                    />
                );
            }
        }
        
        // Default file icon
        return (
            <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                <FileText className="w-6 h-6 text-gray-400" />
            </div>
        );
    };

    // Function to format file size
    const formatFileSize = (bytes) => {
        if (!bytes) return 'Unknown size';
        if (bytes < 1024) return bytes + ' bytes';
        if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
        return (bytes / 1048576).toFixed(1) + ' MB';
    };

    // Group documents by type
    const governmentDocs = applicationData.uploadedDocuments.filter(doc => 
        doc.type === 'identity' || 
        doc.name?.toLowerCase().includes('id') ||
        doc.name?.toLowerCase().includes('license') ||
        doc.name?.toLowerCase().includes('passport')
    );

    const bankDocs = applicationData.uploadedDocuments.filter(doc => 
        doc.type === 'financial' || 
        doc.name?.toLowerCase().includes('bank') ||
        doc.name?.toLowerCase().includes('statement') ||
        doc.name?.toLowerCase().includes('income')
    );

    const additionalDocs = applicationData.uploadedDocuments.filter(doc => 
        doc.type === 'additional' &&
        !governmentDocs.includes(doc) &&
        !bankDocs.includes(doc)
    );

    return (
        <div className="space-y-6">
            <div className="text-center mb-2">
                <h3 className="text-xl font-semibold text-gray-800">Step 3 of 3: Review & Submit Application</h3>
                <p className="text-sm text-gray-500">Please review all information before submitting your application</p>
            </div>
            
            {/* Property Information */}
            <PropertyInfo />
            
            {/* Personal Information Review */}
            <div className="border border-gray-200 p-4 rounded-lg bg-white">
                <h4 className="font-semibold text-gray-800 mb-4">Personal Information</h4>
                <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                        <p className="font-medium text-gray-600">Full Name</p>
                        <p className="text-gray-800">{applicationData.fullName}</p>
                    </div>
                    <div>
                        <p className="font-medium text-gray-600">Email Address</p>
                        <p className="text-gray-800">{applicationData.email}</p>
                    </div>
                    <div>
                        <p className="font-medium text-gray-600">Phone Number</p>
                        <p className="text-gray-800">{applicationData.phone}</p>
                    </div>
                    <div className="col-span-3 mt-2">
                        <p className="font-medium text-gray-600">Date of Birth</p>
                        <p className="text-gray-800">{new Date(applicationData.dob).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
                    </div>
                    <div className="col-span-3 mt-2">
                        <p className="font-medium text-gray-600">Current Address</p>
                        <p className="text-gray-800">{applicationData.currentAddress}</p>
                    </div>
                </div>
            </div>

            {/* Occupation & Status Review */}
            <div className="border border-gray-200 p-4 rounded-lg bg-white">
                <h4 className="font-semibold text-gray-800 mb-4">Occupation & Status</h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                        <p className="font-medium text-gray-600">Employment Status</p>
                        <p className="text-gray-800">{applicationData.employmentStatus}</p>
                    </div>
                    <div>
                        <p className="font-medium text-gray-600">University/Institution</p>
                        <p className="text-gray-800">{applicationData.university}</p>
                    </div>
                    <div className="col-span-2 mt-2">
                        <p className="font-medium text-gray-600">Program of Study</p>
                        <p className="text-gray-800">{applicationData.programOfStudy}</p>
                    </div>
                    <div className="col-span-2">
                        <p className="font-medium text-gray-600">Monthly Income/Support</p>
                        <p className="text-gray-800">{applicationData.monthlyIncome}</p>
                    </div>
                </div>
            </div>

            {/* Lease Preferences Review */}
            <div className="border border-gray-200 p-4 rounded-lg bg-white">
                <h4 className="font-semibold text-gray-800 mb-4">Lease Preferences</h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                        <p className="font-medium text-gray-600">Preferred Move-in Date</p>
                        <p className="text-gray-800">{new Date(applicationData.preferredMoveIn).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
                    </div>
                    <div>
                        <p className="font-medium text-gray-600">Preferred Lease Length</p>
                        <p className="text-gray-800">{applicationData.leaseLength}</p>
                    </div>
                    <div className="col-span-2 mt-2">
                        <p className="font-medium text-gray-600">Additional Information</p>
                        <p className="text-gray-800 text-sm mt-1">{applicationData.additionalInfo}</p>
                    </div>
                </div>
            </div>

            {/* Uploaded Documents Review */}
            <div className="border border-gray-200 p-4 rounded-lg bg-white">
                <h4 className="font-semibold text-gray-800 mb-4">Uploaded Documents</h4>
                <div className="space-y-6">
                    {/* Government Documents Section */}
                    {governmentDocs.length > 0 && (
                        <div className="space-y-3">
                            <p className="font-medium text-gray-700 text-sm">Government Issued ID:</p>
                            <div className="space-y-2">
                                {governmentDocs.map((doc, index) => (
                                    <div key={index} className="flex items-center justify-between bg-gray-50 p-3 rounded-lg border border-gray-200">
                                        <div className="flex items-center space-x-3">
                                            {getFileIcon(doc.name)}
                                            <div>
                                                <p className="font-medium text-gray-800 text-sm">{doc.name}</p>
                                                <p className="text-xs text-gray-500">{formatFileSize(doc.file?.size)}</p>
                                            </div>
                                        </div>
                                        <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Bank Documents Section */}
                    {bankDocs.length > 0 && (
                        <div className="space-y-3">
                            <p className="font-medium text-gray-700 text-sm">Bank Statements:</p>
                            <div className="space-y-2">
                                {bankDocs.map((doc, index) => (
                                    <div key={index} className="flex items-center justify-between bg-gray-50 p-3 rounded-lg border border-gray-200">
                                        <div className="flex items-center space-x-3">
                                            {getFileIcon(doc.name)}
                                            <div>
                                                <p className="font-medium text-gray-800 text-sm">{doc.name}</p>
                                                <p className="text-xs text-gray-500">{formatFileSize(doc.file?.size)}</p>
                                            </div>
                                        </div>
                                        <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Additional Documents Section */}
                    {additionalDocs.length > 0 && (
                        <div className="space-y-3">
                            <p className="font-medium text-gray-700 text-sm">Additional Documents:</p>
                            <div className="space-y-2">
                                {additionalDocs.map((doc, index) => (
                                    <div key={index} className="flex items-center justify-between bg-gray-50 p-3 rounded-lg border border-gray-200">
                                        <div className="flex items-center space-x-3">
                                            {getFileIcon(doc.name)}
                                            <div>
                                                <p className="font-medium text-gray-800 text-sm">{doc.name}</p>
                                                <p className="text-xs text-gray-500">{formatFileSize(doc.file?.size)}</p>
                                            </div>
                                        </div>
                                        <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Show message if no documents uploaded */}
                    {applicationData.uploadedDocuments.length === 0 && (
                        <div className="text-center py-8">
                            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                                <Upload className="w-8 h-8 text-gray-400" />
                            </div>
                            <p className="text-gray-500 text-sm">No documents uploaded yet</p>
                            <p className="text-gray-400 text-xs mt-1">Documents will appear here after upload</p>
                        </div>
                    )}

                    {/* Document Upload Progress */}
                    {applicationData.uploadedDocuments.length > 0 && (
                        <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-2">
                                    <CheckCircle className="w-5 h-5 text-green-600" />
                                    <span className="text-sm font-medium text-green-800">
                                        {applicationData.uploadedDocuments.length} document(s) uploaded successfully
                                    </span>
                                </div>
                                <span className="text-xs text-green-600 bg-green-100 px-2 py-1 rounded-full">
                                    Ready to submit
                                </span>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

// --- Step 4: Submitted (Success Screen) ---
const Step4Success = ({ onClose }) => (
    <div className="space-y-6">
        <div className="text-center mb-2">
            <h3 className="text-2xl font-bold text-gray-800 mb-2">Application Submitted!</h3>
            <p className="text-gray-500">Step 3 of 3: Submitted</p>
        </div>
        
        {/* Property Information */}
        <PropertyInfo />
        
        {/* Host Information */}
        <HostInfo />
        
        {/* Quick Links */}
        <div className="bg-white p-4 rounded-lg border border-gray-200">
            <h4 className="font-semibold text-gray-800 mb-3">Quick Links</h4>
            <div className="space-y-2 text-sm">
                <div className="flex justify-between items-center py-2 border-b">
                    <span className="text-gray-600">Near You</span>
                    <ChevronRight className="w-4 h-4 text-gray-400" />
                </div>
                <div className="flex justify-between items-center py-2 border-b">
                    <span className="text-gray-600">Under €800</span>
                    <ChevronRight className="w-4 h-4 text-gray-400" />
                </div>
                <div className="flex justify-between items-center py-2">
                    <span className="text-gray-600">Pet Friendly</span>
                    <ChevronRight className="w-4 h-4 text-gray-400" />
                </div>
            </div>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-4 pt-4">
            <button 
                onClick={onClose}
                className="flex-1 px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 font-medium transition"
            >
                Back to Dashboard
            </button>
       
        </div>
    </div>
);

// --- Main Application Form Container ---
const MultiStepApplicationForm = ({ onClose }) => {
    const [currentStep, setCurrentStep] = useState(1);
    const totalSteps = 4;
    
    const [applicationData, setApplicationData] = useState({
        // Personal Information
        fullName: 'Anna Chen',
        email: 'anna.chen@nyu.edu',
        phone: '+1 (555) 123-4567',
        dob: '1999-03-15',
        currentAddress: '789 University Place, Apt 4C, New York, NY 10003',
        
        // Occupation & Status
        employmentStatus: 'Student',
        university: 'New York University (NYU)',
        programOfStudy: "Computer Science - Master's Degree",
        expectedGraduation: 'May 2025',
        monthlyIncome: '$2,500 (Family support + Part-time work)',
        
        // Lease Preferences
        preferredMoveIn: '2024-09-01',
        leaseLength: '6 Months',
        additionalInfo: 'I am an international student from Singapore studying Computer Science at NYU. I am quiet, clean, and respectful. I don\'t smoke or have pets. I\'m looking for a peaceful place to focus on my studies and would be happy to contribute to a friendly household environment.',
        
        // Documents
        documents: [
            { type: 'identity', required: true },
            { type: 'financial', required: true },
            { type: 'additional', required: false }
        ],
        uploadedDocuments: []
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setApplicationData(prev => ({ ...prev, [name]: value }));
    };

    const handleFileUpload = (type, file) => {
        if (!file) {
            // Remove file logic if needed
            return;
        }

        const newFile = {
            type,
            name: file.name,
            file: file,
            uploadedAt: new Date().toISOString()
        };

        setApplicationData(prev => ({
            ...prev,
            uploadedDocuments: [...prev.uploadedDocuments.filter(doc => doc.type !== type || doc.name !== file.name), newFile]
        }));
    };

    const handleNext = () => {
        if (currentStep < totalSteps) {
            setCurrentStep(currentStep + 1);
        }
    };

    const handleBack = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
        } else {
            onClose();
        }
    };

    const handleSubmit = () => {
        // Here you would typically send the application data to your backend
        console.log('Submitting application:', applicationData);
        handleNext();
    };

    const renderStep = () => {
        switch (currentStep) {
            case 1:
                return <Step1PersonalInfo applicationData={applicationData} handleChange={handleChange} />;
            case 2:
                return <Step2Documents applicationData={applicationData} handleFileUpload={handleFileUpload} />;
            case 3:
                return <Step3Review applicationData={applicationData} />;
            case 4:
                return <Step4Success onClose={onClose} />;
            default:
                return null;
        }
    };

    return (
        <div className={`w-full max-w-4xl mx-auto bg-white rounded-lg h-full flex flex-col ${currentStep === 4 ? '' : 'overflow-y-auto'}`}>
            {/* Header and Controls - Made more compact */}
            <div className="flex justify-between items-center pb-4 border-b">
                <h2 className="text-2xl font-bold text-gray-800">Application Form</h2>
                <div className="flex space-x-2">
                    {currentStep !== 4 && (
                        <button 
                            onClick={handleBack} 
                            className="flex items-center text-sm font-semibold text-gray-600 border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-100 transition"
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
                            className="flex items-center text-sm font-semibold bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition"
                        >
                            Submit Application
                        </button>
                    )}
                </div>
            </div>

            {/* Step Status Bar - Made more compact */}
            {currentStep !== 4 && <StepStatusBar currentStep={currentStep} totalSteps={3} />}

            {/* Content - Reduced top padding to move content up */}
            <div className="flex-1 pt-2">
                {renderStep()}
            </div>
        </div>
    );
};

export default MultiStepApplicationForm;