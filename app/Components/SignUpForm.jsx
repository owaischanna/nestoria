"use client";

import { FcGoogle } from "react-icons/fc";
import { FaApple } from "react-icons/fa";
import { useState } from "react";
import RoleSelection from "./RoleSelection";

const SignUpForm = ({ switchToSignIn }) => {
  const [step, setStep] = useState("signup"); // signup → personal → role

  const handleSignUp = (e) => {
    e.preventDefault();
    setStep("personal");
  };

  const handlePersonalInfoContinue = () => {
    setStep("role");
  };

  const handleRoleSelect = (role) => {
    console.log(`Selected role: ${role}`);
    setStep("signup");
    // handle next steps after role selection
  };

  const handleCloseRoleSelection = () => {
    setStep("signup");
  };

  return (
    <>
      {step === "role" && (
        <RoleSelection
          onClose={handleCloseRoleSelection}
          onRoleSelect={handleRoleSelect}
        />
      )}

      {step === "personal" ? (
        <div className="space-y-4">
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

          {/* Country & State */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
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

          {/* Zip & Phone */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
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

          <button
            onClick={handlePersonalInfoContinue}
            className="w-full bg-green-600 text-white py-2 rounded-md text-sm hover:bg-green-700 transition mt-4"
          >
            Continue
          </button>
        </div>
      ) : step === "signup" ? (
        <div className="space-y-3">
          {/* Name */}
          <div>
            <label className="block text-sm mb-1">Full Name</label>
            <input
              type="text"
              placeholder="Enter your name"
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-1 focus:ring-green-500 outline-none"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm mb-1">Email</label>
            <input
              type="email"
              placeholder="Enter email"
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-1 focus:ring-green-500 outline-none"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm mb-1">Password</label>
            <input
              type="password"
              placeholder="Create password"
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-1 focus:ring-green-500 outline-none"
            />
          </div>

          {/* Sign Up */}
          <button
            onClick={handleSignUp}
            className="w-full bg-green-600 text-white py-2 rounded-md text-sm hover:bg-green-700 transition"
          >
            Sign Up
          </button>

          {/* OR Divider */}
          <div className="flex items-center my-3">
            <hr className="flex-grow border-gray-300" />
            <span className="px-2 text-gray-400 text-sm">or</span>
            <hr className="flex-grow border-gray-300" />
          </div>

          {/* Google & Apple */}
          <button className="w-full border rounded-md border-gray-300 py-2 mb-2 text-sm flex items-center justify-center gap-2 hover:bg-gray-50 transition">
            <FcGoogle className="w-5 h-5" /> Continue with Google
          </button>
          <button className="w-full border rounded-md border-gray-300 py-2 text-sm flex items-center justify-center gap-2 hover:bg-gray-50 transition">
            <FaApple className="w-5 h-5 text-gray-800" /> Continue with Apple
          </button>

          {/* Sign In Link */}
          <p className="text-xs text-center text-gray-500 mt-3">
            Already have an account?{" "}
            <button
              onClick={switchToSignIn}
              className="text-green-600 font-medium hover:underline"
            >
              Sign In
            </button>
          </p>

          {/* Terms */}
          <p className="text-xs text-gray-500 text-center mt-4 leading-5">
            By signing in, you agree to our{" "}
            <span className="text-green-600 cursor-pointer hover:underline">
              Terms and Conditions
            </span>
            .<br />
            Learn how we use your data in our{" "}
            <span className="text-green-600 cursor-pointer hover:underline">
              Privacy Policy
            </span>
            .
          </p>
        </div>
      ) : null}
    </>
  );
};

export default SignUpForm;
