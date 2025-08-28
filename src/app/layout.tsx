import '@/styles/globals.css';

import type { Metadata } from 'next';
import localFont from 'next/font/local';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import QueryClientProvider from './QueryClientProvider';
import AuthRefreshManager from '@/components/AuthRefreshManager';

const pretendard = localFont({
  src: './fonts/PretendardVariable.woff2',
  variable: '--font-pretendard',
  weight: '45 920',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'SEED',
    template: '%s | SEED',
  },
  description:
    '면접 경험이 단순한 실패나 성공으로 끝나지 않고, 다음 도전을 위한 씨앗이 되기를',
  creator: 'DND 13기 10조 프론트엔드',
  // metadataBase: new URL(배포주소),
  openGraph: {
    type: 'website',
    locale: 'ko_KR',
    siteName: 'SEED',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={`${pretendard.variable} font-pretendard antialiased`}>
        <QueryClientProvider>
          <div className="bg-foundation-bg max-w-maxWidth mx-auto min-h-screen text-white">
            <AuthRefreshManager leadSeconds={60} />
            {children}
          </div>
          <ReactQueryDevtools />
        </QueryClientProvider>
      </body>
    </html>
  );
}
