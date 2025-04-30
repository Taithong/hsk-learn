import OppositeWords from '@/components/OppositeWords';
import hsk3Opposite from '@/data/hsk3_opposite.json';

export default function HSK3OppositePage() {
  return <OppositeWords data={hsk3Opposite} title="คำตรงข้ามระดับ HSK3" />;
}