"use client";

import { motion } from "framer-motion";
import { X } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeader } from "@/components/ui/section-header";
import { fadeUp, viewportOnce } from "@/lib/motion";
import { problem } from "@/data/content";

export function Problem() {
  return (
    <section className="bg-bg-alt py-24 sm:py-32">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            variants={fadeUp}
            className="lg:sticky lg:top-32 lg:self-start"
          >
            <SectionHeader
              align="left"
              eyebrow={problem.eyebrow}
              heading={problem.heading}
              sub={problem.sub}
            />
          </motion.div>

          <ul className="divide-y divide-ink/10 rounded-3xl border border-ink/10 bg-surface px-6 shadow-card sm:px-8">
            {problem.cards.map((card, index) => (
              <motion.li
                key={card.title}
                initial="hidden"
                whileInView="show"
                viewport={viewportOnce}
                variants={fadeUp}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: (index % 3) * 0.05 }}
                className="flex gap-4 py-6"
              >
                <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-ink/5 text-ink-muted">
                  <X size={14} strokeWidth={2.5} />
                </span>
                <div>
                  <h3 className="text-[17px] font-semibold text-ink">{card.title}</h3>
                  <p className="mt-1.5 text-[15px] leading-relaxed text-ink-body">{card.body}</p>
                </div>
              </motion.li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
