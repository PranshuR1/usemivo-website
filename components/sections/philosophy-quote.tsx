"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/container";
import { fadeUp, viewportOnce } from "@/lib/motion";
import { philosophy } from "@/data/content";

export function PhilosophyQuote() {
  return (
    <section className="relative py-32 sm:py-40">
      <div className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[380px] w-[380px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/10 blur-[110px]" />
      <Container className="max-w-3xl text-center">
        <motion.blockquote
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          variants={fadeUp}
        >
          <p className="font-display text-3xl italic leading-snug text-ink sm:text-4xl md:text-5xl">
            &ldquo;{philosophy.quote}&rdquo;
          </p>
          <footer className="mt-8 text-sm uppercase tracking-[0.2em] text-ink-muted">
            — {philosophy.attribution}
          </footer>
        </motion.blockquote>
      </Container>
    </section>
  );
}
