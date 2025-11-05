// "use client";

// import { useState } from "react";
// import { FcGoogle } from "react-icons/fc";
// import { FaApple } from "react-icons/fa";
// import { useAuth } from "@/app/context/AuthContext"; // Adjust the path if needed

// const SignInForm = ({ switchToSignUp }) => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const { login } = useAuth(); // Use the login function from our context

//   const handleLogin = (e) => {
//     e.preventDefault();
//     if (!email || !password) {
//       // toast is already available globally from your layout
//       // you just need to import it if you haven't.
//       // For simplicity, we assume toast is available.
//       alert("Please enter email and password."); // Or use a toast
//       return;
//     }
//     login(email, password);
//   };

//   return (
//     <form onSubmit={handleLogin} className="space-y-3">
//       <div>
//         <label className="block text-sm mb-1">Email</label>
//         <input
//           type="email"
//           placeholder="Enter email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-1 focus:ring-green-500 outline-none"
//         />
//       </div>

//       <div>
//         <label className="block text-sm mb-1">Password</label>
//         <input
//           type="password"
//           placeholder="Enter password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-1 focus:ring-green-500 outline-none"
//         />
//         <div className="text-right mt-1">
//           <button type="button" className="text-xs text-green-600 hover:underline">
//             Forgot Password?
//           </button>
//         </div>
//       </div>

//       <button type="submit" className="w-full bg-green-600 text-white py-2 rounded-md text-sm hover:bg-green-700 transition">
//         Login
//       </button>

//       {/* Rest of the component remains the same */}
//       <div className="flex items-center my-3">
//         <hr className="flex-grow border-gray-300" />
//         <span className="px-2 text-gray-400 text-sm">or</span>
//         <hr className="flex-grow border-gray-300" />
//       </div>

//       <button type="button" className="w-full border rounded-md border-gray-300 py-2 mb-2 text-sm flex items-center justify-center gap-2 hover:bg-gray-50 transition">
//         <FcGoogle className="w-5 h-5" /> Continue with Google
//       </button>
//       <button type="button" className="w-full border rounded-md border-gray-300 py-2 text-sm flex items-center justify-center gap-2 hover:bg-gray-50 transition">
//         <FaApple className="w-5 h-5 text-gray-800" /> Continue with Apple
//       </button>

//       <p className="text-xs text-center text-gray-500 mt-3">
//         Don’t have an account?{" "}
//         <button
//           type="button"
//           onClick={switchToSignUp}
//           className="text-green-600 font-medium hover:underline"
//         >
//           Create an Account
//         </button>
//       </p>
//     </form>
//   );
// };

// export default SignInForm;

"use client";

import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { FaApple } from "react-icons/fa";
import { useAuth } from "@/app/context/AuthContext";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";

const SignInForm = ({ switchToSignUp }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      alert("Please enter email and password.");
      return;
    }
    
    setLoading(true);
    try {
      await login(email, password);
    } catch (error) {
      console.error("Login failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleLogin} className="space-y-5">
      {/* Email */}
      <div className="relative">
        <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-10 py-3 text-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all duration-200 hover:border-gray-400"
          />
        </div>
      </div>

      {/* Password */}
      <div className="relative">
        <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-10 py-3 pr-10 text-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all duration-200 hover:border-gray-400"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
          >
            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        </div>
        
        {/* Forgot Password */}
        <div className="text-right mt-2">
          <button 
            type="button" 
            className="text-xs text-green-600 hover:text-green-700 font-medium hover:underline transition-colors duration-200"
          >
            Forgot Password?
          </button>
        </div>
      </div>

      {/* Login Button */}
      <button 
        type="submit" 
        disabled={loading}
        className="w-full bg-gradient-to-r from-green-600 to-emerald-500 text-white py-3 rounded-lg text-sm font-semibold hover:from-green-700 hover:to-emerald-600 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 disabled:from-gray-400 disabled:to-gray-500 disabled:hover:scale-100"
      >
        {loading ? (
          <div className="flex items-center justify-center space-x-2">
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            <span>Signing In...</span>
          </div>
        ) : (
          "Sign In to Your Account"
        )}
      </button>

      {/* OR Divider */}
      <div className="flex items-center my-6">
        <hr className="flex-grow border-gray-300" />
        <span className="px-3 text-gray-500 text-sm font-medium">or continue with</span>
        <hr className="flex-grow border-gray-300" />
      </div>

      {/* Social Buttons */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <button 
          type="button" 
          className="w-full border border-gray-300 rounded-lg py-3 text-sm flex items-center justify-center gap-2 hover:bg-gray-50 transition-all duration-200 hover:shadow-md hover:border-gray-400 active:scale-95"
        >
          <FcGoogle className="w-5 h-5" />
          <span className="font-medium">Google</span>
        </button>
        <button 
          type="button" 
          className="w-full border border-gray-300 rounded-lg py-3 text-sm flex items-center justify-center gap-2 hover:bg-gray-50 transition-all duration-200 hover:shadow-md hover:border-gray-400 active:scale-95"
        >
          <FaApple className="w-5 h-5 text-gray-800" />
          <span className="font-medium">Apple</span>
        </button>
      </div>

      {/* Sign Up Link */}
      <div className="text-center pt-4 border-t border-gray-200 mt-6">
        <p className="text-sm text-gray-600">
          Don't have an account?{" "}
          <button
            type="button"
            onClick={switchToSignUp}
            className="text-green-600 font-semibold hover:text-green-700 hover:underline transition-colors duration-200"
          >
            Create an Account
          </button>
        </p>
      </div>

      {/* Security Note */}

    </form>
  );
};

export default SignInForm;