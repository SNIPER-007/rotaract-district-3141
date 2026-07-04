"use client";

import type { ReactNode } from "react";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface ScrollProviderProps {
  children: ReactNode;
}

export function ScrollProvider({ children }: ScrollProviderProps) {
  const refreshFrameRef = useRef<number | null>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    ScrollTrigger.config({
      autoRefreshEvents: "visibilitychange,DOMContentLoaded,load,resize",
      ignoreMobileResize: true,
    });
    ScrollTrigger.defaults({
      anticipatePin: 1,
      invalidateOnRefresh: true,
    });

    const requestRefresh = () => {
      if (refreshFrameRef.current !== null) {
        window.cancelAnimationFrame(refreshFrameRef.current);
      }

      refreshFrameRef.current = window.requestAnimationFrame(() => {
        refreshFrameRef.current = null;
        ScrollTrigger.refresh();
      });
    };

    requestRefresh();

    window.addEventListener("resize", requestRefresh, { passive: true });
    window.addEventListener("orientationchange", requestRefresh);
    window.addEventListener("load", requestRefresh, { once: true });

    return () => {
      window.removeEventListener("resize", requestRefresh);
      window.removeEventListener("orientationchange", requestRefresh);

      if (refreshFrameRef.current !== null) {
        window.cancelAnimationFrame(refreshFrameRef.current);
      }
    };
  }, []);

  return <>{children}</>;
}