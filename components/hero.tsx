"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button-link";
import { InteractivePhone } from "@/components/demo-phone/interactive-phone";
import { fadeUp, fadeUpStagger } from "@/lib/motion";
import {
  hero,
  appStoreUrl,
  appStoreReviews,
  demoPatterns,
  homeSpotlight,
} from "@/data/content";

function FloatCard({
  className,
  delay,
  children,
}: {
  className: string;
  delay: number;
  children: React.ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay }}
      className={`absolute hidden w-60 text-left lg:block ${className}`}
    >
      <div
        className="animate-float-card rounded-2xl border border-ink/10 bg-surface/95 p-4 shadow-lift backdrop-blur"
        style={{ animationDelay: `${delay * 2}s` }}
      >
        {children}
      </div>
    </motion.div>
  );
}

export function Hero() {
  const estimate = homeSpotlight.estimate;
  const forgotten = homeSpotlight.forgotten;
  const pattern = demoPatterns.insights[0];

  return (
    <section id="top" className="relative overflow-hidden pt-32 sm:pt-40">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-x-0 top-0 h-[720px] bg-[radial-gradient(60%_60%_at_50%_0%,rgb(212_135_42/0.22),transparent_70%)]" />
        <div className="absolute left-1/2 top-[520px] h-[520px] w-[820px] -translate-x-1/2 rounded-full bg-accent/15 blur-[110px]" />
      </div>

      <div className="mx-auto flex w-full max-w-6xl flex-col items-center px-6 text-center sm:px-8">
        <motion.div
          initial="hidden"
          animate="show"
          variants={fadeUpStagger(0.1)}
          className="flex flex-col items-center"
        >
          <motion.div variants={fadeUp}>
            <Badge>{hero.badge}</Badge>
          </motion.div>

          <motion.h1
            variants={fadeUp}
            className="mt-7 max-w-4xl text-balance font-display text-[2.9rem] leading-[1.02] tracking-[-0.02em] text-ink sm:text-7xl lg:text-[5.5rem]"
          >
            {hero.headline[0]}
            <br />
            <span className="italic text-accent-deep">{hero.headline[1]}</span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="mt-7 max-w-xl text-balance text-lg leading-relaxed text-ink-body sm:text-xl"
          >
            {hero.sub}
          </motion.p>

          <motion.div variants={fadeUp} className="mt-9 flex flex-wrap items-center justify-center gap-3">
            <ButtonLink href={appStoreUrl} variant="primary">
              {hero.ctaPrimary}
            </ButtonLink>
            <ButtonLink href="#how-it-works" variant="secondary" showArrow={false}>
              {hero.ctaSecondary}
            </ButtonLink>
          </motion.div>

          <motion.div
            variants={fadeUp}
            className="mt-7 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm text-ink-muted"
          >
            <a
              href={appStoreReviews.url}
              target="_blank"
              rel="noreferrer noopener"
              className="flex items-center gap-2 hover:text-ink"
            >
              <span className="flex items-center gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    size={14}
                    className={i < Math.round(appStoreReviews.rating) ? "fill-accent text-accent" : "text-ink/20"}
                  />
                ))}
              </span>
              {appStoreReviews.rating} on the App Store
            </a>
            <span className="hidden h-1 w-1 rounded-full bg-ink/20 sm:block" />
            <span>Free to download</span>
            <span className="hidden h-1 w-1 rounded-full bg-ink/20 sm:block" />
            <span>iOS and macOS</span>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 48 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.35 }}
          className="relative mt-16 w-full max-w-[300px] pb-24"
        >
          <InteractivePhone />

          <FloatCard className="right-full top-24 mr-10" delay={0.9}>
            <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-accent-deep">
              {estimate.label}
            </p>
            <div className="mt-2 flex items-end gap-3 text-left">
              <div>
                <p className="text-[10px] text-ink-muted">You guessed</p>
                <p className="text-lg font-semibold text-ink-muted line-through decoration-ink-muted/40">
                  {estimate.guess}
                </p>
              </div>
              <div>
                <p className="text-[10px] text-ink-muted">It was</p>
                <p className="text-2xl font-semibold text-ink">{estimate.actual}</p>
              </div>
            </div>
            <p className="mt-2 text-left text-xs text-ink-body">{estimate.note}</p>
          </FloatCard>

          <FloatCard className="left-full top-14 ml-10" delay={1.1}>
            <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-accent-deep">
              What Mivo noticed
            </p>
            <p className="mt-2 text-left text-[15px] font-semibold text-ink">{pattern.label}</p>
            <p className="mt-1 text-left text-xs text-ink-body">{pattern.detail}</p>
          </FloatCard>

          <FloatCard className="left-full top-64 ml-6" delay={1.3}>
            <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-accent-deep">
              {forgotten.label}
            </p>
            <p className="mt-2 text-left text-3xl font-semibold text-ink">{forgotten.value}</p>
            <p className="mt-1 text-left text-xs text-ink-body">{forgotten.note}</p>
          </FloatCard>
        </motion.div>
      </div>
    </section>
  );
}
