"use client";

import { useEffect, useState } from "react";

const CONTENT_KEYS = [
  { id: "hero_title", label: "Hero 메인 타이틀" },
  { id: "hero_subtitle", label: "Hero 서브 타이틀" },
  { id: "about_description", label: "About 설명" },
  { id: "stat_students", label: "통계 - 수료생 수" },
  { id: "stat_partners", label: "통계 - 파트너 수" },
  { id: "stat_programs", label: "통계 - 프로그램 수" },
  { id: "stat_satisfaction", label: "통계 - 만족도" },
];

export default function SiteContentPage() {
  const [content, setContent] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState<string | null>(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("/api/site-content")
      .then((res) => res.json())
      .then(setContent)
      .catch(() => {});
  }, []);

  const handleSave = async (id: string) => {
    setSaving(id);
    try {
      const res = await fetch("/api/site-content", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, value: content[id] || "" }),
      });
      if (res.ok) {
        setMessage("저장 완료!");
        setTimeout(() => setMessage(""), 2000);
      }
    } catch {
      setMessage("저장 실패");
    }
    setSaving(null);
  };

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900">전역 콘텐츠 관리</h2>
        <p className="text-gray-500 mt-1">사이트 전반에 표시되는 텍스트를 수정합니다.</p>
      </div>
      {message && (
        <div className="mb-4 p-3 bg-emerald-50 text-emerald-700 rounded-lg text-sm">{message}</div>
      )}
      <div className="space-y-6">
        {CONTENT_KEYS.map((item) => (
          <div key={item.id} className="bg-white rounded-xl border border-gray-200 p-6">
            <label className="block text-sm font-semibold text-gray-700 mb-2">{item.label}</label>
            <div className="flex gap-3">
              <input
                type="text"
                value={content[item.id] || ""}
                onChange={(e) => setContent((prev) => ({ ...prev, [item.id]: e.target.value }))}
                className="flex-1 px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-navy-800/20"
                placeholder={item.id}
              />
              <button
                onClick={() => handleSave(item.id)}
                disabled={saving === item.id}
                className="px-6 py-2 bg-navy-800 text-white text-sm font-semibold rounded-lg hover:bg-navy-900 disabled:opacity-50"
              >
                {saving === item.id ? "저장 중..." : "저장"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
