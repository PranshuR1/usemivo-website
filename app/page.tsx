import { Nav } from "@/components/nav";
import { Hero } from "@/components/hero";
import { SellingPoints } from "@/components/sections/selling-points";
import { StudyEverywhere } from "@/components/sections/study-everywhere";
import { AppStoreReviews } from "@/components/sections/app-store-reviews";
import { Pricing } from "@/components/sections/pricing";
import { FinalCta } from "@/components/sections/final-cta";
import { Footer } from "@/components/footer";

// Six sections on purpose: what it is, why it's different, studying, proof, price, download.
// Anything deeper lives on its own page (What's new, Pricing, Support).
export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <SellingPoints />
        <StudyEverywhere />
        <AppStoreReviews />
        <Pricing />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
