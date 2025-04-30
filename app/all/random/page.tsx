'use client';
import hsk1 from '@/data/hsk1.json';
import hsk2 from '@/data/hsk2.json';
import hsk3 from '@/data/hsk3.json';
import hsk4 from '@/data/hsk4.json';
import WordRandomizer from '@/components/WordRandomizer';

const allWordsData = [
  ...hsk1.map(w => ({ ...w, level: 'HSK1' })),
  ...hsk2.map(w => ({ ...w, level: 'HSK2' })),
  ...hsk3.map(w => ({ ...w, level: 'HSK3' })),
  ...hsk4.map(w => ({ ...w, level: 'HSK4' })),
];

export default function AllLevelPage() {
  return <WordRandomizer data={allWordsData} title="All Levels - สุ่มคำศัพท์" />;
}

