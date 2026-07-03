import type { ComponentPropsWithoutRef, CSSProperties } from "react";

interface GridBackgroundProps extends ComponentPropsWithoutRef<"div"> {
  cellSize?: number;
  lineOpacity?: number;
  lineColor?: string;
}

export function GridBackground({
  className = "",
  cellSize = 40,
  lineOpacity = 0.06,
  lineColor = "17, 17, 17",
  style,
  ...props
}: GridBackgroundProps) {
  const classes = ["pointer-events-none", className].filter(Boolean).join(" ");
  const mergedStyle: CSSProperties = {
    backgroundImage: `linear-gradient(to right, rgba(${lineColor}, ${lineOpacity}) 1px, transparent 1px), linear-gradient(to bottom, rgba(${lineColor}, ${lineOpacity}) 1px, transparent 1px)`,
    backgroundSize: `${cellSize}px ${cellSize}px`,
    backgroundPosition: "center",
    maskImage:
      "linear-gradient(to bottom, rgba(0, 0, 0, 0.85), rgba(0, 0, 0, 0.45) 72%, transparent)",
    WebkitMaskImage:
      "linear-gradient(to bottom, rgba(0, 0, 0, 0.85), rgba(0, 0, 0, 0.45) 72%, transparent)",
    ...style,
  };

  return <div aria-hidden="true" className={classes} style={mergedStyle} {...props} />;
}
