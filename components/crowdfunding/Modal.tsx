"use client";

import { useEffect } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { X } from "lucide-react";
import { Button } from "@/components/common/button";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export function Modal({ open, onClose, title, children }: ModalProps) {
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (!open) {
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-[700] flex items-center justify-center px-4 py-8"
          initial={prefersReducedMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <button aria-label="Close modal overlay" type="button" className="absolute inset-0 bg-black/55 backdrop-blur-md" onClick={onClose} />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={title}
            className="relative z-[1] w-full max-w-[min(100vw-1rem,72rem)] max-h-[calc(100dvh-1rem)] overflow-y-auto overflow-x-hidden rounded-[32px] border border-[rgba(0,0,0,0.08)] bg-[var(--background)] p-4 shadow-[0_30px_90px_rgba(0,0,0,0.24)] md:p-8"
            initial={prefersReducedMotion ? false : { scale: 0.96, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.96, opacity: 0 }}
            transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="mb-5 flex items-start justify-between gap-4 max-sm:mb-4 max-sm:gap-3">
              <div>
                <p className="font-script text-[20px] font-medium tracking-[0.01em] text-[var(--accent)] rotate-[-2deg] max-sm:text-[18px]">Donate</p>
                <h3 className="mt-1 font-heading text-[clamp(2rem,4vw,3rem)] font-extrabold uppercase leading-[0.95] tracking-[-0.05em] text-[var(--foreground)] max-sm:text-[clamp(1.6rem,7vw,2.1rem)]">
                  {title}
                </h3>
              </div>
              <Button variant="secondary" onClick={onClose} className="h-11 rounded-full px-4 text-[0.8rem] font-medium max-sm:h-10 max-sm:px-3 max-sm:text-[0.74rem]">
                <span className="inline-flex items-center gap-2">
                  <X size={14} />
                  Close
                </span>
              </Button>
            </div>

            {children}
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}