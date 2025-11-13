import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import User from '@/app/models/User';
import bcrypt from 'bcryptjs';
import sgMail from '@sendgrid/mail'; // 1. Import SendGrid Mail service

/**
 * Sends a welcome email using the SendGrid API.
 * @param {object} user - The user object created in the database.
 */
async function sendWelcomeEmail(user) {
    // Check if the API key is available
    if (!process.env.SENDGRID_API_KEY) {
        console.warn('SENDGRID_API_KEY environment variable is not set. Skipping email.');
        return;
    }

    // 2. Configure SendGrid
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);

    // 3. Create the email message object
    const msg = {
        to: {
            email: user.email,
            name: `${user.firstName} ${user.lastName}`
        },
        // 4. Set sender (MUST be a verified email/domain in your SendGrid account)
        from: {
            email: 'hello@habisolo.com',
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

    // 5. Send the email, wrapped in a try...catch
    try {
        await sgMail.send(msg);
        console.log('SendGrid welcome email sent successfully to:', user.email);
    } catch (error) {
        // Log the error, but don't stop the API route from succeeding
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
            state,
            zip,
            phone
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
            state,
            zip,
            phone
        });

        // 6. Call the new send welcome email function
        // We await this, but the function's internal try/catch prevents
        // it from blocking the success response if the email fails.
        await sendWelcomeEmail(user);

        // 7. Return success response
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