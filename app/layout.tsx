import type { Metadata, Viewport } from "next";
import { Inter, Instrument_Serif } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://usemivo.app"),
  title: "Mivo — Understand Your Scrolling. Change It Without Guilt.",
  description:
    "Mivo helps you notice missing screen time, recognize your patterns, and make more intentional choices. No shame, no gamified discipline — just the truth.",
  openGraph: {
    title: "Mivo — Understand Your Scrolling. Change It Without Guilt.",
    description:
      "Mivo helps you notice missing screen time, recognize your patterns, and make more intentional choices.",
    url: "https://usemivo.app",
    siteName: "Mivo",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mivo — Understand Your Scrolling. Change It Without Guilt.",
    description:
      "Mivo helps you notice missing screen time, recognize your patterns, and make more intentional choices.",
  },
};

export const viewport: Viewport = {
  themeColor: "#161008",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${inter.variable} ${instrumentSerif.variable}`}>
      <body className="min-h-screen bg-bg font-sans text-ink antialiased">
        {children}
      </body>
    </html>
  );
}
