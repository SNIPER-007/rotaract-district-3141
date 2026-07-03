"use client";

import type { CSSProperties, ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ANIMATION_DURATIONS, ANIMATION_EASING } from "@/constants/animation";

type RevealVariant = "fade" | "slide" | "scale";

interface ScrollRevealProps {
  children: ReactNode;
  animation?: RevealVariant;
  className?: string;
  delay?: number;
  duration?: number;
  distance?: number;
  once?: boolean;
  amount?: number;
}

const variants: Record<RevealVariant, { hidden: object; visible: object }> = {
  fade: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  },
  slide: {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0 },
  },
  scale: {
    hidden: { opacity: 0, scale: 0.96 },
    visible: { opacity: 1, scale: 1 },
  },
};

export function ScrollReveal({
  children,
  animation = "fade",
  className = "",
  delay = 0,
  duration = ANIMATION_DURATIONS.medium,
  distance = 24,
  once = true,
  amount = 0.2,
}: ScrollRevealProps) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  const transition = {
    duration,
    delay,
    ease: ANIMATION_EASING.standard,
  };

  const style = { willChange: "transform, opacity" } satisfies CSSProperties;
  const hiddenVariant =
    animation === "slide"
      ? { opacity: 0, y: distance }
      : variants[animation].hidden;

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount }}
      variants={{
        hidden: hiddenVariant,
        visible: variants[animation].visible,
      }}
      transition={transition}
      style={style}
    >
      {children}
    </motion.div>
  );
}
