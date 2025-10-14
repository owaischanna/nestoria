"use client";

import { X } from "lucide-react";

const PersonalInformationForm = ({ onContinue, onClose }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Personal Information submitted");
    if (onContinue) onContinue();
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-xl max-w-lg mx-auto">
      {/* Header and Close Button */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-800">Personal Information</h2>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-gray-600 transition"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <p className="text-sm text-gray-600 mb-6">Fill in your information</p>

      <form className="space-y-4" onSubmit={handleSubmit}>
        {/* First Name and Last Name in one line - Single input field */}
        <div>
          <label className="block text-sm mb-1">First Name</label>
          <input
            type="text"
            placeholder="First Name"
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-1 focus:ring-green-500 outline-none"
          />
        </div>

        {/* Last Name in separate line */}
        <div>
          <label className="block text-sm mb-1">Last Name</label>
          <input
            type="text"
            placeholder="Last Name"
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-1 focus:ring-green-500 outline-none"
          />
        </div>

        {/* Country and State/Province in one line */}
        <div className="grid grid-cols-2 gap-4">
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

        {/* Zip/Postal and Phone Number in one line */}
        <div className="grid grid-cols-2 gap-4">
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