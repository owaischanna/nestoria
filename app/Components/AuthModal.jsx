"use client";

import { useState } from "react";
import { X } from "lucide-react";
import SignInForm from "./LoginForm";
import SignUpForm from "./SignUpForm";

const AuthModal = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState("signin");

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black/50 z-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-xl w-[480px] max-w-[95%] p-8 relative shadow-xl" // Increased width and padding
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition" // Adjusted position
        >
          <X size={24} /> {/* Increased icon size */}
        </button>

        {/* Title */}
        <h2 className="text-center text-xl font-semibold mb-6"> {/* Increased text size and margin */}
          Welcome to <span className="text-600">Nestoria</span>
        </h2>

        {/* Tabs */}
        <div className="flex border-b border-gray-200 mb-6"> {/* Increased margin */}
          <button
            onClick={() => setActiveTab("signin")}
            className={`mr-8 pb-3 text-base font-medium ${ // Increased margin, padding and text size
              activeTab === "signin"
                ? "text-green-600 border-b-2 border-green-600"
                : "text-gray-500 hover:text-green-600"
            }`}
          >
            Sign In
          </button>
          <button
            onClick={() => setActiveTab("signup")}
            className={`pb-3 text-base font-medium ${ // Increased padding and text size
              activeTab === "signup"
                ? "text-green-600 border-b-2 border-green-600"
                : "text-gray-500 hover:text-green-600"
            }`}
          >
            New Account
          </button>
        </div>

        {/* Dynamic Form */}
        {activeTab === "signin" ? (
          <SignInForm switchToSignUp={() => setActiveTab("signup")} />
        ) : (
          <SignUpForm switchToSignIn={() => setActiveTab("signin")} />
        )}
      </div>
    </div>
  );
};

export default AuthModal;