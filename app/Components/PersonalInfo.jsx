"use client";

import { X } from "lucide-react";

const PersonalInformationForm = ({ onContinue, onClose }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Personal Information submitted");
    if (onContinue) onContinue();
  };

  return (
    <div className="p-4 sm:p-6 bg-white rounded-lg shadow-xl max-w-lg w-full mx-auto">
      {/* Header Close Button Only */}
      <div className="flex justify-end mb-4 sm:mb-6">
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-gray-600 transition"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <form className="space-y-4" onSubmit={handleSubmit}>
        {/* First Name */}
        <div>
          <label className="block text-sm mb-1">First Name</label>
          <input
            type="text"
            placeholder="First Name"
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-1 focus:ring-green-500 outline-none"
          />
        </div>

        {/* Last Name */}
        <div>
          <label className="block text-sm mb-1">Last Name</label>
          <input
            type="text"
            placeholder="Last Name"
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-1 focus:ring-green-500 outline-none"
          />
        </div>

        {/* Country and State/Province */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm mb-1">Country</label>
            <input
              type="text"
              placeholder="Country"
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-1 focus:ring-green-500 outline-none"
            />
          </div>
          <div>
            <label className="block text-sm mb-1">State/Province</label>
            <input
              type="text"
              placeholder="State/Province"
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-1 focus:ring-green-500 outline-none"
            />
          </div>
        </div>

        {/* Zip/Postal and Phone Number */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm mb-1">Zip/Postal</label>
            <input
              type="text"
              placeholder="Zip/Postal"
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-1 focus:ring-green-500 outline-none"
            />
          </div>
          <div>
            <label className="block text-sm mb-1">Phone Number</label>
            <input
              type="tel"
              placeholder="Phone Number"
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-1 focus:ring-green-500 outline-none"
            />
          </div>
        </div>

        {/* Continue Button */}
        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded-md text-sm hover:bg-green-700 transition mt-4"
        >
          Continue
        </button>
      </form>
    </div>
  );
};

export default PersonalInformationForm;
