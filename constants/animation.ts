export {
  ANIMATION_DURATIONS,
  ANIMATION_EASING,
  BREAKPOINT_TOKENS as BREAKPOINTS,
  SPACING_TOKENS as SPACING_SCALE,
  SPRINGS,
} from "./design-system";

export const LENIS_DEFAULT_OPTIONS = {
  lerp: 0.04,
  smoothWheel: true,
  smoothTouch: false,
  wheelMultiplier: 0.85,
  touchMultiplier: 1.25,
} as const;
