"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, IndianRupee } from "lucide-react";
import { Button } from "@/components/common/button";
import { ProgressBar } from "./ProgressBar";
import type { Project } from "@/data/projects";

interface DonationCardProps {
  project: Project;
  onDonate: (project: Project) => void;
}

function formatRupees(value: number) {
  return new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 }).format(value);
}

export function DonationCard({ project, onDonate }: DonationCardProps) {
  const prefersReducedMotion = useReducedMotion();
  const percent = Math.round((project.raised / project.goal) * 100);
  const label = project.tags[0] ?? "Project";
  const sectionLabel = project.donationBand === "over-10000" ? "Rotaract District" : "Rotaract Clubs";

  return (
    <motion.article
      className="group overflow-hidden rounded-[30px] border border-[rgba(0,0,0,0.06)] bg-white shadow-[0_16px_40px_rgba(0,0,0,0.05)] transition-shadow duration-300 hover:shadow-[0_26px_60px_rgba(0,0,0,0.1)]"
      initial={prefersReducedMotion ? false : { opacity: 0, y: 36 }}
      whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.28 }}
      transition={{ duration: 0.7, ease: [0.215, 0.61, 0.355, 1] }}
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-[linear-gradient(180deg,rgba(0,87,255,0.08),rgba(0,87,255,0.02))]">
        <img
          src={project.image}
          alt={project.title}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.06]"
        />
      </div>

      <div className="space-y-5 p-5 md:p-6">
        <div className="space-y-2">
          <p className="text-[0.72rem] font-semibold uppercase tracking-[0.3em] text-[var(--foreground)]/48">
            {sectionLabel}
          </p>
          <p className="text-[0.72rem] font-semibold uppercase tracking-[0.3em] text-[var(--foreground)]/48">
            {label}
          </p>
          <h3 className="font-heading text-[clamp(1.5rem,2.6vw,2.2rem)] font-extrabold uppercase leading-[0.95] tracking-[-0.04em] text-[var(--foreground)] text-balance">
            {project.title}
          </h3>
          <p className="text-[0.94rem] leading-[1.7] text-[var(--foreground)]/68">
            {project.description}
          </p>
        </div>

        <div className="space-y-3 rounded-[24px] border border-[rgba(0,0,0,0.05)] bg-[color-mix(in_srgb,var(--surface)_94%,white)] p-4">
          <div className="flex items-end justify-between gap-3 text-[0.86rem] text-[var(--foreground)]/68">
            <span>Raised ₹{formatRupees(project.raised)}</span>
            <span>Goal ₹{formatRupees(project.goal)}</span>
          </div>
          <div className="flex items-center justify-between gap-3 text-[0.8rem] font-medium text-[var(--foreground)]/64">
            <span>Minimum donation</span>
            <span>₹{formatRupees(project.minimumDonation)}+</span>
          </div>
          <ProgressBar value={percent} />
          <div className="flex items-center justify-between gap-3 text-[0.82rem] font-medium text-[var(--foreground)]/70">
            <span>{percent}% funded</span>
            <span>Remaining ₹{formatRupees(project.goal - project.raised)}</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-3">
          <Button
            variant="primary"
            onClick={() => onDonate(project)}
            className="group h-11 rounded-full px-5 text-[0.8rem] font-medium"
          >
            <span className="inline-flex items-center gap-2">
              Donate
              <ArrowUpRight size={14} className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </span>
          </Button>
          <a
            href={project.registrationLink}
            className="inline-flex h-11 items-center rounded-full border border-[rgba(0,0,0,0.08)] bg-white px-5 text-[0.8rem] font-medium text-[var(--foreground)] transition-shadow hover:shadow-[0_12px_26px_rgba(17,17,17,0.08)]"
          >
            Explore Project
          </a>
        </div>

        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span key={tag} className="rounded-full border border-[rgba(0,0,0,0.08)] px-3 py-2 text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-[var(--foreground)]/56">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.article>
  );
}