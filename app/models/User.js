import mongoose from 'mongoose';

// Defines the sub-schema for emergency contact
const EmergencyContactSchema = new mongoose.Schema({
    name: { type: String, trim: true },
    phone: { type: String, trim: true },
    relationship: { type: String, trim: true }
});

// Defines the sub-schema for hosting preferences
const HostingPreferencesSchema = new mongoose.Schema({
    guestTypes: [{ type: String }],
    stayDuration: [{ type: String }],
    smokingPolicy: String,
    petPolicy: String,
    visitorPolicy: String,
    responseTime: String
});

const UserSchema = new mongoose.Schema({
    // --- Core Auth Fields ---
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['renter', 'host'], required: true },

    // --- Basic Profile (from signup) ---
    country: String,
    state: String,
    zip: String,
    phone: String,
    isPhoneVerified: { type: Boolean, default: false },

    // --- NEW Host Profile Fields ---
    profileImage: { type: String }, // For profile picture URL
    location: { type: String, trim: true }, // e.g., "Cantabria, Spain"
    languages: [{ type: String }],
    about: { type: String, trim: true },
    interests: [{ type: String }],
    isVerified: { type: Boolean, default: false }, // For the "Verified Host" badge
    achievements: [{ type: String }], // e.g., "Superhost", "Quick Responder"

    // --- Embedded Schemas for Profile Data ---
    emergencyContact: EmergencyContactSchema,
    hostingPreferences: HostingPreferencesSchema,

}, { timestamps: true }); // timestamps adds createdAt (for "Host since")

export default mongoose.models.User || mongoose.model('User', UserSchema);