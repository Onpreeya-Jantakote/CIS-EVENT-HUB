"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Sidebar from "@/components/layout/Sidebar";
import CalendarView from "@/components/event-calendar/CalendarView";
import EventList from "@/components/event-calendar/EventList";
import { useStudentInfo, handleLogout } from "@/components/event-calendar/useStudentInfo";

export default function EventCalendar() {
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { student, loading, setStudent } = useStudentInfo();

  const menuItems = [
    { id: 1, label: "Home", color: "#2192FF", active: false, href: "/home" },
    { id: 2, label: "Event Calendar", color: "#FF0055", active: true, href: "/event-calendar" },
    { id: 3, label: "My Event", color: "#2192FF", active: false, href: "/my-event" },
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="bg-white text-gray-800 min-h-screen relative">
      {/* Navbar */}
      <Navbar onOpenSidebar={() => setSidebarOpen(true)} />

      {/* Sidebar */}
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        menuItems={menuItems}
        student={student}
        onLogout={() => handleLogout(setStudent, router)}
      />

      {/* Header Section */}
      <div className="text-center pt-24 pb-10">
        <h1 className="text-4xl font-bold text-blue-600">Event Calendar</h1>
      </div>

      {/* Calendar View */}
      <div className="max-w-6xl mx-auto px-6 mb-10">
        <CalendarView />
      </div>

      {/* Event List */}
      <div className="max-w-6xl mx-auto">
        <EventList />
      </div>
    </div>
  );
}
