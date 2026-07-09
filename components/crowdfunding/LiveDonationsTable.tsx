"use client";

import { useEffect, useMemo, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";
import type { LiveDonationEntry } from "@/data/crowdfunding";

interface LiveDonationsTableProps {
  donations: readonly LiveDonationEntry[];
}

const PAGE_SIZE = 10;

function formatRupees(value: number) {
  return new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 }).format(value);
}

function formatTime(value: string) {
  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(value));
}

function formatRail(value: LiveDonationEntry["paymentRail"]) {
  if (value === "net-banking") {
    return "Net Banking";
  }

  if (value === "upi") {
    return "UPI";
  }

  return "Scanner";
}

export function LiveDonationsTable({ donations }: LiveDonationsTableProps) {
  const prefersReducedMotion = useReducedMotion();
  const [page, setPage] = useState(0);

  const sortedDonations = useMemo(
    () => [...donations].sort((left, right) => new Date(right.submittedAt).getTime() - new Date(left.submittedAt).getTime()),
    [donations],
  );

  const totalPages = Math.max(1, Math.ceil(sortedDonations.length / PAGE_SIZE));
  const safePage = Math.min(page, totalPages - 1);
  const visibleDonations = sortedDonations.slice(safePage * PAGE_SIZE, safePage * PAGE_SIZE + PAGE_SIZE);
  const startIndex = sortedDonations.length === 0 ? 0 : safePage * PAGE_SIZE + 1;
  const endIndex = Math.min(sortedDonations.length, safePage * PAGE_SIZE + visibleDonations.length);

  useEffect(() => {
    setPage(0);
  }, [sortedDonations.length]);

  return (
    <section className="relative bg-[var(--background)] pt-[clamp(1.5rem,4vw,2.75rem)] text-[var(--foreground)]">
      <div className="mx-auto max-w-[1440px] px-6 md:px-12 xl:px-20">
        <motion.div
          className="rounded-[34px] border border-[rgba(0,0,0,0.06)] bg-[linear-gradient(180deg,#fbf6ec_0%,#fffdf8_100%)] p-5 shadow-[0_18px_44px_rgba(0,0,0,0.06)] md:p-7"
          initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
          whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.7, ease: [0.215, 0.61, 0.355, 1] }}
        >
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div className="space-y-2">
              <p className="font-script text-[20px] font-medium tracking-[0.01em] text-[var(--accent)] rotate-[-2deg]">
                Live Donations
              </p>
              <h2 className="font-heading text-[clamp(2rem,4.4vw,3.6rem)] font-extrabold uppercase leading-[0.94] tracking-[-0.05em] text-[var(--foreground)] text-balance">
                Latest 10 donors
              </h2>
            </div>

            <div className="rounded-full border border-[rgba(0,0,0,0.06)] bg-white px-4 py-2 text-[0.76rem] font-semibold uppercase tracking-[0.2em] text-[var(--foreground)]/60">
              Showing {startIndex}-{endIndex} of {sortedDonations.length}
            </div>
          </div>

          <div className="mt-5 flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={() => setPage((currentPage) => Math.max(0, currentPage - 1))}
              disabled={safePage === 0}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[rgba(0,0,0,0.08)] bg-white text-[var(--foreground)] transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-40"
              aria-label="Show previous 10 donors"
            >
              <ChevronUp size={16} />
            </button>

            <p className="text-center text-[0.82rem] leading-[1.6] text-[var(--foreground)]/60">
              Sorted by the latest donation activity, not by amount.
            </p>

            <button
              type="button"
              onClick={() => setPage((currentPage) => Math.min(totalPages - 1, currentPage + 1))}
              disabled={safePage >= totalPages - 1}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[rgba(0,0,0,0.08)] bg-white text-[var(--foreground)] transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-40"
              aria-label="Show next 10 donors"
            >
              <ChevronDown size={16} />
            </button>
          </div>

          <div className="mt-5 overflow-hidden rounded-[26px] border border-[rgba(0,0,0,0.05)] bg-white shadow-[0_14px_34px_rgba(0,0,0,0.05)]">
            <div className="overflow-x-auto">
              <table className="min-w-[900px] w-full border-collapse text-left">
                <thead className="bg-[color-mix(in_srgb,var(--surface)_90%,white)] text-[0.7rem] uppercase tracking-[0.26em] text-[var(--foreground)]/48">
                  <tr>
                    <th className="px-4 py-4 font-semibold">Donor</th>
                    <th className="px-4 py-4 font-semibold">Type</th>
                    <th className="px-4 py-4 font-semibold">Mode</th>
                    <th className="px-4 py-4 font-semibold">Project</th>
                    <th className="px-4 py-4 font-semibold">Amount</th>
                    <th className="px-4 py-4 font-semibold">Time</th>
                  </tr>
                </thead>
                <tbody>
                  {visibleDonations.map((donation, index) => (
                    <tr key={donation.id} className={index < visibleDonations.length - 1 ? "border-b border-[rgba(0,0,0,0.05)]" : undefined}>
                      <td className="px-4 py-4 align-top">
                        <div className="font-medium text-[var(--foreground)]">
                          {donation.anonymous ? "Anonymous Donor" : donation.donorName}
                        </div>
                        <div className="mt-1 text-[0.8rem] text-[var(--foreground)]/58">
                          {donation.donorType === "company" ? donation.companyName ?? "Company donation" : donation.email}
                        </div>
                      </td>
                      <td className="px-4 py-4 align-top text-[0.88rem] text-[var(--foreground)]/72">
                        {donation.donorType === "company" ? "Company" : "Individual"}
                      </td>
                      <td className="px-4 py-4 align-top text-[0.88rem] text-[var(--foreground)]/72">
                        {formatRail(donation.paymentRail)}
                      </td>
                      <td className="px-4 py-4 align-top text-[0.88rem] text-[var(--foreground)]/72">
                        {donation.projectTitle}
                      </td>
                      <td className="px-4 py-4 align-top font-medium text-[var(--foreground)]">
                        ₹{formatRupees(donation.amount)}
                      </td>
                      <td className="px-4 py-4 align-top text-[0.88rem] text-[var(--foreground)]/72">
                        {formatTime(donation.submittedAt)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {visibleDonations.length === 0 ? (
              <div className="px-4 py-10 text-center text-[0.92rem] text-[var(--foreground)]/60">
                No donations recorded yet.
              </div>
            ) : null}
          </div>

          <div className="mt-5 flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={() => setPage((currentPage) => Math.max(0, currentPage - 1))}
              disabled={safePage === 0}
              className="inline-flex h-11 items-center gap-2 rounded-full border border-[rgba(0,0,0,0.08)] bg-white px-4 text-[0.78rem] font-semibold uppercase tracking-[0.18em] text-[var(--foreground)] transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <ChevronUp size={14} />
              Top
            </button>

            <div className="text-[0.82rem] text-[var(--foreground)]/58">
              Page {safePage + 1} of {totalPages}
            </div>

            <button
              type="button"
              onClick={() => setPage((currentPage) => Math.min(totalPages - 1, currentPage + 1))}
              disabled={safePage >= totalPages - 1}
              className="inline-flex h-11 items-center gap-2 rounded-full border border-[rgba(0,0,0,0.08)] bg-white px-4 text-[0.78rem] font-semibold uppercase tracking-[0.18em] text-[var(--foreground)] transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Bottom
              <ChevronDown size={14} />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}