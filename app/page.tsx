import { Nav } from "@/components/nav";
import { Hero } from "@/components/hero";
import { Reality } from "@/components/sections/reality";
import { ProcessSteps } from "@/components/sections/process-steps";
import { Problem } from "@/components/sections/problem";
import { Features } from "@/components/sections/features";
import { MiloSpots } from "@/components/sections/milo-spots";
import { Pricing } from "@/components/sections/pricing";
import { Experiments } from "@/components/sections/experiments";
import { AppStoreReviews } from "@/components/sections/app-store-reviews";
import { PhilosophyQuote } from "@/components/sections/philosophy-quote";
import { FinalCta } from "@/components/sections/final-cta";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Reality />
        <ProcessSteps />
        <Problem />
        <Features />
        <MiloSpots />
        <Pricing />
        <Experiments />
        <AppStoreReviews />
        <PhilosophyQuote />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
