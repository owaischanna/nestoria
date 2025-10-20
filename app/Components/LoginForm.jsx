"use client";

import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { FaApple } from "react-icons/fa";
import { useAuth } from "@/app/context/AuthContext"; // Adjust the path if needed

const SignInForm = ({ switchToSignUp }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth(); // Use the login function from our context

  const handleLogin = (e) => {
    e.preventDefault();
    if (!email || !password) {
      // toast is already available globally from your layout
      // you just need to import it if you haven't.
      // For simplicity, we assume toast is available.
      alert("Please enter email and password."); // Or use a toast
      return;
    }
    login(email, password);
  };

  return (
    <form onSubmit={handleLogin} className="space-y-3">
      <div>
        <label className="block text-sm mb-1">Email</label>
        <input
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-1 focus:ring-green-500 outline-none"
        />
      </div>

      <div>
        <label className="block text-sm mb-1">Password</label>
        <input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-1 focus:ring-green-500 outline-none"
        />
        <div className="text-right mt-1">
          <button type="button" className="text-xs text-green-600 hover:underline">
            Forgot Password?
          </button>
        </div>
      </div>

      <button type="submit" className="w-full bg-green-600 text-white py-2 rounded-md text-sm hover:bg-green-700 transition">
        Login
      </button>

      {/* Rest of the component remains the same */}
      <div className="flex items-center my-3">
        <hr className="flex-grow border-gray-300" />
        <span className="px-2 text-gray-400 text-sm">or</span>
        <hr className="flex-grow border-gray-300" />
      </div>

      <button type="button" className="w-full border rounded-md border-gray-300 py-2 mb-2 text-sm flex items-center justify-center gap-2 hover:bg-gray-50 transition">
        <FcGoogle className="w-5 h-5" /> Continue with Google
      </button>
      <button type="button" className="w-full border rounded-md border-gray-300 py-2 text-sm flex items-center justify-center gap-2 hover:bg-gray-50 transition">
        <FaApple className="w-5 h-5 text-gray-800" /> Continue with Apple
      </button>

      <p className="text-xs text-center text-gray-500 mt-3">
        Don’t have an account?{" "}
        <button
          type="button"
          onClick={switchToSignUp}
          className="text-green-600 font-medium hover:underline"
        >
          Create an Account
        </button>
      </p>
    </form>
  );
};

export default SignInForm;