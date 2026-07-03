import type { ComponentPropsWithoutRef, CSSProperties } from "react";

interface NoiseOverlayProps extends ComponentPropsWithoutRef<"div"> {
  opacity?: number;
  lineColor?: string;
}

export function NoiseOverlay({
  className = "",
  opacity = 0.035,
  lineColor = "17, 17, 17",
  style,
  ...props
}: NoiseOverlayProps) {
  const classes = ["pointer-events-none", className].filter(Boolean).join(" ");
  const mergedStyle: CSSProperties = {
    opacity,
    backgroundImage: [
      `linear-gradient(135deg, rgba(${lineColor}, 0.03) 25%, transparent 25%)`,
      `linear-gradient(225deg, rgba(${lineColor}, 0.02) 25%, transparent 25%)`,
      `linear-gradient(45deg, rgba(${lineColor}, 0.02) 25%, transparent 25%)`,
      `linear-gradient(315deg, rgba(${lineColor}, 0.03) 25%, transparent 25%)`,
    ].join(", "),
    backgroundPosition: "0 0, 4px 4px, 4px 4px, 0 0",
    backgroundSize: "8px 8px",
    ...style,
  };

  return <div aria-hidden="true" className={classes} style={mergedStyle} {...props} />;
}
