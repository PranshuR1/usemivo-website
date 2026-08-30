"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Download } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { fadeUp, viewportOnce } from "@/lib/motion";
import { featureCategories, macDownloadUrl } from "@/data/content";
import { FeatureExplorerModal } from "@/components/demo-phone/feature-explorer-modal";
import type { DemoTarget } from "@/components/demo-phone/interactive-phone";

const featureTarget: Record<string, DemoTarget> = {
  // Awareness & Truth — each points at a genuinely different card, not just "the live number"
  "Daily Truth Estimates": { tab: "home", highlight: "estimate" },
  "Actual Screen Time Reveals": { tab: "home", highlight: "breakdown" },
  "Accuracy Scores": { tab: "home", highlight: "truthChecks" },
  "Forgotten-Time Analysis": { tab: "home", highlight: "forgotten" },
  "Personalized Pattern Insights": { tab: "patterns", highlight: "noticed" },

  // Intervention & Protection — each is its own stage, not all funneling into the same idle list
  "Five-Second Opening Pause": { tab: "interventions", stage: "pausing" },
  "Adaptive Intervention Friction": { tab: "interventions", stage: "adaptivePausing" },
  "Trigger & Intention Selection": { tab: "interventions", stage: "trigger" },
  "Late-Night Protection": { tab: "settings", highlight: "Late-Night Protection" },
  "Rescue Mode": { tab: "interventions", stage: "rescue" },
  "Daily Screen Time Protection": { tab: "settings", highlight: "Daily Screen Time Protection" },
  "Your Swap": { tab: "interventions", stage: "swap" },
  "AI-Reviewed Emergency Unlock": { tab: "interventions", stage: "unlock" },

  // Mivo Clear & Still — real dedicated screens now, not the generic app list
  "Mivo Clear (Beta)": { tab: "interventions", stage: "clear" },
  "Mivo Still (Beta)": { tab: "interventions", stage: "still" },

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
  "30-Day Plan Forecast": { tab: "patterns", highlight: "windowsKept" },

  // Reports & Reflections
  "Session Reflections": { tab: "patterns", highlight: "chart" },
  "“Worth It?” Session Checks": { tab: "patterns", highlight: "chart" },
  "Weekly Truth Reports": { tab: "patterns", highlight: "chart" },
  "Monthly Mivo Effect Reports": { tab: "patterns", highlight: "chart" },
  "App-Specific Friction Preferences": { tab: "settings", highlight: "App-Specific Friction" },

  // Privacy & Control
  "Privacy Center": { tab: "settings", highlight: "Privacy Center" },
  "Data Export": { tab: "settings", highlight: "Data Export" },
  "Account Deletion Controls": { tab: "settings", highlight: "Account" },
  "Accountability Summaries": { tab: "settings" },
};

function targetFor(title: string): DemoTarget {
  return featureTarget[title] ?? { tab: "home" };
}

function MacDownloadBanner() {
  return (
    <div className="mt-6 flex flex-col items-start justify-between gap-4 rounded-2xl border border-accent/20 bg-accent/5 p-5 sm:flex-row sm:items-center">
      <div>
        <p className="text-sm font-medium text-ink">Mivo is also on Mac.</p>
        <p className="mt-0.5 text-xs text-ink-muted">Free download · macOS</p>
      </div>
      <a
        href={macDownloadUrl}
        download
        className="inline-flex h-10 shrink-0 items-center justify-center gap-2 rounded-full bg-accent px-5 text-sm font-medium text-bg transition-colors hover:bg-accent-deep"
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
      className="group -mx-3 flex w-full items-start gap-3 rounded-xl px-3 py-2.5 text-left transition-colors hover:bg-ink/5"
    >
      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent/60 transition-colors group-hover:bg-accent" />
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

export function Features() {
  const [active, setActive] = useState<{ title: string; detail: string } | null>(null);

  return (
    <section id="features" className="py-28 sm:py-36">
      <Container>
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          variants={fadeUp}
          className="mx-auto max-w-2xl text-center"
        >
          <div className="flex justify-center">
            <Eyebrow>Features</Eyebrow>
          </div>
          <h2 className="mt-6 text-3xl font-semibold leading-tight tracking-tight text-ink sm:text-4xl">
            Every tool you need to understand yourself.
          </h2>
          <p className="mx-auto mt-4 max-w-md text-sm text-ink-muted">
            Tap any feature to see it live in the app preview.
          </p>
        </motion.div>

        <div className="mt-16 space-y-16">
          {featureCategories.map((cat) => (
            <motion.div key={cat.category} initial="hidden" whileInView="show" viewport={viewportOnce} variants={fadeUp}>
              <h3 className="font-display text-2xl italic text-accent-deep">{cat.category}</h3>
              <div className="mt-6 grid gap-x-10 gap-y-1 border-t border-ink/10 pt-6 sm:grid-cols-2">
                {cat.features.map((feature) => (
                  <FeatureRow
                    key={feature.title}
                    title={feature.title}
                    body={feature.body}
                    onExplore={() => setActive({ title: feature.title, detail: feature.detail })}
                  />
                ))}
              </div>
              {cat.category === "Mivo for Mac" && <MacDownloadBanner />}
            </motion.div>
          ))}
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
