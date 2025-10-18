// ApplicationFormStep1.jsx
import React from 'react';
import { ChevronRight } from 'lucide-react';

const ApplicationFormStep1 = ({ onContinue }) => {
    return (
        <div className="p-8 bg-white rounded-lg shadow-md">
            <h2 className="text-xl font-bold text-gray-800 mb-6">Application Form</h2>
            <p className="text-gray-600 mb-6">Please fill out all required information to complete your application</p>
            
            {/* Form Steps Indicator */}
            <div className="flex items-center space-x-2 mb-8">
                <span className="text-sm font-semibold text-green-700">Step 1 of 3: Personal Information</span>
                {/* Visual progress bar can go here */}
                <div className="flex-1 h-1 bg-green-200 rounded">
                    <div className="w-1/3 h-full bg-green-600 rounded"></div>
                </div>
            </div>

            {/* Personal Information Section */}
            <section className="mb-8">
                <div className="flex justify-between items-center pb-2 border-b border-gray-100 mb-4">
                    <h3 className="text-lg font-semibold text-gray-800">Personal Information</h3>
                    <span className="text-sm font-bold text-red-600">REQUIRED</span>
                </div>
                
                <div className="grid grid-cols-2 gap-6">
                    <InputGroup label="Full Name *" value="Anna Chen" />
                    <InputGroup label="Email Address *" value="anna.chen@nyu.edu" type="email" />
                    <InputGroup label="Phone Number *" value="+1 (555) 123-4567" />
                    <InputGroup label="Date of Birth *" value="March 15, 1999" type="date" />
                    <div className="col-span-2">
                        <InputGroup label="Current Address *" value="789 University Place, Apt 4C, New York, NY 10003" multiline />
                    </div>
                </div>
            </section>

            {/* Occupation & Status Section */}
            <section className="mb-8">
                <div className="flex justify-between items-center pb-2 border-b border-gray-100 mb-4">
                    <h3 className="text-lg font-semibold text-gray-800">Occupation & Status</h3>
                    <span className="text-sm font-bold text-green-600">IMPORTANT</span>
                </div>
                
                <div className="grid grid-cols-2 gap-6 mb-4">
                    <ButtonGroup label="Employment Status *" selected="Student" options={["Student", "Employed", "Self-Employed"]} />
                    <InputGroup label="University/Institution *" value="New York University (NYU)" />
                    <InputGroup label="Program of Study *" value="Computer Science - Master's Degree" />
                    <InputGroup label="Expected Graduation" value="May 2025" />
                </div>
                
                <InputGroup label="Monthly Income/Support" value="$2,500 (Family support + Part-time work)" />
            </section>

            {/* Action Buttons are handled by the Container */}
        </div>
    );
};

// Reusable Sub-Component for input field
const InputGroup = ({ label, value, type = "text", multiline = false }) => (
    <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
        {multiline ? (
            <textarea
                value={value}
                rows="3"
                className="w-full border border-gray-300 rounded-lg p-3 text-gray-900 focus:ring-amber-500 focus:border-amber-500"
                readOnly
            />
        ) : (
            <input
                type={type}
                value={value}
                className="w-full border border-gray-300 rounded-lg p-3 text-gray-900 focus:ring-amber-500 focus:border-amber-500"
                readOnly
            />
        )}
    </div>
);

// Reusable Sub-Component for button group
const ButtonGroup = ({ label, selected, options }) => (
    <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
        <div className="flex space-x-2">
            {options.map(option => (
                <button
                    key={option}
                    className={`px-4 py-2 text-sm rounded-lg border transition ${
                        option === selected
                            ? 'bg-amber-600 text-white border-amber-600 shadow-md'
                            : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                    }`}
                >
                    {option}
                </button>
            ))}
        </div>
    </div>
);

export default ApplicationFormStep1;