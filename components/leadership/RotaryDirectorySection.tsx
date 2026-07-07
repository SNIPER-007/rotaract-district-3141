"use client";

import { forwardRef, useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import type { RotaryMember } from "@/data/rotary";
import { RotaryCard } from "./RotaryCard";

interface RotaryDirectorySectionProps {
  members: readonly RotaryMember[];
}

type RotaryPositionGroup = {
  position: string;
  members: RotaryMember[];
};

function groupByPosition(members: readonly RotaryMember[]): RotaryPositionGroup[] {
  const groups = new Map<string, RotaryMember[]>();

  for (const member of members) {
    const current = groups.get(member.position) ?? [];
    current.push(member);
    groups.set(member.position, current);
  }

  return Array.from(groups.entries()).map(([position, groupedMembers]) => ({ position, members: groupedMembers }));
}

export const RotaryDirectorySection = forwardRef<HTMLElement, RotaryDirectorySectionProps>(function RotaryDirectorySection(
  { members },
  ref,
) {
  const prefersReducedMotion = useReducedMotion();
  const groups = useMemo(() => groupByPosition(members), [members]);
  const [openPosition, setOpenPosition] = useState(groups[0]?.position ?? "");

  useEffect(() => {
    if (!groups.length) {
      setOpenPosition("");
      return;
    }

    setOpenPosition((current) => (groups.some((group) => group.position === current) ? current : groups[0].position));
  }, [groups]);

  if (!groups.length) {
    return null;
  }

  return (
    <section ref={ref} id="rotary-section" className="relative overflow-hidden bg-[var(--background)] py-[clamp(5.5rem,9vw,8.75rem)] text-[var(--foreground)]">
      <div className="mx-auto flex w-full max-w-[1560px] flex-col gap-10 px-6 md:px-12 xl:px-24">
        <div className="space-y-5">
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
            A collapsible position-wise directory that follows the Excel hierarchy and keeps the page easy to scan.
          </p>
        </div>

        <div className="space-y-4">
          {groups.map((group) => {
            const isOpen = openPosition === group.position;

            return (
              <motion.section
                key={group.position}
                className="rounded-[30px] border border-[rgba(0,0,0,0.06)] bg-white shadow-[0_16px_40px_rgba(0,0,0,0.05)]"
                initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
                whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.22 }}
                transition={{ duration: 0.7, ease: [0.215, 0.61, 0.355, 1] }}
              >
                <button
                  type="button"
                  className="flex w-full items-center justify-between gap-4 rounded-[30px] px-5 py-5 text-left md:px-7"
                  onClick={() => setOpenPosition((current) => (current === group.position ? "" : group.position))}
                  aria-expanded={isOpen}
                >
                  <div className="space-y-2">
                    <p className="font-script text-[18px] font-medium text-[var(--accent)] rotate-[-2deg]">
                      Rotary Position
                    </p>
                    <h3 className="font-heading text-[clamp(1.45rem,2.2vw,2.3rem)] font-extrabold uppercase leading-[0.95] tracking-[-0.045em] text-[var(--foreground)] text-balance">
                      {group.position}
                    </h3>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="rounded-full border border-[rgba(0,0,0,0.08)] bg-[color-mix(in_srgb,var(--surface)_88%,white)] px-4 py-2 text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-[var(--foreground)]/58">
                      {group.members.length} member{group.members.length === 1 ? "" : "s"}
                    </span>
                    <span className={`inline-flex h-11 w-11 items-center justify-center rounded-full border border-[rgba(0,0,0,0.08)] bg-[color-mix(in_srgb,var(--surface)_94%,white)] text-[var(--foreground)]/76 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}>
                      <ChevronDown size={18} />
                    </span>
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen ? (
                    <motion.div
                      key={`${group.position}-content`}
                      initial={prefersReducedMotion ? false : { opacity: 0, y: -10 }}
                      animate={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
                      exit={prefersReducedMotion ? undefined : { opacity: 0, y: -10 }}
                      transition={{ duration: 0.28, ease: [0.215, 0.61, 0.355, 1] }}
                      className="overflow-hidden px-5 pb-5 md:px-7"
                    >
                      <div className="grid gap-6 lg:grid-cols-2">
                        {group.members.map((member) => (
                          <RotaryCard key={`${member.name}-${member.email}`} member={member} />
                        ))}
                      </div>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </motion.section>
            );
          })}
        </div>
      </div>
    </section>
  );
});