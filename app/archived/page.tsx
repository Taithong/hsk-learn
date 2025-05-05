'use client';

import { useEffect, useState } from 'react';
import { auth, db } from '@/lib/firebase';
import {
  doc,
  getDoc,
  updateDoc,
} from 'firebase/firestore';
import hsk1 from '@/data/hsk1.json';
import hsk2 from '@/data/hsk2.json';
import hsk3 from '@/data/hsk3.json';
import hsk4 from '@/data/hsk4.json';
import { Word } from '@/types';

const levelMap = {
  HSK1: hsk1,
  HSK2: hsk2,
  HSK3: hsk3,
  HSK4: hsk4,
};

const filters = ['all', 'HSK1', 'HSK2', 'HSK3', 'HSK4'];

export default function ArchivedPage() {
  const [filter, setFilter] = useState<'all' | 'HSK1' | 'HSK2' | 'HSK3' | 'HSK4'>('all');
  const [archivedWords, setArchivedWords] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  // โหลดคำที่ archive จาก Firestore
  useEffect(() => {
    const fetchData = async () => {
      const user = auth.currentUser;
      if (!user) return;

      const docRef = doc(db, 'archives', user.uid);
      const snap = await getDoc(docRef);
      if (snap.exists()) {
        const data = snap.data();
        if (filter === 'all') {
          const all = [
            ...(data.HSK1 || []),
            ...(data.HSK2 || []),
            ...(data.HSK3 || []),
            ...(data.HSK4 || []),
          ];
          setArchivedWords(all);
        } else {
          setArchivedWords(data[filter] || []);
        }
      }

      setLoading(false);
    };

    fetchData();
  }, [filter]);

  const handleUnarchive = async (hanzi: string) => {
    const user = auth.currentUser;
    if (!user) return;

    const docRef = doc(db, 'archives', user.uid);
    const snap = await getDoc(docRef);
    if (!snap.exists()) return;

    const data = snap.data();
    const targetLevel = filter === 'all'
      ? Object.entries(data).find(([_, list]) => (list as string[]).includes(hanzi))?.[0]
      : filter;

    if (!targetLevel || !data[targetLevel]) return;

    const updated = (data[targetLevel] as string[]).filter((w) => w !== hanzi);
    await updateDoc(docRef, { [targetLevel]: updated });

    setArchivedWords((prev) => prev.filter((w) => w !== hanzi));
  };

  // รวมคำที่มี level
  const allWords: Word[] = [
    ...hsk1.map((w) => ({ ...w, level: 'HSK1' })),
    ...hsk2.map((w) => ({ ...w, level: 'HSK2' })),
    ...hsk3.map((w) => ({ ...w, level: 'HSK3' })),
    ...hsk4.map((w) => ({ ...w, level: 'HSK4' })),
  ];

  const displayWords = allWords.filter(
    (word) => archivedWords.includes(word.hanzi)
  );

  return (
    <div className="space-y-6 max-w-5xl mx-auto p-4">
      <h2 className="text-2xl font-semibold text-center">Archived Words</h2>

      {/* Filter Buttons */}
      <div className="flex flex-wrap justify-center gap-3">
        {filters.map((lv) => (
          <button
            key={lv}
            onClick={() => setFilter(lv as any)}
            className={`px-4 py-1 rounded-full border text-sm font-medium transition ${
              filter === lv
                ? 'bg-black text-white'
                : 'bg-white text-black border-gray-300 hover:border-black'
            }`}
          >
            {lv === 'all' ? 'All Levels' : lv}
          </button>
        ))}
      </div>

      {/* Word Table */}
      {loading ? (
        <p className="text-center text-gray-500">กำลังโหลด...</p>
      ) : displayWords.length === 0 ? (
        <p className="text-center text-gray-400 py-10">ยังไม่มีคำที่บันทึกไว้</p>
      ) : (
        <div className="bg-gray-100 rounded-md p-4 overflow-auto">
          <p className="text-sm text-gray-600 mb-2">
            ทั้งหมด {displayWords.length} คำ
          </p>
          <table className="w-full text-sm text-left">
            <thead className="bg-white text-gray-700 border-b">
              <tr>
                <th className="px-3 py-2">HSK</th>
                <th className="px-3 py-2">汉子</th>
                <th className="px-3 py-2">拼音</th>
                <th className="px-3 py-2">ความหมาย</th>
                <th className="px-3 py-2">ลบออก</th>
              </tr>
            </thead>
            <tbody>
              {displayWords.map((word) => (
                <tr key={word.hanzi} className="border-b hover:bg-white/50">
                  <td className="px-3 py-2 text-xs text-gray-500 font-medium">
                    {word.level}
                  </td>
                  <td className="px-3 py-2 font-bold text-xl text-gray-800">
                    {word.hanzi}
                  </td>
                  <td className="px-3 py-2 text-base text-gray-700">{word.pinyin}</td>
                  <td className="px-3 py-2 text-sm text-gray-600">{word.meaning}</td>
                  <td className="px-3 py-2">
                    <button
                      onClick={() => handleUnarchive(word.hanzi)}
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
      )}
    </div>
  );
}
