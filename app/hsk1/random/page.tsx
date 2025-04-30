'use client';
import hsk1 from '@/data/hsk1.json';
import WordRandomizer from '@/components/WordRandomizer';

export default function HSK1RandomPage() {
  return <WordRandomizer data={hsk1} title="HSK 1 - สุ่มคำศัพท์" />;
}