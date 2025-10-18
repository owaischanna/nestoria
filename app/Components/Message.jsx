// MessagesPage.jsx
"use client";

import React from 'react';
import { 
    Search, Plus, Phone, Paperclip, Send, 
    CheckCircle, Clock, X
} from 'lucide-react';

// Import DashboardLayout from your structure
import DashboardLayout from './DashboardLayout'; 

// --- MOCK DATA ---
const messageList = [
    {
        id: 1,
        sender: 'Margaret Johnson',
        type: 'HOST',
        time: '5m ago',
        preview: 'Great! Your application has been approved. Let\'s schedule your check-in...',
        read: false,
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=80&q=80',
        unreadCount: 2,
    },
    {
        id: 2,
        sender: 'Nestoria Support',
        type: 'SUPPORT',
        time: '1d ago',
        preview: 'Thank you for contacting support. We\'ve reviewed your application issue...',
        read: false,
        avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0HFWiXvgfpFSXkpGQHyGt2iHrEiBRvM_T-A&s',
        unreadCount: 1,
    },
    {
        id: 3,
        sender: 'John Davis',
        type: 'HOST',
        time: '2h ago',
        preview: 'Hi Anna! I received your inquiry about the room. When would you like to...',
        read: true,
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a816c278668?auto=format&fit=crop&w=80&q=80',
        unreadCount: 0,
    },
    {
        id: 4,
        sender: 'Robert Lee',
        type: 'HOST',
        time: '2d ago',
        preview: 'The room is still available! Here are some additional photos you...',
        read: true,
        avatarInitials: 'RL',
        unreadCount: 0,
    },
    {
        id: 5,
        sender: 'Susan Miller',
        type: 'HOST',
        time: '3d ago',
        preview: 'Thank you for your interest! Unfortunately, that room has been...',
        read: true,
        avatarInitials: 'SM',
        unreadCount: 0,
    },
];

// --- Sub-Component: ConversationListItem ---
const ConversationListItem = ({ conversation, isActive }) => {
    // Determine avatar source
    const AvatarComponent = () => {
        if (conversation.avatar) {
            return (
                <img 
                    src={conversation.avatar}
                    alt={conversation.sender}
                    className="w-12 h-12 rounded-full object-cover"
                />
            );
        }
        return (
            <div className="w-12 h-12 rounded-full bg-gray-400 text-white flex items-center justify-center text-lg font-semibold">
                {conversation.avatarInitials}
            </div>
        );
    };

    return (
        <div className={`flex p-3 rounded-xl cursor-pointer transition-colors relative ${
            isActive ? 'bg-amber-50 border-l-4 border-amber-600' : 'hover:bg-gray-50'
        }`}>
            <div className="flex-shrink-0 mr-4">
                <AvatarComponent />
            </div>
            <div className="flex-1 min-w-0">
                <div className="flex justify-between items-center">
                    <p className={`font-semibold text-gray-900 ${conversation.read ? 'text-gray-900' : 'text-amber-800'}`}>{conversation.sender}</p>
                    <span className="text-xs text-gray-500">{conversation.time}</span>
                </div>
                <p className="text-sm text-gray-600 truncate">{conversation.preview}</p>
                <div className="mt-1 flex items-center space-x-2">
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded ${
                        conversation.type === 'HOST' ? 'bg-amber-100 text-amber-700' : 'bg-green-100 text-green-700'
                    }`}>
                        {conversation.type}
                    </span>
                    {conversation.unreadCount > 0 && (
                        <span className="text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full bg-red-500 text-white">
                            {conversation.unreadCount}
                        </span>
                    )}
                </div>
            </div>
        </div>
    );
};

// --- Sub-Component: ChatBubble ---
const ChatBubble = ({ message, isHost, time }) => {
    const alignment = isHost ? 'justify-start' : 'justify-end';
    const bubbleColor = isHost ? 'bg-gray-100 text-gray-800' : 'bg-blue-600 text-white';
    const arrow = isHost ? (
        <div className="absolute top-1 -left-2 w-0 h-0 border-t-8 border-b-8 border-r-8 border-t-transparent border-b-transparent border-r-gray-100" />
    ) : (
        <div className="absolute top-1 -right-2 w-0 h-0 border-t-8 border-b-8 border-l-8 border-t-transparent border-b-transparent border-l-blue-600" />
    );

    return (
        <div className={`flex ${alignment} w-full mb-3`}>
            <div className={`max-w-xs relative rounded-xl p-3 shadow-sm ${bubbleColor}`}>
                {/* Custom arrow for host side, built using borders/Tailwind */}
                {isHost && arrow}
                
                <p className="text-sm">{message}</p>
                <p className={`text-xs mt-1 ${isHost ? 'text-gray-500' : 'text-blue-200'} text-right`}>{time}</p>
                
                {/* Small checkmark for sent status on user side */}
                {!isHost && (
                    <CheckCircle className="w-3 h-3 text-blue-300 absolute bottom-1.5 right-1.5" />
                )}
            </div>
        </div>
    );
};


// --- Main Message Content Area ---
const MessagesContent = () => {
    const activeHost = messageList[0];
    const userAvatar = 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=80&q=80'; // Slim Aarons
    
    // Mock Chat Messages
    const chatMessages = [
        { sender: 'User', text: 'Who was that photographer you shared with me recently?', time: '3:00PM' },
        { sender: 'Host', text: 'That\'s him!', time: '3:00PM', avatar: activeHost.avatar },
        { sender: 'Host', text: 'What was his vision statement?', time: '3:00PM', avatar: activeHost.avatar },
        { sender: 'User', text: '“Attractive people doing attractive things in attractive places”', time: '3:00PM' },
        { sender: 'User', text: 'It’s fun', time: '3:00PM' },
    ];

    return (
        <div className="flex-1 flex overflow-hidden bg-gray-50">
            {/* Left Column: Conversation List */}
            <div className="w-96 flex-shrink-0 border-r border-gray-200 bg-white flex flex-col">
                <div className="p-4 border-b border-gray-200 flex justify-between items-center">
                    <h1 className="text-xl font-bold text-gray-900">Messages ({messageList.length})</h1>
                    <button className="p-2 bg-amber-600 text-white rounded-full hover:bg-amber-700 transition">
                        <Plus className="w-5 h-5" />
                    </button>
                </div>
                
                <div className="p-4 border-b border-gray-200">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search conversations..."
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-amber-500 text-sm"
                        />
                    </div>
                </div>

                {/* Filter Tabs */}
                <div className="flex space-x-2 p-4 border-b border-gray-200">
                    <button className="px-3 py-1 text-sm font-medium rounded-full bg-amber-600 text-white">All</button>
                    <button className="px-3 py-1 text-sm font-medium rounded-full bg-gray-100 text-gray-700">Unread ({messageList.filter(m => !m.read).length})</button>
                    <button className="px-3 py-1 text-sm font-medium rounded-full bg-gray-100 text-gray-700">Hosts</button>
                    <button className="px-3 py-1 text-sm font-medium rounded-full bg-gray-100 text-gray-700">Archived</button>
                </div>

                {/* Conversation Scroll Area */}
                <div className="flex-1 overflow-y-auto p-4 space-y-2">
                    {messageList.map(conv => (
                        <ConversationListItem 
                            key={conv.id} 
                            conversation={conv} 
                            isActive={conv.id === activeHost.id}
                        />
                    ))}
                </div>
            </div>

            {/* Right Column: Active Chat */}
            <div className="flex-1 flex flex-col">
                {/* Chat Header */}
                <div className="p-4 bg-white border-b border-gray-200 flex justify-between items-center flex-shrink-0">
                    <div className="flex items-center space-x-3">
                        <img 
                            src={activeHost.avatar}
                            alt={activeHost.sender}
                            className="w-10 h-10 rounded-full object-cover"
                        />
                        <div>
                            <p className="font-semibold text-gray-900">{activeHost.sender}</p>
                            <p className="text-xs text-green-500 flex items-center">
                                Online <span className="ml-1 w-2 h-2 bg-green-500 rounded-full block" />
                            </p>
                        </div>
                    </div>
                    <div className="flex space-x-3">
                        <button className="px-4 py-2 text-sm font-medium text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 transition">
                            View Listing
                        </button>
                        <button className="p-2 text-gray-500 hover:text-green-600 transition">
                            <Phone className="w-5 h-5" />
                        </button>
                        <button className="p-2 text-gray-500 hover:text-red-600 transition">
                            <X className="w-5 h-5" />
                        </button>
                    </div>
                </div>
                
                {/* Chat Bubbles Area */}
                <div className="flex-1 overflow-y-auto p-8 space-y-4">
                    <div className="text-center my-4">
                        <span className="text-xs text-gray-500 bg-gray-100 px-3 py-1 rounded-full">May 7</span>
                    </div>
                    
                    {chatMessages.map((msg, index) => (
                        <div key={index} className={`flex ${msg.sender === 'Host' ? 'justify-start' : 'justify-end'} space-x-3`}>
                            {msg.sender === 'Host' && (
                                <img src={msg.avatar} alt="Host" className="w-8 h-8 rounded-full object-cover self-end" />
                            )}
                            
                            {/* This is a simple version, using the ChatBubble component for more detail */}
                            <ChatBubble 
                                message={msg.text}
                                isHost={msg.sender === 'Host'}
                                time={msg.time}
                            />
                            
                            {msg.sender === 'User' && (
                                <img src={userAvatar} alt="User" className="w-8 h-8 rounded-full object-cover self-end" />
                            )}
                        </div>
                    ))}
                </div>
                
                {/* Message Input */}
                <div className="p-4 bg-white border-t border-gray-200 flex space-x-3 items-center flex-shrink-0">
                    <button className="p-2 text-gray-500 hover:text-amber-600 transition">
                        <Paperclip className="w-6 h-6" />
                    </button>
                    <input
                        type="text"
                        placeholder="Send a message"
                        className="flex-1 border-0 focus:ring-0 text-gray-800 p-2"
                    />
                    <button className="p-2 bg-amber-600 text-white rounded-full hover:bg-amber-700 transition">
                        <Send className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </div>
    );
};

const MessagesPage = () => {
    return (
        // Wrapper for Header and Sidebar
        <DashboardLayout>
            <MessagesContent />
        </DashboardLayout>
    );
};

export default MessagesPage;