"use client";

import { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "@/firebase/config";
import { useRouter } from "next/navigation";

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [emailSent, setEmailSent] = useState(false);
  const [error, setError] = useState("");

  const handleSendEmail = async () => {
    setError("");

    try {
      await sendPasswordResetEmail(auth, email);
      setEmailSent(true);
    } catch (err) {
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="bg-white p-8 w-full max-w-md">
        {/* หัวข้อ */}
        <h1 className="text-2xl font-bold mb-2 text-center">
          <span className="text-[#FF0055]">Forgot your </span>
          <span className="text-[#2192FF]">Password?</span>
        </h1>

        {/* คำอธิบาย */}
        <p className="text-center text-gray-500 mb-6">
          Enter your email so that we can send you password reset link
        </p>

        {/* Input Email */}
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

        {/* Error */}
        {error && (
          <p className="text-sm text-red-500 text-center mb-3">{error}</p>
        )}

        {/* Email Sent Success */}
        {emailSent && (
          <div className="bg-green-50 border-l-4 border-green-400 text-green-700 p-3 rounded-xl text-sm mb-4">
            A password reset email has been sent to your email address.
          </div>
        )}

        {/* ปุ่ม Send Email */}
        <button
          onClick={handleSendEmail}
          disabled={!email}
          className={`w-full p-3 rounded-xl transition ${
            email
              ? "bg-[#2192FF] text-white hover:bg-[#1E80D4]"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
        >
          Send Email
        </button>

        {/* ลิงก์กลับ */}
        <div className="text-center mt-6">
          <a
            href="/login"
            className="text-sm text-[#00A1FF] hover:underline"
          >
            &lt; Back to Login
          </a>
        </div>
      </div>
    </div>
  );
}
