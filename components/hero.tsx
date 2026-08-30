"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button-link";
import { InteractivePhone } from "@/components/demo-phone/interactive-phone";
import { useReducedMotion } from "@/lib/use-reduced-motion";
import { fadeUp, fadeUpStagger } from "@/lib/motion";
import { hero, appStoreUrl } from "@/data/content";

const HeroScene = dynamic(() => import("@/components/three/hero-scene"), {
  ssr: false,
  loading: () => null,
});

export function Hero() {
  const reduced = useReducedMotion();

  return (
    <section id="top" className="relative overflow-hidden pb-24 pt-40 sm:pt-48">
      <div className="pointer-events-none absolute inset-0 -z-10">
        {!reduced && <HeroScene />}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-bg/50 to-bg" />
      </div>

      <div className="mx-auto grid w-full max-w-6xl gap-16 px-6 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        <motion.div initial="hidden" animate="show" variants={fadeUpStagger(0.12)}>
          <motion.div variants={fadeUp}>
            <Badge>{hero.badge}</Badge>
          </motion.div>

          <motion.h1
            variants={fadeUp}
            className="mt-6 text-5xl font-semibold leading-[1.05] tracking-tight text-ink sm:text-6xl"
          >
            {hero.headline[0]}
            <br />
            <span className="font-display text-[1.05em] font-normal italic text-accent-deep">
              {hero.headline[1]}
            </span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="mt-6 max-w-md text-lg leading-relaxed text-ink-body"
          >
            {hero.sub}
          </motion.p>

          <motion.div variants={fadeUp} className="mt-9 flex flex-wrap items-center gap-5">
            <ButtonLink href={appStoreUrl} variant="primary">
              {hero.ctaPrimary}
            </ButtonLink>
            <ButtonLink href="#how-it-works" variant="ghost">
              {hero.ctaSecondary}
            </ButtonLink>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
        >
          <InteractivePhone />
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.8 }}
        className="mt-20 flex justify-center"
      >
        <div className="flex flex-col items-center gap-2 text-xs uppercase tracking-[0.2em] text-ink-muted">
          <span>Scroll to explore</span>
          <span className="h-8 w-px animate-pulse-soft bg-ink-muted/60" />
        </div>
      </motion.div>
    </section>
  );
}
