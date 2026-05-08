import Link from "next/link";
import { Check } from "lucide-react";

interface Plan {
  name: string;
  price: string;
  period: string;
  isPopular?: boolean;
  ctaUrl: string;
  features: string[];
}

const defaultPlans: Plan[] = [
  {
    name: "3 Maanden",
    price: "34.99",
    period: "3 mnd",
    ctaUrl: "/pricing",
    features: [
      "Live TV en EPG Gids",
      "Films en VOD Shows",
      "Compatibel met alle apparaten",
      "Anti-Freeze Technologie",
      "PPV en Sport Evenementen",
    ],
  },
  {
    name: "6 Maanden",
    price: "54.99",
    period: "6 mnd",
    isPopular: true,
    ctaUrl: "/pricing",
    features: [
      "Live TV en EPG Gids",
      "Films en VOD Shows",
      "Compatibel met alle apparaten",
      "Anti-Freeze Technologie",
      "PPV en Sport Evenementen",
    ],
  },
  {
    name: "12 Maanden",
    price: "74.99",
    period: "12 mnd",
    ctaUrl: "/pricing",
    features: [
      "Live TV en EPG Gids",
      "Films en VOD Shows",
      "Compatibel met alle apparaten",
      "Anti-Freeze Technologie",
      "PPV en Sport Evenementen",
    ],
  },
];

export function Pricing({ plans }: { plans?: Plan[] }) {
  const items = plans && plans.length ? plans : defaultPlans;

  return (
    <section className="relative bg-surface-2 py-20 lg:py-28 overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary-500/5 blur-[100px] rounded-full" />

      <div className="container-x">
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-4">
          <span className="eyebrow justify-center inline-flex">Prijs Plannen</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight">
            Onze <span className="text-primary-500">betaalbare</span> abonnementen
          </h2>
          <p className="text-foreground/65">Krijg premium streaming vanaf €5/maand</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {items.slice(0, 3).map((plan, i) => (
            <div
              key={i}
              className={`relative rounded-xl p-8 transition-all ${
                plan.isPopular
                  ? "bg-primary-500 text-white shadow-2xl shadow-primary-500/30 lg:-translate-y-4"
                  : "bg-surface border border-surface-border hover:border-primary-500/50"
              }`}
            >
              {plan.isPopular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-white text-primary-500 text-[11px] font-bold uppercase tracking-wider py-1 px-4 rounded-full">
                  Meest Gekozen
                </span>
              )}

              <div className="img-placeholder w-20 h-20 rounded-full mb-6 mx-auto" />

              <div className="text-center space-y-2 mb-6">
                <span
                  className={`text-xs uppercase tracking-[0.2em] font-semibold ${
                    plan.isPopular ? "text-white/80" : "text-primary-500"
                  }`}
                >
                  {plan.name}
                </span>
                <div className="flex items-baseline justify-center gap-1">
                  <span className="text-5xl font-extrabold">€{plan.price}</span>
                </div>
                <div className={`text-sm ${plan.isPopular ? "text-white/70" : "text-foreground/50"}`}>
                  Geen automatische verlenging
                </div>
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((f) => (
                  <li
                    key={f}
                    className={`flex items-start gap-3 text-sm ${
                      plan.isPopular ? "text-white/90" : "text-foreground/80"
                    }`}
                  >
                    <Check
                      className={`w-4 h-4 mt-0.5 shrink-0 ${
                        plan.isPopular ? "text-white" : "text-primary-500"
                      }`}
                      strokeWidth={3}
                    />
                    {f}
                  </li>
                ))}
              </ul>

              <Link
                href={plan.ctaUrl}
                className={`flex items-center justify-center w-full py-3.5 rounded-md font-semibold transition-colors ${
                  plan.isPopular
                    ? "bg-white text-primary-500 hover:bg-foreground/90"
                    : "bg-primary-500 text-white hover:bg-primary-400"
                }`}
              >
                Abonneer Nu
              </Link>
            </div>
          ))}
        </div>

        <div className="text-center mt-10 text-foreground/65">
          <span className="text-primary-500 font-bold">100%</span> geld-terug-garantie de eerste 24 uur.{" "}
          <Link href="/contact" className="text-foreground hover:text-primary-500 underline underline-offset-4">
            Lees meer
          </Link>
        </div>
      </div>
    </section>
  );
}
