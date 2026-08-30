"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { fadeUp, viewportOnce } from "@/lib/motion";
import { experiments } from "@/data/content";

export function Experiments() {
  return (
    <section id="experiments" className="py-28 sm:py-36">
      <Container>
        <div className="grid gap-16 lg:grid-cols-[1fr_0.8fr] lg:items-center">
          <div>
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={viewportOnce}
              variants={fadeUp}
            >
              <Eyebrow>{experiments.eyebrow}</Eyebrow>
              <h2 className="mt-6 text-3xl font-semibold leading-tight tracking-tight text-ink sm:text-4xl">
                {experiments.heading}
              </h2>
              <p className="mt-5 max-w-lg text-lg leading-relaxed text-ink-body">
                {experiments.sub}
              </p>
            </motion.div>

            <div className="mt-10 grid gap-6 sm:grid-cols-2">
              {experiments.items.map((item, index) => (
                <motion.div
                  key={item.title}
                  initial="hidden"
                  whileInView="show"
                  viewport={viewportOnce}
                  variants={fadeUp}
                  transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: (index % 2) * 0.08 }}
                >
                  <p className="text-[15px] font-medium text-ink">{item.title}</p>
                  <p className="mt-1.5 text-sm leading-relaxed text-ink-body">
                    {item.body}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={viewportOnce}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="relative mx-auto w-full max-w-[300px]"
          >
            <div className="absolute inset-0 -z-10 rounded-[3rem] bg-accent/15 blur-[70px]" />
            <div className="overflow-hidden rounded-[2.5rem] border border-ink/10 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.6)]">
              <Image
                src="/images/screenshot-scroll-schedule.png"
                alt="Mivo scrolling schedule screen"
                width={1242}
                height={2688}
                className="h-auto w-full"
              />
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
