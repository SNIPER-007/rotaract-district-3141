"use client";

import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { useState } from "react";
import { animate, motion, useMotionValue, useSpring } from "framer-motion";
import { SPRINGS } from "@/constants/animation";

interface MagneticProps extends ComponentPropsWithoutRef<typeof motion.div> {
  children: ReactNode;
  strength?: number;
}

export function Magnetic({
  children,
  className = "",
  strength = 24,
  style,
  ...props
}: MagneticProps) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, SPRINGS.soft);
  const springY = useSpring(y, SPRINGS.soft);
  const [isActive, setIsActive] = useState(false);

  const classes = ["inline-flex will-change-transform", className]
    .filter(Boolean)
    .join(" ");

  const handleMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    const offsetX = (event.clientX - (bounds.left + bounds.width / 2)) / strength;
    const offsetY = (event.clientY - (bounds.top + bounds.height / 2)) / strength;

    x.set(offsetX);
    y.set(offsetY);
    setIsActive(true);
  };

  const handleLeave = () => {
    animate(x, 0, SPRINGS.soft);
    animate(y, 0, SPRINGS.soft);
    setIsActive(false);
  };

  return (
    <motion.div
      {...props}
      className={classes}
      style={{
        x: springX,
        y: springY,
        ...style,
      }}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      data-magnetic-active={isActive}
    >
      {children}
    </motion.div>
  );
}
