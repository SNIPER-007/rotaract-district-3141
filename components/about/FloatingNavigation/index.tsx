"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { RefObject } from "react";
import { MessageSquareMore, Route, Sparkles } from "lucide-react";

export interface FloatingNavigationItem {
  id: string;
  label: string;
  ref: RefObject<HTMLDivElement | null>;
}

interface FloatingNavigationProps {
  items: FloatingNavigationItem[];
  activeId: string;
  onNavigate: (id: string) => void;
}

const ICONS = [MessageSquareMore, Route, Sparkles] as const;

export function FloatingNavigation({ items, activeId, onNavigate }: FloatingNavigationProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.nav
      aria-label="About page navigation"
      className="fixed right-4 top-1/2 z-[110] hidden -translate-y-1/2 lg:block"
      initial={prefersReducedMotion ? false : { opacity: 0, x: -18 }}
      animate={prefersReducedMotion ? undefined : { opacity: 1, x: 0 }}
      transition={{ duration: 0.5, ease: [0.215, 0.61, 0.355, 1] }}
    >
      <div className="flex flex-col gap-2 rounded-[18px] border border-[rgba(0,0,0,0.05)] bg-white p-2 shadow-[0_16px_32px_rgba(0,0,0,0.08)]">
        {items.map((item, index) => {
          const Icon = ICONS[index] ?? MessageSquareMore;
          const isActive = activeId === item.id;

          return (
            <button
              key={item.id}
              type="button"
              data-cursor-button="true"
              onClick={() => onNavigate(item.id)}
              className={`flex w-[3.9rem] flex-col items-center gap-1 rounded-[14px] px-1.5 py-1.5 text-center transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                isActive
                  ? "bg-[color-mix(in_srgb,var(--accent)_10%,white)] text-[var(--foreground)] shadow-[0_8px_18px_rgba(0,87,255,0.12)]"
                  : "text-[var(--foreground)]/66 hover:bg-[color-mix(in_srgb,var(--surface)_90%,transparent)] hover:text-[var(--foreground)]"
              }`}
            >
              <span className={`inline-flex h-7 w-7 items-center justify-center rounded-full border ${isActive ? "border-[rgba(0,87,255,0.14)] bg-white text-[var(--accent)]" : "border-[rgba(0,0,0,0.06)] bg-[color-mix(in_srgb,var(--surface)_95%,transparent)] text-[var(--foreground)]/66"}`}>
                <Icon size={14} />
              </span>
              <span className="text-[0.58rem] font-semibold uppercase tracking-[0.18em] leading-none">
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </motion.nav>
  );
}
