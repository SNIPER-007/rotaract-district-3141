export type EventCategory = "Rotaract District" | "Rotary District" | "Rotaract Clubs";

export interface EventFolder {
  category: EventCategory;
  folderLabel: string;
  title: string;
  date: string;
  venue: string;
  description: string;
  cover: string;
  gallery: readonly string[];
  registrationLink: string;
  color: string;
}

export const EVENT_CATEGORY_OPTIONS: readonly { label: string; value: EventCategory }[] = [
  { label: "Rotaract District", value: "Rotaract District" },
  { label: "Rotary District", value: "Rotary District" },
  { label: "Rotaract Clubs", value: "Rotaract Clubs" },
] as const;

export const EVENT_FOLDERS: readonly EventFolder[] = [
  {
    category: "Rotaract District",
    folderLabel: "Folder 01",
    title: "District Leadership Summit",
    date: "January 2026",
    venue: "District Convention Hall",
    description: "A high-energy district gathering focused on leadership, alignment, and shared goals.",
    cover: "/placeholders/folder-event-placeholder.svg",
    gallery: ["/placeholders/folder-event-placeholder.svg", "/placeholders/folder-event-placeholder.svg", "/placeholders/folder-event-placeholder.svg"],
    registrationLink: "#",
    color: "var(--accent)",
  },
  {
    category: "Rotaract District",
    folderLabel: "Folder 02",
    title: "Service Impact Day",
    date: "February 2026",
    venue: "Citywide Service Circuit",
    description: "District-wide service work with a strong community focus and collaborative action.",
    cover: "/placeholders/folder-event-placeholder.svg",
    gallery: ["/placeholders/folder-event-placeholder.svg", "/placeholders/folder-event-placeholder.svg", "/placeholders/folder-event-placeholder.svg"],
    registrationLink: "#",
    color: "var(--secondary)",
  },
  {
    category: "Rotaract District",
    folderLabel: "Folder 03",
    title: "Leadership Exchange",
    date: "March 2026",
    venue: "Rotaract District Studio",
    description: "A storytelling-led leadership exchange featuring district speakers and club teams.",
    cover: "/placeholders/folder-event-placeholder.svg",
    gallery: ["/placeholders/folder-event-placeholder.svg", "/placeholders/folder-event-placeholder.svg", "/placeholders/folder-event-placeholder.svg"],
    registrationLink: "#",
    color: "color-mix(in srgb, var(--foreground) 18%, var(--accent) 82%)",
  },
  {
    category: "Rotary District",
    folderLabel: "Folder 01",
    title: "Rotary Fellowship Dinner",
    date: "January 2026",
    venue: "Rotary Club Lounge",
    description: "An elegant evening for Rotary members, district guests, and fellowship conversations.",
    cover: "/placeholders/folder-event-placeholder.svg",
    gallery: ["/placeholders/folder-event-placeholder.svg", "/placeholders/folder-event-placeholder.svg", "/placeholders/folder-event-placeholder.svg"],
    registrationLink: "#",
    color: "var(--secondary)",
  },
  {
    category: "Rotary District",
    folderLabel: "Folder 02",
    title: "District Learning Forum",
    date: "February 2026",
    venue: "Rotary Learning Hall",
    description: "A focused forum for district planning, learning sessions, and program alignment.",
    cover: "/placeholders/folder-event-placeholder.svg",
    gallery: ["/placeholders/folder-event-placeholder.svg", "/placeholders/folder-event-placeholder.svg", "/placeholders/folder-event-placeholder.svg"],
    registrationLink: "#",
    color: "var(--accent)",
  },
  {
    category: "Rotary District",
    folderLabel: "Folder 03",
    title: "Community Grant Review",
    date: "March 2026",
    venue: "Rotary District Office",
    description: "District project presentations, grant review sessions, and impact planning.",
    cover: "/placeholders/folder-event-placeholder.svg",
    gallery: ["/placeholders/folder-event-placeholder.svg", "/placeholders/folder-event-placeholder.svg", "/placeholders/folder-event-placeholder.svg"],
    registrationLink: "#",
    color: "color-mix(in srgb, var(--foreground) 18%, var(--accent) 82%)",
  },
  {
    category: "Rotaract Clubs",
    folderLabel: "Folder 01",
    title: "Club Installation Night",
    date: "January 2026",
    venue: "Local Club Venue",
    description: "Club-level installation programming with a polished, celebratory feel.",
    cover: "/placeholders/folder-event-placeholder.svg",
    gallery: ["/placeholders/folder-event-placeholder.svg", "/placeholders/folder-event-placeholder.svg", "/placeholders/folder-event-placeholder.svg"],
    registrationLink: "#",
    color: "var(--accent)",
  },
  {
    category: "Rotaract Clubs",
    folderLabel: "Folder 02",
    title: "Fellowship & Games Night",
    date: "February 2026",
    venue: "Club House",
    description: "A social-first club gathering designed to keep the energy playful and connected.",
    cover: "/placeholders/folder-event-placeholder.svg",
    gallery: ["/placeholders/folder-event-placeholder.svg", "/placeholders/folder-event-placeholder.svg", "/placeholders/folder-event-placeholder.svg"],
    registrationLink: "#",
    color: "var(--secondary)",
  },
  {
    category: "Rotaract Clubs",
    folderLabel: "Folder 03",
    title: "Club Service Sprint",
    date: "March 2026",
    venue: "Community Campus",
    description: "A compact service sprint for clubs to lead a visible community outcome.",
    cover: "/placeholders/folder-event-placeholder.svg",
    gallery: ["/placeholders/folder-event-placeholder.svg", "/placeholders/folder-event-placeholder.svg", "/placeholders/folder-event-placeholder.svg"],
    registrationLink: "#",
    color: "color-mix(in srgb, var(--foreground) 18%, var(--accent) 82%)",
  },
] as const;
