"use client";
import { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";

export default function ResetPage() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleReset = async () => {
    setError("");
    setStatus("");

    try {
      const actionCodeSettings = {
        url: "https://hsklearn.netlify.app/auth/reset-confirm", // เปลี่ยนเป็น production domain เมื่อเผยแพร่
        handleCodeInApp: true,
      };
      await sendPasswordResetEmail(auth, email, actionCodeSettings);
      router.push("/auth/reset-confirm");
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 space-y-4">
      <h2 className="text-xl font-semibold text-center">ลืมรหัสผ่าน</h2>
      <input
        className="w-full border px-3 py-2 rounded"
        placeholder="อีเมลของคุณ"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button
        onClick={handleReset}
        className="w-full bg-blue-600 text-white py-2 rounded"
      >
        ส่งลิงก์รีเซ็ตรหัสผ่าน
      </button>
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
}
