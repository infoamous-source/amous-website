"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";
import { CONTACT_FIELDS } from "@/lib/constants";

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    organization: "",
    phone: "",
    email: "",
    interests: [] as string[],
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInterestToggle = (interest: string) => {
    setFormData((prev) => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter((i) => i !== interest)
        : [...prev.interests, interest],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  return (
    <section id="contact" className="py-24 lg:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          subtitle="Contact Us"
          title="문의하기"
          description="교육에 관한 모든 궁금증을 해결해 드립니다. 아래 양식을 작성해 주시면 영업일 기준 1일 이내에 답변 드리겠습니다."
        />

        <div className="max-w-3xl mx-auto">
          <AnimatePresence mode="wait">
            {isSubmitted ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="text-center py-16"
              >
                <div className="w-20 h-20 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-6">
                  <svg className="w-10 h-10 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">문의가 접수되었습니다</h3>
                <p className="text-gray-600 mb-2">감사합니다! 소중한 문의를 확인 후</p>
                <p className="text-gray-600 mb-8">영업일 기준 1일 이내에 연락드리겠습니다.</p>
                <button
                  onClick={() => {
                    setIsSubmitted(false);
                    setFormData({ name: "", organization: "", phone: "", email: "", interests: [], message: "" });
                  }}
                  className="px-6 py-3 bg-navy-800 text-white font-semibold rounded-full hover:bg-navy-900 transition-colors"
                >
                  추가 문의하기
                </button>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                onSubmit={handleSubmit}
                className="space-y-8"
              >
                {/* Name & Organization */}
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-semibold text-gray-900 mb-2">
                      성함 <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-navy-800/20 focus:border-navy-800 transition-all"
                      placeholder="홍길동"
                    />
                  </div>
                  <div>
                    <label htmlFor="org" className="block text-sm font-semibold text-gray-900 mb-2">
                      소속
                    </label>
                    <input
                      type="text"
                      id="org"
                      value={formData.organization}
                      onChange={(e) => setFormData((prev) => ({ ...prev, organization: e.target.value }))}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-navy-800/20 focus:border-navy-800 transition-all"
                      placeholder="회사/기관/학교명"
                    />
                  </div>
                </div>

                {/* Phone & Email */}
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="phone" className="block text-sm font-semibold text-gray-900 mb-2">
                      연락처 <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-navy-800/20 focus:border-navy-800 transition-all"
                      placeholder="010-1234-5678"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-gray-900 mb-2">
                      이메일 <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-navy-800/20 focus:border-navy-800 transition-all"
                      placeholder="email@example.com"
                    />
                  </div>
                </div>

                {/* Interest checkboxes */}
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-3">
                    관심 교육 분야 <span className="text-gray-400 font-normal">(복수 선택 가능)</span>
                  </label>
                  <div className="flex flex-wrap gap-3">
                    {CONTACT_FIELDS.map((field) => (
                      <button
                        key={field}
                        type="button"
                        onClick={() => handleInterestToggle(field)}
                        className={`px-4 py-2 text-sm rounded-full border transition-all ${
                          formData.interests.includes(field)
                            ? "bg-navy-800 text-white border-navy-800"
                            : "bg-white text-gray-700 border-gray-200 hover:border-navy-300 hover:text-navy-800"
                        }`}
                      >
                        {formData.interests.includes(field) && (
                          <svg className="inline-block w-4 h-4 mr-1 -ml-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                          </svg>
                        )}
                        {field}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="message" className="block text-sm font-semibold text-gray-900 mb-2">
                    문의 내용 <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="message"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData((prev) => ({ ...prev, message: e.target.value }))}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-navy-800/20 focus:border-navy-800 transition-all resize-none"
                    placeholder="문의하실 내용을 자유롭게 작성해 주세요."
                  />
                </div>

                {/* Submit */}
                <div className="text-center pt-4">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex items-center justify-center px-10 py-4 bg-navy-800 text-white font-bold rounded-full hover:bg-navy-900 transition-all hover:shadow-lg hover:shadow-navy-800/25 disabled:opacity-70 disabled:cursor-not-allowed min-w-[200px]"
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        전송 중...
                      </>
                    ) : (
                      "문의 보내기"
                    )}
                  </button>
                  <p className="mt-4 text-xs text-gray-400">
                    제출하신 정보는 문의 답변 목적으로만 사용되며, 개인정보 보호정책에 따라 안전하게 관리됩니다.
                  </p>
                </div>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
