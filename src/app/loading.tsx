export default function Loading() {
  return (
    <main className="flex min-h-[70vh] items-center justify-center bg-white">
      <div className="flex flex-col items-center gap-5">
        {/* Spinner */}
        <div className="relative flex h-14 w-14 items-center justify-center">
          <div className="absolute inset-0 animate-spin rounded-full border-4 border-gray-200 border-t-green-600" />

          <div className="h-3 w-3 rounded-full bg-green-600" />
        </div>

        {/* Loading text */}
        <div className="text-center">
          <h2 className="text-lg font-semibold text-gray-800">Loading...</h2>

          <p className="mt-1 text-sm text-gray-500">
            Please wait while we prepare everything for you.
          </p>
        </div>
      </div>
    </main>
  );
}
