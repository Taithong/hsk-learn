"use client";
import { useEffect, useState } from "react";

export interface WordPair {
  word: string;
  opposite: string;
  meaning: string;
  level?: string;
}

interface OppositeWordsProps {
  data: WordPair[];
  title: string;
}

export default function OppositeWords({ data, title }: OppositeWordsProps) {
  const [filter, setFilter] = useState("");

  const filtered = data.filter(
    (pair) =>
      pair.word.includes(filter) ||
      pair.opposite.includes(filter) ||
      pair.meaning.includes(filter)
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
          placeholder="ค้นหาคำ..."
          className="border px-3 py-1 rounded text-sm"
          onChange={(e) => setFilter(e.target.value)}
        />
      </div>

      <table className="w-full bg-white text-sm text-left border rounded overflow-hidden">
        <thead className="bg-gray-100 border-b">
          <tr>
            <th className="px-3 py-2">คำ</th>
            <th className="px-3 py-2">คำตรงข้าม</th>
            <th className="px-3 py-2">ความหมาย</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((pair, index) => (
            <tr key={index} className="border-b hover:bg-gray-50">
              <td className="px-3 py-2 font-medium font-chinese">
                {pair.word}
              </td>
              <td className="px-3 py-2 font-chinese">{pair.opposite}</td>
              <td className="px-3 py-2">{pair.meaning}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {filtered.length === 0 && (
        <p className="text-center text-gray-400 py-6">ไม่พบคำที่ค้นหา</p>
      )}
    </div>
  );
}
