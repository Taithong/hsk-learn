// app/auth/reset-confirm/page.tsx
'use client';
export const dynamic = 'force-dynamic';

import { Suspense } from "react";
import ResetConfirmContent from "./ResetConfirmContent";

export default function ResetConfirmPage() {
  return (
    <Suspense fallback={<p className="text-center mt-10">กำลังโหลด...</p>}>
      <ResetConfirmContent />
    </Suspense>
  );
}
