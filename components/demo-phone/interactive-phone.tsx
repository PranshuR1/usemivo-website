"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTilt } from "@/lib/use-tilt";
import { useReducedMotion } from "@/lib/use-reduced-motion";
import { cn } from "@/lib/utils";
import { TabBar } from "./tab-bar";
import { HomeScreen, type HomeHighlight } from "./screens/home-screen";
import { PatternsScreen, type PatternsHighlight } from "./screens/patterns-screen";
import { InterventionsScreen, type InterventionEntryStage } from "./screens/interventions-screen";
import { SettingsScreen } from "./screens/settings-screen";
import { DownloadPromptModal } from "./download-prompt-modal";

export type DemoTabId = "home" | "patterns" | "interventions" | "settings";

export type DemoTarget =
  | { tab: "home"; highlight?: HomeHighlight }
  | { tab: "patterns"; highlight?: PatternsHighlight }
  | { tab: "interventions"; stage?: InterventionEntryStage }
  | { tab: "settings"; highlight?: string };

const ENGAGEMENT_PROMPT_MS = 15000;

export function InteractivePhone({ initialTarget }: { initialTarget?: DemoTarget }) {
  const target: DemoTarget = initialTarget ?? { tab: "home" };
  const reduced = useReducedMotion();
  const { ref, rotateX, rotateY, onPointerMove, onPointerLeave } = useTilt(6);
  const [tab, setTab] = useState<DemoTabId>(target.tab);
  const [initialApplied, setInitialApplied] = useState(false);
  const [interacted, setInteracted] = useState(false);
  const [showPrompt, setShowPrompt] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (!interacted || dismissed) return;
    const timer = setTimeout(() => setShowPrompt(true), ENGAGEMENT_PROMPT_MS);
    return () => clearTimeout(timer);
  }, [interacted, dismissed]);

  function handleTabChange(id: string) {
    setInteracted(true);
    setInitialApplied(true);
    setTab(id as DemoTabId);
  }

  const applyInitial = !initialApplied && tab === target.tab;

  return (
    <div className="mx-auto w-full max-w-[300px]" style={{ perspective: 1400 }}>
      <motion.div
        ref={ref}
        onPointerMove={reduced ? undefined : onPointerMove}
        onPointerLeave={reduced ? undefined : onPointerLeave}
        style={reduced ? undefined : { rotateX, rotateY }}
        className={cn(
          "relative rounded-[2.75rem] border border-ink/10 bg-surface/80 p-2 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.6)] backdrop-blur-sm",
          !reduced && "animate-float-slow"
        )}
      >
        <div className="flex min-h-[560px] flex-col rounded-[2.25rem] bg-gradient-to-b from-surface-raised to-surface p-5">
          <div className="mx-auto mb-4 h-1.5 w-16 shrink-0 rounded-full bg-ink/15" />

          <div className="flex-1">
            <AnimatePresence mode="wait">
              <motion.div
                key={tab}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
              >
                {tab === "home" && (
                  <HomeScreen highlight={applyInitial && target.tab === "home" ? target.highlight : undefined} />
                )}
                {tab === "patterns" && (
                  <PatternsScreen
                    highlight={applyInitial && target.tab === "patterns" ? target.highlight : undefined}
                  />
                )}
                {tab === "interventions" && (
                  <InterventionsScreen
                    initialStage={
                      applyInitial && target.tab === "interventions" ? target.stage ?? "idle" : "idle"
                    }
                  />
                )}
                {tab === "settings" && (
                  <SettingsScreen
                    highlight={applyInitial && target.tab === "settings" ? target.highlight : undefined}
                  />
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="mt-4 shrink-0">
            <TabBar active={tab} onChange={handleTabChange} />
          </div>
        </div>

        <AnimatePresence>
          {showPrompt && !dismissed && (
            <DownloadPromptModal
              onDismiss={() => {
                setShowPrompt(false);
                setDismissed(true);
              }}
            />
          )}
        </AnimatePresence>
      </motion.div>

      <p className="mt-4 text-center text-xs text-ink-muted">
        Tap around — this is a live preview, not a screenshot.
      </p>
    </div>
  );
}
