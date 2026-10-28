import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";

export function PageShell({
  eyebrow,
  title,
  intro,
  children,
}: {
  eyebrow: string;
  title: string;
  intro: string;
  children: React.ReactNode;
}) {
  return (
    <>
      <Nav />
      <main className="relative pb-28 pt-36">
        <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[420px] bg-[radial-gradient(55%_70%_at_50%_0%,rgb(212_135_42/0.16),transparent_70%)]" />
        <Container>
          <div className="max-w-2xl">
            <Eyebrow>{eyebrow}</Eyebrow>
            <h1 className="mt-6 text-balance font-display text-5xl leading-[1.04] tracking-[-0.015em] text-ink sm:text-6xl">
              {title}
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-ink-body">{intro}</p>
          </div>
          {children}
        </Container>
      </main>
      <Footer />
    </>
  );
}
