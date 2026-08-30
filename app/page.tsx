import { Nav } from "@/components/nav";
import { Hero } from "@/components/hero";
import { Reality } from "@/components/sections/reality";
import { ProcessSteps } from "@/components/sections/process-steps";
import { Problem } from "@/components/sections/problem";
import { Features } from "@/components/sections/features";
import { Experiments } from "@/components/sections/experiments";
import { PhilosophyQuote } from "@/components/sections/philosophy-quote";
import { AppStoreReviews } from "@/components/sections/app-store-reviews";
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
        <Experiments />
        <PhilosophyQuote />
        <AppStoreReviews />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
