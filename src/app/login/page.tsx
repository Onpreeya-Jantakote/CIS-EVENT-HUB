"use client";

import { useState, useEffect } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/firebase/config";
import { useRouter } from "next/navigation";
import SuccessModal from "@/components/login/SuccessModal";
import ErrorModal from "@/components/login/ErrorModal";
import LoginForm from "@/components/login/LoginForm";

export default function LoginPage() {
  const router = useRouter();

  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);

  const handleLogin = async (email: string, password: string) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const token = await userCredential.user.getIdToken();

      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
      });

      if (!res.ok) throw new Error("Login API failed");

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

        <LoginForm onLogin={handleLogin} />

        <div className="text-right mt-4 mb-5">
          <a href="/forgot-password" className="text-sm text-[#6E6E6E] hover:underline">
            Forgot password?
          </a>
        </div>

        <div className="text-center mt-4">
          <span className="text-sm text-gray-400">Don't have an account? </span>
          <a href="/sign-up" className="text-sm text-[#00A1FF] hover:underline">
            Sign Up
          </a>
        </div>
      </div>

      {showSuccessModal && <SuccessModal message="You have successfully logged in." />}
      {showErrorModal && <ErrorModal message="Something went wrong." onClose={() => setShowErrorModal(false)} />}
    </div>
  );
}
