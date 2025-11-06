// "use client";

// import { useState } from "react";
// import { X } from "lucide-react";
// import SignInForm from "./LoginForm";
// import SignUpForm from "./SignUpForm";

// const AuthModal = ({ isOpen, onClose }) => {
//   const [activeTab, setActiveTab] = useState("signin");

//   if (!isOpen) return null;

//   return (
//     <div
//       className="fixed inset-0 flex items-center justify-center bg-black/50 z-50"
//       onClick={onClose}
//     >
//       <div
//         className="bg-white rounded-xl w-[480px] max-w-[95%] p-8 relative shadow-xl" // Increased width and padding
//         onClick={(e) => e.stopPropagation()}
//       >
//         {/* Close Button */}
//         <button
//           onClick={onClose}
//           className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition" // Adjusted position
//         >
//           <X size={24} /> {/* Increased icon size */}
//         </button>

//         {/* Title */}
//         <h2 className="text-center text-xl font-semibold mb-6"> {/* Increased text size and margin */}
//           Welcome to <span className="text-600">Habisolo</span>
//         </h2>

//         {/* Tabs */}
//         <div className="flex border-b border-gray-200 mb-6"> {/* Increased margin */}
//           <button
//             onClick={() => setActiveTab("signin")}
//             className={`mr-8 pb-3 text-base font-medium ${ // Increased margin, padding and text size
//               activeTab === "signin"
//                 ? "text-green-600 border-b-2 border-green-600"
//                 : "text-gray-500 hover:text-green-600"
//             }`}
//           >
//             Sign In
//           </button>
//           <button
//             onClick={() => setActiveTab("signup")}
//             className={`pb-3 text-base font-medium ${ // Increased padding and text size
//               activeTab === "signup"
//                 ? "text-green-600 border-b-2 border-green-600"
//                 : "text-gray-500 hover:text-green-600"
//             }`}
//           >
//             New Account
//           </button>
//         </div>

//         {/* Dynamic Form */}
//         {activeTab === "signin" ? (
//           <SignInForm switchToSignUp={() => setActiveTab("signup")} />
//         ) : (
//           <SignUpForm switchToSignIn={() => setActiveTab("signin")} />
//         )}
//       </div>
//     </div>
//   );
// };

// export default AuthModal;


"use client";

import { useState } from "react";
import { X, Home, Shield, Users } from "lucide-react";
import SignInForm from "./LoginForm";
import SignUpForm from "./SignUpForm";

const AuthModal = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState("signin");

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black/50 z-50 p-4 animate-in fade-in duration-300"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-xl w-full max-w-sm sm:max-w-md shadow-xl relative transform animate-in zoom-in duration-300 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Background Decorative Elements */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-500 to-emerald-400"></div>
        
        {/* Close Button - Fixed and Working */}
      {/* Close Button - FIXED: Increased z-index to z-50 to guarantee clickability */}
 <button
onClick={onClose} // This handler correctly calls the function to close the modal
 className="absolute top-3 right-3 z-50 w-8 h-8 flex items-center justify-center bg-white rounded-full shadow-md hover:shadow-lg hover:scale-110 active:scale-95 transition-all duration-200 group border border-gray-200"
 aria-label="Close modal"
 >
 <X size={36} className="text-gray-600 group-hover:text-gray-800 transition-colors" />
 </button>

        <div className="relative z-10">
          {/* Header Section - Compact */}
          <div className="text-center pt-6 pb-4 px-6">
            {/* <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-400 rounded-xl flex items-center justify-center mx-auto mb-3 shadow-md">
              <Home className="w-6 h-6 text-white" />
            </div> */}
            <h2 className="text-xl font-bold text-gray-900 mb-1">
              Welcome to <span className="text-green-600">Habisolo</span>
            </h2>
            {/* <p className="text-gray-500 text-xs">
              Your perfect home journey starts here
            </p> */}
          </div>

          {/* Tabs - Compact */}
          <div className="flex border-b border-gray-200 mx-6 mb-1">
            <button
              onClick={() => setActiveTab("signin")}
              className={`flex-1 py-3 text-sm font-medium transition-all duration-300 relative ${
                activeTab === "signin"
                  ? "text-green-600"
                  : "text-gray-500 hover:text-green-500"
              }`}
            >
              Sign In
              <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-green-500 to-emerald-400 transition-transform duration-300 ${
                activeTab === "signin" ? "scale-x-100" : "scale-x-0"
              }`}></span>
            </button>
            <button
              onClick={() => setActiveTab("signup")}
              className={`flex-1 py-3 text-sm font-medium transition-all duration-300 relative ${
                activeTab === "signup"
                  ? "text-green-600"
                  : "text-gray-500 hover:text-green-500"
              }`}
            >
              New Account
              <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-emerald-400 to-green-500 transition-transform duration-300 ${
                activeTab === "signup" ? "scale-x-100" : "scale-x-0"
              }`}></span>
            </button>
          </div>

          {/* Dynamic Form - Compact */}
          <div className="px-6 pb-6">
            {activeTab === "signin" ? (
              <SignInForm switchToSignUp={() => setActiveTab("signup")} />
            ) : (
              <SignUpForm switchToSignIn={() => setActiveTab("signin")} />
            )}
          </div>

          {/* Features Footer - Compact */}
      
        </div>
      </div>
    </div>
  );
};

export default AuthModal;