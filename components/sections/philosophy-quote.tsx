"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/container";
import { fadeUp, viewportOnce } from "@/lib/motion";
import { philosophy } from "@/data/content";

export function PhilosophyQuote() {
  return (
    <section className="relative overflow-hidden bg-espresso pb-12 pt-28 sm:pt-36">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(50%_60%_at_50%_45%,rgb(212_135_42/0.14),transparent_70%)]" />
      <Container className="max-w-4xl text-center">
        <motion.blockquote initial="hidden" whileInView="show" viewport={viewportOnce} variants={fadeUp}>
          <p className="text-balance font-display text-4xl italic leading-[1.1] text-cream sm:text-6xl">
            &ldquo;{philosophy.quote}&rdquo;
          </p>
          <footer className="mt-8 text-xs font-medium uppercase tracking-[0.22em] text-cream-muted">
            — {philosophy.attribution}
          </footer>
        </motion.blockquote>
      </Container>
    </section>
  );
}
