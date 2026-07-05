"use client";

import { Container } from "@/components/common/container";
import { ABOUT_PAGE_STORY_WHAT_WE_DO } from "@/data/about-page-story";
import { Users, BookOpen, Globe2, Megaphone, Sparkles } from "lucide-react";
import { TimelineRow } from "../TimelineRow";

const ICONS = [Users, BookOpen, Users, Globe2, Megaphone] as const;

export function WhatWeDo() {
  return (
    <section id="what-we-do" className="relative overflow-hidden bg-[var(--background)] py-[clamp(4.5rem,8vw,7rem)] text-[var(--foreground)]">
      <Container className="max-w-[1280px]">
        <div className="space-y-4">
          <p className="text-[0.72rem] font-semibold uppercase tracking-[0.38em] text-[var(--foreground)]/50">
            {ABOUT_PAGE_STORY_WHAT_WE_DO.eyebrow}
          </p>
          <h2 className="max-w-3xl font-heading text-[clamp(2.6rem,6vw,4.8rem)] font-extrabold uppercase leading-[0.94] tracking-[-0.05em] text-[var(--foreground)] text-balance">
            {ABOUT_PAGE_STORY_WHAT_WE_DO.title}
          </h2>
        </div>

        <div className="mt-8 rounded-[28px] border border-[rgba(0,0,0,0.05)] bg-[color-mix(in_srgb,var(--surface)_92%,transparent)] px-5 shadow-[0_18px_44px_rgba(0,0,0,0.05)]">
          {ABOUT_PAGE_STORY_WHAT_WE_DO.rows.map((row, index) => (
            <TimelineRow
              key={row.title}
              icon={ICONS[index] ?? Sparkles}
              title={row.title}
              description={row.description}
              pill={row.pill}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
