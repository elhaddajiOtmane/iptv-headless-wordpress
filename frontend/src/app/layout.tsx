import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import { GoogleTagManager } from "@next/third-parties/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { JsonLd } from "@/components/seo/JsonLd";
import { organizationJsonLd, websiteJsonLd } from "@/lib/seo";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://iptv-nederland.com";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
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
      className={`${inter.variable} ${outfit.variable} h-full antialiased dark`}
    >
      {process.env.NEXT_PUBLIC_GTM_ID && (
        <GoogleTagManager gtmId={process.env.NEXT_PUBLIC_GTM_ID} />
      )}
      <body className="min-h-full flex flex-col bg-background text-foreground font-sans">
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
