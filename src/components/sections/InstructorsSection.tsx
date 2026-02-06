"use client";

import { motion } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";

const instructors = [
  {
    name: "대표 강사",
    role: "AMOUS 대표 / 현직 아나운서 · 면접관",
    specialties: ["스피치 코칭", "면접 컨설팅", "MC · 사회"],
    description:
      "현직 정부기관·기업 공식행사 아나운서이자 다수 기업 외부 면접관·자문위원. 현장에서 살아 숨쉬는 실전 노하우를 직접 전수합니다.",
  },
  {
    name: "전문 강사 A",
    role: "기업교육 전문",
    specialties: ["리더십", "조직 커뮤니케이션", "프레젠테이션"],
    description:
      "풍부한 기업 교육 경험을 보유한 기업교육 전문가. 조직의 소통 역량을 한 단계 끌어올립니다.",
  },
  {
    name: "전문 강사 B",
    role: "글로벌 교육 전문",
    specialties: ["다문화 교육", "한국어 교육", "문화 적응"],
    description:
      "다문화 사회 전문가로서 이주민과 유학생의 성공적인 한국 정착을 돕는 맞춤형 교육을 설계합니다.",
  },
];

export default function InstructorsSection() {
  return (
    <section id="instructors" className="py-24 lg:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          subtitle="Our Instructors"
          title="최고의 전문 강사진"
          description="각 분야 최고의 전문가들이 직접 교육합니다. 현장 경험과 학술적 깊이를 겸비한 강사진이 당신의 성장을 이끕니다."
        />

        <div className="grid md:grid-cols-3 gap-8">
          {instructors.map((instructor, index) => (
            <motion.div
              key={instructor.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="group"
            >
              {/* Photo placeholder */}
              <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-gradient-to-br from-navy-50 to-navy-100 mb-6">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center text-navy-300">
                    <svg className="w-16 h-16 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={0.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                    </svg>
                    <p className="text-xs text-navy-200">강사 사진</p>
                    <p className="text-xs text-navy-200">400 x 530px</p>
                  </div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-navy-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>

              {/* Info */}
              <h3 className="text-xl font-bold text-gray-900 mb-1">{instructor.name}</h3>
              <p className="text-sm text-navy-600 font-medium mb-3">{instructor.role}</p>
              <p className="text-sm text-gray-600 leading-relaxed mb-4">{instructor.description}</p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {instructor.specialties.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 text-xs font-medium bg-navy-50 text-navy-700 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
