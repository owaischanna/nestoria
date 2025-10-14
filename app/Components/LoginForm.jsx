import { FcGoogle } from "react-icons/fc";
import { FaApple } from "react-icons/fa";

const SignInForm = ({ switchToSignUp }) => {
  return (
    <div className="space-y-3">
      <div>
        <label className="block text-sm mb-1">Email</label>
        <input
          type="email"
          placeholder="Enter email"
          className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-1 focus:ring-green-500 outline-none"
        />
      </div>

      <div>
        <label className="block text-sm mb-1">Password</label>
        <input
          type="password"
          placeholder="Enter password"
          className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-1 focus:ring-green-500 outline-none"
        />
        <div className="text-right mt-1">
          <button className="text-xs text-green-600 hover:underline">
            Forgot Password?
          </button>
        </div>
      </div>

      <button className="w-full bg-green-600 text-white py-2 rounded-md text-sm hover:bg-green-700 transition">
        Login
      </button>

      <div className="flex items-center my-3">
        <hr className="flex-grow border-gray-300" />
        <span className="px-2 text-gray-400 text-sm">or</span>
        <hr className="flex-grow border-gray-300" />
      </div>

      <button className="w-full border rounded-md border-gray-300 py-2 mb-2 text-sm flex items-center justify-center gap-2 hover:bg-gray-50 transition">
        <FcGoogle className="w-5 h-5" /> Continue with Google
      </button>
      <button className="w-full border rounded-md border-gray-300 py-2 text-sm flex items-center justify-center gap-2 hover:bg-gray-50 transition">
        <FaApple className="w-5 h-5 text-gray-800" /> Continue with Apple
      </button>

      <p className="text-xs text-center text-gray-500 mt-3">
        Don’t have an account?{" "}
        <button
          onClick={switchToSignUp}
          className="text-green-600 font-medium hover:underline"
        >
          Create an Account
        </button>
      </p>
    </div>
  );
};

export default SignInForm;
