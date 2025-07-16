"use client";

import { useEffect, useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/app/firebase/config";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);

  const isFormValid = () => {
    return email.trim() !== "" && password.trim() !== "";
  };

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setShowSuccessModal(true);
    } catch (err) {
      setShowErrorModal(true);
    }
  };

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (showSuccessModal) {
      timer = setTimeout(() => {
        setShowSuccessModal(false);
        router.push("/home");
      }, 500);
    }

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [showSuccessModal, router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="bg-white p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center text-[#2192FF]">
          Login <span className="text-[#FF0055]">CIS</span>
        </h1>

        {/* Email */}
        <div className="relative mb-[25px]">
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder=" "
            className="peer w-full p-3 border rounded-xl focus:outline-none focus:ring-2 placeholder-transparent text-[#474747]"
          />
          <label
            htmlFor="email"
            className={`absolute left-3 bg-white px-1 transition-all text-sm
              peer-placeholder-shown:top-3
              peer-placeholder-shown:text-base
              peer-placeholder-shown:text-gray-400
              peer-focus:top-[-10px]
              peer-focus:text-blue-500
              ${email ? "top-[-10px] text-blue-500" : ""}
            `}
          >
            Email
          </label>
        </div>

        {/* Password */}
        <div className="relative mb-[5px]">
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder=" "
            className="peer w-full p-3 border rounded-xl focus:outline-none focus:ring-2 placeholder-transparent text-[#474747]"
          />
          <label
            htmlFor="password"
            className={`absolute left-3 bg-white px-1 transition-all text-sm
              peer-placeholder-shown:top-3
              peer-placeholder-shown:text-base
              peer-placeholder-shown:text-gray-400
              peer-focus:top-[-10px]
              peer-focus:text-blue-500
              ${password ? "top-[-10px] text-blue-500" : ""}
            `}
          >
            Password
          </label>
        </div>
        {/* Forgot Password link */}
        <div className="text-right mb-5">
          <a
            href="/forgot-password"
            className="text-sm text-[#6E6E6E] hover:underline"
          >
            Forgot password?
          </a>
        </div>

        <button
          onClick={handleLogin}
          disabled={!isFormValid()}
          className={`w-full p-3 rounded-xl transition mt-4 ${
            isFormValid()
              ? "bg-[#2192FF] text-white hover:bg-[#1E80D4]"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
        >
          Login
        </button>

        <div className="text-center mt-4">
          <span className="text-sm text-gray-400">Don't have an account? </span>
          <a href="/sign-up" className="text-sm text-[#00A1FF] hover:underline">
            Sign Up
          </a>
        </div>
      </div>

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-2xl max-w-sm w-full mx-4 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-8 h-8 text-green-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h2 className="text-xl font-bold text-gray-800 mb-2">
              Login Success!
            </h2>
            <p className="text-gray-600 mb-6">
              You have successfully logged in.
            </p>
          </div>
        </div>
      )}

      {/* Error Modal */}
      {showErrorModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-2xl max-w-sm w-full mx-4 text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-8 h-8 text-red-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </div>
            <h2 className="text-xl font-bold text-gray-800 mb-2">Sorry,</h2>
            <p className="text-gray-600 mb-6">Something went wrong.</p>
            <button
              onClick={() => setShowErrorModal(false)}
              className="mt-2 px-4 py-2 bg-[#6E6E6E] text-white rounded-xl hover:bg-[#5A5A5A] transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
