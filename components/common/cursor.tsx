"use client";

import type { CSSProperties } from "react";
import { useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { SPRINGS } from "@/constants/animation";
import { useMousePosition } from "@/hooks/useMousePosition";

interface CursorProps {
  className?: string;
  blendMode?: CSSProperties["mixBlendMode"];
  size?: number;
}

const INTERACTIVE_SELECTOR =
  'a, button, input, textarea, select, [role="button"], [data-cursor-hover="true"]';

export function Cursor({
  className = "",
  blendMode = "difference",
  size = 12,
}: CursorProps) {
  const { mouseX, mouseY } = useMousePosition();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const scale = useMotionValue(1);
  const smoothX = useSpring(x, SPRINGS.cursor);
  const smoothY = useSpring(y, SPRINGS.cursor);
  const smoothScale = useSpring(scale, SPRINGS.cursor);
  const [isInteractive, setIsInteractive] = useState(false);

  useEffect(() => {
    x.set(mouseX - size / 2);
    y.set(mouseY - size / 2);
  }, [mouseX, mouseY, size, x, y]);

  useEffect(() => {
    const handlePointerMove = (event: PointerEvent) => {
      const target = event.target as Element | null;
      setIsInteractive(Boolean(target?.closest?.(INTERACTIVE_SELECTOR)));
    };

    const handlePointerLeave = () => {
      setIsInteractive(false);
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("pointerleave", handlePointerLeave);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerleave", handlePointerLeave);
    };
  }, []);

  useEffect(() => {
    scale.set(isInteractive ? 1.7 : 1);
  }, [isInteractive, scale]);

  return (
    <motion.div
      aria-hidden="true"
      className={`fixed left-0 top-0 z-[9999] hidden md:block ${className}`.trim()}
      style={{
        x: smoothX,
        y: smoothY,
        scale: smoothScale,
        width: size,
        height: size,
        borderRadius: 9999,
        backgroundColor: "var(--foreground)",
        mixBlendMode: blendMode,
        opacity: 1,
        pointerEvents: "none",
        willChange: "transform",
      }}
    />
  );
}
