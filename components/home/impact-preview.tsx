import { Container } from "@/components/common/container";
import { Section } from "@/components/common/section";
import { HOMEPAGE_IMPACT } from "@/data/homepage";

export function ImpactPreview() {
  return (
    <Section
      id="impact"
      className="relative -mt-[56px] overflow-hidden rounded-t-[56px] bg-[#09111F] py-[clamp(4.5rem,8vw,7.5rem)] text-white"
    >
      <div className="absolute inset-0 opacity-[0.06]">
        <svg viewBox="0 0 1440 800" className="h-full w-full">
          <path d="M-40 690C180 520 310 420 515 410C740 398 830 550 1050 548C1186 547 1322 496 1500 348" fill="none" stroke="rgba(255,255,255,0.8)" strokeWidth="1.25" />
          <path d="M-20 540C210 380 420 310 640 332C846 352 940 498 1174 490C1290 486 1388 460 1490 400" fill="none" stroke="rgba(255,255,255,0.75)" strokeWidth="1.25" />
          <circle cx="1040" cy="320" r="2.8" fill="rgba(255,255,255,0.8)" />
          <circle cx="1108" cy="374" r="2.8" fill="rgba(255,255,255,0.8)" />
          <circle cx="1180" cy="442" r="2.8" fill="rgba(255,255,255,0.8)" />
          <circle cx="520" cy="310" r="2.8" fill="rgba(255,255,255,0.8)" />
          <circle cx="638" cy="366" r="2.8" fill="rgba(255,255,255,0.8)" />
        </svg>
      </div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(110,168,255,0.12),transparent_28%),radial-gradient(circle_at_bottom_right,rgba(255,255,255,0.08),transparent_34%)]" />
      <Container className="relative">
        <div className="max-w-[68rem] space-y-6">
          <div className="relative w-fit pl-2">
            <p className="font-script text-[20px] font-medium tracking-[0.01em] text-[var(--accent)] rotate-[-2deg]">
              {HOMEPAGE_IMPACT.eyebrow}
            </p>
            <svg aria-hidden="true" viewBox="0 0 180 18" className="mt-1 h-3 w-[8.5rem] text-[var(--accent)]">
              <path d="M2 11C18 7 35 12 52 9C69 6 88 9 105 8C123 7 142 10 178 7" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" opacity="0.75" />
            </svg>
          </div>
          <h2 className="max-w-[58rem] font-heading text-[clamp(2.7rem,6vw,5.9rem)] font-extrabold uppercase leading-[0.94] tracking-[-0.06em] text-balance text-white">
            {HOMEPAGE_IMPACT.heading}
          </h2>
          <p className="max-w-[31rem] text-[clamp(0.98rem,1.25vw,1.06rem)] leading-[1.8] text-white/70">
            {HOMEPAGE_IMPACT.description}
          </p>
        </div>

        <div className="mt-12 grid gap-4 md:grid-cols-3 xl:grid-cols-6">
          {HOMEPAGE_IMPACT.stats.map((stat) => (
            <div
              key={stat.label}
              className="min-h-[10rem] rounded-[28px] border border-white/8 bg-white/3 p-5 backdrop-blur-[18px] shadow-[0_18px_44px_rgba(0,0,0,0.08)]"
            >
              <p className="text-[0.64rem] font-semibold uppercase tracking-[0.26em] text-white/50">
                {stat.label}
              </p>
              <p className="mt-6 text-[clamp(1.8rem,3.4vw,3rem)] font-semibold leading-none tracking-[-0.05em] text-white">
                {stat.value}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
