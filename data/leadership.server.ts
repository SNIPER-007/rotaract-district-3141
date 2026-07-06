import { readFileSync } from "node:fs";
import { join } from "node:path";
import {
  type LeadershipDepartment,
  type LeadershipDrr,
  type LeadershipMember,
  type LeadershipPageData,
  toPhotoSlug,
} from "./leadership";

type ParsedRow = {
  sr: string;
  name: string;
  designation: string;
  email: string;
  phone: string;
};

type ParsedSection = {
  section: string;
  rows: ParsedRow[];
};

const SECTION_RENAMES: Record<string, string> = {
  "TEAM DRS": "Joint Secretaries",
  "Events and Fellowship": "Events & Fellowship",
  "Public Relations and Marketing": "Public Relations & Marketing",
  Zones: "Zone Representatives",
};

function normalizeSectionName(section: string) {
  return SECTION_RENAMES[section] ?? section;
}

function cleanName(name: string) {
  return name
    .replace(/^(?:PHF\.?\s*)?(?:RTR\.?\s*)?(?:Rtr\.?\s*)?/i, "")
    .replace(/\s+/g, " ")
    .trim()
    .toLowerCase();
}

function splitRows(markdown: string): ParsedSection[] {
  const lines = markdown.split(/\r?\n/).map((line) => line.trimEnd());
  const sections: ParsedSection[] = [];
  let current: ParsedSection | null = null;
  let pending = "";

  const flushPending = () => {
    if (!current || !pending) {
      return;
    }

    const cols = pending.split("\t").map((cell) => cell.trim());
    current.rows.push({
      sr: cols[0] ?? "",
      name: cols[1] ?? "",
      designation: cols[2] ?? "",
      email: cols[3] ?? "",
      phone: cols[4] ?? "",
    });
    pending = "";
  };

  for (const line of lines) {
    if (!line || /^Sr No\t/.test(line)) {
      continue;
    }

    if (!line.includes("\t")) {
      flushPending();
      current = { section: normalizeSectionName(line), rows: [] };
      sections.push(current);
      continue;
    }

    if (!current) {
      continue;
    }

    if (/^(\(\(\d+\)\)|\d+)\t/.test(line)) {
      flushPending();
      pending = line;
      continue;
    }

    if (pending) {
      pending += ` ${line}`;
    }
  }

  flushPending();
  return sections;
}

function toMember(row: ParsedRow, department: string, zone?: string): LeadershipMember {
  return {
    name: row.name,
    designation: row.designation,
    phone: row.phone.replace(/\s+/g, " ").trim(),
    email: row.email,
    photo: `${toPhotoSlug(row.name)}.jpg`,
    slug: toPhotoSlug(row.name),
    department,
    ...(zone ? { zone } : {}),
  };
}

function toDepartment(name: string, rows: ParsedRow[], zone?: string): LeadershipDepartment {
  const seen = new Set<string>();
  const members = rows.reduce<LeadershipMember[]>((accumulator, row) => {
    const member = toMember(row, name, zone);

    if (seen.has(member.slug)) {
      return accumulator;
    }

    seen.add(member.slug);
    accumulator.push(member);
    return accumulator;
  }, []);

  return { name, members };
}

function toZoneGroups(rows: ParsedRow[]): LeadershipDepartment[] {
  const byZone = new Map<string, ParsedRow[]>();

  for (const row of rows) {
    const zone = row.designation.match(/Zone\s+\d+/i)?.[0] ?? row.designation;
    const current = byZone.get(zone) ?? [];
    current.push(row);
    byZone.set(zone, current);
  }

  return Array.from(byZone.entries()).map(([zone, zoneRows]) => toDepartment(zone, zoneRows, zone));
}

function loadSections() {
  const markdownPath = join(process.cwd(), "leadership.md");
  const markdown = readFileSync(markdownPath, "utf8");
  return splitRows(markdown);
}

export function loadLeadershipPageData(): LeadershipPageData {
  const sections = loadSections();
  const sectionMap = new Map(sections.map((section) => [section.section, section.rows] as const));

  const executiveRows = (sectionMap.get("District Executive Committee") ?? []).filter(
    (row) => cleanName(row.name) !== "shreehari nair",
  );

  const drrRow = (sectionMap.get("District Executive Committee") ?? []).find(
    (row) => cleanName(row.name) === "shreehari nair",
  );

  if (!drrRow) {
    throw new Error("Unable to locate Shreehari Nair in the leadership dataset.");
  }

  const drr: LeadershipDrr = {
    ...toMember(drrRow, "District Executive Committee"),
    name: "PHF. RTR. Shreehari Nair",
    tenure: "2026–27",
    bio: "Shreehari Nair leads District 3141 as District Rotaract Representative, aligning clubs, championing service, and keeping the district’s leadership network focused on impact.",
    signature: "With service, Shreehari Nair",
  };

  const departments: LeadershipDepartment[] = [
    toDepartment("Joint Secretaries", sectionMap.get("Joint Secretaries") ?? []),
    toDepartment("Finance", sectionMap.get("Finance") ?? []),
    toDepartment("Mega Events", sectionMap.get("Mega Events") ?? []),
    toDepartment("Events & Fellowship", sectionMap.get("Events & Fellowship") ?? []),
    toDepartment("Community Service", sectionMap.get("Community Service") ?? []),
    toDepartment("International Service", sectionMap.get("International Service") ?? []),
    toDepartment("Professional Development", sectionMap.get("Professional Development") ?? []),
    toDepartment("Sports", sectionMap.get("Sports") ?? []),
    toDepartment("Entrepreneurship Development", sectionMap.get("Entrepreneurship Development") ?? []),
    toDepartment("Public Relations & Marketing", sectionMap.get("Public Relations & Marketing") ?? []),
    toDepartment("Partners-In-Service", sectionMap.get("Partners-In-Service") ?? []),
    toDepartment("Digital Communications", sectionMap.get("Digital Communications") ?? []),
    toDepartment("Publications", sectionMap.get("Publications") ?? []),
    toDepartment("Social Media", sectionMap.get("Social Media") ?? []),
    toDepartment("Human Resource Development", sectionMap.get("Human Resource Development") ?? []),
  ];

  const zones = toZoneGroups(sectionMap.get("Zone Representatives") ?? []);

  return {
    drr,
    executiveCommittee: toDepartment("District Executive Committee", executiveRows),
    departments,
    zones,
  };
}