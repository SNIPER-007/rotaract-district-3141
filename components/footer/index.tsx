"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Settings2 } from "lucide-react";
import { Container } from "@/components/common/container";
import { subscribeToAuthStateChanged } from "@/lib/firebase/auth";
import { isAuthorizedAdminIdentity } from "@/lib/firebase/admin";

const QUICK_LINKS = [
  { label: "Home", href: "/#home" },
  { label: "About", href: "/#about" },
  { label: "Leadership", href: "/leadership" },
  { label: "Events", href: "/events" },
  { label: "Crowdfunding", href: "/crowdfunding" },
] as const;
const SOCIAL_LINKS = ["Instagram", "Facebook", "LinkedIn"] as const;

export default function Footer() {
  const router = useRouter();
  const [adminPath, setAdminPath] = useState("/admin/login");

  useEffect(() => {
    return subscribeToAuthStateChanged((user) => {
      if (!user) {
        setAdminPath("/admin/login");
        return;
      }

      void (async () => {
        const authorized = await isAuthorizedAdminIdentity({ email: user.email, uid: user.uid });
        setAdminPath(authorized ? "/admin/dashboard" : "/admin/login");
      })();
    });
  }, []);

  const handleAdminClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    router.push(adminPath);
  };

  return (
    <footer id="footer" className="relative -mt-[56px] overflow-hidden rounded-t-[56px] bg-[var(--background)] py-[clamp(3.5rem,7vw,5.5rem)] text-[var(--foreground)] max-sm:-mt-10 max-sm:rounded-t-[32px] max-sm:py-12">
      <Container className="max-w-[1440px] px-6 md:px-12 xl:px-20">
        <div className="grid gap-10 border-t border-[var(--border)] pt-8 max-sm:gap-8 lg:grid-cols-[1fr_auto_auto] lg:items-start">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-3 rounded-full border border-[var(--border)] bg-[color-mix(in_srgb,var(--surface)_84%,transparent)] px-4 py-3 shadow-[var(--shadow-xs)] max-sm:px-3 max-sm:py-2.5">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--foreground)] text-[var(--background)] text-[0.68rem] font-semibold tracking-[0.24em] max-sm:h-8 max-sm:w-8 max-sm:text-[0.6rem]">
                RD
              </span>
              <span className="text-[0.82rem] font-semibold uppercase tracking-[0.24em] max-sm:text-[0.72rem] max-sm:tracking-[0.18em]">
                District 3141
              </span>
            </div>
            <p className="max-w-md text-[0.96rem] leading-[1.7] text-[var(--foreground)]/68 max-sm:text-[0.88rem] max-sm:leading-[1.6]">
              Rotaract District 3141 is the official digital home for leadership, fellowship, service, and district-level storytelling.
            </p>
          </div>

          <div className="space-y-4">
            <p className="font-script text-[20px] font-medium text-[var(--district-cranberry)] rotate-[-2deg] max-sm:text-[18px]">
              Navigation
            </p>
            <ul className="space-y-3 text-[0.96rem] text-[var(--foreground)]/74 max-sm:space-y-2 max-sm:text-[0.88rem]">
              {QUICK_LINKS.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="transition-colors hover:text-[var(--foreground)]">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <p className="font-script text-[20px] font-medium text-[var(--district-cranberry)] rotate-[2deg] max-sm:text-[18px]">
              Social
            </p>
            <div className="flex items-center gap-3 max-sm:gap-2">
              {SOCIAL_LINKS.map((link) => (
                <a key={link} href="#" aria-label={link} className="flex h-11 w-11 items-center justify-center rounded-full border border-[var(--border)] bg-[color-mix(in_srgb,var(--surface)_82%,transparent)] text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-[var(--foreground)]/72 transition-transform hover:-translate-y-0.5 max-sm:h-9 max-sm:w-9 max-sm:text-[0.64rem]">
                  {link.slice(0, 2)}
                </a>
              ))}
            </div>
            <p className="pt-2 text-[0.82rem] text-[var(--foreground)]/54 max-sm:text-[0.74rem]">
              © 2026 Rotaract District 3141. All rights reserved.
            </p>
          </div>
        </div>

    <div className="mt-8 flex justify-end border-t border-[var(--border)] pt-4">
      <Link
        href={adminPath}
        onClick={handleAdminClick}
        className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[color-mix(in_srgb,var(--surface)_82%,transparent)] px-3 py-2 text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-[var(--foreground)]/70 transition-colors hover:text-[var(--foreground)]"
        aria-label="Admin"
      >
        <Settings2 size={14} strokeWidth={2} />
        <span>Admin</span>
      </Link>
    </div>
      </Container>
    </footer>
  );
}

