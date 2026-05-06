import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPageByUri } from "@/lib/queries/pages";
import { Hero } from "@/components/sections/Hero";
import { Features } from "@/components/sections/Features";
import { Testimonials } from "@/components/sections/Testimonials";

export const revalidate = 60; // ISR revalidation

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPageByUri("/");

  if (!page || !page.seo) {
    return {
      title: "IPTV NL | Premium IPTV Provider",
      description: "Ervaar de beste kwaliteit met ons premium IPTV netwerk. Sneller, stabieler en meer content dan ooit tevoren.",
    };
  }

  return {
    title: page.seo.title,
    description: page.seo.metaDesc,
    openGraph: {
      title: page.seo.opengraphTitle,
      description: page.seo.opengraphDescription,
      images: page.seo.opengraphImage ? [{ url: page.seo.opengraphImage.sourceUrl }] : [],
    },
  };
}

export default async function Home() {
  const page = await getPageByUri("/");

  if (!page || !page.homepageFields) {
    // If the WordPress page is not published or the homepage fields are empty
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
      <main className="flex-1">
        <Hero 
          title={heroTitle || "Premium **IPTV** Provider"}
          subtitle={heroSubtitle || "Ervaar de beste kwaliteit met ons premium IPTV netwerk. Sneller, stabieler en meer content dan ooit tevoren."}
          ctaText={heroCtaText || "Kies Je Pakket"}
          ctaUrl={heroCtaUrl || "/pricing"}
          image={heroImage}
        />
        {features && features.length > 0 && <Features features={features} />}
        {testimonials && testimonials.length > 0 && <Testimonials testimonials={testimonials} />}
      </main>
    </div>
  );
}
