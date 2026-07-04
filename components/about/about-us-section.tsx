"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "framer-motion";
import { Container } from "@/components/common/container";
import { GridBackground } from "@/components/common/grid-background";
import { Section } from "@/components/common/section";
import {
  createSectionTransitionTimeline,
  fadeStep,
  overlapStep,
  staggerStep,
} from "@/lib/scroll-story";
import { ABOUT_US_CONTENT } from "@/data/about-us";

function easeOutCubic(value: number) {
  return 1 - Math.pow(1 - value, 3);
}

export function AboutUsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingLineRefs = useRef<Array<HTMLSpanElement | null>>([]);
  const paragraphRef = useRef<HTMLParagraphElement>(null);
  const statCardRefs = useRef<Array<HTMLDivElement | null>>([]);
  const portraitRef = useRef<HTMLDivElement>(null);
  const hasCountedRef = useRef(false);
  const prefersReducedMotion = useReducedMotion();
  const [displayCounts, setDisplayCounts] = useState<string[]>(() =>
    ABOUT_US_CONTENT.stats.map((stat) => (stat.value === null ? "—" : "0")),
  );

  const countTargets = useMemo(
    () => ABOUT_US_CONTENT.stats.map((stat) => stat.value),
    [],
  );

  useEffect(() => {
    if (!prefersReducedMotion) {
      return;
    }

    setDisplayCounts(
      ABOUT_US_CONTENT.stats.map((stat) => {
        if (stat.value === null) {
          return "—";
        }

        return `${stat.value}${stat.suffix ?? ""}`;
      }),
    );
  }, [prefersReducedMotion]);

  useEffect(() => {
    const section = sectionRef.current;

    if (!section || prefersReducedMotion) {
      return;
    }

    const context = gsap.context(() => {
      const headingLines = headingLineRefs.current.filter(Boolean);
      const paragraph = paragraphRef.current;
      const statCards = statCardRefs.current.filter(Boolean);
      const portrait = portraitRef.current;

      if (!headingLines.length || !paragraph || !statCards.length || !portrait) {
        return;
      }

      const timeline = createSectionTransitionTimeline({
        trigger: section,
        start: "top 72%",
        end: "bottom 42%",
        scrub: 1,
      });

      staggerStep(timeline, headingLines, {
        at: 0,
        duration: 0.28,
        stagger: 0.08,
        fromOpacity: 0,
        toOpacity: 1,
        fromY: 22,
        toY: 0,
      });

      fadeStep(timeline, paragraph, {
        at: overlapStep(0.08),
        duration: 0.32,
        fromOpacity: 0,
        toOpacity: 1,
        fromY: 18,
        toY: 0,
      });

      staggerStep(timeline, statCards, {
        at: overlapStep(0.08),
        duration: 0.26,
        stagger: 0.06,
        fromOpacity: 0,
        toOpacity: 1,
        fromY: 16,
        toY: 0,
      });

      gsap.fromTo(
        portrait,
        { autoAlpha: 0, x: 64 },
        {
          autoAlpha: 1,
          x: 0,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 70%",
            once: true,
          },
        },
      );
    }, section);

    const countTrigger = ScrollTrigger.create({
      trigger: section,
      start: "top 70%",
      once: true,
      onEnter: () => {
        if (hasCountedRef.current) {
          return;
        }

        hasCountedRef.current = true;

        const startTime = window.performance.now();
        const duration = 1200;

        const tick = (now: number) => {
          const rawProgress = Math.min((now - startTime) / duration, 1);
          const easedProgress = easeOutCubic(rawProgress);

          setDisplayCounts(
            ABOUT_US_CONTENT.stats.map((stat, index) => {
              const target = countTargets[index];

              if (target === null) {
                return "—";
              }

              const currentValue = Math.round(target * easedProgress);
              return `${currentValue}${stat.suffix ?? ""}`;
            }),
          );

          if (rawProgress < 1) {
            window.requestAnimationFrame(tick);
          }
        };

        window.requestAnimationFrame(tick);
      },
    });

    return () => {
      countTrigger.kill();
      context.revert();
    };
  }, [countTargets, prefersReducedMotion]);

  return (
    <Section
      id="about"
      className="relative z-[2] -mt-[clamp(4rem,8vw,7rem)] overflow-hidden bg-[var(--background)] pt-[clamp(4rem,8vw,7rem)] pb-[clamp(5rem,9vw,9rem)] text-[var(--foreground)]"
    >
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(250,248,245,0.96)_0%,rgba(250,248,245,0.88)_100%)]" />
      <GridBackground
        className="absolute inset-0 opacity-60"
        cellSize={44}
        lineOpacity={0.045}
        lineColor="17, 17, 17"
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(0,87,255,0.08),transparent_42%),radial-gradient(circle_at_bottom_right,rgba(0,87,255,0.06),transparent_46%)]" />

      <Container className="relative">
        <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-start xl:gap-16">
          <div className="space-y-8 lg:space-y-10">
            <div className="space-y-4">
              <p className="text-[0.72rem] font-semibold uppercase tracking-[0.38em] text-[var(--foreground)]/50">
                {ABOUT_US_CONTENT.eyebrow}
              </p>

              <h2 className="max-w-3xl font-heading text-[clamp(2.8rem,6.2vw,5.5rem)] font-bold uppercase leading-[0.92] tracking-[-0.06em] text-[var(--foreground)] text-balance">
                {ABOUT_US_CONTENT.headingLines.map((line, index) => (
                  <span
                    key={line}
                    ref={(element) => {
                      headingLineRefs.current[index] = element;
                    }}
                    className="block will-change-transform"
                    data-about-heading-line="true"
                  >
                    {line}
                  </span>
                ))}
              </h2>
            </div>

            <p
              ref={paragraphRef}
              data-about-paragraph="true"
              className="max-w-2xl text-[clamp(1rem,1.4vw,1.18rem)] leading-[1.7] text-[var(--foreground)]/72"
            >
              {ABOUT_US_CONTENT.description}
            </p>

            <dl className="grid gap-4 sm:grid-cols-2">
              {ABOUT_US_CONTENT.stats.map((stat, index) => (
                <div
                  key={stat.label}
                  ref={(element) => {
                    statCardRefs.current[index] = element;
                  }}
                  data-about-stat-card="true"
                  className="rounded-[1.5rem] border border-[var(--border)] bg-[color-mix(in_srgb,var(--surface)_84%,transparent)] p-5 shadow-[var(--shadow-sm)] backdrop-blur-xl"
                >
                  <dt className="text-[0.72rem] font-medium uppercase tracking-[0.28em] text-[var(--foreground)]/48">
                    {stat.label}
                  </dt>
                  <dd className="mt-4 text-[clamp(2rem,4vw,3.35rem)] font-semibold leading-none tracking-[-0.05em] text-[var(--foreground)]">
                    {displayCounts[index]}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="space-y-5 lg:sticky lg:top-24">
            <div
              ref={portraitRef}
              data-about-portrait="true"
              className="relative overflow-hidden rounded-[2rem] border border-[var(--border)] bg-[color-mix(in_srgb,var(--surface)_88%,transparent)] shadow-[var(--shadow-lg)]"
            >
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.64)_0%,rgba(255,255,255,0.18)_34%,rgba(17,17,17,0.03)_100%)]" />
              <GridBackground
                className="absolute inset-0 opacity-45"
                cellSize={28}
                lineOpacity={0.06}
                lineColor="0, 87, 255"
              />
              <div className="relative aspect-[4/5] min-h-[28rem] p-5 sm:p-6">
                <div className="flex h-full flex-col justify-between rounded-[1.5rem] border border-[rgba(255,255,255,0.5)] bg-[linear-gradient(180deg,color-mix(in_srgb,var(--accent)_14%,white)_0%,color-mix(in_srgb,var(--surface)_92%,white)_58%,color-mix(in_srgb,var(--accent)_8%,var(--surface))_100%)] p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.45)] sm:p-6">
                  <div className="flex items-center justify-between text-[0.66rem] font-semibold uppercase tracking-[0.32em] text-[var(--foreground)]/55">
                    <span>DRR</span>
                    <span>2026–27</span>
                  </div>

                  <div className="relative mx-auto flex w-full max-w-[18rem] flex-1 items-center justify-center py-8 sm:max-w-[20rem]">
                    <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.85)_0%,rgba(255,255,255,0.14)_48%,transparent_74%)] blur-2xl" />
                    <div className="absolute inset-x-10 bottom-10 h-20 rounded-full bg-[color-mix(in_srgb,var(--accent)_18%,transparent)] blur-3xl" />
                    <div className="relative flex h-[20rem] w-full items-center justify-center overflow-hidden rounded-[1.75rem] border border-[rgba(255,255,255,0.42)] bg-[linear-gradient(180deg,rgba(255,255,255,0.96)_0%,rgba(250,248,245,0.82)_48%,rgba(230,238,255,0.7)_100%)] shadow-[var(--shadow-md)]">
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(0,87,255,0.12),transparent_38%),radial-gradient(circle_at_bottom,rgba(0,87,255,0.1),transparent_40%)]" />
                      <div className="relative flex h-40 w-40 items-center justify-center rounded-full border border-[rgba(17,17,17,0.08)] bg-[color-mix(in_srgb,var(--surface)_92%,transparent)] shadow-[var(--shadow-sm)]">
                        <div className="flex h-32 w-32 items-center justify-center rounded-full bg-[linear-gradient(180deg,color-mix(in_srgb,var(--accent)_18%,white)_0%,color-mix(in_srgb,var(--surface)_96%,white)_100%)] text-center text-[0.72rem] font-semibold uppercase tracking-[0.36em] text-[var(--foreground)]/50">
                          {ABOUT_US_CONTENT.representative.portraitLabel}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2 border-t border-[var(--border)] pt-4">
                    <p className="text-[0.92rem] font-semibold tracking-[0.14em] text-[var(--foreground)]">
                      {ABOUT_US_CONTENT.representative.name}
                    </p>
                    <p className="text-[0.72rem] font-medium uppercase tracking-[0.26em] text-[var(--foreground)]/56">
                      {ABOUT_US_CONTENT.representative.designation}
                    </p>
                    <p className="pt-2 text-[0.96rem] leading-[1.7] text-[var(--foreground)]/72">
                      {ABOUT_US_CONTENT.representative.welcomeMessage}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
