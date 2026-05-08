import { Metadata } from "next";
import { getPageByUri } from "@/lib/queries/pages";
import { buildMetadata, webPageJsonLd } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";
import { Hero } from "@/components/sections/Hero";
import { WhoWeAre } from "@/components/sections/WhoWeAre";
import { Features } from "@/components/sections/Features";
import { MoreToStream } from "@/components/sections/MoreToStream";
import { MoviesGrid } from "@/components/sections/MoviesGrid";
import { SportsNewsBanners } from "@/components/sections/SportsNewsBanners";
import { Pricing } from "@/components/sections/Pricing";
import { TrialCTA } from "@/components/sections/TrialCTA";
import { Benefits } from "@/components/sections/Benefits";
import { Testimonials } from "@/components/sections/Testimonials";
import { Stats } from "@/components/sections/Stats";
import { Faq } from "@/components/sections/Faq";

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPageByUri("/");
  return buildMetadata({
    seo: page?.seo,
    fallbackTitle: "IPTV NL | Premium IPTV Provider",
    fallbackDescription:
      "Ervaar de beste kwaliteit met ons premium IPTV netwerk. Sneller, stabieler en meer content dan ooit tevoren.",
    path: "/",
  });
}

export default async function Home() {
  const page = await getPageByUri("/");
  const fields = page?.homepageFields;

  const heroTitle = fields?.heroTitle || "Top Quality Streaming met IPTV NL";
  const heroSubtitle =
    fields?.heroSubtitle ||
    "Inclusief al je favoriete kanalen met lokaal nieuws, live sport, weer en meer.";
  const heroCtaText = fields?.heroCtaText || "Zoek Nu";
  const heroCtaUrl = fields?.heroCtaUrl || "/pricing";

  return (
    <>
      <JsonLd
        data={webPageJsonLd({
          title: page?.seo?.title || "IPTV Nederland",
          description: page?.seo?.metaDesc || "Premium IPTV Provider",
          path: "/",
        })}
      />
      <Hero
        title={heroTitle}
        subtitle={heroSubtitle}
        ctaText={heroCtaText}
        ctaUrl={heroCtaUrl}
      />
      <WhoWeAre />
      <Features features={fields?.features} />
      <MoreToStream />
      <MoviesGrid />
      <SportsNewsBanners />
      <Pricing />
      <TrialCTA />
      <Benefits />
      <Testimonials testimonials={fields?.testimonials} />
      <Stats />
      <Faq />
    </>
  );
}
