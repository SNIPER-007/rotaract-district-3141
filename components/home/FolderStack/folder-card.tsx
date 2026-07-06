"use client";

import type { CSSProperties } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Magnetic } from "@/components/common/magnetic";

export interface HomeFolderStackEvent {
  tabLabel: string;
  title: string;
  date: string;
  location: string;
  description: string;
  image: string;
  color: string;
  cta: string;
  active: boolean;
}

export function FolderCard({
  title,
  date,
  location,
  description,
  image,
  color,
  cta,
  active,
}: HomeFolderStackEvent) {
  const style = {
    ["--folder-color" as string]: color,
    backgroundImage:
      "linear-gradient(180deg, color-mix(in srgb, var(--folder-color) 6%, var(--surface) 94%) 0%, var(--surface) 18%, var(--surface) 100%)",
    borderColor: "color-mix(in srgb, var(--folder-color) 18%, var(--border) 82%)",
  } as CSSProperties;

  return (
    <motion.article
      aria-label={title}
      className="overflow-hidden rounded-[2rem] border border-[var(--border)] bg-[color-mix(in_srgb,var(--surface)_94%,transparent)] shadow-[var(--shadow-md)]"
      style={style}
      animate={{
        boxShadow: active ? "var(--shadow-lg)" : "var(--shadow-md)",
      }}
      transition={{ duration: 0.7, ease: [0.215, 0.61, 0.355, 1] }}
    >
      <div className="grid gap-0 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]">
        <div className="flex flex-col justify-between gap-8 p-6 sm:p-7 lg:p-8 xl:p-10">
          <div className="space-y-5">
            <div aria-hidden="true" className="h-1 w-20 rounded-full" style={{ backgroundColor: "var(--folder-color)" }} />

            <p data-folder-reveal="date" className="text-[0.72rem] font-semibold uppercase tracking-[0.34em] text-[var(--foreground)]/48">
              {date}
            </p>

            <h3 data-folder-reveal="title" className="max-w-xl font-heading text-[clamp(2.25rem,4.8vw,4.4rem)] font-bold uppercase leading-[0.94] tracking-[-0.06em] text-[var(--foreground)] text-balance">
              {title}
            </h3>

            <p data-folder-reveal="description" className="max-w-xl text-[clamp(1rem,1.1vw,1.1rem)] leading-[1.75] text-[var(--foreground)]/72">
              {description}
            </p>

            <p className="text-[0.8rem] font-semibold uppercase tracking-[0.22em] text-[var(--foreground)]/52">
              {location}
            </p>
          </div>

          <div className="space-y-5">
            <Magnetic strength={18} className="inline-flex w-fit">
              <button
                data-folder-reveal="cta"
                type="button"
                className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--foreground)] px-5 py-3 text-[0.82rem] font-medium text-[var(--background)] shadow-[var(--shadow-xs)] transition-transform duration-200 hover:-translate-y-0.5"
              >
                {cta}
              </button>
            </Magnetic>
          </div>
        </div>

        <div className="p-4 sm:p-5 lg:p-6">
          <motion.div
            data-folder-reveal="image"
            className="group relative h-full min-h-[18rem] overflow-hidden rounded-[1.5rem] border border-[rgba(17,17,17,0.06)] bg-[color-mix(in_srgb,var(--surface)_78%,transparent)] shadow-[var(--shadow-sm)]"
            animate={{
              opacity: active ? 1 : 0.94,
              scale: active ? 1.03 : 0.98,
            }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          >
            <div aria-hidden="true" className="absolute inset-0 transition-transform duration-500 ease-out group-hover:scale-[1.04]">
              <Image
                src={image}
                alt={title}
                fill
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="object-cover"
              />
            </div>

            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.08)_0%,rgba(17,17,17,0.02)_100%)]" />

            <div
              aria-hidden="true"
              className="absolute inset-0 border"
              style={{
                borderColor: "color-mix(in srgb, var(--folder-color) 16%, transparent)",
                boxShadow: "inset 0 0 0 1px color-mix(in srgb, var(--folder-color) 16%, transparent)",
              }}
            />

            <div className="absolute left-4 top-4 rounded-full border border-[rgba(255,255,255,0.5)] bg-[color-mix(in_srgb,var(--surface)_74%,transparent)] px-3 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.28em] text-[var(--foreground)]/72 shadow-[var(--shadow-xs)] backdrop-blur-md">
              Preview
            </div>
          </motion.div>
        </div>
      </div>
    </motion.article>
  );
}
