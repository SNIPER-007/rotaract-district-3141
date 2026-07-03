"use client";

import type { CSSProperties, ReactNode } from "react";
import { motion } from "framer-motion";
import { SPRINGS } from "@/constants/animation";

type FloatingStickerVariant = "default" | "accent" | "dark" | "outline";

interface FloatingStickerProps {
  text: string;
  rotation?: number;
  x: number | string;
  y: number | string;
  icon?: ReactNode;
  variant?: FloatingStickerVariant;
  className?: string;
}

const variantStyles: Record<FloatingStickerVariant, string> = {
  default: "border-white/60 bg-white/85 text-[var(--foreground)] shadow-[0_8px_30px_rgba(17,17,17,0.06)]",
  accent: "border-transparent bg-[var(--accent)]/10 text-[var(--accent)] shadow-[0_8px_30px_rgba(0,87,255,0.1)]",
  dark: "border-transparent bg-[var(--foreground)] text-[var(--background)] shadow-[0_8px_30px_rgba(17,17,17,0.14)]",
  outline: "border-[rgba(17,17,17,0.12)] bg-transparent text-[var(--foreground)]",
};

export function FloatingSticker({
  text,
  rotation = 0,
  x,
  y,
  icon,
  variant = "default",
  className = "",
}: FloatingStickerProps) {
  const positionStyle: CSSProperties = {
    left: typeof x === "number" ? `${x}px` : x,
    top: typeof y === "number" ? `${y}px` : y,
  };

  const classes = [
    "absolute inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium backdrop-blur-md",
    variantStyles[variant],
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <motion.div
      aria-hidden="true"
      className={classes}
      style={positionStyle}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={SPRINGS.soft}
    >
      <span style={{ transform: `rotate(${rotation}deg)` }} className="flex items-center gap-2">
        {icon}
        <span>{text}</span>
      </span>
    </motion.div>
  );
}
