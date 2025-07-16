"use client";

import { useEffect, useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db } from "@/app/firebase/config";
import { useRouter } from "next/navigation";
import { doc, setDoc } from "firebase/firestore";
import {
  validateField,
  validateAllFields,
  isFormComplete,
  getFieldErrorStyle,
} from "@/app/utils/validation";

export default function SignUpPage() {
  const router = useRouter();

  const [studentId, setStudentId] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [receiveEmails, setReceiveEmails] = useState(false);
  const [error, setError] = useState("");
  const [focusedField, setFocusedField] = useState("");
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  // Field-specific errors
  const [fieldErrors, setFieldErrors] = useState({
    studentId: "",
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleValidateField = (fieldName: string, value: string) => {
    const validation = validateField(fieldName, value, { password });

    setFieldErrors((prev) => ({
      ...prev,
      [fieldName]: validation.errorMessage,
    }));

    return validation.isValid;
  };

  const handleBlur = (fieldName: string, value: string) => {
    setFocusedField("");
    handleValidateField(fieldName, value);
  };

  const isFormValid = () => {
    const formData = {
      studentId,
      firstname,
      lastname,
      email,
      password,
      confirmPassword,
      agreeTerms,
    };

    const { errors, isFormValid: isValid } = validateAllFields(formData);
    const isComplete = isFormComplete(formData);

    return isValid && isComplete;
  };

  const handleSignUp = async () => {
    setError("");

    // Validate all fields before submission
    const formData = {
      studentId,
      firstname,
      lastname,
      email,
      password,
      confirmPassword,
      agreeTerms,
    };

    const { errors, isFormValid: isValid } = validateAllFields(formData);

    if (!isValid) {
      setFieldErrors(errors as typeof fieldErrors);
      return;
    }

    if (!agreeTerms) {
      setError("You must accept the terms before signing up");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      await updateProfile(user, {
        displayName: `${firstname} ${lastname}`,
      });

      await setDoc(doc(db, "student", user.uid), {
        studentId,
        firstname,
        lastname,
        email,
        receiveEmails,
        createdAt: new Date(),
      });

      setShowSuccessModal(true);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Sorry, something went wrong.");
      }
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
        <h1 className="text-2xl font-bold mb-6 text-center text-[#FF0055]">
          Sign Up <span className="text-[#2192FF]">CIS</span>
        </h1>

        {/* Student ID */}
        <div className="relative mb-[25px]">
          <input
            type="text"
            id="studentId"
            maxLength={10}
            value={studentId}
            onChange={(e) => {
              const value = e.target.value.replace(/\D/g, "");
              setStudentId(value);
              if (focusedField !== "studentId") {
                handleValidateField("studentId", value);
              }
            }}
            onFocus={() => setFocusedField("studentId")}
            onBlur={() => handleBlur("studentId", studentId)}
            placeholder=" "
            className={`peer w-full p-3 border rounded-xl focus:outline-none focus:ring-2 placeholder-transparent text-[#474747] ${getFieldErrorStyle(
              fieldErrors.studentId
            )}`}
          />
          <label
            htmlFor="studentId"
            className={`absolute left-3 text-sm transition-all bg-white px-1 ${
              studentId || focusedField === "studentId"
                ? fieldErrors.studentId
                  ? "top-[-10px] text-red-500"
                  : "top-[-10px] text-blue-500"
                : "top-3 text-base text-gray-400"
            }`}
          >
            Student ID
          </label>
          {fieldErrors.studentId && (
            <div className="text-red-500 text-sm mt-1 text-right">
              {fieldErrors.studentId}
            </div>
          )}
        </div>

        {/* First Name */}
        <div className="relative mb-[25px]">
          <input
            type="text"
            id="firstname"
            value={firstname}
            onChange={(e) => {
              setFirstname(e.target.value);
              if (focusedField !== "firstname") {
                handleValidateField("firstname", e.target.value);
              }
            }}
            onFocus={() => setFocusedField("firstname")}
            onBlur={() => handleBlur("firstname", firstname)}
            placeholder=" "
            className={`peer w-full p-3 border rounded-xl focus:outline-none focus:ring-2 placeholder-transparent text-[#474747] ${getFieldErrorStyle(
              fieldErrors.firstname
            )}`}
          />
          <label
            htmlFor="firstname"
            className={`absolute left-3 text-sm transition-all bg-white px-1 ${
              firstname || focusedField === "firstname"
                ? fieldErrors.firstname
                  ? "top-[-10px] text-red-500"
                  : "top-[-10px] text-blue-500"
                : "top-3 text-base text-gray-400"
            }`}
          >
            First Name
          </label>
          {fieldErrors.firstname && (
            <div className="text-red-500 text-sm mt-1 text-right">
              {fieldErrors.firstname}
            </div>
          )}
        </div>

        {/* Last Name */}
        <div className="relative mb-[25px]">
          <input
            type="text"
            id="lastname"
            value={lastname}
            onChange={(e) => {
              setLastname(e.target.value);
              if (focusedField !== "lastname") {
                handleValidateField("lastname", e.target.value);
              }
            }}
            onFocus={() => setFocusedField("lastname")}
            onBlur={() => handleBlur("lastname", lastname)}
            placeholder=" "
            className={`peer w-full p-3 border rounded-xl focus:outline-none focus:ring-2 placeholder-transparent text-[#474747] ${getFieldErrorStyle(
              fieldErrors.lastname
            )}`}
          />
          <label
            htmlFor="lastname"
            className={`absolute left-3 text-sm transition-all bg-white px-1 ${
              lastname || focusedField === "lastname"
                ? fieldErrors.lastname
                  ? "top-[-10px] text-red-500"
                  : "top-[-10px] text-blue-500"
                : "top-3 text-base text-gray-400"
            }`}
          >
            Last Name
          </label>
          {fieldErrors.lastname && (
            <div className="text-red-500 text-sm mt-1 text-right">
              {fieldErrors.lastname}
            </div>
          )}
        </div>

        {/* Email */}
        <div className="relative mb-[25px]">
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (focusedField !== "email") {
                handleValidateField("email", e.target.value);
              }
            }}
            onFocus={() => setFocusedField("email")}
            onBlur={() => handleBlur("email", email)}
            placeholder=" "
            className={`peer w-full p-3 border rounded-xl focus:outline-none focus:ring-2 placeholder-transparent text-[#474747] ${getFieldErrorStyle(
              fieldErrors.email
            )}`}
          />
          <label
            htmlFor="email"
            className={`absolute left-3 text-sm transition-all bg-white px-1 ${
              email || focusedField === "email"
                ? fieldErrors.email
                  ? "top-[-10px] text-red-500"
                  : "top-[-10px] text-blue-500"
                : "top-3 text-base text-gray-400"
            }`}
          >
            Email
          </label>
          {fieldErrors.email && (
            <div className="text-red-500 text-sm mt-1 text-right">
              {fieldErrors.email}
            </div>
          )}
        </div>

        {/* Password */}
        <div className="relative mb-[25px]">
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              if (focusedField !== "password") {
                handleValidateField("password", e.target.value);
              }
              // Re-validate confirm password if it has a value
              if (confirmPassword) {
                handleValidateField("confirmPassword", confirmPassword);
              }
            }}
            onFocus={() => setFocusedField("password")}
            onBlur={() => handleBlur("password", password)}
            placeholder=" "
            className={`peer w-full p-3 border rounded-xl focus:outline-none focus:ring-2 placeholder-transparent text-[#474747] ${getFieldErrorStyle(
              fieldErrors.password
            )}`}
          />
          <label
            htmlFor="password"
            className={`absolute left-3 text-sm transition-all bg-white px-1 ${
              password || focusedField === "password"
                ? fieldErrors.password
                  ? "top-[-10px] text-red-500"
                  : "top-[-10px] text-blue-500"
                : "top-3 text-base text-gray-400"
            }`}
          >
            Password
          </label>
          {fieldErrors.password && (
            <div className="text-red-500 text-sm mt-1 text-right">
              {fieldErrors.password}
            </div>
          )}
        </div>

        {/* Confirm Password */}
        <div className="relative mb-[25px]">
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
              if (focusedField !== "confirmPassword") {
                handleValidateField("confirmPassword", e.target.value);
              }
            }}
            onFocus={() => setFocusedField("confirmPassword")}
            onBlur={() => handleBlur("confirmPassword", confirmPassword)}
            placeholder=" "
            className={`peer w-full p-3 border rounded-xl focus:outline-none focus:ring-2 placeholder-transparent text-[#474747] ${getFieldErrorStyle(
              fieldErrors.confirmPassword
            )}`}
          />
          <label
            htmlFor="confirmPassword"
            className={`absolute left-3 text-sm transition-all bg-white px-1 ${
              confirmPassword || focusedField === "confirmPassword"
                ? fieldErrors.confirmPassword
                  ? "top-[-10px] text-red-500"
                  : "top-[-10px] text-blue-500"
                : "top-3 text-base text-gray-400"
            }`}
          >
            Confirm Password
          </label>
          {fieldErrors.confirmPassword && (
            <div className="text-red-500 text-sm mt-1 text-right">
              {fieldErrors.confirmPassword}
            </div>
          )}
        </div>

        <label className="inline-flex items-start gap-2 mb-2 text-[#949494]">
          <input
            type="checkbox"
            checked={agreeTerms}
            onChange={(e) => setAgreeTerms(e.target.checked)}
            className="h-4 w-4 accent-[#FF0055] focus:ring-0"
          />
          <span className="text-sm leading-snug max-w-xs">
            I agree to the{" "}
            <a href="/terms" className="text-[#0080FF] underline">
              Terms and Conditions.
            </a>
          </span>
        </label>

        <label className="inline-flex items-start gap-2 mb-2 text-[#949494]">
          <input
            type="checkbox"
            checked={receiveEmails}
            onChange={(e) => setReceiveEmails(e.target.checked)}
            className="h-4 w-4 accent-[#FF0055] focus:ring-0"
          />
          <span className="text-sm leading-snug max-w-xs">
            I want to receive emails about news, updates, and special offers.
          </span>
        </label>

        {error && <p className="text-red-600 mb-4 text-center">{error}</p>}

        <button
          onClick={handleSignUp}
          disabled={!isFormValid()}
          className={`w-full p-3 rounded-xl transition mt-4 ${
            isFormValid()
              ? "bg-[#2192FF] text-white hover:bg-[#1E80D4]"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
        >
          Sign up
        </button>

        <div className="text-center mt-4">
          <a href="/login" className="text-sm text-[#00A1FF] hover:underline">
            Login
          </a>
        </div>
      </div>

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
              Sign up Success!
            </h2>
            <p className="text-gray-600 mb-6">
              You have successfully signed up
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
