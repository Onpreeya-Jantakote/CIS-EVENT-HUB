"use client";

import React from "react";
import TextInput from "./TextInput";

interface Student {
  firstname: string;
  lastname: string;
  image?: string;
  studentId?: string;
}

interface ProfileFormProps {
  student: Student;
  setStudent: React.Dispatch<React.SetStateAction<Student | null>>; // รองรับ null
  onSave: () => Promise<void>;
}

export default function ProfileForm({ student, setStudent, onSave }: ProfileFormProps) {
  if (!student) return null; // กันกรณี null

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSave();
      }}
      className="mt-6 space-y-4"
    >
      <TextInput label="Student ID" value={student.studentId || ""} disabled />
      <TextInput
        label="First Name"
        value={student.firstname}
        onChange={(val) => setStudent({ ...student, firstname: val })}
      />
      <TextInput
        label="Last Name"
        value={student.lastname}
        onChange={(val) => setStudent({ ...student, lastname: val })}
      />
      <button
        type="submit"
        className="w-full bg-[#2192FF] text-white py-2 rounded-lg hover:opacity-90"
      >
        Save Changes
      </button>
    </form>
  );
}
