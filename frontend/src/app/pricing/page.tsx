import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPageByUri } from "@/lib/queries/pages";
import { PricingCard } from "@/components/ui/PricingCard";

export const revalidate = 60; // ISR revalidation

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPageByUri("/pricing");

  if (!page || !page.seo) {
    return {
      title: "Pakketten & Prijzen | IPTV NL",
      description: "Bekijk onze voordelige IPTV pakketten. Kies het abonnement dat het beste bij u past.",
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

export default async function PricingPage() {
  const page = await getPageByUri("/pricing");

  if (!page || !page.pricingFields) {
    return (
      <div className="flex flex-col min-h-screen items-center justify-center py-24">
        <h1 className="text-4xl font-bold mb-4">Content Not Found</h1>
        <p className="text-foreground/70">Please configure the pricing fields in WordPress for the `/pricing` page.</p>
      </div>
    );
  }

  const { pricingPlans } = page.pricingFields;

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 py-24">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h1 className="text-4xl md:text-5xl font-heading font-bold mb-6">
              Transparante <span className="text-gradient">Prijzen</span>
            </h1>
            <p className="text-lg text-foreground/70">
              Kies het pakket dat het beste bij jouw kijkgedrag past. Geen verborgen kosten, direct toegang.
            </p>
          </div>

          {pricingPlans && pricingPlans.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {pricingPlans.map((plan, i) => (
                <PricingCard
                  key={i}
                  name={plan.name}
                  price={plan.price}
                  period={plan.period}
                  isPopular={plan.isPopular}
                  ctaUrl={plan.ctaUrl}
                  featuresList={plan.featuresList}
                />
              ))}
            </div>
          ) : (
            <div className="text-center text-foreground/50 py-12">
              Geen pakketten gevonden.
            </div>
          )}

          <div className="mt-24 text-center max-w-2xl mx-auto bg-surface/50 border border-surface-border rounded-2xl p-8 glass-card">
            <h2 className="text-2xl font-heading font-bold mb-4">Nog niet zeker?</h2>
            <p className="text-foreground/70 mb-6">
              Probeer onze service 24 uur lang volledig gratis en vrijblijvend uit. Ervaar de stabiliteit en het zenderaanbod zelf.
            </p>
            <a 
              href="/contact" 
              className="inline-flex h-12 items-center justify-center rounded-md bg-accent px-8 text-sm font-medium text-white transition-colors hover:bg-accent/90 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-background"
            >
              Vraag Proeflijn Aan
            </a>
          </div>
        </div>
      </main>
    </div>
  );
}
