import { Server } from 'socket.io';
import jwt from 'jsonwebtoken';
import Message from '@/app/models/Message'; // Adjust path if needed
import Conversation from '@/app/models/Conversation'; // Adjust path if needed
import dbConnect from '@/lib/mongodb'; // Adjust path if needed

const ioHandler = (req, res) => {
    // Check if socket server is already running
    if (!res.socket.server.io) {
        console.log('\n--- [Socket.IO Server] ---');
        console.log('* Initializing Socket.IO server...');
        const io = new Server(res.socket.server, {
            path: '/api/socket', // Explicitly define path
            addTrailingSlash: false // Important for consistency
        });
        console.log('* Socket.IO server initialized on path /api/socket');

        io.use((socket, next) => {
            console.log(`[Socket Auth] Attempting auth for socket ID: ${socket.id}`);
            const token = socket.handshake.auth.token || socket.handshake.query.token; // Check auth header first, then query
            console.log(`[Socket Auth] Token found: ${token ? 'Yes' : 'No'}`);

            if (token) {
                try {
                    const decoded = jwt.verify(token, process.env.JWT_SECRET);
                    socket.user = decoded;
                    console.log(`[Socket Auth] Success for user: ${socket.user?.email}`);
                    next();
                } catch (err) {
                    console.error("[Socket Auth] Error: Invalid token -", err.message);
                    next(new Error('Authentication error: Invalid token'));
                }
            } else {
                console.error("[Socket Auth] Error: No token provided");
                next(new Error('Authentication error: No token'));
            }
        });


        io.on('connection', socket => {
            console.log(`[Socket Connection] User connected: ${socket.user?.email} (ID: ${socket.id})`);

            socket.on('joinRoom', (conversationId) => {
                console.log(`[Socket Event] User ${socket.user?.email} joining room: ${conversationId}`);
                socket.join(conversationId);
                console.log(`[Socket Event] User added to room: ${conversationId}`);
            });

            socket.on('sendMessage', async ({ conversationId, content }) => {
                console.log(`[Socket Event] Received 'sendMessage' from ${socket.user?.email} in room ${conversationId}. Content: "${content}"`);
                if (!socket.user || !conversationId || !content) {
                    console.error("[Socket Event] 'sendMessage' failed: Missing data.");
                    socket.emit('messageError', { message: "Missing data for sending message." });
                    return;
                }

                try {
                    console.log("[DB] Connecting for sendMessage...");
                    await dbConnect();
                    console.log("[DB] Connected.");

                    const message = new Message({
                        conversationId,
                        sender: socket.user.userId,
                        content: content.trim(),
                    });
                    await message.save();
                    console.log(`[DB] Message saved: ${message._id}`);

                    await Conversation.findByIdAndUpdate(conversationId, { lastMessage: message._id });
                    console.log(`[DB] Conversation ${conversationId} lastMessage updated.`);

                    const messageToSend = {
                        _id: message._id,
                        conversationId: message.conversationId.toString(),
                        sender: { _id: socket.user.userId, firstName: socket.user.firstName, email: socket.user.email },
                        content: message.content,
                        createdAt: message.createdAt,
                    };

                    console.log(`[Socket Emit] Emitting 'receiveMessage' to room: ${conversationId}`);
                    io.to(conversationId).emit('receiveMessage', messageToSend);
                    console.log(`[Socket Emit] 'receiveMessage' emitted successfully.`);

                } catch (error) {
                    console.error("[Socket Event] Error handling 'sendMessage':", error);
                    socket.emit('messageError', { message: "Failed to save or send message." });
                }
            });

            socket.on('disconnect', (reason) => {
                console.log(`[Socket Disconnect] User disconnected: ${socket.user?.email} (ID: ${socket.id}). Reason: ${reason}`);
            });

            socket.on('error', (error) => {
                console.error(`[Socket Error] Socket ID ${socket.id}:`, error);
            });

        });

        res.socket.server.io = io; // Attach io instance to the server object
        console.log('* Socket.IO server attached to response.');
    } else {
        console.log('* Socket.IO server already running.');
    }
    res.end(); // Important to end the response for the initial HTTP request
};

export const config = {
    api: {
        bodyParser: false
    }
};

export default ioHandler;