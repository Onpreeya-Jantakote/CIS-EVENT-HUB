"use client";

import React, { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Sidebar from "@/components/layout/Sidebar";
import CoverSection from "@/components/home/CoverSection";
import WhatsNewsSection from "@/components/home/WhatsNewsSection";
import EventSection from "@/components/home/EventSection";

export default function HomePage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const menuItems = [
    { id: 1, label: "Home", color: "#FF0055", active: true, href: "/" },
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

  return (
    <div className="bg-white text-gray-800 min-h-screen relative">
      <Navbar onOpenSidebar={() => setSidebarOpen(true)} />
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        menuItems={menuItems}
        student={null}
      />

      <CoverSection />
      <WhatsNewsSection />
      <EventSection />
    </div>
  );
}
