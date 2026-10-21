import type { Metadata } from "next";
import { SpotLanding } from "@/components/spot-landing";

// Spots from the first version of Mivo Spots (a sticker the person wrote
// themselves): https://usemivo.app/spot/<uuid>. Still opened by the app.
export const metadata: Metadata = {
  title: "Your Mivo Spot",
  robots: { index: false, follow: false },
};

export default async function LegacySpotPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <SpotLanding kind="legacy" id={id} />;
}
