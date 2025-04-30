import OppositeWords from '@/components/OppositeWords';
import hsk1Opposite from '@/data/hsk1_opposite.json';

export default function HSK1OppositePage() {
  return <OppositeWords data={hsk1Opposite} title="คำตรงข้ามระดับ HSK1" />;
}
