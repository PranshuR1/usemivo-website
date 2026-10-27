"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { ComingSoon } from "@/components/ui/coming-soon";
import { ButtonLink } from "@/components/ui/button-link";
import { PlusPlans } from "@/components/plus-plans";
import { fadeUp, viewportOnce } from "@/lib/motion";
import { plusFree, plusNote, spotProducts, usd } from "@/data/shop";

export function Pricing() {
  return (
    <section id="pricing" className="py-28 sm:py-36">
      <Container>
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          variants={fadeUp}
          className="mx-auto max-w-2xl text-center"
        >
          <div className="flex justify-center">
            <Eyebrow>Pricing</Eyebrow>
          </div>
          <h2 className="mt-6 text-3xl font-semibold leading-tight tracking-tight text-ink sm:text-4xl">
            Free to start. Honest about the rest.
          </h2>
          <p className="mx-auto mt-4 max-w-md text-sm text-ink-muted">{plusFree}</p>
          <div className="mt-5 flex justify-center">
            <ComingSoon>{plusNote}</ComingSoon>
          </div>
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
          className="mt-6 flex flex-col items-start justify-between gap-6 rounded-3xl border border-ink/10 bg-surface p-8 sm:flex-row sm:items-center"
        >
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent-deep">Mivo Spots</p>
            <p className="mt-2 text-lg font-semibold text-ink">
              {spotProducts.map((p) => `${p.spots === 1 ? "One Spot" : `${p.spots}-pack`} ${usd(p.price)}`).join("  ·  ")}
            </p>
            <p className="mt-1 text-sm text-ink-muted">NFC stickers you tap with your iPhone. Free shipping on the 3-pack.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <ButtonLink href="/shop">Shop Spots</ButtonLink>
            <ButtonLink href="/pricing" variant="secondary" showArrow={false}>
              Full pricing
            </ButtonLink>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
