import Image from "next/image";
import Link from "next/link";
import { Mail } from "lucide-react";
import { Container } from "@/components/ui/container";
import { footer } from "@/data/content";

const heading = "text-[11px] font-semibold uppercase tracking-[0.18em] text-cream-muted";
const link = "text-sm text-cream/80 transition-colors hover:text-accent";

export function Footer() {
  return (
    <footer className="border-t border-cream/10 bg-espresso pb-8 pt-16 text-cream">
      <Container>
        <div className="grid grid-cols-2 gap-10 pb-14 sm:grid-cols-4">
          <div className="col-span-2 sm:col-span-1">
            <div className="flex items-center gap-2.5">
              <Image
                src="/images/mivo-logo.png"
                alt="Mivo"
                width={32}
                height={32}
                className="rounded-lg"
              />
              <span className="text-base font-semibold text-cream">Mivo</span>
            </div>
            <p className="mt-4 max-w-[22ch] font-display text-2xl leading-snug text-cream">
              Not wellness. Not discipline. Just honesty.
            </p>
          </div>

          <div>
            <h3 className={heading}>Product</h3>
            <ul className="mt-4 space-y-3">
              {footer.product.map((item) => (
                <li key={item.href}>
                  <a href={item.href} className={link}>
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className={heading}>Legal</h3>
            <ul className="mt-4 space-y-3">
              {footer.legal.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className={link}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className={heading}>Contact</h3>
            <ul className="mt-4 space-y-3">
              <li>
                <a href={`mailto:${footer.contact.email}`} className={`flex items-center gap-2 ${link}`}>
                  <Mail size={14} />
                  {footer.contact.email}
                </a>
              </li>
              <li>
                <a
                  href={footer.contact.instagram}
                  target="_blank"
                  rel="noreferrer noopener"
                  className={link}
                >
                  Instagram
                </a>
              </li>
              <li>
                <a
                  href={footer.contact.linkedin}
                  target="_blank"
                  rel="noreferrer noopener"
                  className={link}
                >
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-cream/10 py-10">
          <h3 className={heading}>Team</h3>
          <div className="mt-5 flex flex-wrap gap-x-10 gap-y-5">
            {footer.team.map((member) => (
              <div key={member.name} className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent/20 text-sm font-semibold text-accent">
                  {member.initial}
                </div>
                <div>
                  <p className="text-sm font-medium text-cream">{member.name}</p>
                  <p className="text-xs text-cream-muted">{member.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-4 border-t border-cream/10 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-cream-muted">{footer.copyright}</p>
          <div className="flex gap-5">
            {footer.legal.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-xs text-cream-muted transition-colors hover:text-cream"
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
