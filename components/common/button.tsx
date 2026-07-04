"use client";

import type { ButtonHTMLAttributes } from "react";
import type { ButtonVariant } from "@/types/design-system";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
};

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-[var(--foreground)] text-[var(--background)] shadow-[0_14px_32px_rgba(17,17,17,0.14)] hover:shadow-[0_18px_40px_rgba(17,17,17,0.18)]",
  secondary:
    "bg-transparent text-[var(--foreground)] border border-[color-mix(in_srgb,var(--foreground)_18%,transparent)]",
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
    "inline-flex items-center justify-center rounded-[var(--radius)] px-[calc(var(--space-4)+0.25rem)] py-[calc(var(--space-2)+0.125rem)] transition-[background-color,color,border-color,opacity,box-shadow,transform] duration-[220ms] ease-[cubic-bezier(0.16,1,0.3,1)]",
    variantClasses[variant],
    disabled ? "cursor-not-allowed opacity-50" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button
      type={type}
      className={classes}
      disabled={disabled}
      data-cursor-button="true"
      {...props}
    >
      {children}
    </button>
  );
}
