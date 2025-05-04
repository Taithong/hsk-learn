// types.ts

// คำศัพท์แต่ละคำ
export interface Word {
  hanzi: string;
  pinyin: string;
  meaning: string;
  level?: string; // เช่น HSK1, HSK2, ...
}

// สำหรับคำตรงกันข้าม
export interface WordPair {
  word: string;
  opposite: string;
  meaning: string;
  level?: string;
}

// ผู้ใช้ (เสริมไว้ เผื่อใช้งานต่อ)
export interface UserProfile {
  uid: string;
  email: string;
  displayName?: string;
  archivedWords: string[];
}
