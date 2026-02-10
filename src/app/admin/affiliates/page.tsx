"use client";

import { useEffect, useState } from "react";
import ImageUploader from "@/components/admin/ImageUploader";

interface Affiliate {
  id: number;
  name: string;
  name_en: string;
  description: string;
  features: string[];
  icon: string;
  images: string[];
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
    if (res.ok) {
      const data = await res.json();
      setAffiliates(data.map((a: Affiliate) => ({
        ...a,
        images: a.images || [],
      })));
    }
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

  const handleImageAdd = (url: string) => {
    if (!editing) return;
    const currentImages = editing.images || [];
    if (currentImages.length >= 5) {
      alert("최대 5개까지만 추가할 수 있습니다.");
      return;
    }
    setEditing({ ...editing, images: [...currentImages, url] });
  };

  const handleImageRemove = (index: number) => {
    if (!editing) return;
    const updated = (editing.images || []).filter((_, i) => i !== index);
    setEditing({ ...editing, images: updated });
  };

  const handleImageReorder = (fromIdx: number, toIdx: number) => {
    if (!editing) return;
    const current = [...(editing.images || [])];
    const item = current[fromIdx];
    current.splice(fromIdx, 1);
    current.splice(toIdx, 0, item);
    setEditing({ ...editing, images: current });
  };

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900">계열사 관리</h2>
        <p className="text-gray-500 mt-1">에이머스스튜디오 / 에이머스이벤트 정보를 수정합니다.</p>
      </div>
      {message && <div className="mb-4 p-3 bg-emerald-50 text-emerald-700 rounded-lg text-sm">{message}</div>}

      {editing ? (
        <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-6">
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

          {/* 이미지 갤러리 */}
          <div className="border-t pt-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h4 className="text-sm font-bold text-gray-900">포트폴리오 이미지 (자동 롤링)</h4>
                <p className="text-xs text-gray-400 mt-0.5">800 x 450px 권장 · 최대 5장 · 4초 간격 자동 롤링</p>
              </div>
              <span className="text-sm font-medium text-navy-800">{(editing.images || []).length}/5장</span>
            </div>

            {/* 등록된 이미지 목록 */}
            {(editing.images || []).length > 0 && (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 mb-4">
                {(editing.images || []).map((url, idx) => (
                  <div key={idx} className="relative group">
                    <div className="aspect-[16/9] rounded-lg overflow-hidden bg-gray-100 border border-gray-200">
                      <img src={url} alt={`${editing.name} ${idx + 1}`} className="w-full h-full object-cover" />
                    </div>
                    <div className="absolute top-1 left-1 bg-navy-800 text-white text-[10px] font-bold px-1.5 py-0.5 rounded">
                      {idx + 1}
                    </div>
                    <div className="absolute top-1 right-1 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      {idx > 0 && (
                        <button
                          onClick={() => handleImageReorder(idx, idx - 1)}
                          className="w-6 h-6 bg-white rounded-full shadow flex items-center justify-center hover:bg-gray-100"
                          title="앞으로"
                        >
                          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                          </svg>
                        </button>
                      )}
                      {idx < (editing.images || []).length - 1 && (
                        <button
                          onClick={() => handleImageReorder(idx, idx + 1)}
                          className="w-6 h-6 bg-white rounded-full shadow flex items-center justify-center hover:bg-gray-100"
                          title="뒤로"
                        >
                          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                          </svg>
                        </button>
                      )}
                      <button
                        onClick={() => handleImageRemove(idx)}
                        className="w-6 h-6 bg-red-500 text-white rounded-full shadow flex items-center justify-center hover:bg-red-600"
                        title="삭제"
                      >
                        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* 이미지 추가 업로더 */}
            {(editing.images || []).length < 5 && (
              <ImageUploader
                currentUrl={null}
                onUpload={handleImageAdd}
                label={`이미지 추가 (${5 - (editing.images || []).length}장 더 등록 가능)`}
              />
            )}
          </div>

          <div className="flex gap-3 pt-4 border-t">
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
                <p className="text-xs text-gray-400 mt-1">이미지: {(a.images || []).length}/5장</p>
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
