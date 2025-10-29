// components/HostRatingGuidelines.js
"use client";

import { Check, Clock, MapPin, DollarSign, Zap, ArrowLeft } from 'lucide-react';
import HostHeader from './HostHeader';
import HostSidebar from './HostSidebar';

// --- Utility Component: Success / Attention Card (REDUCED SIZE) ---
const GuidelineCard = ({ title, content, icon: Icon, colorClass, bgColor, borderColor }) => (
    <div className={`p-3 rounded-lg border-l-4 ${borderColor} ${bgColor} flex items-start space-x-3 shadow-sm mb-3`}>
        <div className="flex-shrink-0 pt-1">
            <Icon size={18} className={colorClass} /> {/* Reduced icon size */}
        </div>
        <div>
            <h3 className="font-semibold text-gray-800 text-sm mb-0.5">{title}</h3> {/* Reduced title size */}
            <p className="text-xs text-gray-700">{content}</p> {/* Reduced content size */}
        </div>
    </div>
);


const HostRatingGuidelines = ({ onBack }) => {
    return (
        // Content Area with Padding (This sits inside the main scrollable section)
        <div className="p-8 pt-6 flex-1 bg-white">
            
            {/* --- Header and Back Button --- */}
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-900">Rating Guidelines for Hosts</h1>
                <button 
                    onClick={onBack}
                    className="flex items-center space-x-2 bg-green-600 text-white py-2 px-4 rounded-md text-sm font-medium hover:bg-green-700 transition shadow-md">
                    <ArrowLeft size={16} />
                    <span>Back</span>
                </button>
            </div>
            <p className="text-base text-gray-600 mb-6"> {/* Reduced margin bottom */}
                Understand how guests evaluate your hosting to improve your ratings
            </p>

            {/* --- How Rating Guidelines Help You Card --- */}
            <div className="bg-orange-50 p-4 rounded-xl border border-orange-200 mb-6"> {/* Reduced padding/margin */}
                <h3 className="text-lg font-semibold text-orange-700 mb-1">How Rating Guidelines Help You</h3> {/* Reduced size */}
                <p className="text-sm text-gray-700">
                    Understanding how guests evaluate your hosting helps you provide better experiences and earn higher ratings. 
                    These guidelines show you exactly what guests look for when rating hosts across all categories.
                </p>
            </div>

            {/* --- Cleanliness Section --- */}
            <div className="mb-6">
                <div className="flex justify-between items-center mb-3"> {/* Reduced margin */}
                    <h2 className="text-xl font-semibold text-gray-900">Cleanliness (4.9/5)</h2>
                    <span className="text-xs font-medium text-blue-600 bg-blue-100 px-2 py-1 rounded-full">EXCELLENT</span>
                </div>

                {/* Cleanliness Checklist */}
                <GuidelineCard 
                    title="Apartment is spotlessly clean upon arrival"
                    content="All surfaces, floors, and furniture are dust-free and sanitized"
                    icon={Check} 
                    colorClass="text-green-600"
                    bgColor="bg-green-50"
                    borderColor="border-green-400"
                />
                <GuidelineCard 
                    title="Bathroom and kitchen are thoroughly cleaned"
                    content="No residue, stains, or unpleasant odors present"
                    icon={Check} 
                    colorClass="text-green-600"
                    bgColor="bg-green-50"
                    borderColor="border-green-400"
                />
                <GuidelineCard 
                    title="Fresh linens and towels provided"
                    content="Bedding is clean, fresh-smelling, and properly made"
                    icon={Check} 
                    colorClass="text-green-600"
                    bgColor="bg-green-50"
                    borderColor="border-green-400"
                />
                 <GuidelineCard 
                    title="Common areas are well-maintained"
                    content="Shared spaces like kitchen, living room are clean and organized"
                    icon={Check} 
                    colorClass="text-green-600"
                    bgColor="bg-green-50"
                    borderColor="border-green-400"
                />

                {/* How to Maintain Excellence */}
                <div className="mt-4">
                    <h4 className="font-semibold text-gray-800 text-sm mb-1">How to Maintain Excellence:</h4>
                    <ul className="space-y-0.5 text-sm text-gray-700 ml-5 list-disc">
                        <li>Deep clean between guests with professional-grade products</li>
                        <li>Schedule regular cleaning of common areas weekly</li>
                        <li>Use a detailed cleaning checklist before each move-in</li>
                    </ul>
                </div>
            </div>

            <hr className="my-6 border-gray-200" /> {/* Reduced margin */}
            
            {/* --- Communication Section --- */}
            <div className="mb-6">
                <div className="flex justify-between items-center mb-3">
                    <h2 className="text-xl font-semibold text-gray-900">Communication (4.8/5)</h2>
                    <span className="text-xs font-medium text-blue-600 bg-blue-100 px-2 py-1 rounded-full">EXCELLENT</span>
                </div>

                <GuidelineCard 
                    title="Quick response to messages and inquiries"
                    content="Responding within 24-hours shows professionalism"
                    icon={Check} 
                    colorClass="text-blue-600"
                    bgColor="bg-blue-50"
                    borderColor="border-blue-400"
                />
                <GuidelineCard 
                    title="Clear and helpful communication"
                    content="Providing detailed answers and property information"
                    icon={Check} 
                    colorClass="text-blue-600"
                    bgColor="bg-blue-50"
                    borderColor="border-blue-400"
                />
                 <GuidelineCard 
                    title="Proactive updates and check-ins"
                    content="Reaching out for important updates or maintenance notices"
                    icon={Check} 
                    colorClass="text-blue-600"
                    bgColor="bg-blue-50"
                    borderColor="border-blue-400"
                />

                <div className="mt-4 p-3 bg-gray-100 rounded-lg"> {/* Reduced padding/margin */}
                    <h4 className="font-semibold text-gray-800 text-sm mb-0.5">Your Current Communication Stats:</h4>
                    <div className="flex justify-between text-xs">
                        <span className="text-gray-700">Average Response Time:</span>
                        <span className="text-green-600 font-medium">2 hours</span>
                    </div>
                    <div className="flex justify-between text-xs">
                        <span className="text-gray-700">Response Rate:</span>
                        <span className="text-green-600 font-medium">98%</span>
                    </div>
                </div>
            </div>

            <hr className="my-6 border-gray-200" />

            {/* --- Location Section --- */}
            <div className="mb-6">
                <div className="flex justify-between items-center mb-3">
                    <h2 className="text-xl font-semibold text-gray-900">Location Rating (4.7/5)</h2>
                    <span className="text-xs font-medium text-orange-600 bg-orange-100 px-2 py-1 rounded-full">NEEDS IMPROVEMENT</span>
                </div>

                <GuidelineCard 
                    title="Proximity to Public Transportation"
                    content="Walking distance to subway/bus stops (within 0.5 miles preferred)"
                    icon={MapPin} 
                    colorClass="text-orange-600"
                    bgColor="bg-orange-50"
                    borderColor="border-orange-400"
                />
                <GuidelineCard 
                    title="Access to Essential Services"
                    content="Nearby grocery stores, pharmacies, banks, restaurants"
                    icon={MapPin} 
                    colorClass="text-orange-600"
                    bgColor="bg-orange-50"
                    borderColor="border-orange-400"
                />
                 <GuidelineCard 
                    title="Neighborhood Safety"
                    content="Well-lit streets, low crime rates, safe walking at night"
                    icon={MapPin} 
                    colorClass="text-orange-600"
                    bgColor="bg-orange-50"
                    borderColor="border-orange-400"
                />
                
                <div className="mt-4 p-3 bg-yellow-100 rounded-lg">
                    <h4 className="font-semibold text-gray-800 text-sm mb-0.5">Work/Study Friendly Environment:</h4>
                    <p className="text-xs text-gray-700">Quiet areas, cafes with WiFi, libraries nearby</p>
                </div>
            </div>

            <hr className="my-6 border-gray-200" />
            
            {/* --- Value for Money Section --- */}
            <div className="mb-6">
                <div className="flex justify-between items-center mb-3">
                    <h2 className="text-xl font-semibold text-gray-900">Value for Money (4.6/5)</h2>
                    <span className="text-xs font-medium text-red-600 bg-red-100 px-2 py-1 rounded-full">NEEDS ATTENTION</span>
                </div>

                <GuidelineCard 
                    title="Space Quality vs. Rent Price"
                    content="Room size, furnishing quality, and condition relative to monthly cost"
                    icon={DollarSign} 
                    colorClass="text-red-600"
                    bgColor="bg-red-50"
                    borderColor="border-red-400"
                />
                <GuidelineCard 
                    title="Included Utilities and Services"
                    content="What's included in rent: utilities, internet, cleaning, amenities"
                    icon={DollarSign} 
                    colorClass="text-red-600"
                    bgColor="bg-red-50"
                    borderColor="border-red-400"
                />
                 <GuidelineCard 
                    title="Market Rate Comparison"
                    content="How your pricing compares to similar properties in the area"
                    icon={DollarSign} 
                    colorClass="text-red-600"
                    bgColor="bg-red-50"
                    borderColor="border-red-400"
                />
                
                <div className="mt-4">
                    <h4 className="font-semibold text-gray-800 text-sm mb-1">How to Improve Location Rating:</h4>
                    <ul className="space-y-0.5 text-sm text-gray-700 ml-5 list-disc">
                        <li>Create a detailed neighborhood guide highlighting nearby amenities</li>
                        <li>Provide clear transportation instructions and transit cards</li>
                        <li>Share safety tips and emergency contact information</li>
                    </ul>
                </div>
            </div>

            <hr className="my-6 border-gray-200" />

            {/* --- Check-in Section --- */}
            <div className="mb-6">
                <div className="flex justify-between items-center mb-3">
                    <h2 className="text-xl font-semibold text-gray-900">Check-in (4.8/5.0)</h2>
                    <span className="text-xs font-medium text-green-600 bg-green-100 px-2 py-1 rounded-full">GOOD</span>
                </div>
                
                <h4 className="font-semibold text-gray-800 text-sm mb-1">What Guests Expect:</h4>
                <GuidelineCard 
                    title="Clear check-in instructions 24-48 hours before arrival"
                    content="Include exact address, parking information, and entry instructions"
                    icon={Zap} 
                    colorClass="text-orange-600"
                    bgColor="bg-orange-50"
                    borderColor="border-orange-400"
                />
                <GuidelineCard 
                    title="Confirmation of agreed check-in time"
                    content="Confirm the specific time window 24 hours in advance"
                    icon={Zap} 
                    colorClass="text-orange-600"
                    bgColor="bg-orange-50"
                    borderColor="border-orange-400"
                />
                 <GuidelineCard 
                    title="Emergency contact information provided"
                    content="Share your phone number and backup contact details"
                    icon={Zap} 
                    colorClass="text-orange-600"
                    bgColor="bg-orange-50"
                    borderColor="border-orange-400"
                />

                <div className="mt-4">
                    <h4 className="font-semibold text-gray-800 text-sm mb-1">Best Practice Tips:</h4>
                    <ul className="space-y-0.5 text-sm text-gray-700 ml-5 list-disc">
                        <li>Send a welcome message</li>
                        <li>Include a simple map or landmarks for easy navigation</li>
                        <li>Be available by phone 30 minutes before check-in time</li>
                    </ul>
                </div>
            </div>

        </div>
    );
};

export default HostRatingGuidelines;