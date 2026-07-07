import type { Metadata } from "next";
import { Cursor } from "@/components/common/cursor";
import { GridBackground } from "@/components/common/grid-background";
import { NoiseOverlay } from "@/components/common/noise-overlay";
import { SiteNavbar } from "@/components/common/site-navbar";
import { Container } from "@/components/common/container";
import { FolderExplorer } from "@/components/events/FolderExplorer";
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
            <div className="space-y-6">
              <p className="pb-2 font-script text-[22px] font-medium tracking-[0.01em] text-[var(--accent)] rotate-[-3deg]">
                Our
              </p>
              <h1 className="max-w-[18ch] font-mono text-[clamp(88px,9vw,150px)] font-black uppercase leading-none tracking-[0.26em] text-[var(--foreground)] text-balance">
                EVENTS
              </h1>
              <p className="max-w-[560px] text-[0.98rem] leading-[1.8] text-[var(--foreground)]/70">
                Creating memories together through district experiences, folder-style storytelling, and category-led navigation.
              </p>
            </div>
          </Container>
        </section>

        <section className="relative bg-[var(--background)] pb-[clamp(4.5rem,8vw,7rem)] text-[var(--foreground)]">
          <Container className="max-w-[1440px] px-6 md:px-12 xl:px-20">
            <FolderExplorer />
          </Container>
        </section>

        <Footer />
      </div>
    </main>
  );
}
