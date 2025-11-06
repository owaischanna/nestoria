"use client";

import React, { useState, useRef } from 'react';
import { 
    Download, MapPin, Star, Clock, Home, Users, Square,
    FileText, CheckCircle, ArrowLeft, ThumbsUp, ThumbsDown, UploadCloud, KeyRound
} from 'lucide-react';

// Assume these components are available in your project
import RenterHeader from './RenterHeader';
import Sidebar from './RenterSidebar';

// --- ORIGINAL MOCK DATA (Unchanged) ---
const bookingsData = {
    summary: { active: 2, checkIns: 1, checkOuts: 1, totalSpent: '€1,900' },
    currentBookings: [
        {
            id: 1,
            status: 'Check-in Today',
            title: 'Modern Studio in Brooklyn',
            location: 'Williamsburg, Brooklyn',
            host: { name: 'Margaret Johnson', rating: 4.8, reviews: 24, avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=80&q=80' },
            leasePeriod: 'Oct 28, 2024 - Apr 28, 2025',
            remainingMonths: '6 months remaining',
            monthlyRent: '€950/month',
            totalPaid: '€950',
            nextDue: 'Nov 1',
            paymentsCount: '1 of 6 payments',
            propertyType: 'Studio',
            roomType: 'Private',
            size: '400 sqft',
            checkInScheduled: '2:00 PM - 3:00 PM',
            propertyAddress: '245 Berry St, Apt 3B, Brooklyn, NY 11211',
            hostContact: '+1 (555) 234-5678',
            image: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=800&q=80',
        },
        {
            id: 2,
            status: 'Active Booking',
            title: 'Cozy Room Near NYU Campus',
            location: 'Greenwich Village, Manhattan',
            host: { name: 'Margaret Johnson', rating: 4.8, reviews: 24, avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=80&q=80' },
            leasePeriod: 'Nov 1, 2024 - May 1, 2025',
            image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80',
            // ... other properties are assumed to be similar
        },
    ]
};

// ============================================================================
// --- NEW & EXPANDED Multi-Step Process Components ---
// ============================================================================

const CheckInStepper = ({ booking, currentStep }) => {
    const steps = [
        { id: 1, title: 'Arrival Confirmed', details: 'On time at 2:00 PM' },
        { id: 2, title: 'Identity Verification' },
        { id: 3, title: 'Property Tour' },
        { id: 4, title: 'Keys & Access' },
        { id: 5, title: 'Move-in Complete' },
    ];
    const getStatus = (stepId) => {
        if (stepId < currentStep) return 'Completed';
        if (stepId === currentStep) return 'In Progress';
        return 'Pending';
    };
    const StatusIcon = ({ status, stepId }) => {
        if (status === 'Completed') return <div className="w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center"><CheckCircle size={14} /></div>;
        if (status === 'In Progress') return <div className="w-6 h-6 bg-orange-500 text-white rounded-full flex items-center justify-center font-bold text-sm">{stepId}</div>;
        return <div className="w-6 h-6 bg-gray-200 text-gray-500 rounded-full flex items-center justify-center font-bold text-sm">{stepId}</div>;
    };
    return (
        <div className="w-full md:w-80 flex-shrink-0 bg-white p-4 md:p-6 border-b md:border-r border-gray-200">
             <h2 className="font-bold text-lg text-gray-800 mb-4">CHECK-IN IN PROGRESS</h2>
            <div className="relative pl-3">
                {steps.map((step, index) => {
                    const status = getStatus(step.id);
                    return (
                        <div key={step.id} className="relative flex items-start py-3">
                            {index !== steps.length - 1 && <div className="absolute left-[11px] top-9 h-full w-0.5 bg-gray-200"></div>}
                            <StatusIcon status={status} stepId={step.id} />
                            <div className="ml-4">
                                <p className={`font-semibold text-sm md:text-base ${status === 'In Progress' ? 'text-orange-600' : 'text-gray-800'}`}>{step.title}</p>
                                <p className="text-xs md:text-sm text-gray-500">{step.details || status}</p>
                            </div>
                        </div>
                    )
                })}
            </div>
             <div className="mt-6 md:mt-8">
                <h3 className="text-sm font-semibold uppercase text-gray-500 mb-2">YOUR NEW HOME</h3>
                <div className="bg-gray-50 rounded-lg p-3">
                    <img src={booking.image} alt={booking.title} className="w-full h-24 md:h-32 object-cover rounded-md mb-3" />
                    <p className="font-bold text-gray-900 text-sm md:text-base">{booking.title}</p>
                </div>
            </div>
            <div className="mt-4 bg-yellow-50 border-l-4 border-yellow-400 p-3 md:p-4 rounded-r-lg">
                <h4 className="font-bold text-yellow-800 text-sm md:text-base">IMPORTANT</h4>
                <ul className="list-disc list-inside text-xs md:text-sm text-yellow-700 mt-1 space-y-1">
                    <li>Have your ID ready for verification</li>
                    <li>Host will meet you at the property</li>
                </ul>
            </div>
        </div>
    );
};

const DocumentUploader = ({ title, onVerificationComplete }) => {
    const [status, setStatus] = useState('pending');
    const [fileName, setFileName] = useState('');
    const fileInputRef = useRef(null);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (!file) return;
        setFileName(file.name);
        setStatus('uploading');
        setTimeout(() => {
            setStatus('verifying');
            setTimeout(() => {
                setStatus('verified');
                onVerificationComplete();
            }, 1500);
        }, 1000);
    };

    return (
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center p-3 md:p-4 border border-gray-200 rounded-lg gap-2">
            <div className="flex items-center"><FileText size={20} className="text-gray-500 mr-3"/><div><p className="font-medium text-gray-800 text-sm md:text-base">{title}</p>{fileName && <p className="text-xs md:text-sm text-gray-500 truncate">{fileName}</p>}</div></div>
            {status === 'pending' && <button onClick={() => fileInputRef.current.click()} className="px-3 md:px-4 py-2 text-xs md:text-sm font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 flex items-center justify-center"><UploadCloud size={14} className="mr-1 md:mr-2"/>Upload Document</button>}
            {status === 'uploading' && <span className="text-xs md:text-sm font-semibold text-blue-600">Uploading...</span>}
            {status === 'verifying' && <span className="text-xs md:text-sm font-semibold text-orange-600">Verifying...</span>}
            {status === 'verified' && <span className="text-xs md:text-sm font-semibold text-green-600 flex items-center"><CheckCircle size={14} className="mr-1 md:mr-2"/>Verified</span>}
            <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" />
        </div>
    );
};

const WhatNext = () => (
    <div className="bg-white p-4 md:p-6 rounded-xl border border-gray-200 mt-6 md:mt-8">
        <h3 className="font-bold text-lg text-gray-800 mb-4">What's Next</h3>
        <div className="space-y-3 md:space-y-4">
            <div className="flex items-center justify-between p-3 md:p-4 bg-gray-50 rounded-lg"><div className="flex items-center"><div className="w-8 h-8 md:w-10 md:h-10 bg-gray-200 rounded-full flex items-center justify-center mr-3 md:mr-4"><Home size={16} className="text-gray-600"/></div><div><p className="font-semibold text-sm md:text-base">Step 3: Property Tour</p><p className="text-xs md:text-sm text-gray-500">Your host will show you around the property</p></div></div><div className="flex items-center text-xs md:text-sm text-gray-500"><Clock size={12} className="mr-1"/>~10 min</div></div>
            <div className="flex items-center justify-between p-3 md:p-4 bg-gray-50 rounded-lg"><div className="flex items-center"><div className="w-8 h-8 md:w-10 md:h-10 bg-gray-200 rounded-full flex items-center justify-center mr-3 md:mr-4"><KeyRound size={16} className="text-gray-600"/></div><div><p className="font-semibold text-sm md:text-base">Step 4: Keys & Access Setup</p><p className="text-xs md:text-sm text-gray-500">Receive your keys and access codes</p></div></div><div className="flex items-center text-xs md:text-sm text-gray-500"><Clock size={12} className="mr-1"/>~5 min</div></div>
        </div>
    </div>
);

const IdentityVerificationStep = ({ onContinue, onBack }) => {
    const [idVerified, setIdVerified] = useState(false);
    const [bankVerified, setBankVerified] = useState(false);
    const allVerified = idVerified && bankVerified;

    return (
        <div>
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 gap-4">
                <h1 className="text-xl md:text-2xl font-bold text-gray-900">Check-in Process</h1>
                <button onClick={onBack} className="flex items-center justify-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 w-full sm:w-auto">
                    <ArrowLeft size={16} className="mr-2"/> Back to Bookings
                </button>
            </div>
            <div className="bg-white p-4 md:p-6 rounded-xl border border-gray-200">
                <h3 className="font-bold text-lg text-gray-800">Step 2: Identity Verification</h3>
                <p className="text-gray-600 mt-1 text-sm md:text-base">Please upload your documents to complete verification.</p>
                <div className="mt-4 md:mt-6 space-y-3 md:space-y-4">
                    <DocumentUploader title="Government-issued Photo ID" onVerificationComplete={() => setIdVerified(true)} />
                    <DocumentUploader title="Financial Verification" onVerificationComplete={() => setBankVerified(true)} />
                </div>
                {allVerified && (
                    <div className="flex justify-end mt-6 md:mt-8">
                        <button onClick={onContinue} className="px-4 md:px-6 py-2 text-sm font-semibold text-white bg-green-600 rounded-lg hover:bg-green-700 w-full sm:w-auto">Continue</button>
                    </div>
                )}
            </div>
            <WhatNext />
        </div>
    );
};

const RateYourExperienceStep = ({ onContinue, onBack }) => {
    const [overallRating, setOverallRating] = useState(0);
    const [hoverRating, setHoverRating] = useState(0);
    const categories = ['Cleanliness', 'Communication', 'Location', 'Value for Money', 'Check-in Experience'];
    return (
        <div className="bg-white p-4 md:p-6 rounded-xl border border-gray-200">
            <h3 className="font-bold text-lg text-gray-800">Step 3: Rate Your Experience</h3>
            <p className="text-gray-600 mt-1 text-sm md:text-base">Share your experience to help other guests.</p>
            <div className="mt-4 md:mt-6"><label className="font-semibold text-gray-700 flex items-center text-sm md:text-base">Overall Rating <span className="text-xs text-red-500 bg-red-100 px-1.5 py-0.5 rounded-md ml-2">REQUIRED</span></label><div className="flex space-x-1 md:space-x-2 mt-2" onMouseLeave={() => setHoverRating(0)}>{[1, 2, 3, 4, 5].map(star => <Star key={star} size={28} onClick={() => setOverallRating(star)} onMouseEnter={() => setHoverRating(star)} className={`cursor-pointer transition ${(hoverRating || overallRating) >= star ? 'text-orange-500 fill-orange-500' : 'text-gray-300'}`}/>)}</div></div>
            <div className="mt-4 md:mt-6"><label className="font-semibold text-gray-700 text-sm md:text-base">Rate Specific Categories</label><div className="space-y-2 md:space-y-3 mt-2">{categories.map(cat => <div key={cat} className="flex justify-between items-center"><p className="text-gray-800 text-sm md:text-base">{cat}</p><div className="flex space-x-1">{[1, 2, 3, 4, 5].map(star => <Star key={star} size={18} className="text-gray-300 cursor-pointer"/>)}</div></div>)}</div></div>
            <div className="flex flex-col sm:flex-row sm:justify-between gap-2 mt-6 md:mt-8">
                <button onClick={onBack} className="px-4 py-2 text-sm font-semibold text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 order-2 sm:order-1">Back</button>
                <button onClick={onContinue} disabled={overallRating === 0} className="px-4 md:px-6 py-2 text-sm font-semibold text-white bg-orange-600 rounded-lg hover:bg-orange-700 disabled:bg-gray-400 order-1 sm:order-2">Continue</button>
            </div>
        </div>
    );
};

const WriteReviewStep = ({ onSubmit, onBack }) => {
    const [recommend, setRecommend] = useState(null);
    return(
        <div className="bg-white p-4 md:p-6 rounded-xl border border-gray-200">
            <h3 className="font-bold text-lg text-gray-800">Step 4: Write Your Review <span className="text-xs text-gray-400 font-medium ml-2">OPTIONAL</span></h3>
            <p className="text-gray-600 mt-1 text-sm md:text-base">Share details about your experience to help future renters.</p>
            <textarea className="w-full h-24 md:h-32 p-3 mt-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-400 focus:outline-none text-sm md:text-base" placeholder="Margaret was an exceptional host..."></textarea>
            <p className="text-right text-xs md:text-sm text-gray-400 mt-1">0 / 1000 characters</p>
            <div className="mt-4 md:mt-6"><h4 className="font-semibold text-gray-700 text-sm md:text-base">Additional Feedback</h4><p className="text-gray-600 mt-1 text-sm md:text-base">Would you recommend this host to other renters?</p><div className="flex flex-col sm:flex-row sm:space-x-3 space-y-2 sm:space-y-0 mt-3"><button onClick={() => setRecommend('yes')} className={`flex items-center justify-center px-4 py-2 text-sm font-semibold border rounded-lg transition ${recommend === 'yes' ? 'bg-orange-500 text-white border-orange-500' : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'}`}><ThumbsUp size={16} className="mr-2"/> Yes, definitely!</button><button onClick={() => setRecommend('no')} className={`flex items-center justify-center px-4 py-2 text-sm font-semibold border rounded-lg transition ${recommend === 'no' ? 'bg-gray-600 text-white border-gray-600' : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'}`}><ThumbsDown size={16} className="mr-2"/> No, I won't!</button></div></div>
            <div className="flex flex-col sm:flex-row sm:justify-between gap-2 mt-6 md:mt-8">
                <button onClick={onBack} className="px-4 py-2 text-sm font-semibold text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 order-2 sm:order-1">Back</button>
                <button onClick={onSubmit} className="px-4 md:px-6 py-2 text-sm font-semibold text-white bg-green-600 rounded-lg hover:bg-green-700 order-1 sm:order-2">Submit Review & Finish</button>
            </div>
        </div>
    );
};

const CheckInProcess = ({ booking, onBack }) => {
    const [step, setStep] = useState('identity'); // 'identity', 'rating', 'review'
    const stepNumber = { identity: 2, rating: 3, review: 4 };

    const renderRightColumn = () => {
        switch (step) {
            case 'identity': return <IdentityVerificationStep onContinue={() => setStep('rating')} onBack={onBack}/>;
            case 'rating': return <RateYourExperienceStep onContinue={() => setStep('review')} onBack={() => setStep('identity')} />;
            case 'review': return <WriteReviewStep onSubmit={onBack} onBack={() => setStep('rating')} />;
            default: return null;
        }
    }

    return (
        <div className="flex flex-col md:flex-row bg-gray-50 min-h-full">
            <CheckInStepper booking={booking} currentStep={stepNumber[step]} />
            <div className="flex-1 p-4 md:p-6 lg:p-8 overflow-y-auto">
                 {renderRightColumn()}
            </div>
        </div>
    );
};

// ============================================================================
// --- ORIGINAL Components (Updated for mobile) ---
// ============================================================================
const BookingCard = ({ booking, onStartCheckIn }) => {
    const getStatusStyle = (status) => {
        if (status.includes('Today')) return "bg-orange-100 text-orange-700";
        if (status.includes('Active')) return "bg-green-100 text-green-700";
        return "bg-gray-100 text-gray-700";
    }
    return (
        <div className="flex flex-col md:flex-row bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 p-4 md:p-6 md:space-x-6 mb-6">
            <div className="flex-shrink-0 w-full md:w-48 mb-4 md:mb-0 relative"><img src={`https://enzahome.pk/cdn/shop/files/baselbed.jpg?v=1740996046&width=500`} alt={booking.title} className="w-full h-48 md:h-full object-cover rounded-lg"/></div>
            <div className="flex-1 min-w-0">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2"><h3 className="text-lg md:text-xl font-bold text-gray-900">{booking.title}</h3><span className={`px-3 py-1 text-xs md:text-sm font-semibold rounded-lg ${getStatusStyle(booking.status)} self-start`}>{booking.status.toUpperCase()}</span></div>
                <p className="text-sm text-gray-500 flex items-center mt-1"><MapPin className="w-4 h-4 mr-1" />{booking.location}</p>
                <div className="flex items-center mt-3 space-x-3 text-sm"><img src={booking.host.avatar} alt={booking.host.name} className="w-6 h-6 md:w-8 md:h-8 rounded-full object-cover" /><p className="font-semibold text-gray-800">{booking.host.name}</p><span className="flex items-center text-amber-500"><Star className="w-3 h-3 md:w-4 md:h-4 fill-amber-500" /><span className="ml-1 text-gray-600 text-xs md:text-sm">{booking.host.rating} ({booking.host.reviews} reviews)</span></span></div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-y-2 mt-4 text-sm"><div className="col-span-1"><p className="font-medium text-gray-700">Lease Period</p><p className="text-gray-500">{booking.leasePeriod}</p><p className="text-xs text-amber-600">{booking.remainingMonths}</p></div><div className="col-span-1"><p className="font-medium text-gray-700">Monthly Rent</p><p className="text-green-600 font-bold">{booking.monthlyRent}</p><p className="text-xs text-gray-500">Next due: {booking.nextDue}</p></div><div className="col-span-1"><p className="font-medium text-gray-700">Total Paid</p><p className="text-gray-900 font-semibold">{booking.totalPaid}</p><p className="text-xs text-gray-500">{booking.paymentsCount}</p></div></div>
                <div className="mt-4 md:mt-5 pt-4 border-t border-gray-100"><p className="text-base font-semibold text-gray-800 mb-2">Check-in Details</p><div className="flex flex-col md:flex-row md:justify-between text-sm gap-4"><div className="space-y-2"><div className="flex items-center text-blue-600"><Clock className="w-4 h-4 mr-2" /><span className="font-medium">Scheduled Time</span></div><p className="md:ml-6 font-bold text-blue-600">{booking.checkInScheduled} <span className="text-xs text-red-500 ml-2">TODAY</span></p></div><div className="space-y-2"><div className="font-medium text-gray-700">Property Address</div><p className="text-gray-500 text-xs md:text-sm">{booking.propertyAddress}</p></div><div className="space-y-2"><div className="font-medium text-gray-700">Host Contact</div><p className="text-gray-500">{booking.hostContact}</p></div></div></div>
            </div>
            <div className="flex flex-col justify-between items-stretch md:items-end pl-0 md:pl-6 border-t md:border-l border-gray-100 pt-4 md:pt-0 mt-4 md:mt-0">
                <div className="text-sm space-y-2 mb-4 grid grid-cols-3 md:flex md:flex-col gap-2"><div className="flex items-center text-gray-600"><Home className="w-4 h-4 mr-2" /><span className="text-xs md:text-sm">{booking.propertyType}</span></div><div className="flex items-center text-gray-600"><Users className="w-4 h-4 mr-2" /><span className="text-xs md:text-sm">{booking.roomType}</span></div><div className="flex items-center text-gray-600"><Square className="w-4 h-4 mr-2" /><span className="text-xs md:text-sm">{booking.size}</span></div></div>
                <div className="flex flex-col space-y-2 w-full"><button className="text-sm font-medium text-amber-600 hover:text-amber-700 text-center md:text-left">Get Directions</button><button className="py-2 px-4 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition shadow-md">Call Host</button><button onClick={() => onStartCheckIn(booking)} className="py-2 px-4 text-sm font-medium text-white bg-amber-600 rounded-lg hover:bg-amber-700 transition shadow-md">Check-in</button></div>
            </div>
        </div>
    );
};

const MyBookingsContent = ({ onStartCheckIn }) => {
    const summary = bookingsData.summary;
    const StatBox = ({ value, label }) => (<div className="p-3 md:p-4 bg-white rounded-xl shadow-sm border border-gray-200 min-w-[120px] md:min-w-[150px]"><p className="text-2xl md:text-3xl font-bold text-gray-900">{value}</p><p className="text-xs md:text-sm text-gray-500">{label}</p></div>);
    return (
        <div className="flex-1 p-4 md:p-6 lg:p-8 bg-gray-50 overflow-y-auto">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 md:mb-8 gap-4"><div><h1 className="text-xl md:text-2xl font-bold text-gray-900">My Bookings</h1><p className="text-gray-600 text-sm md:text-base">Manage your confirmed bookings and upcoming stays</p></div><button className="flex items-center justify-center space-x-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 transition shadow-sm w-full sm:w-auto"><Download className="w-4 h-4 md:w-5 md:h-5" /><span>Export</span></button></div>
            <div className="flex flex-wrap gap-4 md:gap-6 mb-8 md:mb-10"><StatBox value={summary.active} label="Active Bookings" /><StatBox value={summary.checkIns} label="Check-ins" /><StatBox value={summary.checkOuts} label="Check-outs" /><StatBox value={summary.totalSpent} label="Total Spent" /></div>
            <div>
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 gap-2"><h2 className="text-lg md:text-xl font-bold text-gray-800">Current Bookings ({bookingsData.currentBookings.length})</h2><div className="text-sm text-gray-500 border border-gray-300 rounded-lg px-3 py-1.5 cursor-pointer hover:bg-white self-start">All Status <span className="ml-1">↓</span></div></div>
                <div className="space-y-4 md:space-y-6">{bookingsData.currentBookings.map(booking => (<BookingCard key={booking.id} booking={booking} onStartCheckIn={onStartCheckIn} />))}</div>
            </div>
        </div>
    );
};

const MyBookingsPage = () => {
    const [view, setView] = useState('list');
    const [selectedBooking, setSelectedBooking] = useState(null);

    const handleStartCheckIn = (booking) => {
        setSelectedBooking(booking);
        setView('checkin');
    };

    const handleBackToList = () => {
        setSelectedBooking(null);
        setView('list');
    };

    return (
        <div className="flex min-h-screen">
            <Sidebar />
            <div className="flex-1 flex flex-col overflow-hidden bg-gray-50">
                <RenterHeader />
                <main className="flex-1 overflow-y-auto">
                    {view === 'list' && <MyBookingsContent onStartCheckIn={handleStartCheckIn} />}
                    {view === 'checkin' && selectedBooking && <CheckInProcess booking={selectedBooking} onBack={handleBackToList} />}
                </main>
            </div>
        </div>
    );
};

export default MyBookingsPage;