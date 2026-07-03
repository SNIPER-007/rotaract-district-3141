export const ANIMATION_DURATIONS = {
  fast: 0.2,
  medium: 0.35,
  slow: 0.55,
  slower: 0.8,
} as const;

export const ANIMATION_EASING = {
  standard: [0.4, 0, 0.2, 1] as const,
  emphasis: [0.16, 1, 0.3, 1] as const,
  entrance: [0.2, 0.8, 0.2, 1] as const,
  exit: [0.7, 0, 0.84, 0] as const,
} as const;

export const SPRINGS = {
  cursor: {
    stiffness: 700,
    damping: 50,
    mass: 0.15,
  },
  soft: {
    stiffness: 220,
    damping: 26,
    mass: 0.7,
  },
  medium: {
    stiffness: 280,
    damping: 28,
    mass: 0.8,
  },
  snappy: {
    stiffness: 420,
    damping: 30,
    mass: 0.65,
  },
} as const;

export const SPACING_SCALE = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32,
  xxxl: 48,
} as const;

export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  xxl: 1536,
} as const;

export const LENIS_DEFAULT_OPTIONS = {
  lerp: 0.08,
  smoothWheel: true,
  smoothTouch: false,
  wheelMultiplier: 1,
  touchMultiplier: 1.25,
} as const;
