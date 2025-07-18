"use client";

import { useState, useRef } from "react";
import { auth, db } from "@/firebase/config";
import { doc, updateDoc } from "firebase/firestore";
import { FaCamera } from "react-icons/fa";

interface Props {
  currentImage?: string; // base64 image string
}

export default function UploadAvatar({ currentImage }: Props) {
  const [imagePreview, setImagePreview] = useState<string | null>(
    currentImage || null
  );
  const inputRef = useRef<HTMLInputElement>(null);

  // ย่อรูปแล้วแปลงเป็น base64
  const resizeImage = (file: File, maxSize = 200): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement("canvas");
          const scale = maxSize / Math.max(img.width, img.height);
          const width = img.width * scale;
          const height = img.height * scale;
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext("2d");
          if (!ctx) return reject("Canvas context error");
          ctx.drawImage(img, 0, 0, width, height);
          const compressedBase64 = canvas.toDataURL("image/jpeg", 0.7); // ลดคุณภาพเล็กน้อย
          resolve(compressedBase64);
        };
        img.src = event.target?.result as string;
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const compressedImage = await resizeImage(file);
      setImagePreview(compressedImage);

      const user = auth.currentUser;
      if (!user) throw new Error("User not logged in");

      const userDocRef = doc(db, "student", user.uid);
      await updateDoc(userDocRef, {
        image: compressedImage, // เก็บ base64 ที่ถูกย่อ
      });

      console.log("อัปโหลดสำเร็จแล้ว");
    } catch (error) {
      console.error("เกิดข้อผิดพลาดในการอัปโหลด:", error);
    }
  };

  return (
    <div className="flex flex-col items-center gap-4">
      {/* ภาพตัวอย่าง */}
      <div className="relative w-32 h-32 rounded-full overflow-hidden border-2 border-gray-300 bg-gray-100">
        {imagePreview ? (
          <img
            src={imagePreview}
            alt="Profile"
            className="w-full h-full object-cover"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.style.display = "none";
            }}
          />
        ) : (
          <div className="flex items-center justify-center w-full h-full text-gray-300 text-6xl">
            <FaCamera />
          </div>
        )}

        {/* ปุ่มเปลี่ยนรูป */}
        <button
          onClick={() => inputRef.current?.click()}
          className="absolute bottom-1 right-1 bg-[#2192FF] text-white rounded-full w-7 h-7 flex items-center justify-center text-xs shadow hover:opacity-90"
          title="Upload"
        >
          <FaCamera />
        </button>

        <input
          type="file"
          accept="image/*"
          className="hidden"
          ref={inputRef}
          onChange={handleFileChange}
        />
      </div>

      <p className="text-sm text-gray-500">Click icon to upload</p>
    </div>
  );
}
