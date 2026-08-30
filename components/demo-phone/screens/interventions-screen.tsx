"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Clock, Leaf, Sparkles, Search, ArrowLeft } from "lucide-react";
import {
  demoInterventions,
  demoSwap,
  demoUnlock,
  demoRescue,
  demoMivoClear,
  demoMivoStill,
} from "@/data/content";
import { cn } from "@/lib/utils";
import { AppClearPreview } from "../app-clear-preview";

type Stage =
  | "idle"
  | "pausing"
  | "trigger"
  | "duration"
  | "confirmed"
  | "swap"
  | "unlock"
  | "unlockApproved"
  | "rescue"
  | "clear"
  | "still";

export type InterventionEntryStage =
  | "idle"
  | "pausing"
  | "adaptivePausing"
  | "trigger"
  | "swap"
  | "unlock"
  | "rescue"
  | "clear"
  | "still";

const PAUSE_MS = 5000;

const triggerIcons = {
  clock: Clock,
  leaf: Leaf,
  sparkles: Sparkles,
  search: Search,
};

const standaloneStages: Stage[] = ["swap", "unlock", "rescue", "clear", "still"];

function BackToIdle({ onBack }: { onBack: () => void }) {
  return (
    <button
      type="button"
      onClick={onBack}
      className="mb-1 flex items-center gap-1 text-xs text-ink-muted transition-colors hover:text-ink"
    >
      <ArrowLeft size={12} />
      Back
    </button>
  );
}

export function InterventionsScreen({
  initialStage = "idle",
}: {
  initialStage?: InterventionEntryStage;
}) {
  const isAdaptive = initialStage === "adaptivePausing";
  const startStage: Stage = isAdaptive ? "pausing" : initialStage;

  const [stage, setStage] = useState<Stage>(
    standaloneStages.includes(startStage) ? startStage : startStage
  );
  const [appName, setAppName] = useState<string | null>(
    startStage === "idle" ? null : demoInterventions.apps[0].name
  );
  const [duration, setDuration] = useState<string | null>(null);
  const [unlockReason, setUnlockReason] = useState("");
  const [progress, setProgress] = useState(startStage === "pausing" ? 0 : 100);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (startStage !== "pausing") return;
    startPause(demoInterventions.apps[0].name);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function startPause(name: string) {
    setAppName(name);
    setStage("pausing");
    setProgress(0);
    const start = Date.now();
    intervalRef.current = setInterval(() => {
      const pct = Math.min(100, ((Date.now() - start) / PAUSE_MS) * 100);
      setProgress(pct);
      if (pct >= 100) {
        if (intervalRef.current) clearInterval(intervalRef.current);
        setStage("trigger");
      }
    }, 60);
  }

  function pickTrigger() {
    setStage("duration");
  }

  function pickDuration(value: string) {
    setDuration(value);
    setStage("confirmed");
    setTimeout(() => {
      setStage("idle");
      setAppName(null);
      setDuration(null);
      setProgress(0);
    }, 1800);
  }

  function backToIdle() {
    setStage("idle");
    setUnlockReason("");
  }

  const circumference = 2 * Math.PI * 34;

  return (
    <div className="flex min-h-[280px] flex-col gap-3">
      <p className="text-lg font-semibold text-ink">Interventions</p>
      <p className="-mt-2 text-xs text-ink-muted">{demoInterventions.sub}</p>

      {stage === "idle" && (
        <div className="flex flex-col gap-2.5">
          {demoInterventions.apps.map((app) => (
            <button
              key={app.name}
              type="button"
              onClick={() => startPause(app.name)}
              className="flex items-center gap-3 rounded-2xl border border-ink/10 p-3 text-left transition-colors hover:border-accent/30 hover:bg-ink/5"
            >
              <div
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-sm font-semibold text-white"
                style={{ backgroundColor: app.color }}
              >
                {app.initial}
              </div>
              <span className="text-sm font-medium text-ink">{app.name}</span>
            </button>
          ))}
        </div>
      )}

      <AnimatePresence mode="wait">
        {stage === "pausing" && (
          <motion.div
            key="pausing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-1 flex-col items-center justify-center gap-3 py-6 text-center"
          >
            {isAdaptive && (
              <span className="rounded-full bg-accent/15 px-2.5 py-1 text-[10px] font-medium text-accent-deep">
                {demoInterventions.adaptiveBadge}
              </span>
            )}
            <svg width="84" height="84" viewBox="0 0 84 84" className="-rotate-90">
              <circle cx="42" cy="42" r="34" fill="none" stroke="currentColor" strokeWidth="5" className="text-ink/10" />
              <circle
                cx="42"
                cy="42"
                r="34"
                fill="none"
                stroke="currentColor"
                strokeWidth="5"
                strokeLinecap="round"
                className="text-accent"
                strokeDasharray={circumference}
                strokeDashoffset={circumference - (progress / 100) * circumference}
              />
            </svg>
            <p className="text-sm font-medium text-ink">{demoInterventions.pauseLabel}</p>
            <p className="text-xs text-ink-muted">{demoInterventions.pauseSub}</p>
          </motion.div>
        )}

        {stage === "trigger" && (
          <motion.div
            key="trigger"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="flex flex-col gap-2.5 py-1"
          >
            <p className="text-sm font-medium text-ink">{demoInterventions.triggerPrompt}</p>
            <div className="flex flex-col gap-2">
              {demoInterventions.triggers.map((trigger) => {
                const Icon = triggerIcons[trigger.icon];
                return (
                  <button
                    key={trigger.label}
                    type="button"
                    onClick={pickTrigger}
                    className={cn(
                      "flex items-center gap-2.5 rounded-xl border border-ink/10 px-3 py-2.5 text-left text-[13px] font-medium text-ink-body",
                      "transition-colors hover:border-accent/30 hover:bg-accent/10 hover:text-ink"
                    )}
                  >
                    <Icon size={14} className="shrink-0 text-accent-deep" />
                    {trigger.label}
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}

        {stage === "duration" && (
          <motion.div
            key="duration"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="flex flex-col gap-2.5 py-1"
          >
            <p className="text-sm font-medium text-ink">{demoInterventions.durationPrompt}</p>
            <div className="grid grid-cols-3 gap-2">
              {demoInterventions.durations.map((d) => (
                <button
                  key={d}
                  type="button"
                  onClick={() => pickDuration(d)}
                  className="rounded-xl border border-ink/10 py-2.5 text-xs font-medium text-ink-body transition-colors hover:border-accent/30 hover:bg-accent/10 hover:text-ink"
                >
                  {d}
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {stage === "confirmed" && (
          <motion.div
            key="confirmed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-1 flex-col items-center justify-center gap-2 py-10 text-center"
          >
            <p className="text-sm font-medium text-ink">{demoInterventions.confirmMessage}</p>
            <p className="text-xs text-ink-muted">
              {duration} on {appName}
            </p>
          </motion.div>
        )}

        {stage === "swap" && (
          <motion.div key="swap" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <BackToIdle onBack={backToIdle} />
            <div className="rounded-2xl border border-accent/25 bg-accent/10 p-4 text-center">
              <p className="text-[11px] font-medium uppercase tracking-wider text-accent-deep">
                {demoSwap.label}
              </p>
              <p className="mt-2 text-[15px] font-medium leading-snug text-ink">{demoSwap.activity}</p>
              <div className="mt-4 flex flex-col gap-2">
                <button
                  type="button"
                  onClick={backToIdle}
                  className="rounded-xl bg-accent py-2.5 text-xs font-medium text-bg"
                >
                  {demoSwap.primaryCta}
                </button>
                <button
                  type="button"
                  onClick={() => startPause(demoInterventions.apps[0].name)}
                  className="rounded-xl border border-ink/10 py-2.5 text-xs font-medium text-ink-muted"
                >
                  {demoSwap.secondaryCta}
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {(stage === "unlock" || stage === "unlockApproved") && (
          <motion.div key="unlock" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <BackToIdle onBack={backToIdle} />
            {stage === "unlock" ? (
              <div className="rounded-2xl border border-ink/10 p-4">
                <p className="text-sm font-medium text-ink">{demoUnlock.label}</p>
                <p className="mt-1 text-xs text-ink-muted">{demoUnlock.sub}</p>
                <textarea
                  value={unlockReason}
                  onChange={(event) => setUnlockReason(event.target.value)}
                  placeholder={demoUnlock.placeholder}
                  rows={2}
                  className="mt-3 w-full resize-none rounded-xl border border-ink/10 bg-ink/5 p-2.5 text-xs text-ink placeholder:text-ink-muted focus:border-accent/40 focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => setStage("unlockApproved")}
                  className="mt-3 w-full rounded-xl bg-accent py-2.5 text-xs font-medium text-bg"
                >
                  {demoUnlock.submitCta}
                </button>
              </div>
            ) : (
              <div className="rounded-2xl border border-kept/30 bg-kept/10 p-4 text-center">
                <p className="text-sm font-medium text-ink">{demoUnlock.approved}</p>
              </div>
            )}
          </motion.div>
        )}

        {stage === "rescue" && (
          <motion.div key="rescue" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <BackToIdle onBack={backToIdle} />
            <div className="rounded-2xl border border-ink/10 p-4 text-center">
              <p className="text-xs uppercase tracking-wider text-ink-muted">{demoRescue.sessionLabel}</p>
              <p className="mt-2 text-[15px] font-medium text-ink">{demoRescue.prompt}</p>
              <div className="mt-4 flex flex-col gap-2">
                <button
                  type="button"
                  onClick={backToIdle}
                  className="rounded-xl bg-accent py-2.5 text-xs font-medium text-bg"
                >
                  {demoRescue.primaryCta}
                </button>
                <button
                  type="button"
                  className="rounded-xl border border-ink/10 py-2.5 text-xs font-medium text-ink-muted"
                >
                  {demoRescue.secondaryCta}
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {stage === "clear" && (
          <motion.div key="clear" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <BackToIdle onBack={backToIdle} />
            <p className="text-[11px] font-medium uppercase tracking-wider text-accent-deep">
              {demoMivoClear.heading}
            </p>
            <p className="mt-0.5 text-xs text-ink-muted">{demoMivoClear.sub}</p>
            <div className="mt-2.5 flex flex-col gap-2.5">
              {demoMivoClear.apps.map((app) => (
                <AppClearPreview key={app.name} app={app} />
              ))}
            </div>
            <p className="mt-2.5 text-[11px] leading-snug text-ink-muted">{demoMivoClear.note}</p>
          </motion.div>
        )}

        {stage === "still" && (
          <motion.div
            key="still"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-1 flex-col items-center justify-center gap-3 py-6 text-center"
          >
            <BackToIdle onBack={backToIdle} />
            <div className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-accent/40 text-accent">
              ↓
            </div>
            <p className="text-sm font-medium text-ink">{demoMivoStill.prompt}</p>
            <p className="max-w-[22ch] text-xs text-ink-muted">{demoMivoStill.note}</p>
            <button type="button" onClick={backToIdle} className="text-xs text-ink-muted underline">
              {demoMivoStill.cancel}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
