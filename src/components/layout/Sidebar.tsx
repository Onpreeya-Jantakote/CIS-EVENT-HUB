"use client";

import React from "react";
import { FaPen, FaUserCircle } from "react-icons/fa";
import Link from "next/link";
import { logout } from "@/lib/logout";

interface MenuItem {
  id: number;
  label: string;
  color: string;
  active: boolean;
  href: string;
}

interface Student {
  firstname: string;
  lastname: string;
  email?: string;
  image?: string;
}

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  menuItems: MenuItem[];
  student: Student | null;
  onLogout?: () => void;
}

function formatShortName(firstname: string, lastname: string): string {
  if (!firstname) return "";
  if (!lastname) return firstname;
  return `${firstname} ${lastname.charAt(0)}.`;
}

export default function Sidebar({
  isOpen,
  onClose,
  menuItems,
  student,
  onLogout,
}: SidebarProps) {
  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-40"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full bg-white z-50 shadow-lg transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        style={{ width: "70vw", maxWidth: "400px" }}
      >
        {/* ปุ่มปิด */}
        <div
          className="self-end cursor-pointer text-2xl mb-8 p-4 flex gap-1"
          onClick={onClose}
        >
          <div className="relative w-6 h-6">
            <div className="absolute w-full h-[2px] bg-red-500 rotate-45 top-1/2 left-0 origin-center" />
            <div className="absolute w-full h-[2px] bg-blue-500 -rotate-45 top-1/2 left-0 origin-center" />
          </div>
        </div>

        {/* User Info */}
        <div className="flex flex-col items-center relative mb-10">
          {/* วงกลมโปรไฟล์ */}
          <div className="relative w-24 h-24">
            {student && student.image ? (
              <div className="w-full h-full rounded-full overflow-hidden bg-gray-200 border-2 border-gray-300">
                <img
                  src={student.image}
                  alt="Profile"
                  className="w-full h-full object-cover rounded-full"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = "none";
                    const parent = target.parentElement;
                    if (parent) {
                      parent.innerHTML = `<div class="w-full h-full flex items-center justify-center">
                        <svg class="w-16 h-16 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                        </svg>
                      </div>`;
                    }
                  }}
                />
              </div>
            ) : (
              // แสดง default icon
              <FaUserCircle className="text-gray-300 w-full h-full" />
            )}

            {/* ปุ่ม Edit */}
            {student && (
              <Link href="/profile-edit">
                <div
                  className="absolute -bottom-1 -right-1 bg-[#FF0055] w-7 h-7 rounded-full flex items-center justify-center shadow-md hover:opacity-90 cursor-pointer"
                  title="Edit Profile"
                >
                  <FaPen className="text-white text-xs" />
                </div>
              </Link>
            )}
          </div>

          {/* ชื่อผู้ใช้ */}
          <span className="mt-2 font-medium text-gray-600">
            {student
              ? formatShortName(student.firstname, student.lastname)
              : "Anonymous"}
          </span>
        </div>

        {/* เมนูหลัก */}
        <nav className="flex flex-col p-6 mt-16 space-y-6 items-center">
          {menuItems.map(({ id, label, color, active, href }) => (
            <Link
              href={href}
              key={id}
              className="text-xl font-semibold cursor-pointer"
              style={{
                color: active ? color : "#2192FF",
                borderBottom: active ? `2px solid ${color}` : "none",
                paddingBottom: 4,
              }}
              onClick={onClose}
            >
              {label}
            </Link>
          ))}
        </nav>

        <div className="flex flex-col gap-4 mt-12 items-center">
          {!student ? (
            <>
              <Link href="/sign-up" onClick={onClose}>
                <button className="bg-[#2192FF] text-white py-2 px-6 rounded-full font-semibold border-2 border-transparent hover:border-[#2192FF] hover:bg-transparent hover:text-[#2192FF] transition">
                  Sign Up
                </button>
              </Link>
              <Link href="/login" onClick={onClose}>
                <button className="border-2 border-[#2192FF] text-[#2192FF] py-2 px-6 rounded-full font-semibold hover:bg-[#2192FF] hover:text-white transition">
                  Login
                </button>
              </Link>
            </>
          ) : (
            <button
              onClick={async () => {
                await logout();
                onClose();
              }}
              className="border-2 border-red-500 text-red-500 py-2 px-6 rounded-full font-semibold hover:bg-red-500 hover:text-white transition"
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </>
  );
}
