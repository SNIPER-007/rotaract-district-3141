"use client";

import { useMemo } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { SPRINGS } from "@/constants/animation";
import { Button } from "@/components/common/button";
import { Container } from "@/components/common/container";
import { Magnetic } from "@/components/common/magnetic";

interface HeroProps {
  mouseX: number;
  mouseY: number;
  viewportWidth: number;
  viewportHeight: number;
  onPrimaryAction: () => void;
  onSecondaryAction: () => void;
}

type StickerConfig = {
  text: string;
  x: string;
  y: string;
  align: string;
  shiftX: number;
  shiftY: number;
  delay: number;
};

const STICKERS: StickerConfig[] = [
  { text: "Mumbai, MH", x: "1.5rem", y: "6rem", align: "left", shiftX: 0.28, shiftY: 0.24, delay: 0 },
  { text: "Lead • Serve", x: "auto", y: "5rem", align: "right", shiftX: -0.28, shiftY: 0.2, delay: 0.08 },
  { text: "One District", x: "1rem", y: "auto", align: "left", shiftX: 0.22, shiftY: -0.2, delay: 0.12 },
  { text: "RI Year 2026–27", x: "auto", y: "auto", align: "right", shiftX: -0.22, shiftY: -0.24, delay: 0.16 },
];

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

function FloatingSticker({
  sticker,
  mouseX,
  mouseY,
  viewportWidth,
  viewportHeight,
}: {
  sticker: StickerConfig;
  mouseX: number;
  mouseY: number;
  viewportWidth: number;
  viewportHeight: number;
}) {
  const offsetX = viewportWidth > 0 ? clamp(((mouseX - viewportWidth / 2) / 120) * sticker.shiftX, -10, 10) : 0;
  const offsetY = viewportHeight > 0 ? clamp(((mouseY - viewportHeight / 2) / 120) * sticker.shiftY, -10, 10) : 0;

  return (
    <motion.div
      className={`absolute z-[2] inline-flex max-w-[11rem] items-center gap-2 rounded-full border border-[var(--border)] px-4 py-2 text-[0.8rem] font-medium text-[var(--foreground)] shadow-[var(--shadow-sm)] backdrop-blur-xl ${sticker.align === "right" ? "justify-end" : "justify-start"}`}
      data-scroll-story-sticker="true"
      data-cursor-sticker="true"
      style={{
        left: sticker.x === "auto" ? undefined : sticker.x,
        right: sticker.x === "auto" ? (sticker.align === "right" ? "1rem" : undefined) : undefined,
        top: sticker.y === "auto" ? undefined : sticker.y,
        bottom: sticker.y === "auto" ? (sticker.align === "right" ? "1.25rem" : "1.1rem") : undefined,
        backgroundColor: "color-mix(in srgb, var(--surface) 78%, transparent)",
        x: offsetX,
        y: offsetY,
      }}
      animate={{ y: [0, -5, 0] }}
      transition={{
        duration: 5.5,
        repeat: Number.POSITIVE_INFINITY,
        ease: "easeInOut",
        delay: sticker.delay,
      }}
      whileHover={{ y: -6, scale: 1.03 }}
    >
      <span className="text-[0.95rem] leading-none" aria-hidden="true">
        {sticker.text.split(" ")[0]?.includes("RI") ? "🚀" : sticker.text.includes("Lead") ? "❤️" : sticker.text.includes("One") ? "🤝" : "📍"}
      </span>
      <span className="whitespace-nowrap">{sticker.text}</span>
    </motion.div>
  );
}

export function Hero({
  mouseX,
  mouseY,
  viewportWidth,
  viewportHeight,
  onPrimaryAction,
  onSecondaryAction,
}: HeroProps) {
  const prefersReducedMotion = useReducedMotion();

  const backgroundOffset = useMemo(() => {
    if (prefersReducedMotion || viewportWidth === 0 || viewportHeight === 0) {
      return { x: 0, y: 0 };
    }

    return {
      x: clamp((mouseX - viewportWidth / 2) / 88, -12, 12),
      y: clamp((mouseY - viewportHeight / 2) / 88, -12, 12),
    };
  }, [mouseX, mouseY, viewportHeight, viewportWidth, prefersReducedMotion]);

  const contentVariants = {
    hidden: { opacity: 0, y: 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.08,
      },
    },
  } as const;

  const childVariants = {
    hidden: { opacity: 0, y: 18 },
    visible: { opacity: 1, y: 0 },
  } as const;

  return (
    <section className="relative flex min-h-[110svh] items-center overflow-hidden pt-4 sm:pt-6 lg:pt-8" data-scroll-story-root="true">
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        animate={{ x: backgroundOffset.x, y: backgroundOffset.y }}
        transition={SPRINGS.soft}
      >
        <div className="absolute inset-0 opacity-80">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.46),transparent_52%),radial-gradient(circle_at_bottom_right,rgba(0,87,255,0.08),transparent_42%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent,rgba(250,248,245,0.34))]" />
        </div>
      </motion.div>

      <div className="absolute inset-0 opacity-100">
        <motion.div
          aria-hidden="true"
          className="absolute inset-0"
          animate={{ x: backgroundOffset.x * 0.6, y: backgroundOffset.y * 0.6 }}
          transition={SPRINGS.soft}
        >
          <div className="absolute inset-0">
            <div className="absolute inset-0 opacity-90">
              <div className="absolute inset-0">
                {/* background grid */}
                <div className="absolute inset-0">
                  <div className="absolute inset-0">
                    <div className="absolute inset-0 [mask-image:linear-gradient(to_bottom,rgba(0,0,0,0.86),rgba(0,0,0,0.34)_72%,transparent)]" data-scroll-story-grid="true">
                      <div className="absolute inset-0 [background-image:linear-gradient(to_right,rgba(17,17,17,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(17,17,17,0.06)_1px,transparent_1px)] [background-size:52px_52px] [background-position:center]" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        animate={{ x: backgroundOffset.x * 0.35, y: backgroundOffset.y * 0.35 }}
        transition={SPRINGS.soft}
      >
        <div className="absolute inset-0 opacity-[0.035]">
          <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(17,17,17,0.03)_25%,transparent_25%),linear-gradient(225deg,rgba(17,17,17,0.02)_25%,transparent_25%),linear-gradient(45deg,rgba(17,17,17,0.02)_25%,transparent_25%),linear-gradient(315deg,rgba(17,17,17,0.03)_25%,transparent_25%)] [background-position:0_0,4px_4px,4px_4px,0_0] [background-size:8px_8px]" />
        </div>
      </motion.div>

      <div className="relative z-[1] flex w-full flex-col">
        <Container className="relative">
          <div className="absolute inset-x-0 top-0">
            <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[var(--background)] via-[var(--background)]/85 to-transparent" />
          </div>
        </Container>

        <motion.div
          className="relative z-[1] flex flex-1 items-center"
          variants={contentVariants}
          initial="hidden"
          animate="visible"
        >
          <Container className="relative py-18 sm:py-22 lg:py-26">
            <div className="relative mx-auto flex max-w-6xl flex-col items-center text-center">
              <motion.div variants={childVariants} className="relative z-[3]" data-scroll-story-heading="true">
                <h1 className="font-heading text-[clamp(3.8rem,11vw,8.7rem)] font-bold uppercase leading-[0.9] tracking-[-0.06em] text-[var(--foreground)] text-balance sm:text-[clamp(4.5rem,10vw,9.5rem)]">
                  <span className="block">Rotaract</span>
                  <span className="block">District 3141</span>
                </h1>
              </motion.div>

              <motion.div variants={childVariants} className="mt-8 max-w-2xl text-balance text-[clamp(1rem,2vw,1.35rem)] font-medium leading-[1.25] text-[var(--foreground)]/78 sm:mt-10" data-scroll-story-subheading="true">
                <span className="block">Creating Leaders.</span>
                <span className="block">Building Communities.</span>
                <span className="block">Inspiring Change.</span>
              </motion.div>

              <motion.div variants={childVariants} className="mt-10 flex w-full flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center sm:gap-4 lg:mt-12" data-scroll-story-buttons="true">
                <Magnetic strength={22} className="w-full sm:w-auto">
                  <Button
                    variant="primary"
                    onClick={onPrimaryAction}
                    className="w-full min-w-[16rem] px-6 py-3 text-sm font-medium sm:w-auto"
                  >
                    <span className="inline-flex items-center gap-2">
                      Discover District 3141
                      <ArrowRight className="h-4 w-4" />
                    </span>
                  </Button>
                </Magnetic>

                <Magnetic strength={18} className="w-full sm:w-auto">
                  <Button
                    variant="secondary"
                    onClick={onSecondaryAction}
                    className="w-full min-w-[16rem] px-6 py-3 text-sm font-medium sm:w-auto"
                  >
                    Meet The Leaders
                  </Button>
                </Magnetic>
              </motion.div>

              <motion.div
                aria-hidden="true"
                className="absolute inset-0 z-[2] hidden lg:block"
                data-scroll-story-stickers="true"
                animate={{ x: backgroundOffset.x * 0.45, y: backgroundOffset.y * 0.45 }}
                transition={SPRINGS.soft}
              >
                {STICKERS.map((sticker) => (
                  <FloatingSticker
                    key={sticker.text}
                    sticker={sticker}
                    mouseX={mouseX}
                    mouseY={mouseY}
                    viewportWidth={viewportWidth}
                    viewportHeight={viewportHeight}
                  />
                ))}
              </motion.div>
            </div>
          </Container>
        </motion.div>

        <motion.div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-6 flex justify-center"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, ...SPRINGS.soft }}
        >
          <div className="flex flex-col items-center gap-2">
            <span className="text-[0.68rem] font-medium uppercase tracking-[0.34em] text-[var(--foreground)]/55">
              Scroll
            </span>
            <div className="flex h-12 w-7 items-start justify-center rounded-full border border-[var(--border)] bg-[color-mix(in_srgb,var(--surface)_68%,transparent)] p-2 shadow-[var(--shadow-xs)] backdrop-blur-xl">
              <motion.span
                className="h-2 w-2 rounded-full bg-[var(--foreground)]"
                animate={{ y: [0, 10, 0], opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1.8, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default Hero;
