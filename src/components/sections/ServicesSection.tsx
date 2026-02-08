"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import SectionHeading from "@/components/ui/SectionHeading";
import ServiceIcon from "@/components/ui/ServiceIcon";
import { SERVICES } from "@/lib/constants";

interface ServiceItem {
  id: number;
  slug: string;
  title: string;
  subtitle: string | null;
  description: string | null;
  icon: string;
  color: string;
  page_content: string | null;
  sort_order: number;
}

export default function ServicesSection() {
  const [services, setServices] = useState<ServiceItem[]>(SERVICES as unknown as ServiceItem[]);

  useEffect(() => {
    async function fetchServices() {
      try {
        const res = await fetch("/api/services");
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data) && data.length > 0) {
            setServices(data);
          }
        }
      } catch {
        // Keep fallback constants
      }
    }
    fetchServices();
  }, []);

  return (
    <section id="services" className="py-24 lg:py-32 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          subtitle="Education Services"
          title="맞춤형 교육 서비스"
          description="다양한 대상에 최적화된 교육 프로그램. 각 분야 전문가가 설계한 체계적인 커리큘럼으로 실질적인 성장을 이끌어냅니다."
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link
                href={`/services/${service.slug}`}
                className="group relative bg-white rounded-2xl p-8 hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden block h-full"
              >
                {/* Gradient accent top */}
                <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${service.color} opacity-0 group-hover:opacity-100 transition-opacity`} />

                {/* Icon */}
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${service.color} text-white flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  <ServiceIcon name={service.icon} className="w-7 h-7" />
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-gray-900 mb-1">{service.title}</h3>
                <p className="text-sm font-medium text-navy-600 mb-4">{service.subtitle}</p>
                <p className="text-gray-600 text-sm leading-relaxed mb-6">{service.description}</p>

                {/* Link */}
                <div className="flex items-center text-navy-800 font-semibold text-sm group-hover:gap-2 transition-all">
                  자세히 보기
                  <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
