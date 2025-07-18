"use client";

interface Props {
  label: string;
  value: string;
  onChange?: (val: string) => void; // เปลี่ยนเป็น optional
  disabled?: boolean;
}

export default function TextInput({ label, value, onChange, disabled = false }: Props) {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        disabled={disabled}
        className={`w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500
          ${disabled ? "bg-gray-200 cursor-not-allowed" : ""}
        `}
      />
    </div>
  );
}
