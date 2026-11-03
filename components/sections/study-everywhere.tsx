"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Check, Download, Globe, Laptop, Smartphone, Users } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeader } from "@/components/ui/section-header";
import { ComingSoon } from "@/components/ui/coming-soon";
import { fadeUp, viewportOnce } from "@/lib/motion";
import { comingSoonNote, macDownloadUrl, macRelease, studyEverywhere } from "@/data/content";

const focusBar = [
  { label: "Focused", minutes: 41, className: "bg-[#7c9c80]" },
  { label: "Distracted", minutes: 4, className: "bg-accent" },
  { label: "Away", minutes: 3, className: "bg-cream/30" },
];

// A still of the Mac app's live session, drawn in HTML so it stays sharp and themable.
function MacSessionPreview() {
  const total = focusBar.reduce((sum, part) => sum + part.minutes, 0);
  return (
    <div className="rounded-2xl border border-cream/10 bg-espresso-raised p-5">
      <div className="flex items-center justify-between">
        <span className="inline-flex items-center gap-2 rounded-full bg-[#7c9c80]/20 px-2.5 py-1 text-[11px] font-semibold text-[#9cc0a0]">
          <span className="h-1.5 w-1.5 rounded-full bg-[#9cc0a0]" />
          Counting
        </span>
        <span className="text-[11px] text-cream-muted">Now in docs.google.com</span>
      </div>
      <p className="mt-4 text-lg font-semibold text-cream">Chemistry past paper</p>
      <div className="mt-2 flex items-end gap-6">
        <p className="text-4xl font-semibold tabular-nums tracking-tight text-cream">48:12</p>
        <p className="pb-1 text-xl font-semibold tabular-nums tracking-tight text-[#9cc0a0]">41:05 focused</p>
      </div>
      <div className="mt-4 flex h-2 gap-0.5 overflow-hidden rounded-full">
        {focusBar.map((part) => (
          <span key={part.label} className={part.className} style={{ width: `${(part.minutes / total) * 100}%` }} />
        ))}
      </div>
      <div className="mt-2 flex gap-4 text-[11px] text-cream-muted">
        {focusBar.map((part) => (
          <span key={part.label}>
            {part.label} {part.minutes}m
          </span>
        ))}
      </div>
    </div>
  );
}

function SmallCard({
  icon: Icon,
  kicker,
  title,
  body,
  cta,
  href,
  note,
  delay,
}: {
  icon: typeof Globe;
  kicker: string;
  title: string;
  body: string;
  cta: string;
  href: string;
  note?: string;
  delay: number;
}) {
  return (
    <motion.article
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
      variants={fadeUp}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay }}
      className="flex flex-col rounded-[1.75rem] border border-ink/10 bg-surface p-6 shadow-card sm:p-7"
    >
      <div className="flex items-center justify-between gap-3">
        <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-accent/15 text-accent-deep">
          <Icon size={18} />
        </span>
        {note ? (
          <ComingSoon>{note}</ComingSoon>
        ) : (
          <span className="inline-flex items-center gap-1.5 rounded-full border border-kept/25 bg-kept/10 px-2.5 py-1 text-[11px] font-medium tracking-wide text-kept">
            <span className="h-1.5 w-1.5 rounded-full bg-kept" />
            Available now
          </span>
        )}
      </div>
      <p className="mt-5 text-[11px] font-semibold uppercase tracking-[0.18em] text-accent-deep">{kicker}</p>
      <h3 className="mt-2 font-display text-[1.7rem] leading-tight text-ink">{title}</h3>
      <p className="mt-3 text-[15px] leading-relaxed text-ink-body">{body}</p>
      <Link
        href={href}
        className="group mt-auto inline-flex items-center gap-1.5 pt-6 text-sm font-medium text-ink hover:text-accent-deep"
      >
        {cta}
        <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
      </Link>
    </motion.article>
  );
}

export function StudyEverywhere() {
  const { mac, web, room, iphone } = studyEverywhere;
  return (
    <section id="study" className="bg-bg-alt py-24 sm:py-32">
      <Container>
        <motion.div initial="hidden" whileInView="show" viewport={viewportOnce} variants={fadeUp}>
          <SectionHeader eyebrow={studyEverywhere.eyebrow} heading={studyEverywhere.heading} sub={studyEverywhere.sub} />
        </motion.div>

        <motion.article
          id="mac"
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          variants={fadeUp}
          className="mt-14 grid scroll-mt-28 gap-10 rounded-[2rem] border border-espresso bg-espresso p-8 text-cream shadow-lift sm:p-10 lg:grid-cols-[1.1fr_1fr] lg:items-center"
        >
          <div>
            <p className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-accent">
              <Laptop size={14} />
              {mac.kicker}
            </p>
            <h3 className="mt-4 font-display text-4xl leading-tight sm:text-[2.6rem]">{mac.title}</h3>
            <p className="mt-4 text-[15px] leading-relaxed text-cream-muted">{mac.body}</p>
            <ul className="mt-6 space-y-3">
              {mac.points.map((point) => (
                <li key={point} className="flex items-start gap-3 text-sm leading-relaxed text-cream/85">
                  <Check size={16} className="mt-0.5 shrink-0 text-accent" />
                  {point}
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href={macDownloadUrl}
                className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-accent px-7 text-sm font-medium text-on-accent shadow-[inset_0_1px_0_rgb(255_255_255/0.35)] transition-all hover:-translate-y-0.5 hover:brightness-105"
              >
                <Download size={16} />
                {mac.cta}
              </a>
              <p className="text-xs text-cream-muted">
                Free · Version {macRelease.version} · {macRelease.requires} · {macRelease.size}
              </p>
            </div>
          </div>
          <MacSessionPreview />
        </motion.article>

        <div className="mt-6 grid gap-6 lg:grid-cols-3">
          <SmallCard icon={Globe} {...web} delay={0} />
          <SmallCard icon={Users} {...room} delay={0.07} />
          <SmallCard icon={Smartphone} {...iphone} note={comingSoonNote} delay={0.14} />
        </div>
      </Container>
    </section>
  );
}
