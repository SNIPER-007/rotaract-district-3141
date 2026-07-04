"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import type { WorldMapProps } from "./types";

export function WorldMap({ className = "" }: WorldMapProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      className={`relative w-full overflow-hidden rounded-[36px] border border-[rgba(0,0,0,0.05)] bg-white shadow-[0_24px_60px_rgba(0,0,0,0.08)] ${className}`.trim()}
      initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
      whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ duration: 0.8, ease: [0.215, 0.61, 0.355, 1] }}
      whileHover={prefersReducedMotion ? undefined : { scale: 1.015 }}
    >
      <div className="p-10">
        <div className="relative mx-auto aspect-[1491/1055] w-full max-w-[560px]">
          <Image
            src="/images/worldmap.png"
            alt="World map illustration highlighting India and Mumbai"
            fill
            sizes="(max-width: 1024px) 100vw, 560px"
            className="object-contain"
            priority={false}
          />
        </div>
      </div>
    </motion.div>
  );
}
