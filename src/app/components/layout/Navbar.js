"use client";
import React from "react";
import { FaBars } from "react-icons/fa";

export default function Navbar({ onOpenSidebar }) {
  return (
    <nav className="fixed top-0 left-0 right-0 flex items-center justify-between p-4 border-b shadow-sm bg-white z-50">
      <div className="text-xl font-bold text-[#FF0055]">CIS Event Hub</div>
      <div
        className="text-2xl text-[#FF0055] cursor-pointer"
        onClick={onOpenSidebar}
      >
        <FaBars />
      </div>
    </nav>
  );
}