"use client";
import { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleRegister = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(userCredential.user, { displayName });
      router.push("/");
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="max-w-md mx-auto space-y-4 p-6">
      <h2 className="text-xl font-semibold text-center">สมัครสมาชิก</h2>
      <input
        className="w-full border px-3 py-2 rounded"
        placeholder="ชื่อที่แสดง"
        value={displayName}
        onChange={(e) => setDisplayName(e.target.value)}
      />
      <input
        className="w-full border px-3 py-2 rounded"
        placeholder="อีเมล"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <div className="relative">
        <input
          className="w-full border px-3 py-2 rounded"
          type={showPassword ? "text" : "password"}
          placeholder="รหัสผ่าน"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-2 text-xs text-blue-500"
        >
          {showPassword ? "ซ่อน" : "แสดง"}
        </button>
      </div>
      <button onClick={handleRegister} className="w-full bg-blue-600 text-white py-2 rounded">
        สมัคร
      </button>
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
}