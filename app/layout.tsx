import type { Metadata, Viewport } from "next";
import { Geist, Instrument_Serif } from "next/font/google";
import { AccountBootstrap } from "@/components/account/account-bootstrap";
import "./globals.css";

const geist = Geist({
  variable: "--font-geist",
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
  title: "Mivo — Less scrolling. More time for you.",
  description:
    "Understand your screen time, pause automatic app opens, and make room for what matters. Download Mivo for iPhone, Mac and Windows, or try the free study timer.",
  openGraph: {
    title: "Mivo — Less scrolling. More time for you.",
    description:
      "Understand your screen time, pause automatic app opens, and make room for what matters. Available on iPhone, Mac, Windows and the web.",
    url: "https://usemivo.app",
    siteName: "Mivo",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mivo — Less scrolling. More time for you.",
    description:
      "Understand your screen time, pause automatic app opens, and make room for what matters. Available on iPhone, Mac, Windows and the web.",
  },
};

export const viewport: Viewport = {
  themeColor: "#fbf5ea",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    // data-scroll-behavior: globals.css sets smooth scrolling for in-page links. Since
    // Next.js 16 that also applied to page changes, so a nav click left the new page
    // half-scrolled. This attribute makes Next jump instantly on page changes again.
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${geist.variable} ${instrumentSerif.variable}`}
    >
      <body className="min-h-screen bg-bg font-sans text-ink antialiased">
        <AccountBootstrap />
        {children}
      </body>
    </html>
  );
}
