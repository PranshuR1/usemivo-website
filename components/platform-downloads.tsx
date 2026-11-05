import { ArrowDownToLine, ArrowUpRight, Laptop, Monitor, Smartphone } from "lucide-react";
import { appStoreUrl, macDownloadUrl, macRelease, windowsDownloadUrl, windowsRelease } from "@/data/content";

const platforms = [
  { name: "iPhone", icon: Smartphone, description: "Notice your habits. Pause before the scroll.", detail: "Available on the App Store", requirement: null, href: appStoreUrl, cta: "Download for iPhone", external: true, beta: false },
  { name: "Mac", icon: Laptop, description: "Keep your focus while you work and study.", detail: `Version ${macRelease.version} · ${macRelease.size}`, requirement: macRelease.requires, href: macDownloadUrl, cta: "Download for Mac", external: false, beta: false },
  { name: "Windows", icon: Monitor, description: "Bring Mivo to your PC, with focus and study tools.", detail: `Version ${windowsRelease.version} · ${windowsRelease.size}`, requirement: windowsRelease.requires, href: windowsDownloadUrl, cta: "Download for Windows", external: false, beta: true },
];

export function PlatformDownloads() {
  return (
    <div className="grid gap-5 md:grid-cols-3 lg:gap-6">
      {platforms.map(({ name, icon: Icon, description, detail, requirement, href, cta, external, beta }) => (
        <article key={name} className="flex flex-col items-start rounded-[1.75rem] border border-cream/15 bg-cream/[0.04] p-7 sm:p-8">
          <div className="flex w-full items-center justify-between gap-3">
            <Icon aria-hidden="true" size={26} strokeWidth={1.5} className="text-accent" />
            {beta && <span className="rounded-full border border-accent/30 px-2.5 py-1 text-[11px] font-medium text-accent">Beta</span>}
          </div>
          <h3 className="mt-7 text-2xl font-semibold tracking-tight text-cream">{name}</h3>
          <p className="mt-3 text-sm leading-relaxed text-cream-muted">{description}</p>
          <div className="mb-7 mt-6 space-y-1 text-xs leading-relaxed text-cream-muted">
            {requirement && <p>{requirement}</p>}
            <p>{detail}</p>
          </div>
          <a href={href} {...(external ? { target: "_blank", rel: "noreferrer noopener" } : { download: true })} className="mt-auto inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-cream px-4 py-3 text-center text-sm font-medium text-espresso transition-colors hover:bg-white">
            {cta}
            {external ? <ArrowUpRight aria-hidden="true" size={15} /> : <ArrowDownToLine aria-hidden="true" size={15} />}
          </a>
        </article>
      ))}
    </div>
  );
}
