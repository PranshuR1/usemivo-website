"use client";

import { useCallback, useEffect, useState } from "react";
import { Check, Copy, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Field, FormError, FormNote } from "@/components/account/field";
import { StudyUnavailable } from "@/components/account/study-panel";
import {
  AccountError,
  ensureRoom,
  fetchMyRoom,
  removeSitter,
  rotateRoomCode,
  updateRoom,
  type StudyRoom,
} from "@/lib/mivo-account";
import { formatClock } from "@/lib/study-session";
import { cn } from "@/lib/utils";

type Room = Extract<StudyRoom, { has_room: true }>;

const POLL_MS = 15_000;

function Switch({ checked, onChange, label, disabled }: { checked: boolean; onChange: (next: boolean) => void; label: string; disabled?: boolean }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      disabled={disabled}
      onClick={() => onChange(!checked)}
      className={cn(
        "relative h-7 w-12 shrink-0 rounded-full transition-colors disabled:opacity-60",
        checked ? "bg-kept" : "bg-ink/20"
      )}
    >
      <span
        className={cn(
          "absolute left-0.5 top-0.5 h-6 w-6 rounded-full bg-white shadow transition-transform",
          checked && "translate-x-5"
        )}
      />
    </button>
  );
}

function messageOf(caught: unknown) {
  return caught instanceof AccountError ? caught.message : "Something went wrong. Please try again.";
}

export function RoomPanel() {
  const [room, setRoom] = useState<Room | null>(null);
  const [state, setState] = useState<"loading" | "ready" | "unavailable" | "error">("loading");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [nameSaved, setNameSaved] = useState(false);
  const [copied, setCopied] = useState(false);
  const [confirming, setConfirming] = useState(false);
  const [now, setNow] = useState(() => Date.now());

  const accept = useCallback((next: StudyRoom) => {
    if (next.has_room) {
      setRoom(next);
      setState("ready");
    }
  }, []);

  // Make the room if there isn't one (it starts closed), then keep it fresh so a session started
  // on the phone shows up here, along with whoever is sitting.
  useEffect(() => {
    let cancelled = false;
    ensureRoom()
      .then((next) => {
        if (cancelled || !next.has_room) return;
        accept(next);
        setName(next.display_name);
      })
      .catch((caught) => {
        if (cancelled) return;
        setError(messageOf(caught));
        setState(caught instanceof AccountError && caught.code === "unavailable" ? "unavailable" : "error");
      });
    return () => {
      cancelled = true;
    };
  }, [accept]);

  useEffect(() => {
    if (state !== "ready") return;
    const id = window.setInterval(() => {
      if (document.visibilityState !== "visible") return;
      setNow(Date.now());
      fetchMyRoom()
        .then(accept)
        .catch(() => {});
    }, POLL_MS);
    const tick = window.setInterval(() => setNow(Date.now()), 1000);
    return () => {
      window.clearInterval(id);
      window.clearInterval(tick);
    };
  }, [state, accept]);

  async function run<T extends StudyRoom | null>(label: string, action: () => Promise<T>, after?: (next: T) => void) {
    setBusy(label);
    setError(null);
    try {
      const next = await action();
      if (next && next.has_room) accept(next);
      after?.(next);
    } catch (caught) {
      setError(messageOf(caught));
    } finally {
      setBusy(null);
    }
  }

  if (state === "loading") return <p className="py-10 text-center text-ink-muted">Opening your room…</p>;
  if (state === "unavailable") return <StudyUnavailable />;
  if (state === "error" || !room) {
    return (
      <div className="space-y-4">
        <FormError>{error ?? "Couldn't load your room."}</FormError>
        <Button variant="secondary" onClick={() => window.location.reload()}>
          Try again
        </Button>
      </div>
    );
  }

  const link = `${window.location.origin}/room/${room.code}`;
  const elapsed = room.started_at ? Math.max(0, now - Date.parse(room.started_at)) : 0;

  async function copy() {
    try {
      await navigator.clipboard.writeText(link);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setError("Couldn't copy the link. Select it and copy it by hand.");
    }
  }

  async function share() {
    try {
      await navigator.share({ title: "Study with me", text: `${room!.display_name} is studying. Sit with them:`, url: link });
    } catch {
      // Closed the share sheet.
    }
  }

  return (
    <div className="space-y-5">
      <section className="rounded-3xl border border-ink/10 bg-surface p-6 shadow-card sm:p-7">
        <div className="flex items-start justify-between gap-5">
          <div>
            <h3 className="text-lg font-semibold text-ink">Your study room</h3>
            <p className="mt-1 max-w-md text-sm leading-relaxed text-ink-body">
              One link. While it&apos;s open and you&apos;re studying, anyone who has it can see that you&apos;re studying and
              for how long, and sit with you. They don&apos;t need the app or an account.
            </p>
          </div>
          <Switch
            checked={room.is_open}
            label={room.is_open ? "Room is open" : "Room is closed"}
            disabled={busy !== null}
            onChange={(next) => void run("open", () => updateRoom({ is_open: next }))}
          />
        </div>
        <p className="mt-3 text-sm font-medium text-ink">{room.is_open ? "Open: people with your link can see it." : "Closed: your link shows nothing."}</p>

        <div
          className={cn(
            "mt-5 rounded-2xl px-5 py-4",
            room.studying ? "bg-espresso text-cream" : "bg-bg-alt text-ink-body"
          )}
          aria-live="polite"
        >
          {room.studying ? (
            <>
              <p className="text-xs font-medium uppercase tracking-[0.16em] text-cream-muted">Studying now</p>
              <p className="mt-1 break-words font-display text-2xl text-cream">{room.task}</p>
              <p className="mt-1 text-lg font-semibold tabular-nums text-accent">{formatClock(elapsed)}</p>
            </>
          ) : (
            <p className="text-sm leading-relaxed">
              You&apos;re not in a session. Start one in the Mivo app, or on this site&apos;s study page while signed in, and your room
              goes live.
            </p>
          )}
        </div>

        <div className="mt-5">
          <p className="text-sm font-medium text-ink">Your link</p>
          <div className="mt-1.5 flex flex-wrap items-center gap-2">
            <code className="min-w-0 flex-1 break-all rounded-xl bg-bg-alt px-4 py-3 font-mono text-[13px] text-ink">{link}</code>
            <Button variant="secondary" onClick={copy} className="h-11">
              {copied ? <Check size={16} /> : <Copy size={16} />}
              {copied ? "Copied" : "Copy"}
            </Button>
            {typeof navigator !== "undefined" && "share" in navigator && (
              <Button variant="secondary" onClick={share} className="h-11" aria-label="Share link">
                <Share2 size={16} />
              </Button>
            )}
          </div>
        </div>

        {error && (
          <div className="mt-4">
            <FormError>{error}</FormError>
          </div>
        )}
      </section>

      <section className="rounded-3xl border border-ink/10 bg-surface p-6 shadow-card sm:p-7">
        <h3 className="text-lg font-semibold text-ink">Sitting with you</h3>
        {room.sitting.length === 0 ? (
          <p className="mt-2 text-sm leading-relaxed text-ink-body">
            Nobody is here right now. People show up while they have your link open and have said they&apos;re sitting
            with you.
          </p>
        ) : (
          <ul className="mt-3 divide-y divide-ink/10">
            {room.sitting.map((sitter) => (
              <li key={sitter.id} className="flex items-center justify-between gap-3 py-2.5">
                <span className="break-words font-medium text-ink">{sitter.name}</span>
                <button
                  type="button"
                  disabled={busy !== null}
                  onClick={() => void run("remove", () => removeSitter(sitter.id))}
                  className="text-sm text-ink-muted underline underline-offset-4 hover:text-ink disabled:opacity-50"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="rounded-3xl border border-ink/10 bg-surface p-6 shadow-card sm:p-7">
        <h3 className="text-lg font-semibold text-ink">What people see</h3>
        <form
          className="mt-4 flex flex-wrap items-end gap-3"
          onSubmit={(event) => {
            event.preventDefault();
            setNameSaved(false);
            void run("name", () => updateRoom({ display_name: name }), (next) => {
              if (next?.has_room) {
                setName(next.display_name);
                setNameSaved(true);
              }
            });
          }}
        >
          <Field
            label="Your first name"
            value={name}
            onChange={(event) => {
              setName(event.target.value);
              setNameSaved(false);
            }}
            maxLength={24}
            required
            className="min-w-52 flex-1"
          />
          <Button type="submit" variant="dark" busy={busy === "name"} disabled={name.trim() === room.display_name}>
            Save name
          </Button>
        </form>
        {nameSaved && (
          <div className="mt-3">
            <FormNote>Saved.</FormNote>
          </div>
        )}

        <div className="mt-6 flex items-start justify-between gap-5 border-t border-ink/10 pt-5">
          <div>
            <p className="font-medium text-ink">Show what I&apos;m working on</p>
            <p className="mt-0.5 text-sm text-ink-body">
              Off, visitors see that you&apos;re studying and for how long, but not the task.
            </p>
          </div>
          <Switch
            checked={room.show_task}
            label="Show what I'm working on"
            disabled={busy !== null}
            onChange={(next) => void run("task", () => updateRoom({ show_task: next }))}
          />
        </div>

        <p className="mt-5 rounded-xl bg-bg-alt px-4 py-3 text-sm leading-relaxed text-ink-body">
          Visitors see your first name, the task if it&apos;s on, and the time. Never your video, your email or your account.
          Visitors give a first name to sit; nothing else.
        </p>
      </section>

      <section className="rounded-3xl border border-ink/10 bg-surface p-6 shadow-card sm:p-7">
        <h3 className="text-lg font-semibold text-ink">Link controls</h3>
        <p className="mt-1 text-sm leading-relaxed text-ink-body">
          Shared your link with someone you don&apos;t want in? Make a new one. The old link stops working at once and
          everyone sitting is sent away.
        </p>
        <div className="mt-4 flex flex-wrap items-center gap-3">
          {confirming ? (
            <>
              <Button variant="danger" busy={busy === "rotate"} onClick={() => void run("rotate", rotateRoomCode, () => setConfirming(false))}>
                Yes, make a new link
              </Button>
              <Button variant="ghost" onClick={() => setConfirming(false)}>
                Keep it
              </Button>
            </>
          ) : (
            <Button variant="secondary" onClick={() => setConfirming(true)}>
              Make a new link
            </Button>
          )}
        </div>
      </section>
    </div>
  );
}
