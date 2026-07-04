import type { FolderCardProps } from "@/components/events/folder-card";

export interface FolderStackEvent extends FolderCardProps {
  tabLabel: string;
}

export const EVENTS: readonly FolderStackEvent[] = [
  {
    tabLabel: "EVENT 01",
    title: "Event 1",
    date: "January 2026",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet mauris vel justo suscipit aliquet in non urna.",
    image: "/placeholders/folder-event-placeholder.svg",
    color: "var(--accent)",
    cta: "View Event →",
    tags: ["Event 1 Tag", "Placeholder Tag"],
    active: true,
  },
  {
    tabLabel: "EVENT 02",
    title: "Event 2",
    date: "January 2026",
    description:
      "Praesent eu risus sed metus vulputate ultrices. Integer vel nibh a sem bibendum hendrerit, vitae tincidunt lectus.",
    image: "/placeholders/folder-event-placeholder.svg",
    color: "var(--secondary)",
    cta: "View Event →",
    tags: ["Event 2 Tag", "Placeholder Tag"],
    active: false,
  },
  {
    tabLabel: "EVENT 03",
    title: "Event 3",
    date: "January 2026",
    description:
      "Suspendisse potenti. In at orci sit amet felis faucibus porta. Morbi dignissim, nibh id interdum bibendum, magna justo congue neque.",
    image: "/placeholders/folder-event-placeholder.svg",
    color: "color-mix(in srgb, var(--foreground) 18%, var(--accent) 82%)",
    cta: "View Event →",
    tags: ["Event 3 Tag", "Placeholder Tag"],
    active: false,
  },
];
