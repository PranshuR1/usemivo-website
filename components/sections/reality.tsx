"use client";

import { motion } from "framer-motion";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Container } from "@/components/ui/container";
import { fadeUp, viewportOnce } from "@/lib/motion";
import { reality } from "@/data/content";

export function Reality() {
  return (
    <section id="how-it-works" className="relative py-28 sm:py-36">
      <div className="pointer-events-none absolute left-1/2 top-0 -z-10 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-accent/10 blur-[120px]" />
      <Container className="max-w-3xl text-center">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          variants={fadeUp}
        >
          <div className="flex justify-center">
            <Eyebrow>{reality.eyebrow}</Eyebrow>
          </div>
          <h2 className="mt-6 text-3xl font-semibold leading-tight tracking-tight text-ink sm:text-4xl">
            {reality.heading}
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-ink-body">
            {reality.sub}
          </p>
        </motion.div>
      </Container>
    </section>
  );
}
