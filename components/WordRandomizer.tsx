"use client";
import { useEffect, useState, useMemo } from "react";
import { Eye } from "lucide-react";

export interface Word {
  hanzi: string;
  pinyin: string;
  meaning: string;
  level?: string;
}

interface WordRandomizerProps {
  data: Word[];
  title: string;
}

export default function WordRandomizer({ data, title }: WordRandomizerProps) {
  const [tab, setTab] = useState<"pinyin" | "hanzi" | "both">("pinyin");
  const [words, setWords] = useState<Word[]>([]);
  const [show, setShow] = useState(false);
  const [archived, setArchived] = useState<Set<string>>(new Set());
  const [filter, setFilter] = useState("");
  const [sortKey, setSortKey] = useState("");

  useEffect(() => {
    const stored = localStorage.getItem("archivedWords");
    if (stored) {
      setArchived(new Set(JSON.parse(stored)));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("archivedWords", JSON.stringify(Array.from(archived)));
  }, [archived]);

  useEffect(() => {
    if (tab === "both") {
      const filtered = data.filter(
        (w) =>
          w.hanzi.includes(filter) ||
          w.pinyin.toLowerCase().includes(filter.toLowerCase()) ||
          w.meaning.toLowerCase().includes(filter.toLowerCase())
      );
      const sorted =
        sortKey === "hanzi"
          ? [...filtered].sort((a, b) => a.hanzi.localeCompare(b.hanzi))
          : sortKey === "pinyin"
          ? [...filtered].sort((a, b) => a.pinyin.localeCompare(b.pinyin))
          : filtered;
      setWords(sorted);
    } else {
      setWords([]); // reset เมื่อเปลี่ยน tab
    }
  }, [tab, filter, sortKey, data]);

  const randomWords = () => {
    const base = data.filter((w) => !archived.has(w.hanzi));
    const shuffled = [...base].sort(() => 0.5 - Math.random());
    setWords(shuffled.slice(0, 5));
  };

  const archiveWord = (hanzi: string) => {
    setArchived((prev) => {
      const next = new Set(prev).add(hanzi);
      localStorage.setItem("archivedWords", JSON.stringify(Array.from(next)));
      if (tab !== "both") {
        setWords((current) => current.filter((w) => w.hanzi !== hanzi));
      }
      return next;
    });
  };

  const totalAvailable = useMemo(
    () => data.filter((w) => !archived.has(w.hanzi)).length,
    [archived, data]
  );

  return (
    <div className="space-y-6">
      <button
        onClick={() => history.back()}
        className="text-sm text-blue-500 hover:underline"
      >
        ← กลับ
      </button>
      <div className="text-center text-2xl font-semibold">{title}</div>
      <div className="flex justify-center space-x-6 border-b border-gray-300 pb-2">
        <button
          onClick={() => {
            setTab("pinyin");
            setShow(false);
          }}
          className={`pb-1 ${
            tab === "pinyin"
              ? "border-b-2 border-black font-medium"
              : "text-gray-500"
          }`}
        >
          สุ่ม Pin Yin
        </button>
        <button
          onClick={() => {
            setTab("hanzi");
            setShow(false);
          }}
          className={`pb-1 ${
            tab === "hanzi"
              ? "border-b-2 border-black font-medium"
              : "text-gray-500"
          }`}
        >
          สุ่มตัวอักษรจีน
        </button>
        <button
          onClick={() => {
            setTab("both");
            setShow(true);
          }}
          className={`pb-1 ${
            tab === "both"
              ? "border-b-2 border-black font-medium"
              : "text-gray-500"
          }`}
        >
          สุ่มแสดงทั้งหมด
        </button>
      </div>

      {(tab === "pinyin" || tab === "hanzi") && (
        <div className="flex flex-col items-center gap-2">
          <button
            onClick={randomWords}
            className="bg-red-500 text-white rounded px-6 py-2 text-lg font-semibold"
          >
            สุ่ม
          </button>
          <button
            onClick={() => setShow(!show)}
            className="flex items-center gap-2 text-sm text-black"
          >
            <Eye className="w-4 h-4" /> แสดง/ปิด{" "}
            {tab === "pinyin" ? "Hanzi" : "Pin Yin"}
          </button>
          <p className="text-sm text-gray-500">
            Archived {archived.size} คำ / เหลือให้สุ่มอีก {totalAvailable} คำ
          </p>
        </div>
      )}

      {tab === "both" && (
        <div className="flex justify-between items-center mb-4">
          <input
            type="text"
            placeholder="ค้นหา..."
            className="border px-2 py-1 rounded text-sm"
            onChange={(e) => setFilter(e.target.value)}
          />
          <select
            className="text-sm border rounded px-2 py-1"
            onChange={(e) => setSortKey(e.target.value)}
          >
            <option value="">เรียงตาม...</option>
            <option value="hanzi">Hanzi</option>
            <option value="pinyin">Pinyin</option>
          </select>
        </div>
      )}

      <div className="bg-gray-100 rounded-md p-4 overflow-auto">
        {tab === "both" ? (
          <div>
            <p className="text-center font-medium mb-4">
              จำนวนคำทั้งหมด: {words.length}
            </p>
            <table className="w-full text-sm text-left">
              <thead className="bg-white text-gray-700 border-b">
                <tr>
                  <th className="px-3 py-2">
                    <input type="checkbox" disabled />
                  </th>
                  <th className="px-3 py-2">汉子</th>
                  <th className="px-3 py-2">拼音</th>
                  <th className="px-3 py-2">ความหมาย</th>
                </tr>
              </thead>
              <tbody>
                {words.map((word) => (
                  <tr key={word.hanzi} className="border-b hover:bg-white/40">
                    <td className="px-3 py-2">
                      <input type="checkbox" />
                    </td>
                    <td className="px-3 py-2 font-medium text-gray-900">
                      {word.hanzi}
                    </td>
                    <td className="px-3 py-2">{word.pinyin}</td>
                    <td className="px-3 py-2">{word.meaning}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className={`grid ${show ? "grid-cols-3" : "grid-cols-2"} gap-4`}>
            <div>
              {words.map((word) => (
                <div key={word.hanzi} className="flex justify-between py-1">
                  <button
                    onClick={() => archiveWord(word.hanzi)}
                    className="text-xs text-gray-700 hover:text-blue-500"
                  >
                    ❌
                  </button>
                  <span className="text-lg font-medium">
                    {tab === "pinyin" ? word.pinyin : word.hanzi}
                  </span>
                </div>
              ))}
            </div>
            {show && (
              <div className="bg-blue-100 rounded p-1">
                {words.map((word) => (
                  <div key={word.hanzi} className="text-xl text-center mb-2">
                    {tab === "pinyin" ? word.hanzi : word.pinyin}
                  </div>
                ))}
              </div>
            )}
            <div>
              {words.map((word) => (
                <div key={word.hanzi} className="text-lg mb-2">
                  {word.meaning}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}