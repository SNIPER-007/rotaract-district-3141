"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "@/components/common/button";
import { Container } from "@/components/common/container";
import { WorldMap } from "@/components/home/WorldMap";
import { WHO_WE_ARE_PREVIEW } from "@/data/homepage";

export function WhoWeArePreview() {
  const router = useRouter();

  return (
    <section
      id="about"
      className="relative -mt-[56px] overflow-hidden rounded-t-[56px] bg-[var(--background)] py-[clamp(4.5rem,8vw,7.5rem)] text-[var(--foreground)]"
    >
      <Container className="max-w-[1440px] px-6 md:px-12 xl:px-20">
        <div className="grid gap-16 lg:grid-cols-[0.94fr_1.06fr] lg:items-center lg:gap-24">
          <div className="space-y-10">
            <div className="relative w-fit pl-1">
              <p className="font-script text-[22px] font-medium tracking-[0.01em] text-[var(--accent)] rotate-[-3deg]">
                About Us
              </p>
              <svg aria-hidden="true" viewBox="0 0 180 18" className="mt-1 h-3 w-[9rem] text-[var(--accent)]">
                <path
                  d="M2 11C18 7 35 12 52 9C69 6 88 9 105 8C123 7 142 10 178 7"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  opacity="0.75"
                />
              </svg>
            </div>

            <div className="space-y-7">
              <h2 className="max-w-[42rem] font-heading text-[clamp(2.05rem,4.1vw,3.8rem)] font-extrabold uppercase leading-[0.96] tracking-[-0.06em] text-[var(--foreground)] text-balance">
                {WHO_WE_ARE_PREVIEW.heading}
              </h2>
              <p className="max-w-[520px] text-[clamp(0.98rem,1.1vw,1.03rem)] leading-[1.85] text-[var(--foreground)]/70">
                {WHO_WE_ARE_PREVIEW.description}
              </p>
            </div>

            <div className="flex flex-wrap gap-5 pt-4">
              <Button
                variant="primary"
                onClick={() => router.push("/about")}
                className="h-[60px] rounded-full px-11 text-[0.92rem] font-medium hover:-translate-y-0.5"
              >
                Read More
              </Button>
              <Button
                variant="secondary"
                onClick={() => router.push("/about#leadership")}
                className="h-[60px] rounded-full border-[rgba(0,0,0,0.08)] px-11 text-[0.92rem] font-medium"
              >
                Meet Leadership
              </Button>
            </div>

            <motion.div
              className="rounded-[32px] border border-[rgba(0,0,0,0.05)] bg-white p-4 shadow-[0_14px_36px_rgba(0,0,0,0.06)]"
              initial={false}
              whileHover={{ y: -2 }}
            >
              <div className="grid gap-5 rounded-[28px] bg-[linear-gradient(180deg,#FFFFFF_0%,#FCFCFC_100%)] p-4 sm:grid-cols-[128px_1fr] sm:items-center sm:p-5">
                <div className="flex aspect-[1/1] w-full max-w-[128px] items-center justify-center overflow-hidden rounded-[20px] bg-[linear-gradient(180deg,rgba(0,87,255,0.08),rgba(0,87,255,0.02))] shadow-[0_8px_20px_rgba(0,0,0,0.05)]">
                  <span className="max-w-[7rem] text-center text-[0.68rem] font-semibold uppercase tracking-[0.3em] text-[var(--foreground)]/44">
                    Portrait Placeholder
                  </span>
                </div>

                <div className="space-y-2.5">
                  <div className="flex items-start justify-between gap-3">
                    <p className="text-[0.92rem] font-semibold tracking-[0.12em] text-[var(--foreground)]">
                      PHF. RTR. Shree Hari Nair
                    </p>
                    <span className="text-[0.64rem] font-semibold uppercase tracking-[0.28em] text-[var(--foreground)]/42">
                      DRR
                    </span>
                  </div>
                  <p className="text-[0.68rem] font-medium uppercase tracking-[0.26em] text-[var(--foreground)]/56">
                    District Rotaract Representative
                  </p>
                  <p className="text-[0.68rem] font-medium uppercase tracking-[0.26em] text-[var(--foreground)]/56">
                    2026–27
                  </p>
                  <p className="max-w-[20rem] pt-1 text-[0.86rem] leading-[1.8] text-[var(--foreground)]/66">
                    Short welcome preview introducing the district in one warm, official line.
                  </p>
                  <Button
                    variant="secondary"
                    onClick={() => router.push("/about")}
                    className="mt-1 h-11 rounded-full border-[rgba(0,0,0,0.08)] px-5 text-[0.8rem] font-medium"
                  >
                    Read Full Message
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>

          <div className="flex items-center justify-center lg:justify-end">
            <WorldMap className="w-full max-w-[560px]" />
          </div>
        </div>
      </Container>
    </section>
  );
}
