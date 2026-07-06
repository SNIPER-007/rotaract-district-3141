"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/common/button";
import { Modal } from "./Modal";
import type { Project } from "@/data/projects";

interface DonationModalProps {
  project: Project | null;
  open: boolean;
  onClose: () => void;
}

const AMOUNTS = [500, 1000, 2500, 5000] as const;

export function DonationModal({ project, open, onClose }: DonationModalProps) {
  const [selectedAmount, setSelectedAmount] = useState<number | "custom">(1000);
  const [customAmount, setCustomAmount] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const displayAmount = useMemo(() => {
    if (selectedAmount === "custom") {
      return customAmount || "0";
    }

    return selectedAmount.toString();
  }, [customAmount, selectedAmount]);

  if (!project) {
    return null;
  }

  return (
    <Modal open={open} onClose={onClose} title={project.title}>
      <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
        <div className="space-y-4 rounded-[28px] border border-[rgba(0,0,0,0.06)] bg-white p-5 shadow-[0_14px_34px_rgba(0,0,0,0.05)]">
          <div className="relative mx-auto aspect-square w-full max-w-[280px] overflow-hidden rounded-[24px] border border-[rgba(0,0,0,0.05)] bg-[color-mix(in_srgb,var(--surface)_92%,white)] p-4 shadow-[0_16px_34px_rgba(0,0,0,0.06)]">
            <motion.img
              src={project.qrImage}
              alt={`${project.title} QR code`}
              className="h-full w-full object-contain"
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>

          <div className="space-y-3 rounded-[22px] border border-[rgba(0,0,0,0.05)] bg-[color-mix(in_srgb,var(--surface)_94%,white)] p-4">
            <p className="text-[0.72rem] font-semibold uppercase tracking-[0.26em] text-[var(--foreground)]/48">UPI ID</p>
            <p className="break-all text-[0.96rem] font-medium text-[var(--foreground)]">{project.upi}</p>
            <p className="text-[0.84rem] leading-[1.7] text-[var(--foreground)]/68">Receipt details will be shared after the transfer is completed.</p>
          </div>
        </div>

        <div className="space-y-5">
          <div className="space-y-3 rounded-[28px] border border-[rgba(0,0,0,0.06)] bg-white p-5 shadow-[0_14px_34px_rgba(0,0,0,0.05)]">
            <p className="text-[0.72rem] font-semibold uppercase tracking-[0.26em] text-[var(--foreground)]/48">Amount</p>
            <div className="flex flex-wrap gap-2">
              {AMOUNTS.map((amount) => {
                const isActive = selectedAmount === amount;

                return (
                  <button
                    key={amount}
                    type="button"
                    onClick={() => setSelectedAmount(amount)}
                    className={`rounded-full px-4 py-2 text-[0.76rem] font-semibold uppercase tracking-[0.2em] transition-all duration-300 ${
                      isActive
                        ? "bg-[var(--foreground)] text-[var(--background)] shadow-[0_12px_26px_rgba(17,17,17,0.14)]"
                        : "border border-[rgba(0,0,0,0.08)] bg-white text-[var(--foreground)]/62"
                    }`}
                  >
                    ₹{amount}
                  </button>
                );
              })}
              <button
                type="button"
                onClick={() => setSelectedAmount("custom")}
                className={`rounded-full px-4 py-2 text-[0.76rem] font-semibold uppercase tracking-[0.2em] transition-all duration-300 ${
                  selectedAmount === "custom"
                    ? "bg-[var(--foreground)] text-[var(--background)] shadow-[0_12px_26px_rgba(17,17,17,0.14)]"
                    : "border border-[rgba(0,0,0,0.08)] bg-white text-[var(--foreground)]/62"
                }`}
              >
                Custom Amount
              </button>
            </div>

            {selectedAmount === "custom" ? (
              <input
                value={customAmount}
                onChange={(event) => setCustomAmount(event.target.value)}
                placeholder="Enter amount"
                className="h-12 w-full rounded-full border border-[rgba(0,0,0,0.08)] bg-white px-4 text-[0.95rem] outline-none focus:border-[rgba(0,87,255,0.24)]"
              />
            ) : null}
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <input
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="Name"
              className="h-12 rounded-full border border-[rgba(0,0,0,0.08)] bg-white px-4 text-[0.95rem] outline-none focus:border-[rgba(0,87,255,0.24)]"
            />
            <input
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="Email"
              className="h-12 rounded-full border border-[rgba(0,0,0,0.08)] bg-white px-4 text-[0.95rem] outline-none focus:border-[rgba(0,87,255,0.24)]"
            />
          </div>

          <textarea
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            placeholder="Message"
            rows={5}
            className="w-full rounded-[24px] border border-[rgba(0,0,0,0.08)] bg-white px-4 py-3 text-[0.95rem] outline-none focus:border-[rgba(0,87,255,0.24)]"
          />

          <div className="space-y-3 rounded-[28px] border border-[rgba(0,0,0,0.06)] bg-[color-mix(in_srgb,var(--surface)_94%,white)] p-5">
            <p className="text-[0.72rem] font-semibold uppercase tracking-[0.26em] text-[var(--foreground)]/48">Receipt information</p>
            <p className="text-[0.92rem] leading-[1.8] text-[var(--foreground)]/68">
              We will acknowledge your contribution with a receipt note. Selected amount: ₹{displayAmount}.
            </p>
          </div>

          <Button variant="primary" className="h-12 w-full rounded-full px-5 text-[0.86rem] font-medium">
            Donate
          </Button>
        </div>
      </div>
    </Modal>
  );
}