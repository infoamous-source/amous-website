"use client";

import { useEffect, useState } from "react";

interface Affiliate {
  id: number;
  name: string;
  name_en: string;
  description: string;
  features: string[];
  icon: string;
  sort_order: number;
}

export default function AdminAffiliatesPage() {
  const [affiliates, setAffiliates] = useState<Affiliate[]>([]);
  const [editing, setEditing] = useState<Affiliate | null>(null);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchAffiliates();
  }, []);

  const fetchAffiliates = async () => {
    const res = await fetch("/api/affiliates");
    if (res.ok) setAffiliates(await res.json());
  };

  const handleSave = async () => {
    if (!editing) return;
    setSaving(true);
    try {
      const res = await fetch("/api/affiliates", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editing),
      });
      if (res.ok) {
        setMessage("저장 완료!");
        setTimeout(() => setMessage(""), 2000);
        fetchAffiliates();
        setEditing(null);
      }
    } catch {
      setMessage("저장 실패");
    }
    setSaving(false);
  };

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900">계열사 관리</h2>
        <p className="text-gray-500 mt-1">에이머스스튜디오 / 에이머스이벤트 정보를 수정합니다.</p>
      </div>
      {message && <div className="mb-4 p-3 bg-emerald-50 text-emerald-700 rounded-lg text-sm">{message}</div>}

      {editing ? (
        <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-4">
          <h3 className="text-lg font-bold">{editing.name} 편집</h3>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">이름</label>
              <input type="text" value={editing.name} onChange={(e) => setEditing({ ...editing, name: e.target.value })} className="w-full px-4 py-2 border rounded-lg" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">영문 이름</label>
              <input type="text" value={editing.name_en || ""} onChange={(e) => setEditing({ ...editing, name_en: e.target.value })} className="w-full px-4 py-2 border rounded-lg" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">설명</label>
            <textarea rows={4} value={editing.description || ""} onChange={(e) => setEditing({ ...editing, description: e.target.value })} className="w-full px-4 py-2 border rounded-lg" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">특징 (쉼표 구분)</label>
            <input
              type="text"
              value={(editing.features || []).join(", ")}
              onChange={(e) => setEditing({ ...editing, features: e.target.value.split(",").map((s) => s.trim()).filter(Boolean) })}
              className="w-full px-4 py-2 border rounded-lg"
            />
          </div>
          <div className="flex gap-3">
            <button onClick={handleSave} disabled={saving} className="px-6 py-2 bg-navy-800 text-white rounded-lg hover:bg-navy-900 disabled:opacity-50">
              {saving ? "저장 중..." : "저장"}
            </button>
            <button onClick={() => setEditing(null)} className="px-6 py-2 border border-gray-200 rounded-lg hover:bg-gray-50">취소</button>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {affiliates.map((a) => (
            <div key={a.id} className="bg-white rounded-xl border border-gray-200 p-6 flex items-center justify-between">
              <div>
                <h3 className="font-bold text-gray-900">{a.name}</h3>
                <p className="text-sm text-gray-500">{a.name_en}</p>
              </div>
              <button onClick={() => setEditing(a)} className="px-4 py-2 text-sm text-navy-800 border border-navy-800 rounded-lg hover:bg-navy-50">편집</button>
            </div>
          ))}
          {affiliates.length === 0 && <p className="text-gray-400 text-center py-10">등록된 계열사가 없습니다.</p>}
        </div>
      )}
    </div>
  );
}
