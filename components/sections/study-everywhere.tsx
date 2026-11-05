import Link from "next/link";
import { ArrowRight, Check, Globe, Laptop, Users } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeader } from "@/components/ui/section-header";
import { ComingSoon } from "@/components/ui/coming-soon";
import { studyEverywhere } from "@/data/content";

const focusBar = [
  { label: "Focused", minutes: 41, className: "bg-[#7c9c80]" },
  { label: "Distracted", minutes: 4, className: "bg-accent" },
  { label: "Away", minutes: 3, className: "bg-cream/30" },
];

// A still of the Mac app's live session, drawn in HTML so it stays sharp and themable.
function MacSessionPreview() {
  const total = focusBar.reduce((sum, part) => sum + part.minutes, 0);
  return (
    <div className="min-w-0 rounded-2xl border border-cream/10 bg-espresso-raised p-5 sm:p-7">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <span className="inline-flex items-center gap-2 rounded-full bg-[#7c9c80]/20 px-2.5 py-1 text-[11px] font-semibold text-[#9cc0a0]">
          <span className="h-1.5 w-1.5 rounded-full bg-[#9cc0a0]" />
          Counting
        </span>
        <span className="text-[11px] text-cream-muted">Now in docs.google.com</span>
      </div>
      <p className="mt-4 text-lg font-semibold text-cream">Chemistry past paper</p>
      <div className="mt-3 flex flex-wrap items-end gap-x-6 gap-y-2">
        <p className="text-4xl font-semibold tabular-nums tracking-tight text-cream">48:12</p>
        <p className="pb-1 text-xl font-semibold tabular-nums tracking-tight text-[#9cc0a0]">41:05 focused</p>
      </div>
      <div className="mt-4 flex h-2 gap-0.5 overflow-hidden rounded-full">
        {focusBar.map((part) => (
          <span key={part.label} className={part.className} style={{ width: `${(part.minutes / total) * 100}%` }} />
        ))}
      </div>
      <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-[11px] text-cream-muted">
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
}: {
  icon: typeof Globe;
  kicker: string;
  title: string;
  body: string;
  cta: string;
  href: string;
  note?: string;
}) {
  return (
    <article
      className="flex flex-col items-start border-t border-ink/15 pt-7 sm:pt-8"
    >
      <div className="flex w-full items-center justify-between gap-3">
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
      <h3 className="mt-2 text-xl font-semibold leading-snug tracking-tight text-ink">{title}</h3>
      <p className="mt-3 max-w-md text-[15px] leading-[1.8] text-ink-body">{body}</p>
      <Link
        href={href}
        className="group mt-auto inline-flex items-center gap-1.5 pt-6 text-sm font-medium text-ink hover:text-accent-deep"
      >
        {cta}
        <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
      </Link>
    </article>
  );
}

export function StudyEverywhere() {
  const { mac, web, room } = studyEverywhere;
  return (
    <section id="study" className="bg-bg-alt py-20 sm:py-28 lg:py-32">
      <Container>
        <div>
          <SectionHeader eyebrow={studyEverywhere.eyebrow} heading={studyEverywhere.heading} sub={studyEverywhere.sub} />
        </div>

        <article
          id="mac"
          className="mt-12 grid scroll-mt-28 gap-10 rounded-[2rem] bg-espresso p-6 text-cream sm:mt-16 sm:p-10 lg:grid-cols-2 lg:items-center lg:gap-14 lg:p-12"
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
            <a href="#download" className="mt-8 inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-accent px-7 text-sm font-medium text-on-accent transition-colors hover:brightness-105">
              Get the desktop app <ArrowRight aria-hidden="true" size={16} />
            </a>
            <p className="mt-3 text-xs text-cream-muted">Free for Mac and Windows (beta)</p>
          </div>
          <MacSessionPreview />
        </article>

        <div className="mt-12 grid gap-10 sm:mt-16 sm:grid-cols-2 sm:gap-14">
          <SmallCard icon={Globe} {...web} />
          <SmallCard icon={Users} {...room} />
        </div>
      </Container>
    </section>
  );
}
