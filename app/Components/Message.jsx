// "use client";

// import React, { useState, useEffect, useRef } from 'react';
// import { useRouter, useSearchParams } from 'next/navigation';
// import { useAuth } from '../context/AuthContext';
// import io from 'socket.io-client';
// import Cookies from 'js-cookie';
// import toast from 'react-hot-toast';
// import {
//     Search, Plus, Phone, Paperclip, Send, MoreVertical,
//     CheckCheck, X, Loader2, Image as ImageIcon, Smile
// } from 'lucide-react';
// import RenterHeader from './RenterHeader';
// import Sidebar from './RenterSidebar';

// // --- Helper Functions ---
// const formatTime = (dateString) => {
//     if (!dateString) return '';
//     const date = new Date(dateString);
//     return date.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
// };

// const formatDateSeparator = (currentDate, previousDate) => {
//     if (!previousDate || new Date(currentDate).toDateString() !== new Date(previousDate).toDateString()) {
//         const date = new Date(currentDate);
//         const today = new Date();
//         const yesterday = new Date(today);
//         yesterday.setDate(yesterday.getDate() - 1);

//         if (date.toDateString() === today.toDateString()) return 'Today';
//         if (date.toDateString() === yesterday.toDateString()) return 'Yesterday';
//         return date.toLocaleDateString([], { month: 'short', day: 'numeric', year: 'numeric' });
//     }
//     return null;
// };

// const getOtherParticipant = (participants, userId) => {
//     return participants?.find(p => p._id !== userId);
// };

// const getInitials = (firstName, lastName) => {
//     if (!firstName) return '?';
//     const first = firstName.charAt(0);
//     const last = lastName ? lastName.charAt(0) : '';
//     return `${first}${last}`.toUpperCase();
// };

// // --- Sub-Components ---
// const ConversationListItem = ({ conversation, isActive, onClick, currentUserId }) => {
//     const otherParticipant = getOtherParticipant(conversation.participants, currentUserId);
//     const senderName = otherParticipant?.firstName ? `${otherParticipant.firstName} ${otherParticipant.lastName}` : 'Unknown User';
//     const previewText = conversation.lastMessage?.content || 'No messages yet';
//     const messageTime = conversation.lastMessage ? formatTime(conversation.lastMessage.createdAt) : formatTime(conversation.updatedAt);
//     const isHost = otherParticipant?.role === 'host';
//     const unreadCount = 0; // Placeholder - implement based on your backend

//     const AvatarComponent = () => {
//         const initials = getInitials(otherParticipant?.firstName, otherParticipant?.lastName);
//         return (
//             <div className="relative">
//                 <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 text-white flex items-center justify-center text-base font-bold shadow-md">
//                     {initials}
//                 </div>
//                 <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-white"></div>
//             </div>
//         );
//     };

//     return (
//         <div
//             onClick={() => onClick(conversation._id)}
//             className={`flex p-4 rounded-2xl cursor-pointer transition-all duration-200 ${isActive
//                     ? 'bg-gradient-to-r from-amber-50 to-orange-50 shadow-md scale-[1.02]'
//                     : 'hover:bg-gray-50 hover:shadow-sm'
//                 }`}
//         >
//             <div className="flex-shrink-0 mr-4">
//                 <AvatarComponent />
//             </div>
//             <div className="flex-1 min-w-0">
//                 <div className="flex justify-between items-start mb-1">
//                     <p className={`font-bold text-gray-900 truncate ${unreadCount > 0 ? 'text-amber-900' : ''}`}>
//                         {senderName}
//                     </p>
//                     <span className="text-xs text-gray-500 ml-2 flex-shrink-0">{messageTime}</span>
//                 </div>
//                 <p className={`text-sm truncate mb-2 ${unreadCount > 0 ? 'text-gray-800 font-medium' : 'text-gray-600'}`}>
//                     {previewText}
//                 </p>
//                 <div className="flex items-center justify-between">
//                     <span className={`text-xs font-bold px-3 py-1 rounded-full ${isHost
//                             ? 'bg-gradient-to-r from-amber-100 to-orange-100 text-amber-800'
//                             : 'bg-gradient-to-r from-blue-100 to-cyan-100 text-blue-800'
//                         }`}>
//                         {isHost ? 'HOST' : 'RENTER'}
//                     </span>
//                     {unreadCount > 0 && (
//                         <span className="text-xs font-bold min-w-[20px] h-5 flex items-center justify-center rounded-full bg-gradient-to-r from-red-500 to-pink-500 text-white px-2 shadow-md">
//                             {unreadCount}
//                         </span>
//                     )}
//                 </div>
//             </div>
//         </div>
//     );
// };

// const ChatBubble = ({ message, isCurrentUser }) => {
//     const alignment = isCurrentUser ? 'justify-end' : 'justify-start';
//     const time = formatTime(message.createdAt);

//     return (
//         <div className={`flex ${alignment} w-full mb-4 group`}>
//             <div className={`flex items-end space-x-2 max-w-[70%] ${isCurrentUser ? 'flex-row-reverse space-x-reverse' : ''}`}>
//                 {!isCurrentUser && (
//                     <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gray-300 to-gray-400 flex-shrink-0 mb-1"></div>
//                 )}
//                 <div className="flex flex-col">
//                     <div className={`rounded-2xl px-4 py-3 shadow-md ${isCurrentUser
//                             ? 'bg-gradient-to-br from-amber-500 to-orange-600 text-white rounded-br-md'
//                             : 'bg-white text-gray-800 rounded-bl-md border border-gray-100'
//                         }`}>
//                         <p className="text-[15px] leading-relaxed break-words">{message.content}</p>
//                     </div>
//                     <div className={`flex items-center space-x-1 mt-1 px-2 ${isCurrentUser ? 'justify-end' : 'justify-start'}`}>
//                         <span className={`text-xs ${isCurrentUser ? 'text-gray-500' : 'text-gray-500'}`}>
//                             {time}
//                         </span>
//                         {isCurrentUser && (
//                             <CheckCheck className="w-3.5 h-3.5 text-amber-600" />
//                         )}
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// // --- Main Message Content Area ---
// const MessagesContent = () => {
//     const { user } = useAuth();
//     const router = useRouter();
//     const searchParams = useSearchParams();
//     const initialConversationId = searchParams.get('id');

//     const [conversations, setConversations] = useState([]);
//     const [selectedConversationId, setSelectedConversationId] = useState(initialConversationId);
//     const [messages, setMessages] = useState([]);
//     const [newMessage, setNewMessage] = useState('');
//     const [isLoadingConversations, setIsLoadingConversations] = useState(true);
//     const [isLoadingMessages, setIsLoadingMessages] = useState(false);
//     const [conversationDetails, setConversationDetails] = useState(null);
//     const [socket, setSocket] = useState(null);
//     const [searchQuery, setSearchQuery] = useState('');
//     const [activeFilter, setActiveFilter] = useState('all');
//     const messagesEndRef = useRef(null);

//     // Fetch Conversations List
//     useEffect(() => {
//         const fetchConversations = async () => {
//             setIsLoadingConversations(true);
//             try {
//                 const response = await fetch('/api/conversations');
//                 const result = await response.json();
//                 if (!response.ok) throw new Error(result.message || 'Failed to fetch conversations.');
//                 setConversations(result.data);
//                 if (initialConversationId && result.data.some(c => c._id === initialConversationId)) {
//                     setSelectedConversationId(initialConversationId);
//                 } else if (result.data.length > 0 && !initialConversationId) {
//                     setSelectedConversationId(result.data[0]._id);
//                 }
//             } catch (error) {
//                 toast.error(`Error fetching conversations: ${error.message}`);
//             } finally {
//                 setIsLoadingConversations(false);
//             }
//         };
//         fetchConversations();
//     }, [initialConversationId]);

//     // Fetch Messages for Selected Conversation
//     useEffect(() => {
//         if (!selectedConversationId) {
//             setMessages([]);
//             setConversationDetails(null);
//             return;
//         }

//         const fetchMessages = async () => {
//             setIsLoadingMessages(true);
//             try {
//                 const response = await fetch(`/api/messages/${selectedConversationId}`);
//                 const result = await response.json();
//                 if (!response.ok) throw new Error(result.message || 'Failed to fetch messages.');
//                 setMessages(result.data.messages);
//                 setConversationDetails(result.data.conversationDetails);
//             } catch (error) {
//                 toast.error(`Error fetching messages: ${error.message}`);
//                 setMessages([]);
//                 setConversationDetails(null);
//             } finally {
//                 setIsLoadingMessages(false);
//             }
//         };
//         fetchMessages();
//     }, [selectedConversationId]);

//     // WebSocket Connection
//     useEffect(() => {
//         const token = Cookies.get('authToken');
//         if (!token || !selectedConversationId) return;

//         const newSocket = io({
//             path: '/api/socket',
//             auth: { token }
//         });

//         newSocket.on('connect', () => {
//             newSocket.emit('joinRoom', selectedConversationId);
//         });

//         newSocket.on('receiveMessage', (message) => {
//             if (message.conversationId === selectedConversationId) {
//                 setMessages((prevMessages) => [...prevMessages, message]);
//             }
//         });

//         newSocket.on('connect_error', (err) => {
//             toast.error(`Connection Failed: ${err.message}`);
//         });

//         newSocket.on('messageError', (error) => {
//             toast.error(error.message || 'Failed to send message.');
//         });

//         setSocket(newSocket);

//         return () => {
//             newSocket.disconnect();
//             setSocket(null);
//         };
//     }, [selectedConversationId]);

//     // Scroll to bottom when messages change
//     useEffect(() => {
//         messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//     }, [messages]);

//     const handleSelectConversation = (id) => {
//         setSelectedConversationId(id);
//         router.push(`/rentermessage?id=${id}`, { scroll: false });
//     };

//     const handleSendMessage = (e) => {
//         e.preventDefault();
//         if (!newMessage.trim() || !socket || !selectedConversationId || !user) return;

//         const messageData = {
//             conversationId: selectedConversationId,
//             content: newMessage.trim(),
//         };

//         socket.emit('sendMessage', messageData);
//         setNewMessage('');
//     };

//     const otherParticipant = getOtherParticipant(conversationDetails?.participants, user?.userId);
//     const activeChatName = otherParticipant?.firstName ? `${otherParticipant.firstName} ${otherParticipant.lastName}` : 'Select a Conversation';
//     const activeChatInitials = getInitials(otherParticipant?.firstName, otherParticipant?.lastName);

//     const filteredConversations = conversations.filter(conv => {
//         const otherPart = getOtherParticipant(conv.participants, user?.userId);
//         const name = `${otherPart?.firstName || ''} ${otherPart?.lastName || ''}`.toLowerCase();
//         return name.includes(searchQuery.toLowerCase());
//     });

//     return (
//         <div className="flex-1 flex overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
//             {/* Sidebar */}
//             <div className="w-[380px] flex-shrink-0 border-r border-gray-200 bg-white shadow-xl flex flex-col">
//                 {/* Header */}
//                 <div className="p-6 border-b border-gray-100 bg-gradient-to-r from-amber-500 to-orange-600">
//                     <div className="flex justify-between items-center mb-4">
//                         <h1 className="text-2xl font-bold text-white">Messages</h1>
//                         <button className="p-2.5 bg-white/20 backdrop-blur-sm text-white rounded-full hover:bg-white/30 transition-all shadow-lg">
//                             <Plus className="w-5 h-5" />
//                         </button>
//                     </div>
//                     {/* Search */}
//                     <div className="relative">
//                         <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-white/70" />
//                         <input
//                             type="text"
//                             placeholder="Search conversations..."
//                             value={searchQuery}
//                             onChange={(e) => setSearchQuery(e.target.value)}
//                             className="w-full pl-12 pr-4 py-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-white/50 text-white placeholder-white/70 text-sm"
//                         />
//                     </div>
//                 </div>

//                 {/* Filters */}
//                 <div className="flex space-x-2 p-4 border-b border-gray-100 overflow-x-auto scrollbar-hide">
//                     {['all', 'unread', 'hosts', 'archived'].map(filter => (
//                         <button
//                             key={filter}
//                             onClick={() => setActiveFilter(filter)}
//                             className={`px-4 py-2 text-sm font-semibold rounded-full whitespace-nowrap transition-all ${activeFilter === filter
//                                     ? 'bg-gradient-to-r from-amber-500 to-orange-600 text-white shadow-md'
//                                     : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
//                                 }`}
//                         >
//                             {filter.charAt(0).toUpperCase() + filter.slice(1)}
//                         </button>
//                     ))}
//                 </div>

//                 {/* Conversations List */}
//                 <div className="flex-1 overflow-y-auto p-4 space-y-3 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
//                     {isLoadingConversations ? (
//                         <div className="flex justify-center items-center h-full">
//                             <Loader2 className="w-8 h-8 animate-spin text-amber-500" />
//                         </div>
//                     ) : filteredConversations.length > 0 ? (
//                         filteredConversations.map(conv => (
//                             <ConversationListItem
//                                 key={conv._id}
//                                 conversation={conv}
//                                 isActive={conv._id === selectedConversationId}
//                                 onClick={handleSelectConversation}
//                                 currentUserId={user?.userId}
//                             />
//                         ))
//                     ) : (
//                         <div className="text-center text-gray-500 pt-20">
//                             <p className="text-lg font-medium">No conversations found</p>
//                             <p className="text-sm mt-2">Start a new chat to get connected</p>
//                         </div>
//                     )}
//                 </div>
//             </div>

//             {/* Chat Area */}
//             <div className="flex-1 flex flex-col bg-white">
//                 {selectedConversationId && conversationDetails ? (
//                     <>
//                         {/* Chat Header */}
//                         <div className="p-6 bg-white border-b border-gray-100 flex justify-between items-center flex-shrink-0 shadow-sm">
//                             <div className="flex items-center space-x-4">
//                                 <div className="relative">
//                                     <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 text-white flex items-center justify-center font-bold text-lg shadow-md">
//                                         {activeChatInitials}
//                                     </div>
//                                     <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-white"></div>
//                                 </div>
//                                 <div>
//                                     <p className="font-bold text-gray-900 text-lg">{activeChatName}</p>
//                                     <p className="text-sm text-green-600 flex items-center font-medium">
//                                         <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></span>
//                                         Active now
//                                     </p>
//                                 </div>
//                             </div>
//                             <div className="flex space-x-2">
//                                 <button className="px-5 py-2.5 text-sm font-semibold text-amber-600 border-2 border-amber-600 rounded-xl hover:bg-amber-50 transition-all">
//                                     View Listing
//                                 </button>
//                                 <button className="p-3 text-gray-500 hover:text-amber-600 hover:bg-amber-50 rounded-xl transition-all">
//                                     <Phone className="w-5 h-5" />
//                                 </button>
//                                 <button className="p-3 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-xl transition-all">
//                                     <MoreVertical className="w-5 h-5" />
//                                 </button>
//                             </div>
//                         </div>

//                         {/* Messages */}
//                         <div className="flex-1 overflow-y-auto p-8 space-y-1 bg-gradient-to-br from-gray-50 to-white scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
//                             {isLoadingMessages ? (
//                                 <div className="flex justify-center items-center h-full">
//                                     <Loader2 className="w-8 h-8 animate-spin text-amber-500" />
//                                 </div>
//                             ) : messages.length > 0 ? (
//                                 messages.map((msg, index, arr) => {
//                                     const prevMsg = arr[index - 1];
//                                     const dateSeparator = formatDateSeparator(msg.createdAt, prevMsg?.createdAt);
//                                     return (
//                                         <React.Fragment key={msg._id}>
//                                             {dateSeparator && (
//                                                 <div className="flex justify-center my-6">
//                                                     <span className="text-xs font-semibold text-gray-500 bg-gray-200 px-4 py-2 rounded-full shadow-sm">
//                                                         {dateSeparator}
//                                                     </span>
//                                                 </div>
//                                             )}
//                                             <ChatBubble
//                                                 message={msg}
//                                                 isCurrentUser={msg.sender._id === user?.userId}
//                                             />
//                                         </React.Fragment>
//                                     );
//                                 })
//                             ) : (
//                                 <div className="flex flex-col items-center justify-center h-full text-gray-500">
//                                     <div className="w-24 h-24 bg-gradient-to-br from-amber-100 to-orange-100 rounded-full flex items-center justify-center mb-4">
//                                         <Send className="w-12 h-12 text-amber-500" />
//                                     </div>
//                                     <p className="text-lg font-semibold">Start the conversation!</p>
//                                     <p className="text-sm mt-2">Send your first message below</p>
//                                 </div>
//                             )}
//                             <div ref={messagesEndRef} />
//                         </div>

//                         {/* Message Input */}
//                         <form onSubmit={handleSendMessage} className="p-6 bg-white border-t border-gray-100 flex space-x-3 items-end flex-shrink-0 shadow-lg">
//                             <button type="button" className="p-3 text-gray-500 hover:text-amber-600 hover:bg-amber-50 rounded-xl transition-all">
//                                 <Paperclip className="w-6 h-6" />
//                             </button>
//                             <button type="button" className="p-3 text-gray-500 hover:text-amber-600 hover:bg-amber-50 rounded-xl transition-all">
//                                 <ImageIcon className="w-6 h-6" />
//                             </button>
//                             <div className="flex-1 relative">
//                                 <input
//                                     type="text"
//                                     placeholder="Type your message..."
//                                     value={newMessage}
//                                     onChange={(e) => setNewMessage(e.target.value)}
//                                     className="w-full border-2 border-gray-200 focus:border-amber-500 focus:ring-0 text-gray-800 px-5 py-3.5 bg-gray-50 rounded-2xl focus:bg-white transition-all text-[15px]"
//                                 />
//                             </div>
//                             <button type="submit" className="p-4 bg-gradient-to-r from-amber-500 to-orange-600 text-white rounded-2xl hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed" disabled={!newMessage.trim()}>
//                                 <Send className="w-5 h-5" />
//                             </button>
//                         </form>
//                     </>
//                 ) : (
//                     <div className="flex-1 flex flex-col items-center justify-center text-gray-500 bg-gradient-to-br from-gray-50 to-white">
//                         {isLoadingConversations ? (
//                             <Loader2 className="w-12 h-12 animate-spin text-amber-500" />
//                         ) : (
//                             <>
//                                 <div className="w-32 h-32 bg-gradient-to-br from-amber-100 to-orange-100 rounded-full flex items-center justify-center mb-6">
//                                     <Send className="w-16 h-16 text-amber-500" />
//                                 </div>
//                                 <p className="text-xl font-bold text-gray-700">No conversation selected</p>
//                                 <p className="text-sm text-gray-500 mt-2">Choose a conversation from the list to start chatting</p>
//                             </>
//                         )}
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// };

// const MessagesPage = () => {
//     const { user, loading } = useAuth();
//     const router = useRouter();

//     useEffect(() => {
//         if (!loading && !user) {
//             router.push('/');
//         }
//     }, [user, loading, router]);

//     if (loading || !user) {
//         return (
//             <div className="flex h-screen items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
//                 <Loader2 className="w-12 h-12 animate-spin text-amber-500" />
//             </div>
//         );
//     }

//     return (
     

//          <div className="flex min-h-screen">
//             {/* Sidebar on the left */}
//             <Sidebar />

//             {/* Page content on the right */}
//             <div className="flex-1 flex flex-col overflow-hidden bg-gray-50">
//                 {/* Renter Header at the top */}
//                 <RenterHeader />

//                 {/* Main Message Content */}
//                 <main className="flex-1 overflow-y-auto">
//                     <MessagesContent />
//                 </main>
//             </div>
//         </div>
//     );
// };

// export default MessagesPage;




"use client";

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
import {
    Search, Plus, Phone, Paperclip, Send, MoreVertical,
    CheckCheck, X, Loader2, Image as ImageIcon, Smile
} from 'lucide-react';
import RenterHeader from './RenterHeader';
import Sidebar from './RenterSidebar';

// --- Helper Functions ---
const formatTime = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
};

const formatDateSeparator = (currentDate, previousDate) => {
    if (!previousDate || new Date(currentDate).toDateString() !== new Date(previousDate).toDateString()) {
        const date = new Date(currentDate);
        const today = new Date();
        const yesterday = new Date(today);
        yesterday.setDate(yesterday.getDate() - 1);

        if (date.toDateString() === today.toDateString()) return 'Today';
        if (date.toDateString() === yesterday.toDateString()) return 'Yesterday';
        return date.toLocaleDateString([], { month: 'short', day: 'numeric', year: 'numeric' });
    }
    return null;
};

const getOtherParticipant = (participants, userId) => {
    return participants?.find(p => p._id !== userId);
};

const getInitials = (firstName, lastName) => {
    if (!firstName) return '?';
    const first = firstName.charAt(0);
    const last = lastName ? lastName.charAt(0) : '';
    return `${first}${last}`.toUpperCase();
};

// --- Sub-Components ---
const ConversationListItem = ({ conversation, isActive, onClick, currentUserId }) => {
    const otherParticipant = getOtherParticipant(conversation.participants, currentUserId);
    const senderName = otherParticipant?.firstName ? `${otherParticipant.firstName} ${otherParticipant.lastName}` : 'Unknown User';
    
    // Safely access lastMessage content and time
    const lastMessage = conversation.lastMessage;
    const previewText = lastMessage?.content || 'No messages yet';
    const messageTime = lastMessage ? formatTime(lastMessage.createdAt) : formatTime(conversation.updatedAt);
    
    const isHost = otherParticipant?.role === 'host';
    const unreadCount = 0; // Static placeholder

    const AvatarComponent = () => {
        const initials = getInitials(otherParticipant?.firstName, otherParticipant?.lastName);
        return (
            <div className="relative">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 text-white flex items-center justify-center text-base font-bold shadow-md">
                    {initials}
                </div>
                <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-white"></div>
            </div>
        );
    };

    return (
        <div
            onClick={() => onClick(conversation._id)}
            className={`flex p-4 rounded-2xl cursor-pointer transition-all duration-200 ${isActive
                    ? 'bg-gradient-to-r from-amber-50 to-orange-50 shadow-md scale-[1.02]'
                    : 'hover:bg-gray-50 hover:shadow-sm'
                }`}
        >
            <div className="flex-shrink-0 mr-4">
                <AvatarComponent />
            </div>
            <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start mb-1">
                    <p className={`font-bold text-gray-900 truncate ${unreadCount > 0 ? 'text-amber-900' : ''}`}>
                        {senderName}
                    </p>
                    <span className="text-xs text-gray-500 ml-2 flex-shrink-0">{messageTime}</span>
                </div>
                <p className={`text-sm truncate mb-2 ${unreadCount > 0 ? 'text-gray-800 font-medium' : 'text-gray-600'}`}>
                    {previewText}
                </p>
                <div className="flex items-center justify-between">
                    <span className={`text-xs font-bold px-3 py-1 rounded-full ${isHost
                            ? 'bg-gradient-to-r from-amber-100 to-orange-100 text-amber-800'
                            : 'bg-gradient-to-r from-blue-100 to-cyan-100 text-blue-800'
                        }`}>
                        {isHost ? 'HOST' : 'RENTER'}
                    </span>
                    {unreadCount > 0 && (
                        <span className="text-xs font-bold min-w-[20px] h-5 flex items-center justify-center rounded-full bg-gradient-to-r from-red-500 to-pink-500 text-white px-2 shadow-md">
                            {unreadCount}
                        </span>
                    )}
                </div>
            </div>
        </div>
    );
};

const ChatBubble = ({ message, isCurrentUser }) => {
    const alignment = isCurrentUser ? 'justify-end' : 'justify-start';
    const time = formatTime(message.createdAt);

    return (
        <div className={`flex ${alignment} w-full mb-4 group`}>
            <div className={`flex items-end space-x-2 max-w-[70%] ${isCurrentUser ? 'flex-row-reverse space-x-reverse' : ''}`}>
                {!isCurrentUser && (
                    // Placeholder for the other user's avatar
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gray-300 to-gray-400 flex-shrink-0 mb-1"></div>
                )}
                <div className="flex flex-col">
                    <div className={`rounded-2xl px-4 py-3 shadow-md ${isCurrentUser
                            ? 'bg-gradient-to-br from-amber-500 to-orange-600 text-white rounded-br-md'
                            : 'bg-white text-gray-800 rounded-bl-md border border-gray-100'
                        }`}>
                        <p className="text-[15px] leading-relaxed break-words">{message.content}</p>
                    </div>
                    <div className="flex items-center space-x-1 mt-1 px-2">
                        <span className={`text-xs ${isCurrentUser ? 'text-gray-500' : 'text-gray-500'}`}>
                            {time}
                        </span>
                        {isCurrentUser && (
                            <CheckCheck className="w-3.5 h-3.5 text-amber-600" />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

// --- Main Message Content Area (STATIC) ---
const MessagesContent = () => {
    const { user } = useAuth();
    const router = useRouter();
    const searchParams = useSearchParams();
    const initialConversationId = searchParams.get('id');

    const [conversations, setConversations] = useState([]);
    const [selectedConversationId, setSelectedConversationId] = useState(initialConversationId);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [isLoadingConversations, setIsLoadingConversations] = useState(true);
    const [isLoadingMessages, setIsLoadingMessages] = useState(false);
    const [conversationDetails, setConversationDetails] = useState(null);
    // Removed: [socket, setSocket]
    const [searchQuery, setSearchQuery] = useState('');
    const [activeFilter, setActiveFilter] = useState('all');
    const messagesEndRef = useRef(null);
    const [isSending, setIsSending] = useState(false);

    // MOCK DATA: Using client-side state for static chat experience
    const mockRenterName = user?.firstName || 'Renter'; // Use actual user name or default
    const mockRenterId = user?.userId;

    const mockConversations = [
        { 
            _id: 'conv1', 
            participants: [{ _id: mockRenterId, role: 'renter', firstName: mockRenterName }, { _id: 'hostA', role: 'host', firstName: 'Jane', lastName: 'Host' }],
            lastMessage: { content: 'Is this unit still available?', createdAt: new Date(Date.now() - 60000).toISOString(), sender: 'hostA' },
            updatedAt: new Date(Date.now() - 60000).toISOString()
        },
        { 
            _id: 'conv2', 
            participants: [{ _id: mockRenterId, role: 'renter', firstName: mockRenterName }, { _id: 'hostB', role: 'host', firstName: 'Mark', lastName: 'Host' }],
            lastMessage: { content: 'Perfect, I will schedule a visit.', createdAt: new Date(Date.now() - 120000).toISOString(), sender: mockRenterId },
            updatedAt: new Date(Date.now() - 120000).toISOString()
        },
    ];

    const mockMessages = {
        'conv1': [
            { _id: 'msg1', sender: { _id: 'hostA' }, content: 'Hello! I am Jane, the host of the apartment you liked.', createdAt: new Date(Date.now() - 600000).toISOString() },
            { _id: 'msg2', sender: { _id: mockRenterId }, content: 'Hi Jane, is the place available for a June move-in?', createdAt: new Date(Date.now() - 500000).toISOString() },
            { _id: 'msg3', sender: { _id: 'hostA' }, content: 'Yes, it is!', createdAt: new Date(Date.now() - 60000).toISOString() },
        ],
        'conv2': [
            { _id: 'msg4', sender: { _id: 'hostB' }, content: 'Are you ready to sign the lease?', createdAt: new Date(Date.now() - 300000).toISOString() },
            { _id: 'msg5', sender: { _id: mockRenterId }, content: 'Yes, just confirming a few details first.', createdAt: new Date(Date.now() - 120000).toISOString() },
        ],
    };

    const loadStaticData = useCallback(() => {
        if (!user) return;
        setIsLoadingConversations(true);
        
        // Simulating loading state/latency
        setTimeout(() => {
            const initialData = mockConversations.map(conv => ({
                ...conv,
                participants: conv.participants.map(p => p._id === mockRenterId ? { ...p, firstName: mockRenterName } : p)
            }));

            setConversations(initialData);
            
            const convoToSelect = initialConversationId && initialData.some(c => c._id === initialConversationId)
                ? initialConversationId
                : initialData.length > 0
                ? initialData[0]._id
                : null;

            setSelectedConversationId(convoToSelect);
            
            if (convoToSelect && mockMessages[convoToSelect]) {
                setMessages(mockMessages[convoToSelect]);
                setConversationDetails(initialData.find(c => c._id === convoToSelect));
            } else {
                 setMessages([]);
                 setConversationDetails(null);
            }
            
            setIsLoadingConversations(false);
            setIsLoadingMessages(false);
        }, 300);
    }, [user, initialConversationId, mockRenterId, mockRenterName]);

    // Load static data on startup
    useEffect(() => {
        loadStaticData();
    }, [loadStaticData]);

    // Update messages when conversation is selected
    useEffect(() => {
        if (!selectedConversationId) {
            setMessages([]);
            setConversationDetails(null);
            return;
        }

        const details = conversations.find(c => c._id === selectedConversationId);
        setConversationDetails(details);
        
        // Mock loading messages for the newly selected chat
        setIsLoadingMessages(true);
        setTimeout(() => {
             setMessages(mockMessages[selectedConversationId] || []);
             setIsLoadingMessages(false);
        }, 100);
    }, [selectedConversationId, conversations]);

    // Scroll to bottom when messages change
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const handleSelectConversation = (id) => {
        if (id === selectedConversationId) return;
        setSelectedConversationId(id);
        router.push(`/rentermessage?id=${id}`, { scroll: false });
    };

    // 🚀 FULLY STATIC Implementation: Client-side updates only. No API calls.
    const handleSendMessage = (e) => {
        e.preventDefault();
        const contentToSend = newMessage.trim();
        if (!contentToSend || !selectedConversationId || !user || isSending) return;

        setIsSending(true);
        
        // 1. Create the new message (Renter name is dynamic: mockRenterName)
        const newMessageObject = {
            _id: `client-${Date.now()}`,
            conversationId: selectedConversationId,
            sender: { _id: mockRenterId, firstName: mockRenterName, lastName: '' },
            content: contentToSend,
            createdAt: new Date().toISOString(),
        };

        // 2. Update messages list
        setMessages(prev => [...prev, newMessageObject]);
        setNewMessage('');
        
        // 3. Update the conversation list (update last message and time)
        setConversations(prevConvos => prevConvos.map(convo => {
            if (convo._id === selectedConversationId) {
                return { 
                    ...convo, 
                    lastMessage: newMessageObject, 
                    updatedAt: newMessageObject.createdAt 
                };
            }
            return convo;
        }));

        // 4. Simulate send completion immediately
        setTimeout(() => {
            setIsSending(false);
            toast.success('Message delivered !');
        }, 100); 
    };

    const otherParticipant = getOtherParticipant(conversationDetails?.participants, user?.userId);
    const activeChatName = otherParticipant?.firstName ? `${otherParticipant.firstName} ${otherParticipant.lastName}` : 'Select a Conversation';
    const activeChatInitials = getInitials(otherParticipant?.firstName, otherParticipant?.lastName);
    const activeChatRole = otherParticipant?.role === 'host' ? 'Host' : 'User';


    const filteredConversations = conversations.filter(conv => {
        const otherPart = getOtherParticipant(conv.participants, user?.userId);
        const name = `${otherPart?.firstName || ''} ${otherPart?.lastName || ''}`.toLowerCase();
        return name.includes(searchQuery.toLowerCase());
    });

    return (
        <div className="flex-1 flex overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
            {/* Sidebar */}
            <div className="w-[380px] flex-shrink-0 border-r border-gray-200 bg-white shadow-xl flex flex-col">
                {/* Header */}
                <div className="p-6 border-b border-gray-100 bg-gradient-to-r from-amber-500 to-orange-600">
                    <div className="flex justify-between items-center mb-4">
                        <h1 className="text-2xl font-bold text-white">Messages</h1>
                        <button className="p-2.5 bg-white/20 backdrop-blur-sm text-white rounded-full hover:bg-white/30 transition-all shadow-lg">
                            <Plus className="w-5 h-5" />
                        </button>
                    </div>
                    {/* Search */}
                    <div className="relative">
                        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-white/70" />
                        <input
                            type="text"
                            placeholder="Search conversations..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-12 pr-4 py-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-white/50 text-white placeholder-white/70 text-sm"
                        />
                    </div>
                </div>

                {/* Filters */}
                <div className="flex space-x-2 p-4 border-b border-gray-100 overflow-x-auto scrollbar-hide">
                    {['all', 'unread', 'hosts', 'archived'].map(filter => (
                        <button
                            key={filter}
                            onClick={() => setActiveFilter(filter)}
                            className={`px-4 py-2 text-sm font-semibold rounded-full whitespace-nowrap transition-all ${activeFilter === filter
                                    ? 'bg-gradient-to-r from-amber-500 to-orange-600 text-white shadow-md'
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                }`}
                        >
                            {filter.charAt(0).toUpperCase() + filter.slice(1)}
                        </button>
                    ))}
                </div>

                {/* Conversations List */}
                <div className="flex-1 overflow-y-auto p-4 space-y-3 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
                    {isLoadingConversations ? (
                        <div className="flex justify-center items-center h-full">
                            <Loader2 className="w-8 h-8 animate-spin text-amber-500" />
                        </div>
                    ) : filteredConversations.length > 0 ? (
                        filteredConversations.map(conv => (
                            <ConversationListItem
                                key={conv._id}
                                conversation={conv}
                                isActive={conv._id === selectedConversationId}
                                onClick={handleSelectConversation}
                                currentUserId={user?.userId}
                            />
                        ))
                    ) : (
                        <div className="text-center text-gray-500 pt-20">
                            <p className="text-lg font-medium">No conversations found</p>
                            <p className="text-sm mt-2">Start a new chat to get connected</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Chat Area */}
            <div className="flex-1 flex flex-col bg-white">
                {selectedConversationId && conversationDetails ? (
                    <>
                        {/* Chat Header */}
                        <div className="p-6 bg-white border-b border-gray-100 flex justify-between items-center flex-shrink-0 shadow-sm">
                            <div className="flex items-center space-x-4">
                                <div className="relative">
                                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 text-white flex items-center justify-center font-bold text-lg shadow-md">
                                        {activeChatInitials}
                                    </div>
                                    <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-white"></div>
                                </div>
                                <div>
                                    <p className="font-bold text-gray-900 text-lg">{activeChatName}</p>
                                    <p className="text-sm text-green-600 flex items-center font-medium capitalize">
                                        <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></span>
                                        {activeChatRole}
                                    </p>
                                </div>
                            </div>
                            <div className="flex space-x-2">
                                <button className="px-5 py-2.5 text-sm font-semibold text-amber-600 border-2 border-amber-600 rounded-xl hover:bg-amber-50 transition-all">
                                    View Listing
                                </button>
                                <button className="p-3 text-gray-500 hover:text-amber-600 hover:bg-amber-50 rounded-xl transition-all">
                                    <Phone className="w-5 h-5" />
                                </button>
                                <button className="p-3 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-xl transition-all">
                                    <MoreVertical className="w-5 h-5" />
                                </button>
                            </div>
                        </div>

                        {/* Messages */}
                        <div className="flex-1 overflow-y-auto p-8 space-y-1 bg-gradient-to-br from-gray-50 to-white scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
                            {isLoadingMessages ? (
                                <div className="flex justify-center items-center h-full">
                                    <Loader2 className="w-8 h-8 animate-spin text-amber-500" />
                                </div>
                            ) : messages.length > 0 ? (
                                messages.map((msg, index, arr) => {
                                    const prevMsg = arr[index - 1];
                                    const dateSeparator = formatDateSeparator(msg.createdAt, prevMsg?.createdAt);
                                    return (
                                        <React.Fragment key={msg._id}>
                                            {dateSeparator && (
                                                <div className="flex justify-center my-6">
                                                    <span className="text-xs font-semibold text-gray-500 bg-gray-200 px-4 py-2 rounded-full shadow-sm">
                                                        {dateSeparator}
                                                    </span>
                                                </div>
                                            )}
                                            <ChatBubble
                                                message={msg}
                                                isCurrentUser={msg.sender?._id === user?.userId}
                                            />
                                        </React.Fragment>
                                    );
                                })
                            ) : (
                                <div className="flex flex-col items-center justify-center h-full text-gray-500">
                                    <div className="w-24 h-24 bg-gradient-to-br from-amber-100 to-orange-100 rounded-full flex items-center justify-center mb-4">
                                        <Send className="w-12 h-12 text-amber-500" />
                                    </div>
                                    <p className="text-lg font-semibold">Start the conversation!</p>
                                    <p className="text-sm mt-2">Send your first message below</p>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Message Input */}
                        <form onSubmit={handleSendMessage} className="p-6 bg-white border-t border-gray-100 flex space-x-3 items-end flex-shrink-0 shadow-lg">
                            <button type="button" className="p-3 text-gray-500 hover:text-amber-600 hover:bg-amber-50 rounded-xl transition-all">
                                <Paperclip className="w-6 h-6" />
                            </button>
                            <button type="button" className="p-3 text-gray-500 hover:text-amber-600 hover:bg-amber-50 rounded-xl transition-all">
                                <ImageIcon className="w-6 h-6" />
                            </button>
                            <div className="flex-1 relative">
                                <input
                                    type="text"
                                    placeholder="Type your message..."
                                    value={newMessage}
                                    onChange={(e) => setNewMessage(e.target.value)}
                                    className="w-full border-2 border-gray-200 focus:border-amber-500 focus:ring-0 text-gray-800 px-5 py-3.5 bg-gray-50 rounded-2xl focus:bg-white transition-all text-[15px]"
                                    disabled={isSending}
                                />
                            </div>
                            <button 
                                type="submit" 
                                className="p-4 bg-gradient-to-r from-amber-500 to-orange-600 text-white rounded-2xl hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center" 
                                disabled={!newMessage.trim() || isSending}
                            >
                                {isSending ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
                            </button>
                        </form>
                    </>
                ) : (
                    <div className="flex-1 flex flex-col items-center justify-center text-gray-500 bg-gradient-to-br from-gray-50 to-white">
                        {isLoadingConversations ? (
                            <Loader2 className="w-12 h-12 animate-spin text-amber-500" />
                        ) : (
                            <>
                                <div className="w-32 h-32 bg-gradient-to-br from-amber-100 to-orange-100 rounded-full flex items-center justify-center mb-6">
                                    <Send className="w-16 h-16 text-amber-500" />
                                </div>
                                <p className="text-xl font-bold text-gray-700">No conversation selected</p>
                                <p className="text-sm text-gray-500 mt-2">Choose a conversation from the list to start chatting</p>
                            </>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

// --- Main Page Wrapper ---
const MessagesPage = () => {
    const { user, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        // Ensure user is logged in before rendering chat components
        if (!loading && !user) {
            router.push('/');
        }
    }, [user, loading, router]);

    if (loading || !user) {
        return (
            <div className="flex h-screen items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
                <Loader2 className="w-12 h-12 animate-spin text-amber-500" />
            </div>
        );
    }

    return (
        <div className="flex min-h-screen">
            <Sidebar />
            <div className="flex-1 flex flex-col overflow-hidden bg-gray-50">
                <RenterHeader />
                <main className="flex-1 overflow-hidden">
                    {/* The MessagesContent component handles the chat logic */}
                    <MessagesContent />
                </main>
            </div>
        </div>
    );
};

export default MessagesPage;