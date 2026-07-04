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
    welcomeMessage: string;
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
      label: "Years",
      value: 11,
      suffix: "+",
    },
    {
      label: "Impactful Events",
      value: 50,
      suffix: "+",
    },
    {
      label: "Rotaract Clubs",
      value: null,
    },
    {
      label: "Rotaractors",
      value: null,
    },
  ],
  representative: {
    name: "PHF. RTR. Shree Hari Nair",
    designation: "District Rotaract Representative 2026–27",
    welcomeMessage:
      "Welcome to Rotaract District 3141. Together, we will strengthen fellowship, serve our communities, and build continuity through meaningful leadership.",
    portraitLabel: "District Rotaract Representative Portrait",
  },
};
