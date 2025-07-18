"use client";

import React, { useEffect, useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Sidebar from "@/components/layout/Sidebar";
import CoverSection from "@/components/home/CoverSection";
import WhatsNewsSection from "@/components/home/WhatsNewsSection";
import EventSection from "@/components/home/EventSection";
import { auth, db } from "@/firebase/config";
import { doc, getDoc } from "firebase/firestore";
import {
  onAuthStateChanged,
  signOut,
  User as FirebaseUser,
} from "firebase/auth";
import { useRouter } from "next/navigation";

interface Student {
  firstname: string;
  lastname: string;
}

export default function Home() {
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [student, setStudent] = useState<Student | null>(null);
  const [loading, setLoading] = useState(true);

  const menuItems = [
    { id: 1, label: "Home", color: "#FF0055", active: true, href: "/home" },
    {
      id: 2,
      label: "Event Calendar",
      color: "#2192FF",
      active: false,
      href: "/event-calendar",
    },
    {
      id: 3,
      label: "My Event",
      color: "#2192FF",
      active: false,
      href: "/my-event",
    },
  ];

  const handleLogout = async () => {
    await signOut(auth);
    setStudent(null);
    router.replace("/login");
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      auth,
      async (firebaseUser: FirebaseUser | null) => {
        if (!firebaseUser) {
          router.replace("/login");
        } else {
          const docRef = doc(db, "student", firebaseUser.uid);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            const studentData = docSnap.data();
            setStudent({
              firstname: studentData.firstname,
              lastname: studentData.lastname,
            });
          } else {
            const fallbackName =
              firebaseUser.displayName || firebaseUser.email || "Anonymous";
            setStudent({
              firstname: fallbackName,
              lastname: "",
            });
          }

          setLoading(false);
        }
      }
    );

    return () => unsubscribe();
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="bg-white text-gray-800 min-h-screen relative">
      <Navbar onOpenSidebar={() => setSidebarOpen(true)} />
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        menuItems={menuItems}
        student={student}
        onLogout={handleLogout}
      />

      <CoverSection />
      <WhatsNewsSection />
      <EventSection />
    </div>
  );
}
