"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

type Variant = "up" | "scale" | "blur";

const variantClass: Record<Variant, string> = {
  up: "reveal",
  scale: "reveal-scale",
  blur: "reveal-blur",
};

/**
 * Scroll-reveal wrapper. Toggles `.in` once visible (one-shot).
 * Uses IntersectionObserver; respects reduced-motion via CSS.
 */
export default function Reveal({
  children,
  className = "",
  variant = "up",
  delay = 0,
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string;
  variant?: Variant;
  delay?: number;
  as?: "div" | "section" | "li" | "span" | "article";
}) {
  const ref = useRef<HTMLElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setShown(true);
            io.disconnect();
          }
        }
      },
      { threshold: 0.14, rootMargin: "0px 0px -8% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const Comp = Tag as "div";
  return (
    <Comp
      ref={ref as React.Ref<HTMLDivElement>}
      className={`${variantClass[variant]} ${shown ? "in" : ""} ${className}`}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </Comp>
  );
}
