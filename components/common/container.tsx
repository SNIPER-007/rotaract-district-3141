import type { ComponentPropsWithoutRef } from "react";

export function Container({ className = "", ...props }: ComponentPropsWithoutRef<"div">) {
  const classes = [
    "mx-auto w-full max-w-[var(--container-width)] px-[var(--space-4)] sm:px-[var(--space-6)] lg:px-[var(--space-8)]",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return <div className={classes} {...props} />;
}
