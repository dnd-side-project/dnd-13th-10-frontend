import NavigationBar from '@/components/layout/NavigationBar';

export default function RootGroupLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <main className="pb-nav-total overflow-y-auto">{children}</main>
      <div className="max-w-maxWidth fixed bottom-0 left-1/2 w-full -translate-x-1/2">
        <NavigationBar />
      </div>
    </>
  );
}
