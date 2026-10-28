import { SpotPage } from "@/components/spot/spot-page";
import type { SpotLinkKind } from "@/lib/spot-id";

// The page a Mivo Spot opens when the Mivo app isn't what handled the tap (Mivo isn't installed or
// up to date, or the link was opened on a Mac or Android phone). The guide itself lives in
// components/spot/spot-page.tsx.
//
// The page never says whether an ID exists or who owns it. Only a signed-in person can ask the
// Spot registry, and even then it never reveals an owner.

export type { SpotLinkKind } from "@/lib/spot-id";

export function SpotLanding({ kind, id }: { kind: SpotLinkKind; id: string }) {
  return (
    <SpotPage
      kind={kind}
      id={id}
      extraAction={
        kind === "official" ? (
          <a
            href={`/study/${encodeURIComponent(id)}`}
            className="inline-flex h-12 w-full items-center justify-center rounded-full bg-accent px-7 text-sm font-medium text-on-accent shadow-[inset_0_1px_0_rgb(255_255_255/0.35),0_10px_24px_-10px_rgb(212_135_42/0.9)] transition hover:-translate-y-0.5 hover:brightness-105"
          >
            Start a study session, no app needed
          </a>
        ) : undefined
      }
    />
  );
}
