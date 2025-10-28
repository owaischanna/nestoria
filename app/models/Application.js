import mongoose from 'mongoose';

const DocumentSchema = new mongoose.Schema({
    type: { type: String, required: true },
    name: { type: String, required: true },
    data: { type: String, required: true },
    uploadedAt: { type: Date, default: Date.now }
});

// New Schemas for Check-in Checklists
const ChecklistItemSchema = new mongoose.Schema({
    id: { type: Number, required: true },
    label: { type: String, required: true },
    completed: { type: Boolean, default: false }
});

const CheckInSchema = new mongoose.Schema({
    currentStep: { type: Number, default: 1 },
    welcomeIdentity: {
        status: { type: String, default: 'pending' },
        // Add any fields for this step if needed
    },
    propertyTour: [ChecklistItemSchema],
    documentation: [ChecklistItemSchema],
    keysAccess: [ChecklistItemSchema],
    finalChecklist: [ChecklistItemSchema]
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
        enum: ['Pending', 'Approved', 'Rejected', 'Withdrawn', 'Completed'], // Added Completed
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
    uploadedDocuments: [DocumentSchema],

    // New Field for Check-in Progress
    checkIn: {
        type: CheckInSchema,
        default: () => ({}) // Creates a default empty CheckIn object
    }

}, { timestamps: true });

export default mongoose.models.Application || mongoose.model('Application', ApplicationSchema);