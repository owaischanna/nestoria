"use client";

import { FcGoogle } from "react-icons/fc";
import { FaApple } from "react-icons/fa";
import { useState } from "react";
import RoleSelection from "./RoleSelection";
import toast from 'react-hot-toast';

const SignUpForm = ({ switchToSignIn }) => {
  const [step, setStep] = useState("signup");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    country: "",
    stateProvince: "",
    zipPostal: "",
    phoneNumber: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSignUp = (e) => {
    e.preventDefault();
    // **VALIDATION ADDED:** Check if email and password are provided.
    if (!formData.email || !formData.password) {
      toast.error("Please fill in both email and password.");
      return;
    }
    setStep("personal");
  };

  const handlePersonalInfoContinue = () => {
    // **VALIDATION ADDED:** Check if the main personal info fields are provided.
    if (!formData.firstName || !formData.lastName || !formData.country || !formData.phoneNumber) {
      toast.error("Please fill in all required personal information.");
      return;
    }
    setStep("role");
  };

  const handleRoleSelectAndSubmit = async (role) => {
    setLoading(true);
    setError(null);
    const finalData = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      password: formData.password,
      role: role,
      country: formData.country,
      state: formData.stateProvince,
      zip: formData.zipPostal,
      phone: formData.phoneNumber,
    };
    const loadingToastId = toast.loading('Creating your account...');

    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(finalData),
      });
      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.message || "An error occurred during signup.");
      }

      toast.success('Account created! Please sign in.', { id: loadingToastId });
      switchToSignIn();
      setLoading(false);
      return true;
    } catch (err) {
      console.error("Signup failed:", err);
      setError(err.message);
      toast.error(err.message, { id: loadingToastId });
      setLoading(false);
      return false;
    }
  };

  const handleCloseRoleSelection = () => {
    setStep("personal");
  };

  return (
    <>
      {step === "role" && (
        <RoleSelection
          onClose={handleCloseRoleSelection}
          onRoleSelect={handleRoleSelectAndSubmit}
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
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-1 focus:ring-green-500 outline-none"
            />
          </div>

          {/* Last Name */}
          <div>
            <label className="block text-sm mb-1">Last Name</label>
            <input
              type="text"
              placeholder="Last Name"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
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
                name="country"
                value={formData.country}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-1 focus:ring-green-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm mb-1">State/Province</label>
              <input
                type="text"
                placeholder="State/Province"
                name="stateProvince"
                value={formData.stateProvince}
                onChange={handleInputChange}
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
                name="zipPostal"
                value={formData.zipPostal}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-1 focus:ring-green-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm mb-1">Phone Number</label>
              <input
                type="tel"
                placeholder="Phone Number"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-1 focus:ring-green-500 outline-none"
              />
            </div>
          </div>

          <button
            onClick={handlePersonalInfoContinue}
            disabled={loading}
            className="w-full bg-green-600 text-white py-2 rounded-md text-sm hover:bg-green-700 transition mt-4 disabled:bg-gray-400"
          >
            {loading ? "Please wait..." : "Continue"}
          </button>
        </div>
      ) : step === "signup" ? (
        <div className="space-y-3">
          {/* Email */}
          <div>
            <label className="block text-sm mb-1">Email</label>
            <input
              type="email"
              placeholder="Enter email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-1 focus:ring-green-500 outline-none"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm mb-1">Password</label>
            <input
              type="password"
              placeholder="Create password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-1 focus:ring-green-500 outline-none"
            />
          </div>

          {/* Next Button */}
          <button
            onClick={handleSignUp}
            disabled={loading}
            className="w-full bg-green-600 text-white py-2 rounded-md text-sm hover:bg-green-700 transition disabled:bg-gray-400"
          >
            {loading ? "..." : "Next"}
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