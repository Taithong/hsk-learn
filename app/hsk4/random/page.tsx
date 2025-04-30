'use client';
import hsk4 from '@/data/hsk4.json';
import WordRandomizer from '@/components/WordRandomizer';

export default function HSK4RandomPage() {
  return <WordRandomizer data={hsk4} title="HSK 4 - สุ่มคำศัพท์" />;
}