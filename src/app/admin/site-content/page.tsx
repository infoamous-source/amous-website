"use client";

import { useEffect, useState } from "react";
import ImageUploader from "@/components/admin/ImageUploader";

const CONTENT_KEYS = [
  { id: "hero_title", label: "Hero 메인 타이틀" },
  { id: "hero_subtitle", label: "Hero 서브 타이틀" },
  { id: "hero_description", label: "Hero 설명" },
  { id: "about_title", label: "About 타이틀" },
  { id: "about_description", label: "About 설명" },
  { id: "stat_students", label: "통계 - 수료생 수" },
  { id: "stat_partners", label: "통계 - 파트너 수" },
  { id: "stat_programs", label: "통계 - 프로그램 수" },
  { id: "stat_satisfaction", label: "통계 - 만족도" },
];

const IMAGE_GALLERY_KEYS = [
  { id: "hero_images", label: "Hero 대표 프로필 이미지", desc: "740 x 920px 권장 · 최대 5장 · 자동 롤링" },
  { id: "about_images", label: "About 대표 활동 이미지", desc: "800 x 600px 권장 · 최대 5장 · 자동 롤링" },
];

function parseImages(val: string): string[] {
  if (!val) return [];
  try {
    const parsed = JSON.parse(val);
    return Array.isArray(parsed) ? parsed : [val];
  } catch {
    return val ? [val] : [];
  }
}

export default function SiteContentPage() {
  const [content, setContent] = useState<Record<string, string>>({});
  const [savedContent, setSavedContent] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState<string | null>(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("/api/site-content")
      .then((res) => res.json())
      .then((data: Record<string, string>) => {
        // hero_image → hero_images 마이그레이션
        const migrated = { ...data };
        if (data.hero_image && !data.hero_images) {
          migrated.hero_images = JSON.stringify([data.hero_image]);
        }
        if (data.about_image && !data.about_images) {
          migrated.about_images = JSON.stringify([data.about_image]);
        }
        setContent(migrated);
        setSavedContent(migrated);
      })
      .catch(() => {});
  }, []);

  const handleSave = async (id: string, value?: string) => {
    setSaving(id);
    try {
      const saveValue = value ?? content[id] ?? "";
      const res = await fetch("/api/site-content", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, value: saveValue }),
      });
      if (res.ok) {
        if (value !== undefined) {
          setContent((prev) => ({ ...prev, [id]: value }));
        }
        setSavedContent((prev) => ({ ...prev, [id]: saveValue }));
        setMessage("저장 완료!");
        setTimeout(() => setMessage(""), 2000);
      } else {
        setMessage("저장 실패");
      }
    } catch {
      setMessage("저장 실패");
    }
    setSaving(null);
  };

  // 이미지 추가 (로컬 state만 업데이트, 저장 버튼으로 DB 반영)
  const handleImageAdd = (key: string, url: string) => {
    const current = parseImages(content[key] || "");
    if (current.length >= 5) return;
    const updated = [...current, url];
    setContent((prev) => ({ ...prev, [key]: JSON.stringify(updated) }));
  };

  const handleImageRemove = (key: string, index: number) => {
    const current = parseImages(content[key] || "");
    const updated = current.filter((_, i) => i !== index);
    setContent((prev) => ({ ...prev, [key]: JSON.stringify(updated) }));
  };

  const handleImageReorder = (key: string, fromIdx: number, toIdx: number) => {
    const current = parseImages(content[key] || "");
    const item = current[fromIdx];
    const updated = [...current];
    updated.splice(fromIdx, 1);
    updated.splice(toIdx, 0, item);
    setContent((prev) => ({ ...prev, [key]: JSON.stringify(updated) }));
  };

  const hasUnsavedChanges = (key: string) => {
    return content[key] !== savedContent[key];
  };

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900">전역 콘텐츠 관리</h2>
        <p className="text-gray-500 mt-1">사이트 전반에 표시되는 텍스트와 이미지를 수정합니다.</p>
      </div>
      {message && (
        <div className="mb-4 p-3 bg-emerald-50 text-emerald-700 rounded-lg text-sm">{message}</div>
      )}

      {/* 이미지 갤러리 관리 */}
      <div className="mb-8">
        <h3 className="text-lg font-bold text-gray-900 mb-4">메인페이지 이미지 (자동 롤링)</h3>
        <div className="space-y-6">
          {IMAGE_GALLERY_KEYS.map((item) => {
            const images = parseImages(content[item.id] || "");
            const unsaved = hasUnsavedChanges(item.id);
            return (
              <div key={item.id} className={`bg-white rounded-xl border p-6 ${unsaved ? "border-amber-400" : "border-gray-200"}`}>
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h4 className="font-bold text-gray-900">{item.label}</h4>
                    <p className="text-xs text-gray-400 mt-0.5">{item.desc}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-medium text-navy-800">{images.length}/5장</span>
                    <button
                      onClick={() => handleSave(item.id, content[item.id] || "[]")}
                      disabled={saving === item.id}
                      className={`px-5 py-2 text-sm font-bold rounded-lg transition-all ${
                        unsaved
                          ? "bg-navy-800 text-white hover:bg-navy-900 animate-pulse"
                          : "bg-navy-800 text-white hover:bg-navy-900"
                      } disabled:opacity-50`}
                    >
                      {saving === item.id ? "저장 중..." : "저장"}
                    </button>
                  </div>
                </div>
                {unsaved && (
                  <p className="text-xs text-amber-600 mb-3">* 변경사항이 있습니다. 저장 버튼을 눌러주세요.</p>
                )}

                {/* 등록된 이미지 목록 */}
                {images.length > 0 && (
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 mb-4">
                    {images.map((url, idx) => (
                      <div key={idx} className="relative group">
                        <div className="aspect-[3/4] rounded-lg overflow-hidden bg-gray-100 border border-gray-200">
                          <img src={url} alt={`${item.label} ${idx + 1}`} className="w-full h-full object-cover" />
                        </div>
                        <div className="absolute top-1 left-1 bg-navy-800 text-white text-[10px] font-bold px-1.5 py-0.5 rounded">
                          {idx + 1}
                        </div>
                        <div className="absolute top-1 right-1 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          {idx > 0 && (
                            <button
                              onClick={() => handleImageReorder(item.id, idx, idx - 1)}
                              className="w-6 h-6 bg-white rounded-full shadow flex items-center justify-center hover:bg-gray-100"
                              title="앞으로"
                            >
                              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                              </svg>
                            </button>
                          )}
                          {idx < images.length - 1 && (
                            <button
                              onClick={() => handleImageReorder(item.id, idx, idx + 1)}
                              className="w-6 h-6 bg-white rounded-full shadow flex items-center justify-center hover:bg-gray-100"
                              title="뒤로"
                            >
                              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                              </svg>
                            </button>
                          )}
                          <button
                            onClick={() => handleImageRemove(item.id, idx)}
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
                {images.length < 5 && (
                  <ImageUploader
                    currentUrl={null}
                    onUpload={(url) => handleImageAdd(item.id, url)}
                    label={`이미지 추가 (${5 - images.length}장 더 등록 가능)`}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* 텍스트 관리 */}
      <h3 className="text-lg font-bold text-gray-900 mb-4">텍스트 콘텐츠</h3>
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
