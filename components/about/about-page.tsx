"use client";

import { useEffect, useMemo, useRef, type RefObject } from "react";
import { useReducedMotion } from "framer-motion";
import { gsap } from "gsap";
import { Container } from "@/components/common/container";
import { GridBackground } from "@/components/common/grid-background";
import { SiteNavbar } from "@/components/common/site-navbar";
import {
  createSectionTransitionTimeline,
  fadeStep,
  overlapStep,
  staggerStep,
  revealStep,
} from "@/lib/scroll-story";
import {
  ABOUT_PAGE_DRR,
  ABOUT_PAGE_HERO,
  ABOUT_PAGE_LEGACY,
  ABOUT_PAGE_MISSION,
  ABOUT_PAGE_ROTARY,
  ABOUT_PAGE_VALUES,
  ABOUT_PAGE_VISION,
  ABOUT_PAGE_WHO_WE_ARE,
} from "@/data/about-page";

export function AboutPage() {
  const prefersReducedMotion = useReducedMotion();
  const whoWeAreRef = useRef<HTMLElement>(null);
  const legacyRef = useRef<HTMLElement>(null);
  const drrRef = useRef<HTMLElement>(null);
  const visionRef = useRef<HTMLElement>(null);
  const missionRef = useRef<HTMLElement>(null);
  const valuesRef = useRef<HTMLElement>(null);
  const rotaryRef = useRef<HTMLElement>(null);

  const rotarySteps = useMemo(() => ABOUT_PAGE_ROTARY.steps, []);

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    const sections: Array<[RefObject<HTMLElement | null>, (section: HTMLElement) => void]> = [
      [whoWeAreRef, (section) => {
        const eyebrow = section.querySelector<HTMLElement>('[data-about-hero="eyebrow"]');
        const title = section.querySelector<HTMLElement>('[data-about-hero="title"]');
        const description = section.querySelector<HTMLElement>('[data-about-hero="description"]');
        const points = section.querySelectorAll<HTMLElement>('[data-about-hero="point"]');

        const timeline = createSectionTransitionTimeline({ trigger: section, start: "top 70%", end: "bottom 40%", scrub: 1 });
        if (eyebrow) revealStep(timeline, eyebrow, { at: 0, duration: 0.24, fromOpacity: 0, toOpacity: 1, fromY: 12, toY: 0 });
        if (title) fadeStep(timeline, title, { at: overlapStep(0.05), duration: 0.28, fromOpacity: 0, toOpacity: 1, fromY: 18, toY: 0 });
        if (description) fadeStep(timeline, description, { at: overlapStep(0.06), duration: 0.3, fromOpacity: 0, toOpacity: 1, fromY: 16, toY: 0 });
        if (points.length) staggerStep(timeline, points, { at: overlapStep(0.08), duration: 0.24, stagger: 0.06, fromOpacity: 0, toOpacity: 1, fromY: 16, toY: 0 });
      }],
      [legacyRef, (section) => {
        const items = section.querySelectorAll<HTMLElement>('[data-about-legacy="item"]');
        const timeline = createSectionTransitionTimeline({ trigger: section, start: "top 72%", end: "bottom 42%", scrub: 1 });
        if (items.length) staggerStep(timeline, items, { at: 0, duration: 0.28, stagger: 0.08, fromOpacity: 0, toOpacity: 1, fromY: 18, toY: 0 });
      }],
      [drrRef, (section) => {
        const card = section.querySelector<HTMLElement>('[data-about-drr="card"]');
        if (card) {
          gsap.fromTo(card, { autoAlpha: 0, x: 60 }, { autoAlpha: 1, x: 0, duration: 0.7, ease: "power3.out", scrollTrigger: { trigger: section, start: "top 72%", once: true } });
        }
      }],
      [visionRef, (section) => {
        const title = section.querySelector<HTMLElement>('[data-about-vision="title"]');
        if (title) {
          const timeline = createSectionTransitionTimeline({ trigger: section, start: "top 78%", end: "bottom 45%", scrub: 1 });
          fadeStep(timeline, title, { at: 0, duration: 0.34, fromOpacity: 0, toOpacity: 1, fromY: 18, toY: 0 });
        }
      }],
      [missionRef, (section) => {
        const cards = section.querySelectorAll<HTMLElement>('[data-about-mission="card"]');
        const timeline = createSectionTransitionTimeline({ trigger: section, start: "top 75%", end: "bottom 42%", scrub: 1 });
        if (cards.length) staggerStep(timeline, cards, { at: 0, duration: 0.24, stagger: 0.06, fromOpacity: 0, toOpacity: 1, fromY: 16, toY: 0 });
      }],
      [valuesRef, (section) => {
        const values = section.querySelectorAll<HTMLElement>('[data-about-values="value"]');
        const timeline = createSectionTransitionTimeline({ trigger: section, start: "top 72%", end: "bottom 40%", scrub: 1 });
        if (values.length) staggerStep(timeline, values, { at: 0, duration: 0.22, stagger: 0.05, fromOpacity: 0, toOpacity: 1, fromY: 14, toY: 0 });
      }],
      [rotaryRef, (section) => {
        const steps = section.querySelectorAll<HTMLElement>('[data-about-rotary="step"]');
        const timeline = createSectionTransitionTimeline({ trigger: section, start: "top 74%", end: "bottom 42%", scrub: 1 });
        if (steps.length) staggerStep(timeline, steps, { at: 0, duration: 0.22, stagger: 0.08, fromOpacity: 0, toOpacity: 1, fromY: 14, toY: 0 });
      }],
    ];

    const contexts = sections.map(([ref, animate]) => {
      const section = ref.current;

      if (!section) {
        return null;
      }

      return gsap.context(() => animate(section), section);
    });

    return () => {
      contexts.forEach((context) => context?.revert());
    };
  }, [prefersReducedMotion]);

  return (
    <main className="relative min-h-screen overflow-hidden bg-[var(--background)] text-[var(--foreground)]">
      <SiteNavbar />

      <section id="about-hero" className="relative overflow-hidden bg-[var(--background)] pt-10 text-[var(--foreground)]">
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(250,248,245,0.94)_0%,rgba(250,248,245,0.88)_100%)]" />
        <GridBackground className="absolute inset-0 opacity-45" cellSize={48} lineOpacity={0.04} lineColor="17, 17, 17" />
        <Container className="relative py-[clamp(4rem,8vw,7rem)]">
          <div className="space-y-5">
            <p className="text-[0.72rem] font-semibold uppercase tracking-[0.38em] text-[var(--foreground)]/50">{ABOUT_PAGE_HERO.eyebrow}</p>
            <h1 className="max-w-4xl font-heading text-[clamp(3rem,8vw,7rem)] font-bold uppercase leading-[0.92] tracking-[-0.06em] text-[var(--foreground)] text-balance">
              {ABOUT_PAGE_HERO.title}
            </h1>
            <p className="max-w-3xl text-[clamp(1rem,1.45vw,1.2rem)] font-medium leading-[1.35] text-[var(--foreground)]/76">
              {ABOUT_PAGE_HERO.subtitle}
            </p>
          </div>
        </Container>
      </section>

      <section ref={whoWeAreRef} id="who-we-are" className="relative overflow-hidden bg-[var(--background)] py-[clamp(4rem,8vw,7rem)] text-[var(--foreground)]">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-start xl:gap-16">
            <div className="space-y-4">
              <p data-about-hero="eyebrow" className="text-[0.72rem] font-semibold uppercase tracking-[0.38em] text-[var(--foreground)]/50">{ABOUT_PAGE_WHO_WE_ARE.eyebrow}</p>
              <h2 data-about-hero="title" className="max-w-3xl font-heading text-[clamp(2.5rem,5.8vw,5rem)] font-bold uppercase leading-[0.92] tracking-[-0.06em] text-[var(--foreground)] text-balance">Who We Are</h2>
              <p data-about-hero="description" className="max-w-2xl text-[clamp(1rem,1.35vw,1.12rem)] leading-[1.75] text-[var(--foreground)]/72">{ABOUT_PAGE_WHO_WE_ARE.description}</p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {ABOUT_PAGE_WHO_WE_ARE.points.map((point) => (
                <div key={point.title} data-about-hero="point" className="rounded-[1.5rem] border border-[var(--border)] bg-[color-mix(in_srgb,var(--surface)_86%,transparent)] p-5 shadow-[var(--shadow-sm)]">
                  <h3 className="text-[0.84rem] font-semibold uppercase tracking-[0.28em] text-[var(--foreground)]">{point.title}</h3>
                  <p className="mt-4 text-[0.96rem] leading-[1.7] text-[var(--foreground)]/70">{point.description}</p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section ref={legacyRef} id="legacy" className="relative overflow-hidden bg-[var(--background)] py-[clamp(4rem,8vw,7rem)] text-[var(--foreground)]">
        <Container>
          <div className="space-y-5">
            <p className="text-[0.72rem] font-semibold uppercase tracking-[0.38em] text-[var(--foreground)]/50">{ABOUT_PAGE_LEGACY.eyebrow}</p>
            <h2 className="max-w-3xl font-heading text-[clamp(2.4rem,5.6vw,4.8rem)] font-bold uppercase leading-[0.94] tracking-[-0.06em] text-[var(--foreground)] text-balance">{ABOUT_PAGE_LEGACY.title}</h2>
          </div>
          <div className="mt-10 grid gap-4 lg:grid-cols-2">
            {ABOUT_PAGE_LEGACY.milestones.map((milestone) => (
              <article key={milestone.year} data-about-legacy="item" className="rounded-[1.5rem] border border-[var(--border)] bg-[color-mix(in_srgb,var(--surface)_86%,transparent)] p-6 shadow-[var(--shadow-sm)]">
                <p className="text-[0.72rem] font-semibold uppercase tracking-[0.32em] text-[var(--foreground)]/50">{milestone.year}</p>
                <h3 className="mt-4 text-[1.05rem] font-semibold tracking-[-0.02em] text-[var(--foreground)]">{milestone.title}</h3>
                <p className="mt-3 max-w-xl text-[0.98rem] leading-[1.7] text-[var(--foreground)]/70">{milestone.description}</p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section ref={drrRef} id="leadership" className="relative overflow-hidden bg-[var(--background)] py-[clamp(4rem,8vw,7rem)] text-[var(--foreground)]">
        <Container>
          <div className="grid gap-8 lg:grid-cols-[0.92fr_1.08fr] lg:items-stretch">
            <div className="rounded-[2rem] border border-[var(--border)] bg-[color-mix(in_srgb,var(--surface)_88%,transparent)] p-5 shadow-[var(--shadow-lg)]">
              <div data-about-drr="card" className="h-full rounded-[1.5rem] border border-[rgba(17,17,17,0.06)] bg-[linear-gradient(180deg,color-mix(in_srgb,var(--accent)_10%,var(--surface))_0%,var(--surface)_42%,color-mix(in_srgb,var(--secondary)_8%,var(--surface))_100%)] p-5 sm:p-6">
                <div className="flex items-center justify-between text-[0.66rem] font-semibold uppercase tracking-[0.32em] text-[var(--foreground)]/55">
                  <span>{ABOUT_PAGE_DRR.eyebrow}</span>
                  <span>{ABOUT_PAGE_DRR.title}</span>
                </div>
                <div className="mt-6 grid gap-6 lg:grid-cols-[0.86fr_1.14fr] lg:items-end">
                  <div className="flex aspect-[4/5] items-center justify-center rounded-[1.5rem] border border-[var(--border)] bg-[color-mix(in_srgb,var(--surface)_94%,transparent)] shadow-[var(--shadow-sm)]">
                    <span className="max-w-[9rem] text-center text-[0.72rem] font-semibold uppercase tracking-[0.32em] text-[var(--foreground)]/50">{ABOUT_PAGE_DRR.portraitLabel}</span>
                  </div>
                  <div className="space-y-4">
                    <p className="text-[0.92rem] font-semibold tracking-[0.14em] text-[var(--foreground)]">{ABOUT_PAGE_DRR.name}</p>
                    <p className="text-[0.72rem] font-medium uppercase tracking-[0.26em] text-[var(--foreground)]/56">{ABOUT_PAGE_DRR.title}</p>
                    <p className="max-w-2xl text-[1rem] leading-[1.8] text-[var(--foreground)]/72">{ABOUT_PAGE_DRR.welcomeMessage}</p>
                    <p className="pt-2 text-[0.72rem] font-medium uppercase tracking-[0.26em] text-[var(--foreground)]/56">{ABOUT_PAGE_DRR.signature}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="space-y-4 rounded-[2rem] border border-[var(--border)] bg-[color-mix(in_srgb,var(--surface)_88%,transparent)] p-6 shadow-[var(--shadow-md)]">
              <p className="text-[0.72rem] font-semibold uppercase tracking-[0.38em] text-[var(--foreground)]/50">LEADERSHIP</p>
              <h2 className="max-w-2xl font-heading text-[clamp(2.5rem,5.8vw,5rem)] font-bold uppercase leading-[0.92] tracking-[-0.06em] text-[var(--foreground)] text-balance">
                District leadership with a personal welcome.
              </h2>
              <p className="max-w-2xl text-[clamp(1rem,1.35vw,1.12rem)] leading-[1.75] text-[var(--foreground)]/72">
                The District Rotaract Representative section is designed as the editorial focal point for the about page, pairing a strong portrait card with a clear, human message from district leadership.
              </p>
            </div>
          </div>
        </Container>
      </section>

      <section ref={visionRef} id="vision" className="relative overflow-hidden bg-[var(--background)] py-[clamp(4rem,8vw,7rem)] text-[var(--foreground)]">
        <Container>
          <div className="space-y-4">
            <p className="text-[0.72rem] font-semibold uppercase tracking-[0.38em] text-[var(--foreground)]/50">{ABOUT_PAGE_VISION.eyebrow}</p>
            <h2 data-about-vision="title" className="max-w-5xl font-heading text-[clamp(2.8rem,7vw,6.4rem)] font-bold uppercase leading-[0.92] tracking-[-0.06em] text-[var(--foreground)] text-balance">
              {ABOUT_PAGE_VISION.heading}
            </h2>
          </div>
        </Container>
      </section>

      <section ref={missionRef} id="mission" className="relative overflow-hidden bg-[var(--background)] py-[clamp(4rem,8vw,7rem)] text-[var(--foreground)]">
        <Container>
          <div className="space-y-4">
            <p className="text-[0.72rem] font-semibold uppercase tracking-[0.38em] text-[var(--foreground)]/50">{ABOUT_PAGE_MISSION.eyebrow}</p>
            <h2 className="max-w-3xl font-heading text-[clamp(2.5rem,5.8vw,4.8rem)] font-bold uppercase leading-[0.94] tracking-[-0.06em] text-[var(--foreground)] text-balance">Mission</h2>
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {ABOUT_PAGE_MISSION.cards.map((card) => (
              <article key={card.title} data-about-mission="card" className="rounded-[1.5rem] border border-[var(--border)] bg-[color-mix(in_srgb,var(--surface)_86%,transparent)] p-6 shadow-[var(--shadow-sm)]">
                <h3 className="text-[0.84rem] font-semibold uppercase tracking-[0.28em] text-[var(--foreground)]">{card.title}</h3>
                <p className="mt-4 text-[0.98rem] leading-[1.75] text-[var(--foreground)]/72">{card.description}</p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section ref={valuesRef} id="values" className="relative overflow-hidden bg-[var(--background)] py-[clamp(4rem,8vw,7rem)] text-[var(--foreground)]">
        <Container>
          <div className="space-y-4">
            <p className="text-[0.72rem] font-semibold uppercase tracking-[0.38em] text-[var(--foreground)]/50">{ABOUT_PAGE_VALUES.eyebrow}</p>
            <h2 className="max-w-5xl font-heading text-[clamp(2.8rem,7vw,6.4rem)] font-bold uppercase leading-[0.92] tracking-[-0.06em] text-[var(--foreground)] text-balance">
              Core Values
            </h2>
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
            {ABOUT_PAGE_VALUES.values.map((value) => (
              <div key={value} data-about-values="value" className="rounded-[1.5rem] border border-[var(--border)] bg-[color-mix(in_srgb,var(--surface)_88%,transparent)] p-5 text-center shadow-[var(--shadow-sm)]">
                <span className="text-[0.84rem] font-semibold uppercase tracking-[0.28em] text-[var(--foreground)]">{value}</span>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section ref={rotaryRef} id="rotary-connection" className="relative overflow-hidden bg-[var(--background)] py-[clamp(4rem,8vw,7rem)] text-[var(--foreground)]">
        <Container>
          <div className="space-y-4">
            <p className="text-[0.72rem] font-semibold uppercase tracking-[0.38em] text-[var(--foreground)]/50">{ABOUT_PAGE_ROTARY.eyebrow}</p>
            <h2 className="max-w-3xl font-heading text-[clamp(2.5rem,5.8vw,4.8rem)] font-bold uppercase leading-[0.94] tracking-[-0.06em] text-[var(--foreground)] text-balance">Rotary Connection</h2>
          </div>

          <div className="mt-8 grid gap-4 lg:grid-cols-4">
            {rotarySteps.map((step, index) => (
              <div key={step} data-about-rotary="step" className="rounded-[1.5rem] border border-[var(--border)] bg-[color-mix(in_srgb,var(--surface)_86%,transparent)] p-5 shadow-[var(--shadow-sm)]">
                <p className="text-[0.72rem] font-semibold uppercase tracking-[0.32em] text-[var(--foreground)]/48">0{index + 1}</p>
                <p className="mt-4 text-[0.95rem] font-medium tracking-[0.02em] text-[var(--foreground)]">{step}</p>
                {index < rotarySteps.length - 1 ? <p className="mt-4 text-[0.72rem] uppercase tracking-[0.28em] text-[var(--foreground)]/42">↓</p> : null}
              </div>
            ))}
          </div>
        </Container>
      </section>
    </main>
  );
}
