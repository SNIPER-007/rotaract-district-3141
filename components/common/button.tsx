"use client";

import type { ButtonHTMLAttributes } from "react";

type ButtonVariant = "primary" | "secondary" | "ghost";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
};

const variantClasses: Record<ButtonVariant, string> = {
  primary: "bg-[var(--foreground)] text-[var(--background)]",
  secondary: "bg-transparent text-[var(--foreground)] border border-current",
  ghost: "bg-transparent text-[var(--foreground)]",
};

export function Button({
  children,
  className = "",
  disabled,
  variant = "primary",
  type = "button",
  ...props
}: ButtonProps) {
  const classes = [
    "inline-flex items-center justify-center rounded-[var(--radius)] px-[var(--space-4)] py-[var(--space-2)] transition-[background-color,color,border-color,opacity] duration-[var(--transition)]",
    variantClasses[variant],
    disabled ? "cursor-not-allowed opacity-50" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button type={type} className={classes} disabled={disabled} {...props}>
      {children}
    </button>
  );
}
