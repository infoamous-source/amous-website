"use client";

import { motion } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";
import ServiceIcon from "@/components/ui/ServiceIcon";
import { AFFILIATES } from "@/lib/constants";

export default function AffiliatesSection() {
  return (
    <section id="affiliates" className="py-24 lg:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          subtitle="Affiliates"
          title="에이머스 계열사"
          description="에이머스 그룹은 교육컨설팅을 넘어, 공간 시각화와 행사 기획 분야에서도 전문성을 갖추고 있습니다."
        />

        {/* Detail cards */}
        <div className="grid md:grid-cols-2 gap-8">
          {AFFILIATES.map((affiliate, index) => (
            <motion.div
              key={affiliate.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="bg-gray-50 rounded-2xl p-8 hover:shadow-lg transition-shadow group"
            >
              {/* Header */}
              <div className="flex items-start gap-4 mb-6">
                <div className={`w-14 h-14 rounded-2xl ${
                  index === 0
                    ? "bg-gradient-to-br from-sky-500 to-indigo-500"
                    : "bg-gradient-to-br from-rose-500 to-pink-500"
                } text-white flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform`}>
                  <ServiceIcon name={affiliate.icon} className="w-7 h-7" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">{affiliate.name}</h3>
                  <p className="text-sm text-gray-500">{affiliate.nameEn}</p>
                </div>
              </div>

              {/* Description */}
              <p className="text-gray-600 text-sm leading-relaxed mb-6">{affiliate.description}</p>

              {/* Features */}
              <div className="space-y-3">
                {affiliate.features.map((feature) => (
                  <div key={feature} className="flex items-center gap-3">
                    <svg className={`w-4 h-4 flex-shrink-0 ${
                      index === 0 ? "text-indigo-600" : "text-rose-600"
                    }`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                    <span className="text-sm text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>

              {/* Portfolio image placeholder */}
              <div className="mt-8 aspect-[16/9] rounded-xl overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center text-gray-400">
                    <svg className="w-10 h-10 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={0.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5a1.5 1.5 0 001.5-1.5V5.25a1.5 1.5 0 00-1.5-1.5H3.75a1.5 1.5 0 00-1.5 1.5v14.25a1.5 1.5 0 001.5 1.5z" />
                    </svg>
                    <p className="text-xs">{index === 0 ? "건축 CG 포트폴리오 이미지" : "행사 현장 이미지"}</p>
                    <p className="text-xs text-gray-300 mt-1">800 x 450px 권장</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
