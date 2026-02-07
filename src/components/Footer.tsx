"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-navy-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer */}
        <div className="py-16 grid md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 370" className="h-10 w-auto">
                <g transform="translate(300, 170)">
                  <line x1="-52" y1="70" x2="0" y2="-80" stroke="#C9D6E8" strokeWidth="1.5" opacity="0.7"/>
                  <line x1="52" y1="70" x2="0" y2="-80" stroke="#C9D6E8" strokeWidth="1.5" opacity="0.7"/>
                  <line x1="-30" y1="15" x2="30" y2="15" stroke="#C9D6E8" strokeWidth="1.5" opacity="0.7"/>
                  <line x1="-30" y1="15" x2="0" y2="-80" stroke="#C9D6E8" strokeWidth="0.5" opacity="0.21"/>
                  <line x1="30" y1="15" x2="0" y2="-80" stroke="#C9D6E8" strokeWidth="0.5" opacity="0.21"/>
                  <circle cx="0" cy="-80" r="12" fill="#C8A84E" opacity="0.08"/>
                  <circle cx="0" cy="-80" r="4" fill="#FFFFFF"/>
                  <circle cx="0" cy="-80" r="2" fill="#C8A84E"/>
                  <circle cx="-52" cy="70" r="3.5" fill="#FFFFFF"/>
                  <circle cx="-52" cy="70" r="1.5" fill="#C8A84E" opacity="0.8"/>
                  <circle cx="52" cy="70" r="3.5" fill="#FFFFFF"/>
                  <circle cx="52" cy="70" r="1.5" fill="#C8A84E" opacity="0.8"/>
                  <circle cx="-30" cy="15" r="2.5" fill="#C9D6E8" opacity="0.7"/>
                  <circle cx="30" cy="15" r="2.5" fill="#C9D6E8" opacity="0.7"/>
                </g>
                <text x="155" y="295" fill="#FFFFFF" fontFamily="Inter, Arial, sans-serif" fontSize="32" fontWeight="500" textAnchor="start">AMOUS EDU</text>
              </svg>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              당신의 모든 순간을 특별한 이야기로.
              <br />
              전문가와 데이터가 만드는 격이 다른 교육 솔루션.
            </p>
            {/* Social */}
            <div className="flex gap-3">
              {[
                { label: "Instagram", href: "#", icon: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" },
                { label: "YouTube", href: "#", icon: "M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" },
                { label: "Blog", href: "https://blog.naver.com/amous_edu", icon: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" },
              ].map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target={social.href.startsWith("http") ? "_blank" : undefined}
                  rel={social.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  aria-label={social.label}
                  className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d={social.icon} />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider mb-5 text-gray-300">교육 서비스</h4>
            <ul className="space-y-3">
              {[
                { label: "이주민·유학생 교육", href: "/services/immigrant" },
                { label: "중장년·시니어 교육", href: "/services/senior" },
                { label: "취업·직무 역량강화", href: "/services/career" },
              ].map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-gray-400 hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Affiliates */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider mb-5 text-gray-300">계열사</h4>
            <ul className="space-y-3">
              <li>
                <a href="#affiliates" className="text-sm text-gray-400 hover:text-white transition-colors">
                  에이머스스튜디오
                </a>
              </li>
              <li>
                <a href="#affiliates" className="text-sm text-gray-400 hover:text-white transition-colors">
                  에이머스이벤트
                </a>
              </li>
            </ul>
            <h4 className="text-sm font-bold uppercase tracking-wider mb-5 mt-8 text-gray-300">바로가기</h4>
            <ul className="space-y-3">
              <li>
                <a href="#about" className="text-sm text-gray-400 hover:text-white transition-colors">
                  회사 소개
                </a>
              </li>
              <li>
                <a
                  href="https://blog.naver.com/amous_edu"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-gray-400 hover:text-white transition-colors inline-flex items-center gap-1"
                >
                  블로그
                  <svg className="w-3 h-3 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                  </svg>
                </a>
              </li>
              <li>
                <Link href="/cases" className="text-sm text-gray-400 hover:text-white transition-colors">
                  협업 사례
                </Link>
              </li>
              <li>
                <a href="#contact" className="text-sm text-gray-400 hover:text-white transition-colors">
                  문의하기
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider mb-5 text-gray-300">연락처</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <svg className="w-5 h-5 text-gray-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                </svg>
                <span className="text-sm text-gray-400">경기도 김포시 김포한강9로75번길 66,<br />505-K71호(구래동, 국제프라자)</span>
              </li>
              <li className="flex items-center gap-3">
                <svg className="w-5 h-5 text-gray-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                </svg>
                <span className="text-sm text-gray-400">010-9922-0309</span>
              </li>
              <li className="flex items-center gap-3">
                <svg className="w-5 h-5 text-gray-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                </svg>
                <span className="text-sm text-gray-400">info.amous@gmail.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs text-gray-500">
              <p>에이머스(AMOUS) 교육컨설팅 | 대표: 유수인 | 사업자등록번호: 323-34-01659</p>
              <p className="mt-1">&copy; 2026 AMOUS Education &amp; Consulting. All rights reserved.</p>
            </div>
            <div className="flex gap-6 text-xs text-gray-500">
              <a href="#" className="hover:text-gray-300 transition-colors">개인정보처리방침</a>
              <a href="#" className="hover:text-gray-300 transition-colors">이용약관</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
