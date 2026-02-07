"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import SectionHeading from "@/components/ui/SectionHeading";
import { SERVICE_CATEGORIES } from "@/lib/constants";

interface CaseItem {
  id: number;
  category: string;
  company: string | null;
  title: string;
  content: string | null;
  result: string | null;
  image_url: string | null;
  created_at: string;
}

const FALLBACK_CASES: CaseItem[] = [
  {
    id: 1,
    category: "immigrant",
    company: "공공기관 B",
    title: "다문화 가정 한국어 · 문화 적응 교육",
    content: "이주민 대상 한국어 및 문화 적응 프로그램 운영",
    result: "수료율 95%, 정착 성공률 89%",
    image_url: null,
    created_at: new Date().toISOString(),
  },
  {
    id: 2,
    category: "career",
    company: "대학교 C",
    title: "취업 면접 집중 코칭 프로그램",
    content: "대학생 대상 면접·스피치 코칭 실시",
    result: "참여 학생 취업률 82%, 역대 최고 기록 달성",
    image_url: null,
    created_at: new Date().toISOString(),
  },
  {
    id: 3,
    category: "senior",
    company: "시니어센터 D",
    title: "중장년 디지털 리터러시 교육",
    content: "중장년층 대상 디지털 활용 능력 향상 프로그램",
    result: "수강생 만족도 96%, 디지털 활용 자신감 2배 향상",
    image_url: null,
    created_at: new Date().toISOString(),
  },
];

const getCategoryLabel = (slug: string) => {
  return SERVICE_CATEGORIES.find((c) => c.slug === slug)?.label || slug;
};

export default function CasesSection() {
  const [cases, setCases] = useState<CaseItem[]>(FALLBACK_CASES);

  useEffect(() => {
    async function fetchCases() {
      try {
        const res = await fetch("/api/cases?limit=3");
        if (res.ok) {
          const data = await res.json();
          if (data.length > 0) setCases(data);
        }
      } catch {
        // use fallback
      }
    }
    fetchCases();
  }, []);

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
              key={item.id}
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
                    <p className="text-xs">{getCategoryLabel(item.category)} 교육 이미지</p>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-xs font-semibold text-blue-400 uppercase tracking-wider">
                    {getCategoryLabel(item.category)}
                  </span>
                  {item.company && (
                    <>
                      <span className="text-xs text-white/40">|</span>
                      <span className="text-xs text-white/60">{item.company}</span>
                    </>
                  )}
                </div>
                <h3 className="text-lg font-bold text-white mb-3 leading-snug">{item.title}</h3>
                {item.result && (
                  <div className="flex items-start gap-2 pt-3 border-t border-white/10">
                    <svg className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p className="text-sm text-gray-300">{item.result}</p>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* 더보기 버튼 */}
        <div className="text-center mt-12">
          <Link
            href="/cases"
            className="inline-flex items-center gap-2 px-8 py-3 border border-white/20 text-white font-semibold rounded-full hover:bg-white/10 transition-all"
          >
            모든 사례 보기
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
