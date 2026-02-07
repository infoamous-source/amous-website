"use client";

import { useEffect, useState } from "react";

interface Instructor {
  id: number;
  service_id: number | null;
  name: string;
  role: string;
  description: string;
  specialties: string[];
  image_url: string | null;
  sort_order: number;
}

interface Service {
  id: number;
  title: string;
  slug: string;
}

export default function AdminInstructorsPage() {
  const [instructors, setInstructors] = useState<Instructor[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [editing, setEditing] = useState<Instructor | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const [iRes, sRes] = await Promise.all([fetch("/api/instructors"), fetch("/api/services")]);
    if (iRes.ok) setInstructors(await iRes.json());
    if (sRes.ok) setServices(await sRes.json());
  };

  const handleSave = async () => {
    if (!editing) return;
    setSaving(true);
    try {
      const method = isNew ? "POST" : "PUT";
      const res = await fetch("/api/instructors", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editing),
      });
      if (res.ok) {
        setMessage(isNew ? "추가 완료!" : "저장 완료!");
        setTimeout(() => setMessage(""), 2000);
        fetchData();
        setEditing(null);
        setIsNew(false);
      }
    } catch {
      setMessage("저장 실패");
    }
    setSaving(false);
  };

  const handleDelete = async (id: number) => {
    if (!confirm("정말 삭제하시겠습니까?")) return;
    const res = await fetch("/api/instructors?id=" + id, { method: "DELETE" });
    if (res.ok) {
      setMessage("삭제 완료!");
      setTimeout(() => setMessage(""), 2000);
      fetchData();
    }
  };

  const newInstructor = (): Instructor => ({
    id: 0,
    service_id: services[0]?.id || null,
    name: "",
    role: "",
    description: "",
    specialties: [],
    image_url: null,
    sort_order: instructors.length,
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">강사진 관리</h2>
          <p className="text-gray-500 mt-1">강사 정보를 추가, 수정, 삭제합니다.</p>
        </div>
        <button
          onClick={() => { setEditing(newInstructor()); setIsNew(true); }}
          className="px-4 py-2 bg-navy-800 text-white text-sm font-semibold rounded-lg hover:bg-navy-900"
        >
          + 강사 추가
        </button>
      </div>
      {message && <div className="mb-4 p-3 bg-emerald-50 text-emerald-700 rounded-lg text-sm">{message}</div>}

      {editing ? (
        <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-4">
          <h3 className="text-lg font-bold">{isNew ? "강사 추가" : "강사 편집"}</h3>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">이름</label>
              <input type="text" value={editing.name} onChange={(e) => setEditing({ ...editing, name: e.target.value })} className="w-full px-4 py-2 border rounded-lg" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">역할</label>
              <input type="text" value={editing.role || ""} onChange={(e) => setEditing({ ...editing, role: e.target.value })} className="w-full px-4 py-2 border rounded-lg" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">소속 서비스</label>
            <select
              value={editing.service_id || ""}
              onChange={(e) => setEditing({ ...editing, service_id: e.target.value ? parseInt(e.target.value) : null })}
              className="w-full px-4 py-2 border rounded-lg"
            >
              <option value="">미지정</option>
              {services.map((s) => (
                <option key={s.id} value={s.id}>{s.title}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">소개</label>
            <textarea rows={3} value={editing.description || ""} onChange={(e) => setEditing({ ...editing, description: e.target.value })} className="w-full px-4 py-2 border rounded-lg" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">전문 분야 (쉼표 구분)</label>
            <input
              type="text"
              value={(editing.specialties || []).join(", ")}
              onChange={(e) => setEditing({ ...editing, specialties: e.target.value.split(",").map((s) => s.trim()).filter(Boolean) })}
              className="w-full px-4 py-2 border rounded-lg"
              placeholder="한국어 교육, 문화 교류"
            />
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
          {instructors.map((inst) => (
            <div key={inst.id} className="bg-white rounded-xl border border-gray-200 p-5 flex items-center justify-between">
              <div>
                <h3 className="font-bold text-gray-900">{inst.name}</h3>
                <p className="text-sm text-gray-500">{inst.role} — {services.find((s) => s.id === inst.service_id)?.title || "미지정"}</p>
              </div>
              <div className="flex gap-2">
                <button onClick={() => { setEditing(inst); setIsNew(false); }} className="px-3 py-1.5 text-sm text-navy-800 border border-navy-800 rounded-lg hover:bg-navy-50">편집</button>
                <button onClick={() => handleDelete(inst.id)} className="px-3 py-1.5 text-sm text-red-600 border border-red-200 rounded-lg hover:bg-red-50">삭제</button>
              </div>
            </div>
          ))}
          {instructors.length === 0 && <p className="text-gray-400 text-center py-10">등록된 강사가 없습니다.</p>}
        </div>
      )}
    </div>
  );
}
