"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Cursor } from "@/components/common/cursor";
import { GridBackground } from "@/components/common/grid-background";
import { NoiseOverlay } from "@/components/common/noise-overlay";
import { SiteNavbar } from "@/components/common/site-navbar";
import { Container } from "@/components/common/container";
import Footer from "@/components/footer";
import { Button } from "@/components/common/button";
import { DonationCard } from "./DonationCard";
import { DonationModal } from "./DonationModal";
import { LiveDonationsTable } from "./LiveDonationsTable";
import { SupportDistrict } from "./SupportDistrict";
import { PROJECTS, type Project } from "@/data/projects";
import { LIVE_DONATIONS, type LiveDonationDraft, type LiveDonationEntry } from "@/data/crowdfunding";

export function CrowdfundingPage() {
  const prefersReducedMotion = useReducedMotion();
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [liveDonations, setLiveDonations] = useState<readonly LiveDonationEntry[]>(() => [...LIVE_DONATIONS]);

  const handleDonationSubmit = (draft: LiveDonationDraft) => {
    setLiveDonations((currentDonations) => [
      {
        ...draft,
        id: crypto.randomUUID(),
        submittedAt: new Date().toISOString(),
      },
      ...currentDonations,
    ]);
  };

  const underTenThousandProjects = PROJECTS.filter((project) => project.donationBand === "under-10000");
  const overTenThousandProjects = PROJECTS.filter((project) => project.donationBand === "over-10000");

  return (
    <main className="relative min-h-screen overflow-hidden bg-[var(--background)] text-[var(--foreground)]">
      <Cursor />
      <SiteNavbar />
      <GridBackground className="pointer-events-none fixed inset-0 z-0 opacity-40" cellSize={44} lineOpacity={0.04} lineColor="17, 17, 17" />
      <NoiseOverlay className="pointer-events-none fixed inset-0 z-0" opacity={0.03} />

      <div className="relative z-[1]">
        <section className="relative overflow-hidden bg-[var(--background)] py-[clamp(4.5rem,8vw,7rem)] text-[var(--foreground)]">
          <Container className="max-w-[1440px] px-6 md:px-12 xl:px-20">
            <motion.div
              className="grid gap-12 lg:grid-cols-[1.02fr_0.98fr] lg:items-center lg:gap-[88px]"
              initial={prefersReducedMotion ? false : { opacity: 0, y: 36 }}
              whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.36 }}
              transition={{ duration: 0.8, ease: [0.215, 0.61, 0.355, 1] }}
            >
              <div className="space-y-6">
                <div className="relative w-fit pl-1">
                  <p className="font-script text-[22px] font-medium tracking-[0.01em] text-[var(--accent)] rotate-[-3deg]">
                    Support District
                  </p>
                  <svg aria-hidden="true" viewBox="0 0 180 18" className="mt-1 h-3 w-[9rem] text-[var(--accent)]">
                    <path d="M2 11C18 7 35 12 52 9C69 6 88 9 105 8C123 7 142 10 178 7" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" opacity="0.75" />
                  </svg>
                </div>

                <h1 className="max-w-[12ch] font-mono text-[clamp(88px,9vw,150px)] font-black uppercase leading-none tracking-[0.26em] text-[var(--foreground)] text-balance">
                  SUPPORT
                  <br />
                  CHANGE
                </h1>

                <p className="max-w-[18ch] font-heading text-[clamp(2.4rem,4.8vw,4.5rem)] font-extrabold uppercase leading-[0.94] tracking-[-0.05em] text-[var(--foreground)] text-balance">
                  Every Contribution Creates A Lasting Impact.
                </p>

                <div className="flex flex-wrap gap-4 pt-2">
                  <Button variant="primary" className="h-[60px] rounded-full px-9 text-[0.92rem] font-medium">
                    <span className="inline-flex items-center gap-2">
                      Donate Now
                      <ArrowRight size={16} />
                    </span>
                  </Button>
                  <Button variant="secondary" className="h-[60px] rounded-full px-9 text-[0.92rem] font-medium">
                    <span className="inline-flex items-center gap-2">
                      Explore Projects
                      <ArrowRight size={16} />
                    </span>
                  </Button>
                </div>
              </div>

              <div className="rounded-[34px] border border-[rgba(0,0,0,0.06)] bg-[linear-gradient(180deg,#fbf6ec_0%,#fffdf8_100%)] p-6 shadow-[0_18px_44px_rgba(0,0,0,0.06)] md:p-8">
                <div className="space-y-4">
                  <p className="font-script text-[22px] font-medium tracking-[0.01em] text-[var(--accent)] rotate-[-3deg]">
                    Every Rupee Matters.
                  </p>
                  <svg aria-hidden="true" viewBox="0 0 180 18" className="h-3 w-[9rem] text-[var(--accent)]">
                    <path d="M2 11C18 7 35 12 52 9C69 6 88 9 105 8C123 7 142 10 178 7" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" opacity="0.75" />
                  </svg>
                </div>

                <div className="mt-6 grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
                  {[
                    ["Project-first", "Every donation maps to a visible district project."],
                    ["Transparent", "Track goals, milestones, and impact in one place."],
                    ["Fast support", "Donate in a few taps without breaking the flow."],
                  ].map(([title, description]) => (
                    <div key={title} className="rounded-[24px] border border-[rgba(0,0,0,0.05)] bg-white p-4 shadow-[0_14px_34px_rgba(0,0,0,0.05)]">
                      <p className="text-[0.74rem] font-semibold uppercase tracking-[0.22em] text-[var(--foreground)]/48">
                        {title}
                      </p>
                      <p className="mt-2 text-[0.92rem] leading-[1.7] text-[var(--foreground)]/68">
                        {description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </Container>
        </section>

        <section className="relative bg-[var(--background)] py-[clamp(4rem,8vw,6.5rem)] text-[var(--foreground)]">
          <Container className="max-w-[1440px] px-6 md:px-12 xl:px-20">
            <div className="mb-8 space-y-4">
              <div className="relative w-fit pl-2">
                <p className="font-script text-[20px] font-medium tracking-[0.01em] text-[var(--accent)] rotate-[-2deg]">
                  Rotaract Clubs
                </p>
                <svg aria-hidden="true" viewBox="0 0 180 18" className="mt-1 h-3 w-[8.5rem] text-[var(--accent)]">
                  <path d="M2 11C18 7 35 12 52 9C69 6 88 9 105 8C123 7 142 10 178 7" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" opacity="0.75" />
                </svg>
              </div>
              <h2 className="max-w-[20ch] font-heading text-[clamp(2.8rem,6vw,5rem)] font-extrabold uppercase leading-[0.94] tracking-[-0.05em] text-[var(--foreground)] text-balance">
                Donations Under ₹10,000
              </h2>
              <p className="max-w-[700px] text-[0.98rem] leading-[1.8] text-[var(--foreground)]/70">
                Use this section for smaller club-level drives where any amount below ₹10,000 helps build momentum quickly.
              </p>
            </div>

            {/*<div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {underTenThousandProjects.map((project) => (
                <DonationCard key={project.title} project={project} onDonate={setSelectedProject} />
              ))}
            </div>*/}
          </Container>
        </section>

        <section className="relative bg-[var(--background)] py-[clamp(4rem,8vw,6.5rem)] text-[var(--foreground)]">
          <Container className="max-w-[1440px] px-6 md:px-12 xl:px-20">
            <div className="mb-8 space-y-4">
              <div className="relative w-fit pl-2">
                <p className="font-script text-[20px] font-medium tracking-[0.01em] text-[var(--accent)] rotate-[-2deg]">
                  Rotaract District
                </p>
                <svg aria-hidden="true" viewBox="0 0 180 18" className="mt-1 h-3 w-[8.5rem] text-[var(--accent)]">
                  <path d="M2 11C18 7 35 12 52 9C69 6 88 9 105 8C123 7 142 10 178 7" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" opacity="0.75" />
                </svg>
              </div>
              <h2 className="max-w-[22ch] font-heading text-[clamp(2.8rem,6vw,5rem)] font-extrabold uppercase leading-[0.94] tracking-[-0.05em] text-[var(--foreground)] text-balance">
                Donations ₹10,000 And Above
              </h2>
              <p className="max-w-[700px] text-[0.98rem] leading-[1.8] text-[var(--foreground)]/70">
                Use this section for larger district-scale campaigns where a minimum donation of ₹10,000 helps reach major fundraising goals faster.
              </p>
            </div>

            {/*<div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {overTenThousandProjects.map((project) => (
                <DonationCard key={project.title} project={project} onDonate={setSelectedProject} />
              ))}
            </div>*/}
          </Container>
        </section>

        <SupportDistrict />
        <LiveDonationsTable donations={liveDonations} />
        <Footer />
      </div>

      <DonationModal
        open={Boolean(selectedProject)}
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onSubmit={handleDonationSubmit}
      />
    </main>
  );
}