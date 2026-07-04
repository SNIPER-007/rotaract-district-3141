"use client";

import type { CSSProperties } from "react";
import { useEffect, useMemo, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { SPRINGS } from "@/constants/animation";
import { useMousePosition } from "@/hooks/useMousePosition";

interface CursorProps {
  className?: string;
  blendMode?: CSSProperties["mixBlendMode"];
  size?: number;
  hidden?: boolean;
}

const INTERACTIVE_SELECTOR = {
  logo: '[data-cursor-logo="true"]',
  sticker: '[data-cursor-sticker="true"]',
  button: '[data-cursor-button="true"]',
} as const;

type CursorMode = "default" | "button" | "logo" | "sticker";

export function Cursor({
  className = "",
  blendMode = "difference",
  size = 12,
  hidden = false,
}: CursorProps) {
  const { mouseX, mouseY } = useMousePosition();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const smoothX = useSpring(x, SPRINGS.cursor);
  const smoothY = useSpring(y, SPRINGS.cursor);
  const [mode, setMode] = useState<CursorMode>("default");

  useEffect(() => {
    x.set(mouseX - size / 2);
    y.set(mouseY - size / 2);
  }, [mouseX, mouseY, size, x, y]);

  useEffect(() => {
    const handlePointerMove = (event: PointerEvent) => {
      const target = event.target as Element | null;

      if (!target) {
        setMode("default");
        return;
      }

      if (target.closest(INTERACTIVE_SELECTOR.logo)) {
        setMode("logo");
        return;
      }

      if (target.closest(INTERACTIVE_SELECTOR.sticker)) {
        setMode("sticker");
        return;
      }

      if (target.closest(INTERACTIVE_SELECTOR.button)) {
        setMode("button");
        return;
      }

      setMode("default");
    };

    const handlePointerLeave = () => {
      setMode("default");
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("pointerleave", handlePointerLeave);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerleave", handlePointerLeave);
    };
  }, []);

  const cursorState = useMemo(() => {
    switch (mode) {
      case "logo":
        return {
          width: 18,
          height: 18,
          borderRadius: 10,
          scale: 1.05,
          opacity: 1,
          rotate: 2,
        };
      case "sticker":
        return {
          width: 17,
          height: 17,
          borderRadius: 9999,
          scale: 1.15,
          opacity: 0.92,
          rotate: 0,
        };
      case "button":
        return {
          width: 15,
          height: 15,
          borderRadius: 9999,
          scale: 1.12,
          opacity: 1,
          rotate: 0,
        };
      default:
        return {
          width: 12,
          height: 12,
          borderRadius: 9999,
          scale: 1,
          opacity: 1,
          rotate: 0,
        };
    }
  }, [mode]);

  if (hidden) {
    return null;
  }

  return (
    <motion.div
      aria-hidden="true"
      className={`fixed left-0 top-0 z-[9999] hidden md:block ${className}`.trim()}
      animate={cursorState}
      transition={SPRINGS.cursor}
      style={{
        x: smoothX,
        y: smoothY,
        width: size,
        height: size,
        backgroundColor: "var(--foreground)",
        mixBlendMode: blendMode,
        opacity: cursorState.opacity,
        pointerEvents: "none",
        willChange: "transform",
      }}
    />
  );
}
