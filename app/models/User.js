import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, 'Please provide a first name.'],
    },
    lastName: {
        type: String,
        required: [true, 'Please provide a last name.'],
    },
    email: {
        type: String,
        required: [true, 'Please provide an email.'],
        unique: true,
    },
    password: {
        type: String,
        required: [true, 'Please provide a password.'],
    },
    role: {
        type: String,
        enum: ['renter', 'host'],
        required: [true, 'Please select a role.'],
    },
    country: {
        type: String,
    },
    state: {
        type: String,
    },
    zip: {
        type: String,
    },
    phone: {
        type: String,
    },
});

export default mongoose.models.User || mongoose.model('User', UserSchema);