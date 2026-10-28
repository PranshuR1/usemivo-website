"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/container";
import { SectionHeader } from "@/components/ui/section-header";
import { ComingSoon } from "@/components/ui/coming-soon";
import { ButtonLink } from "@/components/ui/button-link";
import { PlusPlans } from "@/components/plus-plans";
import { fadeUp, viewportOnce } from "@/lib/motion";
import { plusFree, plusNote, spotProducts, usd } from "@/data/shop";

export function Pricing() {
  return (
    <section id="pricing" className="py-24 sm:py-32">
      <Container>
        <motion.div initial="hidden" whileInView="show" viewport={viewportOnce} variants={fadeUp}>
          <SectionHeader eyebrow="Pricing" heading="Free to start. Honest about the rest." sub={plusFree}>
            <div className="mt-6 flex justify-center">
              <ComingSoon>{plusNote}</ComingSoon>
            </div>
          </SectionHeader>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          variants={fadeUp}
          className="mt-14"
        >
          <PlusPlans />
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          variants={fadeUp}
          className="mt-6 flex flex-col items-start justify-between gap-6 rounded-3xl bg-espresso p-8 text-cream shadow-lift sm:flex-row sm:items-center sm:p-10"
        >
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-accent">Mivo Spots</p>
            <p className="mt-2 font-display text-3xl">
              {spotProducts
                .map((p) => `${p.spots === 1 ? "One Spot" : `${p.spots}-pack`} ${usd(p.price)}`)
                .join("  ·  ")}
            </p>
            <p className="mt-2 text-sm text-cream-muted">
              NFC stickers you tap with your iPhone. Free shipping on the 3-pack.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <ButtonLink href="/shop">Shop Spots</ButtonLink>
            <ButtonLink href="/pricing" variant="secondary-dark" showArrow={false}>
              Full pricing
            </ButtonLink>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
