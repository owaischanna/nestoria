import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import User from '@/app/models/User';
import bcrypt from 'bcryptjs';
import sgMail from '@sendgrid/mail';

/**
 * Sends a welcome email using the SendGrid API.
 * @param {object} user - The user object created in the database.
 */
async function sendWelcomeEmail(user) {
    if (!process.env.SENDGRID_API_KEY) {
        console.warn('SENDGRID_API_KEY environment variable is not set. Skipping email.');
        return;
    }
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);

    const msg = {
        to: {
            email: user.email,
            name: `${user.firstName} ${user.lastName}`
        },
        from: {
            email: 'hello@habisolo.com', // MUST be a verified sender
            name: 'The Nestoria Team'
        },
        subject: 'Welcome to Nestoria!',
        html: `
    <html>
      <body>
        <h1>Hi ${user.firstName},</h1>
        <p>Welcome to Nestoria! We're thrilled to have you join our community.</p>
        <p>Best regards,<br>The Nestoria Team</p>
      </body>
    </html>
    `,
    };

    try {
        await sgMail.send(msg);
        console.log('SendGrid welcome email sent successfully to:', user.email);
    } catch (error) {
        console.error('Error sending SendGrid welcome email:', error.response?.body || error.message);
        if (error.response) {
            console.error(error.response.body.errors);
        }
    }
}

export async function POST(req) {
    await dbConnect();

    try {
        const {
            firstName,
            lastName,
            email,
            password,
            role,
            country,
            phone,
            // --- UPDATED FIELDS ---
            gender,
            currentLocation,
            renterBasic,
            renterAbout
            // 'state' and 'zip' are no longer sent from this form
        } = await req.json();

        // Check for required fields
        if (!firstName || !lastName || !email || !password || !role) {
            return NextResponse.json(
                { message: 'Missing required fields: firstName, lastName, email, password, and role are required.' },
                { status: 400 }
            );
        }

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return NextResponse.json(
                { message: 'User with this email already exists.' },
                { status: 400 }
            );
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            role,
            country,
            phone,
            // --- ADDED NEW FIELDS TO CREATE ---
            gender,
            currentLocation,
            renterBasic,
            renterAbout
        });

        // Send welcome email (no changes needed here)
        await sendWelcomeEmail(user);

        return NextResponse.json(
            { message: 'User created successfully.', userId: user._id },
            { status: 201 }
        );
    } catch (error) {
        return NextResponse.json(
            { message: 'An error occurred during user creation.', error: error.message },
            { status: 500 }
        );
    }
}