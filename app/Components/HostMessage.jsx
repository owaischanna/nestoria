"use client";

import React, { useState } from "react";
import { Search, Plus, Phone, Paperclip, Send, ChevronDown, CheckCircle } from "lucide-react";

// Assuming these are defined and available in your project structure
import HostSidebar from "@/app/Components/HostSidebar";
import HostHeader from "./HostHeader";

// ====================================================================
// --- Mock Data Store (Kept the same for functionality) ---
// ====================================================================

const ALL_CONVERSATIONS = [
    { 
        id: 1, name: "Margaret Johnson", lastMessage: "Great! Your application has been approved. Let's schedule your check-in....", time: "5m ago", 
        tags: ["unread", "applicant", "support"], unreadCount: 2, role: "Applicant", 
        messages: [
            { id: 101, text: "I'm very interested in the Park Slope listing.", time: "4:55 PM", isHost: false, dateSeparator: "Today" },
            { id: 102, text: "The room is still available! When are you free for a virtual tour?", time: "5:00 PM", isHost: true, isRead: true },
        ]
    },
    { 
        id: 2, name: "David Lee", lastMessage: "The water heater is leaking, I've submitted a maintenance request.", time: "1d ago", 
        tags: ["tenant"], unreadCount: 0, role: "Tenant",
        messages: [
            { id: 201, text: "Hello, David. I received your request. We'll send a plumber tomorrow morning.", time: "Yesterday", isHost: true, isRead: true },
            { id: 202, text: "Thank you, please let me know when they arrive.", time: "Yesterday", isHost: false, isRead: true },
        ]
    },
    { 
        id: 3, name: "Anna Chen", lastMessage: "The room is still available! Here are some additional photos you....", time: "2h ago", 
        tags: ["applicant", "unread"], unreadCount: 1, role: "Applicant",
        messages: [
            { id: 301, text: "Could I see more pictures of the kitchen area?", time: "3:00 PM", isHost: false, dateSeparator: "May 7" },
            { id: 302, text: "Absolutely, attaching them now.", time: "3:05 PM", isHost: true, isRead: false }, 
        ]
    },
    { 
        id: 4, name: "Nestoria Support", lastMessage: "Your payout has been processed successfully.", time: "2d ago", 
        tags: ["support", "archived"], unreadCount: 0, role: "Support",
        messages: [
            { id: 401, text: "We're reaching out about a small bug on your dashboard.", time: "1 week ago", isHost: false, dateSeparator: "Last Week" },
        ]
    },
];

const FILTER_TABS = [
    { key: 'all', label: 'All', count: ALL_CONVERSATIONS.length },
    { key: 'unread', label: 'Unread', count: ALL_CONVERSATIONS.filter(c => c.tags.includes('unread')).length },
    { key: 'applicant', label: 'Applicants', count: ALL_CONVERSATIONS.filter(c => c.tags.includes('applicant')).length },
    { key: 'tenant', label: 'Tenants', count: ALL_CONVERSATIONS.filter(c => c.tags.includes('tenant')).length },
    { key: 'archived', label: 'Archived', count: ALL_CONVERSATIONS.filter(c => c.tags.includes('archived')).length },
];


// ====================================================================
// --- Utility Components ---
// ====================================================================

// 1. ConversationItem (Clickable)
const ConversationItem = ({ id, name, lastMessage, time, tags, unreadCount, isActive, onClick }) => (
    <div
        className={`flex items-center p-4 border-b cursor-pointer transition ${
            isActive ? 'bg-green-100 border-green-200' : 'hover:bg-gray-50'
        }`}
        onClick={() => onClick(id)} 
    >
        {/* Avatar */}
        <div className="flex-shrink-0 w-12 h-12 bg-gray-300 rounded-full overflow-hidden mr-3">
            <div className="w-full h-full flex items-center justify-center text-xs font-bold text-gray-700">{name.split(' ').map(n => n[0]).join('')}</div>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
            <div className="flex justify-between items-center">
                <p className={`font-semibold ${unreadCount > 0 ? 'text-gray-900' : 'text-gray-700'}`}>{name}</p>
                <p className="text-xs text-gray-500">{time}</p>
            </div>
            <p className={`text-sm truncate ${unreadCount > 0 ? 'text-gray-700 font-medium' : 'text-gray-500'}`}>
                {lastMessage}
            </p>
            <div className="mt-1">
                 {tags.includes('applicant') && (
                    <span className="text-xs font-medium text-white bg-orange-500 px-2 py-0.5 rounded-full mr-2">
                        APPLICANT
                    </span>
                )}
                {tags.includes('tenant') && (
                    <span className="text-xs font-medium text-white bg-blue-500 px-2 py-0.5 rounded-full mr-2">
                        TENANT
                    </span>
                )}
                {tags.includes('support') && (
                    <span className="text-xs font-medium text-white bg-green-600 px-2 py-0.5 rounded-full mr-2">
                        SUPPORT
                    </span>
                )}
                {unreadCount > 0 && (
                    <span className="text-xs font-bold text-white bg-red-500 rounded-full w-5 h-5 flex items-center justify-center inline-block">
                        {unreadCount}
                    </span>
                )}
            </div>
        </div>
    </div>
);

// 2. ChatMessage
const ChatMessage = ({ text, time, isHost, name, isRead, dateSeparator }) => {
    const alignment = isHost ? 'justify-end' : 'justify-start';
    const bubbleColor = isHost ? 'bg-blue-600 text-white' : 'bg-white text-gray-800 border border-gray-200';
    const alignText = isHost ? 'text-right' : 'text-left';
    
    const initials = name.split(' ').map(n => n[0]).join('');

    return (
        <>
            {dateSeparator && (
                <div className="text-center my-4">
                    <span className="text-xs text-gray-500 bg-gray-100 px-3 py-1 rounded-full">{dateSeparator}</span>
                </div>
            )}
            <div className={`flex w-full mb-4 ${alignment}`}>
                {/* Guest/Contact Avatar */}
                {!isHost && (
                    <div className="flex-shrink-0 w-8 h-8 bg-gray-300 rounded-full overflow-hidden mr-3 mt-1 flex items-center justify-center text-xs font-bold text-gray-700">
                        {initials}
                    </div>
                )}

                {/* Message Bubble */}
                <div className={`max-w-xs md:max-w-md`}>
                    <div className={`p-3 rounded-xl shadow-sm ${bubbleColor}`}>
                        <p className="text-sm">{text}</p>
                    </div>
                    <div className={`mt-1 text-xs text-gray-500 ${alignText}`}>
                        {time}
                        {isHost && isRead && <CheckCircle className="w-3 h-3 ml-1 text-blue-500 inline" />}
                    </div>
                </div>

                {/* Host Avatar */}
                {isHost && (
                    <div className="flex-shrink-0 w-8 h-8 bg-green-700 rounded-full overflow-hidden ml-3 mt-1 flex items-center justify-center text-xs font-bold text-white">
                        HO
                    </div>
                )}
            </div>
        </>
    );
};


// 3. ConversationThread (Active Chat Display and Input)
const ConversationThread = ({ activeContact }) => {
    const [newMessage, setNewMessage] = useState('');
    const hostName = "You (Host)"; 

    if (!activeContact) {
        return (
            <div className="flex flex-col items-center justify-center h-full text-gray-500 bg-gray-100">
                <ChevronDown className="w-12 h-12 mb-4" />
                <p className="text-xl font-semibold">Select a conversation to start chatting.</p>
            </div>
        );
    }
    
    // Reversing messages for display (most recent at bottom)
    const messages = [...activeContact.messages].reverse();

    const handleSend = () => {
        if (newMessage.trim() === '') return;
        
        // --- Placeholder for sending logic ---
        console.log(`Sending message to ${activeContact.name}: ${newMessage}`);
        // -------------------------------------

        setNewMessage('');
    };

    return (
        <div className="flex flex-col h-full bg-gray-50 border-l border-gray-200">
            {/* Thread Header */}
            <div className="flex justify-between items-center p-4 border-b bg-white shadow-sm sticky top-0 z-10">
                <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gray-300 rounded-full overflow-hidden flex items-center justify-center text-sm font-bold text-gray-700">
                        {activeContact.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                        <p className="font-semibold text-gray-800">{activeContact.name}</p>
                        <p className="text-xs text-green-600">{activeContact.role}</p>
                    </div>
                </div>
                <div className="flex items-center space-x-4">
                    <button className="text-sm font-medium text-gray-700 flex items-center border border-gray-300 px-3 py-1 rounded hover:bg-gray-50">
                        View Listing
                    </button>
                    <button className="p-2 text-gray-500 hover:text-gray-700">
                        <Phone className="w-5 h-5" />
                    </button>
                </div>
            </div>

            {/* Messages Area (Scrollable) */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4 flex flex-col-reverse">
                {messages.map((msg) => (
                    <ChatMessage
                        key={msg.id}
                        text={msg.text}
                        time={msg.time}
                        isHost={msg.isHost}
                        isRead={msg.isRead}
                        dateSeparator={msg.dateSeparator}
                        name={msg.isHost ? hostName : activeContact.name}
                    />
                ))}
            </div>

            {/* Message Input (Interactive) */}
            <div className="p-4 bg-white border-t sticky bottom-0 z-10">
                <div className="flex items-center space-x-3 border border-gray-300 rounded-xl p-2 bg-white">
                    <button className="p-2 text-gray-500 hover:text-gray-700">
                        <Paperclip className="w-5 h-5" />
                    </button>
                    <input
                        type="text"
                        placeholder={`Message ${activeContact.name}...`}
                        className="flex-1 p-2 text-sm focus:outline-none"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyPress={(e) => {
                            if (e.key === 'Enter') handleSend();
                        }}
                    />
                    <button 
                        className="p-2 text-white bg-green-600 rounded-full hover:bg-green-700 transition disabled:bg-gray-400"
                        onClick={handleSend}
                        disabled={newMessage.trim() === ''}
                    >
                        <Send className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </div>
    );
};


// ====================================================================
// --- Main Messages Page Component (State Management) ---
// ====================================================================
export default function HostMessagesPage() {
    const [activeFilter, setActiveFilter] = useState('all');
    const [activeConversationId, setActiveConversationId] = useState(ALL_CONVERSATIONS[0].id);

    // 1. Filtering Logic
    const filteredConversations = ALL_CONVERSATIONS.filter(conv => {
        if (activeFilter === 'all') return true;
        return conv.tags.includes(activeFilter);
    });

    // 2. Finding Active Contact
    const activeContact = ALL_CONVERSATIONS.find(c => c.id === activeConversationId);


    return (
        <div className="flex min-h-screen bg-gray-50">
            {/* 1. Host Sidebar */}
            <HostSidebar />

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col">
                {/* 2. Host Header */}
                <HostHeader />
                
                {/* 3. Page Content - Messages Interface */}
                <main className="flex-1 flex overflow-hidden">
                    {/* Left Panel: Conversation List */}
                    <div className="w-96 flex-shrink-0 border-r border-gray-200 bg-white flex flex-col">
                        <div className="p-6 pb-2">
                            <h1 className="text-2xl font-bold text-gray-800">Messages ({ALL_CONVERSATIONS.length})</h1>
                        </div>
                        
                        {/* Search and New Message */}
                        <div className="px-6 py-4">
                            <div className="flex items-center border border-gray-300 rounded-lg p-2 bg-gray-50">
                                <Search className="w-4 h-4 text-gray-400 mr-2" />
                                <input
                                    type="text"
                                    placeholder="Search conversations..."
                                    className="flex-1 bg-transparent text-sm focus:outline-none"
                                />
                                <button className="p-1 text-white bg-orange-500 rounded-full hover:bg-orange-600 transition">
                                    <Plus className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                        
                        {/* Filters (Horizontal, Compact, Scrollable) */}
                        <div className="flex space-x-1 px-6 pb-4 border-b overflow-x-auto whitespace-nowrap">
                            {FILTER_TABS.map(tab => (
                                <button
                                    key={tab.key}
                                    // Made text smaller and padding much tighter
                                    className={`text-xs font-semibold px-2 py-0.5 rounded-full flex items-center transition flex-shrink-0 ${
                                        activeFilter === tab.key 
                                            ? 'text-white bg-orange-500' 
                                            : 'text-gray-600 hover:bg-gray-100'
                                    }`}
                                    onClick={() => setActiveFilter(tab.key)}
                                >
                                    <span>{tab.label}</span>
                                    {/* Removed count span inside the button to save space, but kept it if you prefer to re-add it */}
                                    <span className='ml-1'>({tab.count})</span>
                                </button>
                            ))}
                        </div>
                        
                        {/* Conversation List (Filtered and Clickable) */}
                        <div className="overflow-y-auto flex-1"> 
                            {filteredConversations.map(conv => (
                                <ConversationItem 
                                    key={conv.id} 
                                    {...conv}
                                    isActive={conv.id === activeConversationId}
                                    onClick={setActiveConversationId} 
                                />
                            ))}
                        </div>
                    </div>

                    {/* Right Panel: Conversation Thread (Displays the selected chat) */}
                    <div className="flex-1 min-w-0">
                        <ConversationThread activeContact={activeContact} />
                    </div>
                </main>
            </div>
        </div>
    );
}