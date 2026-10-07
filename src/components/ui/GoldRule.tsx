"use client";

import { motion } from "framer-motion";

interface GoldRuleProps {
  className?: string;
}

export default function GoldRule({
  className = "",
}: GoldRuleProps) {
  return (
    <motion.div
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true, amount: 0.8 }}
      transition={{
        duration: 0.9,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={`h-px w-24 origin-center bg-[#B0925C] ${className}`}
    />
  );
}