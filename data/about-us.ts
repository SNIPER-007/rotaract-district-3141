export interface AboutStat {
  label: string;
  value: number | null;
  suffix?: string;
}

export interface AboutUsContent {
  eyebrow: string;
  headingLines: readonly string[];
  description: string;
  stats: readonly AboutStat[];
  representative: {
    name: string;
    designation: string;
    quote: string;
    portraitLabel: string;
  };
}

export const ABOUT_US_CONTENT: AboutUsContent = {
  eyebrow: "ABOUT US",
  headingLines: [
    "11 Years of",
    "Leadership,",
    "Fellowship &",
    "Community Service.",
  ],
  description:
    "Rotaract District 3141 connects clubs, leaders, and communities across a shared commitment to service, fellowship, and long-term impact. The district exists to support meaningful action, strengthen leadership, and create a trusted platform for Rotaractors to grow together.",
  stats: [
    {
      label: "Years of Impact",
      value: 11,
      suffix: "+",
    },
    {
      label: "Impactful Events",
      value: 50,
      suffix: "+",
    },
    {
      label: "Rotaractors",
      value: null,
    },
    {
      label: "Clubs",
      value: null,
    },
  ],
  representative: {
    name: "PHF. RTR. Shree Hari Nair",
    designation: "District Rotaract Representative 2026–27",
    quote:
      "[Replace with a short DRR message that reflects leadership, service, and continuity for the district.]",
    portraitLabel: "District Rotaract Representative Portrait",
  },
};
