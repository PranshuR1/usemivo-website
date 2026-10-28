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
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:px-6">
      <div className="mx-auto max-w-5xl rounded-[1.75rem] border border-ink/10 bg-bg/80 shadow-[0_10px_40px_-18px_rgb(42_26_14/0.35)] backdrop-blur-xl">
        <div className="flex h-14 items-center justify-between pl-4 pr-2 sm:pl-5">
          <Link href="/" className="flex items-center gap-2.5">
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

          <nav className="hidden items-center gap-1 md:flex">
            {nav.links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-full px-3.5 py-2 text-sm text-ink-body transition-colors hover:bg-ink/5 hover:text-ink"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-1 md:flex">
            <Link
              href="/account"
              className="rounded-full px-3.5 py-2 text-sm font-medium text-ink transition-colors hover:bg-ink/5"
            >
              Account
            </Link>
            <DownloadDropdown />
          </div>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="flex h-10 w-10 items-center justify-center rounded-full text-ink hover:bg-ink/5 md:hidden"
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
              <div className="flex flex-col gap-1 px-4 py-4">
                {nav.links.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="rounded-xl px-3 py-2.5 text-[15px] text-ink-body hover:bg-ink/5 hover:text-ink"
                  >
                    {link.label}
                  </Link>
                ))}
                <Link
                  href="/account"
                  onClick={() => setOpen(false)}
                  className="rounded-xl px-3 py-2.5 text-[15px] font-medium text-ink hover:bg-ink/5"
                >
                  Account
                </Link>
                <Link
                  href={appStoreUrl}
                  target="_blank"
                  rel="noreferrer noopener"
                  onClick={() => setOpen(false)}
                  className="mt-2 inline-flex h-11 items-center justify-center rounded-full bg-accent text-sm font-medium text-on-accent"
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
      </div>
    </header>
  );
}
