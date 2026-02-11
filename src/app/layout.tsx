import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "AMOUS 에이머스 교육컨설팅 | 당신의 모든 순간을 특별한 이야기로",
  description:
    "아나운서 출신 대표의 직강과 전문 면접관의 실전 인사이트. 이주민, 시니어, 청년, 아동, 기업을 위한 맞춤형 교육 솔루션을 제공합니다.",
  keywords: [
    "에이머스",
    "AMOUS",
    "교육컨설팅",
    "스피치교육",
    "면접코칭",
    "기업교육",
    "커뮤니케이션",
  ],
  openGraph: {
    title: "AMOUS 에이머스 교육컨설팅",
    description: "전문가와 데이터가 만드는 격이 다른 교육 솔루션",
    url: "https://amous-website.vercel.app",
    siteName: "에이머스 교육컨설팅",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
