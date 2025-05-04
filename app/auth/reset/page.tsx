// app/auth/reset/page.tsx
"use client";
import { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "@/lib/firebase";

export default function ResetPasswordPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleReset = async () => {
    try {
      await sendPasswordResetEmail(auth, email, {
        url: "http://localhost:3000/auth/reset-confirm", // เปลี่ยนเป็นโดเมนจริงหาก deploy แล้ว
      });
      setMessage("ลิงก์รีเซ็ตรหัสผ่านถูกส่งไปที่อีเมลของคุณแล้ว");
      setError("");
    } catch (err: any) {
      setError(err.message);
      setMessage("");
    }
  };

  return (
    <div className="max-w-md mx-auto space-y-4 p-6">
      <h2 className="text-xl font-semibold text-center">ลืมรหัสผ่าน</h2>
      <input
        className="w-full border px-3 py-2 rounded"
        placeholder="กรอกอีเมล"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button
        onClick={handleReset}
        className="w-full bg-blue-600 text-white py-2 rounded"
      >
        ส่งลิงก์รีเซ็ตรหัสผ่าน
      </button>
      {message && <p className="text-green-600 text-sm">{message}</p>}
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
}
