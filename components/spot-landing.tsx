import { appStoreUrl } from "@/data/content";

// The page a Mivo Spot opens in Safari when the Mivo app isn't what handled the tap
// (Mivo isn't installed, or the link was opened on a Mac/Android phone).
//
// It never looks the ID up: it can't say whether a Spot exists or who owns it.
// The ID is only passed on to the app (mivo://s/<ID>), which checks it after the
// person signs in.

const OFFICIAL_ID = /^[A-Z0-9]{6,12}$/;
const LEGACY_ID = /^[a-z0-9-]{8,64}$/;

export type SpotLinkKind = "official" | "legacy";

export function spotOpenUrl(kind: SpotLinkKind, rawId: string): string {
  if (kind === "official") {
    const id = rawId.toUpperCase();
    return OFFICIAL_ID.test(id) ? `mivo://s/${id}` : "mivo://s";
  }
  const id = rawId.toLowerCase();
  return LEGACY_ID.test(id) ? `mivo://spot/${id}` : "mivo://spot";
}

export function SpotLanding({ kind, id }: { kind: SpotLinkKind; id: string }) {
  return (
    <main className="grid min-h-screen place-items-center px-6 py-16">
      <section className="w-full max-w-md text-center">
        <div className="mx-auto mb-5 grid h-[72px] w-[72px] place-items-center rounded-lg bg-surface font-sans text-2xl font-extrabold text-accent-deep">
          mivo
        </div>
        <h1 className="font-display text-4xl italic text-ink">This is a Mivo Spot</h1>
        <p className="mt-3 text-[15px] leading-relaxed text-ink-body">
          Tap it with an iPhone that has Mivo installed to set it up or start it. If
          Mivo didn&apos;t open on its own, use the button.
        </p>
        <a
          href={spotOpenUrl(kind, id)}
          className="mt-6 block rounded-lg bg-accent px-4 py-4 text-[15px] font-bold text-bg"
        >
          Open in Mivo
        </a>
        <p className="mt-6 text-[14px] leading-relaxed text-ink-muted">
          Don&apos;t have Mivo yet?{" "}
          <a href={appStoreUrl} className="text-accent-deep underline underline-offset-4">
            Get it on the App Store
          </a>
          , then tap your Mivo Spot again.
        </p>
      </section>
    </main>
  );
}
