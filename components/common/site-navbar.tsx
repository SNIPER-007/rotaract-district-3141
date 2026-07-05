"use client";

import { useEffect, useState } from "react";
import { Navbar } from "@/components/navbar";
import { useMousePosition } from "@/hooks/useMousePosition";

interface SiteNavbarProps {
  compact?: boolean;
}

export function SiteNavbar({ compact = false }: SiteNavbarProps) {
  const { mouseX, mouseY } = useMousePosition();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const nextIsScrolled = window.scrollY > 16;
      setIsScrolled((current) => (current === nextIsScrolled ? current : nextIsScrolled));
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return <Navbar mouseX={mouseX} mouseY={mouseY} isScrolled={isScrolled} compact={compact} />;
}
