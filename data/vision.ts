export interface VisionContent {
  eyebrow: string;
  heading: string;
  description: string;
  pillars: readonly {
    title: string;
    description: string;
  }[];
}

export const VISION_CONTENT: VisionContent = {
  eyebrow: "OUR VISION",
  heading: "A district platform built for clarity and continuity.",
  description: "Rotaract District 3141 aims to create a clear, trusted, and future-ready digital home for service and leadership.",
  pillars: [
    {
      title: "Clarity",
      description: "Make district information easy to scan, understand, and act on.",
    },
    {
      title: "Continuity",
      description: "Support long-term storytelling, structure, and institutional memory.",
    },
    {
      title: "Impact",
      description: "Showcase meaningful action, measurable reach, and community value.",
    },
  ],
};
