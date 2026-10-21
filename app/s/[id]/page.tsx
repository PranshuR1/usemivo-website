import type { Metadata } from "next";
import { SpotLanding } from "@/components/spot-landing";

// Official Mivo Spots: https://usemivo.app/s/<ID>. The iOS app claims this path
// through /.well-known/apple-app-site-association; this page is the fallback.
export const metadata: Metadata = {
  title: "Your Mivo Spot",
  robots: { index: false, follow: false },
};

export default async function SpotPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <SpotLanding kind="official" id={id} />;
}
