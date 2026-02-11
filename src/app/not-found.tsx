import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-6xl font-bold text-navy-800 mb-4">404</h2>
        <h3 className="text-2xl font-bold text-gray-900 mb-2">페이지를 찾을 수 없습니다</h3>
        <p className="text-gray-600 mb-8">요청하신 페이지가 존재하지 않거나 이동되었습니다.</p>
        <Link
          href="/"
          className="px-6 py-3 bg-navy-800 text-white font-semibold rounded-full hover:bg-navy-900 transition-colors"
        >
          홈으로 돌아가기
        </Link>
      </div>
    </div>
  );
}
