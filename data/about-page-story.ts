export const ABOUT_PAGE_STORY_HERO = {
  eyebrow: "ABOUT",
  title: "ABOUT",
  subtitle: "Rotaract District 3141",
  description: "A district story shaped by service, fellowship, leadership, and community momentum.",
} as const;

export const ABOUT_PAGE_STORY_DRR = {
  eyebrow: "MESSAGE FROM",
  nameLines: ["PHF. RTR.", "SHREE HARI NAIR"] as const,
  role: "District Rotaract Representative",
  tenure: "2026–27",
  preview:
    "Welcome to Rotaract District 3141. May this year be defined by purposeful service, meaningful fellowship, and leadership that leaves a lasting impact.",
  signature: "[Signature Placeholder]",
  cta: "Read Full Message",
} as const;

export const ABOUT_PAGE_STORY_JOURNEY = {
  eyebrow: "OUR STORY",
  title: "Our Journey",
  cards: [
    {
      title: "The Beginning",
      description:
        "A simple idea became a district story rooted in action, connection, and a shared sense of purpose.",
      note: "Every step mattered.",
      tone: "blue",
      align: "left",
    },
    {
      title: "Growing Together",
      description:
        "Clubs discovered the strength of working in rhythm, building momentum through consistent fellowship.",
      note: "Growing together.",
      tone: "yellow",
      align: "right",
    },
    {
      title: "Building Communities",
      description:
        "Service expanded beyond events to become a reliable way of showing up for communities with intention.",
      note: "One District.",
      tone: "green",
      align: "left",
    },
    {
      title: "The Future",
      description:
        "The district keeps evolving with clearer systems, stronger leadership, and a more future-ready voice.",
      note: "Keep moving forward.",
      tone: "pink",
      align: "right",
    },
  ] as const,
} as const;

export const ABOUT_PAGE_STORY_WHAT_WE_DO = {
  eyebrow: "WHAT WE DO",
  title: "District Programs",
  rows: [
    {
      title: "Community Service",
      description: "Projects that address real local needs with visible and lasting community value.",
      pill: "Impact",
      icon: "↗",
    },
    {
      title: "Professional Development",
      description: "Programs that help members build confidence, communication, and practical leadership habits.",
      pill: "Growth",
      icon: "◎",
    },
    {
      title: "Club Service",
      description: "Support that keeps clubs connected, coordinated, and operating with shared purpose.",
      pill: "Support",
      icon: "•",
    },
    {
      title: "International Service",
      description: "A wider perspective that links district action to global citizenship and Rotary values.",
      pill: "Global",
      icon: "◌",
    },
    {
      title: "Public Relations",
      description: "Clear storytelling that helps the district communicate with confidence and consistency.",
      pill: "Story",
      icon: "✦",
    },
  ] as const,
} as const;
