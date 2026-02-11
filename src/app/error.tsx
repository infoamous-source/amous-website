"use client";

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-4">오류가 발생했습니다</h2>
        <p className="text-gray-600 mb-6">잠시 후 다시 시도해주세요.</p>
        <button
          onClick={reset}
          className="px-6 py-2 bg-blue-900 text-white rounded-lg hover:bg-blue-800 transition-colors"
        >
          다시 시도
        </button>
      </div>
    </div>
  );
}
