"use client";

import Link from "next/link";

const CARDS = [
  { label: "전역 콘텐츠", desc: "Hero, About 등 사이트 텍스트 관리", href: "/admin/site-content", color: "bg-blue-500" },
  { label: "교육 서비스", desc: "3개 카테고리 서비스 관리", href: "/admin/services", color: "bg-emerald-500" },
  { label: "강사진", desc: "서비스별 강사 정보 관리", href: "/admin/instructors", color: "bg-violet-500" },
  { label: "협업 사례", desc: "사례 게시판 관리", href: "/admin/cases", color: "bg-amber-500" },
  { label: "계열사", desc: "에이머스스튜디오 / 이벤트 관리", href: "/admin/affiliates", color: "bg-rose-500" },
];

export default function AdminDashboard() {
  return (
    <div>
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900">관리자 대시보드</h2>
        <p className="text-gray-500 mt-1">에이머스 웹사이트 콘텐츠를 관리하세요.</p>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {CARDS.map((card) => (
          <Link
            key={card.href}
            href={card.href}
            className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow group"
          >
            <div className={`w-10 h-10 rounded-lg ${card.color} mb-4`} />
            <h3 className="font-bold text-gray-900 group-hover:text-navy-800 transition-colors">{card.label}</h3>
            <p className="text-sm text-gray-500 mt-1">{card.desc}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
