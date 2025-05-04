import { BookOpen, Search, Repeat2, Archive, Globe, ArrowRightCircle } from 'lucide-react';
import Link from 'next/link';

const menuItems = [
  { label: 'เริ่มเรียน HSK1', icon: <BookOpen className="w-6 h-6" />, href: '/hsk1' },
  { label: 'สุ่มคำศัพท์', icon: <Repeat2 className="w-6 h-6" />, href: '/all/random' },
  { label: 'คำตรงข้าม', icon: <ArrowRightCircle className="w-6 h-6" />, href: '/all/opposite' },
  { label: 'คลังคำที่เรียนแล้ว', icon: <Archive className="w-6 h-6" />, href: '/archived' },
  { label: 'คำศัพท์ทั้งหมด', icon: <Search className="w-6 h-6" />, href: '/all' },
];

export default function LandingPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10 space-y-8">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold">ຍິນດີຕ້ອນຮັບເຂົ້າສູ່ HSK Learn</h1>
        <p className="text-gray-600">เรียนรู้คำศัพท์ภาษาจีนทุกระดับ พร้อมฝึกซ้อมได้ทุกที่</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {menuItems.map(({ label, icon, href }) => (
          <Link key={label} href={href} className="flex items-center gap-3 border rounded-lg p-4 hover:bg-gray-50 transition">
            <div className="text-blue-500">{icon}</div>
            <div className="font-medium">{label}</div>
          </Link>
        ))}
      </div>
    </div>
  );
}
