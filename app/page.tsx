import { LandingExperience } from "@/components/landing/landing-experience";
import { ImpactPreview } from "@/components/home/impact-preview";
import { FolderStack } from "@/components/home/FolderStack";
import { WhoWeArePreview } from "@/components/home/who-we-are-preview";
import { VisionSection } from "@/components/vision/vision-section";
import { ContactPreview } from "@/components/contact/contact-preview";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <>
      <LandingExperience />
      <ImpactPreview />
      <WhoWeArePreview />
      <VisionSection />
      <section id="featured-events" className="relative -mt-[56px] overflow-hidden rounded-t-[56px] bg-[var(--background)] py-[clamp(4.5rem,8vw,7.5rem)] text-[var(--foreground)]">
        <div className="mx-auto w-full max-w-[1440px] px-6 md:px-12 xl:px-20">
          <div className="mb-8 space-y-4">
            <div className="relative w-fit pl-2">
              <p className="font-script text-[20px] font-medium tracking-[0.01em] text-[var(--accent)] rotate-[-2deg]">
              FEATURED EVENTS
              </p>
              <svg aria-hidden="true" viewBox="0 0 180 18" className="mt-1 h-3 w-[8.5rem] text-[var(--accent)]">
                <path d="M2 11C18 7 35 12 52 9C69 6 88 9 105 8C123 7 142 10 178 7" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" opacity="0.75" />
              </svg>
            </div>
            <p className="max-w-[500px] text-[0.98rem] leading-[1.8] text-[var(--foreground)]/70">
              A glimpse into the experiences that define Rotaract District 3141.
            </p>
          </div>
          <FolderStack />
        </div>
      </section>
      <ContactPreview />
      <Footer />
    </>
  );
}
