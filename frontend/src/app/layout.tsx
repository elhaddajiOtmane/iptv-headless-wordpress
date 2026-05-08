import type { Metadata } from "next";
import { League_Spartan } from "next/font/google";
import { GoogleTagManager } from "@next/third-parties/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { JsonLd } from "@/components/seo/JsonLd";
import { organizationJsonLd, websiteJsonLd } from "@/lib/seo";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://iptv-nederland.com";

const leagueSpartan = League_Spartan({
  variable: "--font-league-spartan",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "IPTV Nederland | Premium Streaming Service",
    template: "%s | IPTV Nederland",
  },
  description:
    "De beste IPTV provider van Nederland. Kijk live TV, films en series in 4K kwaliteit.",
  openGraph: {
    type: "website",
    locale: "nl_NL",
    url: SITE_URL,
    siteName: "IPTV Nederland",
  },
  twitter: {
    card: "summary_large_image",
  },
  robots: {
    index: true,
    follow: true,
    "max-image-preview": "large",
    "max-snippet": -1,
    "max-video-preview": -1,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="nl"
      className={`${leagueSpartan.variable} h-full antialiased dark`}
      style={{ fontFamily: '"League Spartan", sans-serif' }}
    >
      {process.env.NEXT_PUBLIC_GTM_ID && (
        <GoogleTagManager gtmId={process.env.NEXT_PUBLIC_GTM_ID} />
      )}
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <JsonLd data={organizationJsonLd()} />
        <JsonLd data={websiteJsonLd()} />
        <Header />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
