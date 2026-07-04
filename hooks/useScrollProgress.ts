"use client";

import type { RefObject } from "react";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { ScrollDirection, ScrollProgressState } from "@/types/scroll";

gsap.registerPlugin(ScrollTrigger);

interface UseScrollProgressOptions {
  enabled?: boolean;
  start?: string;
  end?: string;
  scrub?: number | boolean;
}

function getDirection(direction: number): ScrollDirection {
  if (direction > 0) {
    return "down";
  }

  if (direction < 0) {
    return "up";
  }

  return "none";
}

export function useScrollProgress(
  targetRef: RefObject<HTMLElement | null>,
  {
    enabled = true,
    start = "top bottom",
    end = "bottom top",
    scrub = true,
  }: UseScrollProgressOptions = {},
): ScrollProgressState {
  const [state, setState] = useState<ScrollProgressState>({
    progress: 0,
    velocity: 0,
    direction: "none",
    isScrolling: false,
  });
  const frameRef = useRef<number | null>(null);
  const stopTimerRef = useRef<number | null>(null);
  const latestStateRef = useRef(state);

  useEffect(() => {
    if (!enabled) {
      return;
    }

    const target = targetRef.current;

    if (!target) {
      return;
    }

    const applyState = (nextState: ScrollProgressState) => {
      latestStateRef.current = nextState;

      if (frameRef.current !== null) {
        return;
      }

      frameRef.current = window.requestAnimationFrame(() => {
        frameRef.current = null;
        setState((currentState) => {
          const currentMatches =
            currentState.progress === latestStateRef.current.progress &&
            currentState.velocity === latestStateRef.current.velocity &&
            currentState.direction === latestStateRef.current.direction &&
            currentState.isScrolling === latestStateRef.current.isScrolling;

          return currentMatches ? currentState : latestStateRef.current;
        });
      });
    };

    const scheduleScrollEnd = () => {
      if (stopTimerRef.current !== null) {
        window.clearTimeout(stopTimerRef.current);
      }

      stopTimerRef.current = window.setTimeout(() => {
        applyState({
          ...latestStateRef.current,
          isScrolling: false,
          velocity: 0,
        });
      }, 120);
    };

    const trigger = ScrollTrigger.create({
      trigger: target,
      start,
      end,
      scrub,
      invalidateOnRefresh: true,
      onUpdate(self) {
        applyState({
          progress: self.progress,
          velocity: self.getVelocity(),
          direction: getDirection(self.direction),
          isScrolling: true,
        });

        scheduleScrollEnd();
      },
      onToggle(self) {
        if (!self.isActive) {
          applyState({
            ...latestStateRef.current,
            isScrolling: false,
            velocity: 0,
          });
        }
      },
      onRefresh(self) {
        applyState({
          progress: self.progress,
          velocity: self.getVelocity(),
          direction: getDirection(self.direction),
          isScrolling: self.isActive,
        });
      },
    });

    return () => {
      trigger.kill();

      if (frameRef.current !== null) {
        window.cancelAnimationFrame(frameRef.current);
      }

      if (stopTimerRef.current !== null) {
        window.clearTimeout(stopTimerRef.current);
      }
    };
  }, [enabled, end, scrub, start, targetRef]);

  return state;
}