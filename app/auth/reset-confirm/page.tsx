"use client";
import { useEffect, useState } from "react";
import { confirmPasswordReset } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useRouter, useSearchParams } from "next/navigation";

export default function ResetConfirmPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const oobCode = searchParams.get("oobCode");

  const [newPassword, setNewPassword] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleReset = async () => {
    if (!oobCode) {
      setError("ลิงก์ไม่ถูกต้องหรือหมดอายุ");
      return;
    }

    try {
      await confirmPasswordReset(auth, oobCode, newPassword);
      setSuccess(true);
      setError("");
      setTimeout(() => router.push("/auth/login"), 2500);
    } catch (err: any) {
      setError("เกิดข้อผิดพลาด: " + err.message);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 space-y-4">
      <h2 className="text-xl font-semibold text-center">ตั้งรหัสผ่านใหม่</h2>
      {success ? (
        <p className="text-green-600 text-center">ตั้งรหัสผ่านใหม่เรียบร้อย กำลังนำไปหน้าเข้าสู่ระบบ...</p>
      ) : (
        <>
          <input
            className="w-full border px-3 py-2 rounded"
            type="password"
            placeholder="รหัสผ่านใหม่"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <button
            onClick={handleReset}
            className="w-full bg-blue-600 text-white py-2 rounded"
          >
            ยืนยันรหัสผ่านใหม่
          </button>
          {error && <p className="text-red-500 text-sm">{error}</p>}
        </>
      )}
    </div>
  );
}