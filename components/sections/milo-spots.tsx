"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { ComingSoon } from "@/components/ui/coming-soon";
import { fadeUp, viewportOnce } from "@/lib/motion";
import { miloSpots } from "@/data/content";

export function MiloSpots() {
  return (
    <section id="milo-spots" className="py-28 sm:py-36">
      <Container>
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          variants={fadeUp}
          className="mx-auto max-w-2xl text-center"
        >
          <div className="flex justify-center">
            <Eyebrow>{miloSpots.eyebrow}</Eyebrow>
          </div>
          <h2 className="mt-6 text-3xl font-semibold leading-tight tracking-tight text-ink sm:text-4xl">
            {miloSpots.heading}
          </h2>
          <p className="mx-auto mt-4 max-w-md text-sm text-ink-muted">{miloSpots.sub}</p>
          <div className="mt-5 flex justify-center">
            <ComingSoon>{miloSpots.note}</ComingSoon>
          </div>
        </motion.div>

        <div className="mt-16 grid gap-6 lg:grid-cols-2">
          {miloSpots.cards.map((card, index) => (
            <motion.article
              key={card.id}
              initial="hidden"
              whileInView="show"
              viewport={viewportOnce}
              variants={fadeUp}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: index * 0.08 }}
              className="flex flex-col rounded-3xl border border-ink/10 bg-surface p-8"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent-deep">{card.kicker}</p>
              <h3 className="mt-4 font-display text-3xl italic text-ink">{card.title}</h3>
              <p className="mt-3 text-[15px] leading-relaxed text-ink-body">{card.body}</p>
              <ul className="mt-6 space-y-3">
                {card.points.map((point) => (
                  <li key={point} className="flex items-start gap-3 text-sm leading-relaxed text-ink-body">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent/60" />
                    {point}
                  </li>
                ))}
              </ul>
              <p className="mt-auto pt-8 text-xs leading-relaxed text-ink-muted">{card.footnote}</p>
            </motion.article>
          ))}
        </div>
      </Container>
    </section>
  );
}
