"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { ButtonLink } from "@/components/ui/button-link";
import { fadeUp, viewportOnce } from "@/lib/motion";
import { finalCta, appStoreUrl } from "@/data/content";

export function FinalCta() {
  return (
    <section id="download" className="relative py-28 sm:py-36">
      <div className="pointer-events-none absolute left-1/2 top-0 -z-10 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-accent/10 blur-[130px]" />
      <Container className="max-w-2xl text-center">
        <motion.div initial="hidden" whileInView="show" viewport={viewportOnce} variants={fadeUp}>
          <div className="flex justify-center">
            <Eyebrow>{finalCta.eyebrow}</Eyebrow>
          </div>
          <h2 className="mt-6 text-4xl font-semibold leading-tight tracking-tight text-ink sm:text-5xl">
            {finalCta.heading}
          </h2>
          <p className="mx-auto mt-5 max-w-md text-lg leading-relaxed text-ink-body">
            {finalCta.body}
          </p>

          <div className="mt-9 flex justify-center">
            <ButtonLink href={appStoreUrl} variant="primary">
              Download on the App Store
            </ButtonLink>
          </div>
          <p className="mt-4 text-xs uppercase tracking-[0.15em] text-ink-muted">
            {finalCta.availability}
          </p>

          <p className="mx-auto mt-20 max-w-sm whitespace-pre-line text-sm leading-relaxed text-ink-muted">
            {finalCta.closingLine}
          </p>
        </motion.div>
      </Container>
    </section>
  );
}
