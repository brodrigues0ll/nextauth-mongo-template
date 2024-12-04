"use client";

export default function Input({ type, placeholder, value, onChange }) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="border-2 border-zinc-300 rounded-lg p-2"
    />
  );
}
