"use client";

import { useState } from "react";

interface LoginFormProps {
  onLogin: (email: string, password: string) => Promise<void>;
}

export default function LoginForm({ onLogin }: LoginFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const isFormValid = () => email.trim() !== "" && password.trim() !== "";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid()) return;
    await onLogin(email, password);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="relative">
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder=" "
          className="peer w-full p-3 border rounded-xl focus:outline-none focus:ring-2 placeholder-transparent text-[#474747]"
          required
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

      <div className="relative">
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder=" "
          className="peer w-full p-3 border rounded-xl focus:outline-none focus:ring-2 placeholder-transparent text-[#474747]"
          required
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

      <button
        type="submit"
        disabled={!isFormValid()}
        className={`w-full p-3 rounded-xl transition ${
          isFormValid()
            ? "bg-[#2192FF] text-white hover:bg-[#1E80D4]"
            : "bg-gray-300 text-gray-500 cursor-not-allowed"
        }`}
      >
        Login
      </button>
    </form>
  );
}
