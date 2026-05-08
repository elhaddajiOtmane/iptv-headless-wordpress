import Link from "next/link";
import { Check } from "lucide-react";

interface PricingCardProps {
  name: string;
  price: string;
  period: string;
  isPopular?: boolean;
  ctaUrl: string;
  featuresList: string;
}

export function PricingCard({
  name,
  price,
  period,
  isPopular,
  ctaUrl,
  featuresList,
}: PricingCardProps) {
  const features = featuresList.split("\n").filter(Boolean);

  return (
    <div
      className={`relative rounded-xl p-8 transition-all flex flex-col h-full ${
        isPopular
          ? "bg-primary-500 text-white shadow-2xl shadow-primary-500/30 lg:-translate-y-4"
          : "bg-surface border border-surface-border hover:border-primary-500/50"
      }`}
    >
      {isPopular && (
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-white text-primary-500 text-[11px] font-bold uppercase tracking-wider py-1 px-4 rounded-full">
          Meest Gekozen
        </span>
      )}

      <div className="img-placeholder w-20 h-20 rounded-full mb-6 mx-auto" />

      <div className="text-center space-y-2 mb-6">
        <span
          className={`text-xs uppercase tracking-[0.2em] font-semibold ${
            isPopular ? "text-white/80" : "text-primary-500"
          }`}
        >
          {name}
        </span>
        <div className="flex items-baseline justify-center gap-1">
          <span className="text-5xl font-extrabold">€{price}</span>
          <span className={isPopular ? "text-white/70" : "text-foreground/50"}>
            /{period}
          </span>
        </div>
      </div>

      <ul className="space-y-3 mb-8 flex-1">
        {features.map((f, i) => (
          <li
            key={i}
            className={`flex items-start gap-3 text-sm ${
              isPopular ? "text-white/90" : "text-foreground/80"
            }`}
          >
            <Check
              className={`w-4 h-4 mt-0.5 shrink-0 ${
                isPopular ? "text-white" : "text-primary-500"
              }`}
              strokeWidth={3}
            />
            {f.trim()}
          </li>
        ))}
      </ul>

      <Link
        href={ctaUrl}
        className={`flex items-center justify-center w-full py-3.5 rounded-md font-semibold transition-colors ${
          isPopular
            ? "bg-white text-primary-500 hover:bg-foreground/90"
            : "bg-primary-500 text-white hover:bg-primary-400"
        }`}
      >
        Bestel Nu
      </Link>
    </div>
  );
}
