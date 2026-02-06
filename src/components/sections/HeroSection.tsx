"use client";

import { motion } from "framer-motion";
import CountUp from "@/components/ui/CountUp";
import { STATS } from "@/lib/constants";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-navy-900 via-navy-800 to-navy-700" />
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-white rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-300 rounded-full blur-3xl" />
      </div>
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMSIvPjwvZz48L2c+PC9zdmc+')] opacity-50" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 lg:py-40">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Text Content */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-block px-4 py-1.5 bg-white/10 backdrop-blur-sm text-white/90 text-sm font-medium rounded-full mb-6 border border-white/10">
                Education & Consulting
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6"
            >
              당신의 모든 순간을
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-cyan-300">
                특별한 이야기
              </span>
              로,
              <br />
              <span className="tracking-wider">AMOUS</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-lg sm:text-xl text-gray-300 leading-relaxed mb-10 max-w-xl"
            >
              전문가와 데이터가 만드는 격이 다른 교육 솔루션.
              <br className="hidden sm:block" />
              현직 아나운서 대표의 직강과 현직 기업 면접관의 실전 인사이트로
              당신의 성장을 함께합니다.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.45 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <a
                href="#services"
                className="inline-flex items-center justify-center px-8 py-4 bg-white text-navy-800 font-bold rounded-full hover:bg-gray-100 transition-all hover:shadow-xl hover:shadow-white/10 text-base"
              >
                교육 서비스 살펴보기
                <svg className="ml-2 w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
              <a
                href="#contact"
                className="inline-flex items-center justify-center px-8 py-4 border-2 border-white/30 text-white font-semibold rounded-full hover:bg-white/10 transition-all text-base"
              >
                무료 상담 신청
              </a>
            </motion.div>
          </div>

          {/* Hero Image Placeholder */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative hidden lg:block"
          >
            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/10">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center text-white/40">
                  <svg className="w-20 h-20 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={0.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                  </svg>
                  <p className="text-sm">대표 프로필 이미지</p>
                  <p className="text-xs mt-1 text-white/30">740 x 920px 권장</p>
                </div>
              </div>
              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-2xl opacity-20 blur-xl" />
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-gradient-to-br from-violet-400 to-purple-400 rounded-2xl opacity-20 blur-xl" />
            </div>
          </motion.div>
        </div>

        {/* Stats Bar */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-20 lg:mt-28"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 p-8 md:p-10">
            {STATS.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-white mb-2">
                  <CountUp end={stat.value} suffix={stat.suffix} />
                </div>
                <div className="text-sm text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
