"use client";

import { motion } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";

const posts = [
  {
    category: "면접 코칭",
    title: "면접관이 말하는 합격하는 자기소개, 3가지 핵심 전략",
    excerpt: "15년간 면접관으로 활동하며 발견한, 합격자들의 공통된 자기소개 패턴을 공개합니다.",
    date: "2025.01.15",
    readTime: "5분",
  },
  {
    category: "스피치",
    title: "아나운서가 알려주는 목소리 톤 조절법",
    excerpt: "같은 내용도 어떻게 말하느냐에 따라 설득력이 달라집니다. 프로의 목소리 관리 비법.",
    date: "2025.01.10",
    readTime: "4분",
  },
  {
    category: "기업교육",
    title: "2025년 기업교육 트렌드: AI 시대의 소통 역량",
    excerpt: "AI가 대체할 수 없는 인간만의 소통 역량, 기업은 무엇을 교육해야 하는가.",
    date: "2025.01.05",
    readTime: "6분",
  },
];

export default function BlogSection() {
  return (
    <section id="blog" className="py-24 lg:py-32 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          subtitle="Blog & Insights"
          title="에이머스 인사이트"
          description="교육 전문가의 시각으로 바라본 최신 트렌드와 실전 노하우를 공유합니다."
        />

        <div className="grid md:grid-cols-3 gap-8">
          {posts.map((post, index) => (
            <motion.article
              key={post.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="group bg-white rounded-2xl overflow-hidden hover:shadow-xl transition-all cursor-pointer"
            >
              {/* Thumbnail placeholder */}
              <div className="aspect-[16/9] bg-gradient-to-br from-navy-50 to-navy-100 relative overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center text-navy-300">
                    <svg className="w-10 h-10 mx-auto mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={0.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 01-2.25 2.25M16.5 7.5V18a2.25 2.25 0 002.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 002.25 2.25h13.5" />
                    </svg>
                    <p className="text-xs">블로그 썸네일</p>
                  </div>
                </div>
                <div className="absolute inset-0 bg-navy-800/0 group-hover:bg-navy-800/10 transition-colors" />
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <span className="px-2.5 py-0.5 text-xs font-semibold bg-navy-50 text-navy-700 rounded-full">
                    {post.category}
                  </span>
                  <span className="text-xs text-gray-400">{post.readTime} 읽기</span>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2 leading-snug group-hover:text-navy-800 transition-colors">
                  {post.title}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed mb-4">{post.excerpt}</p>
                <time className="text-xs text-gray-400">{post.date}</time>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
