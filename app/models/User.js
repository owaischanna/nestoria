import mongoose from 'mongoose';

const EmergencyContactSchema = new mongoose.Schema({
    name: { type: String, trim: true },
    phone: { type: String, trim: true },
    relationship: { type: String, trim: true }
});

const HostingPreferencesSchema = new mongoose.Schema({
    guestTypes: [{ type: String }],
    stayDuration: [{ type: String }],
    smokingPolicy: String,
    petPolicy: String,
    visitorPolicy: String,
    responseTime: String
});

const RenterBasicInfoSchema = new mongoose.Schema({
    dateOfBirth: { type: String },
    nationality: { type: String },
    profilePhoto: { type: String },
});

const RenterAboutSchema = new mongoose.Schema({
    bio: { type: String },
    isStudent: { type: Boolean, default: false }, // Changed default to false, will be set by form
    university: { type: String },
    program: { type: String },
    degreeLevel: { type: String },
    occupation: { type: String } // This field will be used
});

const RenterHousingSchema = new mongoose.Schema({
    budgetMin: { type: Number },
    budgetMax: { type: Number },
    preferredLocation: { type: String },
    roomType: { type: String, enum: ['private', 'shared', 'entire'] },
    bathroomPreference: { type: String, enum: ['private', 'shared'] },
    mustHaveFeatures: [{ type: String }]
});

const RenterDocumentSchema = new mongoose.Schema({
    docType: { type: String, required: true, enum: ['identity', 'financial', 'additional'] },
    fileName: { type: String, required: true },
    fileSize: { type: String },
    fileData: { type: String, required: true },
    uploadedAt: { type: Date, default: Date.now },
    isVerified: { type: Boolean, default: false }
});

const NotificationPreferencesSchema = new mongoose.Schema({
    applicationStatus: { email: { type: Boolean, default: true }, push: { type: Boolean, default: true } },
    newListingAlerts: { email: { type: Boolean, default: true }, push: { type: Boolean, default: false } },
    priceDropAlerts: { email: { type: Boolean, default: true }, sms: { type: Boolean, default: false } },
    bookingConfirmations: { email: { type: Boolean, default: true } },
}, { _id: false });

const PrivacySettingsSchema = new mongoose.Schema({
    profileVisibility: { type: String, enum: ['Public', 'Hosts Only', 'Private'], default: 'Public' },
    shareContactInfo: { type: Boolean, default: true },
    locationPrecision: { type: String, enum: ['Exact', 'Approximate'], default: 'Approximate' },
}, { _id: false });

const UserSchema = new mongoose.Schema({
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['renter', 'host'], required: true },
    country: String,
    // 'state' and 'zip' are removed from signup, but can stay in model
    state: String,
    zip: String,
    phone: String,
    isPhoneVerified: { type: Boolean, default: false },
    isEmailVerified: { type: Boolean, default: true },

    // --- NEW FIELDS ADDED ---
    gender: { type: String },
    currentLocation: { type: String },
    // ------------------------

    // Host Fields
    profileImage: { type: String },
    location: { type: String, trim: true },
    languages: [{ type: String }],
    about: { type: String, trim: true },
    interests: [{ type: String }],
    isVerified: { type: Boolean, default: false },
    achievements: [{ type: String }],
    emergencyContact: EmergencyContactSchema,
    hostingPreferences: HostingPreferencesSchema,

    // Renter Fields (Now populated at signup)
    renterBasic: RenterBasicInfoSchema,
    renterAbout: RenterAboutSchema,
    renterHousing: RenterHousingSchema,
    renterDocuments: [RenterDocumentSchema],
    wantsLoginAlerts: { type: Boolean, default: true },
    uiTheme: { type: String, enum: ['light', 'dark'], default: 'light' },
    notificationPreferences: { type: NotificationPreferencesSchema, default: () => ({}) },
    privacySettings: { type: PrivacySettingsSchema, default: () => ({}) },

}, { timestamps: true });

export default mongoose.models.User || mongoose.model('User', UserSchema);