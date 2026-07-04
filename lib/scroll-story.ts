import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const MIN_STORY_DISTANCE = 0.8;
const MAX_STORY_DISTANCE = 1.2;

type ScrollTriggerTarget = HTMLElement | string;
type TweenTarget = gsap.TweenTarget;

export interface PinnedScrollStoryOptions {
  trigger: ScrollTriggerTarget;
  scrollDistance?: number;
  start?: string;
  scrub?: number | boolean;
  pinSpacing?: boolean;
  markers?: boolean;
}

export interface SectionTransitionOptions {
  trigger: ScrollTriggerTarget;
  start?: string;
  end?: string;
  scrub?: number | boolean;
  markers?: boolean;
}

export interface StoryStepOptions {
  at?: string | number;
  duration?: number;
  ease?: gsap.EaseString;
  fromOpacity?: number;
  toOpacity?: number;
  fromY?: number;
  toY?: number;
}

export interface StaggerStepOptions extends StoryStepOptions {
  stagger?: number;
}

export function createPinnedStoryTimeline({
  trigger,
  scrollDistance = 1,
  start = "top top",
  scrub = 1,
  pinSpacing = true,
  markers = false,
}: PinnedScrollStoryOptions) {
  const normalizedDistance = Math.min(Math.max(scrollDistance, MIN_STORY_DISTANCE), MAX_STORY_DISTANCE);

  return gsap.timeline({
    defaults: { ease: "none" },
    scrollTrigger: {
      trigger,
      start,
      end: () => `+=${Math.round(window.innerHeight * normalizedDistance)}`,
      pin: true,
      pinSpacing,
      scrub,
      markers,
      invalidateOnRefresh: true,
    },
  });
}

export function createSectionTransitionTimeline({
  trigger,
  start = "top 78%",
  end = "bottom 42%",
  scrub = 1,
  markers = false,
}: SectionTransitionOptions) {
  return gsap.timeline({
    defaults: { ease: "none" },
    scrollTrigger: {
      trigger,
      start,
      end,
      scrub,
      markers,
      invalidateOnRefresh: true,
    },
  });
}

export function fadeStep(timeline: gsap.core.Timeline, target: TweenTarget, options: StoryStepOptions = {}) {
  const {
    at,
    duration = 0.4,
    ease = "power2.out",
    fromOpacity = 1,
    toOpacity = 0,
    fromY = 0,
    toY = -10,
  } = options;

  timeline.fromTo(
    target,
    { autoAlpha: fromOpacity, y: fromY },
    { autoAlpha: toOpacity, y: toY, duration, ease },
    at,
  );

  return timeline;
}

export function revealStep(timeline: gsap.core.Timeline, target: TweenTarget, options: StoryStepOptions = {}) {
  const {
    at,
    duration = 0.6,
    ease = "power2.out",
    fromOpacity = 0,
    toOpacity = 1,
    fromY = 16,
    toY = 0,
  } = options;

  timeline.fromTo(
    target,
    { autoAlpha: fromOpacity, y: fromY },
    { autoAlpha: toOpacity, y: toY, duration, ease },
    at,
  );

  return timeline;
}

export function staggerStep(timeline: gsap.core.Timeline, target: TweenTarget, options: StaggerStepOptions = {}) {
  const {
    at,
    duration = 0.5,
    ease = "power2.out",
    stagger = 0.08,
    fromOpacity = 0,
    toOpacity = 1,
    fromY = 12,
    toY = 0,
  } = options;

  timeline.fromTo(
    target,
    { autoAlpha: fromOpacity, y: fromY },
    { autoAlpha: toOpacity, y: toY, duration, ease, stagger },
    at,
  );

  return timeline;
}

export function overlapStep(offset = 0.14) {
  return `-=${offset}`;
}