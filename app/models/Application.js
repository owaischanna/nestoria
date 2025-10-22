import mongoose from 'mongoose';

const DocumentSchema = new mongoose.Schema({
    type: { type: String, required: true }, // e.g., 'identity', 'financial', 'additional'
    name: { type: String, required: true },
    data: { type: String, required: true }, // Base64 Data URL string
    uploadedAt: { type: Date, default: Date.now }
});

const ApplicationSchema = new mongoose.Schema({
    applicantId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    listingId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Listing',
        required: true,
    },
    hostId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    status: {
        type: String,
        enum: ['Pending', 'Approved', 'Rejected', 'Withdrawn'],
        default: 'Pending',
    },

    // Step 1 Data
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String },
    dob: { type: Date },
    currentAddress: { type: String },
    employmentStatus: { type: String },
    university: { type: String },
    programOfStudy: { type: String },
    expectedGraduation: { type: String },
    monthlyIncome: { type: String },
    preferredMoveIn: { type: Date },
    leaseLength: { type: String },
    additionalInfo: { type: String },

    // Step 2 Data
    uploadedDocuments: [DocumentSchema], // Array of embedded documents

}, { timestamps: true });

export default mongoose.models.Application || mongoose.model('Application', ApplicationSchema);