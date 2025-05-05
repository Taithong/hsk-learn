'use client';
import { useEffect, useState } from 'react';
import { Word } from '@/types';
import { auth, db } from '@/lib/firebase';
import { doc, getDoc } from 'firebase/firestore';

interface ArchivedProps {
  data: Word[];
  title: string;
}

export default function Archived({ data, title }: ArchivedProps) {
  const [archived, setArchived] = useState<Set<string>>(new Set());
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const fetchArchived = async () => {
      const user = auth.currentUser;
      if (!user) return;

      const docRef = doc(db, 'archives', user.uid);
      const snap = await getDoc(docRef);
      if (snap.exists()) {
        const archivedWords: string[] = snap.data().words || [];
        setArchived(new Set(archivedWords));
      }
    };
    fetchArchived();
  }, []);

  const filteredWords = data.filter(
    (word) =>
      archived.has(word.hanzi) &&
      (word.hanzi.includes(filter) ||
        word.pinyin.toLowerCase().includes(filter.toLowerCase()) ||
        word.meaning.toLowerCase().includes(filter.toLowerCase()))
  );

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <button
        onClick={() => history.back()}
        className="text-sm text-blue-500 hover:underline"
      >
        ← กลับ
      </button>

      <h2 className="text-center text-2xl font-semibold">{title}</h2>

      <div className="flex justify-end mb-4">
        <input
          type="text"
          placeholder="ค้นหา..."
          className="border px-3 py-2 rounded text-sm w-full sm:w-1/2"
          onChange={(e) => setFilter(e.target.value)}
        />
      </div>

      <table className="w-full bg-white text-sm text-left border rounded overflow-hidden">
        <thead className="bg-gray-100 border-b">
          <tr>
            <th className="px-3 py-2">汉字</th>
            <th className="px-3 py-2">拼音</th>
            <th className="px-3 py-2">ความหมาย</th>
          </tr>
        </thead>
        <tbody>
          {filteredWords.map((word, idx) => (
            <tr key={idx} className="border-b hover:bg-gray-50">
              <td className="px-3 py-2 font-medium font-chinese">{word.hanzi}</td>
              <td className="px-3 py-2 font-chinese">{word.pinyin}</td>
              <td className="px-3 py-2">{word.meaning}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {filteredWords.length === 0 && (
        <p className="text-center text-gray-400 py-6">ยังไม่มีคำที่ Archive</p>
      )}
    </div>
  );
}
