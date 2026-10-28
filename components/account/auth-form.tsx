"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Field, FormError, FormNote } from "@/components/account/field";
import {
  AccountError,
  createAccount,
  oauthUrl,
  requestPasswordReset,
  signInWithPassword,
  type Provider,
} from "@/lib/mivo-account";
import { cn } from "@/lib/utils";

type Mode = "signin" | "register" | "forgot";

const link = "text-accent-deep underline underline-offset-4 hover:text-ink";

function OAuthButton({ provider, label }: { provider: Provider; label: string }) {
  return (
    <button
      type="button"
      onClick={() => {
        window.location.href = oauthUrl(provider);
      }}
      className="inline-flex h-12 w-full items-center justify-center rounded-full border border-ink/15 bg-white text-sm font-medium text-ink shadow-sm transition-colors hover:border-ink/30 hover:bg-surface"
    >
      {label}
    </button>
  );
}

export function AuthForm({ notice }: { notice: string | null }) {
  const [mode, setMode] = useState<Mode>("signin");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(notice);
  const [message, setMessage] = useState<string | null>(null);

  function switchMode(next: Mode) {
    setMode(next);
    setError(null);
    setMessage(null);
  }

  async function submit(event: React.FormEvent) {
    event.preventDefault();
    setError(null);
    setMessage(null);

    if (mode === "register" && password.length < 8) {
      setError("Use a password with at least 8 characters.");
      return;
    }

    setBusy(true);
    try {
      if (mode === "signin") {
        await signInWithPassword(email, password);
      } else if (mode === "register") {
        const outcome = await createAccount(name, email, password);
        if (outcome === "check-email") setMessage("Almost there. We sent a confirmation link to your email. Open it, then sign in here.");
      } else {
        await requestPasswordReset(email);
        setMessage("If there's a Mivo account for that email, a link to choose a new password is on its way.");
      }
    } catch (caught) {
      setError(caught instanceof AccountError ? caught.message : "Something went wrong. Please try again.");
    } finally {
      setBusy(false);
    }
  }

  const heading = { signin: "Sign in", register: "Create your account", forgot: "Reset your password" }[mode];

  return (
    <div className="mx-auto w-full max-w-md rounded-3xl border border-ink/10 bg-surface p-7 shadow-lift sm:p-9">
      {mode !== "forgot" && (
        <div role="tablist" className="mb-7 grid grid-cols-2 rounded-full bg-ink/5 p-1">
          {(["signin", "register"] as const).map((tab) => (
            <button
              key={tab}
              type="button"
              role="tab"
              aria-selected={mode === tab}
              onClick={() => switchMode(tab)}
              className={cn(
                "h-10 rounded-full text-sm font-medium transition-colors",
                mode === tab ? "bg-espresso text-cream shadow-sm" : "text-ink-body hover:text-ink"
              )}
            >
              {tab === "signin" ? "Sign in" : "Create account"}
            </button>
          ))}
        </div>
      )}

      <h2 className="font-display text-3xl text-ink">{heading}</h2>
      {mode === "register" && (
        <p className="mt-2 text-sm leading-relaxed text-ink-body">
          This is the same account you use in the Mivo app, so your Spots and orders stay together.
        </p>
      )}

      <form onSubmit={submit} className="mt-6 space-y-4">
        {mode === "register" && (
          <Field label="Your name" value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" required />
        )}
        <Field
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="email"
          inputMode="email"
          required
        />
        {mode !== "forgot" && (
          <Field
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete={mode === "signin" ? "current-password" : "new-password"}
            minLength={mode === "register" ? 8 : undefined}
            required
          />
        )}

        {error && <FormError>{error}</FormError>}
        {message && <FormNote>{message}</FormNote>}

        <Button type="submit" busy={busy} className="w-full">
          {mode === "signin" ? "Sign in" : mode === "register" ? "Create account" : "Send reset link"}
        </Button>
      </form>

      {mode === "signin" && (
        <button type="button" onClick={() => switchMode("forgot")} className={cn("mt-4 text-sm", link)}>
          Forgot your password?
        </button>
      )}
      {mode === "forgot" && (
        <button type="button" onClick={() => switchMode("signin")} className={cn("mt-4 text-sm", link)}>
          Back to sign in
        </button>
      )}

      {mode !== "forgot" && (
        <>
          <div className="my-6 flex items-center gap-4 text-xs uppercase tracking-[0.18em] text-ink-muted">
            <span className="h-px flex-1 bg-ink/10" />
            or
            <span className="h-px flex-1 bg-ink/10" />
          </div>
          <div className="space-y-3">
            <OAuthButton provider="apple" label="Continue with Apple" />
            <OAuthButton provider="google" label="Continue with Google" />
          </div>
        </>
      )}

      {mode === "register" && (
        <p className="mt-6 text-xs leading-relaxed text-ink-muted">
          By creating an account you agree to the{" "}
          <Link href="/terms" className={link}>
            Terms of Use
          </Link>{" "}
          and{" "}
          <Link href="/privacy" className={link}>
            Privacy Policy
          </Link>
          .
        </p>
      )}
    </div>
  );
}
