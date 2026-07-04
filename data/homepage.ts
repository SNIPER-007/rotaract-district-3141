export interface HomepageImpactStat {
  label: string;
  value: string;
}

export const HOMEPAGE_IMPACT = {
  eyebrow: "OUR IMPACT",
  heading: "Service that compounds through clubs and action.",
  description: "Rotaract District 3141 connects clubs and members through visible community work, leadership, and district-wide coordination.",
  stats: [
    { label: "Years", value: "11+" },
    { label: "Events", value: "250+" },
    { label: "Participants", value: "8000+" },
    { label: "Lives Touched", value: "500+" },
    { label: "Community Reach", value: "2L+" },
    { label: "Rotaractors", value: "50000+" },
  ] as readonly HomepageImpactStat[],
} as const;

export const WHO_WE_ARE_PREVIEW = {
  eyebrow: "WHO WE ARE",
  heading: "A district built for leadership and service.",
  description: "Rotaract District 3141 brings clubs together through service, fellowship, and a shared district identity.",
  bullets: ["Community Service", "Leadership Development", "Fellowship"],
  cta: "Read the About Page",
} as const;
