"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { gsap } from "gsap";
import { Container } from "@/components/common/container";
import { SegmentedToggle } from "@/components/common/segmented-toggle";
import { EVENT_CATEGORY_OPTIONS, EVENT_FOLDERS, type EventCategory, type EventFolder } from "@/data/events";
import { FolderCard } from "@/components/events/folder-card";

interface FolderExplorerProps {
  className?: string;
}

const STORAGE_KEY = "rotaract-district-folder-state";

type FolderState = Record<EventCategory, number>;

function getDefaultState(): FolderState {
  return {
    "Rotaract District": 0,
    "Rotary District": 0,
    "Rotaract Clubs": 0,
  };
}

function getCategoryFolders(category: EventCategory) {
  return EVENT_FOLDERS.filter((folder) => folder.category === category);
}

export function FolderExplorer({ className = "" }: FolderExplorerProps) {
  const prefersReducedMotion = useReducedMotion();
  const [category, setCategory] = useState<EventCategory>("Rotaract District");
  const [folderState, setFolderState] = useState<FolderState>(getDefaultState);
  const stackRef = useRef<HTMLDivElement>(null);

  const folders = useMemo(() => getCategoryFolders(category), [category]);
  const activeIndex = Math.min(folderState[category] ?? 0, Math.max(folders.length - 1, 0));
  const activeFolder = folders[activeIndex] ?? folders[0];

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);

      if (!stored) {
        return;
      }

      const parsed = JSON.parse(stored) as Partial<FolderState>;
      setFolderState((current) => ({ ...current, ...parsed }));
    } catch {
      // Ignore storage errors and fall back to defaults.
    }
  }, []);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(folderState));
    } catch {
      // Ignore storage errors.
    }
  }, [folderState]);

  useEffect(() => {
    if (prefersReducedMotion || !stackRef.current) {
      return;
    }

    const activeCard = stackRef.current.querySelector<HTMLElement>("[data-folder-active='true']");
    const inactiveCards = stackRef.current.querySelectorAll<HTMLElement>("[data-folder-active='false']");

    const context = gsap.context(() => {
      if (activeCard) {
        gsap.fromTo(
          activeCard,
          { y: 24, scale: 0.98, opacity: 0.6 },
          { y: 0, scale: 1, opacity: 1, duration: 0.55, ease: "power3.out" },
        );
      }

      if (inactiveCards.length > 0) {
        gsap.to(inactiveCards, {
          y: 16,
          scale: 0.985,
          opacity: 0.72,
          duration: 0.45,
          ease: "power2.out",
        });
      }
    }, stackRef);

    return () => context.revert();
  }, [activeIndex, category, prefersReducedMotion]);

  if (!activeFolder) {
    return null;
  }

  return (
    <section className={className} aria-label="Featured events folder stack">
      <Container>
        <div className="space-y-5">
          <SegmentedToggle
            options={EVENT_CATEGORY_OPTIONS}
            value={category}
            onChange={(value) => setCategory(value)}
            className="max-w-[36rem]"
          />

          <div className="relative flex flex-wrap gap-2 sm:gap-3" role="tablist" aria-label="Event folders">
            {folders.map((folder, index) => {
              const isActive = index === activeIndex;

              return (
                <button
                  key={`${folder.category}-${folder.folderLabel}`}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  aria-pressed={isActive}
                  onClick={() =>
                    setFolderState((current) => ({
                      ...current,
                      [category]: index,
                    }))
                  }
                  className="group relative min-w-[7.25rem] rounded-t-[1.15rem] border border-[var(--border)] border-b-0 px-4 py-3 text-left text-[0.72rem] font-semibold uppercase tracking-[0.3em] text-[var(--foreground)]/72 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--selection)]"
                  style={{
                    transform: isActive ? "translateY(-0.35rem)" : "translateY(0)",
                    backgroundColor: isActive
                      ? "color-mix(in srgb, var(--folder-color) 16%, var(--surface) 84%)"
                      : "color-mix(in srgb, var(--surface) 90%, transparent)",
                    boxShadow: isActive ? "var(--shadow-sm)" : "none",
                    ["--folder-color" as string]: folder.color,
                    clipPath: "polygon(0 100%, 0 30%, 14% 0, 100% 0, 100% 100%)",
                  }}
                >
                  <span className="block transition-transform duration-200 group-hover:-translate-y-0.5">
                    {folder.folderLabel}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </Container>

      <div className="relative mt-2">
        <Container>
          <div ref={stackRef} className="relative h-[clamp(40rem,78svh,54rem)] overflow-hidden rounded-[2rem] rounded-tl-none border border-[var(--border)] bg-[var(--surface)] p-3 shadow-[var(--shadow-lg)] sm:p-4">
            {folders.map((folder, index) => (
              <div
                key={`${folder.category}-${folder.folderLabel}`}
                data-folder-active={index === activeIndex ? "true" : "false"}
                className="absolute inset-0 p-3 sm:p-4"
                style={{ zIndex: index === activeIndex ? 3 : 2 - index }}
              >
                <FolderCard {...folder} active={index === activeIndex} />
              </div>
            ))}
          </div>
        </Container>
      </div>
    </section>
  );
}
