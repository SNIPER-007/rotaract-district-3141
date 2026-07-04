"use client";

import type { ReactNode } from "react";
import { ScrollProvider } from "@/components/common/scroll-provider";
import { LenisProvider } from "@/components/common/lenis-provider";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ScrollProvider>
      <LenisProvider>{children}</LenisProvider>
    </ScrollProvider>
  );
}
