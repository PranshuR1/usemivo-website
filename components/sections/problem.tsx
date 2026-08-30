"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { fadeUp, viewportOnce } from "@/lib/motion";
import { problem } from "@/data/content";

export function Problem() {
  return (
    <section className="py-28 sm:py-36">
      <Container>
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          variants={fadeUp}
          className="mx-auto max-w-2xl text-center"
        >
          <div className="flex justify-center">
            <Eyebrow>{problem.eyebrow}</Eyebrow>
          </div>
          <h2 className="mt-6 text-3xl font-semibold leading-tight tracking-tight text-ink sm:text-4xl">
            {problem.heading}
          </h2>
          <p className="mx-auto mt-5 max-w-lg text-lg leading-relaxed text-ink-body">
            {problem.sub}
          </p>
        </motion.div>

        <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {problem.cards.map((card, index) => (
            <motion.div
              key={card.title}
              initial="hidden"
              whileInView="show"
              viewport={viewportOnce}
              variants={fadeUp}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: (index % 3) * 0.08 }}
              className="rounded-2xl border border-ink/10 bg-surface/40 p-6 transition-colors hover:border-ink/20"
            >
              <h3 className="text-base font-semibold text-ink">{card.title}</h3>
              <p className="mt-2.5 text-sm leading-relaxed text-ink-body">{card.body}</p>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
