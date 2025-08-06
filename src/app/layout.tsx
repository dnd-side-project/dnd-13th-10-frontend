import type { Metadata } from 'next';
import localFont from 'next/font/local';

import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import '@/styles/globals.css';

import QueryClientProvider from './QueryClientProvider';
import NextAuthProvider from './NextAuthProvider';

const pretendard = localFont({
  src: './fonts/PretendardVariable.woff2',
  variable: '--font-pretendard',
  weight: '45 920',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'SEED',
  description:
    '면접 경험이 단순한 실패나 성공으로 끝나지 않고, 다음 도전을 위한 씨앗이 되기를',
  creator: 'DND 13기 10조 프론트엔드',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={`${pretendard.variable} font-pretendard antialiased`}>
        <NextAuthProvider>
          <QueryClientProvider>
            <div className="mx-auto flex min-h-screen w-full max-w-[600px] flex-col bg-white shadow-2xl">
              {children}
            </div>
            <ReactQueryDevtools />
          </QueryClientProvider>
        </NextAuthProvider>
      </body>
    </html>
  );
}
