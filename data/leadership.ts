export interface LeadershipMember {
  name: string;
  designation: string;
  phone: string;
  email: string;
  photo: string;
  slug: string;
  department: string;
  zone?: string;
}

export interface LeadershipDepartment {
  name: string;
  members: LeadershipMember[];
}

export interface LeadershipZone {
  name: string;
  members: LeadershipMember[];
}

export type LeadershipFilter = "name" | "designation" | "department";

export interface LeadershipDrr extends LeadershipMember {
  tenure: string;
  bio: string;
  signature: string;
}

export interface LeadershipPageData {
  drr: LeadershipDrr;
  executiveCommittee: LeadershipDepartment;
  departments: LeadershipDepartment[];
  zones: LeadershipDepartment[];
}

export const LEADERSHIP_HERO = {
  eyebrow: "Meet the People Behind District 3141",
  title: "LEADERSHIP",
  statement: "One District. One Leadership Team. One Shared Vision.",
  intro:
    "District 3141 is guided by a connected leadership network that keeps clubs aligned, service moving, and fellowship at the center of every district-level decision.",
} as const;

export const LEADERSHIP_SEARCH_FILTERS: readonly { label: string; value: LeadershipFilter }[] = [
  { label: "Name", value: "name" },
  { label: "Designation", value: "designation" },
  { label: "Department", value: "department" },
] as const;

export function toPhotoSlug(name: string) {
  return name
    .replace(/^(?:PHF\.?\s*)?(?:RTR\.?\s*)?(?:Rtr\.?\s*)?/i, "")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
