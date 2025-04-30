'use client';
import hsk2 from '@/data/hsk2.json';
import WordRandomizer from '@/components/WordRandomizer';

export default function HSK1RandomPage() {
  return <WordRandomizer data={hsk2} title="HSK 2 - สุ่มคำศัพท์" />;
}