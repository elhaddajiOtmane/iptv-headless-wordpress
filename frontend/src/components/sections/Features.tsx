import Link from "next/link";
import { ArrowUpRight, Tv, Film, Smartphone } from "lucide-react";

interface Feature {
  title: string;
  description: string;
  iconName: string;
}

interface FeaturesProps {
  features?: Feature[];
}

const defaultFeatures: Feature[] = [
  {
    title: "TV & Streaming",
    description:
      "Bekijk de grootste wedstrijden en PPV evenementen. Pak een grote bak popcorn en beleef de spanning.",
    iconName: "tv",
  },
  {
    title: "Geselecteerde Content",
    description:
      "Een zorgvuldig samengestelde collectie van films, series, sport en live TV — altijd up-to-date.",
    iconName: "film",
  },
  {
    title: "Op je Mobiel",
    description:
      "Kijk overal en altijd op je smartphone, tablet of smart TV. Naadloos schakelen tussen apparaten.",
    iconName: "smartphone",
  },
];

const ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  tv: Tv,
  film: Film,
  smartphone: Smartphone,
};

export function Features({ features }: FeaturesProps) {
  const items = features && features.length ? features : defaultFeatures;
  const ctaLabels = ["Shop Nu", "Bekijk Content", "Download App"];

  return (
    <section id="features" className="relative bg-ink py-20 lg:py-28 overflow-hidden">
      <div className="container-x">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div className="space-y-4 max-w-xl">
            <span className="eyebrow">Eigenschappen</span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight">
              Wat maakt ons <span className="text-primary-500">anders</span>
            </h2>
          </div>
          <Link
            href="/pricing"
            className="text-primary-500 font-semibold flex items-center gap-2 hover:gap-3 transition-all"
          >
            Ontdek Alle Eigenschappen <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {items.slice(0, 3).map((feature, i) => {
            const Icon = ICONS[feature.iconName?.toLowerCase()] || Tv;
            return (
              <div
                key={i}
                className="group relative bg-surface border border-surface-border hover:border-primary-500/50 rounded-lg p-8 transition-all overflow-hidden"
              >
                {/* Big number stamp */}
                <div className="absolute top-6 right-6 number-stamp">{String(i + 1).padStart(2, "0")}</div>

                {/* Hover red wash */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary-500/0 to-primary-500/0 group-hover:from-primary-500/10 group-hover:to-transparent transition-opacity" />

                <div className="relative">
                  <div className="w-16 h-16 rounded-lg bg-primary-500/10 text-primary-500 flex items-center justify-center mb-6 group-hover:bg-primary-500 group-hover:text-white transition-colors">
                    <Icon className="w-7 h-7" />
                  </div>
                  <h3 className="text-2xl font-extrabold mb-3">{feature.title}</h3>
                  <p className="text-foreground/65 leading-relaxed mb-6">
                    {feature.description}
                  </p>
                  <Link
                    href="/pricing"
                    className="inline-flex items-center gap-2 text-foreground/80 font-medium group-hover:text-primary-500 transition-colors"
                  >
                    {ctaLabels[i] || "Lees Meer"}
                    <ArrowUpRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
