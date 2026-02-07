"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ServiceIcon from "@/components/ui/ServiceIcon";
import { SERVICES, SERVICE_CATEGORIES } from "@/lib/constants";

interface Instructor {
  id: number;
  name: string;
  role: string | null;
  description: string | null;
  specialties: string[];
  image_url: string | null;
}

interface ServiceData {
  id: number;
  slug: string;
  title: string;
  subtitle: string | null;
  description: string | null;
  icon: string | null;
  color: string | null;
  page_content: string | null;
}

export default function ServicePage() {
  const params = useParams();
  const slug = params.slug as string;

  const [service, setService] = useState<ServiceData | null>(null);
  const [instructors, setInstructors] = useState<Instructor[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        // Fetch service
        const svcRes = await fetch(`/api/services?slug=${slug}`);
        if (svcRes.ok) {
          const svcData = await svcRes.json();
          const found = Array.isArray(svcData)
            ? svcData.find((s: ServiceData) => s.slug === slug)
            : svcData;
          if (found) {
            setService(found);
            // Fetch instructors for this service
            const instrRes = await fetch(`/api/instructors?service_id=${found.id}`);
            if (instrRes.ok) {
              setInstructors(await instrRes.json());
            }
          }
        }
      } catch {
        // Fallback to constants
        const fallback = SERVICES.find((s) => s.slug === slug);
        if (fallback) {
          setService(fallback as unknown as ServiceData);
        }
      }
      setLoading(false);
    }
    fetchData();
  }, [slug]);

  // Fallback while loading
  const fallbackService = SERVICES.find((s) => s.slug === slug);
  const displayService = service || (fallbackService as unknown as ServiceData);
  const categoryLabel = SERVICE_CATEGORIES.find((c) => c.slug === slug)?.label || "";

  if (loading && !fallbackService) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-navy-800 border-t-transparent rounded-full" />
      </div>
    );
  }

  if (!displayService) {
    return (
      <>
        <Header />
        <div className="min-h-screen flex items-center justify-center pt-20">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">서비스를 찾을 수 없습니다</h1>
            <a href="/" className="text-navy-800 hover:underline">홈으로 돌아가기</a>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <main>
        {/* Hero Banner */}
        <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 bg-gradient-to-br from-navy-900 via-navy-800 to-navy-700">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-1/4 right-1/4 w-80 h-80 bg-white rounded-full blur-3xl" />
          </div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <a href="/#services" className="inline-flex items-center text-white/60 hover:text-white/80 text-sm mb-6 transition-colors">
                <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                교육 서비스
              </a>
              <div className="flex items-center gap-4 mb-6">
                {displayService.icon && (
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${displayService.color || "from-blue-500 to-cyan-400"} text-white flex items-center justify-center`}>
                    <ServiceIcon name={displayService.icon} className="w-8 h-8" />
                  </div>
                )}
                <div>
                  <h1 className="text-4xl lg:text-5xl font-bold text-white">{displayService.title}</h1>
                  {displayService.subtitle && (
                    <p className="text-lg text-white/70 mt-1">{displayService.subtitle}</p>
                  )}
                </div>
              </div>
              <p className="text-lg text-gray-300 max-w-2xl leading-relaxed">
                {displayService.description}
              </p>
            </motion.div>
          </div>
        </section>

        {/* Service Detail Content */}
        <section className="py-20 lg:py-28 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-8">프로그램 소개</h2>
              <div className="prose prose-lg max-w-none text-gray-600 leading-relaxed">
                {displayService.page_content ? (
                  <p>{displayService.page_content}</p>
                ) : (
                  <p>{displayService.description}</p>
                )}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Instructors for this service */}
        {instructors.length > 0 && (
          <section className="py-20 lg:py-28 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-center mb-16"
              >
                <span className="text-sm font-semibold tracking-widest uppercase text-navy-800 mb-3 block">
                  Instructors
                </span>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  {categoryLabel} 전문 강사진
                </h2>
              </motion.div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {instructors.map((instructor, index) => (
                  <motion.div
                    key={instructor.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.15 }}
                    className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow"
                  >
                    {/* Photo placeholder */}
                    <div className="aspect-[3/4] rounded-xl overflow-hidden bg-gradient-to-br from-navy-50 to-navy-100 mb-5 relative">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center text-navy-300">
                          <svg className="w-14 h-14 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={0.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                          </svg>
                          <p className="text-xs">강사 사진</p>
                        </div>
                      </div>
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-1">{instructor.name}</h3>
                    <p className="text-sm text-navy-600 font-medium mb-3">{instructor.role}</p>
                    <p className="text-sm text-gray-600 leading-relaxed mb-4">{instructor.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {instructor.specialties?.map((tag) => (
                        <span key={tag} className="px-3 py-1 text-xs font-medium bg-navy-50 text-navy-700 rounded-full">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* CTA */}
        <section className="py-20 bg-navy-800">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-bold text-white mb-4">
                {categoryLabel} 교육에 관심이 있으신가요?
              </h2>
              <p className="text-gray-300 mb-8">
                에이머스의 전문 교육 프로그램에 대해 더 자세히 알고 싶으시다면 무료 상담을 신청해 주세요.
              </p>
              <a
                href="/#contact"
                className="inline-flex items-center px-8 py-4 bg-white text-navy-800 font-bold rounded-full hover:bg-gray-100 transition-all"
              >
                무료 상담 신청
                <svg className="ml-2 w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
