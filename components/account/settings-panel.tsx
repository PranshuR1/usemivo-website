"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Field, FormError, FormNote } from "@/components/account/field";
import { AccountError, deleteStudyHistory, signOut, updatePassword, type Session } from "@/lib/mivo-account";

export function PasswordForm({ onDone, heading = "Change your password" }: { onDone?: () => void; heading?: string }) {
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);

  async function submit(event: React.FormEvent) {
    event.preventDefault();
    setError(null);
    setSaved(false);
    if (password.length < 8) {
      setError("Use a password with at least 8 characters.");
      return;
    }
    setBusy(true);
    try {
      await updatePassword(password);
      setPassword("");
      setSaved(true);
      onDone?.();
    } catch (caught) {
      setError(caught instanceof AccountError ? caught.message : "Couldn't update your password. Please try again.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <form onSubmit={submit} className="space-y-4">
      <h3 className="text-lg font-semibold text-ink">{heading}</h3>
      <Field
        label="New password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        autoComplete="new-password"
        minLength={8}
        required
      />
      {error && <FormError>{error}</FormError>}
      {saved && <FormNote>Your password is updated.</FormNote>}
      <Button type="submit" busy={busy} variant="dark">
        Save password
      </Button>
    </form>
  );
}

function StudyDataSection() {
  const [confirming, setConfirming] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [removed, setRemoved] = useState<number | null>(null);

  async function remove() {
    setBusy(true);
    setError(null);
    try {
      setRemoved(await deleteStudyHistory());
      setConfirming(false);
    } catch (caught) {
      setError(caught instanceof AccountError ? caught.message : "Couldn't delete your study history. Please try again.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <section className="rounded-3xl border border-ink/10 bg-surface p-6 text-sm leading-relaxed text-ink-body shadow-card sm:p-7">
      <h3 className="text-lg font-semibold text-ink">Your study data</h3>
      <p className="mt-2">
        Finished study sessions (the task, when it started and ended, and how long was on video) are saved to your
        account so the app and this site show the same streak. The video itself never leaves your phone. Your study room
        shows only what you choose on the Room tab.
      </p>
      <div className="mt-4 space-y-3">
        {error && <FormError>{error}</FormError>}
        {removed !== null && (
          <FormNote>
            {removed === 0 ? "There was no saved study history to delete." : `Deleted ${removed} saved ${removed === 1 ? "session" : "sessions"}.`} Your phone keeps its own copy.
          </FormNote>
        )}
        {confirming ? (
          <div className="flex flex-wrap items-center gap-3">
            <Button variant="danger" busy={busy} onClick={remove}>
              Yes, delete saved history
            </Button>
            <Button variant="ghost" onClick={() => setConfirming(false)} disabled={busy}>
              Keep it
            </Button>
          </div>
        ) : (
          <Button variant="secondary" onClick={() => setConfirming(true)}>
            Delete saved study history
          </Button>
        )}
      </div>
    </section>
  );
}

const providerLabel: Record<string, string> = { email: "Email and password", google: "Google", apple: "Apple" };

export function SettingsPanel({ session }: { session: Session }) {
  return (
    <div className="space-y-5">
      <section className="rounded-3xl border border-ink/10 bg-surface p-6 shadow-card sm:p-7">
        <h3 className="text-lg font-semibold text-ink">Your account</h3>
        <dl className="mt-4 grid gap-4 text-sm sm:grid-cols-2">
          {session.user.name && (
            <div>
              <dt className="text-ink-muted">Name</dt>
              <dd className="mt-0.5 text-ink">{session.user.name}</dd>
            </div>
          )}
          <div>
            <dt className="text-ink-muted">Email</dt>
            <dd className="mt-0.5 break-all text-ink">{session.user.email}</dd>
          </div>
          <div>
            <dt className="text-ink-muted">Signs in with</dt>
            <dd className="mt-0.5 text-ink">{providerLabel[session.user.provider] ?? session.user.provider}</dd>
          </div>
        </dl>
        <div className="mt-6 border-t border-ink/10 pt-5">
          <Button variant="secondary" onClick={() => void signOut()}>
            Sign out
          </Button>
        </div>
      </section>

      <section className="rounded-3xl border border-ink/10 bg-surface p-6 shadow-card sm:p-7">
        <PasswordForm heading={session.user.provider === "email" ? "Change your password" : "Add a password"} />
        {session.user.provider !== "email" && (
          <p className="mt-3 text-sm text-ink-muted">
            You sign in with {providerLabel[session.user.provider] ?? session.user.provider}. A password is optional and
            lets you sign in with your email too.
          </p>
        )}
      </section>

      <StudyDataSection />

      <section className="rounded-3xl border border-ink/10 bg-surface p-6 text-sm leading-relaxed text-ink-body shadow-card sm:p-7">
        <h3 className="text-lg font-semibold text-ink">Deleting your account</h3>
        <p className="mt-2">
          You can delete your account and all of its data from the Mivo app under Settings, Account. See our{" "}
          <Link href="/privacy" className="text-accent-deep underline underline-offset-4">
            Privacy Policy
          </Link>{" "}
          for what we keep.
        </p>
      </section>
    </div>
  );
}
