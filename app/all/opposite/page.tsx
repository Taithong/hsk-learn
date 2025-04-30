import OppositeWords from '@/components/OppositeWords';
import allOpposite from '@/data/all_opposite.json';

export default function AllOppositePage() {
  return <OppositeWords data={allOpposite} title="คำตรงข้ามจากทุกระดับ HSK" />;
}
