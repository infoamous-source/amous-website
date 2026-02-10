"use client";

import { useEffect, useState } from "react";
import ImageUploader from "@/components/admin/ImageUploader";

interface Service {
  id: number;
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  icon: string;
  color: string;
  page_content: string;
  curriculum: string;
  image_url: string | null;
  sort_order: number;
}

export default function AdminServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [editing, setEditing] = useState<Service | null>(null);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    const res = await fetch("/api/services");
    if (res.ok) setServices(await res.json());
  };

  const handleSave = async () => {
    if (!editing) return;
    setSaving(true);
    try {
      const res = await fetch("/api/services", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editing),
      });
      if (res.ok) {
        setMessage("저장 완료!");
        setTimeout(() => setMessage(""), 2000);
        fetchServices();
        setEditing(null);
      } else {
        const errData = await res.json().catch(() => ({}));
        setMessage(`저장 실패: ${errData.error || res.statusText}${errData.hint ? ` (힌트: ${errData.hint})` : ""}`);
        setTimeout(() => setMessage(""), 5000);
      }
    } catch (error) {
      setMessage("네트워크 오류가 발생했습니다.");
      setTimeout(() => setMessage(""), 3000);
    }
    setSaving(false);
  };

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900">교육 서비스 관리</h2>
        <p className="text-gray-500 mt-1">3개 교육 카테고리의 내용을 수정합니다.</p>
      </div>
      {message && (
        <div className="mb-4 p-3 bg-emerald-50 text-emerald-700 rounded-lg text-sm">{message}</div>
      )}

      {editing ? (
        <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-4">
          <h3 className="text-lg font-bold">{editing.title} 편집</h3>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">제목</label>
            <input type="text" value={editing.title} onChange={(e) => setEditing({ ...editing, title: e.target.value })} className="w-full px-4 py-2 border rounded-lg" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">부제목</label>
            <input type="text" value={editing.subtitle || ""} onChange={(e) => setEditing({ ...editing, subtitle: e.target.value })} className="w-full px-4 py-2 border rounded-lg" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">설명</label>
            <textarea rows={3} value={editing.description || ""} onChange={(e) => setEditing({ ...editing, description: e.target.value })} className="w-full px-4 py-2 border rounded-lg" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">서브페이지 내용</label>
            <textarea rows={8} value={editing.page_content || ""} onChange={(e) => setEditing({ ...editing, page_content: e.target.value })} className="w-full px-4 py-2 border rounded-lg" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">커리큘럼 (각 단계를 | 로 구분)</label>
            <textarea rows={4} value={editing.curriculum || ""} onChange={(e) => setEditing({ ...editing, curriculum: e.target.value })} className="w-full px-4 py-2 border rounded-lg" placeholder="1단계: 기초 교육|2단계: 심화 과정|3단계: 실전 적용" />
            <p className="text-xs text-gray-400 mt-1">파이프(|) 문자로 각 단계를 구분하세요.</p>
          </div>
          <ImageUploader
            currentUrl={editing.image_url || null}
            onUpload={(url) => setEditing({ ...editing, image_url: url })}
            label="서비스 대표 이미지"
          />
          <div className="flex gap-3">
            <button onClick={handleSave} disabled={saving} className="px-6 py-2 bg-navy-800 text-white rounded-lg hover:bg-navy-900 disabled:opacity-50">
              {saving ? "저장 중..." : "저장"}
            </button>
            <button onClick={() => setEditing(null)} className="px-6 py-2 border border-gray-200 rounded-lg hover:bg-gray-50">취소</button>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {services.map((s) => (
            <div key={s.id} className="bg-white rounded-xl border border-gray-200 p-6 flex items-center justify-between">
              <div>
                <h3 className="font-bold text-gray-900">{s.title}</h3>
                <p className="text-sm text-gray-500">{s.subtitle} — {s.slug}</p>
              </div>
              <button onClick={() => setEditing(s)} className="px-4 py-2 text-sm text-navy-800 border border-navy-800 rounded-lg hover:bg-navy-50">편집</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
