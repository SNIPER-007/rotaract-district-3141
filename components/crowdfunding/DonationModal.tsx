"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/common/button";
import { Modal } from "./Modal";
import type { Project } from "@/data/projects";
import { BANK_TRANSFER_DETAILS, type DonationPaymentRail, type DonationType, type LiveDonationDraft } from "@/data/crowdfunding";
import type { FormEvent, ReactNode } from "react";

interface DonationModalProps {
  project: Project | null;
  open: boolean;
  onClose: () => void;
  onSubmit?: (draft: LiveDonationDraft) => void;
}

const AMOUNTS = [500, 1000, 2500, 5000] as const;
const DONATION_TYPES: readonly { value: DonationType; label: string; description: string }[] = [
  { value: "individual", label: "Individual", description: "Scanner payment with personal donation details." },
  { value: "company", label: "Company", description: "UPI or net banking with company information." },
];

const PAYMENT_RAILS: readonly { value: DonationPaymentRail; label: string; description: string }[] = [
  { value: "upi", label: "UPI", description: "Use the UPI option for quick settlement." },
  { value: "net-banking", label: "Net Banking", description: "Use the bank details for transfer." },
];

function ToggleButton({ active, label, description, onClick }: { active: boolean; label: string; description: string; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-[22px] border px-4 py-3 text-left transition-all duration-300 ${
        active
          ? "border-[rgba(0,87,255,0.18)] bg-[color-mix(in_srgb,var(--surface)_86%,white)] shadow-[0_14px_28px_rgba(0,0,0,0.06)]"
          : "border-[rgba(0,0,0,0.08)] bg-white hover:border-[rgba(0,87,255,0.18)]"
      }`}
    >
      <div className="flex items-center justify-between gap-3">
        <span className="text-[0.82rem] font-semibold uppercase tracking-[0.2em] text-[var(--foreground)]">{label}</span>
        <span className={`h-2.5 w-2.5 rounded-full ${active ? "bg-[var(--foreground)]" : "bg-[rgba(0,0,0,0.18)]"}`} />
      </div>
      <p className="mt-2 text-[0.8rem] leading-[1.6] text-[var(--foreground)]/60">{description}</p>
    </button>
  );
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="space-y-2">
      <span className="text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-[var(--foreground)]/48">{label}</span>
      {children}
    </div>
  );
}

export function DonationModal({ project, open, onClose, onSubmit }: DonationModalProps) {
  const [donationType, setDonationType] = useState<DonationType>("individual");
  const [paymentRail, setPaymentRail] = useState<DonationPaymentRail>("upi");
  const [selectedAmount, setSelectedAmount] = useState<number>(1000);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [anonymous, setAnonymous] = useState(false);
  const [companyName, setCompanyName] = useState("");
  const [gstin, setGstin] = useState("");
  const [wants80g, setWants80g] = useState(false);

  useEffect(() => {
    if (!open) {
      return;
    }

    setDonationType("individual");
    setPaymentRail("upi");
    setSelectedAmount(1000);
    setName("");
    setEmail("");
    setPhone("");
    setAnonymous(false);
    setCompanyName("");
    setGstin("");
    setWants80g(false);
  }, [open, project?.title]);

  const displayAmount = useMemo(() => {
    return selectedAmount.toString();
  }, [selectedAmount]);

  if (!project) {
    return null;
  }

  const isIndividual = donationType === "individual";

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit?.(donationDraft);
    onClose();
  };

  const donationDraft: LiveDonationDraft = {
    donorType: donationType,
    paymentRail: isIndividual ? "scanner" : paymentRail,
    donorName: isIndividual ? name || "Anonymous Donor" : companyName || name || "Company Donor",
    email,
    phone,
    amount: selectedAmount,
    anonymous,
    projectTitle: project.title,
    companyName: isIndividual ? undefined : companyName,
    gstin: isIndividual ? undefined : gstin,
    wants80g: isIndividual ? undefined : wants80g,
  };

  return (
    <Modal open={open} onClose={onClose} title={project.title}>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid gap-3 sm:grid-cols-2">
          {DONATION_TYPES.map((option) => (
            <ToggleButton
              key={option.value}
              active={donationType === option.value}
              label={option.label}
              description={option.description}
              onClick={() => setDonationType(option.value)}
            />
          ))}
        </div>

        <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
          <div className="space-y-4 rounded-[28px] border border-[rgba(0,0,0,0.06)] bg-white p-5 shadow-[0_14px_34px_rgba(0,0,0,0.05)]">
            {isIndividual ? (
              <>
                <div className="relative mx-auto aspect-square w-full max-w-[280px] overflow-hidden rounded-[24px] border border-[rgba(0,0,0,0.05)] bg-[color-mix(in_srgb,var(--surface)_92%,white)] p-4 shadow-[0_16px_34px_rgba(0,0,0,0.06)]">
                  <motion.img
                    src={project.qrImage}
                    alt={`${project.title} scanner`}
                    className="h-full w-full object-contain"
                    animate={{ y: [0, -6, 0] }}
                    transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
                  />
                </div>

                <div className="space-y-3 rounded-[22px] border border-[rgba(0,0,0,0.05)] bg-[color-mix(in_srgb,var(--surface)_94%,white)] p-4">
                  <p className="text-[0.72rem] font-semibold uppercase tracking-[0.26em] text-[var(--foreground)]/48">Scanner</p>
                  <p className="break-all text-[0.96rem] font-medium text-[var(--foreground)]">{project.upi}</p>
                  <p className="text-[0.84rem] leading-[1.7] text-[var(--foreground)]/68">Scan the QR code, keep the amount ready, and complete the contribution in one step.</p>
                </div>
              </>
            ) : (
              <>
                <div className="grid gap-3 sm:grid-cols-2">
                  {PAYMENT_RAILS.map((option) => (
                    <ToggleButton
                      key={option.value}
                      active={paymentRail === option.value}
                      label={option.label}
                      description={option.description}
                      onClick={() => setPaymentRail(option.value)}
                    />
                  ))}
                </div>

                {paymentRail === "upi" ? (
                  <>
                    <div className="relative mx-auto aspect-square w-full max-w-[280px] overflow-hidden rounded-[24px] border border-[rgba(0,0,0,0.05)] bg-[color-mix(in_srgb,var(--surface)_92%,white)] p-4 shadow-[0_16px_34px_rgba(0,0,0,0.06)]">
                      <motion.img
                        src={project.qrImage}
                        alt={`${project.title} UPI code`}
                        className="h-full w-full object-contain"
                        animate={{ y: [0, -6, 0] }}
                        transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
                      />
                    </div>

                    <div className="space-y-3 rounded-[22px] border border-[rgba(0,0,0,0.05)] bg-[color-mix(in_srgb,var(--surface)_94%,white)] p-4">
                      <p className="text-[0.72rem] font-semibold uppercase tracking-[0.26em] text-[var(--foreground)]/48">UPI ID</p>
                      <p className="break-all text-[0.96rem] font-medium text-[var(--foreground)]">{project.upi}</p>
                    </div>
                  </>
                ) : (
                  <div className="space-y-3 rounded-[22px] border border-[rgba(0,0,0,0.05)] bg-[color-mix(in_srgb,var(--surface)_94%,white)] p-4">
                    <p className="text-[0.72rem] font-semibold uppercase tracking-[0.26em] text-[var(--foreground)]/48">Bank details</p>
                    <div className="grid gap-3 text-[0.92rem] leading-[1.8] text-[var(--foreground)]/72">
                      <div>
                        <span className="font-semibold text-[var(--foreground)]">Account name: </span>
                        {BANK_TRANSFER_DETAILS.accountName}
                      </div>
                      <div>
                        <span className="font-semibold text-[var(--foreground)]">Bank: </span>
                        {BANK_TRANSFER_DETAILS.bankName}
                      </div>
                      <div>
                        <span className="font-semibold text-[var(--foreground)]">Account number: </span>
                        {BANK_TRANSFER_DETAILS.accountNumber}
                      </div>
                      <div>
                        <span className="font-semibold text-[var(--foreground)]">IFSC: </span>
                        {BANK_TRANSFER_DETAILS.ifsc}
                      </div>
                      <div>
                        <span className="font-semibold text-[var(--foreground)]">Branch: </span>
                        {BANK_TRANSFER_DETAILS.branch}
                      </div>
                    </div>
                  </div>
                )}
              </>
            )}

            <div className="space-y-3 rounded-[22px] border border-[rgba(0,0,0,0.05)] bg-[color-mix(in_srgb,var(--surface)_94%,white)] p-4">
              <p className="text-[0.72rem] font-semibold uppercase tracking-[0.26em] text-[var(--foreground)]/48">Receipt information</p>
              <p className="text-[0.92rem] leading-[1.8] text-[var(--foreground)]/68">
                Selected amount: ₹{displayAmount}. {isIndividual ? "Anonymous yes/no is captured with the donor record." : "Company donation details include GSTIN and 80G preference."}
              </p>
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
              </div>
            </div>

            {isIndividual ? (
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Name">
                  <input
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    placeholder="Full name"
                    className="h-12 w-full rounded-full border border-[rgba(0,0,0,0.08)] bg-white px-4 text-[0.95rem] outline-none focus:border-[rgba(0,87,255,0.24)]"
                  />
                </Field>
                <Field label="Email ID">
                  <input
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    placeholder="Email address"
                    className="h-12 w-full rounded-full border border-[rgba(0,0,0,0.08)] bg-white px-4 text-[0.95rem] outline-none focus:border-[rgba(0,87,255,0.24)]"
                  />
                </Field>
                <Field label="Phone number">
                  <input
                    value={phone}
                    onChange={(event) => setPhone(event.target.value)}
                    placeholder="Mobile number"
                    className="h-12 w-full rounded-full border border-[rgba(0,0,0,0.08)] bg-white px-4 text-[0.95rem] outline-none focus:border-[rgba(0,87,255,0.24)]"
                  />
                </Field>
                <Field label="Anonymous donation">
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setAnonymous(true)}
                      className={`h-12 rounded-full border px-4 text-[0.82rem] font-semibold uppercase tracking-[0.2em] transition-all duration-300 ${
                        anonymous
                          ? "border-[rgba(0,87,255,0.18)] bg-[var(--foreground)] text-[var(--background)]"
                          : "border-[rgba(0,0,0,0.08)] bg-white text-[var(--foreground)]/60"
                      }`}
                    >
                      Yes
                    </button>
                    <button
                      type="button"
                      onClick={() => setAnonymous(false)}
                      className={`h-12 rounded-full border px-4 text-[0.82rem] font-semibold uppercase tracking-[0.2em] transition-all duration-300 ${
                        !anonymous
                          ? "border-[rgba(0,87,255,0.18)] bg-[var(--foreground)] text-[var(--background)]"
                          : "border-[rgba(0,0,0,0.08)] bg-white text-[var(--foreground)]/60"
                      }`}
                    >
                      No
                    </button>
                  </div>
                </Field>
              </div>
            ) : (
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Company name">
                  <input
                    value={companyName}
                    onChange={(event) => setCompanyName(event.target.value)}
                    placeholder="Registered company name"
                    className="h-12 w-full rounded-full border border-[rgba(0,0,0,0.08)] bg-white px-4 text-[0.95rem] outline-none focus:border-[rgba(0,87,255,0.24)]"
                  />
                </Field>
                <Field label="Email ID">
                  <input
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    placeholder="Accounts email"
                    className="h-12 w-full rounded-full border border-[rgba(0,0,0,0.08)] bg-white px-4 text-[0.95rem] outline-none focus:border-[rgba(0,87,255,0.24)]"
                  />
                </Field>
                <Field label="Phone number">
                  <input
                    value={phone}
                    onChange={(event) => setPhone(event.target.value)}
                    placeholder="Contact number"
                    className="h-12 w-full rounded-full border border-[rgba(0,0,0,0.08)] bg-white px-4 text-[0.95rem] outline-none focus:border-[rgba(0,87,255,0.24)]"
                  />
                </Field>
                <Field label="GSTIN number">
                  <input
                    value={gstin}
                    onChange={(event) => setGstin(event.target.value)}
                    placeholder="GSTIN"
                    className="h-12 w-full rounded-full border border-[rgba(0,0,0,0.08)] bg-white px-4 text-[0.95rem] uppercase outline-none focus:border-[rgba(0,87,255,0.24)]"
                  />
                </Field>
                <Field label="80G required">
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setWants80g(true)}
                      className={`h-12 rounded-full border px-4 text-[0.82rem] font-semibold uppercase tracking-[0.2em] transition-all duration-300 ${
                        wants80g
                          ? "border-[rgba(0,87,255,0.18)] bg-[var(--foreground)] text-[var(--background)]"
                          : "border-[rgba(0,0,0,0.08)] bg-white text-[var(--foreground)]/60"
                      }`}
                    >
                      Yes
                    </button>
                    <button
                      type="button"
                      onClick={() => setWants80g(false)}
                      className={`h-12 rounded-full border px-4 text-[0.82rem] font-semibold uppercase tracking-[0.2em] transition-all duration-300 ${
                        !wants80g
                          ? "border-[rgba(0,87,255,0.18)] bg-[var(--foreground)] text-[var(--background)]"
                          : "border-[rgba(0,0,0,0.08)] bg-white text-[var(--foreground)]/60"
                      }`}
                    >
                      No
                    </button>
                  </div>
                </Field>
              </div>
            )}

            <div className="space-y-3 rounded-[28px] border border-[rgba(0,0,0,0.06)] bg-[color-mix(in_srgb,var(--surface)_94%,white)] p-5">
              <p className="text-[0.72rem] font-semibold uppercase tracking-[0.26em] text-[var(--foreground)]/48">Donation summary</p>
              <p className="text-[0.92rem] leading-[1.8] text-[var(--foreground)]/68">
                {donationType === "individual"
                  ? `Individual donation selected with scanner support and ${anonymous ? "anonymous" : "named"} contribution details.`
                  : `Company donation selected with ${paymentRail === "upi" ? "UPI" : "net banking"} transfer, GSTIN, and ${wants80g ? "80G requested" : "no 80G request"}.`}
              </p>
            </div>

            <Button variant="primary" type="submit" className="h-12 w-full rounded-full px-5 text-[0.86rem] font-medium">
              Donate Now
            </Button>
          </div>
        </div>
      </form>
    </Modal>
  );
}