"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ANIMATION_EASING } from "@/constants/animation";
import { GridBackground } from "@/components/common/grid-background";

export const DEFAULT_LOADER_STEPS = [
  "HEY",
  "WELCOME",
  "ROTARACT",
  "DISTRICT 3141",
  "LET'S BEGIN",
] as const;

interface FullScreenLoaderProps {
  visible: boolean;
  phrases?: readonly string[];
  onComplete?: () => void;
  className?: string;
}

const TYPE_DELAY = 42;
const ERASE_DELAY = 22;
const HOLD_DELAY = 120;
const EXIT_DELAY = 340;

function sleep(duration: number) {
  return new Promise((resolve) => window.setTimeout(resolve, duration));
}

export function FullScreenLoader({
  visible,
  phrases = DEFAULT_LOADER_STEPS,
  onComplete,
  className = "",
}: FullScreenLoaderProps) {
  const sequence = useMemo(() => Array.from(phrases), [phrases]);
  const [displayText, setDisplayText] = useState(sequence[0] ?? "");
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    if (!visible) {
      return;
    }

    let cancelled = false;

    const run = async () => {
      for (const phrase of sequence) {
        if (cancelled) {
          return;
        }

        setDisplayText("");

        for (let index = 1; index <= phrase.length; index += 1) {
          if (cancelled) {
            return;
          }

          setDisplayText(phrase.slice(0, index));
          await sleep(TYPE_DELAY);
        }

        await sleep(HOLD_DELAY);

        for (let index = phrase.length - 1; index >= 0; index -= 1) {
          if (cancelled) {
            return;
          }

          setDisplayText(phrase.slice(0, index));
          await sleep(ERASE_DELAY);
        }
      }

      if (cancelled) {
        return;
      }

      setIsExiting(true);
      await sleep(EXIT_DELAY);
      if (!cancelled) {
        onComplete?.();
      }
    };

    run();

    return () => {
      cancelled = true;
    };
  }, [onComplete, sequence, visible]);

  useEffect(() => {
    if (!visible) {
      return;
    }

    const frame = window.requestAnimationFrame(() => {
      setIsExiting(false);
      setDisplayText(sequence[0] ?? "");
    });

    return () => window.cancelAnimationFrame(frame);
  }, [sequence, visible]);

  if (!visible) {
    return null;
  }

  return (
    <motion.div
      aria-hidden="true"
      className={`fixed inset-0 z-[1200] overflow-hidden bg-[var(--background)] ${className}`.trim()}
      initial={{ opacity: 1 }}
      animate={{ opacity: isExiting ? 0 : 1 }}
      transition={{ duration: 0.35, ease: ANIMATION_EASING.standard }}
      style={{ pointerEvents: "none" }}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_color-mix(in_srgb,var(--accent)_12%,transparent)_0%,_transparent_62%)]" />
      <GridBackground
        className="absolute inset-0 opacity-75"
        cellSize={48}
        lineOpacity={0.07}
        lineColor="0, 87, 255"
      />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,_rgba(250,248,245,0.92)_0%,_rgba(250,248,245,0.75)_44%,_rgba(250,248,245,0.96)_100%)]" />
      <div className="relative mx-4 w-[min(92vw,32rem)] rounded-[2rem] border border-[rgba(255,255,255,0.5)] bg-[linear-gradient(180deg,#1a8cff_0%,#0064e0_100%)] px-7 py-5 text-center text-[1rem] font-semibold tracking-[0.24em] text-white shadow-[0_22px_70px_rgba(0,100,224,0.28),0_8px_24px_rgba(0,0,0,0.08)] backdrop-blur-2xl sm:px-10 sm:py-6">
        <div className="absolute inset-x-4 top-3 h-px rounded-full bg-white/30" />
        <div className="absolute -bottom-2 right-8 h-5 w-5 rotate-45 rounded-[0.35rem] bg-[linear-gradient(180deg,#0069e8_0%,#0058c8_100%)] shadow-[8px_10px_18px_rgba(0,100,224,0.18)]" />
        <span className="relative inline-flex min-h-[1.6em] items-center gap-1">
          <span className="whitespace-nowrap uppercase">{displayText}</span>
          <motion.span
            className="h-[1.05em] w-[0.08em] rounded-full bg-white/90 shadow-[0_0_10px_rgba(255,255,255,0.45)]"
            animate={{ opacity: [1, 0, 1] }}
            transition={{ duration: 0.9, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
          />
        </span>
      </div>
    </motion.div>
  );
}
