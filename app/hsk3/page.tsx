import hsk3 from '@/data/hsk3.json';
import WordRandomizer from '@/components/WordRandomizer';

export default function HSK3RandomPage() {
  return <WordRandomizer data={hsk3} title="สุ่มคำศัพท์ HSK3" level="HSK3" />;
}