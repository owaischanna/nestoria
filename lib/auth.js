import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';

/**
 * Verifies the 'authToken' cookie and returns the decoded user payload.
 * @returns {object | null} The decoded JWT payload (e.g., { userId, role }) or null if invalid.
 */
export async function verifyToken() {
    try {
        const cookieStore = cookies(); // No await needed here
        const token = cookieStore.get('authToken')?.value;

        if (!token) {
            console.log('❌ No authToken cookie found');
            return null;
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // console.log('✅ Token verified, userId:', decoded.userId, 'role:', decoded.role);
        return decoded;
    } catch (error) {
        console.error('❌ Token verification error:', error.message);
        return null;
    }
}