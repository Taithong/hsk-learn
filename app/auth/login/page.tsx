"use client";
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/");
    } catch (err: any) {
      setError("อีเมลหรือรหัสผ่านไม่ถูกต้อง");
    }
  };

  return (
    <div className="max-w-md mx-auto space-y-4 p-6">
      <h2 className="text-xl font-semibold text-center">เข้าสู่ระบบ</h2>
      <input
        className="w-full border px-3 py-2 rounded"
        placeholder="อีเมล"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        className="w-full border px-3 py-2 rounded"
        type="password"
        placeholder="รหัสผ่าน"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin} className="w-full bg-blue-600 text-white py-2 rounded">
        เข้าสู่ระบบ
      </button>
      <p className="text-sm text-right">
        <a href="/auth/reset" className="text-blue-500 hover:underline">ลืมรหัสผ่าน?</a>
      </p>
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
}