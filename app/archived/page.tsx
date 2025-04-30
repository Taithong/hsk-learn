'use client';
import { useEffect, useState } from 'react';
import hsk1 from '@/data/hsk1.json';
import hsk2 from '@/data/hsk2.json';
import hsk3 from '@/data/hsk3.json';
import hsk4 from '@/data/hsk4.json';

interface Word {
  hanzi: string;
  pinyin: string;
  meaning: string;
  level: string;
}

const allWords: Word[] = [
  ...hsk1.map(w => ({ ...w, level: 'HSK1' })),
  ...hsk2.map(w => ({ ...w, level: 'HSK2' })),
  ...hsk3.map(w => ({ ...w, level: 'HSK3' })),
  ...hsk4.map(w => ({ ...w, level: 'HSK4' })),
];

export default function ArchivedPage() {
  const [archivedSet, setArchivedSet] = useState<Set<string>>(new Set());
  const [filter, setFilter] = useState<string>('all');

  useEffect(() => {
    const stored = localStorage.getItem('archivedWords');
    if (stored) {
      setArchivedSet(new Set(JSON.parse(stored)));
    }
  }, []);

  const unarchive = (hanzi: string) => {
    const updated = new Set(archivedSet);
    updated.delete(hanzi);
    setArchivedSet(updated);
    localStorage.setItem('archivedWords', JSON.stringify(Array.from(updated)));
  };

  const filteredWords = allWords.filter(word =>
    archivedSet.has(word.hanzi) && (filter === 'all' || word.level === filter)
  );

  const filters = ['all', 'HSK1', 'HSK2', 'HSK3', 'HSK4'];

  return (
    <div className="space-y-6 max-w-5xl mx-auto p-4">
      <h2 className="text-2xl font-semibold text-center">Archived Words</h2>

      {/* Filter Buttons */}
      <div className="flex flex-wrap justify-center gap-3">
        {filters.map(lv => (
          <button
            key={lv}
            className={`px-4 py-1 rounded-full border text-sm transition font-medium ${
              filter === lv ? 'bg-black text-white' : 'bg-white text-black border-gray-300 hover:border-black'
            }`}
            onClick={() => setFilter(lv)}
          >
            {lv === 'all' ? 'All Levels' : lv}
          </button>
        ))}
      </div>

      {/* Word Table */}
      <div className="bg-gray-100 rounded-md p-4 overflow-auto">
        <table className="w-full text-sm text-left">
          <thead className="bg-white text-gray-700 border-b">
            <tr>
              <th className="px-3 py-2">HSK</th>
              <th className="px-3 py-2">汉子</th>
              <th className="px-3 py-2">拼音</th>
              <th className="px-3 py-2">ความหมาย</th>
              <th className="px-3 py-2">ยกเลิก</th>
            </tr>
          </thead>
          <tbody>
            {filteredWords.map(word => (
              <tr key={word.hanzi} className="border-b hover:bg-white/50">
                <td className="px-3 py-2 text-xs text-gray-500 font-medium">{word.level}</td>
                <td className="px-3 py-2 font-bold text-xl text-gray-800">{word.hanzi}</td>
                <td className="px-3 py-2 text-base text-gray-700">{word.pinyin}</td>
                <td className="px-3 py-2 text-sm text-gray-600">{word.meaning}</td>
                <td className="px-3 py-2">
                  <button
                    onClick={() => unarchive(word.hanzi)}
                    className="text-xs text-red-500 hover:underline"
                  >
                    ลบออก
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
