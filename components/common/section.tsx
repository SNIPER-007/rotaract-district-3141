import type { ReactNode } from "react";

interface SectionProps {
  children: ReactNode;
  className?: string;
  id?: string;
}

export function Section({ children, className = "", id }: SectionProps) {
  const classes = className.trim();

  return (
    <section id={id} className={classes || undefined}>
      {children}
    </section>
  );
}
