"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/container";
import { ButtonLink } from "@/components/ui/button-link";
import { SectionHeader } from "@/components/ui/section-header";
import { fadeUp, viewportOnce } from "@/lib/motion";
import { steps, midCta, appStoreUrl } from "@/data/content";

export function ProcessSteps() {
  return (
    <section id="how-it-works" className="py-24 sm:py-32">
      <Container>
        <motion.div initial="hidden" whileInView="show" viewport={viewportOnce} variants={fadeUp}>
          <SectionHeader eyebrow="How it works" heading="From a guess to a choice, in four steps." />
        </motion.div>

        <ol className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <motion.li
              key={step.n}
              initial="hidden"
              whileInView="show"
              viewport={viewportOnce}
              variants={fadeUp}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: index * 0.08 }}
              className="group flex flex-col rounded-3xl border border-ink/10 bg-surface p-7 shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-lift"
            >
              <span className="font-display text-5xl leading-none text-accent">{step.n}</span>
              <p className="mt-6 text-[11px] font-semibold uppercase tracking-[0.16em] text-ink-muted">
                {step.label}
              </p>
              <h3 className="mt-2 text-xl font-semibold leading-snug text-ink">{step.heading}</h3>
              <p className="mt-3 text-[15px] leading-relaxed text-ink-body">{step.body}</p>
            </motion.li>
          ))}
        </ol>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          variants={fadeUp}
          className="mt-16 flex flex-col items-center gap-6 text-center"
        >
          <h3 className="font-display text-3xl italic text-ink sm:text-4xl">{midCta.heading}</h3>
          <ButtonLink href={appStoreUrl} variant="primary">
            Download on the App Store
          </ButtonLink>
        </motion.div>
      </Container>
    </section>
  );
}
