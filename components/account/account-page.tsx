"use client";

import { useState, useSyncExternalStore } from "react";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { AuthForm } from "@/components/account/auth-form";
import { SpotsPanel } from "@/components/account/spots-panel";
import { OrdersPanel } from "@/components/account/orders-panel";
import { PasswordForm, SettingsPanel } from "@/components/account/settings-panel";
import { getAccountState, getServerAccountState, subscribeToAccount } from "@/lib/mivo-account";
import { cn } from "@/lib/utils";

const tabs = [
  { id: "spots", label: "My Spots" },
  { id: "orders", label: "Orders" },
  { id: "account", label: "Account" },
] as const;

type TabId = (typeof tabs)[number]["id"];

function Shell({ eyebrow, title, intro, children }: { eyebrow: string; title: string; intro?: string; children: React.ReactNode }) {
  return (
    <>
      <Nav />
      <main className="relative min-h-[70vh] pb-28 pt-36">
        <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[420px] bg-[radial-gradient(55%_70%_at_50%_0%,rgb(212_135_42/0.16),transparent_70%)]" />
        <Container className="max-w-3xl">
          <Eyebrow>{eyebrow}</Eyebrow>
          <h1 className="mt-6 text-balance font-display text-5xl leading-[1.04] tracking-[-0.015em] text-ink sm:text-6xl">
            {title}
          </h1>
          {intro && <p className="mt-5 max-w-xl text-lg leading-relaxed text-ink-body">{intro}</p>}
          <div className="mt-10">{children}</div>
        </Container>
      </main>
      <Footer />
    </>
  );
}

export function AccountPage() {
  const account = useSyncExternalStore(subscribeToAccount, getAccountState, getServerAccountState);
  const [tab, setTab] = useState<TabId>("spots");

  if (!account.ready) {
    return (
      <Shell eyebrow="Account" title="Your Mivo account.">
        <p className="text-ink-muted">One moment…</p>
      </Shell>
    );
  }

  if (!account.session) {
    return (
      <Shell
        eyebrow="Account"
        title="Your Mivo account."
        intro="Sign in to see your Spots, track your orders and manage your account. It's the same account you use in the Mivo app."
      >
        <AuthForm notice={account.notice} />
      </Shell>
    );
  }

  if (account.recovery) {
    return (
      <Shell eyebrow="Account" title="Choose a new password.">
        <div className="max-w-md rounded-3xl border border-ink/10 bg-surface p-7 shadow-lift">
          <PasswordForm heading="New password" />
        </div>
      </Shell>
    );
  }

  const { session } = account;
  const first = (session.user.name ?? session.user.email).split(/[\s@]/)[0];

  return (
    <Shell eyebrow="Account" title={`Hi, ${first}.`} intro="Everything about your Mivo Spots in one place.">
      <div role="tablist" className="mb-8 inline-flex rounded-full bg-ink/5 p-1">
        {tabs.map((item) => (
          <button
            key={item.id}
            type="button"
            role="tab"
            aria-selected={tab === item.id}
            onClick={() => setTab(item.id)}
            className={cn(
              "h-10 rounded-full px-5 text-sm font-medium transition-colors",
              tab === item.id ? "bg-espresso text-cream shadow-sm" : "text-ink-body hover:text-ink"
            )}
          >
            {item.label}
          </button>
        ))}
      </div>

      {tab === "spots" && <SpotsPanel />}
      {tab === "orders" && <OrdersPanel />}
      {tab === "account" && <SettingsPanel session={session} />}
    </Shell>
  );
}
