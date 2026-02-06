"use client";

import { motion } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";

const cases = [
  {
    company: "대기업 A사",
    category: "기업 교육",
    title: "임직원 커뮤니케이션 역량 강화 프로그램",
    result: "교육 만족도 97%, 내부 소통 효율 34% 향상",
    image: "기업 교육 현장 이미지",
  },
  {
    company: "공공기관 B",
    category: "이주민 교육",
    title: "다문화 가정 한국어 · 문화 적응 교육",
    result: "수료율 95%, 정착 성공률 89%",
    image: "다문화 교육 이미지",
  },
  {
    company: "대학교 C",
    category: "청년 교육",
    title: "취업 면접 집중 코칭 프로그램",
    result: "참여 학생 취업률 82%, 역대 최고 기록 달성",
    image: "대학 취업 특강 이미지",
  },
];

export default function CasesSection() {
  return (
    <section id="cases" className="py-24 lg:py-32 bg-navy-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          subtitle="Success Stories"
          title="협업 사례"
          description="다양한 기업과 기관이 에이머스와 함께 성장했습니다. 검증된 교육 솔루션의 실제 성과를 확인하세요."
          light
        />

        <div className="grid md:grid-cols-3 gap-8">
          {cases.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="group bg-white/5 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/10 hover:border-white/20 transition-all"
            >
              {/* Image placeholder */}
              <div className="aspect-[16/10] bg-gradient-to-br from-navy-700 to-navy-800 relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center text-white/30">
                    <svg className="w-10 h-10 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={0.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5a1.5 1.5 0 001.5-1.5V5.25a1.5 1.5 0 00-1.5-1.5H3.75a1.5 1.5 0 00-1.5 1.5v14.25a1.5 1.5 0 001.5 1.5z" />
                    </svg>
                    <p className="text-xs">{item.image}</p>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-xs font-semibold text-blue-400 uppercase tracking-wider">{item.category}</span>
                  <span className="text-xs text-white/40">|</span>
                  <span className="text-xs text-white/60">{item.company}</span>
                </div>
                <h3 className="text-lg font-bold text-white mb-3 leading-snug">{item.title}</h3>
                <div className="flex items-start gap-2 pt-3 border-t border-white/10">
                  <svg className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p className="text-sm text-gray-300">{item.result}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
