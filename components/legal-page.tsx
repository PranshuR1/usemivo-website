import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { Container } from "@/components/ui/container";
import { footer } from "@/data/content";

export function LegalPage({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <>
      <Nav />
      <main className="pt-40 pb-28">
        <Container className="max-w-2xl">
          <h1 className="font-display text-4xl italic text-ink">{title}</h1>
          <div className="mt-8 space-y-5 text-[15px] leading-relaxed text-ink-body">
            {children}
          </div>
          <p className="mt-10 text-[15px] text-ink-body">
            Questions? Reach us at{" "}
            <a
              href={`mailto:${footer.contact.email}`}
              className="text-accent-deep underline underline-offset-4"
            >
              {footer.contact.email}
            </a>
            .
          </p>
        </Container>
      </main>
      <Footer />
    </>
  );
}
