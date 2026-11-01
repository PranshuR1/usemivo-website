"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { AccountError, sitInRoom, viewRoom, type RoomView } from "@/lib/mivo-account";
import { formatClock } from "@/lib/study-session";

// What a friend sees at usemivo.app/room/<code>. No account, no app. Looking costs nothing; sitting
// with the person takes a first name and tells them you're here. The page keeps itself current:
// it goes live when they start studying and quiet when they stop.

const VIEW_MS = 10_000;
const SIT_MS = 30_000; // the room counts someone as sitting for 90 seconds after the last word
const VISITOR_KEY = "mivo.room.visitor";
const NAME_KEY = "mivo.room.name";
const CODE = /^[A-Za-z0-9]{10}$/;

function readStored(key: string): string {
  try {
    return window.localStorage.getItem(key) ?? "";
  } catch {
    return "";
  }
}

function writeStored(key: string, value: string) {
  try {
    window.localStorage.setItem(key, value);
  } catch {
    // Blocked storage only means the name isn't remembered next time.
  }
}

function visitorId(): string {
  const existing = readStored(VISITOR_KEY);
  if (existing) return existing;
  const made =
    typeof crypto !== "undefined" && "randomUUID" in crypto
      ? crypto.randomUUID()
      : "xxxxxxxx-xxxx-4xxx-8xxx-xxxxxxxxxxxx".replace(/x/g, () => Math.floor(Math.random() * 16).toString(16));
  writeStored(VISITOR_KEY, made);
  return made;
}

const primary = "block w-full rounded-lg bg-accent px-4 py-4 text-[15px] font-bold text-on-accent disabled:opacity-50";
const secondary = "block w-full rounded-lg bg-surface px-4 py-4 text-[15px] font-bold text-ink";

type Found = Extract<RoomView, { found: true }>;

export function RoomVisitor({ code }: { code: string }) {
  const valid = CODE.test(code);
  const [view, setView] = useState<RoomView | null>(valid ? null : { found: false });
  const [offline, setOffline] = useState(false);
  const [sitting, setSitting] = useState(false);
  const [name, setName] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  // Server time minus this device's time when the room was last read, so the clock is right even
  // if this device's is a few minutes off.
  const [offset, setOffset] = useState(0);
  const [now, setNow] = useState(() => Date.now());
  const lastSit = useRef(0);
  const sittingRef = useRef(false);
  const nameRef = useRef("");

  useEffect(() => {
    sittingRef.current = sitting;
    nameRef.current = name.trim();
  }, [sitting, name]);

  const accept = useCallback((next: RoomView) => {
    setView(next);
    setOffline(false);
    if (next.found) setOffset(Date.parse(next.now) - Date.now());
  }, []);

  const refresh = useCallback(async () => {
    if (!CODE.test(code)) return;
    try {
      if (sittingRef.current && nameRef.current && Date.now() - lastSit.current >= SIT_MS) {
        lastSit.current = Date.now();
        accept(await sitInRoom(code, visitorId(), nameRef.current));
      } else {
        accept(await viewRoom(code));
      }
    } catch (caught) {
      if (caught instanceof AccountError && caught.message === "You were removed from this room.") {
        setSitting(false);
        setMessage(caught.message);
      } else {
        setOffline(true);
      }
    }
  }, [code, accept]);

  useEffect(() => {
    if (!valid) return;
    /* eslint-disable react-hooks/set-state-in-effect -- storage only exists in the browser, so the saved name is read after mount */
    setName(readStored(NAME_KEY));
    /* eslint-enable react-hooks/set-state-in-effect */
    void refresh();
    const poll = window.setInterval(() => {
      if (document.visibilityState === "visible") void refresh();
    }, VIEW_MS);
    const tick = window.setInterval(() => setNow(Date.now()), 1000);
    const onVisible = () => {
      if (document.visibilityState === "visible") {
        setNow(Date.now());
        void refresh();
      }
    };
    document.addEventListener("visibilitychange", onVisible);
    return () => {
      window.clearInterval(poll);
      window.clearInterval(tick);
      document.removeEventListener("visibilitychange", onVisible);
    };
  }, [valid, refresh]);

  async function sit(event: React.FormEvent) {
    event.preventDefault();
    const clean = name.trim();
    if (!clean) return;
    setBusy(true);
    setMessage(null);
    try {
      writeStored(NAME_KEY, clean);
      lastSit.current = Date.now();
      accept(await sitInRoom(code, visitorId(), clean));
      setSitting(true);
    } catch (caught) {
      setMessage(caught instanceof AccountError ? caught.message : "Couldn't sit down. Please try again.");
    } finally {
      setBusy(false);
    }
  }

  function leave() {
    setSitting(false);
    setMessage(null);
  }

  return (
    <main className="grid min-h-screen place-items-center px-6 py-16">
      <section className="w-full max-w-md text-center">
        <div className="mx-auto mb-5 grid h-[72px] w-[72px] place-items-center rounded-lg bg-surface font-sans text-2xl font-extrabold text-accent-deep">
          mivo
        </div>

        {view === null ? (
          <p className="text-ink-muted">One moment…</p>
        ) : !view.found ? (
          <NotOpen />
        ) : (
          <Open
            view={view}
            elapsed={view.started_at ? Math.max(0, now + offset - Date.parse(view.started_at)) : 0}
            sitting={sitting}
            name={name}
            setName={setName}
            onSit={sit}
            onLeave={leave}
            busy={busy}
            message={message}
          />
        )}

        {offline && view?.found && (
          <p role="status" className="mt-4 text-[13px] text-ink-muted">
            Lost the connection. Trying again…
          </p>
        )}

        <p className="mt-10 text-[13px] leading-relaxed text-ink-muted">
          A Mivo study room shows a first name, what they&apos;re working on if they choose to share it, and a timer. No
          video, no account.{" "}
          <Link href="/" className="text-accent-deep underline underline-offset-4">
            About Mivo
          </Link>
        </p>
      </section>
    </main>
  );
}

function NotOpen() {
  return (
    <>
      <h1 className="font-display text-4xl italic text-ink">This room isn&apos;t open</h1>
      <p className="mt-4 text-[15px] leading-relaxed text-ink-body">
        The person may have closed it, or the link may have changed. Ask them for the current link.
      </p>
    </>
  );
}

function Open({
  view,
  elapsed,
  sitting,
  name,
  setName,
  onSit,
  onLeave,
  busy,
  message,
}: {
  view: Found;
  elapsed: number;
  sitting: boolean;
  name: string;
  setName: (value: string) => void;
  onSit: (event: React.FormEvent) => void;
  onLeave: () => void;
  busy: boolean;
  message: string | null;
}) {
  const others = view.sitting.length;
  return (
    <>
      {view.studying ? (
        <>
          <p className="text-[14px] text-ink-muted">{view.name} is studying</p>
          {view.task && <h1 className="mt-1 break-words font-display text-3xl italic text-ink">{view.task}</h1>}
          <p className="mt-8 font-sans text-7xl font-extrabold tabular-nums text-ink" aria-label="Time so far">
            {formatClock(elapsed)}
          </p>
        </>
      ) : (
        <>
          <h1 className="font-display text-4xl italic text-ink">{view.name} isn&apos;t studying right now</h1>
          <p className="mt-4 text-[15px] leading-relaxed text-ink-body">
            This page updates by itself. Leave it open and it goes live when {view.name} starts.
          </p>
        </>
      )}

      {sitting ? (
        <div className="mt-8">
          <p role="status" className="rounded-lg bg-surface px-4 py-4 text-[15px] text-ink">
            You&apos;re sitting with {view.name}.
            {others > 1 ? ` ${others - 1} other${others === 2 ? "" : "s"} here too.` : ""}
          </p>
          <button type="button" onClick={onLeave} className={`${secondary} mt-3`}>
            Leave
          </button>
          <p className="mt-3 text-[13px] text-ink-muted">Keep this page open while you sit.</p>
        </div>
      ) : (
        <form onSubmit={onSit} className="mt-8 text-left">
          <label htmlFor="name" className="text-[14px] font-bold text-ink">
            Sit with {view.name}
          </label>
          <p className="mt-1 text-[13px] text-ink-muted">Give a first name so they know it&apos;s you.</p>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
            maxLength={24}
            autoComplete="given-name"
            enterKeyHint="go"
            className="mt-3 block w-full rounded-lg bg-surface px-4 py-4 text-base text-ink placeholder:text-ink-muted"
            placeholder="Your first name"
          />
          <button type="submit" disabled={busy || !name.trim()} className={`${primary} mt-3`}>
            {busy ? "One moment…" : "Sit with them"}
          </button>
          {others > 0 && (
            <p className="mt-3 text-center text-[13px] text-ink-muted">
              {others === 1 ? "1 person is" : `${others} people are`} sitting here now.
            </p>
          )}
        </form>
      )}

      {message && (
        <p role="alert" className="mt-4 text-[14px] text-red-900">
          {message}
        </p>
      )}
    </>
  );
}
