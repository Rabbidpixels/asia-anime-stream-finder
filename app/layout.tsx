import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'Asia Anime Stream Finder',
  description: 'Find where to stream your favorite anime across multiple platforms',
  keywords: ['anime', 'streaming', 'finder', 'watch anime'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning className={inter.variable}>
      <body className="flex flex-col min-h-screen font-sans">{children}</body>
    </html>
  );
}
