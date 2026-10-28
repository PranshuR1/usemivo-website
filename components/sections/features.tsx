"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Activity,
  ArrowUpRight,
  Download,
  Filter,
  Hand,
  NotebookPen,
  Repeat,
  Scale,
  Target,
  type LucideIcon,
} from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeader } from "@/components/ui/section-header";
import { ComingSoon } from "@/components/ui/coming-soon";
import { fadeUp, viewportOnce } from "@/lib/motion";
import { featureCategories, macDownloadUrl } from "@/data/content";
import { cn } from "@/lib/utils";
import { FeatureExplorerModal } from "@/components/demo-phone/feature-explorer-modal";
import type { DemoTarget } from "@/components/demo-phone/interactive-phone";

const featureTarget: Record<string, DemoTarget> = {
  // Awareness & Truth — each points at a genuinely different card, not just "the live number"
  "Daily Truth Estimates": { tab: "home", highlight: "estimate" },
  "Actual Screen Time Reveals": { tab: "home", highlight: "breakdown" },
  "Accuracy Scores": { tab: "home", highlight: "truthChecks" },
  "Forgotten-Time Analysis": { tab: "home", highlight: "forgotten" },
  "Personalized Pattern Insights": { tab: "patterns", highlight: "noticed" },
  "Honest About Missing Data": { tab: "home", highlight: "breakdown" },

  // Intervention & Protection — each is its own stage, not all funneling into the same idle list
  "Five-Second Opening Pause": { tab: "interventions", stage: "pausing" },
  "Adaptive Intervention Friction": { tab: "interventions", stage: "adaptivePausing" },
  "Trigger & Intention Selection": { tab: "interventions", stage: "trigger" },
  "Late-Night Protection": { tab: "interventions", highlight: "Late-Night Protection" },
  "Rescue Mode": { tab: "interventions", stage: "rescue" },
  "Daily Screen Time Protection": { tab: "interventions", highlight: "Daily Screen Time Protection" },
  "Your Swap": { tab: "interventions", stage: "swap" },
  "AI-Reviewed Emergency Unlock": { tab: "interventions", stage: "unlock" },

  // Mivo Clear & Still — real dedicated screens now, not the generic app list
  "Mivo Clear (Beta)": { tab: "interventions", stage: "clear" },
  "Mivo Still (Beta)": { tab: "interventions", stage: "still" },

  // Milo — the Home card shows what he says; the roaming toggle lives in Settings → Companion
  "Meet Milo": { tab: "home", highlight: "milo" },
  "Milo Walks Around Mivo": { tab: "settings", highlight: "Companion" },
  "Milo on Your Lock Screen": { tab: "home", highlight: "liveTime" },
  "Milo Is Honest About What He Can't See": { tab: "settings", highlight: "Companion" },

  // Mivo Spots are physical NFC tags, which a web preview can't recreate — Home shows the Spot card
  "Tap to Start a Place": { tab: "home", highlight: "spots" },
  "Four Ways to Use a Spot": { tab: "home", highlight: "spots" },
  "Friction, Never a Lockout": { tab: "home", highlight: "spots" },
  "Skip the Banner": { tab: "home", highlight: "spots" },
  "Honest Spot Summaries": { tab: "home", highlight: "spots" },
  "A Spot Is Yours": { tab: "home", highlight: "spots" },

  // Mivo for Mac — only the two cross-device Settings rows have a real iPhone-side screen;
  // the rest are Mac-app-native and land on a sensible default (their detail text says so)
  "Real Cross-Device Sync": { tab: "settings", highlight: "Mivo for Mac" },
  "See Your iPhone's Week, From Your Mac": { tab: "settings", highlight: "Mivo for Mac" },
  "Click Into Any App to See What You Were Doing": { tab: "home", highlight: "breakdown" },
  "“Block My iPhone Too”": { tab: "interventions", stage: "still" },
  "Redesigned Interface": { tab: "home" },
  "Smarter Drift Handling": { tab: "home" },

  // Focus Sessions
  "Focus Timer Modes": { tab: "home" },
  "AI Focus Coach": { tab: "home" },

  // Live Activity — the live number is genuinely what these represent (in-app, lock screen,
  // Dynamic Island are all the same underlying timer on different OS surfaces we can't fully
  // recreate here), Recovery/Widgets get their own non-generic landing spot
  "Active Session Timers": { tab: "home", highlight: "liveTime" },
  "Lock Screen Live Activities": { tab: "home", highlight: "liveTime" },
  "Dynamic Island Integration": { tab: "home", highlight: "liveTime" },
  "Recovery Mode": { tab: "interventions", stage: "rescue" },
  "Home Screen & Lock Screen Widgets": { tab: "home", highlight: "liveTime" },

  // Experiments
  "Seven-Day Behavior Experiments": { tab: "patterns", highlight: "windowsKept" },
  "Experiment Tracking & Results": { tab: "patterns", highlight: "windowsKept" },
  "Before & After Comparisons": { tab: "patterns", highlight: "windowsKept" },
  "Adaptive Daily Scroll Windows": { tab: "patterns", highlight: "windowsKept" },
  "Personalized Scrolling Schedules": { tab: "patterns", highlight: "windowsKept" },
  "30-Day Plan Forecast": { tab: "home", highlight: "forecast" },
  "Comeback Fresh Start": { tab: "patterns", highlight: "windowsKept" },

  // Reports & Reflections
  "Session Reflections": { tab: "patterns", highlight: "chart" },
  "Attention Receipt": { tab: "home", highlight: "receipt" },
  "“Worth It?” Session Checks": { tab: "patterns", highlight: "chart" },
  "Weekly Truth Reports": { tab: "patterns", highlight: "chart" },
  "Monthly Mivo Effect Reports": { tab: "patterns", highlight: "chart" },
  "App-Specific Friction Preferences": { tab: "interventions", highlight: "App-Specific Friction" },

  // Privacy & Control
  "Privacy Center": { tab: "settings", highlight: "Privacy Center" },
  "Data Export": { tab: "settings", highlight: "Data Export" },
  "Account Deletion Controls": { tab: "settings", highlight: "Account" },
  "Accountability Summaries": { tab: "settings" },
};

function targetFor(title: string): DemoTarget {
  return featureTarget[title] ?? { tab: "home" };
}

type Highlight = {
  title: string;
  icon: LucideIcon;
  wide?: boolean;
  dark?: boolean;
  image?: { src: string; alt: string };
};

// The seven features that get a card of their own; the copy comes from featureCategories.
const highlights: Highlight[] = [
  {
    title: "Trigger & Intention Selection",
    icon: Target,
    wide: true,
    image: { src: "/images/screenshot-interventions.png", alt: "Mivo asking why you are opening an app" },
  },
  { title: "Daily Truth Estimates", icon: Scale },
  { title: "Five-Second Opening Pause", icon: Hand, dark: true },
  { title: "Personalized Pattern Insights", icon: Activity },
  { title: "Mivo Clear (Beta)", icon: Filter },
  {
    title: "Session Reflections",
    icon: NotebookPen,
    wide: true,
    image: { src: "/images/screenshot-reflection.png", alt: "Mivo's session reflection screen" },
  },
  { title: "Your Swap", icon: Repeat },
];

const allFeatures = featureCategories.flatMap((category) => category.features);

function MacDownloadBanner() {
  return (
    <div className="mt-6 flex flex-col items-start justify-between gap-4 rounded-2xl border border-accent/25 bg-accent/10 p-5 sm:flex-row sm:items-center">
      <div>
        <p className="text-sm font-medium text-ink">Mivo is also on Mac.</p>
        <p className="mt-0.5 text-xs text-ink-muted">Free download · macOS</p>
      </div>
      <a
        href={macDownloadUrl}
        download
        className="inline-flex h-10 shrink-0 items-center justify-center gap-2 rounded-full bg-espresso px-5 text-sm font-medium text-cream transition-colors hover:bg-espresso-raised"
      >
        <Download size={15} />
        Download for Mac
      </a>
    </div>
  );
}

function FeatureRow({ title, body, onExplore }: { title: string; body: string; onExplore: () => void }) {
  return (
    <button
      type="button"
      onClick={onExplore}
      className="group -mx-3 flex w-[calc(100%+1.5rem)] items-start gap-3 rounded-xl px-3 py-3 text-left transition-colors hover:bg-ink/5"
    >
      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent/70 transition-colors group-hover:bg-accent" />
      <div className="min-w-0 flex-1">
        <div className="flex items-center justify-between gap-3">
          <p className="text-[15px] font-medium text-ink">{title}</p>
          <span className="flex shrink-0 items-center gap-1 text-xs font-medium text-accent-deep opacity-0 transition-opacity group-hover:opacity-100">
            Explore
            <ArrowUpRight size={13} />
          </span>
        </div>
        <p className="mt-1 text-sm leading-relaxed text-ink-body">{body}</p>
      </div>
    </button>
  );
}

function HighlightCard({
  item,
  body,
  onExplore,
  index,
}: {
  item: Highlight;
  body: string;
  onExplore: () => void;
  index: number;
}) {
  const Icon = item.icon;
  return (
    <motion.button
      type="button"
      onClick={onExplore}
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
      variants={fadeUp}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: (index % 3) * 0.07 }}
      className={cn(
        "group relative flex min-h-[300px] flex-col overflow-hidden rounded-3xl border p-7 text-left transition-all duration-300 hover:-translate-y-1",
        item.wide && "lg:col-span-2",
        item.dark
          ? "border-espresso bg-espresso text-cream shadow-lift"
          : "border-ink/10 bg-surface text-ink shadow-card hover:shadow-lift"
      )}
    >
      <span
        className={cn(
          "flex h-11 w-11 items-center justify-center rounded-xl",
          item.dark ? "bg-accent/20 text-accent" : "bg-accent/15 text-accent-deep"
        )}
      >
        <Icon size={20} />
      </span>
      <h3 className={cn("mt-5 text-xl font-semibold leading-snug", item.image && "max-w-xs sm:max-w-[15rem]")}>
        {item.title}
      </h3>
      <p
        className={cn(
          "mt-2.5 text-[15px] leading-relaxed",
          item.image ? "max-w-xs sm:max-w-[15rem]" : "max-w-sm",
          item.dark ? "text-cream-muted" : "text-ink-body"
        )}
      >
        {body}
      </p>
      <span
        className={cn(
          "mt-auto flex items-center gap-1 pt-6 text-sm font-medium",
          item.dark ? "text-accent" : "text-accent-deep"
        )}
      >
        Try it live
        <ArrowUpRight size={15} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
      </span>

      {item.image && (
        <div className="absolute -bottom-24 right-8 hidden w-[190px] overflow-hidden rounded-[1.75rem] border-[5px] border-espresso shadow-lift sm:block">
          <Image src={item.image.src} alt={item.image.alt} width={1242} height={2688} className="h-auto w-full" />
        </div>
      )}
    </motion.button>
  );
}

export function Features() {
  const [active, setActive] = useState<{ title: string; detail: string } | null>(null);
  const [categoryIndex, setCategoryIndex] = useState(0);
  const category = featureCategories[categoryIndex];

  return (
    <section id="features" className="py-24 sm:py-32">
      <Container>
        <motion.div initial="hidden" whileInView="show" viewport={viewportOnce} variants={fadeUp}>
          <SectionHeader
            eyebrow="Features"
            heading="Every tool you need to understand yourself."
            sub="Tap any feature to see it live in the app preview."
          />
        </motion.div>

        <div className="mt-16 grid gap-5 lg:grid-cols-3">
          {highlights.map((item, index) => {
            const feature = allFeatures.find((f) => f.title === item.title);
            if (!feature) return null;
            return (
              <HighlightCard
                key={item.title}
                item={item}
                index={index}
                body={feature.body}
                onExplore={() => setActive({ title: feature.title, detail: feature.detail })}
              />
            );
          })}
        </div>

        <div className="mt-24">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            variants={fadeUp}
            className="flex flex-col gap-2"
          >
            <h3 className="font-display text-3xl text-ink sm:text-4xl">Everything in Mivo</h3>
            <p className="text-[15px] text-ink-body">Pick a category to browse all {allFeatures.length} features.</p>
          </motion.div>

          <div
            role="tablist"
            aria-label="Feature categories"
            className="no-scrollbar -mx-6 mt-8 flex gap-2 overflow-x-auto px-6 pb-2 sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0"
          >
            {featureCategories.map((cat, index) => (
              <button
                key={cat.category}
                type="button"
                role="tab"
                aria-selected={index === categoryIndex}
                onClick={() => setCategoryIndex(index)}
                className={cn(
                  "shrink-0 rounded-full border px-4 py-2 text-sm font-medium transition-colors",
                  index === categoryIndex
                    ? "border-espresso bg-espresso text-cream"
                    : "border-ink/10 bg-surface text-ink-body hover:border-ink/25 hover:text-ink"
                )}
              >
                {cat.category}
              </button>
            ))}
          </div>

          <div
            role="tabpanel"
            className="mt-5 rounded-3xl border border-ink/10 bg-surface p-5 shadow-card sm:p-8"
          >
            {category.note && (
              <div className="mb-4">
                <ComingSoon>{category.note}</ComingSoon>
              </div>
            )}
            <div className="grid gap-x-10 gap-y-1 sm:grid-cols-2">
              {category.features.map((feature) => (
                <FeatureRow
                  key={feature.title}
                  title={feature.title}
                  body={feature.body}
                  onExplore={() => setActive({ title: feature.title, detail: feature.detail })}
                />
              ))}
            </div>
            {category.category === "Mivo for Mac" && <MacDownloadBanner />}
          </div>
        </div>
      </Container>

      <FeatureExplorerModal
        open={active !== null}
        onClose={() => setActive(null)}
        title={active?.title ?? null}
        detail={active?.detail ?? null}
        target={active ? targetFor(active.title) : { tab: "home" }}
      />
    </section>
  );
}
