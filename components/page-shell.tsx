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
      <main className="pt-36 pb-28">
        <Container>
          <div className="max-w-2xl">
            <Eyebrow>{eyebrow}</Eyebrow>
            <h1 className="mt-6 font-display text-5xl italic leading-tight text-ink sm:text-6xl">
              {title}
            </h1>
            <p className="mt-5 text-[17px] leading-relaxed text-ink-body">{intro}</p>
          </div>
          {children}
        </Container>
      </main>
      <Footer />
    </>
  );
}
