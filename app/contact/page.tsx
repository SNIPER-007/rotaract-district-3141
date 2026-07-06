import type { Metadata } from "next";
import { Cursor } from "@/components/common/cursor";
import { GridBackground } from "@/components/common/grid-background";
import { NoiseOverlay } from "@/components/common/noise-overlay";
import { SiteNavbar } from "@/components/common/site-navbar";
import { ContactPreview } from "@/components/contact/contact-preview";
import Footer from "@/components/footer";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact page for Rotaract District 3141.",
};

export default function ContactRoute() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[var(--background)] text-[var(--foreground)]">
      <Cursor />
      <SiteNavbar />
      <GridBackground className="pointer-events-none fixed inset-0 z-0 opacity-40" cellSize={44} lineOpacity={0.04} lineColor="17, 17, 17" />
      <NoiseOverlay className="pointer-events-none fixed inset-0 z-0" opacity={0.03} />

      <div className="relative z-[1]">
        <ContactPreview />
        <Footer />
      </div>
    </main>
  );
}
