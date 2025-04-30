import './globals.css';
import { Noto_Sans_Thai } from 'next/font/google';
import { Noto_Sans_SC } from 'next/font/google';

const notoThai = Noto_Sans_Thai({ subsets: ['thai'], variable: '--font-thai' });
const notoSC = Noto_Sans_SC({ subsets: ['latin'], variable: '--font-chinese' });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="th" className={`${notoThai.variable} ${notoSC.variable}`}>
      <body className="bg-gray-50 min-h-screen text-gray-900 font-thai">
        <header className="fixed top-0 left-0 right-0 bg-white shadow z-50">
          <nav className="max-w-6xl mx-auto p-4">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
            <a href="/" className="font-bold text-xl hover:underline">HSK Learn</a>
              <div className="flex flex-wrap gap-3 text-sm">
                <a href="/hsk1" className="hover:underline">HSK1</a>
                <a href="/hsk2" className="hover:underline">HSK2</a>
                <a href="/hsk3" className="hover:underline">HSK3</a>
                <a href="/hsk4" className="hover:underline">HSK4</a>
                <a href="/all" className="hover:underline">All Level</a>
                <a href="/archived" className="hover:underline">Archived</a>
              </div>
            </div>
          </nav>
        </header>
        <main className="pt-24 px-4 max-w-6xl mx-auto">
          {children}
        </main>
      </body>
    </html>
  );
}
