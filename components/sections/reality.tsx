"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/container";
import { SectionHeader } from "@/components/ui/section-header";
import { CountUp } from "@/components/ui/count-up";
import { fadeUp, viewportOnce } from "@/lib/motion";
import { reality, homeSpotlight } from "@/data/content";

const formatMinutes = (total: number) => `${Math.floor(total / 60)}h ${total % 60}m`;

// Minutes behind the estimate card in the data file ("1h 30m" guessed, "4h 22m" actual).
const GUESS_MINUTES = 90;
const ACTUAL_MINUTES = 262;

export function Reality() {
  const { estimate } = homeSpotlight;

  return (
    <section className="relative overflow-hidden bg-espresso py-24 sm:py-32">
      <div className="pointer-events-none absolute -right-40 top-0 h-[520px] w-[520px] rounded-full bg-accent/15 blur-[130px]" />
      <Container>
        <div className="grid items-center gap-14 lg:grid-cols-[1fr_1.05fr] lg:gap-20">
          <motion.div initial="hidden" whileInView="show" viewport={viewportOnce} variants={fadeUp}>
            <SectionHeader
              onDark
              align="left"
              eyebrow={reality.eyebrow}
              heading={reality.heading}
              sub={reality.sub}
            />
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            variants={fadeUp}
            className="rounded-[2rem] border border-cream/10 bg-espresso-raised p-7 shadow-[0_40px_80px_-30px_rgb(0_0_0/0.6)] sm:p-9"
          >
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-accent">
              {estimate.label}
            </p>

            <div className="mt-7">
              <div className="flex items-baseline justify-between gap-4">
                <span className="text-sm text-cream-muted">You guessed</span>
                <CountUp
                  to={GUESS_MINUTES}
                  format={formatMinutes}
                  className="font-display text-4xl text-cream/70 sm:text-5xl"
                />
              </div>
              <motion.div
                initial="hidden"
                whileInView="show"
                viewport={viewportOnce}
                className="mt-3 h-3 overflow-hidden rounded-full bg-cream/10"
              >
                <motion.div
                  variants={{
                    hidden: { scaleX: 0 },
                    show: { scaleX: 1, transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] } },
                  }}
                  style={{ width: `${(GUESS_MINUTES / ACTUAL_MINUTES) * 100}%` }}
                  className="h-full origin-left rounded-full bg-cream/40"
                />
              </motion.div>
            </div>

            <div className="mt-8">
              <div className="flex items-baseline justify-between gap-4">
                <span className="text-sm text-cream-muted">Screen Time says</span>
                <CountUp
                  to={ACTUAL_MINUTES}
                  format={formatMinutes}
                  duration={2}
                  className="font-display text-5xl text-accent sm:text-6xl"
                />
              </div>
              <motion.div
                initial="hidden"
                whileInView="show"
                viewport={viewportOnce}
                className="mt-3 h-3 overflow-hidden rounded-full bg-cream/10"
              >
                <motion.div
                  variants={{
                    hidden: { scaleX: 0 },
                    show: { scaleX: 1, transition: { duration: 1.6, ease: [0.16, 1, 0.3, 1], delay: 0.2 } },
                  }}
                  className="h-full origin-left rounded-full bg-accent"
                />
              </motion.div>
            </div>

            <p className="mt-8 border-t border-cream/10 pt-5 text-sm text-cream-muted">{estimate.note}</p>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
