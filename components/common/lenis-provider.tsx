"use client";

import type { ReactNode } from "react";
import { useEffect, useRef } from "react";
import Lenis from "lenis";
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

    const raf = (time: number) => {
      lenis.raf(time);
      frameRef.current = window.requestAnimationFrame(raf);
    };

    frameRef.current = window.requestAnimationFrame(raf);

    return () => {
      if (frameRef.current !== null) {
        window.cancelAnimationFrame(frameRef.current);
      }

      lenis.destroy();
      lenisRef.current = null;
    };
  }, [options]);

  return <>{children}</>;
}
