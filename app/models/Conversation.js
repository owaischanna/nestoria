import mongoose from 'mongoose';

const ConversationSchema = new mongoose.Schema({
    participants: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    }],
    lastMessage: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Message',
    },
}, { timestamps: true });

// Ensure unique conversations between the same two participants
ConversationSchema.index({ participants: 1 }, { unique: true });

export default mongoose.models.Conversation || mongoose.model('Conversation', ConversationSchema);