"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { auth, db } from "@/app/firebase/config";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import UploadAvatar from "@/app/components/profile/UploadAvatar";
import ProfileForm from "@/app/components/profile/ProfileForm";
import { HiChevronLeft } from "react-icons/hi";

interface Student {
  firstname: string;
  lastname: string;
  image?: string;
  studentId?: string;
}

export default function EditProfile() {
  const router = useRouter();
  const [student, setStudent] = useState<Student | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        router.replace("/login");
      } else {
        const docRef = doc(db, "student", user.uid);
        const snap = await getDoc(docRef);
        if (snap.exists()) {
          const data = snap.data();
          setStudent({
            firstname: data.firstname,
            lastname: data.lastname,
            image: data.image || "",
            studentId: data.studentId || "",
          });
        }
        setLoading(false);
      }
    });
    return () => unsubscribe();
  }, [router]);

  const handleUpdate = async () => {
    if (!auth.currentUser || !student) return;
    const docRef = doc(db, "student", auth.currentUser.uid);
    await updateDoc(docRef, {
      firstname: student.firstname,
      lastname: student.lastname,
    });
    alert("Profile updated!");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto p-8 pt-6 relative">
      <button
        onClick={() => router.back()}
        className="absolute top-6 left-6 text-3xl text-[#2192FF] cursor-pointer hover:opacity-80"
        aria-label="Go back"
      >
        <HiChevronLeft />
      </button>

      <h1 className="text-3xl font-bold mb-6 text-center">Edit Profile</h1>
      {student && (
        <>
          <UploadAvatar currentImage={student.image} />
          <ProfileForm
            student={student}
            setStudent={setStudent}
            onSave={handleUpdate}
          />
        </>
      )}
    </div>
  );
}
