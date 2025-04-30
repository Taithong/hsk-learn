import OppositeWords from '@/components/OppositeWords';
import hsk2Opposite from '@/data/hsk2_opposite.json';

export default function HSK2OppositePage() {
  return <OppositeWords data={hsk2Opposite} title="คำตรงข้ามระดับ HSK2" />;
}