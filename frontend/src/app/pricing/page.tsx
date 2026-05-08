import { Metadata } from "next";
import { getPageByUri } from "@/lib/queries/pages";
import { buildMetadata, webPageJsonLd } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";
import { PricingCard } from "@/components/ui/PricingCard";

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPageByUri("/pricing");
  return buildMetadata({
    seo: page?.seo,
    fallbackTitle: "Pakketten & Prijzen",
    fallbackDescription:
      "Bekijk onze voordelige IPTV pakketten. Kies het abonnement dat het beste bij u past.",
    path: "/pricing",
  });
}

const fallbackPlans = [
  {
    name: "3 Maanden",
    price: "34.99",
    period: "3 mnd",
    isPopular: false,
    ctaUrl: "/contact",
    featuresList:
      "Live TV en EPG Gids\nFilms en VOD Shows\nCompatibel met alle apparaten\nAnti-Freeze Technologie\nPPV en Sport Evenementen",
  },
  {
    name: "6 Maanden",
    price: "54.99",
    period: "6 mnd",
    isPopular: true,
    ctaUrl: "/contact",
    featuresList:
      "Live TV en EPG Gids\nFilms en VOD Shows\nCompatibel met alle apparaten\nAnti-Freeze Technologie\nPPV en Sport Evenementen",
  },
  {
    name: "12 Maanden",
    price: "74.99",
    period: "12 mnd",
    isPopular: false,
    ctaUrl: "/contact",
    featuresList:
      "Live TV en EPG Gids\nFilms en VOD Shows\nCompatibel met alle apparaten\nAnti-Freeze Technologie\nPPV en Sport Evenementen",
  },
];

export default async function PricingPage() {
  const page = await getPageByUri("/pricing");
  const pricingPlans = page?.pricingFields?.pricingPlans?.length
    ? page.pricingFields.pricingPlans
    : fallbackPlans;

  return (
    <div className="flex flex-col min-h-screen">
      <JsonLd data={webPageJsonLd({
        title: page?.seo?.title || "Pakketten & Prijzen",
        description: page?.seo?.metaDesc || "IPTV pakketten en prijzen",
        path: "/pricing",
      })} />
      <main className="flex-1 bg-ink py-20 lg:py-28">
        <div className="container-x">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="eyebrow justify-center inline-flex">Prijzen</span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight">
              Transparante <span className="text-primary-500">Prijzen</span>
            </h1>
            <p className="text-lg text-foreground/70">
              Kies het pakket dat het beste bij jouw kijkgedrag past. Geen verborgen kosten, direct toegang.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
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

          <div className="mt-24 text-center max-w-2xl mx-auto bg-surface border border-surface-border rounded-2xl p-10">
            <h2 className="text-3xl font-extrabold mb-4">Nog niet zeker?</h2>
            <p className="text-foreground/70 mb-6">
              Probeer onze service 24 uur lang volledig gratis en vrijblijvend uit. Ervaar de stabiliteit en het zenderaanbod zelf.
            </p>
            <a href="/contact" className="btn-red">
              Vraag Proeflijn Aan
            </a>
          </div>
        </div>
      </main>
    </div>
  );
}
