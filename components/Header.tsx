// components/Header.tsx
"use client";
import { useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Header() {
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    return onAuthStateChanged(auth, setUser);
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    router.push("/auth/login");
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-white shadow z-50">
      <nav className="max-w-6xl mx-auto p-4">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
          <a href="/" className="font-bold text-xl hover:underline">HSK Learn</a>
          <div className="flex flex-wrap gap-3 text-sm items-center">
            <Link href="/hsk1" className="hover:underline">HSK1</Link>
            <Link href="/hsk2" className="hover:underline">HSK2</Link>
            <Link href="/hsk3" className="hover:underline">HSK3</Link>
            <Link href="/hsk4" className="hover:underline">HSK4</Link>
            <Link href="/all" className="hover:underline">All Level</Link>
            <Link href="/archived" className="hover:underline">Archived</Link>
            {user ? (
              <>
                <span className="text-xs text-gray-600">{user.displayName || user.email}</span>
                <button onClick={handleLogout} className="text-red-500 hover:underline text-xs">ออกจากระบบ</button>
              </>
            ) : (
                <>
                <Link href="/auth/login" className="text-blue-600 hover:underline">เข้าสู่ระบบ</Link>
                <Link href="/auth/register" className="text-green-600 hover:underline">สมัครสมาชิก</Link>
              </>
              
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}
