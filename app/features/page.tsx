import type { Metadata } from "next";
import { ChevronDown, Download } from "lucide-react";
import { PageShell } from "@/components/page-shell";
import { ButtonLink } from "@/components/ui/button-link";
import { ComingSoon } from "@/components/ui/coming-soon";
import { appStoreUrl, featureCategories, macDownloadUrl, macRelease, steps } from "@/data/content";

export const metadata: Metadata = {
  title: "Features — Mivo",
  description:
    "Everything Mivo does: honest Screen Time, the pause before you scroll, Mivo Still, Milo, Mivo for Mac, focus sessions, experiments, reports and privacy controls.",
  alternates: { canonical: "/features" },
};

const slug = (text: string) =>
  text
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

const featureCount = featureCategories.reduce((sum, category) => sum + category.features.length, 0);

// The full list that used to fill the home page. The home page keeps the short version
// and links here; this page is grouped so people can jump straight to what they need.
export default function FeaturesPage() {
  return (
    <PageShell
      eyebrow="Features"
      title="Everything Mivo does."
      intro={`${featureCount} features, grouped by what they're for. Jump to a group, or start with how it works.`}
    >
      <nav
        aria-label="Feature groups"
        className="sticky top-[4.5rem] z-30 -mx-6 mt-10 overflow-x-auto bg-bg/95 px-6 py-3 backdrop-blur-md sm:top-[5.5rem] sm:mx-0 sm:rounded-full sm:border sm:border-ink/10 sm:bg-bg/85 sm:px-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        <ul className="flex w-max gap-1.5">
          <li>
            <a
              href="#how-it-works"
              className="block whitespace-nowrap rounded-full px-3.5 py-1.5 text-sm text-ink-body transition-colors hover:bg-ink/5 hover:text-ink"
            >
              How it works
            </a>
          </li>
          {featureCategories.map((category) => (
            <li key={category.category}>
              <a
                href={`#${slug(category.category)}`}
                className="block whitespace-nowrap rounded-full px-3.5 py-1.5 text-sm text-ink-body transition-colors hover:bg-ink/5 hover:text-ink"
              >
                {category.category}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <section id="how-it-works" className="mt-14 scroll-mt-40">
        <h2 className="font-display text-3xl italic text-ink sm:text-4xl">How it works</h2>
        <ol className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step) => (
            <li key={step.n} className="rounded-3xl border border-ink/10 bg-surface p-6 shadow-card">
              <span className="font-display text-4xl leading-none text-accent">{step.n}</span>
              <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.16em] text-ink-muted">{step.label}</p>
              <h3 className="mt-1.5 text-lg font-semibold leading-snug text-ink">{step.heading}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-ink-body">{step.body}</p>
            </li>
          ))}
        </ol>
      </section>

      {featureCategories.map((category) => (
        <section key={category.category} id={slug(category.category)} className="mt-20 scroll-mt-40">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <h2 className="font-display text-3xl italic text-ink sm:text-4xl">{category.category}</h2>
            {"note" in category && category.note ? <ComingSoon>{category.note}</ComingSoon> : null}
          </div>

          <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {category.features.map((feature) => (
              <li
                key={feature.title}
                className="flex flex-col rounded-3xl border border-ink/10 bg-surface p-6 shadow-card"
              >
                <h3 className="text-[17px] font-semibold leading-snug tracking-tight text-ink">{feature.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-ink-body">{feature.body}</p>
                {"detail" in feature && feature.detail ? (
                  <details className="group mt-auto pt-4">
                    <summary className="flex cursor-pointer list-none items-center gap-1 text-sm font-medium text-accent-deep [&::-webkit-details-marker]:hidden">
                      More
                      <ChevronDown size={14} className="transition-transform group-open:rotate-180" />
                    </summary>
                    <p className="mt-2 text-sm leading-relaxed text-ink-muted">{feature.detail}</p>
                  </details>
                ) : null}
              </li>
            ))}
          </ul>

          {category.category === "Mivo for Mac" && (
            <div className="mt-5 flex flex-wrap items-center gap-4">
              <a
                href={macDownloadUrl}
                className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-espresso px-6 text-sm font-medium text-cream transition-colors hover:bg-espresso-raised"
              >
                <Download size={15} />
                Download for Mac
              </a>
              <p className="text-xs text-ink-muted">
                Free · Version {macRelease.version} · {macRelease.requires} · {macRelease.size}
              </p>
            </div>
          )}
        </section>
      ))}

      <section className="mt-24 rounded-3xl bg-espresso p-8 text-cream shadow-lift sm:p-10">
        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-accent">Free to start</p>
        <p className="mt-2 max-w-xl font-display text-3xl">Try the pause today. Add Plus when you want more.</p>
        <div className="mt-6 flex flex-wrap gap-3">
          <ButtonLink href={appStoreUrl}>Download for iPhone</ButtonLink>
          <ButtonLink href="/pricing" variant="secondary-dark" showArrow={false}>
            See pricing
          </ButtonLink>
        </div>
      </section>
    </PageShell>
  );
}
