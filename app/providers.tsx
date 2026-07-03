"use client";

import type { ReactNode } from "react";
import { AnimationProvider } from "@/components/common/animation-provider";
import { LenisProvider } from "@/components/common/lenis-provider";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <AnimationProvider>
      <LenisProvider>{children}</LenisProvider>
    </AnimationProvider>
  );
}
