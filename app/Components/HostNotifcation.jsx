// NotificationsPage.js
"use client";

import { useState } from 'react';
import HostHeader from './HostHeader';
import HostSidebar from './HostSidebar';
import { Bell, Search, ChevronDown, Trash2, CheckCircle, Clock, MessageSquare, PlusSquare, Star, DollarSign, AlertTriangle, X } from 'lucide-react';

// --- Dummy Data Structure ---
const initialNotifications = [
    {
        id: 1,
        type: 'Payment Overdue',
        title: "Alex Kim's rent payment is 3 days overdue",
        time: '2 minutes ago',
        icon: Clock,
        iconColor: 'text-red-500',
        bgColor: 'bg-red-50',
        actionText: 'View Details',
        group: 'Today',
    },
    {
        id: 2,
        type: 'Payment Received',
        title: "You've received a rent payment of €950 from Alex Kim for November 2024.",
        time: '1 hour ago',
        icon: DollarSign,
        iconColor: 'text-green-600',
        bgColor: 'bg-green-50',
        actionText: 'View Receipt',
        group: 'Today',
    },
    {
        id: 3,
        type: 'New Message',
        title: "Alex Kim sent a message",
        subtitle: "Hi! I'm interested in the room near Campus. When would be a good time to visit and...",
        time: '1 hour ago',
        icon: MessageSquare,
        iconColor: 'text-blue-500',
        bgColor: 'bg-blue-50',
        actionText: 'View Message',
        group: 'Today',
    },
    {
        id: 4,
        type: 'New Booking Request',
        title: "Sarah Chen has submitted a booking request for your listing (€750/month).",
        time: '2 minutes ago',
        icon: PlusSquare,
        iconColor: 'text-green-600',
        bgColor: 'bg-green-50',
        actionText: 'View Request',
        group: 'Yesterday',
    },
    {
        id: 5,
        type: 'New Review',
        title: "Guest has left a review for your listing",
        time: '2 minutes ago',
        icon: Star,
        iconColor: 'text-yellow-500',
        bgColor: 'bg-yellow-50',
        actionText: 'View Details',
        group: 'Yesterday',
    },
    {
        id: 6,
        type: 'Payment Deducted',
        title: "Refund payment has been processed from your account",
        time: '2 minutes ago',
        icon: DollarSign,
        iconColor: 'text-red-500',
        bgColor: 'bg-red-50',
        actionText: 'View Details',
        group: 'Yesterday',
    },
    {
        id: 7,
        type: 'Refund Request',
        title: "Sarah Johnson submitted a refund request for their booking.",
        time: '2 minutes ago',
        icon: Clock,
        iconColor: 'text-blue-500',
        bgColor: 'bg-blue-50',
        actionText: 'View Details',
        group: 'Yesterday',
    },
    {
        id: 8,
        type: 'Dispute Filed',
        title: "Alex Kim filed a dispute against you",
        time: '2 minutes ago',
        icon: AlertTriangle,
        iconColor: 'text-red-600',
        bgColor: 'bg-red-50',
        actionText: 'View Details',
        group: 'Yesterday',
    },
];

// --- Sub-Component for a Single Notification Item ---
const NotificationItem = ({ notification, onDelete }) => {
    const { id, title, subtitle, time, icon: Icon, iconColor, bgColor, actionText } = notification;

    return (
        <div className={`flex flex-col sm:flex-row sm:items-start justify-between p-3 sm:p-4 mb-3 rounded-xl shadow-sm border border-gray-200 transition-all duration-200 ${bgColor} hover:shadow-md`}>
            
            {/* Main Content */}
            <div className="flex flex-1 items-start space-x-3 sm:space-x-4 w-full">
                
                {/* Icon */}
                <div className={`p-2 rounded-full sm:p-2.5 sm:rounded-full ${iconColor} bg-white/70 backdrop-blur-sm border border-gray-200 flex-shrink-0 mt-1`}>
                    <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>

                {/* Text Content */}
                <div className="flex-1 min-w-0 flex flex-col">
                    <p className="text-sm sm:text-base font-semibold text-gray-800 break-words">
                        {title}
                    </p>
                    {subtitle && (
                        <p className="text-xs sm:text-sm text-gray-600 break-words mt-1 max-w-full">
                            {subtitle}
                        </p>
                    )}
                    <p className="text-xs text-gray-500 mt-1 sm:mt-1.5">{time}</p>
                </div>
            </div>

            {/* Right Actions (Buttons) */}
            <div className="flex items-center justify-between sm:justify-end space-x-2 sm:space-x-2 sm:ml-4 flex-shrink-0 mt-3 sm:mt-0 w-full sm:w-auto">
                
                {/* Primary Action Button */}
                <button
                    className="flex-1 sm:flex-none py-2 px-3 border border-gray-300 text-xs sm:text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 transition duration-150 active:scale-95"
                    onClick={() => console.log(`Action: ${actionText} for ID ${id}`)}
                >
                    {actionText}
                </button>
                
                {/* Delete Button */}
                <button
                    className="p-2 text-red-500 hover:text-red-700 hover:bg-red-100 rounded-full transition duration-150 active:scale-90 flex-shrink-0"
                    onClick={() => onDelete(id)}
                    aria-label={`Delete notification ${id}`}
                >
                    <Trash2 className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
            </div>

        </div>
    );
};

// --- Main Component ---
const NotificationsPage = () => {
    const [notifications, setNotifications] = useState(initialNotifications);
    const [unreadCount, setUnreadCount] = useState(5);

    const handleDelete = (id) => {
        setNotifications(prev => prev.filter(notif => notif.id !== id));
        console.log(`Notification ID ${id} deleted.`);
    };

    const handleMarkAllRead = () => {
        setUnreadCount(0);
        console.log("All notifications marked as read.");
    };

    const groupedNotifications = notifications.reduce((acc, notif) => {
        const group = notif.group;
        if (!acc[group]) {
            acc[group] = [];
        }
        acc[group].push(notif);
        return acc;
    }, {});

    const totalCount = notifications.length;
    const todayCount = notifications.filter(n => n.group === 'Today').length;
    
    const orderedGroups = ['Today', 'Yesterday', ...Object.keys(groupedNotifications).filter(g => g !== 'Today' && g !== 'Yesterday')];

    return (
        <div className="flex min-h-screen bg-gray-50">
            
            <HostSidebar />

            <div className="flex-1 flex flex-col min-w-0">
                <HostHeader />
                
                <main className="flex-1 p-3 sm:p-4 md:p-6 lg:p-8">
                    
                    {/* Header */}
                    <div className="max-w-7xl mx-auto w-full">
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
                            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 flex items-center">
                                <Bell className="w-5 h-5 sm:w-6 sm:h-6 mr-2 text-green-600" />
                                Notifications
                            </h1>
                            <div className="flex items-center space-x-2 sm:space-x-4 overflow-x-auto">
                                {/* Search/Filter */}
                                <div className="relative min-w-[120px] sm:min-w-0">
                                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-3 h-3 sm:w-4 sm:h-4 text-gray-400" />
                                    <input 
                                        type="text" 
                                        placeholder="Search" 
                                        className="py-1.5 sm:py-2 pl-8 pr-3 sm:pl-10 sm:pr-4 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500 transition duration-150 w-full text-xs sm:text-sm"
                                    />
                                </div>
                                <button className="flex items-center py-1.5 sm:py-2 px-2 sm:px-3 border border-gray-300 rounded-lg text-gray-700 bg-white hover:bg-gray-50 text-xs sm:text-sm transition duration-150 whitespace-nowrap flex-shrink-0">
                                    Last 30 days <ChevronDown className="w-3 h-3 sm:w-4 sm:h-4 ml-1" />
                                </button>
                            </div>
                        </div>

                        {/* Stats Section */}
                        <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 mb-6 sm:mb-8 max-w-lg">
                            <StatCard icon={Bell} title="Total" count={totalCount} color="text-gray-800" bgColor="bg-gray-200" />
                            <StatCard icon={CheckCircle} title="Today" count={todayCount} color="text-orange-500" bgColor="bg-orange-100" />
                            <StatCard icon={X} title="Unread" count={unreadCount} color="text-red-500" bgColor="bg-red-100" />
                        </div>

                        {/* Notification Feed */}
                        <div className="space-y-4 sm:space-y-6">
                            
                            {/* Mark All Read Button */}
                            <div className="flex justify-end pr-2 sm:pr-4">
                                <button
                                    onClick={handleMarkAllRead}
                                    className="py-1 px-2 sm:px-3 text-xs sm:text-sm font-medium text-green-600 hover:text-green-700 transition duration-150 whitespace-nowrap"
                                >
                                    Mark All Read
                                </button>
                            </div>

                            {orderedGroups.map(group => {
                                const notificationsInGroup = groupedNotifications[group];
                                if (!notificationsInGroup || notificationsInGroup.length === 0) return null;

                                return (
                                    <section key={group} className="pt-2 sm:pt-4">
                                        <h2 className={`text-lg sm:text-xl font-bold mb-3 sm:mb-4 ${group === 'Yesterday' ? 'border-t border-gray-200 pt-3 sm:pt-4' : ''}`}>
                                            {group}
                                        </h2>
                                        <div className="space-y-2 sm:space-y-3">
                                            {notificationsInGroup.map(notif => (
                                                <NotificationItem 
                                                    key={notif.id} 
                                                    notification={notif} 
                                                    onDelete={handleDelete} 
                                                />
                                            ))}
                                        </div>
                                    </section>
                                );
                            })}

                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

// Sub-Component for the Count/Stat Cards
const StatCard = ({ icon: Icon, title, count, color, bgColor }) => (
    <div className={`p-3 sm:p-4 rounded-xl flex items-center shadow-lg ${bgColor}`}>
        <div className={`p-1.5 sm:p-2 rounded-full ${color} bg-white/80 mr-2 sm:mr-3`}>
            <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
        </div>
        <div>
            <p className="text-lg sm:text-xl font-bold text-gray-900">{count}</p>
            <p className="text-xs sm:text-sm text-gray-600">{title}</p>
        </div>
    </div>
);

export default NotificationsPage;