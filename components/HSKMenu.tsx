interface MenuItem {
  label: string;
  path: string;
  disabled?: boolean;
}

interface HSKMenuProps {
  level: string; // "hsk1", "hsk2", etc.
  title: string;
  description?: string;
}

const baseMenuItems: MenuItem[] = [
  { label: 'การสุ่มคำ', path: 'random' },
  { label: 'คำตรงข้าม', path: 'opposite' },
  { label: 'ไวยากรณ์', path: 'grammar', disabled: true },
  { label: 'สร้างประโยค', path: 'sentence', disabled: true },
  { label: 'คำแบ่งตามกลุ่ม', path: 'groups', disabled: true },
  { label: 'คำที่ออกเสียงเหมือนกัน', path: 'similar-pronounce', disabled: true },
  { label: 'หนึ่งคำใช้ได้หลายสถานะการ', path: 'multi-usage', disabled: true },
  { label: 'คำที่มีความหมายเดียวกัน', path: 'synonym', disabled: true },
  { label: 'แต่งบทเรื่อง', path: 'story', disabled: true },
];

export default function HSKMenu({ level, title, description }: HSKMenuProps) {
  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div>
        <h1 className="text-xl font-bold">{title}</h1>
        {description && <p className="text-sm text-gray-500">{description}</p>}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {baseMenuItems.map(item => (
          <a
            key={item.label}
            href={`/${level}/${item.path}`}
            className={`border rounded-lg px-4 py-3 text-center font-semibold transition ${
              item.disabled ? 'text-gray-400 border-gray-200 cursor-not-allowed' : 'hover:bg-gray-100'
            }`}
          >
            {item.label}
          </a>
        ))}
      </div>
    </div>
  );
}
