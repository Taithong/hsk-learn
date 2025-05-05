import hsk4 from '@/data/hsk4.json';
import WordRandomizer from '@/components/WordRandomizer';

export default function HSK4RandomPage() {
  return <WordRandomizer data={hsk4} title="สุ่มคำศัพท์ HSK4" level="HSK4" />;
}