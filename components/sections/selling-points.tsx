"use client";

import { motion } from "framer-motion";
import { BookOpen, Filter, Hand, Scale } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { fadeUp, viewportOnce } from "@/lib/motion";
import { sellingPoints } from "@/data/content";

const icons = { truth: Scale, clear: Filter, study: BookOpen, pause: Hand } as const;

// The reasons to choose Mivo, right under the hero so nobody has to scroll for them.
export function SellingPoints() {
  return (
    <section id="why-mivo" className="pb-20 pt-4 sm:pb-28">
      <Container>
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          variants={fadeUp}
          className="flex flex-col items-center text-center"
        >
          <Eyebrow>{sellingPoints.eyebrow}</Eyebrow>
          <h2 className="mt-5 text-balance font-display text-4xl leading-[1.06] tracking-[-0.015em] text-ink sm:text-5xl">
            {sellingPoints.heading}
          </h2>
        </motion.div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {sellingPoints.items.map((item, index) => {
            const Icon = icons[item.icon];
            return (
              <motion.article
                key={item.title}
                initial="hidden"
                whileInView="show"
                viewport={viewportOnce}
                variants={fadeUp}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: index * 0.07 }}
                className="flex flex-col rounded-[1.75rem] border border-ink/10 bg-surface p-6 shadow-card"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-accent/15 text-accent-deep">
                  <Icon size={20} />
                </span>
                <h3 className="mt-5 text-lg font-semibold leading-snug tracking-tight text-ink">{item.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-ink-body">{item.body}</p>
              </motion.article>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
