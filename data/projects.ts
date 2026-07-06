export interface Project {
  title: string;
  description: string;
  raised: number;
  goal: number;
  image: string;
  qrImage: string;
  upi: string;
  registrationLink: string;
  tags: readonly string[];
}

export const PROJECTS: readonly Project[] = [
  {
    title: "Rotaract Youth Centre",
    description: "A district space for training, collaboration, and youth-led service initiatives.",
    raised: 380000,
    goal: 750000,
    image: "/placeholders/folder-event-placeholder.svg",
    qrImage: "/placeholders/qr-placeholder.svg",
    upi: "district3141@upi",
    registrationLink: "#",
    tags: ["Infrastructure", "Youth"],
  },
  {
    title: "Community Health Drive",
    description: "Mobile clinics, screenings, and health education for underserved communities.",
    raised: 215000,
    goal: 500000,
    image: "/placeholders/folder-event-placeholder.svg",
    qrImage: "/placeholders/qr-placeholder.svg",
    upi: "district3141@upi",
    registrationLink: "#",
    tags: ["Health", "Service"],
  },
  {
    title: "District Fellowship Fund",
    description: "Support for inter-club collaboration, leadership learning, and fellowship programming.",
    raised: 124000,
    goal: 300000,
    image: "/placeholders/folder-event-placeholder.svg",
    qrImage: "/placeholders/qr-placeholder.svg",
    upi: "district3141@upi",
    registrationLink: "#",
    tags: ["Fellowship", "Programs"],
  },
] as const;