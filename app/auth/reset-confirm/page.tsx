'use client';
export const dynamic = 'force-dynamic'; // ป้องกัน prerender error ใน Netlify

import { useEffect, useState } from "react";
import { confirmPasswordReset } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useRouter, useSearchParams } from "next/navigation";

export default function ResetConfirmPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const oobCode = searchParams.get("oobCode");

  const handleReset = async () => {
    if (!oobCode) {
      setError("ไม่พบรหัสยืนยันในลิงก์");
      return;
    }
    try {
      await confirmPasswordReset(auth, oobCode, password);
      setMessage("รีเซ็ตรหัสผ่านสำเร็จ! กำลังเปลี่ยนเส้นทาง...");
      setTimeout(() => router.push("/auth/login"), 2000);
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 space-y-4">
      <h2 className="text-xl font-semibold text-center">รีเซ็ตรหัสผ่านใหม่</h2>
      <input
        className="w-full border px-3 py-2 rounded"
        type="password"
        placeholder="รหัสผ่านใหม่"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button
        onClick={handleReset}
        className="w-full bg-blue-600 text-white py-2 rounded"
      >
        ยืนยันรีเซ็ต
      </button>
      {message && <p className="text-green-600 text-sm text-center">{message}</p>}
      {error && <p className="text-red-600 text-sm text-center">{error}</p>}
    </div>
  );
}
