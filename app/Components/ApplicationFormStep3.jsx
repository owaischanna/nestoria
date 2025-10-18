// ApplicationFormStep3.jsx
import React from 'react';
import { Edit } from 'lucide-react';

const ApplicationFormStep3 = ({ onFinalSubmit, onBack }) => {
    return (
        <div className="p-8 bg-white rounded-lg shadow-md">
            <h2 className="text-xl font-bold text-gray-800 mb-6">Review & Submit Application</h2>
            <p className="text-gray-600 mb-6">Step 3 of 3: Please review all information before submitting your application</p>

            {/* Form Steps Indicator */}
            <div className="flex items-center space-x-2 mb-8">
                <span className="text-sm font-semibold text-green-700">Step 3 of 3: Review & Submit</span>
                {/* Visual progress bar can go here */}
                <div className="flex-1 h-1 bg-green-200 rounded">
                    <div className="w-full h-full bg-green-600 rounded"></div>
                </div>
            </div>

            {/* Review Sections */}
            <ReviewSection title="Personal Information">
                <ReviewItem label="Full Name" value="Anna Chen" />
                <ReviewItem label="Email Address" value="anna.chen@nyu.edu" />
                <ReviewItem label="Phone Number" value="+1 (555) 123-4567" />
                <ReviewItem label="Date of Birth" value="March 15, 1999" />
                <ReviewItem label="Current Address" value="789 University Place, Apt 4C, New York, NY 10003" fullWidth />
            </ReviewSection>

            <ReviewSection title="Occupation & Status">
                <ReviewItem label="Employment Status" value="Student" />
                <ReviewItem label="University/Institution" value="New York University (NYU)" />
                <ReviewItem label="Program of Study" value="Computer Science - Master's Degree" />
                <ReviewItem label="Expected Graduation" value="May 2025" />
                <ReviewItem label="Monthly Income/Support" value="$2,500 (Family support + Part-time work)" fullWidth />
            </ReviewSection>

            <ReviewSection title="Lease Preferences">
                <ReviewItem label="Preferred Move-in Date" value="September 1, 2024" />
                <ReviewItem label="Preferred Lease Length" value="6 Months" />
                <ReviewItem label="Desired Room Type" value="Private Room" />
                <ReviewItem label="Preferred Amenities" value="WiFi, In-unit Laundry" />
            </ReviewSection>

            <ReviewSection title="Required Documents">
                <ReviewItem label="Identity Documents" value="Passport.pdf (Uploaded)" isLink />
                <ReviewItem label="Financial Verification" value="Bank_Statement_2024.pdf (Uploaded)" isLink />
                <ReviewItem label="Academic Proof" value="NYU_Acceptance_Letter.pdf (Uploaded)" isLink />
            </ReviewSection>
        </div>
    );
};

// Reusable Sub-Component for a section to review
const ReviewSection = ({ title, children }) => (
    <section className="mb-8 border border-gray-200 rounded-lg p-6 bg-white">
        <div className="flex justify-between items-center pb-2 border-b border-gray-100 mb-4">
            <h3 className="text-lg font-bold text-gray-800">{title}</h3>
            <button className="text-gray-500 hover:text-amber-600 p-1 rounded transition">
                <Edit className="w-5 h-5" />
            </button>
        </div>
        <div className="grid grid-cols-2 gap-y-4 gap-x-6">
            {children}
        </div>
    </section>
);

// Reusable Sub-Component for a single review item
const ReviewItem = ({ label, value, fullWidth = false, isLink = false }) => (
    <div className={`${fullWidth ? 'col-span-2' : 'col-span-1'}`}>
        <p className="text-sm font-medium text-gray-500">{label}</p>
        <p className={`text-base font-semibold mt-1 ${isLink ? 'text-blue-600 hover:underline cursor-pointer' : 'text-gray-800'}`}>{value}</p>
    </div>
);

export default ApplicationFormStep3;