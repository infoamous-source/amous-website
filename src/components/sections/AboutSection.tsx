"use client";

import { motion } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";

export default function AboutSection() {
  const strengths = [
    {
      title: "현직 아나운서 대표 직강",
      description: "정부기관·기업 공식행사 현직 아나운서로서 현장에서 쌓은 커뮤니케이션 노하우를 바탕으로, 실전에서 바로 통하는 스피치와 프레젠테이션 교육을 제공합니다.",
      icon: (
        <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z" />
        </svg>
      ),
    },
    {
      title: "현직 기업 면접관 · 자문위원",
      description: "다수 기업의 현직 외부 면접관 및 자문위원으로 활동하며 축적한 데이터 기반의 면접 코칭. 합격률을 극적으로 높이는 전략적 접근법을 전수합니다.",
      icon: (
        <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
        </svg>
      ),
    },
    {
      title: "데이터 기반 교육 설계",
      description: "15,000명 이상의 교육 데이터를 분석하여 최적화된 커리큘럼을 설계합니다. 측정 가능한 성장을 약속합니다.",
      icon: (
        <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
        </svg>
      ),
    },
    {
      title: "맞춤형 교육 솔루션",
      description: "교육 대상과 목적에 맞춘 최적화된 커리큘럼 설계. B2B·B2C를 모두 아우르는 폭넓은 교육 솔루션을 제공합니다.",
      icon: (
        <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
        </svg>
      ),
    },
  ];

  return (
    <section id="about" className="py-24 lg:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          subtitle="About AMOUS"
          title="왜 에이머스인가?"
          description="전문성, 데이터, 그리고 진심이 만드는 교육의 차이. 에이머스는 단순한 교육을 넘어 당신의 성장 파트너가 됩니다."
        />

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Image Placeholder */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-gradient-to-br from-navy-50 to-navy-100">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center text-navy-300">
                  <svg className="w-16 h-16 mx-auto mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={0.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5a1.5 1.5 0 001.5-1.5V5.25a1.5 1.5 0 00-1.5-1.5H3.75a1.5 1.5 0 00-1.5 1.5v14.25a1.5 1.5 0 001.5 1.5z" />
                  </svg>
                  <p className="text-sm">대표 활동 이미지</p>
                  <p className="text-xs mt-1 text-navy-200">800 x 600px 권장</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Strengths Grid */}
          <div className="grid sm:grid-cols-2 gap-6">
            {strengths.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="p-6 rounded-2xl bg-gray-50 hover:bg-navy-50 transition-colors group"
              >
                <div className="w-12 h-12 rounded-xl bg-navy-800 text-white flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  {item.icon}
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
