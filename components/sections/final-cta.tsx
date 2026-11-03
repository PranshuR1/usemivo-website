"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/container";
import { ButtonLink } from "@/components/ui/button-link";
import { fadeUp, viewportOnce } from "@/lib/motion";
import { finalCta, appStoreUrl, macDownloadUrl } from "@/data/content";

export function FinalCta() {
  return (
    <section id="download" className="bg-espresso pb-28 pt-16 sm:pb-36 sm:pt-20">
      <Container className="max-w-3xl">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          variants={fadeUp}
          className="rounded-[2.5rem] border border-cream/10 bg-espresso-raised px-6 py-16 text-center sm:px-14 sm:py-20"
        >
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-accent">{finalCta.eyebrow}</p>
          <h2 className="mt-5 text-balance font-display text-5xl leading-[1.04] tracking-[-0.015em] text-cream sm:text-6xl">
            {finalCta.heading}
          </h2>
          <p className="mx-auto mt-5 max-w-md text-lg leading-relaxed text-cream-muted">{finalCta.body}</p>

          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <ButtonLink href={appStoreUrl} variant="primary">
              Download on the App Store
            </ButtonLink>
            <ButtonLink href={macDownloadUrl} variant="secondary-dark" showArrow={false}>
              Download for Mac
            </ButtonLink>
          </div>
          <p className="mt-4 text-xs uppercase tracking-[0.15em] text-cream-muted">{finalCta.availability}</p>

          <p className="mx-auto mt-14 max-w-sm whitespace-pre-line border-t border-cream/10 pt-8 text-sm leading-relaxed text-cream-muted">
            {finalCta.closingLine}
          </p>
        </motion.div>
      </Container>
    </section>
  );
}
