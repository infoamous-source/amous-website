"use client";

import { useEffect, useState } from "react";
import ImageUploader from "@/components/admin/ImageUploader";

interface Instructor {
  id: number;
  service_id: number | null;
  service_ids: number[];
  name: string;
  role: string;
  description: string;
  specialties: string[];
  certifications: string[];
  career: string;
  lecture_history: string;
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
  const [filterServiceId, setFilterServiceId] = useState<number | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const [iRes, sRes] = await Promise.all([fetch("/api/instructors"), fetch("/api/services")]);
    if (iRes.ok) {
      const data = await iRes.json();
      // service_ids가 없으면 service_id로 초기화
      setInstructors(data.map((i: Instructor) => ({
        ...i,
        service_ids: i.service_ids?.length ? i.service_ids : (i.service_id ? [i.service_id] : []),
      })));
    }
    if (sRes.ok) setServices(await sRes.json());
  };

  const handleSave = async () => {
    if (!editing) return;
    setSaving(true);
    try {
      // service_id도 첫번째 값으로 동기화 (기존 호환)
      const payload = {
        ...editing,
        service_id: editing.service_ids.length > 0 ? editing.service_ids[0] : null,
      };
      const method = isNew ? "POST" : "PUT";
      const res = await fetch("/api/instructors", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
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
    service_id: null,
    service_ids: [],
    name: "",
    role: "",
    description: "",
    specialties: [],
    certifications: [],
    career: "",
    lecture_history: "",
    image_url: null,
    sort_order: instructors.length,
  });

  const toggleServiceId = (svcId: number) => {
    if (!editing) return;
    const current = editing.service_ids || [];
    const updated = current.includes(svcId)
      ? current.filter((id) => id !== svcId)
      : [...current, svcId];
    setEditing({ ...editing, service_ids: updated });
  };

  const getServiceNames = (inst: Instructor) => {
    const ids = inst.service_ids?.length ? inst.service_ids : (inst.service_id ? [inst.service_id] : []);
    return ids.map((id) => services.find((s) => s.id === id)?.title).filter(Boolean).join(", ") || "미지정";
  };

  const belongsToService = (inst: Instructor, serviceId: number) => {
    if (inst.service_ids?.length) return inst.service_ids.includes(serviceId);
    return inst.service_id === serviceId;
  };

  // 필터링된 강사 목록
  const filteredInstructors = filterServiceId
    ? instructors.filter((i) => belongsToService(i, filterServiceId))
    : instructors;

  // 미지정 강사
  const unassigned = instructors.filter((i) =>
    (!i.service_ids || i.service_ids.length === 0) && !i.service_id
  );

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
            <label className="block text-sm font-semibold text-gray-700 mb-2">소속 교육 서비스 (복수 선택 가능)</label>
            <div className="flex flex-wrap gap-2">
              {services.map((s) => {
                const checked = (editing.service_ids || []).includes(s.id);
                return (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => toggleServiceId(s.id)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium border transition-all ${
                      checked
                        ? "bg-navy-800 text-white border-navy-800"
                        : "bg-white text-gray-600 border-gray-300 hover:border-navy-400"
                    }`}
                  >
                    {checked && (
                      <svg className="w-4 h-4 inline mr-1 -mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                      </svg>
                    )}
                    {s.title}
                  </button>
                );
              })}
            </div>
            {(editing.service_ids || []).length === 0 && (
              <p className="text-xs text-amber-600 mt-1">하나 이상의 서비스를 선택해주세요.</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">소개</label>
            <textarea rows={3} value={editing.description || ""} onChange={(e) => setEditing({ ...editing, description: e.target.value })} className="w-full px-4 py-2 border rounded-lg" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">강의 분야 (쉼표로 구분)</label>
            <input
              type="text"
              value={(editing.specialties || []).join(", ")}
              onChange={(e) => setEditing({ ...editing, specialties: e.target.value.split(/[,、，]/).map((s) => s.trim()).filter(Boolean) })}
              className="w-full px-4 py-2 border rounded-lg"
              placeholder="면접 컨설팅, 스피치 코칭, MC · 사회"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">보유 자격 (쉼표로 구분)</label>
            <input
              type="text"
              value={(editing.certifications || []).join(", ")}
              onChange={(e) => setEditing({ ...editing, certifications: e.target.value.split(/[,、，]/).map((s) => s.trim()).filter(Boolean) })}
              className="w-full px-4 py-2 border rounded-lg"
              placeholder="직업상담사 1급, 스피치지도사, 커리어코치 등"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">경력</label>
            <div className="flex gap-2 mb-2">
              <button
                type="button"
                onClick={() => {
                  const prefix = "現) ";
                  const val = editing.career || "";
                  const cursor = val.length > 0 ? val + "\n" + prefix : prefix;
                  setEditing({ ...editing, career: cursor });
                }}
                className="px-3 py-1.5 text-xs font-bold bg-navy-800 text-white rounded-lg hover:bg-navy-900"
              >
                現 (현직)
              </button>
              <button
                type="button"
                onClick={() => {
                  const prefix = "前) ";
                  const val = editing.career || "";
                  const cursor = val.length > 0 ? val + "\n" + prefix : prefix;
                  setEditing({ ...editing, career: cursor });
                }}
                className="px-3 py-1.5 text-xs font-bold bg-gray-500 text-white rounded-lg hover:bg-gray-600"
              >
                前 (전직)
              </button>
            </div>
            <textarea
              rows={4}
              value={editing.career || ""}
              onChange={(e) => setEditing({ ...editing, career: e.target.value })}
              className="w-full px-4 py-2 border rounded-lg"
              placeholder={"現) OO대학교 겸임교수\n前) OO방송 아나운서\n前) OO기업 면접관"}
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">출강 이력</label>
            <textarea
              rows={3}
              value={editing.lecture_history || ""}
              onChange={(e) => setEditing({ ...editing, lecture_history: e.target.value })}
              className="w-full px-4 py-2 border rounded-lg"
              placeholder={"OO기업 임직원 스피치 교육\nOO대학교 취업캠프 특강\nOO시 중장년 디지털 교육"}
            />
          </div>
          <ImageUploader
            currentUrl={editing.image_url || null}
            onUpload={(url) => setEditing({ ...editing, image_url: url })}
            label="강사 프로필 사진"
          />
          <div className="flex gap-3">
            <button onClick={handleSave} disabled={saving} className="px-6 py-2 bg-navy-800 text-white rounded-lg hover:bg-navy-900 disabled:opacity-50">
              {saving ? "저장 중..." : isNew ? "추가" : "저장"}
            </button>
            <button onClick={() => { setEditing(null); setIsNew(false); }} className="px-6 py-2 border border-gray-200 rounded-lg hover:bg-gray-50">취소</button>
          </div>
        </div>
      ) : (
        <div>
          {/* 필터 탭 */}
          <div className="flex flex-wrap gap-2 mb-6">
            <button
              onClick={() => setFilterServiceId(null)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                filterServiceId === null
                  ? "bg-navy-800 text-white"
                  : "bg-white text-gray-600 border border-gray-300 hover:border-navy-400"
              }`}
            >
              전체 ({instructors.length})
            </button>
            {services.map((s) => {
              const count = instructors.filter((i) => belongsToService(i, s.id)).length;
              return (
                <button
                  key={s.id}
                  onClick={() => setFilterServiceId(s.id)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    filterServiceId === s.id
                      ? "bg-navy-800 text-white"
                      : "bg-white text-gray-600 border border-gray-300 hover:border-navy-400"
                  }`}
                >
                  {s.title} ({count})
                </button>
              );
            })}
            {unassigned.length > 0 && (
              <button
                onClick={() => setFilterServiceId(-1)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  filterServiceId === -1
                    ? "bg-gray-600 text-white"
                    : "bg-white text-gray-400 border border-gray-200 hover:border-gray-400"
                }`}
              >
                미지정 ({unassigned.length})
              </button>
            )}
          </div>

          {/* 강사 목록 - 그룹별 또는 필터 */}
          {filterServiceId === null ? (
            // 전체: 서비스 그룹별로 나눠서 표시
            <div className="space-y-8">
              {services.map((s) => {
                const groupInstructors = instructors.filter((i) => belongsToService(i, s.id));
                if (groupInstructors.length === 0) return null;
                return (
                  <div key={s.id}>
                    <h3 className="text-sm font-bold text-navy-800 uppercase tracking-wider mb-3 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-navy-800" />
                      {s.title} ({groupInstructors.length}명)
                    </h3>
                    <div className="space-y-2">
                      {groupInstructors.map((inst) => (
                        <InstructorCard key={`${s.id}-${inst.id}`} inst={inst} services={services} getServiceNames={getServiceNames} onEdit={() => { setEditing(inst); setIsNew(false); }} onDelete={() => handleDelete(inst.id)} />
                      ))}
                    </div>
                  </div>
                );
              })}
              {unassigned.length > 0 && (
                <div>
                  <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-gray-400" />
                    미지정 ({unassigned.length}명)
                  </h3>
                  <div className="space-y-2">
                    {unassigned.map((inst) => (
                      <InstructorCard key={inst.id} inst={inst} services={services} getServiceNames={getServiceNames} onEdit={() => { setEditing(inst); setIsNew(false); }} onDelete={() => handleDelete(inst.id)} />
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            // 필터: 선택된 그룹만
            <div className="space-y-2">
              {(filterServiceId === -1 ? unassigned : filteredInstructors).map((inst) => (
                <InstructorCard key={inst.id} inst={inst} services={services} getServiceNames={getServiceNames} onEdit={() => { setEditing(inst); setIsNew(false); }} onDelete={() => handleDelete(inst.id)} />
              ))}
              {(filterServiceId === -1 ? unassigned : filteredInstructors).length === 0 && (
                <p className="text-gray-400 text-center py-10">해당 서비스에 등록된 강사가 없습니다.</p>
              )}
            </div>
          )}

          {instructors.length === 0 && <p className="text-gray-400 text-center py-10">등록된 강사가 없습니다.</p>}
        </div>
      )}
    </div>
  );
}

function InstructorCard({ inst, getServiceNames, onEdit, onDelete }: {
  inst: Instructor;
  services: Service[];
  getServiceNames: (inst: Instructor) => string;
  onEdit: () => void;
  onDelete: () => void;
}) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5 flex items-center justify-between">
      <div className="flex items-center gap-4">
        {inst.image_url ? (
          <img src={inst.image_url} alt={inst.name} className="w-10 h-10 rounded-full object-cover" />
        ) : (
          <div className="w-10 h-10 rounded-full bg-navy-50 flex items-center justify-center">
            <svg className="w-5 h-5 text-navy-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
            </svg>
          </div>
        )}
        <div>
          <h3 className="font-bold text-gray-900">{inst.name}</h3>
          <p className="text-sm text-gray-500">{inst.role ? `${inst.role} · ` : ""}{getServiceNames(inst)}</p>
        </div>
      </div>
      <div className="flex gap-2">
        <button onClick={onEdit} className="px-3 py-1.5 text-sm text-navy-800 border border-navy-800 rounded-lg hover:bg-navy-50">편집</button>
        <button onClick={onDelete} className="px-3 py-1.5 text-sm text-red-600 border border-red-200 rounded-lg hover:bg-red-50">삭제</button>
      </div>
    </div>
  );
}
