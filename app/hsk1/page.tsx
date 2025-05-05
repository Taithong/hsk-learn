// app/hsk1/random/page.tsx
'use client';

import hsk1 from '@/data/hsk1.json';
import WordRandomizer from '@/components/WordRandomizer';

export default function HSK1RandomPage() {
  return <WordRandomizer data={hsk1} title="สุ่มคำศัพท์ HSK1" level="HSK1" />;
}
