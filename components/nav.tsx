"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { nav, appStoreUrl, macDownloadUrl, windowsDownloadUrl } from "@/data/content";
import { DownloadDropdown } from "./download-dropdown";

export function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-ink/10 bg-bg/70 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6 sm:px-8">
        <Link href="#top" className="flex items-center gap-2.5">
          <Image
            src="/images/mivo-logo.png"
            alt="Mivo"
            width={32}
            height={32}
            className="rounded-lg"
            priority
          />
          <span className="text-base font-semibold tracking-tight text-ink">Mivo</span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {nav.links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-ink-body transition-colors hover:text-ink"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden md:block">
          <DownloadDropdown />
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="flex h-10 w-10 items-center justify-center rounded-full text-ink md:hidden"
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="overflow-hidden border-t border-ink/10 md:hidden"
          >
            <div className="flex flex-col gap-1 px-6 py-4">
              {nav.links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="rounded-lg px-2 py-2.5 text-sm text-ink-body hover:bg-ink/5 hover:text-ink"
                >
                  {link.label}
                </a>
              ))}
              <Link
                href={appStoreUrl}
                target="_blank"
                rel="noreferrer noopener"
                onClick={() => setOpen(false)}
                className="mt-2 inline-flex h-11 items-center justify-center rounded-full bg-accent text-sm font-medium text-bg"
              >
                Download for iOS
              </Link>
              <Link
                href={macDownloadUrl}
                download
                onClick={() => setOpen(false)}
                className="inline-flex h-11 items-center justify-center rounded-full border border-ink/15 text-sm font-medium text-ink hover:bg-ink/5"
              >
                Download for macOS
              </Link>
              <Link
                href={windowsDownloadUrl}
                download
                onClick={() => setOpen(false)}
                className="mt-1 inline-flex items-center justify-center gap-1.5 rounded-full px-2 py-2 text-xs text-ink-muted hover:text-ink"
              >
                Mivo is now on Windows (beta) — download
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
