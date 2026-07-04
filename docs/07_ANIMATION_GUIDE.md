# Animation Guide

## Philosophy
Animations should never distract from the content. They should support hierarchy, communicate state changes, and make the website feel premium and intentional.

## Rules
- Keep motion purposeful.
- Prefer smooth over flashy.
- Maintain consistency across the site.
- Respect reduced-motion settings.
- Optimize for performance.
- Use motion to guide attention, not compete with it.

## Planned Animations

### Custom Cursor
- Smooth follow animation
- Small circular cursor
- Hidden on mobile
- Blend mode support
- Hover scale states

### Grid
- Very subtle infinite grid appearance
- Pure CSS implementation
- No performance-heavy effects

### Logo Morph
- Default circular mark
- Hover morph to rounded square
- Cursor-near inversion behavior

### Floating Stickers
- Gentle positional drift
- Rotation support
- Hover lift
- Glass style variation

### Hover
- Button hover transitions
- Card elevation shifts
- Icon movement on CTA buttons
- Soft background and border changes

### Page Transitions
- Smooth section-to-section flow
- Fast but elegant route transitions
- No excessive delay

### Section Reveal
- Fade
- Slide
- Scale
- Sequential reveal support for grouped content

### Counter Animation
- Numeric interpolation
- Future GSAP integration ready
- Suffix and prefix support

### Scroll Animation
- Scroll-triggered reveal behaviors
- Subtle parallax-ready surfaces
- Controlled pacing

### Magnetic Buttons
- Slight cursor-follow effect
- Adjustable strength
- Works best on CTA surfaces

### Mouse Parallax
- Layer-based movement on key surfaces
- Very subtle depth cues

### Loading Animation
- Minimal and premium
- Avoid loud spinners
- Should feel calm and informative

## Future Animations
| Animation | Purpose |
|---|---|
| Section timeline | Support long-form storytelling |
| Image parallax | Add depth to media areas |
| Sticky progress | Support long-page reading |
| Navigation emphasis | Improve findability |
| Gallery transitions | Support media browsing |

## Motion Implementation Notes
- Use Framer Motion for component-level interaction.
- Use GSAP and ScrollTrigger for scroll-driven sequences.
- Use Lenis for smooth scrolling.
- Keep animation tokens centralized.
- Use reusable wrappers instead of one-off animation logic.
