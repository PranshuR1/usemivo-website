"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/container";
import { SectionHeader } from "@/components/ui/section-header";
import { ComingSoon } from "@/components/ui/coming-soon";
import { ButtonLink } from "@/components/ui/button-link";
import { PlusPlans } from "@/components/plus-plans";
import { fadeUp, viewportOnce } from "@/lib/motion";
import { plusFree, plusNote } from "@/data/shop";

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

        <div className="mt-8 flex justify-center">
          <ButtonLink href="/pricing" variant="secondary" showArrow={false}>
            Full pricing
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}
