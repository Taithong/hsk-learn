import OppositeWords from '@/components/OppositeWords';
import hsk4Opposite from '@/data/hsk4_opposite.json';

export default function HSK4OppositePage() {
  return <OppositeWords data={hsk4Opposite} title="คำตรงข้ามระดับ HSK4" />;
}