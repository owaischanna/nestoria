"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { FaSearch, FaHome, FaCheck } from "react-icons/fa";

const RoleSelection = ({ onClose }) => {
  const [selectedRole, setSelectedRole] = useState(null);
  const router = useRouter();

  const handleRoleSelect = (role) => {
    setSelectedRole(role);
  };

  const handleContinue = () => {
    if (selectedRole === "renter") {
      // ✅ Navigate to renter dashboard page
      router.push("/renterdashboard");
    } else if (selectedRole === "host") {
      router.push("/hostdashboard");
    }
  };

  return (
    <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-xl max-w-4xl w-full mx-auto">
        {/* Header */}
        <div className="p-8 border-b border-gray-200">
          <h1 className="text-2xl font-bold text-gray-900 text-center mb-2">
            How would you like to use Nestoria?
          </h1>
          <p className="text-gray-600 text-center">
            Choose your role to get started with the right features
          </p>
        </div>

        <div className="p-8">
          <h2 className="text-lg font-semibold text-gray-800 mb-6 text-center">
            I am a...
          </h2>

          {/* Cards */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Renter Card */}
            <div
              className={`border-2 rounded-xl p-6 transition-all cursor-pointer ${
                selectedRole === "renter"
                  ? "border-orange-500 bg-orange-50"
                  : "border-gray-200 hover:border-orange-300"
              }`}
              onClick={() => handleRoleSelect("renter")}
            >
              <div className="flex justify-center mb-4">
                <div className="bg-blue-100 p-4 rounded-full">
                  <FaSearch className="text-blue-600 text-2xl" />
                </div>
              </div>

              <div className="text-center mb-4">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Renter</h3>
                <p className="text-gray-600 text-sm">
                  I'm looking for accommodation
                </p>
              </div>

              {/* Features */}
              <div className="space-y-3 mb-4">
                {[
                  "Search available rooms and apartments",
                  "Apply to multiple listings",
                  "Track application status",
                  "Message hosts directly",
                  "Save favorite listings",
                ].map((text, idx) => (
                  <div className="flex items-center" key={idx}>
                    <FaCheck className="text-green-500 mr-2 text-sm" />
                    <span className="text-gray-700 text-sm">{text}</span>
                  </div>
                ))}
              </div>

              {/* Perfect For */}
              <div className="mb-4">
                <h4 className="font-semibold text-gray-700 text-sm mb-3">
                  Perfect for:
                </h4>
                <div className="flex flex-wrap gap-2">
                  {["Students", "Professionals", "International"].map(
                    (tag, i) => (
                      <span
                        key={i}
                        className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-medium"
                      >
                        {tag}
                      </span>
                    )
                  )}
                </div>
              </div>

              <button
                onClick={handleContinue}
                className={`w-full py-3 rounded-lg font-semibold text-sm transition ${
                  selectedRole === "renter"
                    ? "bg-orange-500 text-white hover:bg-orange-600"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                Continue as Renter
              </button>
            </div>

            {/* Host Card */}
            <div
              className={`border-2 rounded-xl p-6 transition-all cursor-pointer ${
                selectedRole === "host"
                  ? "border-green-500 bg-green-50"
                  : "border-gray-200 hover:border-green-300"
              }`}
              onClick={() => handleRoleSelect("host")}
            >
              <div className="flex justify-center mb-4">
                <div className="bg-green-100 p-4 rounded-full">
                  <FaHome className="text-green-600 text-2xl" />
                </div>
              </div>

              <div className="text-center mb-4">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Host</h3>
                <p className="text-gray-600 text-sm">
                  I have rooms or properties to rent
                </p>
              </div>

              {/* Features */}
              <div className="space-y-3 mb-4">
                {[
                  "List your available rooms",
                  "Manage tenant applications",
                  "Track bookings and payments",
                  "Screen potential tenants",
                  "Manage multiple properties",
                ].map((text, idx) => (
                  <div className="flex items-center" key={idx}>
                    <FaCheck className="text-green-500 mr-2 text-sm" />
                    <span className="text-gray-700 text-sm">{text}</span>
                  </div>
                ))}
              </div>

              {/* Perfect For */}
              <div className="mb-4">
                <h4 className="font-semibold text-gray-700 text-sm mb-3">
                  Perfect for:
                </h4>
                <div className="flex flex-wrap gap-2">
                  {["Homeowners", "Landlords", "Property Mgrs"].map(
                    (tag, i) => (
                      <span
                        key={i}
                        className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-medium"
                      >
                        {tag}
                      </span>
                    )
                  )}
                </div>
              </div>

              <button
                onClick={handleContinue}
                className={`w-full py-3 rounded-lg font-semibold text-sm transition ${
                  selectedRole === "host"
                    ? "bg-green-600 text-white hover:bg-green-700"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                Continue as Host
              </button>
            </div>
          </div>

          {/* Back Button */}
          <div className="flex justify-start items-center mt-8">
            <button
              onClick={onClose}
              className="text-gray-600 hover:text-gray-800 font-medium"
            >
              Back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoleSelection;
