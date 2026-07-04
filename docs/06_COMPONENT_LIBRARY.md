# Component Library

## Overview
This document describes the reusable UI component library. The library is custom-built, token-driven, and intended to behave similarly to a design-system package such as shadcn/ui, while remaining specific to this project.

## Shared Component Principles
- Fully typed
- Variant-driven where relevant
- Responsive
- Accessible
- Token-based
- Reusable across future sections and pages
- Avoid duplicated styling logic

## Component Inventory

### Button
**Purpose:** Primary action component for navigation and form actions.

**Props:**
- children
- className
- loading
- disabled
- leftIcon
- rightIcon
- size
- onClick
- variant

**Variants:**
- Primary
- Secondary
- Outline
- Ghost
- Icon

**Usage:** CTA buttons, form submission, utility actions.

**Accessibility:**
- Must preserve focus visibility
- Disabled state must be semantic
- Loading state should not block screen reader context

**Future enhancements:**
- Link support
- Icon-only loading state
- Button group support

**Dependencies:** class-variance-authority, clsx, tailwind-merge

**Examples:**
- Primary CTA
- Secondary action
- Compact icon button

### Badge
**Purpose:** Small label or status indicator.

**Variants:** Blue, Gold, Dark, Glass, Neutral

**Accessibility:** Text must remain legible in all states.

### Chip
**Purpose:** Compact selectable label.

**Behavior:** Hover, active, and selected states.

### Card
**Purpose:** Generic content container.

**Variants:** Default, Glass, Dark, Elevated, Interactive

**Props:** padding, radius, hover

### GlassCard
**Purpose:** Emphasized frosted-glass container.

**Features:** Backdrop blur, border, shadow.

### Container
**Purpose:** Constrain content width and apply responsive horizontal spacing.

**Usage:** Section layout wrapper, content alignment.

### SectionHeading
**Purpose:** Structured heading block for future sections.

**Props:** eyebrow, title, description, align, size

**Accessibility:** Semantic heading hierarchy should be preserved.

### Divider
**Purpose:** Visual separation between content groups.

**Variants:** Horizontal, Vertical

### Tag
**Purpose:** Small floating label with optional icon.

**Usage:** Metadata, feature labels, contextual markers.

### FloatingSticker
**Purpose:** Decorative-but-functional floating label component used for premium motion compositions.

**Props:** rotation, x, y, icon, variant

**Enhancements:** Floating animation, glass style, hover lift.

### ArrowButton
**Purpose:** CTA button with motion-guided arrow movement.

**Behavior:** Arrow slides on hover.

### IconButton
**Purpose:** Compact icon-only button.

**Shapes:** Circle, Rounded Square, Ghost

### Input
**Purpose:** Premium form input.

**Features:** Focus animation, validation states.

### Textarea
**Purpose:** Multi-line form field matching the Input style.

### Counter
**Purpose:** Animated numeric display.

**Props:** value, suffix, prefix, duration

**Future integration:** GSAP-driven counting support.

### AnimatedText
**Purpose:** Text reveal helper prepared for future motion patterns.

**Modes:** Word animation, character animation, line animation.

### MouseGlow
**Purpose:** Cursor-reactive glow layer.

**Features:** Opacity control, blend-mode support.

### Tooltip
**Purpose:** Minimal contextual helper surface.

**Style:** Glass-like and restrained.

### Skeleton
**Purpose:** Loading placeholder for content blocks.

**Usage:** Data loading, async states.

### Loader
**Purpose:** Minimal page or panel loading indicator.

**Usage:** Blocking states, transitions, and page readiness.

## Accessibility
Every component should respect keyboard use, semantic HTML, focus states, and reduced-motion contexts where relevant.

## Future Enhancements
- Link variants for navigation and routing
- Responsive size scales for more primitives
- Animation presets for hover, reveal, and loading states
- CMS-aware content wrappers
- Auto-generated docs from prop metadata
