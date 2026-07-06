"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Cursor } from "@/components/common/cursor";
import { GridBackground } from "@/components/common/grid-background";
import { NoiseOverlay } from "@/components/common/noise-overlay";
import { SiteNavbar } from "@/components/common/site-navbar";
import Footer from "@/components/footer";
import { SupportDistrict } from "@/components/crowdfunding/SupportDistrict";
import { SegmentedToggle } from "@/components/common/segmented-toggle";
import {
  LEADERSHIP_SEARCH_FILTERS,
  type LeadershipDepartment,
  type LeadershipFilter,
  type LeadershipMember,
  type LeadershipPageData,
} from "@/data/leadership";
import { ROTARY_DIRECTORY, type RotaryMember } from "@/data/rotary";
import { AccordionGroupSection } from "./AccordionGroupSection";
import { LeaderCard } from "./LeaderCard";
import { LeadershipHero } from "./Hero";
import { RotaryCard } from "./RotaryCard";
import { SearchBar } from "./SearchBar";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

type LeadershipMode = "rotaract" | "rotary";

function matchesMember(member: LeadershipMember, departmentName: string, filter: LeadershipFilter, query: string) {
  if (!query) {
    return true;
  }

  const haystacks: Record<LeadershipFilter, string[]> = {
    name: [member.name, member.slug, member.designation, departmentName, member.department],
    designation: [member.designation, departmentName, member.department, member.name, member.slug],
    department: [departmentName, member.department, member.designation, member.name, member.slug],
  };

  return haystacks[filter].some((value) => value.toLowerCase().includes(query));
}

function matchesRotaryMember(member: RotaryMember, filter: LeadershipFilter, query: string) {
  if (!query) {
    return true;
  }

  const haystacks: Record<LeadershipFilter, string[]> = {
    name: [member.name, member.role, member.email, member.phone],
    designation: [member.role, member.name, member.email, member.phone],
    department: [member.role, member.name, member.email, member.phone],
  };

  return haystacks[filter].some((value) => value.toLowerCase().includes(query));
}

function filterDepartments(departments: readonly LeadershipDepartment[], filter: LeadershipFilter, query: string) {
  return departments
    .map((department) => ({
      ...department,
      members: department.members.filter((member) => matchesMember(member, department.name, filter, query)),
    }))
    .filter((department) => department.members.length > 0);
}

function filterRotaryMembers(members: readonly RotaryMember[], filter: LeadershipFilter, query: string) {
  return members.filter((member) => matchesRotaryMember(member, filter, query));
}

interface LeadershipPageProps {
  data: LeadershipPageData;
}

export function LeadershipPage({ data }: LeadershipPageProps) {
  const prefersReducedMotion = useReducedMotion();
  const heroRef = useRef<HTMLDivElement>(null);
  const executiveRef = useRef<HTMLDivElement>(null);
  const teamsRef = useRef<HTMLDivElement>(null);
  const zonesRef = useRef<HTMLDivElement>(null);
  const rotaryRef = useRef<HTMLDivElement>(null);
  const [mode, setMode] = useState<LeadershipMode>("rotaract");
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<LeadershipFilter>("name");
  const [openDepartment, setOpenDepartment] = useState<string>(data.departments[0]?.name ?? "");

  const normalizedQuery = query.trim().toLowerCase();

  const filteredExecutive = useMemo(
    () => filterDepartments([data.executiveCommittee], filter, normalizedQuery)[0]?.members ?? [],
    [data.executiveCommittee, filter, normalizedQuery],
  );

  const filteredDepartments = useMemo(
    () => filterDepartments(data.departments, filter, normalizedQuery),
    [data.departments, filter, normalizedQuery],
  );

  const filteredZones = useMemo(
    () => filterDepartments(data.zones, filter, normalizedQuery),
    [data.zones, filter, normalizedQuery],
  );

  const filteredRotary = useMemo(
    () => filterRotaryMembers(ROTARY_DIRECTORY, filter, normalizedQuery).slice().sort((left, right) => left.name.localeCompare(right.name)),
    [filter, normalizedQuery],
  );

  const resultCount =
    mode === "rotaract"
      ? filteredExecutive.length + filteredDepartments.reduce((count, department) => count + department.members.length, 0) + filteredZones.reduce((count, zone) => count + zone.members.length, 0)
      : filteredRotary.length;

  useEffect(() => {
    if (mode !== "rotaract") {
      return;
    }

    if (normalizedQuery) {
      setOpenDepartment(filteredDepartments[0]?.name ?? "");
      return;
    }

    setOpenDepartment(filteredDepartments[0]?.name ?? data.departments[0]?.name ?? "");
  }, [data.departments, filteredDepartments, mode, normalizedQuery]);

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    const context = gsap.context(() => {
      const heroItems = heroRef.current?.querySelectorAll<HTMLElement>("[data-leadership-hero-reveal]") ?? [];

      gsap.fromTo(
        heroItems,
        { autoAlpha: 0, y: 36 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.9,
          stagger: 0.08,
          ease: "power3.out",
        },
      );

      const sections = [executiveRef.current, teamsRef.current, zonesRef.current, rotaryRef.current].filter(
        (element): element is HTMLDivElement => element !== null,
      );

      sections.forEach((section) => {
        const cards = section.querySelectorAll<HTMLElement>("[data-leadership-card]");

        gsap.fromTo(
          cards,
          { autoAlpha: 0, y: 30 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.08,
            ease: "power2.out",
            scrollTrigger: {
              trigger: section,
              start: "top 80%",
              once: true,
            },
          },
        );
      });
    });

    return () => context.revert();
  }, [prefersReducedMotion]);

  return (
    <main className="relative min-h-screen overflow-hidden bg-[var(--background)] text-[var(--foreground)]">
      <Cursor />
      <SiteNavbar />
      <GridBackground className="pointer-events-none fixed inset-0 z-0 opacity-40" cellSize={44} lineOpacity={0.04} lineColor="17, 17, 17" />
      <NoiseOverlay className="pointer-events-none fixed inset-0 z-0" opacity={0.03} />

      <div className="relative z-[1]">
        <div ref={heroRef}>
          <LeadershipHero member={data.drr} />
        </div>

        <section id="rotaract-section" className="relative bg-[var(--background)] px-6 pb-4 pt-0 md:px-12 xl:px-20">
          <div className="mx-auto max-w-[1440px] space-y-6">
            <SegmentedToggle
              options={[
                { label: "Rotaract", value: "rotaract" },
                { label: "Rotary", value: "rotary" },
              ]}
              value={mode}
              onChange={setMode}
              className="max-w-[28rem]"
            />

            <SearchBar
              query={query}
              filter={filter}
              resultCount={resultCount}
              onQueryChange={setQuery}
              onFilterChange={setFilter}
            />
          </div>
        </section>

        {mode === "rotaract" ? (
          <>
            <section ref={executiveRef} id="executive-committee" className="relative overflow-hidden bg-[var(--background)] py-[clamp(4.5rem,8vw,7rem)] text-[var(--foreground)]">
              <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-8 px-6 md:px-12 xl:px-20">
                <div className="space-y-4">
                  <div className="relative w-fit pl-1">
                    <p className="font-script text-[22px] font-medium tracking-[0.01em] text-[var(--accent)] rotate-[-3deg]">
                      Executive Committee
                    </p>
                    <svg aria-hidden="true" viewBox="0 0 180 18" className="mt-1 h-3 w-[9rem] text-[var(--accent)]">
                      <path d="M2 11C18 7 35 12 52 9C69 6 88 9 105 8C123 7 142 10 178 7" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" opacity="0.75" />
                    </svg>
                  </div>
                  <h2 className="max-w-[20ch] font-heading text-[clamp(2.8rem,6vw,5rem)] font-extrabold uppercase leading-[0.94] tracking-[-0.05em] text-[var(--foreground)] text-balance">
                    District Executive Committee
                  </h2>
                </div>

                {filteredExecutive.length > 0 ? (
                  <div className="grid gap-5 md:grid-cols-2">
                    {filteredExecutive.map((member) => (
                      <LeaderCard key={member.slug} member={member} />
                    ))}
                  </div>
                ) : (
                  <p className="max-w-2xl text-[0.98rem] leading-[1.8] text-[var(--foreground)]/68">
                    No executive committee members matched the current search.
                  </p>
                )}
              </div>
            </section>

            <div ref={teamsRef}>
              <AccordionGroupSection
                id="district-teams"
                eyebrow="District Teams"
                title="District Teams"
                groups={filteredDepartments}
                openGroups={openDepartment ? [openDepartment] : []}
                onToggle={(name) => {
                  setOpenDepartment((current) => (current === name ? "" : name));
                }}
              />
            </div>

            <section ref={zonesRef} id="zone-representatives" className="relative overflow-hidden bg-[var(--background)] py-[clamp(4.5rem,8vw,7rem)] text-[var(--foreground)]">
              <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-6 px-6 md:px-12 xl:px-20">
                <div className="space-y-4">
                  <div className="relative w-fit pl-1">
                    <p className="font-script text-[22px] font-medium tracking-[0.01em] text-[var(--accent)] rotate-[-3deg]">
                      Zone Representatives
                    </p>
                    <svg aria-hidden="true" viewBox="0 0 180 18" className="mt-1 h-3 w-[9rem] text-[var(--accent)]">
                      <path d="M2 11C18 7 35 12 52 9C69 6 88 9 105 8C123 7 142 10 178 7" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" opacity="0.75" />
                    </svg>
                  </div>
                  <h2 className="max-w-[20ch] font-heading text-[clamp(2.8rem,6vw,5rem)] font-extrabold uppercase leading-[0.94] tracking-[-0.05em] text-[var(--foreground)] text-balance">
                    Zone Representatives
                  </h2>
                </div>

                {filteredZones.length > 0 ? (
                  <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                    {filteredZones.flatMap((zone) => zone.members).map((member) => (
                      <LeaderCard key={`${member.slug}-${member.department}`} member={member} />
                    ))}
                  </div>
                ) : (
                  <p className="max-w-2xl text-[0.98rem] leading-[1.8] text-[var(--foreground)]/68">
                    No zone representatives matched the current search.
                  </p>
                )}
              </div>
            </section>
          </>
        ) : (
          <section ref={rotaryRef} id="rotary-section" className="relative overflow-hidden bg-[var(--background)] py-[clamp(4.5rem,8vw,7rem)] text-[var(--foreground)]">
            <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-8 px-6 md:px-12 xl:px-20">
              <div className="space-y-4">
                <div className="relative w-fit pl-1">
                  <p className="font-script text-[22px] font-medium tracking-[0.01em] text-[var(--accent)] rotate-[-3deg]">
                    Rotary District Directory
                  </p>
                  <svg aria-hidden="true" viewBox="0 0 180 18" className="mt-1 h-3 w-[9rem] text-[var(--accent)]">
                    <path d="M2 11C18 7 35 12 52 9C69 6 88 9 105 8C123 7 142 10 178 7" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" opacity="0.75" />
                  </svg>
                </div>
                <h2 className="max-w-[20ch] font-heading text-[clamp(2.8rem,6vw,5rem)] font-extrabold uppercase leading-[0.94] tracking-[-0.05em] text-[var(--foreground)] text-balance">
                  Rotary District Directory
                </h2>
                <p className="max-w-[560px] text-[0.98rem] leading-[1.8] text-[var(--foreground)]/70">
                  An elegant text-only directory for Rotary leadership and district contacts.
                </p>
              </div>

              {filteredRotary.length > 0 ? (
                <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                  {filteredRotary.map((member) => (
                    <RotaryCard key={member.email} member={member} />
                  ))}
                </div>
              ) : (
                <p className="max-w-2xl text-[0.98rem] leading-[1.8] text-[var(--foreground)]/68">
                  No Rotary directory entries matched the current search.
                </p>
              )}
            </div>
          </section>
        )}

        <SupportDistrict />
        <Footer />
      </div>
    </main>
  );
}
