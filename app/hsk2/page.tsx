import hsk2 from '@/data/hsk2.json';
import WordRandomizer from '@/components/WordRandomizer';

export default function HSK2RandomPage() {
  return <WordRandomizer data={hsk2} title="สุ่มคำศัพท์ HSK2" level="HSK2" />;
}