"use client";

import { motion } from "framer-motion";

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  showPipe?: boolean;
  className?: string;
}

export default function SectionTitle({
  title,
  subtitle,
  showPipe = true,
  className = "",
}: SectionTitleProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5 }}
      className={className}
    >
      <div className={showPipe ? "pipe-copper" : ""}>
        <h2 className="text-3xl md:text-4xl font-mono font-bold text-white">
          {title}
        </h2>
      </div>
      {subtitle && (
        <p className="mt-4 text-muted text-lg max-w-2xl">{subtitle}</p>
      )}
    </motion.div>
  );
}
