// ApplicationSubmitted.jsx
import React from 'react';
import { CheckCircle } from 'lucide-react';

const ApplicationSubmitted = ({ onBackToApplications }) => {
    return (
        <div className="p-16 flex flex-col items-center justify-center bg-white rounded-lg shadow-md min-h-[400px]">
            <CheckCircle className="w-24 h-24 text-green-500 mb-6" fill="rgb(34, 197, 94)" />
            <h2 className="text-3xl font-bold text-gray-800 mb-3">Successful !</h2>
            <p className="text-gray-600 mb-8 text-center">
                You'll be notified once your application gets accepted.
            </p>
            <button 
                onClick={onBackToApplications}
                className="px-6 py-3 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition shadow-md"
            >
                View My Applications
            </button>
        </div>
    );
};

export default ApplicationSubmitted;