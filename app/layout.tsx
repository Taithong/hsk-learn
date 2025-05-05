import './globals.css';
import { Noto_Sans_Thai } from 'next/font/google';
import { Noto_Sans_SC } from 'next/font/google';
import Header from '@/components/Header';
import { Toaster } from 'react-hot-toast';

const notoThai = Noto_Sans_Thai({ subsets: ['thai'], variable: '--font-thai' });
const notoSC = Noto_Sans_SC({ subsets: ['latin'], variable: '--font-chinese' });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="th" className={`${notoThai.variable} ${notoSC.variable}`}>
      <body className="bg-gray-50 min-h-screen text-gray-900 font-thai text-sm sm:text-base">
      <Toaster position="top-center" /> 
        <Header />
        <main className="pt-[80px] px-4 max-w-6xl mx-auto">
          {children}
        </main>
      </body>
    </html>
  );
}
