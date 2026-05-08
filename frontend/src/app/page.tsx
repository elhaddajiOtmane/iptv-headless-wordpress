import { Metadata } from "next";
import { getPageByUri } from "@/lib/queries/pages";
import { buildMetadata, webPageJsonLd } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";
import { Hero } from "@/components/sections/Hero";
import { Features } from "@/components/sections/Features";
import { Testimonials } from "@/components/sections/Testimonials";

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

  if (!page || !page.homepageFields) {
    return (
      <div className="flex flex-col min-h-screen items-center justify-center py-24">
        <h1 className="text-4xl font-bold mb-4">Content Not Found</h1>
        <p className="text-foreground/70">Please configure the homepage fields in WordPress.</p>
      </div>
    );
  }

  const { heroTitle, heroSubtitle, heroCtaText, heroCtaUrl, heroImage, features, testimonials } = page.homepageFields;

  return (
    <div className="flex flex-col min-h-screen">
      <JsonLd data={webPageJsonLd({
        title: page.seo?.title || "IPTV Nederland",
        description: page.seo?.metaDesc || "Premium IPTV Provider",
        path: "/",
      })} />
      <main className="flex-1">
        <Hero 
          title={heroTitle || "Premium **IPTV** Provider"}
          subtitle={heroSubtitle || "Ervaar de beste kwaliteit met ons premium IPTV netwerk. Sneller, stabieler en meer content dan ooit tevoren."}
          ctaText={heroCtaText || "Kies Je Pakket"}
          ctaUrl={heroCtaUrl || "/pricing"}
          image={heroImage?.node}
        />
        {features && features.length > 0 && <Features features={features} />}
        {testimonials && testimonials.length > 0 && <Testimonials testimonials={testimonials} />}
      </main>
    </div>
  );
}
