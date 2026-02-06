"use client";

import { motion } from "framer-motion";

interface SectionHeadingProps {
  subtitle: string;
  title: string;
  description?: string;
  light?: boolean;
}

export default function SectionHeading({
  subtitle,
  title,
  description,
  light = false,
}: SectionHeadingProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6 }}
      className="text-center mb-16"
    >
      <span
        className={`inline-block text-sm font-semibold tracking-widest uppercase mb-3 ${
          light ? "text-navy-200" : "text-navy-800"
        }`}
      >
        {subtitle}
      </span>
      <h2
        className={`text-3xl md:text-4xl lg:text-5xl font-bold mb-6 ${
          light ? "text-white" : "text-gray-900"
        }`}
      >
        {title}
      </h2>
      {description && (
        <p
          className={`max-w-2xl mx-auto text-lg leading-relaxed ${
            light ? "text-gray-300" : "text-gray-600"
          }`}
        >
          {description}
        </p>
      )}
    </motion.div>
  );
}
