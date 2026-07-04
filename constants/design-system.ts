export const COLOR_TOKENS = {
  light: {
    background: "#FAF8F5",
    foreground: "#111111",
    surface: "#FFFFFF",
    surfaceMuted: "#F3EEE6",
    accent: "#0057FF",
    accentForeground: "#FFFFFF",
    secondary: "#D4AF37",
    secondaryForeground: "#111111",
    border: "rgba(17, 17, 17, 0.08)",
    muted: "rgba(17, 17, 17, 0.64)",
    overlay: "rgba(17, 17, 17, 0.48)",
    selection: "rgba(0, 87, 255, 0.18)",
  },
  dark: {
    background: "#0D0D0D",
    foreground: "#F5F3EE",
    surface: "#141414",
    surfaceMuted: "#1B1B1B",
    accent: "#6EA8FF",
    accentForeground: "#0D0D0D",
    secondary: "#E3C566",
    secondaryForeground: "#111111",
    border: "rgba(255, 255, 255, 0.08)",
    muted: "rgba(245, 243, 238, 0.66)",
    overlay: "rgba(0, 0, 0, 0.56)",
    selection: "rgba(110, 168, 255, 0.24)",
  },
} as const;

export const TYPOGRAPHY_TOKENS = {
  fontFamily: {
    sans: "var(--font-family-sans)",
    heading: "var(--font-family-heading)",
  },
  fontSize: {
    xs: "0.75rem",
    sm: "0.875rem",
    base: "1rem",
    lg: "1.125rem",
    xl: "1.25rem",
    "2xl": "1.5rem",
    "3xl": "1.875rem",
    "4xl": "2.25rem",
    "5xl": "3rem",
    "6xl": "3.75rem",
    "7xl": "4.5rem",
    "8xl": "6rem",
  },
  lineHeight: {
    tight: 1.1,
    snug: 1.2,
    normal: 1.5,
    relaxed: 1.625,
    loose: 2,
  },
  fontWeight: {
    regular: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },
  letterSpacing: {
    tight: "-0.04em",
    snug: "-0.02em",
    normal: "0em",
    wide: "0.02em",
  },
} as const;

export const SPACING_TOKENS = {
  0: "0rem",
  1: "0.5rem",
  2: "1rem",
  3: "1.5rem",
  4: "2rem",
  5: "2.5rem",
  6: "3rem",
  8: "4rem",
  10: "5rem",
  12: "6rem",
  16: "8rem",
  20: "10rem",
  24: "12rem",
  32: "16rem",
} as const;

export const RADIUS_TOKENS = {
  none: "0rem",
  sm: "0.5rem",
  md: "0.75rem",
  lg: "1rem",
  xl: "1.5rem",
  "2xl": "2rem",
  full: "9999px",
} as const;

export const SHADOW_TOKENS = {
  xs: "0 1px 2px rgba(17, 17, 17, 0.04)",
  sm: "0 4px 14px rgba(17, 17, 17, 0.06)",
  md: "0 12px 30px rgba(17, 17, 17, 0.08)",
  lg: "0 24px 48px rgba(17, 17, 17, 0.12)",
  xl: "0 40px 80px rgba(17, 17, 17, 0.14)",
  glow: "0 0 0 1px rgba(0, 87, 255, 0.14), 0 20px 60px rgba(0, 87, 255, 0.18)",
} as const;

export const Z_INDEX_TOKENS = {
  base: 0,
  raised: 10,
  sticky: 100,
  overlay: 400,
  modal: 700,
  popover: 900,
  tooltip: 1000,
  cursor: 2147483647,
} as const;

export const DURATION_TOKENS = {
  instant: "0ms",
  fast: "140ms",
  normal: "180ms",
  medium: "240ms",
  slow: "320ms",
  slower: "520ms",
} as const;

export const EASING_TOKENS = {
  standard: "cubic-bezier(0.4, 0, 0.2, 1)",
  emphasis: "cubic-bezier(0.16, 1, 0.3, 1)",
  entrance: "cubic-bezier(0.2, 0.8, 0.2, 1)",
  exit: "cubic-bezier(0.7, 0, 0.84, 0)",
} as const;

export const BREAKPOINT_TOKENS = {
  sm: "40rem",
  md: "48rem",
  lg: "64rem",
  xl: "80rem",
  "2xl": "96rem",
} as const;

export const LAYOUT_TOKENS = {
  containerWidth: "80rem",
  contentWidth: "72rem",
  pageGutter: "2rem",
} as const;

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

export const DESIGN_TOKENS = {
  colors: COLOR_TOKENS,
  typography: TYPOGRAPHY_TOKENS,
  spacing: SPACING_TOKENS,
  radius: RADIUS_TOKENS,
  shadows: SHADOW_TOKENS,
  zIndex: Z_INDEX_TOKENS,
  durations: DURATION_TOKENS,
  easings: EASING_TOKENS,
  breakpoints: BREAKPOINT_TOKENS,
  layout: LAYOUT_TOKENS,
} as const;
