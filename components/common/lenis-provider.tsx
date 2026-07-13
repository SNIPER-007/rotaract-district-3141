"use client";

import type { ReactNode } from "react";
import { useEffect, useRef } from "react";
import Lenis from "lenis";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { LENIS_DEFAULT_OPTIONS } from "@/constants/animation";

type LenisOptions = ConstructorParameters<typeof Lenis>[0];

interface LenisProviderProps {
  children: ReactNode;
  options?: Partial<LenisOptions>;
}

export function LenisProvider({ children, options }: LenisProviderProps) {
  const lenisRef = useRef<Lenis | null>(null);
  const frameRef = useRef<number | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
      ...LENIS_DEFAULT_OPTIONS,
      ...options,
    });

    lenisRef.current = lenis;
    if (typeof window !== "undefined") {
      (window as any).lenis = lenis;
    }

    const raf = (time: number) => {
      lenis.raf(time);
      ScrollTrigger.update();
      frameRef.current = window.requestAnimationFrame(raf);
    };

    frameRef.current = window.requestAnimationFrame(raf);

    const refreshFrame = window.requestAnimationFrame(() => {
      ScrollTrigger.refresh();
    });

    return () => {
      if (frameRef.current !== null) {
        window.cancelAnimationFrame(frameRef.current);
      }

      window.cancelAnimationFrame(refreshFrame);

      lenis.destroy();
      lenisRef.current = null;
      if (typeof window !== "undefined") {
        (window as any).lenis = null;
      }
    };
  }, [options]);

  return <>{children}</>;
}
