import type { ReactNode } from 'react';

export default function FullscreenLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <main className="min-h-screen">{children}</main>;
}
