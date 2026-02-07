"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
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

const FILTER_TABS = [
  { slug: "all", label: "전체" },
  ...SERVICE_CATEGORIES,
];

export default function CasesPage() {
  const [cases, setCases] = useState<CaseItem[]>([]);
  const [activeFilter, setActiveFilter] = useState("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCases(activeFilter);
  }, [activeFilter]);

  async function fetchCases(category: string) {
    setLoading(true);
    try {
      const url = category === "all" ? "/api/cases" : `/api/cases?category=${category}`;
      const res = await fetch(url);
      if (res.ok) {
        setCases(await res.json());
      }
    } catch {
      setCases([]);
    }
    setLoading(false);
  }

  const getCategoryLabel = (slug: string) => {
    return SERVICE_CATEGORIES.find((c) => c.slug === slug)?.label || slug;
  };

  return (
    <>
      <Header />
      <main>
        {/* Hero */}
        <section className="pt-32 pb-16 lg:pt-40 lg:pb-20 bg-gradient-to-br from-navy-900 via-navy-800 to-navy-700">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <span className="inline-block text-sm font-semibold tracking-widest uppercase text-navy-200 mb-3">
                Success Stories
              </span>
              <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4">협업 사례</h1>
              <p className="text-lg text-gray-300 max-w-2xl mx-auto">
                다양한 기업과 기관이 에이머스와 함께 성장했습니다. 검증된 교육 솔루션의 실제 성과를 확인하세요.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Filter + List */}
        <section className="py-16 lg:py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Filter Buttons */}
            <div className="flex flex-wrap justify-center gap-3 mb-12">
              {FILTER_TABS.map((tab) => (
                <button
                  key={tab.slug}
                  onClick={() => setActiveFilter(tab.slug)}
                  className={`px-6 py-2.5 text-sm font-semibold rounded-full transition-all ${
                    activeFilter === tab.slug
                      ? "bg-navy-800 text-white shadow-lg shadow-navy-800/25"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Cases Grid */}
            {loading ? (
              <div className="flex justify-center py-20">
                <div className="animate-spin w-8 h-8 border-4 border-navy-800 border-t-transparent rounded-full" />
              </div>
            ) : cases.length === 0 ? (
              <div className="text-center py-20 text-gray-400">
                <svg className="w-16 h-16 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={0.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                </svg>
                <p className="text-lg">아직 등록된 사례가 없습니다.</p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {cases.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.08 }}
                    className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow"
                  >
                    {/* Image placeholder */}
                    <div className="aspect-[16/10] bg-gradient-to-br from-navy-50 to-navy-100 relative">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center text-navy-300">
                          <svg className="w-10 h-10 mx-auto mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={0.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5a1.5 1.5 0 001.5-1.5V5.25a1.5 1.5 0 00-1.5-1.5H3.75a1.5 1.5 0 00-1.5 1.5v14.25a1.5 1.5 0 001.5 1.5z" />
                          </svg>
                        </div>
                      </div>
                    </div>

                    <div className="p-6">
                      <div className="flex items-center gap-3 mb-3">
                        <span className="px-2.5 py-0.5 text-xs font-semibold bg-navy-50 text-navy-700 rounded-full">
                          {getCategoryLabel(item.category)}
                        </span>
                        {item.company && (
                          <>
                            <span className="text-xs text-gray-300">|</span>
                            <span className="text-xs text-gray-500">{item.company}</span>
                          </>
                        )}
                      </div>
                      <h3 className="text-lg font-bold text-gray-900 mb-3 leading-snug">{item.title}</h3>
                      {item.content && (
                        <p className="text-sm text-gray-600 mb-4 line-clamp-2">{item.content}</p>
                      )}
                      {item.result && (
                        <div className="flex items-start gap-2 pt-3 border-t border-gray-100">
                          <svg className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <p className="text-sm text-gray-700 font-medium">{item.result}</p>
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
