"use client";
import { useEffect } from "react";
import { auth, db } from "@/lib/firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";

export default function MigrateWords() {
  useEffect(() => {
    const migrate = async () => {
      const user = auth.currentUser;
      if (!user) return;

      const ref = doc(db, "archives", user.uid);
      const snap = await getDoc(ref);

      if (snap.exists()) {
        const data = snap.data();
        const oldWords: string[] = data.words || [];

        if (oldWords.length > 0) {
          await updateDoc(ref, {
            HSK1: oldWords,   // ใส่ลงใน HSK1 หรืออื่นๆ ตามต้องการ
            words: [],        // clear field เก่า
          });
          console.log("✅ Migrate เสร็จแล้ว");
        } else {
          console.log("⛔ ไม่มี words ให้ migrate");
        }
      }
    };

    migrate();
  }, []);

  return <p className="text-center text-sm text-gray-500 mt-6">กำลัง migrate คำเดิมไป HSK1...</p>;
}
