"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Cursor } from "@/components/common/cursor";
import { GridBackground } from "@/components/common/grid-background";
import { NoiseOverlay } from "@/components/common/noise-overlay";
import { SiteNavbar } from "@/components/common/site-navbar";
import { ContactPreview } from "@/components/contact/contact-preview";
import Footer from "@/components/footer";
import { AboutHero } from "./Hero";
import { DRRMessage } from "./DRRMessage";
import { FloatingNavigation, type FloatingNavigationItem } from "./FloatingNavigation";
import { Journey } from "./Journey";
import { WhatWeDo } from "./WhatWeDo";

export function AboutPage() {
  const messageRef = useRef<HTMLDivElement>(null);
  const journeyRef = useRef<HTMLDivElement>(null);
  const whatWeDoRef = useRef<HTMLDivElement>(null);
  const [activeId, setActiveId] = useState("message");

  const navItems = useMemo<FloatingNavigationItem[]>(
    () => [
      { id: "message", label: "message", ref: messageRef },
      { id: "journey", label: "journey", ref: journeyRef },
      { id: "what-we-do", label: "work", ref: whatWeDoRef },
    ],
    [],
  );

  useEffect(() => {
    const targets = navItems
      .map((item) => item.ref.current)
      .filter((element): element is HTMLDivElement => element !== null);

    if (!targets.length) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((left, right) => right.intersectionRatio - left.intersectionRatio)[0];

        if (!visible) {
          return;
        }

        const match = navItems.find((item) => item.ref.current === visible.target);

        if (match) {
          setActiveId(match.id);
        }
      },
      { root: null, threshold: [0.24, 0.42, 0.6, 0.8] },
    );

    targets.forEach((target) => observer.observe(target));

    return () => observer.disconnect();
  }, [navItems]);

  const scrollToSection = (id: string) => {
    const target = navItems.find((item) => item.id === id)?.ref.current;

    if (!target) {
      return;
    }

    const offset = 88;
    const top = window.scrollY + target.getBoundingClientRect().top - offset;

    window.scrollTo({ top, behavior: "smooth" });
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-[var(--background)] text-[var(--foreground)]">
      <Cursor />
      <SiteNavbar compact />
      <GridBackground className="pointer-events-none fixed inset-0 z-0 opacity-40" cellSize={44} lineOpacity={0.04} lineColor="17, 17, 17" />
      <NoiseOverlay className="pointer-events-none fixed inset-0 z-0" opacity={0.03} />

      <div className="relative z-[1]">
        <AboutHero />
        <FloatingNavigation items={navItems} activeId={activeId} onNavigate={scrollToSection} />
        <div ref={messageRef}>
          <DRRMessage />
        </div>
        <div ref={journeyRef}>
          <Journey />
        </div>
        <div ref={whatWeDoRef}>
          <WhatWeDo />
        </div>
        <ContactPreview />
        <Footer />
      </div>
    </main>
  );
}
