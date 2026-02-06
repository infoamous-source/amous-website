"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
          <a href="#" className="flex items-center gap-2 group">
            <div className={`text-2xl font-bold tracking-tight transition-colors ${
              isScrolled ? "text-navy-800" : "text-white"
            }`}>
              <span className="text-navy-800">A</span>
              <span className={isScrolled ? "text-gray-700" : "text-white"}>MOUS</span>
            </div>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <div
                key={link.label}
                className="relative"
                onMouseEnter={() => link.children && setOpenDropdown(link.label)}
                onMouseLeave={() => setOpenDropdown(null)}
              >
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
                        <a
                          key={child.label}
                          href={child.href}
                          className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-navy-50 hover:text-navy-800 transition-colors"
                        >
                          {child.label}
                        </a>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </nav>

          {/* CTA + Mobile Toggle */}
          <div className="flex items-center gap-3">
            <a
              href="#contact"
              className="hidden lg:inline-flex items-center px-6 py-2.5 bg-navy-800 text-white text-sm font-semibold rounded-full hover:bg-navy-900 transition-all hover:shadow-lg hover:shadow-navy-800/25"
            >
              문의하기
            </a>

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
                  <a
                    href={link.href}
                    onClick={() => setIsMobileOpen(false)}
                    className="block px-4 py-3 text-gray-700 font-medium rounded-lg hover:bg-navy-50 hover:text-navy-800 transition-colors"
                  >
                    {link.label}
                  </a>
                  {link.children && (
                    <div className="ml-4 space-y-1">
                      {link.children.map((child) => (
                        <a
                          key={child.label}
                          href={child.href}
                          onClick={() => setIsMobileOpen(false)}
                          className="block px-4 py-2 text-sm text-gray-500 hover:text-navy-800 transition-colors"
                        >
                          {child.label}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <div className="pt-4">
                <a
                  href="#contact"
                  onClick={() => setIsMobileOpen(false)}
                  className="block w-full text-center px-6 py-3 bg-navy-800 text-white font-semibold rounded-full hover:bg-navy-900 transition-colors"
                >
                  문의하기
                </a>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
