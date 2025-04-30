'use client';
import hsk3 from '@/data/hsk3.json';
import WordRandomizer from '@/components/WordRandomizer';

export default function HSK3RandomPage() {
  return <WordRandomizer data={hsk3} title="HSK 3 - สุ่มคำศัพท์" />;
}