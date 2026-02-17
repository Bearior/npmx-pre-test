export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/80 backdrop-blur-sm">
      <div className="flex flex-col items-center gap-4">
        <div className="relative">
          <div className="h-16 w-16 animate-spin rounded-full border-4 border-gray-200 border-t-green-600"></div>
        </div>
        <p className="text-lg font-medium text-gray-700">Loading...</p>
      </div>
    </div>
  );
}
