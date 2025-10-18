// ApplicationFormStep2.jsx
import React from 'react';
import { Upload, CheckCircle, FileText } from 'lucide-react';

const ApplicationFormStep2 = ({ onContinue, onBack }) => {
    return (
        <div className="p-8 bg-white rounded-lg shadow-md">
            <h2 className="text-xl font-bold text-gray-800 mb-6">Upload Required Documents</h2>
            <p className="text-gray-600 mb-6">Step 2 of 3: Please upload the following documents to complete your application</p>
            
            {/* Form Steps Indicator */}
            <div className="flex items-center space-x-2 mb-8">
                <span className="text-sm font-semibold text-amber-700">Step 2 of 3: Documents Upload</span>
                {/* Visual progress bar can go here */}
                <div className="flex-1 h-1 bg-gray-200 rounded">
                    <div className="w-2/3 h-full bg-green-600 rounded"></div>
                </div>
            </div>

            {/* Document Guidelines */}
            <div className="p-6 bg-blue-50 border-l-4 border-blue-400 rounded-r-lg mb-8">
                <h4 className="text-md font-semibold text-blue-800 flex items-center mb-3">
                    <FileText className="w-5 h-5 mr-2" /> Document Upload Guidelines
                </h4>
                <ul className="text-sm text-blue-700 space-y-2 list-none pl-0">
                    <li className="flex items-start"><CheckCircle className="w-4 h-4 mr-2 mt-1 text-green-500 flex-shrink-0" /> Upload clear, high-quality scans or photos</li>
                    <li className="flex items-start"><CheckCircle className="w-4 h-4 mr-2 mt-1 text-green-500 flex-shrink-0" /> Ensure all text is readable and corners are visible</li>
                    <li className="flex items-start"><CheckCircle className="w-4 h-4 mr-2 mt-1 text-green-500 flex-shrink-0" /> Accepted formats: PDF, JPG, PNG (max 10MB each)</li>
                    <li className="flex items-start"><CheckCircle className="w-4 h-4 mr-2 mt-1 text-green-500 flex-shrink-0" /> All documents must be current and valid</li>
                </ul>
            </div>
            
            {/* Required Documents Section */}
            <div className="mb-8">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-bold text-gray-800">Required Documents</h3>
                    <div className="text-sm font-semibold text-green-600">2/4 Complete</div>
                </div>
                
                {/* Document Type: Identity */}
                <DocumentUploadSection 
                    title="Identity Documents"
                    status="REQUIRED"
                    documentName="Passport or State ID"
                    subtext="For international students: Passport required"
                />

                {/* Document Type: Financial Verification */}
                <DocumentUploadSection 
                    title="Financial Verification"
                    status="REQUIRED"
                    documentName="Proof of Income / Bank Statement"
                    subtext="Required to verify monthly income/support"
                />
            </div>
            
        </div>
    );
};

// Reusable Sub-Component for document upload area
const DocumentUploadSection = ({ title, status, documentName, subtext }) => (
    <div className="border border-gray-200 rounded-lg p-6 mb-6">
        <div className="flex justify-between items-center mb-4">
            <h4 className="text-md font-semibold text-gray-800">{title}</h4>
            <span className={`text-xs font-bold px-3 py-1 rounded-full ${status === 'REQUIRED' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
                {status}
            </span>
        </div>

        {/* Upload Box */}
        <div className="text-center p-8 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50 hover:bg-gray-100 transition cursor-pointer">
            <Upload className="w-10 h-10 mx-auto text-gray-400 mb-2" />
            <p className="text-gray-600 font-semibold mb-1">Upload {documentName}</p>
            <p className="text-sm text-gray-500 mb-4">Drag & drop files here or click to browse</p>
            <button className="bg-amber-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-amber-700 transition">
                Choose File
            </button>
            {subtext && <p className="text-xs text-gray-400 mt-3">{subtext}</p>}
        </div>
    </div>
);

export default ApplicationFormStep2;