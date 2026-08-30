"use client";

import { motion } from "framer-motion";
import { X } from "lucide-react";
import { downloadPrompt, appStoreUrl } from "@/data/content";

export function DownloadPromptModal({ onDismiss }: { onDismiss: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute inset-2 z-10 flex items-end rounded-[2.25rem] bg-bg/70 backdrop-blur-sm"
    >
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 16 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        className="relative m-3 w-[calc(100%-1.5rem)] rounded-3xl border border-accent/25 bg-surface p-5 text-center shadow-[0_20px_60px_-15px_rgba(0,0,0,0.7)]"
      >
        <button
          type="button"
          onClick={onDismiss}
          className="absolute right-3 top-3 flex h-7 w-7 items-center justify-center rounded-full text-ink-muted hover:bg-ink/10 hover:text-ink"
          aria-label="Dismiss"
        >
          <X size={14} />
        </button>

        <p className="text-base font-semibold text-ink">{downloadPrompt.heading}</p>
        <p className="mt-2 text-[13px] leading-relaxed text-ink-body">{downloadPrompt.body}</p>

        <a
          href={appStoreUrl}
          target="_blank"
          rel="noreferrer noopener"
          onClick={onDismiss}
          className="mt-4 inline-flex h-11 w-full items-center justify-center rounded-full bg-accent text-sm font-medium text-bg transition-colors hover:bg-accent-deep"
        >
          {downloadPrompt.cta}
        </a>
        <button
          type="button"
          onClick={onDismiss}
          className="mt-3 text-xs text-ink-muted hover:text-ink-body"
        >
          {downloadPrompt.dismiss}
        </button>
      </motion.div>
    </motion.div>
  );
}
