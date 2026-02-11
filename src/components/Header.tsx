"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { NAV_LINKS } from "@/lib/constants";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isMobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isMobileOpen]);

  const isExternalLink = (link: typeof NAV_LINKS[number]) => {
    return "external" in link && link.external;
  };

  const isAbsoluteLink = (href: string) => {
    return href.startsWith("/") || href.startsWith("http");
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-md shadow-lg"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group" aria-label="에이머스 홈">
            {/* A Symbol */}
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 150" className="h-10 sm:h-14 w-auto">
              <g transform="translate(60, 75)">
                <line x1="-45" y1="60" x2="0" y2="-60" stroke="#C9D6E8" strokeWidth="2" opacity="0.7"/>
                <line x1="45" y1="60" x2="0" y2="-60" stroke="#C9D6E8" strokeWidth="2" opacity="0.7"/>
                <line x1="-25" y1="12" x2="25" y2="12" stroke="#C9D6E8" strokeWidth="2" opacity="0.7"/>
                <line x1="-25" y1="12" x2="0" y2="-60" stroke="#C9D6E8" strokeWidth="0.8" opacity="0.2"/>
                <line x1="25" y1="12" x2="0" y2="-60" stroke="#C9D6E8" strokeWidth="0.8" opacity="0.2"/>
                <circle cx="0" cy="-60" r="10" fill="#C8A84E" opacity="0.1"/>
                <circle cx="0" cy="-60" r="5" fill={isScrolled ? "#F0F0F0" : "#FFFFFF"}/>
                <circle cx="0" cy="-60" r="2.5" fill="#C8A84E"/>
                <circle cx="-45" cy="60" r="4" fill={isScrolled ? "#F0F0F0" : "#FFFFFF"}/>
                <circle cx="-45" cy="60" r="2" fill="#C8A84E" opacity="0.8"/>
                <circle cx="45" cy="60" r="4" fill={isScrolled ? "#F0F0F0" : "#FFFFFF"}/>
                <circle cx="45" cy="60" r="2" fill="#C8A84E" opacity="0.8"/>
                <circle cx="-25" cy="12" r="3" fill="#C9D6E8" opacity="0.7"/>
                <circle cx="25" cy="12" r="3" fill="#C9D6E8" opacity="0.7"/>
              </g>
            </svg>
            {/* Text */}
            <span className={`text-base sm:text-xl font-semibold tracking-[0.15em] sm:tracking-[0.25em] transition-colors ${
              isScrolled ? "text-navy-800" : "text-white"
            }`}>
              AMOUS EDU
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <div
                key={link.label}
                className="relative"
                onMouseEnter={() => link.children && setOpenDropdown(link.label)}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                {isExternalLink(link) ? (
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors inline-flex items-center gap-1 ${
                      isScrolled
                        ? "text-gray-700 hover:text-navy-800 hover:bg-navy-50"
                        : "text-white/90 hover:text-white hover:bg-white/10"
                    }`}
                  >
                    {link.label}
                    <svg className="w-3 h-3 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                    </svg>
                  </a>
                ) : isAbsoluteLink(link.href) ? (
                  <Link
                    href={link.href}
                    className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                      isScrolled
                        ? "text-gray-700 hover:text-navy-800 hover:bg-navy-50"
                        : "text-white/90 hover:text-white hover:bg-white/10"
                    }`}
                  >
                    {link.label}
                    {link.children && (
                      <svg className="inline-block ml-1 w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    )}
                  </Link>
                ) : (
                  <a
                    href={link.href}
                    className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                      isScrolled
                        ? "text-gray-700 hover:text-navy-800 hover:bg-navy-50"
                        : "text-white/90 hover:text-white hover:bg-white/10"
                    }`}
                  >
                    {link.label}
                    {link.children && (
                      <svg className="inline-block ml-1 w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    )}
                  </a>
                )}

                {/* Dropdown */}
                <AnimatePresence>
                  {link.children && openDropdown === link.label && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full left-0 mt-1 w-48 bg-white rounded-xl shadow-xl border border-gray-100 py-2 overflow-hidden"
                    >
                      {link.children.map((child) => (
                        <Link
                          key={child.label}
                          href={child.href}
                          className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-navy-50 hover:text-navy-800 transition-colors"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </nav>

          {/* CTA + Mobile Toggle */}
          <div className="flex items-center gap-3">
            {/* Admin 링크 - 작고 눈에 띄지 않게 */}
            <Link
              href="/admin/login"
              className="hidden lg:inline-flex items-center gap-1 px-2 py-1 text-xs text-gray-400 hover:text-navy-800 transition-colors rounded"
              title="관리자"
            >
              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span className="sr-only">관리자</span>
            </Link>

            <button
              onClick={() => {
                const el = document.getElementById("contact");
                if (el) {
                  el.scrollIntoView({ behavior: "smooth" });
                } else {
                  window.location.href = "/#contact";
                }
              }}
              className="hidden lg:inline-flex items-center px-6 py-2.5 bg-navy-800 text-white text-sm font-semibold rounded-full hover:bg-navy-900 transition-all hover:shadow-lg hover:shadow-navy-800/25 cursor-pointer"
            >
              문의하기
            </button>

            <button
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              className={`lg:hidden p-2 rounded-lg transition-colors ${
                isScrolled ? "text-gray-700" : "text-white"
              }`}
              aria-label="메뉴 열기"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                {isMobileOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden bg-white border-t border-gray-100 overflow-hidden"
          >
            <nav className="max-w-7xl mx-auto px-4 py-6 space-y-1">
              {NAV_LINKS.map((link) => (
                <div key={link.label}>
                  {isExternalLink(link) ? (
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => setIsMobileOpen(false)}
                      className="flex items-center gap-2 px-4 py-3 text-gray-700 font-medium rounded-lg hover:bg-navy-50 hover:text-navy-800 transition-colors"
                    >
                      {link.label}
                      <svg className="w-3 h-3 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                      </svg>
                    </a>
                  ) : isAbsoluteLink(link.href) ? (
                    <Link
                      href={link.href}
                      onClick={() => setIsMobileOpen(false)}
                      className="block px-4 py-3 text-gray-700 font-medium rounded-lg hover:bg-navy-50 hover:text-navy-800 transition-colors"
                    >
                      {link.label}
                    </Link>
                  ) : (
                    <a
                      href={link.href}
                      onClick={() => setIsMobileOpen(false)}
                      className="block px-4 py-3 text-gray-700 font-medium rounded-lg hover:bg-navy-50 hover:text-navy-800 transition-colors"
                    >
                      {link.label}
                    </a>
                  )}
                  {link.children && (
                    <div className="ml-4 space-y-1">
                      {link.children.map((child) => (
                        <Link
                          key={child.label}
                          href={child.href}
                          onClick={() => setIsMobileOpen(false)}
                          className="block px-4 py-2 text-sm text-gray-500 hover:text-navy-800 transition-colors"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <div className="pt-4">
                <button
                  onClick={() => {
                    setIsMobileOpen(false);
                    setTimeout(() => {
                      const el = document.getElementById("contact");
                      if (el) {
                        el.scrollIntoView({ behavior: "smooth" });
                      } else {
                        window.location.href = "/#contact";
                      }
                    }, 300);
                  }}
                  className="block w-full text-center px-6 py-3 bg-navy-800 text-white font-semibold rounded-full hover:bg-navy-900 transition-colors cursor-pointer"
                >
                  문의하기
                </button>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
