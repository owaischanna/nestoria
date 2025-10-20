"use client";

import { createContext, useState, useContext, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import toast from 'react-hot-toast';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        // On initial load, check for a token in the cookies
        const token = Cookies.get('authToken');
        if (token) {
            // Here you would typically verify the token with a backend endpoint.
            // For simplicity, we'll decode it on the client.
            // In a real-world app, you should have an endpoint like /api/auth/me
            // to get the user data from a valid token.
            try {
                // A simple (and insecure) way to decode the token payload
                const decodedUser = JSON.parse(atob(token.split('.')[1]));
                setUser(decodedUser);
            } catch (error) {
                console.error("Invalid token:", error);
                Cookies.remove('authToken');
            }
        }
        setLoading(false);
    }, []);

    const login = async (email, password) => {
        const loadingToastId = toast.loading('Signing in...');
        try {
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Login failed.');
            }

            // Set the cookie to expire in 7 days
            Cookies.set('authToken', data.token, { expires: 7 });

            // Decode and set user state
            const decodedUser = JSON.parse(atob(data.token.split('.')[1]));
            setUser(decodedUser);

            toast.success('Login successful!', { id: loadingToastId });

            // Redirect based on role
            if (decodedUser.role === 'renter') {
                router.push('/renterdashboard');
            } else if (decodedUser.role === 'host') {
                router.push('/hostdashboard'); // Or wherever hosts go
            } else {
                router.push('/');
            }

        } catch (error) {
            console.error(error);
            toast.error(error.message, { id: loadingToastId });
        }
    };

    const logout = () => {
        Cookies.remove('authToken');
        setUser(null);
        toast.success('Logged out successfully.');
        router.push('/'); // Redirect to home/login page
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

// Custom hook to use the AuthContext
export const useAuth = () => {
    return useContext(AuthContext);
};