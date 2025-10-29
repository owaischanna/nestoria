// components/NotificationCenter.js
"use client";

// --- EXTERNAL COMPONENT IMPORTS ---
import RenterHeader from './RenterHeader'; 
import Sidebar from './RenterSidebar';

import { CheckCircle, AlertTriangle, Home, MessageSquare, Clock, ArrowDown, Bell } from 'lucide-react'; 

// --- Data Structures ---
const notificationData = [
    {
        type: 'approved',
        icon: CheckCircle,
        title: "Application Approved!",
        subtitle: "Modern Studio in Brooklyn",
        message: "Great news! Margaret Johnson has approved your application for the Modern Studio. You can now proceed with the check-in process.",
        time: "2 minutes ago",
        actionText: "Check-in",
        bgColor: 'bg-red-50', // Light pink background for 'Approved'
        iconColor: 'text-green-600',
        borderColor: 'border-red-400', // Red border on left
    },
    {
        type: 'overdue',
        icon: AlertTriangle,
        title: "Payment Overdue - €950",
        subtitle: "Your rent is 3 days overdue",
        message: null,
        time: "2 minutes ago",
        actionText: "Pay Now",
        bgColor: 'bg-white',
        iconColor: 'text-red-500',
        borderColor: 'border-red-500', // Red border on left
    },
    {
        type: 'match',
        icon: Home,
        title: "New Listing Match!",
        subtitle: "Cozy Studio Near Washington Square Park",
        message: "$800/month • Greenwich Village • Private bathroom...",
        time: "1 hour ago",
        actionText: "View Details",
        bgColor: 'bg-white',
        iconColor: 'text-orange-500',
        borderColor: 'border-orange-500', // Orange border on left
    },
    {
        type: 'message',
        icon: MessageSquare,
        title: "New Message",
        subtitle: "Margaret Johnson sent a message",
        message: "Hi Anna! I'd love to schedule a viewing this week. Are you available Saturday...",
        time: "1 hour ago",
        actionText: "View Message",
        userAvatar: 'MJ', // For avatar fallback
        bgColor: 'bg-white',
        iconColor: 'text-blue-500',
        borderColor: 'border-blue-500', // Blue border on left
    },
];

// --- Utility Component: NotificationItem ---
const NotificationItem = ({ data }) => {
    const { type, icon: Icon, title, subtitle, message, time, actionText, bgColor, iconColor, borderColor, userAvatar } = data;

    const showDetails = ['approved', 'overdue'].includes(type);
    const showPayNow = type === 'overdue';
    const showMessageAvatar = type === 'message';

    return (
        <div className={`relative flex p-4 ${bgColor} rounded-xl shadow-sm border border-gray-200 transition-shadow hover:shadow-md`}>
            {/* Left Border/Indicator */}
            <div className={`absolute top-0 bottom-0 left-0 w-1.5 ${borderColor} rounded-l-xl`}></div>
            
            {/* Icon/Avatar Area */}
            <div className="flex-shrink-0 pt-1 pl-2 pr-4">
                {showMessageAvatar ? (
                    <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center text-sm font-semibold text-gray-700">
                        {userAvatar}
                    </div>
                ) : (
                    <div className="w-6 h-6 rounded-full flex items-center justify-center">
                        <Icon size={24} className={iconColor} />
                    </div>
                )}
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2 text-gray-900 font-semibold mb-1">
                    {type === 'message' ? (
                        <h3 className="text-base">{subtitle}</h3>
                    ) : (
                        <h3 className="text-base">{title}</h3>
                    )}
                    {type === 'overdue' && (
                        <span className="text-sm font-bold text-red-600 ml-1">{subtitle}</span>
                    )}
                </div>

                {message && (
                    <p className={`text-sm text-gray-700 ${showDetails ? 'mb-2' : ''}`}>
                        {message}
                    </p>
                )}

                <p className="text-xs text-gray-500">{time}</p>
            </div>

            {/* Actions */}
            <div className="flex flex-col justify-center items-end space-y-2 ml-4 flex-shrink-0">
                {showPayNow && (
                    <button className="bg-green-500 text-white py-2 px-4 rounded-lg font-medium hover:bg-green-600 transition text-sm">
                        {actionText}
                    </button>
                )}
                {type !== 'overdue' && (
                    <button className={`py-2 px-4 rounded-lg font-medium border transition text-sm ${type === 'approved' ? 'bg-orange-500 text-white hover:bg-orange-600' : 'border-gray-300 text-gray-700 hover:bg-gray-50'}`}>
                        {type === 'approved' ? 'Check-in' : 'View Details'}
                    </button>
                )}
                {type === 'message' && (
                    <button className="border border-gray-300 text-gray-700 py-2 px-4 rounded-lg font-medium hover:bg-gray-50 transition text-sm">
                        {actionText}
                    </button>
                )}
                
            </div>
        </div>
    );
};

// --- Main Export Component: NotificationCenter ---
const NotificationCenter = () => {
    return (
        <div className="flex flex-col h-screen bg-gray-50"> 
            
            {/* 1. Renter Header */}
            <RenterHeader /> 

            <div className="flex flex-1 overflow-hidden">
                {/* 2. Sidebar */}
                <Sidebar />
                
                {/* 3. Main Content Area (Scrollable) */}
                <div className="flex-1 p-6 md:p-8 lg:p-10 overflow-y-auto">
                    
                    {/* --- Page Header & Stats --- */}
                    <div className="flex items-start justify-between mb-8">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">Notifications</h1>
                            <p className="text-lg text-gray-600">Stay on top of your rent payments and receive important updates</p>
                        </div>
                        <div className="flex items-center space-x-2">
                            <button className="flex items-center space-x-1 border border-gray-300 bg-white py-2 px-3 rounded-lg text-sm font-medium hover:bg-gray-50 transition">
                                <Clock size={16} />
                                <span>Last 30 days</span>
                                <ArrowDown size={16} />
                            </button>
                        </div>
                    </div>

                    {/* --- Notification Summary Cards --- */}
                    <div className="flex justify-start space-x-6 bg-white p-6 rounded-xl shadow-md mb-8">
                        <div className="flex flex-col items-center">
                            <Bell size={24} className="text-gray-600 mb-1" />
                            <span className="text-2xl font-bold text-gray-800">8</span>
                            <span className="text-sm text-gray-500">Total</span>
                        </div>
                        <div className="flex flex-col items-center">
                            <Bell size={24} className="text-orange-500 mb-1" />
                            <span className="text-2xl font-bold text-orange-500">3</span>
                            <span className="text-sm text-gray-500">Today</span>
                        </div>
                        <div className="flex flex-col items-center">
                            <Bell size={24} className="text-red-500 mb-1" />
                            <span className="text-2xl font-bold text-red-500">5</span>
                            <span className="text-sm text-gray-500">Unread</span>
                        </div>
                    </div>

                    {/* --- Notification List --- */}
                    <div className="space-y-4">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-semibold text-gray-900">Today</h2>
                            <button className="text-sm font-medium text-gray-500 hover:text-gray-700 transition">
                                Mark as read
                            </button>
                        </div>

                        {notificationData.map((data, index) => (
                            <NotificationItem key={index} data={data} />
                        ))}
                    </div>

                </div>
            </div>
        </div>
    );
};

export default NotificationCenter;