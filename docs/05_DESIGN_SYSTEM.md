# Design System

## Overview
The design system is the foundation for the website’s UI, motion, and content hierarchy. It is token-driven, modular, and designed for long-term scalability.

## Typography
| Token | Value |
|---|---|
| Font family | Geist Sans via `next/font` |
| Display usage | Large headings and feature statements |
| Body usage | Primary reading text |
| Heading style | Bold, compact, high-contrast |
| Body style | Comfortable line height, clear spacing |

### Typography Scale
- xs
- sm
- base
- lg
- xl
- 2xl
- 3xl
- 4xl
- 5xl
- 6xl
- 7xl
- 8xl

## Spacing
The spacing system follows an 8px base scale.

| Token | Value |
|---|---|
| 0 | 0rem |
| 1 | 0.5rem |
| 2 | 1rem |
| 3 | 1.5rem |
| 4 | 2rem |
| 5 | 2.5rem |
| 6 | 3rem |
| 8 | 4rem |
| 10 | 5rem |
| 12 | 6rem |
| 16 | 8rem |
| 20 | 10rem |
| 24 | 12rem |
| 32 | 16rem |

## Grid
- The layout should use a centered container and responsive gutters.
- Content should feel balanced across desktop and mobile.
- Sections should maintain consistent vertical rhythm.

## Breakpoints
| Token | Value |
|---|---|
| sm | 40rem |
| md | 48rem |
| lg | 64rem |
| xl | 80rem |
| 2xl | 96rem |

## Radius
| Token | Value |
|---|---|
| none | 0rem |
| sm | 0.5rem |
| md | 0.75rem |
| lg | 1rem |
| xl | 1.5rem |
| 2xl | 2rem |
| full | 9999px |

## Shadows
| Token | Purpose |
|---|---|
| xs | Subtle elevation |
| sm | Default card depth |
| md | Mid-level depth |
| lg | Stronger floating depth |
| xl | High emphasis surfaces |
| glow | Accent-forward emphasis |

## Buttons
Buttons should be built as reusable, variant-driven components with clear accessibility and loading support. Variants should map to semantic intent rather than visual novelty.

## Cards
Cards should use radius, border, shadow, and surface tokens consistently. Interactive variants must remain restrained and purposeful.

## Badges
Badges are small status or label surfaces. They should be compact, rounded, and easy to scan.

## Components
The design system should support shared components such as:
- Button
- Badge
- Card
- GlassCard
- Container
- SectionHeading
- Divider
- Tag
- FloatingSticker
- ArrowButton
- IconButton
- Input
- Textarea
- Counter
- AnimatedText
- MouseGlow
- Tooltip
- Skeleton
- Loader

## Color Tokens
### Light Theme
- background: `#FAF8F5`
- foreground: `#111111`
- surface: `#FFFFFF`
- surface-muted: `#F3EEE6`
- accent: `#0057FF`
- secondary: `#D4AF37`

### Dark Theme
- background: `#0D0D0D`
- foreground: `#F5F3EE`
- surface: `#141414`
- surface-muted: `#1B1B1B`
- accent: `#6EA8FF`
- secondary: `#E3C566`

## Animation Tokens
| Token Group | Use |
|---|---|
| Durations | Standard motion timing |
| Easings | Global transition curves |
| Springs | Cursor, hover, and interactive motion |

## CSS Variables
The system should be exposed through CSS variables for theme support and utility access.

Examples include:
- `--background`
- `--foreground`
- `--surface`
- `--accent`
- `--secondary`
- `--radius-xl`
- `--shadow-md`
- `--duration-normal`
- `--ease-standard`

## Naming Conventions
- Tokens use lowercase descriptive names.
- React components use PascalCase.
- CSS utilities use semantic names.
- Files should follow one responsibility per file.

## Design Principles
- Token-driven
- Calm and premium
- Responsive by default
- Accessible by design
- Scalable for future CMS and content blocks
- Motion should support meaning
