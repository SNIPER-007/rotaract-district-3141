import type { RefObject } from "react";

export type ScrollDirection = "up" | "down" | "none";

export interface ScrollProgressState {
  progress: number;
  velocity: number;
  direction: ScrollDirection;
  isScrolling: boolean;
}

export type ScrollProgressTarget = RefObject<HTMLElement | null> | HTMLElement | string;