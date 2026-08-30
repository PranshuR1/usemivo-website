"use client";

import { useRef, type PointerEvent } from "react";
import { useMotionValue, useSpring, useTransform } from "framer-motion";

export function useTilt(maxDeg = 8) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);

  const springConfig = { stiffness: 150, damping: 20, mass: 0.5 };
  const sx = useSpring(x, springConfig);
  const sy = useSpring(y, springConfig);

  const rotateX = useTransform(sy, [0, 1], [maxDeg, -maxDeg]);
  const rotateY = useTransform(sx, [0, 1], [-maxDeg, maxDeg]);

  function onPointerMove(event: PointerEvent<HTMLDivElement>) {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    x.set((event.clientX - rect.left) / rect.width);
    y.set((event.clientY - rect.top) / rect.height);
  }

  function onPointerLeave() {
    x.set(0.5);
    y.set(0.5);
  }

  return { ref, rotateX, rotateY, onPointerMove, onPointerLeave };
}
