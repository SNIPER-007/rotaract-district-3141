"use client";

import type { CSSProperties } from "react";
import { useEffect, useMemo, useState } from "react";
import { motion, useMotionValue } from "framer-motion";
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
  logoProximity: '[data-cursor-logo-proximity="true"]',
  heroHeading: '[data-cursor-hero-heading="true"]',
  sticker: '[data-cursor-sticker="true"]',
  button: '[data-cursor-button="true"]',
} as const;

type CursorMode = "default" | "button" | "logo" | "hero" | "sticker";

export function Cursor({
  className = "",
  blendMode = "difference",
  size = 12,
  hidden = false,
}: CursorProps) {
  const { mouseX, mouseY } = useMousePosition();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const [mode, setMode] = useState<CursorMode>("default");

  useEffect(() => {
    x.set(mouseX);
    y.set(mouseY);
  }, [mouseX, mouseY, x, y]);

  useEffect(() => {
    const previousHtmlCursor = document.documentElement.style.cursor;
    const previousBodyCursor = document.body.style.cursor;

    document.documentElement.style.cursor = "none";
    document.body.style.cursor = "none";

    return () => {
      document.documentElement.style.cursor = previousHtmlCursor;
      document.body.style.cursor = previousBodyCursor;
    };
  }, []);

  useEffect(() => {
    const resolveMode = (target: Element | null) => {
      if (!target) {
        return "default";
      }

      if (target.closest(INTERACTIVE_SELECTOR.heroHeading)) {
        return "hero";
      }

      if (target.closest(INTERACTIVE_SELECTOR.logoProximity) || target.closest(INTERACTIVE_SELECTOR.logo)) {
        return "logo";
      }

      if (target.closest(INTERACTIVE_SELECTOR.sticker)) {
        return "sticker";
      }

      if (target.closest(INTERACTIVE_SELECTOR.button)) {
        return "button";
      }

      return "default";
    };

    const handlePointerMove = (event: PointerEvent) => {
      setMode((currentMode) => {
        const nextMode = resolveMode(event.target as Element | null);

        return currentMode === nextMode ? currentMode : nextMode;
      });
    };

    const handlePointerLeave = () => {
      setMode((currentMode) => (currentMode === "default" ? currentMode : "default"));
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
      case "hero":
        return {
          width: 64,
          height: 64,
          borderRadius: 20,
          scale: 1,
          opacity: 1,
          rotate: 0,
        };
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
          width: size,
          height: size,
          borderRadius: 9999,
          scale: 1,
          opacity: 1,
          rotate: 0,
        };
    }
  }, [mode, size]);

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
        x,
        y,
        translateX: "-50%",
        translateY: "-50%",
        backgroundColor: "var(--foreground)",
        mixBlendMode: blendMode,
        opacity: cursorState.opacity,
        pointerEvents: "none",
        willChange: "transform",
      }}
    />
  );
}