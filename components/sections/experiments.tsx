"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { FlaskConical, LineChart, Scale, CalendarClock } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeader } from "@/components/ui/section-header";
import { fadeUp, viewportOnce } from "@/lib/motion";
import { experiments } from "@/data/content";

const icons = [FlaskConical, LineChart, Scale, CalendarClock];

export function Experiments() {
  return (
    <section id="experiments" className="bg-bg-alt py-24 sm:py-32">
      <Container>
        <div className="grid gap-16 lg:grid-cols-[1.1fr_0.7fr] lg:items-center">
          <div>
            <motion.div initial="hidden" whileInView="show" viewport={viewportOnce} variants={fadeUp}>
              <SectionHeader
                align="left"
                eyebrow={experiments.eyebrow}
                heading={experiments.heading}
                sub={experiments.sub}
              />
            </motion.div>

            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              {experiments.items.map((item, index) => {
                const Icon = icons[index % icons.length];
                return (
                  <motion.div
                    key={item.title}
                    initial="hidden"
                    whileInView="show"
                    viewport={viewportOnce}
                    variants={fadeUp}
                    transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: (index % 2) * 0.08 }}
                    className="rounded-2xl border border-ink/10 bg-surface p-5 shadow-card"
                  >
                    <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent/15 text-accent-deep">
                      <Icon size={17} />
                    </span>
                    <p className="mt-4 text-[15px] font-semibold text-ink">{item.title}</p>
                    <p className="mt-1.5 text-sm leading-relaxed text-ink-body">{item.body}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={viewportOnce}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="relative mx-auto w-full max-w-[290px]"
          >
            <div className="absolute inset-0 -z-10 rounded-[3rem] bg-accent/25 blur-[70px]" />
            <div className="overflow-hidden rounded-[2.5rem] border-[7px] border-espresso shadow-lift">
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
