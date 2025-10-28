"use client";

import React, { useState, useEffect, useMemo } from 'react';
import {
    ChevronLeft, ChevronRight, Home, Wifi,
    DoorOpen, Kitchen, Shirt, TreePine,
    Flame, Shield, User, Mail, Phone, GraduationCap, X,
    Upload, IdCard, FileText, BookOpen,
    Key, QrCode, Lock,
    CheckCircle, Star, Loader2
} from "lucide-react";
import toast from 'react-hot-toast';

const getInitials = (firstName, lastName) => {
    if (!firstName) return '?';
    const first = firstName.charAt(0);
    const last = lastName ? lastName.charAt(0) : '';
    return `${first}${last}`.toUpperCase();
};

// Sidebar component showing check-in progress
// *** FIX: Added completedItems and totalItems props ***
const CheckInProgressSidebar = ({ application, currentStep, completedItems, totalItems }) => {
    const steps = [
        { step: 1, label: "Welcome & Identity" },
        { step: 2, label: "Property Tour" },
        { step: 3, label: "Documentation" },
        { step: 4, label: "Keys & Access" },
        { step: 5, label: "Final Checklist" }
    ];

    // Calculate percentage for the summary card
    const completionPercentage = (totalItems && totalItems > 0) ? Math.round((completedItems / totalItems) * 100) : 0;

    return (
        <div className="lg:w-1/3 space-y-6">
            {/* Host Profile Card */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <div className="flex items-center space-x-4 mb-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-indigo-600 text-white flex items-center justify-center text-base font-bold">
                        {getInitials(application.host?.firstName, application.host?.lastName) || 'H'}
                    </div>
                    <div>
                        <h3 className="font-semibold text-gray-900">
                            {application.host?.firstName} {application.host?.lastName}
                        </h3>
                        <p className="text-sm text-gray-500">Host</p>
                    </div>
                </div>
            </div>

            {/* Check-in Progress */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">CHECK-IN PROGRESS</h3>
                <div className="space-y-4">
                    {steps.map((item) => {
                        const status = item.step < currentStep ? 'completed' : item.step === currentStep ? 'in-progress' : 'pending';
                        return (
                            <div key={item.step} className="flex items-center space-x-3">
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${status === 'completed' ? 'bg-green-100 text-green-700' :
                                    status === 'in-progress' ? 'bg-blue-100 text-blue-700' :
                                        'bg-gray-100 text-gray-400'
                                    }`}>
                                    {status === 'completed' ? <CheckCircle className="w-4 h-4" /> : item.step}
                                </div>
                                <div className="flex-1">
                                    <p className={`text-sm font-medium ${status === 'completed' ? 'text-green-700' :
                                        status === 'in-progress' ? 'text-blue-700' :
                                            'text-gray-500'
                                        }`}>
                                        {item.label}
                                    </p>
                                    <p className="text-xs text-gray-400 capitalize">{status.replace('-', ' ')}</p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Tenant Details */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">TENANT DETAILS</h3>
                <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                        <User className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-700">
                            {application.applicant?.firstName} {application.applicant?.lastName}
                        </span>
                    </div>
                    <div className="flex items-center space-x-3">
                        <GraduationCap className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-700">{application.university || 'Student'}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                        <Phone className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-700">{application.applicant?.phone || 'N/A'}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                        <Mail className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-700">{application.applicant?.email || 'N/A'}</span>
                    </div>
                </div>
            </div>

            {/* *** FIX: Added Completion Summary Card Back *** */}
            {totalItems > 0 && (
                <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-6 text-white">
                    <div className="text-center">
                        <div className="text-3xl font-bold mb-2">{completedItems}/{totalItems}</div>
                        <div className="text-blue-100 text-sm">Tasks Complete</div>
                        <div className="w-full bg-blue-500 rounded-full h-2 mt-3">
                            <div
                                className="bg-white h-2 rounded-full transition-all duration-300"
                                style={{ width: `${completionPercentage}%` }}
                            ></div>
                        </div>
                        <p className="text-blue-100 text-sm mt-2">{completionPercentage}% Complete</p>
                    </div>
                </div>
            )}

        </div>
    );
};

// 1. Property Tour Component
export function PropertyTourContent({ application, onComplete, onBack }) {
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [tourData, setTourData] = useState({
        roomAndPrivate: [],
        commonAreas: [],
        safetyAndRules: []
    });

    // Default checklist items (wrapped in useMemo)
    const defaultTourItems = useMemo(() => [
        { id: 1, label: "Show tenant their private room", completed: false, category: "roomAndPrivate" },
        { id: 2, label: "Demonstrate room features (lights, outlets, heating)", completed: false, category: "roomAndPrivate" },
        { id: 3, label: "Explain storage spaces and closet organization", completed: false, category: "roomAndPrivate" },
        { id: 4, label: "Show bathroom facilities and explain sharing", completed: false, category: "roomAndPrivate" },
        { id: 5, label: "Kitchen tour and appliance demonstration", completed: false, category: "commonAreas" },
        { id: 6, label: "Show living room and common areas", completed: false, category: "commonAreas" },
        { id: 7, label: "Laundry facilities and usage instructions", completed: false, category: "commonAreas" },
        { id: 8, label: "Outdoor spaces (garden, balcony, parking)", completed: false, category: "commonAreas" },
        { id: 9, label: "Emergency exits and safety equipment locations", completed: false, category: "safetyAndRules" },
        { id: 10, label: "House rules explanation and Q&A", completed: false, category: "safetyAndRules" },
        { id: 11, label: "WiFi password and network setup", completed: false, category: "safetyAndRules" }
    ], []);

    // Load existing check-in data
    useEffect(() => {
        const loadCheckInData = async () => {
            if (!application?._id) return;

            setIsLoading(true);

            // Default categorized structure
            const organizedDefaults = {
                roomAndPrivate: defaultTourItems.filter(item => item.category === 'roomAndPrivate'),
                commonAreas: defaultTourItems.filter(item => item.category === 'commonAreas'),
                safetyAndRules: defaultTourItems.filter(item => item.category === 'safetyAndRules')
            };

            try {
                const response = await fetch(`/api/applications/${application._id}/checkin`);
                const result = await response.json();

                // *** FIX: Check if data is an array and re-categorize it ***
                if (response.ok && result.data?.propertyTour && Array.isArray(result.data.propertyTour)) {

                    const flatSavedData = result.data.propertyTour;

                    // Use a Map to efficiently merge saved data with defaults
                    const savedItemsMap = new Map(flatSavedData.map(item => [item.id, item]));
                    const mergedData = defaultTourItems.map(defaultItem =>
                        savedItemsMap.get(defaultItem.id) || defaultItem
                    );

                    // Re-categorize the merged data
                    setTourData({
                        roomAndPrivate: mergedData.filter(item => item.category === 'roomAndPrivate'),
                        commonAreas: mergedData.filter(item => item.category === 'commonAreas'),
                        safetyAndRules: mergedData.filter(item => item.category === 'safetyAndRules')
                    });

                } else {
                    // No saved data (or wrong format), just use the defaults
                    setTourData(organizedDefaults);
                }
            } catch (error) {
                console.error('Error loading check-in data:', error);
                toast.error('Failed to load check-in data');
                setTourData(organizedDefaults);
            } finally {
                setIsLoading(false);
            }
        };

        loadCheckInData();
    }, [application?._id, defaultTourItems]);

    const toggleChecklistItem = (category, itemId) => {
        setTourData(prev => ({
            ...prev,
            [category]: prev[category].map(item =>
                item.id === itemId ? { ...item, completed: !item.completed } : item
            )
        }));
    };

    const handleSaveAndNext = async () => {
        if (!application?._id) return;

        setIsSaving(true);
        const toastId = toast.loading('Saving progress...');

        // *** FIX: FLATTEN THE DATA before sending ***
        const flatData = [
            ...(tourData.roomAndPrivate || []),
            ...(tourData.commonAreas || []),
            ...(tourData.safetyAndRules || [])
        ];

        try {
            const response = await fetch(`/api/applications/${application._id}/checkin`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    stepName: 'propertyTour',
                    data: flatData, // <-- Send the flat array
                    currentStep: 3 // Moving to step 3 (Documentation)
                })
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.message || 'Failed to save progress');
            }

            toast.success('Progress saved!', { id: toastId });
            onComplete();
        } catch (error) {
            console.error('Error saving progress:', error);
            toast.error(error.message || 'Failed to save progress', { id: toastId });
        } finally {
            setIsSaving(false);
        }
    };

    const completedItems = Object.values(tourData).flat().filter(item => item.completed).length;
    const totalItems = Object.values(tourData).flat().length;
    const completionPercentage = totalItems > 0 ? Math.round((completedItems / totalItems) * 100) : 0;

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-96">
                <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
            </div>
        );
    }

    return (
        <div className="flex flex-col lg:flex-row gap-6">
            {/* *** FIX: Pass completion props to sidebar *** */}
            <CheckInProgressSidebar
                application={application}
                currentStep={2}
                completedItems={completedItems}
                totalItems={totalItems}
            />

            <div className="lg:w-2/3">
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                    {/* Header */}
                    <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-6 text-white">
                        <div className="flex justify-between items-start">
                            <div>
                                <h1 className="text-2xl font-bold">
                                    Property Tour - {application.applicant?.firstName} {application.applicant?.lastName}
                                </h1>
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
                        <div className="bg-white rounded-lg border border-gray-200 p-6">
                            <h3 className="text-lg font-semibold text-gray-800 mb-4">Property Tour Checklist</h3>

                            {/* Room & Private Areas */}
                            <div className="mb-6">
                                <h4 className="font-semibold text-gray-700 mb-3 flex items-center">
                                    <DoorOpen className="w-4 h-4 mr-2 text-blue-600" />
                                    Room & Private Areas
                                </h4>
                                <div className="space-y-2">
                                    {/* Fix: Added optional chaining */}
                                    {tourData.roomAndPrivate?.map((item) => (
                                        <label key={item.id} className="flex items-center space-x-3 cursor-pointer">
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
                                    {/* Fix: Added optional chaining */}
                                    {tourData.commonAreas?.map((item) => (
                                        <label key={item.id} className="flex items-center space-x-3 cursor-pointer">
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
                                    {/* Fix: Added optional chaining */}
                                    {tourData.safetyAndRules?.map((item) => (
                                        <label key={item.id} className="flex items-center space-x-3 cursor-pointer">
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

                    {/* Footer */}
                    <div className="border-t border-gray-200 p-6 bg-gray-50">
                        <div className="flex justify-between items-center">
                            <button
                                onClick={onBack}
                                disabled={isSaving}
                                className="flex items-center space-x-2 px-6 py-3 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <ChevronLeft className="w-4 h-4" />
                                <span>Back</span>
                            </button>
                            <div className="flex space-x-3">
                                <button
                                    onClick={onComplete}
                                    disabled={isSaving}
                                    className="px-6 py-3 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    Skip
                                </button>
                                <button
                                    onClick={handleSaveAndNext}
                                    disabled={isSaving}
                                    className="flex items-center space-x-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {isSaving ? (
                                        <>
                                            <Loader2 className="w-4 h-4 animate-spin" />
                                            <span>Saving...</span>
                                        </>
                                    ) : (
                                        <>
                                            <span>Next Step</span>
                                            <ChevronRight className="w-4 h-4" />
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

// 2. Documentation Verification Component
// 2. Documentation Verification Component
export function DocumentationVerification({ application, onComplete, onBack }) {
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [documents, setDocuments] = useState({
        identity: [],
        financial: [],
        additional: []
    });

    // *** FIX 1: Wrap defaults in useMemo and add 'category' property ***
    const defaultDocuments = useMemo(() => ({
        identity: [
            { id: 1, label: "Government-issued ID", status: "required", verified: false, uploaded: false, file: null, category: "identity" },
            { id: 2, label: "Passport (International Students)", status: "required", verified: false, uploaded: false, file: null, category: "identity" }
        ],
        financial: [
            { id: 3, label: "Bank Statement", status: "required", verified: false, uploaded: false, file: null, category: "financial" },
            { id: 4, label: "Proof of Income", status: "required", verified: false, uploaded: false, file: null, category: "financial" }
        ],
        additional: [
            { id: 5, label: "Student Enrollment Letter", status: "optional", verified: false, uploaded: false, file: null, category: "additional" }
        ]
    }), []);

    // *** FIX 2: Create a flat list of all defaults for merging ***
    const allDefaultDocs = useMemo(() => [
        ...defaultDocuments.identity,
        ...defaultDocuments.financial,
        ...defaultDocuments.additional
    ], [defaultDocuments]);

    useEffect(() => {
        const loadCheckInData = async () => {
            if (!application?._id) return;

            setIsLoading(true);
            try {
                const response = await fetch(`/api/applications/${application._id}/checkin`);
                const result = await response.json();

                // *** FIX 3: Load and re-categorize the flat array from DB ***
                if (response.ok && result.data?.documentation && Array.isArray(result.data.documentation)) {

                    const flatSavedData = result.data.documentation;

                    // Merge saved data with defaults
                    const savedItemsMap = new Map(flatSavedData.map(item => [item.id, item]));
                    const mergedData = allDefaultDocs.map(defaultItem =>
                        savedItemsMap.get(defaultItem.id) || defaultItem
                    );

                    // Re-categorize the merged data
                    setDocuments({
                        identity: mergedData.filter(item => item.category === 'identity'),
                        financial: mergedData.filter(item => item.category === 'financial'),
                        additional: mergedData.filter(item => item.category === 'additional')
                    });

                } else {
                    // No saved data or wrong format, use defaults
                    setDocuments(defaultDocuments);
                }
            } catch (error) {
                console.error('Error loading documentation data:', error);
                toast.error('Failed to load documentation data');
                setDocuments(defaultDocuments);
            } finally {
                setIsLoading(false);
            }
        };

        loadCheckInData();
    }, [application?._id, defaultDocuments, allDefaultDocs]); // Add dependencies

    // *** FIX 4: Auto-verify on upload ***
    const handleFileUpload = (category, docId, file) => {
        if (file) {
            // In a real app, you'd upload the file here and get a URL.
            // For now, we just update the state.

            setDocuments(prev => ({
                ...prev,
                [category]: prev[category].map(doc =>
                    doc.id === docId ? {
                        ...doc,
                        uploaded: true,
                        verified: true, // <-- This auto-ticks the box
                        file: file.name
                    } : doc
                )
            }));
            toast.success('Document uploaded and auto-verified!');
        }
    };

    const handleVerify = (category, docId) => {
        setDocuments(prev => ({
            ...prev,
            [category]: prev[category].map(doc =>
                doc.id === docId ? { ...doc, verified: !doc.verified } : doc
            )
        }));
        toast.success('Verification status updated!');
    };

    // *** FIX 5: Flatten the data on save ***
    const handleSaveAndNext = async () => {
        if (!application?._id) return;

        setIsSaving(true);
        const toastId = toast.loading('Saving progress...');

        // Flatten the object into a single array
        const flatData = [
            ...(documents.identity || []),
            ...(documents.financial || []),
            ...(documents.additional || [])
        ];

        try {
            const response = await fetch(`/api/applications/${application._id}/checkin`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    stepName: 'documentation',
                    data: flatData, // <-- Send the flat array
                    currentStep: 4
                })
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.message || 'Failed to save progress');
            }

            toast.success('Progress saved!', { id: toastId });
            onComplete();
        } catch (error) {
            console.error('Error saving progress:', error);
            toast.error(error.message || 'Failed to save progress', { id: toastId });
        } finally {
            setIsSaving(false);
        }
    };

    // (The rest of the component remains the same as your last version)
    // ...

    const completedDocs = Object.values(documents).flat().filter(doc => doc.verified).length;
    const totalRequiredDocs = Object.values(documents).flat().filter(doc => doc.status === "required").length;
    const completionPercentage = totalRequiredDocs > 0 ? Math.round((completedDocs / totalRequiredDocs) * 100) : 0;

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
        // If auto-upload is on, this button will rarely be seen,
        // but it's good to keep for manual verification.
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
                ✓ Verified
            </span>
        );
    };

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-96">
                <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
            </div>
        );
    }

    return (
        <div className="flex flex-col lg:flex-row gap-6">
            <CheckInProgressSidebar
                application={application}
                currentStep={3}
                completedItems={completedDocs}
                totalItems={totalRequiredDocs}
            />

            <div className="lg:w-2/3">
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-6 text-white">
                        <div className="flex justify-between items-start">
                            <div>
                                <h1 className="text-2xl font-bold">Documentation & Verification</h1>
                                <p className="text-blue-100 mt-1">Step 3 of 5: Collect and verify required documents</p>
                            </div>
                            <button onClick={onBack} className="text-white hover:text-blue-200 transition-colors">
                                <X className="w-6 h-6" />
                            </button>
                        </div>
                    </div>

                    <div className="bg-gray-100 px-6 py-3">
                        <div className="flex justify-between items-center text-sm text-gray-600">
                            <span>Step 3 of 5</span>
                            <span>{completionPercentage}% Complete</span>
                        </div>
                        <div className="w-full bg-gray-300 rounded-full h-2 mt-2">
                            <div className="bg-green-600 h-2 rounded-full transition-all duration-300" style={{ width: `${completionPercentage}%` }}></div>
                        </div>
                    </div>

                    <div className="p-6">
                        <div className="bg-white rounded-lg border border-gray-200 p-6">
                            <h3 className="text-lg font-semibold text-gray-800 mb-4">Required Documents</h3>

                            {/* Identity Documents */}
                            <div className="mb-6">
                                <h4 className="font-semibold text-gray-700 mb-3 flex items-center">
                                    <IdCard className="w-4 h-4 mr-2 text-blue-600" />
                                    Identity Documents
                                </h4>
                                <div className="space-y-3">
                                    {documents.identity?.map((doc) => (
                                        <div key={doc.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                            <div className="flex items-center space-x-3">
                                                <input type="checkbox" checked={doc.verified} readOnly className="rounded border-gray-300 text-green-600" />
                                                <span className={`text-sm ${doc.verified ? 'text-gray-500 line-through' : 'text-gray-700'}`}>{doc.label}</span>
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
                                    {documents.financial?.map((doc) => (
                                        <div key={doc.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                            <div className="flex items-center space-x-3">
                                                <input type="checkbox" checked={doc.verified} readOnly className="rounded border-gray-300 text-green-600" />
                                                <span className={`text-sm ${doc.verified ? 'text-gray-500 line-through' : 'text-gray-700'}`}>{doc.label}</span>
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
                                    {documents.additional?.map((doc) => (
                                        <div key={doc.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                            <div className="flex items-center space-x-3">
                                                <input type="checkbox" checked={doc.verified} readOnly className="rounded border-gray-300 text-green-600" />
                                                <span className={`text-sm ${doc.verified ? 'text-gray-500 line-through' : 'text-gray-700'}`}>{doc.label}</span>
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

                    {/* Footer */}
                    <div className="border-t border-gray-200 p-6 bg-gray-50">
                        <div className="flex justify-between items-center">
                            <button
                                onClick={onBack}
                                disabled={isSaving}
                                className="flex items-center space-x-2 px-6 py-3 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <ChevronLeft className="w-4 h-4" />
                                <span>Back</span>
                            </button>
                            <div className="flex space-x-3">
                                <button
                                    onClick={onComplete}
                                    disabled={isSaving}
                                    className="px-6 py-3 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    Skip
                                </button>
                                <button
                                    onClick={handleSaveAndNext}
                                    disabled={isSaving}
                                    className="flex items-center space-x-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {isSaving ? (
                                        <>
                                            <Loader2 className="w-4 h-4 animate-spin" />
                                            <span>Saving...</span>
                                        </>
                                    ) : (
                                        <>
                                            <span>Next Step</span>
                                            <ChevronRight className="w-4 h-4" />
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
// 3. Keys & Access Component
export function KeysAndAccess({ application, onComplete, onBack }) {
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [accessData, setAccessData] = useState({
        physicalKeys: [],
        digitalAccess: []
    });

    // Use useMemo for default data
    const defaultAccessData = useMemo(() => ({
        physicalKeys: [
            { id: 1, label: "Room Key", completed: false },
            { id: 2, label: "Building Key / Fob", completed: false },
            { id: 3, label: "Mailbox Key", completed: false },
        ],
        digitalAccess: [
            { id: 4, label: "Building Entry Code", completed: false, value: "" },
            { id: 5, label: "WiFi Password", completed: false, value: "" },
        ]
    }), []);

    useEffect(() => {
        const loadCheckInData = async () => {
            if (!application?._id) return;

            setIsLoading(true);
            try {
                const response = await fetch(`/api/applications/${application._id}/checkin`);
                const result = await response.json();

                if (response.ok && result.data?.keysAndAccess) {
                    // *** FIX: Merge saved data with defaults ***
                    setAccessData({
                        physicalKeys: result.data.keysAndAccess.physicalKeys || defaultAccessData.physicalKeys,
                        digitalAccess: result.data.keysAndAccess.digitalAccess || defaultAccessData.digitalAccess,
                    });
                } else {
                    setAccessData(defaultAccessData);
                }
            } catch (error) {
                console.error('Error loading check-in data:', error);
                toast.error('Failed to load access data');
                setAccessData(defaultAccessData);
            } finally {
                setIsLoading(false);
            }
        };

        loadCheckInData();
    }, [application?._id, defaultAccessData]);

    const toggleItem = (category, itemId) => {
        setAccessData(prev => ({
            ...prev,
            [category]: prev[category].map(item =>
                item.id === itemId ? { ...item, completed: !item.completed } : item
            )
        }));
    };

    const handleValueChange = (category, itemId, value) => {
        setAccessData(prev => ({
            ...prev,
            [category]: prev[category].map(item =>
                item.id === itemId ? { ...item, value } : item
            )
        }));
    };

    const handleSaveAndNext = async () => {
        if (!application?._id) return;

        setIsSaving(true);
        const toastId = toast.loading('Saving progress...');

        try {
            const response = await fetch(`/api/applications/${application._id}/checkin`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    stepName: 'keysAndAccess',
                    data: accessData, // This step likely DOES save as an object
                    currentStep: 5 // Moving to step 5 (Final Checklist)
                })
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.message || 'Failed to save progress');
            }

            toast.success('Progress saved!', { id: toastId });
            onComplete();
        } catch (error) {
            console.error('Error saving progress:', error);
            toast.error(error.message || 'Failed to save progress', { id: toastId });
        } finally {
            setIsSaving(false);
        }
    };

    const completedItems = Object.values(accessData).flat().filter(item => item.completed).length;
    const totalItems = Object.values(accessData).flat().length;
    const completionPercentage = totalItems > 0 ? Math.round((completedItems / totalItems) * 100) : 0;

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-96">
                <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
            </div>
        );
    }

    return (
        <div className="flex flex-col lg:flex-row gap-6">
            {/* *** FIX: Pass completion props to sidebar *** */}
            <CheckInProgressSidebar
                application={application}
                currentStep={4}
                completedItems={completedItems}
                totalItems={totalItems}
            />

            <div className="lg:w-2/3">
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-6 text-white">
                        <div className="flex justify-between items-start">
                            <div>
                                <h1 className="text-2xl font-bold">Keys & Access</h1>
                                <p className="text-blue-100 mt-1">Step 4 of 5: Hand over keys and share access codes</p>
                            </div>
                            <button onClick={onBack} className="text-white hover:text-blue-200 transition-colors">
                                <X className="w-6 h-6" />
                            </button>
                        </div>
                    </div>

                    <div className="bg-gray-100 px-6 py-3">
                        <div className="flex justify-between items-center text-sm text-gray-600">
                            <span>Step 4 of 5</span>
                            <span>{completionPercentage}% Complete</span>
                        </div>
                        <div className="w-full bg-gray-300 rounded-full h-2 mt-2">
                            <div className="bg-green-600 h-2 rounded-full transition-all duration-300" style={{ width: `${completionPercentage}%` }}></div>
                        </div>
                    </div>

                    <div className="p-6">
                        <div className="bg-white rounded-lg border border-gray-200 p-6">
                            <h3 className="text-lg font-semibold text-gray-800 mb-4">Access Checklist</h3>

                            {/* Physical Keys */}
                            <div className="mb-6">
                                <h4 className="font-semibold text-gray-700 mb-3 flex items-center">
                                    <Key className="w-4 h-4 mr-2 text-blue-600" />
                                    Physical Keys
                                </h4>
                                <div className="space-y-2">
                                    {/* Fix: Added optional chaining */}
                                    {accessData.physicalKeys?.map((item) => (
                                        <label key={item.id} className="flex items-center space-x-3 cursor-pointer">
                                            <input
                                                type="checkbox"
                                                checked={item.completed}
                                                onChange={() => toggleItem('physicalKeys', item.id)}
                                                className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                                            />
                                            <span className={`text-sm ${item.completed ? 'text-gray-500 line-through' : 'text-gray-700'}`}>
                                                {item.label}
                                            </span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            {/* Digital Access */}
                            <div>
                                <h4 className="font-semibold text-gray-700 mb-3 flex items-center">
                                    <QrCode className="w-4 h-4 mr-2 text-green-600" />
                                    Digital Access & Codes
                                </h4>
                                <div className="space-y-4">
                                    {/* Fix: Added optional chaining */}
                                    {accessData.digitalAccess?.map((item) => (
                                        <div key={item.id}>
                                            <label className="flex items-center space-x-3 cursor-pointer mb-2">
                                                <input
                                                    type="checkbox"
                                                    checked={item.completed}
                                                    onChange={() => toggleItem('digitalAccess', item.id)}
                                                    className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                                                />
                                                <span className={`text-sm ${item.completed ? 'text-gray-500 line-through' : 'text-gray-700'}`}>
                                                    {item.label}
                                                </span>
                                            </label>
                                            <input
                                                type="text"
                                                placeholder={`Enter ${item.label}...`}
                                                value={item.value || ''}
                                                onChange={(e) => handleValueChange('digitalAccess', item.id, e.target.value)}
                                                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="border-t border-gray-200 p-6 bg-gray-50">
                        <div className="flex justify-between items-center">
                            <button
                                onClick={onBack}
                                disabled={isSaving}
                                className="flex items-center space-x-2 px-6 py-3 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <ChevronLeft className="w-4 h-4" />
                                <span>Back</span>
                            </button>
                            <div className="flex space-x-3">
                                <button
                                    onClick={onComplete}
                                    disabled={isSaving}
                                    className="px-6 py-3 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    Skip
                                </button>
                                <button
                                    onClick={handleSaveAndNext}
                                    disabled={isSaving}
                                    className="flex items-center space-x-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {isSaving ? (
                                        <>
                                            <Loader2 className="w-4 h-4 animate-spin" />
                                            <span>Saving...</span>
                                        </>
                                    ) : (
                                        <>
                                            <span>Next Step</span>
                                            <ChevronRight className="w-4 h-4" />
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

// 4. Final Checklist Component
export function FinalChecklist({ application, onComplete, onBack }) {
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [checklistData, setChecklistData] = useState({
        finalChecks: [],
        welcome: []
    });

    // Use useMemo for default data
    const defaultChecklistData = useMemo(() => ({
        finalChecks: [
            { id: 1, label: "Confirm emergency contact info is on file", completed: false },
            { id: 2, label: "Confirm first month's rent/deposit received", completed: false },
            { id: 3, label: "Lease agreement signed by all parties", completed: false },
        ],
        welcome: [
            { id: 4, label: "Provide welcome gift / info pack", completed: false },
            { id: 5, label: "Answer any remaining tenant questions", completed: false },
        ]
    }), []);

    useEffect(() => {
        const loadCheckInData = async () => {
            if (!application?._id) return;

            setIsLoading(true);
            try {
                const response = await fetch(`/api/applications/${application._id}/checkin`);
                const result = await response.json();

                if (response.ok && result.data?.finalChecklist) {
                    // *** FIX: Merge saved data with defaults ***
                    setChecklistData({
                        finalChecks: result.data.finalChecklist.finalChecks || defaultChecklistData.finalChecks,
                        welcome: result.data.finalChecklist.welcome || defaultChecklistData.welcome,
                    });
                } else {
                    setChecklistData(defaultChecklistData);
                }
            } catch (error) {
                console.error('Error loading check-in data:', error);
                toast.error('Failed to load final checklist');
                setChecklistData(defaultChecklistData);
            } finally {
                setIsLoading(false);
            }
        };

        loadCheckInData();
    }, [application?._id, defaultChecklistData]);

    const toggleItem = (category, itemId) => {
        setChecklistData(prev => ({
            ...prev,
            [category]: prev[category].map(item =>
                item.id === itemId ? { ...item, completed: !item.completed } : item
            )
        }));
    };

    const handleSaveAndFinish = async () => {
        if (!application?._id) return;

        setIsSaving(true);
        const toastId = toast.loading('Finishing check-in...');

        try {
            const response = await fetch(`/api/applications/${application._id}/checkin`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    stepName: 'finalChecklist',
                    data: checklistData, // This step also saves as an object
                    currentStep: 6, // 6 signifies completion
                    status: 'completed'
                })
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.message || 'Failed to finish check-in');
            }

            toast.success('Check-in complete!', { id: toastId });
            onComplete(); // This prop will now navigate away or close the modal
        } catch (error) {
            console.error('Error finishing check-in:', error);
            toast.error(error.message || 'Failed to finish check-in', { id: toastId });
        } finally {
            setIsSaving(false);
        }
    };

    const completedItems = Object.values(checklistData).flat().filter(item => item.completed).length;
    const totalItems = Object.values(checklistData).flat().length;
    const completionPercentage = totalItems > 0 ? Math.round((completedItems / totalItems) * 100) : 0;

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-96">
                <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
            </div>
        );
    }

    return (
        <div className="flex flex-col lg:flex-row gap-6">
            {/* *** FIX: Pass completion props to sidebar *** */}
            <CheckInProgressSidebar
                application={application}
                currentStep={5}
                completedItems={completedItems}
                totalItems={totalItems}
            />

            <div className="lg:w-2/3">
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-6 text-white">
                        <div className="flex justify-between items-start">
                            <div>
                                <h1 className="text-2xl font-bold">Final Checklist</h1>
                                <p className="text-blue-100 mt-1">Step 5 of 5: Final confirmations and welcome</p>
                            </div>
                            <button onClick={onBack} className="text-white hover:text-blue-200 transition-colors">
                                <X className="w-6 h-6" />
                            </button>
                        </div>
                    </div>

                    <div className="bg-gray-100 px-6 py-3">
                        <div className="flex justify-between items-center text-sm text-gray-600">
                            <span>Step 5 of 5</span>
                            <span>{completionPercentage}% Complete</span>
                        </div>
                        <div className="w-full bg-gray-300 rounded-full h-2 mt-2">
                            <div className="bg-green-600 h-2 rounded-full transition-all duration-300" style={{ width: `${completionPercentage}%` }}></div>
                        </div>
                    </div>

                    <div className="p-6">
                        <div className="bg-white rounded-lg border border-gray-200 p-6">
                            <h3 className="text-lg font-semibold text-gray-800 mb-4">Confirmation Checklist</h3>

                            {/* Final Checks */}
                            <div className="mb-6">
                                <h4 className="font-semibold text-gray-700 mb-3 flex items-center">
                                    <CheckCircle className="w-4 h-4 mr-2 text-blue-600" />
                                    Final Checks
                                </h4>
                                <div className="space-y-2">
                                    {/* Fix: Added optional chaining */}
                                    {checklistData.finalChecks?.map((item) => (
                                        <label key={item.id} className="flex items-center space-x-3 cursor-pointer">
                                            <input
                                                type="checkbox"
                                                checked={item.completed}
                                                onChange={() => toggleItem('finalChecks', item.id)}
                                                className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                                            />
                                            <span className={`text-sm ${item.completed ? 'text-gray-500 line-through' : 'text-gray-700'}`}>
                                                {item.label}
                                            </span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            {/* Welcome & Q/A */}
                            <div>
                                <h4 className="font-semibold text-gray-700 mb-3 flex items-center">
                                    <Star className="w-4 h-4 mr-2 text-yellow-500" />
                                    Welcome & Q/A
                                </h4>
                                <div className="space-y-2">
                                    {/* Fix: Added optional chaining */}
                                    {checklistData.welcome?.map((item) => (
                                        <label key={item.id} className="flex items-center space-x-3 cursor-pointer">
                                            <input
                                                type="checkbox"
                                                checked={item.completed}
                                                onChange={() => toggleItem('welcome', item.id)}
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

                    {/* Footer */}
                    <div className="border-t border-gray-200 p-6 bg-gray-50">
                        <div className="flex justify-between items-center">
                            <button
                                onClick={onBack}
                                disabled={isSaving}
                                className="flex items-center space-x-2 px-6 py-3 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <ChevronLeft className="w-4 h-4" />
                                <span>Back</span>
                            </button>
                            <button
                                onClick={handleSaveAndFinish}
                                disabled={isSaving}
                                className="flex items-center space-x-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isSaving ? (
                                    <>
                                        <Loader2 className="w-4 h-4 animate-spin" />
                                        <span>Finishing...</span>
                                    </>
                                ) : (
                                    <>
                                        <CheckCircle className="w-4 h-4" />
                                        <span>Finish Check-in</span>
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}