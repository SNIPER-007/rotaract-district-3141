import type { Metadata } from "next";
import { Cursor } from "@/components/common/cursor";
import { GridBackground } from "@/components/common/grid-background";
import { NoiseOverlay } from "@/components/common/noise-overlay";
import { SiteNavbar } from "@/components/common/site-navbar";
import { Container } from "@/components/common/container";
import { FolderStack } from "@/components/events";
import Footer from "@/components/footer";

export const metadata: Metadata = {
  title: "Events",
  description: "Events page for Rotaract District 3141.",
};

export default function EventsRoute() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[var(--background)] text-[var(--foreground)]">
      <Cursor />
      <SiteNavbar />
      <GridBackground className="pointer-events-none fixed inset-0 z-0 opacity-40" cellSize={44} lineOpacity={0.04} lineColor="17, 17, 17" />
      <NoiseOverlay className="pointer-events-none fixed inset-0 z-0" opacity={0.03} />

      <div className="relative z-[1]">
        <section className="relative overflow-hidden bg-[var(--background)] py-[clamp(4.5rem,8vw,7rem)] text-[var(--foreground)]">
          <Container className="max-w-[1440px] px-6 md:px-12 xl:px-20">
            <div className="space-y-4">
              <p className="font-script text-[22px] font-medium tracking-[0.01em] text-[var(--accent)] rotate-[-3deg]">
                Events
              </p>
              <h1 className="max-w-[18ch] font-heading text-[clamp(3rem,6.5vw,5.5rem)] font-extrabold uppercase leading-[0.94] tracking-[-0.05em] text-[var(--foreground)] text-balance">
                Featured Events
              </h1>
              <p className="max-w-[560px] text-[0.98rem] leading-[1.8] text-[var(--foreground)]/70">
                A dedicated screen for district experiences, program highlights, and event storytelling.
              </p>
            </div>
          </Container>
        </section>

        <section className="relative bg-[var(--background)] pb-[clamp(4.5rem,8vw,7rem)] text-[var(--foreground)]">
          <Container className="max-w-[1440px] px-6 md:px-12 xl:px-20">
            <FolderStack />
          </Container>
        </section>

        <Footer />
      </div>
    </main>
  );
}
