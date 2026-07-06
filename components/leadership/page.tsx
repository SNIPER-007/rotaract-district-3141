"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Cursor } from "@/components/common/cursor";
import { GridBackground } from "@/components/common/grid-background";
import { NoiseOverlay } from "@/components/common/noise-overlay";
import { SiteNavbar } from "@/components/common/site-navbar";
import { ContactPreview } from "@/components/contact/contact-preview";
import Footer from "@/components/footer";
import {
  type LeadershipPageData,
  LEADERSHIP_SEARCH_FILTERS,
  type LeadershipDepartment,
  type LeadershipFilter,
  type LeadershipMember,
} from "@/data/leadership";
import { AccordionGroupSection } from "./AccordionGroupSection";
import { DRRCard } from "./DRRCard";
import { DepartmentAccordion } from "./DepartmentAccordion";
import { LeadershipHero } from "./Hero";
import { MemberCard } from "./MemberCard";
import { SearchBar } from "./SearchBar";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

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

function filterDepartments(departments: readonly LeadershipDepartment[], filter: LeadershipFilter, query: string) {
  return departments
    .map((department) => ({
      ...department,
      members: department.members.filter((member) => matchesMember(member, department.name, filter, query)),
    }))
    .filter((department) => department.members.length > 0);
}

function filterMembers(members: readonly LeadershipMember[], filter: LeadershipFilter, query: string, departmentName: string) {
  return members.filter((member) => matchesMember(member, departmentName, filter, query));
}

interface LeadershipPageProps {
  data: LeadershipPageData;
}

export function LeadershipPage({ data }: LeadershipPageProps) {
  const prefersReducedMotion = useReducedMotion();
  const heroRef = useRef<HTMLDivElement>(null);
  const drrRef = useRef<HTMLDivElement>(null);
  const executiveRef = useRef<HTMLDivElement>(null);
  const teamsRef = useRef<HTMLDivElement>(null);
  const zonesRef = useRef<HTMLDivElement>(null);
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<LeadershipFilter>("name");
  const [openDepartments, setOpenDepartments] = useState<string[]>([data.departments[0]?.name ?? ""]);
  const [openZones, setOpenZones] = useState<string[]>([data.zones[0]?.name ?? ""]);

  const normalizedQuery = query.trim().toLowerCase();

  const filteredExecutive = useMemo(
    () => filterMembers(data.executiveCommittee.members, filter, normalizedQuery, data.executiveCommittee.name),
    [filter, normalizedQuery],
  );

  const filteredDepartments = useMemo(
    () => filterDepartments(data.departments, filter, normalizedQuery),
    [filter, normalizedQuery],
  );

  const filteredZones = useMemo(
    () => filterDepartments(data.zones, filter, normalizedQuery),
    [filter, normalizedQuery],
  );

  const resultCount = filteredExecutive.length + filteredDepartments.reduce((count, department) => count + department.members.length, 0) + filteredZones.reduce((count, zone) => count + zone.members.length, 0);

  useEffect(() => {
    if (normalizedQuery) {
      setOpenDepartments(filteredDepartments.map((department) => department.name));
      setOpenZones(filteredZones.map((zone) => zone.name));
      return;
    }

    setOpenDepartments([filteredDepartments[0]?.name ?? data.departments[0]?.name ?? ""]);
    setOpenZones([filteredZones[0]?.name ?? data.zones[0]?.name ?? ""]);
  }, [data.departments, data.zones, filteredDepartments, filteredZones, normalizedQuery]);

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    const context = gsap.context(() => {
      const heroItems = heroRef.current?.querySelectorAll<HTMLElement>("[data-leadership-hero-reveal]") ?? [];
      const drrItems = drrRef.current?.querySelectorAll<HTMLElement>("[data-leadership-section]") ?? [];

      gsap.fromTo(
        heroItems,
        { autoAlpha: 0, y: 40 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.9,
          stagger: 0.08,
          ease: "power3.out",
        },
      );

      if (drrItems.length > 0) {
        gsap.fromTo(
          drrItems,
          { autoAlpha: 0, y: 40 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: drrRef.current,
              start: "top 80%",
              once: true,
            },
          },
        );
      }

      const sections = [executiveRef.current, teamsRef.current, zonesRef.current].filter(
        (element): element is HTMLDivElement => element !== null,
      );

      sections.forEach((section) => {
        const cards = section.querySelectorAll<HTMLElement>("[data-leadership-card]");

        gsap.fromTo(
          cards,
          { autoAlpha: 0, y: 40 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.75,
            stagger: 0.08,
            ease: "power2.out",
            scrollTrigger: {
              trigger: section,
              start: "top 78%",
              once: true,
            },
          },
        );
      });
    });

    return () => context.revert();
  }, [prefersReducedMotion]);

  const scrollToSection = (id: string) => {
    const target = document.getElementById(id);

    if (!target) {
      return;
    }

    target.scrollIntoView({ behavior: prefersReducedMotion ? "auto" : "smooth", block: "start" });
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-[var(--background)] text-[var(--foreground)]">
      <Cursor />
      <SiteNavbar />
      <GridBackground className="pointer-events-none fixed inset-0 z-0 opacity-40" cellSize={44} lineOpacity={0.04} lineColor="17, 17, 17" />
      <NoiseOverlay className="pointer-events-none fixed inset-0 z-0" opacity={0.03} />

      <div className="relative z-[1]">
        <div ref={heroRef}>
          <LeadershipHero />
        </div>

        <div ref={drrRef}>
          <DRRCard member={data.drr} />
        </div>

        <section id="search" className="relative bg-[var(--background)] px-6 pb-4 pt-0 md:px-12 xl:px-20">
          <div className="mx-auto max-w-[1440px]">
            <SearchBar
              query={query}
              filter={filter}
              resultCount={resultCount}
              onQueryChange={setQuery}
              onFilterChange={setFilter}
            />
          </div>
        </section>

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
                  <MemberCard key={member.slug} member={member} />
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
            id="district-committee-members"
            eyebrow="District Committee Members"
            title="District Committee Members"
            groups={filteredDepartments}
            openGroups={openDepartments}
            onToggle={(name) => {
              setOpenDepartments((current) =>
                current.includes(name)
                  ? current.filter((item) => item !== name)
                  : [...current, name],
              );
            }}
          />
        </div>

        <div ref={zonesRef}>
          <AccordionGroupSection
            id="zones"
            eyebrow="Zones"
            title="Zone Representatives"
            groups={filteredZones}
            openGroups={openZones}
            onToggle={(name) => {
              setOpenZones((current) =>
                current.includes(name)
                  ? current.filter((item) => item !== name)
                  : [...current, name],
              );
            }}
          />
        </div>

        <ContactPreview />
        <Footer />
      </div>
    </main>
  );
}
