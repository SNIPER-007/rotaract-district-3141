"use client";

import type { RefObject } from "react";
import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { SPRINGS } from "@/constants/animation";
import { Container } from "@/components/common/container";

interface NavbarProps {
  mouseX: number;
  mouseY: number;
  isScrolled: boolean;
  compact?: boolean;
}

const NAV_ITEMS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Leadership", href: "/leadership" },
  { label: "Events", href: "/events" },
  { label: "Crowdfunding", href: "/crowdfunding" },
] as const;

function useLogoProximity(mouseX: number, mouseY: number, logoRef: RefObject<HTMLAnchorElement | null>) {
  const [isNear, setIsNear] = useState(false);

  useEffect(() => {
    const updateProximity = () => {
      const logoElement = logoRef.current;

      if (!logoElement) {
        return;
      }

      const bounds = logoElement.getBoundingClientRect();
      const centerX = bounds.left + bounds.width / 2;
      const centerY = bounds.top + bounds.height / 2;
      const distance = Math.hypot(mouseX - centerX, mouseY - centerY);

      setIsNear(distance < 100);
    };

    const frame = window.requestAnimationFrame(updateProximity);

    return () => window.cancelAnimationFrame(frame);
  }, [logoRef, mouseX, mouseY]);

  return isNear;
}

export function Navbar({ mouseX, mouseY, isScrolled, compact = false }: NavbarProps) {
  const logoRef = useRef<HTMLAnchorElement>(null);
  const pathname = usePathname();
  const isNearLogo = useLogoProximity(mouseX, mouseY, logoRef);

  const shellStyle = useMemo(
    () => ({
      backgroundColor: isScrolled
        ? "color-mix(in srgb, var(--background) 88%, white 12%)"
        : "transparent",
      backdropFilter: isScrolled ? "blur(18px) saturate(1.2)" : "blur(0px)",
      WebkitBackdropFilter: isScrolled ? "blur(18px) saturate(1.2)" : "blur(0px)",
      boxShadow: isScrolled ? "var(--shadow-xs)" : "none",
      borderBottomColor: isScrolled ? "var(--border)" : "transparent",
    }),
    [isScrolled],
  );

  return (
    <motion.header
      className="sticky top-0 z-[var(--z-sticky)] border-b border-transparent"
      style={shellStyle}
      initial={false}
      animate={{ y: 0 }}
      transition={SPRINGS.soft}
    >
      <Container className={`flex items-center gap-3 ${compact ? "h-16" : "h-20"}`}>
        <motion.a
          ref={logoRef}
          href="/"
          aria-label="Rotaract District 3141 home"
          className={`inline-flex items-center justify-center border border-[var(--border)] bg-[var(--foreground)] text-[var(--background)] shadow-[var(--shadow-xs)] outline-none transition-[background-color,color,border-radius,box-shadow] ${compact ? "h-9 w-16" : "h-11 w-20"}`}
          data-cursor-logo="true"
          data-cursor-logo-proximity={isNearLogo ? "true" : undefined}
          style={{
            borderRadius: isNearLogo ? "1.35rem" : "0.8rem",
          }}
          animate={{
            backgroundColor: isNearLogo ? "var(--background)" : "var(--foreground)",
            color: isNearLogo ? "var(--foreground)" : "var(--background)",
            rotate: isNearLogo ? 2 : 0,
            scale: isNearLogo ? 1.05 : 1,
          }}
          transition={SPRINGS.snappy}
        >
          <span className={`font-semibold tracking-[0.32em] ${compact ? "text-[0.62rem]" : "text-[0.7rem]"}`}>RD</span>
        </motion.a>

        <nav className="flex flex-1 justify-center overflow-x-auto">
          <ul className={`flex items-center whitespace-nowrap px-2 font-medium text-[var(--foreground)]/78 ${compact ? "gap-1.5 text-[0.75rem] md:gap-3 lg:gap-4" : "gap-2 text-[0.82rem] md:gap-4 lg:gap-6"}`}>
            {NAV_ITEMS.map((item) => (
              <li key={item.label}>
                {(() => {
                  const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));

                  return (
                    <motion.a
                      href={item.href}
                      aria-current={isActive ? "page" : undefined}
                      className={`relative inline-flex items-center rounded-full transition-colors hover:text-[var(--foreground)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--selection)] ${compact ? "px-2.5 py-1.5" : "px-3 py-2"} ${isActive ? "bg-[color-mix(in_srgb,var(--accent)_8%,white)] text-[var(--foreground)] shadow-[0_10px_22px_rgba(0,87,255,0.08)]" : ""}`}
                      data-cursor-button="true"
                      whileHover={{ y: -1 }}
                      transition={SPRINGS.soft}
                    >
                      {item.label}
                    </motion.a>
                  );
                })()}
              </li>
            ))}
          </ul>
        </nav>

        <div className={`${compact ? "hidden w-12 md:block" : "hidden w-20 md:block"}`} aria-hidden="true" />
      </Container>
    </motion.header>
  );
}

export default Navbar;
