import { Container } from "@/components/ui/container";
import { SectionHeader } from "@/components/ui/section-header";
import { PlatformDownloads } from "@/components/platform-downloads";

export function FinalCta() {
  return (
    <section id="download" className="bg-espresso py-20 sm:py-28 lg:py-32">
      <Container>
        <SectionHeader onDark eyebrow="Make a little room" heading="Your time. Your device." sub="Start with the screen you use most. Mivo is free to download." />
        <div className="mt-12 sm:mt-16"><PlatformDownloads /></div>
      </Container>
    </section>
  );
}
