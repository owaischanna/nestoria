import mongoose from 'mongoose';

const ListingSchema = new mongoose.Schema({
    // Link to the 'host' who created this listing
    hostId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },

    // Step 1: Basic Info
    propertyType: { type: String, required: true },
    listingTitle: { type: String, required: true },
    description: { type: String, required: true },
    address: { type: String, required: true },
    roomSize: { type: Number },
    maxOccupancy: { type: String },
    bathroomType: { type: String },
    furnishingStatus: { type: String },

    // Step 2: Photos (storing Base64 Data URLs as strings)
    photos: {
        cover: { type: String, required: true }, // This is the Base64 string
        room: [{ type: String }],
        common: [{ type: String }],
    },

    // Step 3: Pricing & Availability
    monthlyRent: { type: Number, required: true },
    utilities: [{ type: String }],
    securityDeposit: { type: Number },
    cleaningFee: { type: Number },
    houseRules: { type: String },
    minDuration: { type: String },
    maxDuration: { type: String },
    monthToMonth: { type: Boolean },
    moveInDate: { type: Date },

}, { timestamps: true });

export default mongoose.models.Listing || mongoose.model('Listing', ListingSchema);