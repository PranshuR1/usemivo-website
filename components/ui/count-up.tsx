"use client";

import { useEffect, useRef } from "react";
import { animate, motion, useInView, useMotionValue, useTransform } from "framer-motion";
import { useReducedMotion } from "@/lib/use-reduced-motion";

// Counts from 0 up to `to` when scrolled into view. The server and no-JS render show the final value.
export function CountUp({
  to,
  format,
  duration = 1.6,
  className,
}: {
  to: number;
  format: (value: number) => string;
  duration?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px 0px" });
  const reduced = useReducedMotion();
  const value = useMotionValue(to);
  const text = useTransform(value, (latest) => format(Math.round(latest)));

  useEffect(() => {
    if (!reduced) value.set(0);
  }, [reduced, value]);

  useEffect(() => {
    if (!inView || reduced) return;
    const controls = animate(value, to, { duration, ease: [0.16, 1, 0.3, 1] });
    return () => controls.stop();
  }, [inView, reduced, to, duration, value]);

  return (
    <motion.span ref={ref} className={className}>
      {text}
    </motion.span>
  );
}
