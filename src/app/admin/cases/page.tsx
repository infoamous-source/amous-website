"use client";

import { useEffect, useState } from "react";
import ImageUploader from "@/components/admin/ImageUploader";

interface CaseItem {
  id: number;
  category: string;
  company: string;
  title: string;
  content: string;
  result: string;
  image_url: string | null;
  is_published: boolean;
}

const CATEGORIES = [
  { value: "immigrant", label: "이주민·유학생" },
  { value: "senior", label: "중장년·시니어" },
  { value: "career", label: "취업·직무 역량강화" },
];

export default function AdminCasesPage() {
  const [cases, setCases] = useState<CaseItem[]>([]);
  const [editing, setEditing] = useState<CaseItem | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchCases();
  }, []);

  const fetchCases = async () => {
    const res = await fetch("/api/cases");
    if (res.ok) setCases(await res.json());
  };

  const handleSave = async () => {
    if (!editing) return;
    setSaving(true);
    try {
      const method = isNew ? "POST" : "PUT";
      const res = await fetch("/api/cases", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editing),
      });
      if (res.ok) {
        setMessage(isNew ? "추가 완료!" : "저장 완료!");
        setTimeout(() => setMessage(""), 2000);
        fetchCases();
        setEditing(null);
        setIsNew(false);
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

  const handleDelete = async (id: number) => {
    if (!confirm("정말 삭제하시겠습니까?")) return;
    const res = await fetch("/api/cases?id=" + id, { method: "DELETE" });
    if (res.ok) {
      setMessage("삭제 완료!");
      setTimeout(() => setMessage(""), 2000);
      fetchCases();
    }
  };

  const newCase = (): CaseItem => ({
    id: 0,
    category: "immigrant",
    company: "",
    title: "",
    content: "",
    result: "",
    image_url: null,
    is_published: true,
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">협업 사례 관리</h2>
          <p className="text-gray-500 mt-1">교육 성공 사례를 관리합니다.</p>
        </div>
        <button
          onClick={() => { setEditing(newCase()); setIsNew(true); }}
          className="px-4 py-2 bg-navy-800 text-white text-sm font-semibold rounded-lg hover:bg-navy-900"
        >
          + 사례 추가
        </button>
      </div>
      {message && <div className="mb-4 p-3 bg-emerald-50 text-emerald-700 rounded-lg text-sm">{message}</div>}

      {editing ? (
        <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-4">
          <h3 className="text-lg font-bold">{isNew ? "사례 추가" : "사례 편집"}</h3>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">카테고리</label>
              <select value={editing.category} onChange={(e) => setEditing({ ...editing, category: e.target.value })} className="w-full px-4 py-2 border rounded-lg">
                {CATEGORIES.map((c) => (
                  <option key={c.value} value={c.value}>{c.label}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">기업/기관명</label>
              <input type="text" value={editing.company || ""} onChange={(e) => setEditing({ ...editing, company: e.target.value })} className="w-full px-4 py-2 border rounded-lg" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">제목</label>
            <input type="text" value={editing.title} onChange={(e) => setEditing({ ...editing, title: e.target.value })} className="w-full px-4 py-2 border rounded-lg" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">내용</label>
            <textarea rows={4} value={editing.content || ""} onChange={(e) => setEditing({ ...editing, content: e.target.value })} className="w-full px-4 py-2 border rounded-lg" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">성과 요약</label>
            <input type="text" value={editing.result || ""} onChange={(e) => setEditing({ ...editing, result: e.target.value })} className="w-full px-4 py-2 border rounded-lg" placeholder="교육 만족도 97% 등" />
          </div>
          <ImageUploader
            currentUrl={editing.image_url || null}
            onUpload={(url) => setEditing({ ...editing, image_url: url })}
            label="사례 이미지"
          />
          <div className="flex items-center gap-2">
            <input type="checkbox" id="published" checked={editing.is_published} onChange={(e) => setEditing({ ...editing, is_published: e.target.checked })} />
            <label htmlFor="published" className="text-sm text-gray-700">공개</label>
          </div>
          <div className="flex gap-3">
            <button onClick={handleSave} disabled={saving} className="px-6 py-2 bg-navy-800 text-white rounded-lg hover:bg-navy-900 disabled:opacity-50">
              {saving ? "저장 중..." : isNew ? "추가" : "저장"}
            </button>
            <button onClick={() => { setEditing(null); setIsNew(false); }} className="px-6 py-2 border border-gray-200 rounded-lg hover:bg-gray-50">취소</button>
          </div>
        </div>
      ) : (
        <div className="space-y-3">
          {cases.map((item) => (
            <div key={item.id} className="bg-white rounded-xl border border-gray-200 p-5 flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="px-2 py-0.5 text-xs font-semibold bg-navy-50 text-navy-700 rounded-full">
                    {CATEGORIES.find((c) => c.value === item.category)?.label}
                  </span>
                  {!item.is_published && (
                    <span className="px-2 py-0.5 text-xs bg-gray-100 text-gray-500 rounded-full">비공개</span>
                  )}
                </div>
                <h3 className="font-bold text-gray-900">{item.title}</h3>
                <p className="text-sm text-gray-500">{item.company}</p>
              </div>
              <div className="flex gap-2">
                <button onClick={() => { setEditing(item); setIsNew(false); }} className="px-3 py-1.5 text-sm text-navy-800 border border-navy-800 rounded-lg hover:bg-navy-50">편집</button>
                <button onClick={() => handleDelete(item.id)} className="px-3 py-1.5 text-sm text-red-600 border border-red-200 rounded-lg hover:bg-red-50">삭제</button>
              </div>
            </div>
          ))}
          {cases.length === 0 && <p className="text-gray-400 text-center py-10">등록된 사례가 없습니다.</p>}
        </div>
      )}
    </div>
  );
}
