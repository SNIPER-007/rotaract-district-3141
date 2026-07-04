"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/common/button";
import { Container } from "@/components/common/container";
import { CONTACT_PREVIEW_CONTENT } from "@/data/contact-preview";
import { SPRINGS } from "@/constants/animation";

function useLogoProximity(mouseX: number, mouseY: number, targetRef: React.RefObject<HTMLAnchorElement | null>) {
  const [isNear, setIsNear] = useState(false);

  useEffect(() => {
    const updateProximity = () => {
      const target = targetRef.current;

      if (!target) {
        return;
      }

      const bounds = target.getBoundingClientRect();
      const centerX = bounds.left + bounds.width / 2;
      const centerY = bounds.top + bounds.height / 2;
      const distance = Math.hypot(mouseX - centerX, mouseY - centerY);

      setIsNear(distance < 100);
    };

    const frame = window.requestAnimationFrame(updateProximity);

    return () => window.cancelAnimationFrame(frame);
  }, [mouseX, mouseY, targetRef]);

  return isNear;
}

export function ContactPreview() {
  const targetRef = useRef<HTMLAnchorElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const isNear = useLogoProximity(mousePosition.x, mousePosition.y, targetRef);

  useEffect(() => {
    const handlePointerMove = (event: PointerEvent) => {
      setMousePosition({ x: event.clientX, y: event.clientY });
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });

    return () => window.removeEventListener("pointermove", handlePointerMove);
  }, []);

  return (
    <section
      id="contact"
      className="relative -mt-[56px] overflow-hidden rounded-t-[56px] bg-[#09111F] py-[clamp(4.5rem,8vw,7.5rem)] text-white"
    >
      <div className="absolute inset-0 opacity-[0.06]">
        <svg viewBox="0 0 1440 520" className="h-full w-full">
          <path d="M20 340C180 230 338 184 492 198C674 214 748 306 918 318C1088 330 1216 274 1430 128" fill="none" stroke="rgba(255,255,255,0.9)" strokeWidth="1.25" />
          <path d="M0 420C190 328 340 292 512 302C678 312 832 396 1010 394C1158 392 1286 338 1438 220" fill="none" stroke="rgba(255,255,255,0.75)" strokeWidth="1.25" />
        </svg>
      </div>
      <Container className="max-w-[1440px] px-6 md:px-12 xl:px-20">
        <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-20">
          <div className="space-y-5">
            <div className="relative w-fit pl-2">
              <p className="font-script text-[20px] font-medium tracking-[0.01em] text-[var(--accent)] rotate-[-2deg]">
                {CONTACT_PREVIEW_CONTENT.eyebrow}
              </p>
              <svg aria-hidden="true" viewBox="0 0 180 18" className="mt-1 h-3 w-[8.5rem] text-[var(--accent)]">
                <path d="M2 11C18 7 35 12 52 9C69 6 88 9 105 8C123 7 142 10 178 7" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" opacity="0.75" />
              </svg>
            </div>
            <h2 className="max-w-[54rem] font-heading text-[clamp(2.7rem,6vw,5.6rem)] font-extrabold uppercase leading-[0.94] tracking-[-0.06em] text-white text-balance">
              {CONTACT_PREVIEW_CONTENT.heading}
            </h2>
            <p className="max-w-[500px] text-[clamp(0.98rem,1.25vw,1.06rem)] leading-[1.8] text-white/70">
              {CONTACT_PREVIEW_CONTENT.description}
            </p>
          </div>

          <div className="flex flex-col items-start gap-6 lg:items-end lg:text-right">
            <motion.a
              ref={targetRef}
              href="#footer"
              className="inline-flex min-h-[120px] items-center justify-center rounded-full border border-white/8 bg-white px-11 py-5 text-[clamp(1rem,1.6vw,1.45rem)] font-extrabold tracking-[0.22em] text-[#09111F] shadow-[0_18px_34px_rgba(0,0,0,0.12)] outline-none"
              animate={{
                backgroundColor: isNear ? "#09111F" : "#FFFFFF",
                color: isNear ? "#FFFFFF" : "#09111F",
                borderRadius: isNear ? "1.35rem" : "9999px",
                scale: isNear ? 1.05 : 1,
                rotate: isNear ? 2 : 0,
              }}
              transition={SPRINGS.snappy}
            >
              CONTACT US
            </motion.a>

          </div>
        </div>
      </Container>
    </section>
  );
}
