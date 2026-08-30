import Image from "next/image";
import Link from "next/link";
import { Mail } from "lucide-react";
import { Container } from "@/components/ui/container";
import { footer } from "@/data/content";

export function Footer() {
  return (
    <footer className="border-t border-ink/10 bg-surface/40 pt-16 pb-8">
      <Container>
        <div className="grid grid-cols-2 gap-10 pb-14 sm:grid-cols-4">
          <div className="col-span-2 sm:col-span-1">
            <div className="flex items-center gap-2.5">
              <Image
                src="/images/mivo-logo.png"
                alt="Mivo"
                width={30}
                height={30}
                className="rounded-lg"
              />
              <span className="text-base font-semibold text-ink">Mivo</span>
            </div>
            <p className="mt-4 max-w-[22ch] text-sm leading-relaxed text-ink-muted">
              Not wellness. Not discipline. Just honesty.
            </p>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.15em] text-ink-muted">
              Product
            </h3>
            <ul className="mt-4 space-y-3">
              {footer.product.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="text-sm text-ink-body transition-colors hover:text-ink"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.15em] text-ink-muted">
              Legal
            </h3>
            <ul className="mt-4 space-y-3">
              {footer.legal.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-ink-body transition-colors hover:text-ink"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.15em] text-ink-muted">
              Contact
            </h3>
            <ul className="mt-4 space-y-3">
              <li>
                <a
                  href={`mailto:${footer.contact.email}`}
                  className="flex items-center gap-2 text-sm text-ink-body transition-colors hover:text-ink"
                >
                  <Mail size={14} />
                  {footer.contact.email}
                </a>
              </li>
              <li>
                <a
                  href={footer.contact.instagram}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="text-sm text-ink-body transition-colors hover:text-ink"
                >
                  Instagram
                </a>
              </li>
              <li>
                <a
                  href={footer.contact.linkedin}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="text-sm text-ink-body transition-colors hover:text-ink"
                >
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-ink/10 py-10">
          <h3 className="text-xs font-semibold uppercase tracking-[0.15em] text-ink-muted">
            Team
          </h3>
          <div className="mt-5 flex flex-wrap gap-6 sm:gap-10">
            {footer.team.map((member) => (
              <div key={member.name} className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent/15 text-sm font-semibold text-accent-deep">
                  {member.initial}
                </div>
                <div>
                  <p className="text-sm font-medium text-ink">{member.name}</p>
                  <p className="text-xs text-ink-muted">{member.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-4 border-t border-ink/10 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-ink-muted">{footer.copyright}</p>
          <div className="flex gap-5">
            {footer.legal.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-xs text-ink-muted transition-colors hover:text-ink"
              >
                {item.label.replace(" Policy", "").replace(" of Use", "")}
              </Link>
            ))}
          </div>
        </div>
      </Container>
    </footer>
  );
}
