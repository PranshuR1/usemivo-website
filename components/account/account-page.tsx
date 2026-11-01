"use client";

import { useState, useSyncExternalStore } from "react";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { AuthForm } from "@/components/account/auth-form";
import { SpotsPanel } from "@/components/account/spots-panel";
import { OrdersPanel } from "@/components/account/orders-panel";
import { RoomPanel } from "@/components/account/room-panel";
import { StudyPanel } from "@/components/account/study-panel";
import { TodayPanel, type TabId } from "@/components/account/today-panel";
import { PasswordForm, SettingsPanel } from "@/components/account/settings-panel";
import { getAccountState, getServerAccountState, subscribeToAccount } from "@/lib/mivo-account";
import { cn } from "@/lib/utils";

const tabs: { id: TabId; label: string }[] = [
  { id: "today", label: "Today" },
  { id: "study", label: "Study" },
  { id: "room", label: "Room" },
  { id: "spots", label: "Spots" },
  { id: "orders", label: "Orders" },
  { id: "account", label: "Account" },
];

// The tab lives in the address (#study), so a refresh or a shared link lands on the same tab.
function tabFromAddress(): TabId {
  if (typeof window === "undefined") return "today";
  const wanted = window.location.hash.slice(1);
  return tabs.find((item) => item.id === wanted)?.id ?? "today";
}

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
  const [tab, setTabState] = useState<TabId>(tabFromAddress);

  function setTab(next: TabId) {
    setTabState(next);
    window.history.replaceState(null, "", `#${next}`);
    window.scrollTo({ top: 0 });
  }

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
    <Shell eyebrow="Account" title={`Hi, ${first}.`} intro="Your study, your room, your Spots and your orders in one place.">
      <div role="tablist" className="-mx-1 mb-8 flex max-w-full overflow-x-auto px-1 pb-1 [scrollbar-width:none]">
        <div className="inline-flex rounded-full bg-ink/5 p-1">
        {tabs.map((item) => (
          <button
            key={item.id}
            type="button"
            role="tab"
            aria-selected={tab === item.id}
            onClick={() => setTab(item.id)}
            className={cn(
              "h-10 shrink-0 rounded-full px-4 text-sm font-medium transition-colors sm:px-5",
              tab === item.id ? "bg-espresso text-cream shadow-sm" : "text-ink-body hover:text-ink"
            )}
          >
            {item.label}
          </button>
        ))}
        </div>
      </div>

      {tab === "today" && <TodayPanel onOpen={setTab} />}
      {tab === "study" && <StudyPanel />}
      {tab === "room" && <RoomPanel />}
      {tab === "spots" && <SpotsPanel />}
      {tab === "orders" && <OrdersPanel />}
      {tab === "account" && <SettingsPanel session={session} />}
    </Shell>
  );
}
