// components/HelpSupportComponent.js
"use client";

import { MessageCircle, Phone, Mail, Clock, Star, Zap, BookOpen, CreditCard } from 'lucide-react';
import RenterHeader from './RenterHeader';
import Sidebar from './RenterSidebar';

// Utility component for the large, colored icon circles
const IconCircle = ({ Icon, bgColor, iconColor }) => (
    <div className={`p-2 rounded-full ${bgColor} flex items-center justify-center mb-2`}>
        <Icon size={20} className={iconColor} />
    </div>
);

// Utility component for the Status Cards (e.g., Response Time, Satisfaction)
const StatCard = ({ Icon, value, label, colorClass, iconBgColor }) => (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 flex items-center space-x-3">
        <div className={`p-2 rounded-full ${iconBgColor} flex items-center justify-center`}>
            <Icon size={20} className={colorClass} />
        </div>
        <div>
            <div className={`text-lg font-bold ${colorClass}`}>{value}</div>
            <div className="text-xs text-gray-500">{label}</div>
        </div>
    </div>
);

const HelpSupportComponent = () => {
    return (
        <div className="flex flex-col h-screen overflow-hidden bg-gray-50">
            
            {/* Sidebar first as requested */}
            <div className="flex flex-1 overflow-hidden">
                <Sidebar />
                
                {/* Main Content Area */}
                <div className="flex-1 flex flex-col overflow-hidden">
                    {/* Renter Header */}
                    <RenterHeader />
                    
                    {/* Content */}
                    <div className="flex-1 p-4 md:p-6 lg:p-8 overflow-y-auto">
                        
                        {/* --- Top Section: Header & Emergency Button --- */}
                        <div className="flex items-start justify-between mb-6">
                            <div>
                                <h1 className="text-2xl font-bold text-gray-900 mb-1">Help & Support Center</h1>
                                <p className="text-base text-gray-600">Get help with hosting, bookings, payments, and account management</p>
                            </div>
                            <button className="flex items-center space-x-2 bg-red-500 text-white py-1.5 px-3 rounded-lg font-medium hover:bg-red-600 transition shadow-md text-sm">
                                <Zap size={16} />
                                <span>Emergency Support</span>
                            </button>
                        </div>

                        {/* --- Stat Cards Section --- */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                            <StatCard 
                                Icon={Clock} 
                                value="< 2 hours" 
                                label="Avg. Response Time" 
                                colorClass="text-blue-600"
                                iconBgColor="bg-blue-100"
                            />
                            <StatCard 
                                Icon={Star} 
                                value="98%" 
                                label="Customer Satisfaction" 
                                colorClass="text-green-600"
                                iconBgColor="bg-green-100"
                            />
                            <StatCard 
                                Icon={Zap} 
                                value="24/7" 
                                label="Support Available" 
                                colorClass="text-orange-600"
                                iconBgColor="bg-orange-100"
                            />
                        </div>

                        {/* --- Get in Touch Section --- */}
                        <h2 className="text-lg font-semibold text-gray-900 mb-3 flex justify-between items-center">
                            Get in Touch
                            <span className="text-xs font-medium text-green-500 bg-green-100 px-2 py-0.5 rounded-full">ONLINE</span>
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                            
                            {/* 1. Live Chat Card */}
                            <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
                                <IconCircle Icon={MessageCircle} bgColor="bg-blue-100" iconColor="text-blue-600" />
                                <h3 className="text-base font-semibold text-gray-900 mb-1">Live Chat</h3>
                                <p className="text-gray-600 mb-2 text-xs">Get instant help from our support team</p>
                                <div className="flex items-center text-xs text-green-600 mb-3">
                                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full mr-1.5"></div>
                                    <span className="font-medium">Available now</span>
                                </div>
                                <button className="w-full bg-blue-600 text-white py-1.5 px-3 rounded-lg font-medium hover:bg-blue-700 transition duration-200 text-xs">
                                    Start Chat
                                </button>
                            </div>

                            {/* 2. Phone Support Card */}
                            <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
                                <IconCircle Icon={Phone} bgColor="bg-green-100" iconColor="text-green-600" />
                                <h3 className="text-base font-semibold text-gray-900 mb-1">Phone Support</h3>
                                <p className="text-gray-600 mb-1 text-xs">Speak directly with a support specialist</p>
                                <p className="text-base font-semibold text-gray-900 mb-1">+1 (555) 123-HELP</p>
                                <p className="text-xs text-gray-500 mb-3">Available 24/7</p>
                                <button className="w-full bg-green-600 text-white py-1.5 px-3 rounded-lg font-medium hover:bg-green-700 transition duration-200 text-xs">
                                    Call Now
                                </button>
                            </div>

                            {/* 3. Email Support Card */}
                            <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
                                <IconCircle Icon={Mail} bgColor="bg-orange-100" iconColor="text-orange-600" />
                                <h3 className="text-base font-semibold text-gray-900 mb-1">Email Support</h3>
                                <p className="text-gray-600 mb-1 text-xs">Send detailed questions or issues</p>
                                <p className="text-xs font-semibold text-gray-900">support@habisolo.com</p>
                                <p className="text-xs text-gray-500 mb-3">Response within 2 hours</p>
                                <button className="w-full border border-gray-300 text-gray-700 py-1.5 px-3 rounded-lg font-medium hover:bg-gray-50 transition duration-200 text-xs">
                                    Send Email
                                </button>
                            </div>
                        </div>

                        {/* --- Browse Help Topics Section --- */}
                        <h2 className="text-lg font-semibold text-gray-900 mb-3">Browse Help Topics</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            
                            {/* 1. Getting Started Card */}
                            <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
                                <IconCircle Icon={BookOpen} bgColor="bg-purple-100" iconColor="text-purple-600" />
                                <h3 className="text-base font-semibold text-gray-900 mb-1">Getting Started</h3>
                                <p className="text-gray-600 mb-2 text-xs">New to hosting? Learn the basics</p>
                                <ul className="space-y-1 text-gray-600 text-xs mb-3">
                                    <li className="flex items-start">
                                        <span className="w-1 h-1 bg-gray-400 rounded-full mt-1.5 mr-2 flex-shrink-0"></span>
                                        How to create your first listing
                                    </li>
                                    <li className="flex items-start">
                                        <span className="w-1 h-1 bg-gray-400 rounded-full mt-1.5 mr-2 flex-shrink-0"></span>
                                        Setting up your host profile
                                    </li>
                                    <li className="flex items-start">
                                        <span className="w-1 h-1 bg-gray-400 rounded-full mt-1.5 mr-2 flex-shrink-0"></span>
                                        Understanding pricing strategies
                                    </li>
                                </ul>
                                <button className="w-full bg-purple-600 text-white py-1.5 px-3 rounded-lg font-medium hover:bg-purple-700 transition duration-200 text-xs">
                                    View All
                                </button>
                            </div>

                            {/* 2. Managing Bookings Card */}
                            <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
                                <IconCircle Icon={Clock} bgColor="bg-red-100" iconColor="text-red-600" />
                                <h3 className="text-base font-semibold text-gray-900 mb-1">Managing Bookings</h3>
                                <p className="text-gray-600 mb-2 text-xs">Handle reservations and check-ins</p>
                                <ul className="space-y-1 text-gray-600 text-xs mb-3">
                                    <li className="flex items-start">
                                        <span className="w-1 h-1 bg-gray-400 rounded-full mt-1.5 mr-2 flex-shrink-0"></span>
                                        Accepting and declining requests
                                    </li>
                                    <li className="flex items-start">
                                        <span className="w-1 h-1 bg-gray-400 rounded-full mt-1.5 mr-2 flex-shrink-0"></span>
                                        Check-in process guide
                                    </li>
                                    <li className="flex items-start">
                                        <span className="w-1 h-1 bg-gray-400 rounded-full mt-1.5 mr-2 flex-shrink-0"></span>
                                        Handling cancellations
                                    </li>
                                </ul>
                                <button className="w-full bg-red-600 text-white py-1.5 px-3 rounded-lg font-medium hover:bg-red-700 transition duration-200 text-xs">
                                    View All
                                </button>
                            </div>

                            {/* 3. Payments & Fees Card */}
                            <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
                                <IconCircle Icon={CreditCard} bgColor="bg-yellow-100" iconColor="text-yellow-600" />
                                <h3 className="text-base font-semibold text-gray-900 mb-1">Payments & Fees</h3>
                                <p className="text-gray-600 mb-2 text-xs">Understand earnings and fees</p>
                                <ul className="space-y-1 text-gray-600 text-xs mb-3 opacity-0 h-12 pointer-events-none"> {/* Hidden list for visual balance */}
                                    <li></li>
                                    <li></li>
                                    <li></li>
                                </ul>
                                <button className="w-full bg-yellow-600 text-white py-1.5 px-3 rounded-lg font-medium hover:bg-yellow-700 transition duration-200 text-xs">
                                    View All
                                </button>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default HelpSupportComponent;