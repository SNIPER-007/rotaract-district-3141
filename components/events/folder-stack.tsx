"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { gsap } from "gsap";
import { FolderCard } from "@/components/events/folder-card";
import { EVENTS, type FolderStackEvent } from "@/data/events";
import { Container } from "@/components/common/container";
import { createPinnedStoryTimeline, overlapStep, staggerStep } from "@/lib/scroll-story";

interface FolderStackProps {
  events?: readonly FolderStackEvent[];
  className?: string;
}

export function FolderStack({ events = EVENTS, className = "" }: FolderStackProps) {
  const visibleEvents = useMemo(() => events.slice(0, 3), [events]);
  const sectionRef = useRef<HTMLElement>(null);
  const cardRefs = useRef<Array<HTMLDivElement | null>>([]);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const prefersReducedMotion = useReducedMotion();

  const activeEvent = visibleEvents[activeIndex] ?? visibleEvents[0];

  useEffect(() => {
    const section = sectionRef.current;

    if (!section || prefersReducedMotion || visibleEvents.length === 0) {
      return;
    }

    const context = gsap.context(() => {
      const cards = cardRefs.current.filter((card): card is HTMLDivElement => card !== null);
      const tabs = tabRefs.current.filter((tab): tab is HTMLButtonElement => tab !== null);

      if (!cards.length) {
        return;
      }

      const timeline = createPinnedStoryTimeline({
        trigger: section,
        start: "top top",
        scrollDistance: 1.2,
        scrub: 1,
        pinSpacing: true,
      });

      cards.forEach((card, index) => {
        gsap.set(card, {
          position: "absolute",
          inset: 0,
          zIndex: index + 1,
          yPercent: index === 0 ? 0 : 100,
          scale: index === 0 ? 1 : 0.98,
          transformOrigin: "center top",
          willChange: "transform",
        });

        const date = card.querySelector<HTMLElement>('[data-folder-reveal="date"]');
        const title = card.querySelector<HTMLElement>('[data-folder-reveal="title"]');
        const description = card.querySelector<HTMLElement>('[data-folder-reveal="description"]');
        const cta = card.querySelector<HTMLElement>('[data-folder-reveal="cta"]');
        const tags = Array.from(card.querySelectorAll<HTMLElement>('[data-folder-reveal="tag"]'));
        const image = card.querySelector<HTMLElement>('[data-folder-reveal="image"]');

        if (index === 0) {
          const initialFields = [date, title, description, cta, ...tags].filter(Boolean);

          gsap.set(initialFields, { autoAlpha: 1, y: 0 });
          gsap.set(image, { autoAlpha: 1, scale: 1.03 });
          return;
        }

        const start = overlapStep(0.06 + index * 0.01);

        timeline.fromTo(
          card,
          { yPercent: 100, scale: 0.98 },
          { yPercent: 0, scale: 1.03, duration: 0.34, ease: "power3.out" },
          start,
        );

        timeline.to(
          cards[index - 1],
          { yPercent: -4, scale: 0.995, duration: 0.34, ease: "power2.out" },
          start,
        );

        if (date) {
          gsap.set(date, { autoAlpha: 0, y: 10 });
          timeline.to(date, { autoAlpha: 1, y: 0, duration: 0.16, ease: "power2.out" }, start);
        }

        if (title) {
          gsap.set(title, { autoAlpha: 0, y: 10 });
          timeline.to(title, { autoAlpha: 1, y: 0, duration: 0.16, ease: "power2.out" }, `>${-0.02}`);
        }

        if (description) {
          gsap.set(description, { autoAlpha: 0, y: 10 });
          timeline.to(description, { autoAlpha: 1, y: 0, duration: 0.2, ease: "power2.out" }, `>${-0.02}`);
        }

        if (cta) {
          gsap.set(cta, { autoAlpha: 0, y: 10 });
          timeline.to(cta, { autoAlpha: 1, y: 0, duration: 0.16, ease: "power2.out" }, `>${-0.02}`);
        }

        if (tags.length) {
          gsap.set(tags, { autoAlpha: 0, y: 10 });
          staggerStep(timeline, tags, {
            at: ">-0.02",
            duration: 0.16,
            stagger: 0.04,
            fromOpacity: 0,
            toOpacity: 1,
            fromY: 10,
            toY: 0,
          });
        }

        if (image) {
          gsap.set(image, { autoAlpha: 0.84, scale: 0.98 });
          timeline.to(
            image,
            { autoAlpha: 1, scale: 1.03, duration: 0.36, ease: "power3.out" },
            start,
          );
        }
      });

      const onUpdate = () => {
        const progress = timeline.scrollTrigger?.progress ?? 0;
        const nextActiveIndex = Math.min(
          visibleEvents.length - 1,
          Math.round(progress * (visibleEvents.length - 1)),
        );

        setActiveIndex((currentIndex) => (currentIndex === nextActiveIndex ? currentIndex : nextActiveIndex));

        tabs.forEach((tab, index) => {
          const isActive = index === nextActiveIndex;

          tab.style.transform = isActive ? "translateY(-6px)" : "translateY(0px)";
          tab.style.opacity = isActive ? "1" : "0.72";
          tab.style.boxShadow = isActive ? "var(--shadow-sm)" : "none";
        });
      };

      timeline.eventCallback("onUpdate", onUpdate);
      onUpdate();
    }, section);

    return () => {
      context.revert();
    };
  }, [prefersReducedMotion, visibleEvents]);

  if (!activeEvent) {
    return null;
  }

  return (
    <section ref={sectionRef} className={className} aria-label="Featured events folder stack">
      <Container>
        <div className="mb-4 flex flex-wrap gap-2 sm:gap-3" role="tablist" aria-label="Featured event folders">
        {visibleEvents.map((event, index) => {
          const isActive = index === activeIndex;

          return (
            <button
              key={event.tabLabel}
              type="button"
              role="tab"
              aria-selected={isActive}
              aria-pressed={isActive}
              ref={(element) => {
                tabRefs.current[index] = element;
              }}
              onClick={() => setActiveIndex(index)}
              className="group relative min-w-[7.25rem] rounded-t-[1.15rem] border border-[var(--border)] border-b-0 px-4 py-3 text-left text-[0.72rem] font-semibold uppercase tracking-[0.3em] text-[var(--foreground)]/72 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--selection)]"
              style={{
                transform: isActive ? "translateY(-0.35rem)" : "translateY(0)",
                backgroundColor: isActive
                  ? "color-mix(in srgb, var(--folder-color) 16%, var(--surface) 84%)"
                  : "color-mix(in srgb, var(--surface) 90%, transparent)",
                boxShadow: isActive ? "var(--shadow-sm)" : "none",
                color: isActive ? "var(--foreground)" : "var(--foreground)",
                ["--folder-color" as string]: event.color,
                clipPath: "polygon(0 100%, 0 30%, 14% 0, 100% 0, 100% 100%)",
              }}
            >
              <span className="block transition-transform duration-200 group-hover:-translate-y-0.5">
                {event.tabLabel}
              </span>
            </button>
          );
        })}
        </div>
      </Container>

      <div className="relative">
        <Container>
          <div className="relative h-[clamp(40rem,78svh,52rem)] overflow-hidden rounded-[2rem] rounded-tl-none border border-[var(--border)] bg-[var(--surface)] p-3 shadow-[var(--shadow-lg)] sm:p-4">
            {visibleEvents.map((event, index) => (
              <div
                key={event.tabLabel}
                ref={(element) => {
                  cardRefs.current[index] = element;
                }}
                className="absolute inset-0 p-3 sm:p-4"
              >
                <FolderCard {...event} active={index === activeIndex} />
              </div>
            ))}
          </div>
        </Container>
      </div>
    </section>
  );
}
