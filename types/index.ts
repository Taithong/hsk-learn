// types/index.ts
export interface Word {
  hanzi: string;
  pinyin: string;
  meaning: string;
  level?: string;
}

export interface WordPair {
  word: string;
  opposite: string;
  meaning: string;
  level?: string;
}
