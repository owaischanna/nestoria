"use client";

import React from "react";
import { Search, Plus, Phone, X, Paperclip, Send, ChevronDown, CheckCircle } from "lucide-react";
import HostSidebar from "@/app/Components/HostSidebar";
import HostHeader from "./HostHeader";

const ConversationItem = ({ name, lastMessage, time, isHost, isSupport, unreadCount, isActive }) => (
    <div
        className={`flex items-center p-4 border-b cursor-pointer ${isActive ? 'bg-green-50 border-green-200' : 'hover:bg-gray-50'
            }`}
    >
        <div className="flex-shrink-0 w-12 h-12 bg-gray-300 rounded-full overflow-hidden mr-3">
            <div className="w-full h-full flex items-center justify-center text-xs font-bold text-gray-700">{name.split(' ').map(n => n[0]).join('')}</div>
        </div>
        <div className="flex-1 min-w-0">
            <div className="flex justify-between items-center">
                <p className={`font-semibold ${unreadCount > 0 ? 'text-gray-900' : 'text-gray-700'}`}>{name}</p>
                <p className="text-xs text-gray-500">{time}</p>
            </div>
            <p className={`text-sm truncate ${unreadCount > 0 ? 'text-gray-700 font-medium' : 'text-gray-500'}`}>
                {lastMessage}
            </p>
            <div className="mt-1 flex items-center space-x-2">
                {isHost && (
                    <span className="text-xs font-medium text-white bg-orange-500 px-2 py-0.5 rounded-full">
                        HOST
                    </span>
                )}
                {isSupport && (
                    <span className="text-xs font-medium text-white bg-green-600 px-2 py-0.5 rounded-full">
                        SUPPORT
                    </span>
                )}
                {unreadCount > 0 && (
                    <span className="text-xs font-bold text-white bg-red-500 rounded-full w-5 h-5 flex items-center justify-center">
                        {unreadCount}
                    </span>
                )}
            </div>
        </div>
    </div>
);

const ChatMessage = ({ text, time, isHost, avatarUrl, name, isRead, dateSeparator }) => {
    const alignment = isHost ? 'justify-end' : 'justify-start';
    const bubbleColor = isHost ? 'bg-blue-100 text-gray-800' : 'bg-white text-gray-800 border border-gray-200';
    const alignText = isHost ? 'text-right' : 'text-left';

    return (
        <>
            {dateSeparator && (
                <div className="text-center my-4">
                    <span className="text-xs text-gray-500 bg-gray-100 px-3 py-1 rounded-full">{dateSeparator}</span>
                </div>
            )}
            <div className={`flex w-full mb-4 ${alignment}`}>
                {!isHost && (
                    <div className="flex-shrink-0 w-8 h-8 bg-gray-300 rounded-full overflow-hidden mr-3 mt-1">
                        <img src={avatarUrl} alt={name} className="w-full h-full object-cover" />
                    </div>
                )}
                <div className={`max-w-xs md:max-w-md`}>
                    <div className={`p-3 rounded-xl shadow-sm ${bubbleColor}`}>
                        <p className="text-sm">{text}</p>
                    </div>
                    <div className={`mt-1 text-xs text-gray-500 ${alignText}`}>
                        {time}
                        {isHost && isRead && <CheckCircle className="w-3 h-3 ml-1 text-blue-500 inline" />}
                    </div>
                </div>
                {isHost && (
                    <div className="flex-shrink-0 w-8 h-8 bg-gray-300 rounded-full overflow-hidden ml-3 mt-1">
                        <img src={avatarUrl} alt={name} className="w-full h-full object-cover" />
                    </div>
                )}
            </div>
        </>
    );
};

const ConversationThread = ({ activeContact }) => {
    const messages = [
        { id: 1, text: "Who was that photographer you shared with me recently?", time: "3:00 PM", isHost: false, name: "Anna Chen", dateSeparator: "May 7" },
        { id: 2, text: "Slim Aarons", time: "3:00 PM", isHost: true, name: "Margaret Johnson", isRead: true },
        { id: 3, text: "That's him!", time: "3:00 PM", isHost: false, name: "Anna Chen" },
        { id: 4, text: "What was his vision statement?", time: "3:00 PM", isHost: false, name: "Anna Chen" },
        { id: 5, text: '"Attractive people doing attractive things in attractive places"', time: "3:00 PM", isHost: true, name: "Margaret Johnson", isRead: true },
        { id: 6, text: "It's fun", time: "3:00 PM", isHost: true, name: "Margaret Johnson", isRead: true },
    ];

    const hostAvatar = "/path/to/margaret-johnson-avatar.jpg";
    const contactAvatar = "/path/to/anna-chen-avatar.jpg";

    return (
        <div className="flex flex-col h-full bg-gray-50 border-l border-gray-200">
            <div className="flex justify-between items-center p-4 border-b bg-white shadow-sm sticky top-0 z-10">
                <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gray-300 rounded-full overflow-hidden">
                        <img src={contactAvatar} alt={activeContact.name} className="w-full h-full object-cover" />
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

            <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {messages.map((msg) => (
                    <ChatMessage
                        key={msg.id}
                        text={msg.text}
                        time={msg.time}
                        isHost={msg.isHost}
                        isRead={msg.isRead}
                        dateSeparator={msg.dateSeparator}
                        avatarUrl={msg.isHost ? hostAvatar : contactAvatar}
                        name={msg.name}
                    />
                ))}
            </div>

            <div className="p-4 bg-white border-t sticky bottom-0 z-10">
                <div className="flex items-center space-x-3 border border-gray-300 rounded-xl p-2 bg-white">
                    <button className="p-2 text-gray-500 hover:text-gray-700">
                        <Paperclip className="w-5 h-5" />
                    </button>
                    <input
                        type="text"
                        placeholder="Send a message"
                        className="flex-1 p-2 text-sm focus:outline-none"
                    />
                    <button className="p-2 text-white bg-green-600 rounded-full hover:bg-green-700 transition">
                        <Send className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default function HostMessagesPage() {
    const conversations = [
        { id: 1, name: "Margaret Johnson", lastMessage: "Great! Your application has been approved. Let's schedule your check-in....", time: "5m ago", isHost: false, isSupport: true, unreadCount: 2, isActive: true },
        { id: 2, name: "Nestoria Support", lastMessage: "Hi Anna! I received your inquiry about the room. When would you like to....", time: "1d ago", isHost: true, isSupport: false, unreadCount: 1, isActive: false },
        { id: 3, name: "John Davis", lastMessage: "The room is still available! Here are some additional photos you....", time: "2h ago", isHost: true, isSupport: false, unreadCount: 0, isActive: false },
        { id: 4, name: "Robert Lee", lastMessage: "Thank you for your interest! Unfortunately, that room has been...", time: "2d ago", isHost: false, isSupport: false, unreadCount: 0, isActive: false },
        { id: 5, name: "Susan Miller", lastMessage: "I hope you are enjoying your stay. Don't forget to submit your maintenance request...", time: "3d ago", isHost: false, isSupport: false, unreadCount: 0, isActive: false },
    ];

    const activeContact = { name: "Margaret Johnson", role: "Host" };

    return (
        <div className="flex min-h-screen bg-gray-50">
            <HostSidebar />
            <div className="flex-1 flex flex-col">
                <HostHeader />
                <main className="flex-1 flex overflow-hidden">
                    <div className="w-96 flex-shrink-0 border-r border-gray-200 bg-white">
                        <div className="p-6">
                            <h1 className="text-2xl font-bold text-gray-800">Messages (8)</h1>
                        </div>
                        <div className="px-6 pb-4">
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
                        <div className="flex space-x-2 px-6 pb-4 border-b">
                            <button className="text-sm font-semibold text-white bg-orange-500 px-3 py-1 rounded-full flex items-center">
                                All (8)
                            </button>
                            <button className="text-sm font-medium text-gray-600 hover:bg-gray-100 px-3 py-1 rounded-full flex items-center">
                                Unread (5)
                            </button>
                            <button className="text-sm font-medium text-gray-600 hover:bg-gray-100 px-3 py-1 rounded-full flex items-center">
                                Hosts
                            </button>
                            <button className="text-sm font-medium text-gray-600 hover:bg-gray-100 px-3 py-1 rounded-full flex items-center">
                                Archived
                            </button>
                        </div>
                        <div className="overflow-y-auto h-[calc(100vh-250px)]">
                            {conversations.map(conv => (
                                <ConversationItem key={conv.id} {...conv} />
                            ))}
                        </div>
                    </div>
                    <div className="flex-1 min-w-0">
                        <ConversationThread activeContact={activeContact} />
                    </div>
                </main>
            </div>
        </div>
    );
}