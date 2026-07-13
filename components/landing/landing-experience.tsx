"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, useReducedMotion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Cursor } from "@/components/common/cursor";
import { NoiseOverlay } from "@/components/common/noise-overlay";
import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { clamp, mapRange } from "@/utils";
import { Container } from "@/components/common/container";
import {
  createPinnedStoryTimeline,
  fadeStep,
  overlapStep,
  staggerStep,
} from "@/lib/scroll-story";

function useViewport() {
  const [viewport, setViewport] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const updateViewport = () => {
      setViewport({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    updateViewport();
    window.addEventListener("resize", updateViewport);

    return () => window.removeEventListener("resize", updateViewport);
  }, []);

  return viewport;
}

export function LandingExperience() {
  const router = useRouter();
  const sectionRef = useRef<HTMLElement>(null);
  const landingEndRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const viewport = useViewport();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0, velocity: 0, isMoving: false });
  const [isScrolled, setIsScrolled] = useState(false);
  const scrollFrameRef = useRef<number | null>(null);

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    const section = sectionRef.current;

    if (!section) {
      return;
    }

    const context = gsap.context(() => {
      const heading = section.querySelector<HTMLElement>("[data-scroll-story-heading]");
      const subheading = section.querySelector<HTMLElement>("[data-scroll-story-subheading]");
      const buttons = section.querySelector<HTMLElement>("[data-scroll-story-buttons]");
      const stickers = section.querySelectorAll<HTMLElement>("[data-scroll-story-sticker]");
      const grid = section.querySelector<HTMLElement>("[data-scroll-story-grid]");

      if (!heading || !subheading || !buttons || !grid || stickers.length === 0) {
        return;
      }

      const timeline = createPinnedStoryTimeline({
        trigger: section,
        scrollDistance: 1,
        scrub: 1,
        pinSpacing: true,
      });

      fadeStep(timeline, grid, {
        at: 0,
        duration: 0.24,
        toOpacity: 0.68,
        toY: 0,
      });

      fadeStep(timeline, heading, {
        at: 0,
        duration: 0.28,
        toOpacity: 0,
        toY: -12,
      });

      fadeStep(timeline, subheading, {
        at: overlapStep(0.08),
        duration: 0.26,
        toOpacity: 0,
        toY: -8,
      });

      staggerStep(timeline, buttons.querySelectorAll("[data-cursor-button=\"true\"]"), {
        at: overlapStep(0.08),
        duration: 0.24,
        stagger: 0.08,
        fromOpacity: 1,
        toOpacity: 0,
        toY: -6,
      });

      staggerStep(timeline, stickers, {
        at: overlapStep(0.05),
        duration: 0.22,
        stagger: 0.04,
        fromOpacity: 1,
        toOpacity: 0,
        toY: -4,
      });
    }, section);

    const refreshFrame = window.requestAnimationFrame(() => {
      ScrollTrigger.refresh();
    });

    return () => {
      window.cancelAnimationFrame(refreshFrame);
      context.revert();
    };
  }, [prefersReducedMotion]);

  useEffect(() => {
    const handlePointerMove = (event: PointerEvent) => {
      setMousePosition({
        x: event.clientX,
        y: event.clientY,
        velocity: 0,
        isMoving: true,
      });
    };

    const handlePointerLeave = () => {
      setMousePosition((current) => ({ ...current, isMoving: false }));
    };

    const handleScroll = () => {
      if (scrollFrameRef.current !== null) {
        return;
      }

      scrollFrameRef.current = window.requestAnimationFrame(() => {
        scrollFrameRef.current = null;
        const nextIsScrolled = window.scrollY > 16;

        setIsScrolled((current) => (current === nextIsScrolled ? current : nextIsScrolled));
      });
    };

    handleScroll();

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("pointerleave", handlePointerLeave);
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      if (scrollFrameRef.current !== null) {
        window.cancelAnimationFrame(scrollFrameRef.current);
        scrollFrameRef.current = null;
      }

      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerleave", handlePointerLeave);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const backgroundShift = useMemo(() => {
    if (prefersReducedMotion || viewport.width === 0 || viewport.height === 0 || !mousePosition.isMoving) {
      return { x: 0, y: 0 };
    }

    return {
      x: clamp(mapRange(mousePosition.x, 0, viewport.width, -8, 8, true), -8, 8),
      y: clamp(mapRange(mousePosition.y, 0, viewport.height, -8, 8, true), -8, 8),
    };
  }, [mousePosition, prefersReducedMotion, viewport.height, viewport.width]);

  const scrollToImpact = () => {
    const header = document.querySelector("header");
    const navbarHeight = header ? header.offsetHeight : 80;
    const lenis = (window as any).lenis;

    if (lenis) {
      lenis.scrollTo("#impact", { offset: -navbarHeight });
    } else {
      const impactSection = document.getElementById("impact");
      if (impactSection) {
        const rect = impactSection.getBoundingClientRect();
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        window.scrollTo({
          top: rect.top + scrollTop - navbarHeight,
          behavior: prefersReducedMotion ? "auto" : "smooth",
        });
      }
    }
  };

  const handleMeetLeaders = () => {
    router.push("/leadership");
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-[var(--background)] text-[var(--foreground)]">
      <Cursor />

      <motion.section
        ref={sectionRef}
        id="home"
        className="relative min-h-[110svh] overflow-hidden"
      >
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="relative min-h-[110svh]"
        >
          <Navbar mouseX={mousePosition.x} mouseY={mousePosition.y} isScrolled={isScrolled} />
          <Hero
            mouseX={mousePosition.x}
            mouseY={mousePosition.y}
            viewportWidth={viewport.width}
            viewportHeight={viewport.height}
            onPrimaryAction={scrollToImpact}
            onSecondaryAction={handleMeetLeaders}
          />

          <motion.div
            aria-hidden="true"
            className="absolute inset-0"
            animate={{ x: backgroundShift.x, y: backgroundShift.y }}
            transition={{ type: "spring", stiffness: 120, damping: 22 }}
            style={{ pointerEvents: "none" }}
          >
            <Container className="relative h-full" />
          </motion.div>

          <NoiseOverlay className="absolute inset-0 z-[0]" />

          <div ref={landingEndRef} aria-hidden="true" className="absolute bottom-0 h-px w-px" />
        </motion.div>
      </motion.section>
    </main>
  );
}