import Link from "next/link";
import { Check, Nfc } from "lucide-react";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { ComingSoon } from "@/components/ui/coming-soon";
import { Faq } from "@/components/faq";
import { SpotStatus } from "@/components/spot/spot-status";
import { appStoreUrl, comingSoonNote, footer } from "@/data/content";
import {
  bannerSteps,
  goodToKnow,
  modes,
  privacyPoints,
  setupSteps,
  tapOutcomes,
  troubleshooting,
} from "@/data/spot-guide";
import { formatSpotId, normalizeSpotId, spotOpenUrl, type SpotLinkKind } from "@/lib/spot-id";

const primaryButton =
  "inline-flex h-12 items-center justify-center rounded-full bg-accent px-7 text-sm font-medium text-on-accent shadow-[inset_0_1px_0_rgb(255_255_255/0.35),0_10px_24px_-10px_rgb(212_135_42/0.9)] transition hover:-translate-y-0.5 hover:brightness-105";
const secondaryButton =
  "inline-flex h-12 items-center justify-center rounded-full border border-ink/15 bg-surface px-7 text-sm font-medium text-ink shadow-sm transition hover:border-ink/30 hover:bg-white";
const underlined = "text-accent-deep underline underline-offset-4 hover:text-ink";

function SectionTitle({ id, kicker, title, sub }: { id: string; kicker: string; title: string; sub?: string }) {
  return (
    <div id={id} className="max-w-2xl scroll-mt-28">
      <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-accent-deep">{kicker}</p>
      <h2 className="mt-3 text-balance font-display text-4xl leading-[1.06] tracking-[-0.015em] text-ink sm:text-5xl">
        {title}
      </h2>
      {sub && <p className="mt-4 text-[17px] leading-relaxed text-ink-body">{sub}</p>}
    </div>
  );
}

function TagArt() {
  return (
    <div className="relative mx-auto flex h-32 w-32 items-center justify-center" aria-hidden="true">
      {[0, 1, 2].map((ring) => (
        <span
          key={ring}
          className="absolute animate-pulse-soft rounded-full border border-accent/50"
          style={{ inset: `${ring * 16}px`, animationDelay: `${ring * 0.4}s` }}
        />
      ))}
      <span className="flex h-12 w-12 items-center justify-center rounded-full bg-accent text-on-accent shadow-[0_0_28px_rgb(212_135_42/0.7)]">
        <Nfc size={22} />
      </span>
    </div>
  );
}

export function SpotPage({
  kind,
  id,
  extraAction,
}: {
  kind: SpotLinkKind;
  id: string;
  extraAction?: React.ReactNode;
}) {
  const official = kind === "official";
  const spotId = official ? normalizeSpotId(id) : null;
  const help = `mailto:${footer.contact.email}?subject=${encodeURIComponent(
    spotId ? `Mivo Spot ${spotId}` : "A Mivo Spot"
  )}`;

  const jumps = [
    ...(official ? [{ href: "#set-up", label: "Set it up" }] : []),
    { href: "#modes", label: "Ways to use it" },
    { href: "#banner", label: "Skip the banner" },
    { href: "#help", label: "If something's wrong" },
    ...(official ? [{ href: "#privacy", label: "Privacy" }] : []),
  ];

  return (
    <>
      <Nav />
      <main className="relative pb-24 pt-32 sm:pt-36">
        <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[520px] bg-[radial-gradient(55%_70%_at_50%_0%,rgb(212_135_42/0.18),transparent_70%)]" />

        <Container>
          {/* Hero */}
          <section className="grid items-start gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-14">
            <div>
              <div className="flex flex-wrap items-center gap-3">
                <Eyebrow>{official ? "Official Mivo Spot" : "Mivo Spot, first version"}</Eyebrow>
                <ComingSoon>{comingSoonNote}</ComingSoon>
              </div>
              <h1 className="mt-6 text-balance font-display text-5xl leading-[1.02] tracking-[-0.02em] text-ink sm:text-6xl">
                {official ? "This is a Mivo Spot." : "This is an early Mivo Spot."}
              </h1>
              <p className="mt-5 max-w-xl text-lg leading-relaxed text-ink-body">
                {official
                  ? "A small NFC tag that turns a place into a way to use your phone on purpose: your desk, your bedside, the car. Tap it with your iPhone to set it up the first time, then tap it any time to start the Spot, and again to end it."
                  : "A sticker someone wrote themselves with the first version of Mivo Spots. It still works: tap it with an iPhone that has Mivo and it starts the Spot it was made for. Official Mivo Spots from usemivo.app are the newer version."}
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <a href={spotOpenUrl(kind, id)} className={primaryButton}>
                  Open in Mivo
                </a>
                <a href={appStoreUrl} className={secondaryButton}>
                  Get Mivo on the App Store
                </a>
              </div>
              {extraAction && <div className="mt-3 max-w-sm">{extraAction}</div>}
              <p className="mt-5 max-w-xl text-sm leading-relaxed text-ink-muted">
                Landed here after tapping the Spot? That means your phone didn&apos;t hand the tap to Mivo. Usually Mivo
                isn&apos;t installed or needs the update that adds Spots. Install or update it, then tap the Spot again.
              </p>

              <nav aria-label="On this page" className="mt-8 flex flex-wrap gap-2">
                {jumps.map((jump) => (
                  <a
                    key={jump.href}
                    href={jump.href}
                    className="rounded-full border border-ink/10 bg-surface px-4 py-2 text-sm text-ink-body transition-colors hover:border-ink/25 hover:text-ink"
                  >
                    {jump.label}
                  </a>
                ))}
              </nav>
            </div>

            <div className="space-y-5">
              <div className="rounded-[2rem] bg-espresso p-8 text-center text-cream shadow-lift">
                <TagArt />
                <p className="mt-6 text-[11px] font-semibold uppercase tracking-[0.2em] text-accent">
                  {official ? "Spot ID" : "First-version Spot"}
                </p>
                {official ? (
                  spotId ? (
                    <p className="mt-2 font-mono text-3xl font-semibold tracking-[0.18em] sm:text-4xl">
                      {formatSpotId(spotId)}
                    </p>
                  ) : (
                    <p className="mt-2 text-sm leading-relaxed text-cream-muted">
                      This link doesn&apos;t look like a Mivo Spot ID. Check you opened it from the tag itself.
                    </p>
                  )
                ) : (
                  <p className="mt-2 text-sm leading-relaxed text-cream-muted">
                    Identified by a private code in its link, not an ID printed on it.
                  </p>
                )}
                <p className="mx-auto mt-4 max-w-[17rem] text-xs leading-relaxed text-cream-muted">
                  {official
                    ? "This code is the only thing stored on the tag. Everything about what the Spot does lives in your Mivo app."
                    : "The Mivo app still recognises this sticker and starts the Spot it was made for."}
                </p>
              </div>

              {official && spotId && <SpotStatus spotId={spotId} />}
            </div>
          </section>

          {/* Set up */}
          {official && (
            <section className="mt-24">
              <SectionTitle
                id="set-up"
                kicker="Activate"
                title="Set it up in four steps."
                sub="A new Spot isn't connected to anyone. It becomes yours when you finish setup in the Mivo app."
              />
              <ol className="mt-10 grid gap-5 sm:grid-cols-2">
                {setupSteps.map((step, index) => (
                  <li key={step.title} className="rounded-3xl border border-ink/10 bg-surface p-7 shadow-card">
                    <span className="font-display text-5xl leading-none text-accent">0{index + 1}</span>
                    <h3 className="mt-5 text-xl font-semibold text-ink">{step.title}</h3>
                    <p className="mt-2 text-[15px] leading-relaxed text-ink-body">{step.body}</p>
                  </li>
                ))}
              </ol>

              <div className="mt-10 rounded-3xl border border-ink/10 bg-surface p-7 shadow-card sm:p-9">
                <h3 className="font-display text-3xl text-ink">What happens when you tap</h3>
                <dl className="mt-6 divide-y divide-ink/10">
                  {tapOutcomes.map((row) => (
                    <div key={row.when} className="grid gap-1 py-4 sm:grid-cols-[14rem_1fr] sm:gap-8">
                      <dt className="text-[15px] font-medium text-ink">{row.when}</dt>
                      <dd className="text-[15px] leading-relaxed text-ink-body">{row.result}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </section>
          )}

          {/* Modes */}
          <section className="mt-24">
            <SectionTitle
              id="modes"
              kicker="What it does"
              title="Four ways to use a Spot."
              sub="Each place gets the nudge that fits it. You choose the mode when you set the Spot up, and you can change it later without touching the tag."
            />
            <div className="mt-10 grid gap-5 sm:grid-cols-2">
              {modes.map((mode) => (
                <article key={mode.name} className="rounded-3xl border border-ink/10 bg-surface p-7 shadow-card">
                  <h3 className="font-display text-3xl text-ink">{mode.name}</h3>
                  <p className="mt-3 text-[15px] leading-relaxed text-ink-body">{mode.body}</p>
                  <p className="mt-4 text-sm text-ink-muted">{mode.fits}</p>
                </article>
              ))}
            </div>

            <div className="mt-5 rounded-3xl border border-ink/10 bg-bg-alt p-7 sm:p-9">
              <h3 className="text-lg font-semibold text-ink">Good to know</h3>
              <ul className="mt-4 grid gap-x-10 gap-y-3 sm:grid-cols-2">
                {goodToKnow.map((line) => (
                  <li key={line} className="flex items-start gap-3 text-[15px] leading-relaxed text-ink-body">
                    <Check size={16} className="mt-1 shrink-0 text-accent-deep" />
                    {line}
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* Banner */}
          <section className="mt-24 overflow-hidden rounded-[2rem] bg-espresso p-8 text-cream shadow-lift sm:p-12">
            <div id="banner" className="scroll-mt-28 grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-accent">Optional, about a minute</p>
                <h2 className="mt-3 text-balance font-display text-4xl leading-[1.06] sm:text-5xl">
                  Skip the tap banner.
                </h2>
                <p className="mt-4 text-[16px] leading-relaxed text-cream-muted">
                  iOS shows a banner every time you tap a Spot, and only you can switch that off. Set up a Shortcut
                  once and a tap starts your Spot straight away.
                </p>
              </div>
              <ol className="space-y-4">
                {bannerSteps.map((step, index) => (
                  <li key={step} className="flex gap-4 rounded-2xl border border-cream/10 bg-espresso-raised p-5">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent text-sm font-semibold text-on-accent">
                      {index + 1}
                    </span>
                    <span className="text-[15px] leading-relaxed text-cream/90">{step}</span>
                  </li>
                ))}
              </ol>
            </div>
          </section>

          {/* Help */}
          <section className="mt-24">
            <SectionTitle
              id="help"
              kicker="Troubleshooting"
              title="If something's not right."
              sub="Most problems are the tap itself, the app version, or who the Spot is connected to."
            />
            <div className="mt-10 max-w-3xl">
              <Faq items={troubleshooting} />
            </div>
          </section>

          {/* Privacy */}
          {official && (
            <section className="mt-24">
              <SectionTitle
                id="privacy"
                kicker="Privacy"
                title="What's on the tag, and what isn't."
              />
              <ul className="mt-8 max-w-3xl space-y-4">
                {privacyPoints.map((point) => (
                  <li key={point} className="flex items-start gap-3 text-[16px] leading-relaxed text-ink-body">
                    <Check size={18} className="mt-1 shrink-0 text-accent-deep" />
                    {point}
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-sm text-ink-muted">
                More in our{" "}
                <Link href="/privacy" className={underlined}>
                  Privacy Policy
                </Link>
                .
              </p>
            </section>
          )}

          {/* Next steps */}
          <section className="mt-24 grid gap-5 sm:grid-cols-3">
            <Link
              href="/account"
              className="rounded-3xl border border-ink/10 bg-surface p-7 shadow-card transition hover:-translate-y-1 hover:shadow-lift"
            >
              <h3 className="text-lg font-semibold text-ink">Manage your Spots</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-ink-body">
                See every Spot on your account, track an order, or disconnect a Spot you&apos;re passing on.
              </p>
            </Link>
            <Link
              href="/shop"
              className="rounded-3xl border border-ink/10 bg-surface p-7 shadow-card transition hover:-translate-y-1 hover:shadow-lift"
            >
              <h3 className="text-lg font-semibold text-ink">Need more Spots?</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-ink-body">
                One for the desk, one for the bedside, one for the car. Shop Mivo Spots.
              </p>
            </Link>
            <a
              href={help}
              className="rounded-3xl border border-ink/10 bg-surface p-7 shadow-card transition hover:-translate-y-1 hover:shadow-lift"
            >
              <h3 className="text-lg font-semibold text-ink">Talk to us</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-ink-body">
                Email {footer.contact.email}
                {spotId ? ` and we'll have this Spot's ID (${formatSpotId(spotId)}) ready.` : "."}
              </p>
            </a>
          </section>
        </Container>
      </main>
      <Footer />
    </>
  );
}
