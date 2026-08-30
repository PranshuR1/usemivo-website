"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/container";
import { ButtonLink } from "@/components/ui/button-link";
import { fadeUp, viewportOnce } from "@/lib/motion";
import { steps, midCta, appStoreUrl } from "@/data/content";

export function ProcessSteps() {
  return (
    <section className="relative py-16 sm:py-20">
      <Container className="max-w-3xl">
        <div className="relative">
          <div className="absolute left-[27px] top-2 bottom-2 w-px bg-gradient-to-b from-accent/40 via-ink/10 to-transparent sm:left-[35px]" />

          <ol className="space-y-14">
            {steps.map((step) => (
              <motion.li
                key={step.n}
                initial="hidden"
                whileInView="show"
                viewport={viewportOnce}
                variants={fadeUp}
                className="relative flex gap-6 sm:gap-8"
              >
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-accent/25 bg-surface font-display text-xl italic text-accent-deep sm:h-[70px] sm:w-[70px] sm:text-2xl">
                  {step.n}
                </div>
                <div className="pt-1">
                  <p className="text-xs font-semibold uppercase tracking-[0.15em] text-ink-muted">
                    Step {step.n} — {step.label}
                  </p>
                  <h3 className="mt-2 text-2xl font-semibold text-ink sm:text-[1.75rem]">
                    {step.heading}
                  </h3>
                  <p className="mt-2 max-w-lg text-[15px] leading-relaxed text-ink-body">
                    {step.body}
                  </p>
                </div>
              </motion.li>
            ))}
          </ol>
        </div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          variants={fadeUp}
          className="mt-20 flex flex-col items-center gap-6 border-t border-ink/10 pt-16 text-center"
        >
          <h3 className="font-display text-3xl italic text-ink sm:text-4xl">
            {midCta.heading}
          </h3>
          <ButtonLink href={appStoreUrl} variant="primary">
            Download on the App Store
          </ButtonLink>
          <p className="text-xs uppercase tracking-[0.15em] text-ink-muted">
            Available now on iOS
          </p>
        </motion.div>
      </Container>
    </section>
  );
}
