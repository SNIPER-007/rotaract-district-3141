"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { Button } from "@/components/common/button";
import { EVENT_FOLDERS } from "@/data/events";

const FEATURED_EVENT_COUNT = 3;

export function EventsSlider() {
  const prefersReducedMotion = useReducedMotion();
  const sliderRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const featuredEvents = useMemo(() => EVENT_FOLDERS.slice(0, FEATURED_EVENT_COUNT), []);

  useEffect(() => {
    const node = sliderRef.current;

    if (!node) {
      return;
    }

    const cards = Array.from(node.querySelectorAll<HTMLElement>("[data-event-card]"));

    if (cards.length === 0) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries.find((entry) => entry.isIntersecting && entry.intersectionRatio >= 0.55);

        if (!visibleEntry) {
          return;
        }

        const index = cards.findIndex((card) => card === visibleEntry.target);

        if (index >= 0) {
          setActiveIndex(index);
        }
      },
      {
        root: node,
        threshold: [0.35, 0.55, 0.7],
      },
    );

    cards.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
  }, []);

  const scrollToIndex = (index: number) => {
    const node = sliderRef.current;

    if (!node) {
      return;
    }

    const cards = Array.from(node.querySelectorAll<HTMLElement>("[data-event-card]"));
    const target = cards[index];

    if (!target) {
      return;
    }

    target.scrollIntoView({ behavior: prefersReducedMotion ? "auto" : "smooth", inline: "start", block: "nearest" });
    setActiveIndex(index);
  };

  if (featuredEvents.length === 0) {
    return null;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <div className="space-y-2">
          <p className="font-script text-[20px] font-medium tracking-[0.01em] text-[var(--accent)] rotate-[-2deg]">
            Previous Events
          </p>
          <svg aria-hidden="true" viewBox="0 0 180 18" className="h-3 w-[8.5rem] text-[var(--accent)]">
            <path d="M2 11C18 7 35 12 52 9C69 6 88 9 105 8C123 7 142 10 178 7" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" opacity="0.75" />
          </svg>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => scrollToIndex(Math.max(activeIndex - 1, 0))}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[rgba(0,0,0,0.08)] bg-white text-[var(--foreground)] shadow-[0_10px_22px_rgba(0,0,0,0.06)] transition-transform duration-200 hover:-translate-y-0.5"
            aria-label="Previous event"
          >
            <ChevronLeft size={16} />
          </button>
          <button
            type="button"
            onClick={() => scrollToIndex(Math.min(activeIndex + 1, featuredEvents.length - 1))}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[rgba(0,0,0,0.08)] bg-white text-[var(--foreground)] shadow-[0_10px_22px_rgba(0,0,0,0.06)] transition-transform duration-200 hover:-translate-y-0.5"
            aria-label="Next event"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      <div
        ref={sliderRef}
        className="-mx-6 flex snap-x snap-mandatory gap-5 overflow-x-auto px-6 pb-3 md:-mx-12 md:px-12 xl:-mx-20 xl:px-20"
      >
        {featuredEvents.map((event, index) => (
          <motion.article
            key={`${event.category}-${event.folderLabel}-${event.title}`}
            data-event-card="true"
            className="min-w-[min(86vw,26rem)] snap-center overflow-hidden rounded-[2rem] border border-[rgba(0,0,0,0.06)] bg-white shadow-[0_16px_40px_rgba(0,0,0,0.05)] md:min-w-[24rem] lg:min-w-[26rem]"
            initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
            whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.6, ease: [0.215, 0.61, 0.355, 1] }}
          >
            <div className="relative aspect-[16/10] overflow-hidden bg-[linear-gradient(180deg,rgba(0,87,255,0.08),rgba(0,87,255,0.02))]">
              <Image
                src={event.cover}
                alt={event.title}
                fill
                sizes="(min-width: 1024px) 26rem, 86vw"
                className="object-cover transition-transform duration-700 hover:scale-[1.05]"
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.08)_0%,rgba(17,17,17,0.06)_100%)]" />
              <div className="absolute left-4 top-4 rounded-full border border-[rgba(255,255,255,0.5)] bg-[color-mix(in_srgb,var(--surface)_74%,transparent)] px-3 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.28em] text-[var(--foreground)]/72 shadow-[var(--shadow-xs)] backdrop-blur-md">
                {index + 1} / {featuredEvents.length}
              </div>
            </div>

            <div className="space-y-4 p-5 md:p-6">
              <div className="space-y-2">
                <p className="text-[0.72rem] font-semibold uppercase tracking-[0.28em] text-[var(--foreground)]/46">
                  {event.date}
                </p>
                <h3 className="font-heading text-[clamp(1.35rem,2.4vw,1.9rem)] font-extrabold uppercase leading-[0.96] tracking-[-0.04em] text-[var(--foreground)] text-balance">
                  {event.title}
                </h3>
                <p className="text-[0.92rem] leading-[1.75] text-[var(--foreground)]/68">
                  {event.description}
                </p>
              </div>

              <div className="flex items-center justify-between gap-3">
                <p className="text-[0.74rem] font-semibold uppercase tracking-[0.24em] text-[var(--foreground)]/52">
                  {event.venue}
                </p>
                <Link href="/events" className="inline-flex h-11 items-center rounded-full border border-[rgba(0,0,0,0.08)] bg-[var(--background)] px-4 text-[0.76rem] font-medium text-[var(--foreground)] transition-shadow hover:shadow-[0_12px_24px_rgba(17,17,17,0.08)]">
                  View Events
                </Link>
              </div>
            </div>
          </motion.article>
        ))}
      </div>

      <div className="flex items-center gap-2 px-1">
        {featuredEvents.map((event, index) => (
          <button
            key={`${event.category}-${event.folderLabel}-dot`}
            type="button"
            onClick={() => scrollToIndex(index)}
            className={`h-2.5 rounded-full transition-all duration-300 ${index === activeIndex ? "w-10 bg-[var(--foreground)]" : "w-2.5 bg-[var(--foreground)]/20"}`}
            aria-label={`Go to event ${index + 1}`}
            aria-pressed={index === activeIndex}
          />
        ))}
      </div>
    </div>
  );
}