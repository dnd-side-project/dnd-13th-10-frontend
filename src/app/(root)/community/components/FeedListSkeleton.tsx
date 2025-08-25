export default function FeedListSkeleton() {
  return (
    <div className="relative animate-pulse">
      <header className="flex items-center justify-between border-t-[3px] border-b border-gray-800/70 px-5 py-4">
        <div className="flex items-center gap-1">
          <div className="h-5 w-8 rounded bg-gray-800/70"></div>
          <div className="h-5 w-8 rounded bg-gray-800/70"></div>
        </div>
        <div className="h-6 w-20 rounded bg-gray-800/70"></div>
      </header>
      <div className="flex items-center justify-end px-5 py-4">
        <div className="h-6 w-24 rounded bg-gray-800/70"></div>
      </div>
      <div className="border-b border-gray-800/70 px-5 py-4">
        <div className="mb-2 h-4 w-24 rounded bg-gray-800/70"></div>
        <div className="mb-2 h-5 w-3/4 rounded bg-gray-800/70"></div>
        <div className="h-4 w-full rounded bg-gray-800/70"></div>
      </div>
      <div className="border-b border-gray-800/70 px-5 py-4">
        <div className="mb-2 h-4 w-24 rounded bg-gray-800/70"></div>
        <div className="mb-2 h-5 w-3/4 rounded bg-gray-800/70"></div>
        <div className="h-4 w-full rounded bg-gray-800/70"></div>
      </div>
    </div>
  );
}
