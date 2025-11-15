import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Favorite from '@/app/models/Favorite';
import Application from '@/app/models/Application';
import User from '@/app/models/User';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';

async function verifyToken() {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get('authToken')?.value;

        if (!token) {
            console.log('❌ No authToken cookie found');
            return null;
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log('✅ Token verified, userId:', decoded.userId, 'role:', decoded.role);
        return decoded;
    } catch (error) {
        console.error('❌ Token verification error:', error.message);
        return null;
    }
}

function calculateProfileCompletion(user) {
    const fields = {
        basic: [
            'firstName',
            'lastName',
            'email',
            'phone',
            'country',
            'state',
            'zip'
        ],
        renterBasic: [
            'renterBasic.dateOfBirth',
            'renterBasic.nationality',
            'renterBasic.profilePhoto'
        ],
        renterAbout: [
            'renterAbout.bio',
            'renterAbout.isStudent',
            'renterAbout.occupation'
        ],
        renterHousing: [
            'renterHousing.budgetMin',
            'renterHousing.budgetMax',
            'renterHousing.preferredLocation',
            'renterHousing.roomType',
            'renterHousing.bathroomPreference'
        ]
    };

    let totalFields = 0;
    let completedFields = 0;
    const missingFields = [];

    const getValue = (obj, path) => {
        return path.split('.').reduce((current, prop) => current?.[prop], obj);
    };

    for (const [category, fieldList] of Object.entries(fields)) {
        for (const field of fieldList) {
            totalFields++;
            const value = getValue(user, field);

            if (value !== null && value !== undefined && value !== '') {
                completedFields++;
            } else {
                missingFields.push(field);
            }
        }
    }

    const percentage = Math.round((completedFields / totalFields) * 100);

    return {
        percentage,
        completedFields,
        totalFields,
        missingFields,
        isComplete: percentage === 100
    };
}

export async function GET(req) {
    console.log('\n📊 Dashboard Stats API called');
    await dbConnect();

    try {
        const decoded = await verifyToken();

        if (!decoded) {
            console.log('❌ Authentication failed');
            return NextResponse.json(
                { message: 'Unauthorized. Please login.' },
                { status: 401 }
            );
        }

        const userId = decoded.userId;
        console.log('📋 Fetching dashboard stats for user:', userId);

        console.log('👤 Fetching user profile...');
        const user = await User.findById(userId).lean();

        if (!user) {
            console.log('❌ User not found');
            return NextResponse.json(
                { message: 'User not found.' },
                { status: 404 }
            );
        }

        console.log('✅ User profile fetched');

        console.log('📊 Calculating profile completion...');
        const profileCompletion = calculateProfileCompletion(user);
        console.log('✅ Profile completion:', profileCompletion.percentage + '%');

        console.log('❤️ Counting favorites...');
        const favoritesCount = await Favorite.countDocuments({ userId });
        console.log('✅ Favorites count:', favoritesCount);

        const oneWeekAgo = new Date();
        oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

        const newFavoritesThisWeek = await Favorite.countDocuments({
            userId,
            createdAt: { $gte: oneWeekAgo }
        });
        console.log('✅ New favorites this week:', newFavoritesThisWeek);

        console.log('📝 Counting applications...');
        const totalApplications = await Application.countDocuments({
            applicantId: userId
        });
        console.log('✅ Total applications:', totalApplications);

        const pendingApplications = await Application.countDocuments({
            applicantId: userId,
            status: 'Pending'
        });
        console.log('✅ Pending applications:', pendingApplications);

        const approvedApplications = await Application.countDocuments({
            applicantId: userId,
            status: 'Approved'
        });

        const rejectedApplications = await Application.countDocuments({
            applicantId: userId,
            status: 'Rejected'
        });

        console.log('💰 Finding budget range...');
        let budgetRange = 'Not Available';
        let budgetMin = null;
        let budgetMax = null;

        if (user.renterHousing?.budgetMin && user.renterHousing?.budgetMax) {
            budgetMin = user.renterHousing.budgetMin;
            budgetMax = user.renterHousing.budgetMax;
            budgetRange = `€${budgetMin}-${budgetMax}`;
            console.log('✅ Budget from profile:', budgetRange);
        } else {
            const latestApplication = await Application.findOne({
                applicantId: userId,
                monthlyIncome: { $exists: true, $ne: null }
            }).sort({ createdAt: -1 }).lean();

            if (latestApplication?.monthlyIncome) {
                const income = parseFloat(latestApplication.monthlyIncome);
                if (!isNaN(income)) {
                    budgetMin = Math.round(income * 0.3);
                    budgetMax = Math.round(income * 0.4);
                    budgetRange = `€${budgetMin}-${budgetMax}`;
                    console.log('✅ Budget calculated from latest application:', budgetRange);
                }
            } else {
                console.log('⚠️ No budget information available');
            }
        }

        console.log('📅 Finding preferred move-in date...');
        let preferredMoveIn = 'Not Set';
        let moveInDate = null;

        if (user.renterHousing?.preferredMoveInDate) {
            moveInDate = new Date(user.renterHousing.preferredMoveInDate);
            preferredMoveIn = moveInDate.toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric'
            });
            console.log('✅ Move-in date from profile:', preferredMoveIn);
        } else {
            const latestApplication = await Application.findOne({
                applicantId: userId,
                preferredMoveIn: { $exists: true, $ne: null }
            }).sort({ createdAt: -1 }).lean();

            if (latestApplication?.preferredMoveIn) {
                moveInDate = new Date(latestApplication.preferredMoveIn);
                preferredMoveIn = moveInDate.toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric'
                });
                console.log('✅ Move-in date from latest application:', preferredMoveIn);
            } else {
                console.log('⚠️ No move-in date available');
            }
        }

        const stats = {
            success: true,
            profile: {
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                completion: profileCompletion
            },
            applications: {
                total: totalApplications,
                pending: pendingApplications,
                approved: approvedApplications,
                rejected: rejectedApplications,
                activeCount: totalApplications,
                pendingResponses: pendingApplications
            },
            favorites: {
                total: favoritesCount,
                newThisWeek: newFavoritesThisWeek
            },
            budget: {
                range: budgetRange,
                min: budgetMin,
                max: budgetMax,
                currency: '€'
            },
            moveIn: {
                date: preferredMoveIn,
                rawDate: moveInDate,
                isSet: moveInDate !== null
            },
            summary: {
                profileComplete: profileCompletion.isComplete,
                hasApplications: totalApplications > 0,
                hasFavorites: favoritesCount > 0,
                hasBudget: budgetMin !== null && budgetMax !== null,
                hasMoveInDate: moveInDate !== null
            }
        };

        console.log('✅ Dashboard stats compiled successfully');
        console.log('📊 Summary:', {
            profileCompletion: profileCompletion.percentage + '%',
            applications: totalApplications,
            favorites: favoritesCount,
            budget: budgetRange,
            moveIn: preferredMoveIn
        });

        return NextResponse.json(stats, { status: 200 });

    } catch (error) {
        console.error('💥 Error in Dashboard Stats API:', error);
        return NextResponse.json(
            {
                success: false,
                message: 'An error occurred while fetching dashboard stats.',
                error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
            },
            { status: 500 }
        );
    }
}