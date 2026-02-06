"use client";

import Header from "@/components/Header";
import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import ServicesSection from "@/components/sections/ServicesSection";
import InstructorsSection from "@/components/sections/InstructorsSection";
import CasesSection from "@/components/sections/CasesSection";
import AffiliatesSection from "@/components/sections/AffiliatesSection";
import BlogSection from "@/components/sections/BlogSection";
import ContactSection from "@/components/sections/ContactSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <AboutSection />
        <ServicesSection />
        <InstructorsSection />
        <CasesSection />
        <AffiliatesSection />
        <BlogSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
