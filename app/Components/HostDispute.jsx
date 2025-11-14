// DisputesPage.js
"use client";

import { useState } from 'react';
import HostHeader from './HostHeader';
import HostSidebar from './HostSidebar';
import { Search, Filter, Plus, AlertTriangle, CheckCircle, DollarSign, Clock, FileText, Upload, X, ChevronDown, Home, User, Check, Image, File } from 'lucide-react';

// --- Dummy Data for Disputes ---
const initialDisputes = [
    {
        id: 1,
        caseNumber: 'DSP-2024-1206',
        title: "Sarah Johnson filed against you",
        property: "Cory Room in Victorian House",
        filedDate: "5 days ago",
        category: "Apartment Not as Described",
        status: "active",
        type: "filed-against",
        amount: 640,
        responseDue: true
    },
    {
        id: 2,
        caseNumber: 'DSP-2024-1205',
        title: "You filed against John Davis",
        property: "Ocean View Apartment",
        filedDate: "1 day ago",
        category: "Apartment Damage",
        status: "active",
        type: "filed-by",
        amount: 320,
        responseDue: false
    },
    {
        id: 3,
        caseNumber: 'DSP-2024-1204',
        title: "Mike Wilson filed against you",
        property: "Downtown Studio",
        filedDate: "2 weeks ago",
        category: "Extra Cleaning Required",
        status: "resolved",
        type: "filed-against",
        amount: 150,
        responseDue: false
    }
];

// --- Dummy Bookings Data ---
const recentBookings = [
    {
        id: 1,
        guestName: "Sarah Chen",
        propertyName: "Cozy Room in Victorian House",
        moveInDate: "Dec 10-14, 2024",
        totalAmount: 750.00,
        guestId: "guest_001"
    },
    {
        id: 2,
        guestName: "John Davis",
        propertyName: "Ocean View Apartment",
        moveInDate: "Dec 5-12, 2024",
        totalAmount: 920.00,
        guestId: "guest_002"
    },
    {
        id: 3,
        guestName: "Mike Wilson",
        propertyName: "Downtown Studio",
        moveInDate: "Dec 15-20, 2024",
        totalAmount: 680.00,
        guestId: "guest_003"
    }
];

// --- Success Page Component ---
const DisputeSuccessPage = ({ disputeData, onBackToDisputes }) => {
    return (
        <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="mb-8">
                <button
                    onClick={onBackToDisputes}
                    className="flex items-center text-gray-600 hover:text-gray-900 mb-4 transition duration-150"
                >
                    <X className="w-5 h-5 mr-2" />
                    Back to Disputes
                </button>
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                    Dispute Filed Successfully
                </h1>
                <p className="text-gray-600">
                    Your dispute has been submitted and the guest has been notified
                </p>
            </div>

            {/* Success Message */}
            <div className="bg-green-50 border border-green-200 rounded-xl p-6 sm:p-8 mb-8">
                <div className="flex items-center mb-4">
                    <CheckCircle className="w-8 h-8 text-green-600 mr-3" />
                    <h2 className="text-xl font-bold text-green-800">Dispute Successfully Filed!</h2>
                </div>
                <p className="text-green-700">
                    Your dispute claim has been submitted to our review team. The guest has been automatically notified and has 5 business days to respond.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Left Column */}
                <div className="space-y-6">
                    {/* Case Details */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Case Details</h3>
                        <div className="space-y-3">
                            <div>
                                <label className="block text-sm font-medium text-gray-600">Case Reference</label>
                                <p className="text-lg font-semibold text-gray-900">#DSP-2024-1205</p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-600">Filed On</label>
                                <p className="text-lg font-semibold text-gray-900">Dec 15, 2024 at 3:45 PM</p>
                            </div>
                        </div>
                    </div>

                    {/* Booking Summary */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Dispute Summary</h3>
                        <div className="space-y-3">
                            <div className="font-semibold text-gray-900">Sarah Chen</div>
                            <p className="text-gray-600">Cozy Room in Victorian House</p>
                            <p className="text-gray-500">Move-in Date: Dec 10-14, 2024</p>
                            <p className="text-lg font-semibold text-gray-900">€750.00 total</p>
                        </div>
                    </div>

                    {/* Evidence Submitted */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Evidence Submitted</h3>
                        <p className="text-gray-600 mb-4">The following evidence was included with your dispute:</p>
                        <div className="space-y-3">
                            <div className="flex items-center p-3 border border-gray-200 rounded-lg">
                                <Image className="w-5 h-5 text-blue-500 mr-3" />
                                <div className="flex-1">
                                    <div className="font-medium text-gray-900">sofa_damage_photo.jpg</div>
                                    <div className="text-sm text-gray-600">Photo of wine stain damage</div>
                                    <div className="text-xs text-gray-500">Uploaded: Dec 15, 2024</div>
                                </div>
                            </div>
                            <div className="flex items-center p-3 border border-gray-200 rounded-lg">
                                <Image className="w-5 h-5 text-blue-500 mr-3" />
                                <div className="flex-1">
                                    <div className="font-medium text-gray-900">table_damage_photo.jpg</div>
                                    <div className="text-sm text-gray-600">Broken coffee table documentation</div>
                                    <div className="text-xs text-gray-500">Uploaded: Dec 15, 2024</div>
                                </div>
                            </div>
                            <div className="flex items-center p-3 border border-gray-200 rounded-lg">
                                <File className="w-5 h-5 text-green-500 mr-3" />
                                <div className="flex-1">
                                    <div className="font-medium text-gray-900">cleaning_receipt.pdf</div>
                                    <div className="text-sm text-gray-600">Professional cleaning estimate</div>
                                    <div className="text-xs text-gray-500">Uploaded: Dec 15, 2024</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Column */}
                <div className="space-y-6">
                    {/* Claimed Damages */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                        <div className="flex items-center mb-4">
                            <div className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm font-medium">
                                APARTMENT DAMAGE
                            </div>
                        </div>
                        
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Claimed Damages:</h3>
                        
                        <div className="space-y-4">
                            <div className="flex justify-between items-center py-2 border-b border-gray-100">
                                <div>
                                    <div className="font-medium text-gray-900">Red wine stain on white sofa</div>
                                    <div className="text-sm text-gray-600">Professional cleaning</div>
                                </div>
                                <div className="font-semibold text-gray-900">€180.00</div>
                            </div>
                            <div className="flex justify-between items-center py-2 border-b border-gray-100">
                                <div>
                                    <div className="font-medium text-gray-900">Broken glass coffee table</div>
                                    <div className="text-sm text-gray-600">Replacement</div>
                                </div>
                                <div className="font-semibold text-gray-900">€320.00</div>
                            </div>
                            <div className="flex justify-between items-center py-2 border-b border-gray-100">
                                <div>
                                    <div className="font-medium text-gray-900">Damaged hardwood floor</div>
                                    <div className="text-sm text-gray-600">Refinishing</div>
                                </div>
                                <div className="font-semibold text-gray-900">€150.00</div>
                            </div>
                        </div>

                        {/* Total Amount */}
                        <div className="mt-6 pt-4 border-t border-gray-200">
                            <div className="flex justify-between items-center">
                                <span className="text-lg font-semibold text-gray-900">Total Dispute Amount:</span>
                                <span className="text-2xl font-bold text-green-600">€650.00</span>
                            </div>
                        </div>
                    </div>

                    {/* What Happens Next */}
                    <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
                        <h3 className="text-lg font-semibold text-blue-900 mb-4">What Happens Next</h3>
                        <div className="space-y-4">
                            <div className="flex items-start">
                                <div className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-bold mr-3 mt-0.5">
                                    1
                                </div>
                                <div>
                                    <h4 className="font-medium text-blue-900">Guest Notification</h4>
                                    <p className="text-blue-700 text-sm mt-1">
                                        The guest has been automatically notified of your dispute claim via email and in-app notification.
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-start">
                                <div className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-bold mr-3 mt-0.5">
                                    2
                                </div>
                                <div>
                                    <h4 className="font-medium text-blue-900">Guest Response</h4>
                                    <p className="text-blue-700 text-sm mt-1">
                                        The guest has 5 business days to respond to your dispute claim.
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-start">
                                <div className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-bold mr-3 mt-0.5">
                                    3
                                </div>
                                <div>
                                    <h4 className="font-medium text-blue-900">Case Review</h4>
                                    <p className="text-blue-700 text-sm mt-1">
                                        Our team will review all evidence and make a decision within 3-5 business days after guest response.
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-start">
                                <div className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-bold mr-3 mt-0.5">
                                    4
                                </div>
                                <div>
                                    <h4 className="font-medium text-blue-900">Resolution</h4>
                                    <p className="text-blue-700 text-sm mt-1">
                                        You will be notified of the decision and any payment will be processed automatically.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col sm:flex-row gap-3">
                        <button
                            onClick={onBackToDisputes}
                            className="flex-1 py-3 px-6 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition duration-150"
                        >
                            Back to Disputes
                        </button>
                  
                    </div>
                </div>
            </div>
        </div>
    );
};

// --- Dispute Item Component ---
const DisputeItem = ({ dispute, onViewDetails }) => {
    const isFiledAgainst = dispute.type === 'filed-against';
    
    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6 mb-4 transition-all duration-200 hover:shadow-md">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-4">
                <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        {dispute.title}
                    </h3>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 text-sm text-gray-600">
                        <span className="font-medium">{dispute.caseNumber}</span>
                        <span className="hidden sm:block">•</span>
                        <span>Apartment: {dispute.property}</span>
                    </div>
                    <div className="flex items-center gap-4 mt-2">
                        <span className="text-xs text-gray-500">{dispute.filedDate}</span>
                        {dispute.responseDue && (
                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                                RESPONSE DUE
                            </span>
                        )}
                    </div>
                </div>
                
                {dispute.responseDue && (
                    <div className="mt-3 sm:mt-0 sm:text-right">
                        <div className="text-2xl font-bold text-red-600">€{dispute.amount}</div>
                    </div>
                )}
            </div>

            {/* Category */}
            <div className="mb-4">
                <span className="inline-block px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-sm font-medium">
                    {dispute.category}
                </span>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap gap-2 sm:gap-3">
                <button
                    onClick={() => onViewDetails(dispute.id)}
                    className="flex-1 sm:flex-none py-2 px-4 border border-gray-300 text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 transition duration-150"
                >
                    View Details
                </button>
                {isFiledAgainst ? (
                    <>
                        <button className="flex-1 sm:flex-none py-2 px-4 border border-green-600 text-sm font-medium rounded-lg text-green-600 bg-white hover:bg-green-50 transition duration-150">
                            Accept
                        </button>
                        <button className="flex-1 sm:flex-none py-2 px-4 border border-red-600 text-sm font-medium rounded-lg text-red-600 bg-white hover:bg-red-50 transition duration-150">
                            Contest
                        </button>
                    </>
                ) : (
                    <button className="flex-1 sm:flex-none py-2 px-4 border border-gray-300 text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 transition duration-150">
                        Update Case
                    </button>
                )}
            </div>
        </div>
    );
};

// --- Booking Selection Component ---
const BookingSelection = ({ bookings, selectedBooking, onSelectBooking }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Booking <span className="text-red-500">*</span>
            </label>
            
            {/* Dropdown Trigger */}
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex justify-between items-center p-4 border border-gray-300 rounded-lg bg-white hover:border-gray-400 transition duration-150 text-left"
            >
                <span className={selectedBooking ? "text-gray-900" : "text-gray-400"}>
                    {selectedBooking ? `${selectedBooking.guestName} - ${selectedBooking.propertyName}` : "Select a recent booking..."}
                </span>
                <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${isOpen ? 'transform rotate-180' : ''}`} />
            </button>

            {/* Dropdown Menu */}
            {isOpen && (
                <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-auto">
                    {bookings.map((booking) => (
                        <button
                            key={booking.id}
                            type="button"
                            onClick={() => {
                                onSelectBooking(booking);
                                setIsOpen(false);
                            }}
                            className={`w-full p-4 text-left hover:bg-gray-50 transition duration-150 border-b border-gray-100 last:border-b-0 ${
                                selectedBooking?.id === booking.id ? 'bg-green-50 border-green-200' : ''
                            }`}
                        >
                            <div className="flex justify-between items-start">
                                <div className="flex-1">
                                    <div className="font-semibold text-gray-900">{booking.guestName}</div>
                                    <div className="text-sm text-gray-600">{booking.propertyName}</div>
                                    <div className="text-sm text-gray-500">Move-in Date: {booking.moveInDate}</div>
                                </div>
                                <div className="text-lg font-semibold text-gray-900 ml-4">
                                    €{booking.totalAmount.toFixed(2)} total
                                </div>
                            </div>
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

// --- File Dispute Form Component ---
const FileDisputeForm = ({ onBack, onSubmit }) => {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        booking: null,
        category: '',
        damageDetails: '',
        damageItems: [
            { item: '', description: '', cost: '' }
        ],
        totalAmount: 0,
        evidence: []
    });

    const damageCategories = [
        {
            value: 'damage',
            label: 'Apartment Damage',
            description: 'Physical damage to apartment, furniture, or amenities caused by guest'
        },
        {
            value: 'policy',
            label: 'Policy Violation',
            description: 'Violations of house rules, occupancy limits, or booking terms'
        },
        {
            value: 'cleaning',
            label: 'Extra Cleaning Required',
            description: 'Apartment left in unacceptable condition requiring additional cleaning'
        }
    ];

    const handleSelectBooking = (booking) => {
        setFormData(prev => ({ ...prev, booking }));
    };

    const handleAddDamageItem = () => {
        setFormData(prev => ({
            ...prev,
            damageItems: [
                ...prev.damageItems,
                { item: '', description: '', cost: '' }
            ]
        }));
    };

    const handleDamageItemChange = (index, field, value) => {
        setFormData(prev => ({
            ...prev,
            damageItems: prev.damageItems.map((item, i) => 
                i === index ? { ...item, [field]: value } : item
            )
        }));
    };

    const handleRemoveDamageItem = (index) => {
        setFormData(prev => ({
            ...prev,
            damageItems: prev.damageItems.filter((_, i) => i !== index)
        }));
    };

    const handleFileUpload = (event) => {
        const files = Array.from(event.target.files);
        setFormData(prev => ({
            ...prev,
            evidence: [...prev.evidence, ...files]
        }));
    };

    const calculateTotal = () => {
        return formData.damageItems.reduce((total, item) => total + (parseFloat(item.cost) || 0), 0);
    };

    return (
        <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="mb-8">
                <button
                    onClick={onBack}
                    className="flex items-center text-gray-600 hover:text-gray-900 mb-4 transition duration-150"
                >
                    <X className="w-5 h-5 mr-2" />
                    Back to Disputes
                </button>
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                    File Dispute
                </h1>
                <p className="text-gray-600">
                    File a dispute claim against a guest for apartment damage or policy violations
                </p>
            </div>

            {/* Important Information */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 sm:p-6 mb-8">
                <div className="flex items-start">
                    <AlertTriangle className="w-5 h-5 text-yellow-600 mr-3 mt-0.5 flex-shrink-0" />
                    <div>
                        <h3 className="font-semibold text-yellow-800 mb-2">Important Information</h3>
                        <p className="text-yellow-700 text-sm">
                            Please ensure you have documented evidence before filing a dispute. 
                            False or frivolous claims may result in penalties. Review our dispute policy before proceeding.
                        </p>
                    </div>
                </div>
            </div>

            {step === 1 && (
                <div className="space-y-8">
                    {/* Select Booking */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">
                            Select Booking
                        </h3>
                        <p className="text-gray-600 mb-4">
                            Choose the booking related to this dispute:
                        </p>
                        
                        <BookingSelection 
                            bookings={recentBookings}
                            selectedBooking={formData.booking}
                            onSelectBooking={handleSelectBooking}
                        />

                        {/* Required Field Note */}
                        <div className="mt-2 flex items-center text-sm text-red-600">
                            <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
                            Required
                        </div>
                    </div>

                    {/* Dispute Category */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">
                            Dispute Category
                        </h3>
                        <p className="text-gray-600 mb-4">
                            Select the type of dispute you're filing:
                        </p>

                        <div className="space-y-3">
                            {damageCategories.map((category) => (
                                <label 
                                    key={category.value}
                                    className="flex items-start p-4 border border-gray-200 rounded-lg hover:border-green-500 transition duration-150 cursor-pointer"
                                >
                                    <input
                                        type="radio"
                                        name="category"
                                        value={category.value}
                                        className="mt-1 mr-3 text-green-600 focus:ring-green-500"
                                        onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                                    />
                                    <div>
                                        <div className="font-medium text-gray-900">{category.label}</div>
                                        <div className="text-sm text-gray-600 mt-1">{category.description}</div>
                                    </div>
                                </label>
                            ))}
                        </div>
                    </div>

                    <button
                        onClick={() => setStep(2)}
                        disabled={!formData.booking || !formData.category}
                        className="w-full sm:w-auto bg-green-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-green-700 transition duration-150 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Continue to Damage Details
                    </button>
                </div>
            )}

            {step === 2 && (
                <div className="space-y-8">
                    {/* Selected Booking Preview */}
                    {formData.booking && (
                        <div className="bg-green-50 border border-green-200 rounded-xl p-6">
                            <h3 className="text-lg font-semibold text-green-800 mb-3">Selected Booking</h3>
                            <div className="flex justify-between items-start">
                                <div>
                                    <div className="font-semibold text-gray-900">{formData.booking.guestName}</div>
                                    <div className="text-sm text-gray-600">{formData.booking.propertyName}</div>
                                    <div className="text-sm text-gray-500">Move-in Date: {formData.booking.moveInDate}</div>
                                </div>
                                <div className="text-lg font-semibold text-gray-900">
                                    €{formData.booking.totalAmount.toFixed(2)} total
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Damage Details */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">
                            Damage Details
                        </h3>

                        {/* Description */}
                        <div className="mb-6">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Describe the damage or issue in detail:
                            </label>
                            <textarea
                                rows={4}
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-green-500 focus:border-green-500 transition duration-150"
                                placeholder="Provide a detailed description of what happened, when it was discovered, and the extent of the damage. Be specific and factual."
                                value={formData.damageDetails}
                                onChange={(e) => setFormData(prev => ({ ...prev, damageDetails: e.target.value }))}
                            />
                        </div>

                        {/* Damage Items */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-4">
                                Itemize specific damages and costs:
                            </label>

                            {formData.damageItems.map((item, index) => (
                                <div key={index} className="border border-gray-200 rounded-lg p-4 mb-4">
                                    <div className="flex justify-between items-center mb-3">
                                        <h4 className="font-medium text-gray-900">Damage Item #{index + 1}</h4>
                                        {formData.damageItems.length > 1 && (
                                            <button
                                                type="button"
                                                onClick={() => handleRemoveDamageItem(index)}
                                                className="text-red-600 hover:text-red-800 text-sm font-medium transition duration-150"
                                            >
                                                Remove
                                            </button>
                                        )}
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        <div>
                                            <label className="block text-xs font-medium text-gray-600 mb-1">
                                                Item/Area Damaged:
                                            </label>
                                            <input
                                                type="text"
                                                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-green-500 focus:border-green-500"
                                                placeholder="White leather sofa in living room"
                                                value={item.item}
                                                onChange={(e) => handleDamageItemChange(index, 'item', e.target.value)}
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-medium text-gray-600 mb-1">
                                                Damage Description:
                                            </label>
                                            <input
                                                type="text"
                                                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-green-500 focus:border-green-500"
                                                placeholder="Large red wine stain, requires professional cleaning"
                                                value={item.description}
                                                onChange={(e) => handleDamageItemChange(index, 'description', e.target.value)}
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-medium text-gray-600 mb-1">
                                                Estimated Cost:
                                            </label>
                                            <div className="relative">
                                                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">€</span>
                                                <input
                                                    type="number"
                                                    className="w-full border border-gray-300 rounded-lg pl-8 pr-3 py-2 text-sm focus:ring-green-500 focus:border-green-500"
                                                    placeholder="180.00"
                                                    value={item.cost}
                                                    onChange={(e) => handleDamageItemChange(index, 'cost', e.target.value)}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}

                            <button
                                type="button"
                                onClick={handleAddDamageItem}
                                className="flex items-center text-green-600 hover:text-green-700 font-medium transition duration-150"
                            >
                                <Plus className="w-4 h-4 mr-1" />
                                Add Another Damage Item
                            </button>
                        </div>
                    </div>

                    {/* Total Amount */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                        <div className="flex justify-between items-center">
                            <span className="text-lg font-semibold text-gray-900">Total Dispute Amount:</span>
                            <span className="text-2xl font-bold text-green-600">
                                €{calculateTotal().toFixed(2)}
                            </span>
                        </div>
                    </div>

                    {/* Evidence Upload */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">
                            Evidence & Documentation
                        </h3>
                        <p className="text-gray-600 mb-4">
                            Upload photos and documents to support your claim. Clear, high-quality evidence strengthens your case.
                        </p>

                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-gray-400 transition duration-150 cursor-pointer">
                            <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                            <div className="text-gray-600 mb-2">Upload Photo evidence</div>
                            <div className="text-sm text-gray-500 mb-4">Drag & drop files here or click to browse</div>
                            <input
                                type="file"
                                multiple
                                accept="image/*,.pdf,.doc,.docx"
                                onChange={handleFileUpload}
                                className="hidden"
                                id="evidence-upload"
                            />
                            <label 
                                htmlFor="evidence-upload"
                                className="bg-gray-100 text-gray-700 py-2 px-4 rounded-lg text-sm font-medium hover:bg-gray-200 transition duration-150 cursor-pointer"
                            >
                                Choose File
                            </label>
                        </div>

                        {/* Uploaded Files */}
                        {formData.evidence.length > 0 && (
                            <div className="mt-4">
                                <h4 className="font-medium text-gray-900 mb-3">Uploaded Files:</h4>
                                <div className="space-y-2">
                                    {formData.evidence.map((file, index) => (
                                        <div key={index} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                                            <div className="flex items-center">
                                                <File className="w-4 h-4 text-gray-400 mr-2" />
                                                <span className="text-sm text-gray-700">{file.name}</span>
                                            </div>
                                            <button
                                                type="button"
                                                onClick={() => setFormData(prev => ({
                                                    ...prev,
                                                    evidence: prev.evidence.filter((_, i) => i !== index)
                                                }))}
                                                className="text-red-500 hover:text-red-700"
                                            >
                                                <X className="w-4 h-4" />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3">
                        <button
                            type="button"
                            onClick={() => setStep(1)}
                            className="flex-1 py-3 px-6 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition duration-150"
                        >
                            Back
                        </button>
                        <button
                            onClick={onSubmit}
                            className="flex-1 bg-green-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-green-700 transition duration-150"
                        >
                            Submit Dispute
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

// --- Main Disputes Page Component ---
const DisputesPage = () => {
    const [activeTab, setActiveTab] = useState('all');
    const [showFileDispute, setShowFileDispute] = useState(false);
    const [showSuccessPage, setShowSuccessPage] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    // Stats data
    const stats = [
        { icon: AlertTriangle, title: "Active Disputes", count: "3", subtitle: "Requiring your attention", color: "text-red-500", bgColor: "bg-red-100" },
        { icon: CheckCircle, title: "Resolved Disputes", count: "7", subtitle: "Successfully Closed", color: "text-green-600", bgColor: "bg-green-100" },
        { icon: DollarSign, title: "Total Disputed", count: "€1,250", subtitle: "Last 30 days", color: "text-blue-500", bgColor: "bg-blue-100" }
    ];

    const filteredDisputes = initialDisputes.filter(dispute => {
        if (activeTab === 'all') return true;
        return dispute.status === activeTab;
    });

    const handleViewDetails = (disputeId) => {
        console.log(`View details for dispute ${disputeId}`);
        // Navigate to dispute details page or show modal
    };

    const handleSubmitDispute = () => {
        console.log("Dispute submitted");
        setShowFileDispute(false);
        setShowSuccessPage(true);
    };

    const handleBackToDisputes = () => {
        setShowSuccessPage(false);
        setShowFileDispute(false);
    };

    if (showSuccessPage) {
        return (
            <div className="flex min-h-screen bg-gray-50">
                <HostSidebar />
                <div className="flex-1 flex flex-col min-w-0">
                    <HostHeader />
                    <main className="flex-1 p-4 sm:p-6 lg:p-8">
                        <DisputeSuccessPage 
                            onBackToDisputes={handleBackToDisputes}
                        />
                    </main>
                </div>
            </div>
        );
    }

    if (showFileDispute) {
        return (
            <div className="flex min-h-screen bg-gray-50">
                <HostSidebar />
                <div className="flex-1 flex flex-col min-w-0">
                    <HostHeader />
                    <main className="flex-1 p-4 sm:p-6 lg:p-8">
                        <FileDisputeForm 
                            onBack={() => setShowFileDispute(false)}
                            onSubmit={handleSubmitDispute}
                        />
                    </main>
                </div>
            </div>
        );
    }

    return (
        <div className="flex min-h-screen bg-gray-50">
            <HostSidebar />
            
            <div className="flex-1 flex flex-col min-w-0">
                <HostHeader />
                
                <main className="flex-1 p-4 sm:p-6 lg:p-8">
                    <div className="max-w-7xl mx-auto w-full">
                        
                        {/* Header Section */}
                        <div className="mb-8">
                            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                                Disputes Management
                            </h1>
                            <p className="text-gray-600">
                                Manage all dispute cases and claims for your properties
                            </p>
                        </div>

                        {/* Stats Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 mb-8">
                            {stats.map((stat, index) => (
                                <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6">
                                    <div className="flex items-center">
                                        <div className={`p-3 rounded-full ${stat.bgColor} ${stat.color} mr-4`}>
                                            <stat.icon className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <div className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">
                                                {stat.count}
                                            </div>
                                            <div className="text-sm font-medium text-gray-900">{stat.title}</div>
                                            <div className="text-sm text-gray-500">{stat.subtitle}</div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Action Bar */}
                        <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center mb-6">
                            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                                {/* Search */}
                                <div className="relative flex-1 sm:w-64">
                                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                                    <input
                                        type="text"
                                        placeholder="Search by guest name, case ID, or property..."
                                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500 transition duration-150 text-sm"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                    />
                                </div>
                                
                                {/* Filter Button */}
                                <button className="flex items-center py-2 px-4 border border-gray-300 rounded-lg text-gray-700 bg-white hover:bg-gray-50 transition duration-150 text-sm">
                                    <Filter className="w-4 h-4 mr-2" />
                                    Filter
                                </button>
                            </div>

                            {/* File New Dispute Button */}
                            <button
                                onClick={() => setShowFileDispute(true)}
                                className="flex items-center py-2 px-4 bg-green-600 text-white rounded-lg hover:bg-green-700 transition duration-150 text-sm font-medium w-full sm:w-auto justify-center"
                            >
                                <Plus className="w-4 h-4 mr-2" />
                                File New Dispute
                            </button>
                        </div>

                        {/* Tabs */}
                        <div className="flex space-x-1 bg-gray-100 rounded-lg p-1 mb-6 w-fit">
                            {['all', 'active', 'resolved'].map((tab) => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab)}
                                    className={`px-4 py-2 rounded-md text-sm font-medium transition duration-150 ${
                                        activeTab === tab
                                            ? 'bg-white text-gray-900 shadow-sm'
                                            : 'text-gray-600 hover:text-gray-900'
                                    }`}
                                >
                                    {tab === 'all' ? 'All Disputes' : tab === 'active' ? 'Active' : 'Resolved'} 
                                    {tab === 'all' && ` (${initialDisputes.length})`}
                                    {tab === 'active' && ` (${initialDisputes.filter(d => d.status === 'active').length})`}
                                    {tab === 'resolved' && ` (${initialDisputes.filter(d => d.status === 'resolved').length})`}
                                </button>
                            ))}
                        </div>

                        {/* Disputes List */}
                        <div className="space-y-4">
                            {filteredDisputes.map(dispute => (
                                <DisputeItem 
                                    key={dispute.id} 
                                    dispute={dispute} 
                                    onViewDetails={handleViewDetails}
                                />
                            ))}
                        </div>

                        {/* Empty State */}
                        {filteredDisputes.length === 0 && (
                            <div className="text-center py-12">
                                <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                                <h3 className="text-lg font-medium text-gray-900 mb-2">No disputes found</h3>
                                <p className="text-gray-500 mb-6">There are no disputes matching your current filters.</p>
                                <button
                                    onClick={() => setShowFileDispute(true)}
                                    className="inline-flex items-center py-2 px-4 bg-green-600 text-white rounded-lg hover:bg-green-700 transition duration-150 text-sm font-medium"
                                >
                                    <Plus className="w-4 h-4 mr-2" />
                                    File Your First Dispute
                                </button>
                            </div>
                        )}
                    </div>
                </main>
            </div>
        </div>
    );
};

export default DisputesPage;