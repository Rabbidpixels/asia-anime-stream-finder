import type { Metadata } from 'next';
import './globals.css';

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
    <html suppressHydrationWarning>
      <body className="flex flex-col min-h-screen">{children}</body>
    </html>
  );
}
