import { Check } from "lucide-react";
import { Card } from "./Card";
import { Button } from "./Button";

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
    <Card 
      variant={isPopular ? "glass" : "bordered"} 
      className={`relative flex flex-col h-full ${isPopular ? 'border-primary-500/50 scale-105 z-10' : ''}`}
    >
      {isPopular && (
        <div className="absolute -top-4 left-0 right-0 flex justify-center">
          <span className="bg-gradient-to-r from-primary-400 to-accent text-white text-xs font-bold uppercase tracking-wider py-1 px-3 rounded-full">
            Meest Gekozen
          </span>
        </div>
      )}

      <div className="text-center mb-8">
        <h3 className="text-xl font-heading font-semibold text-foreground/80 mb-2">{name}</h3>
        <div className="flex items-baseline justify-center gap-1">
          <span className="text-4xl font-heading font-bold text-foreground">€{price}</span>
          <span className="text-foreground/50">/{period}</span>
        </div>
      </div>

      <ul className="space-y-4 mb-8 flex-1">
        {features.map((feature, i) => (
          <li key={i} className="flex items-start gap-3 text-foreground/80">
            <Check className="w-5 h-5 text-accent shrink-0 mt-0.5" />
            <span className="text-sm">{feature.trim()}</span>
          </li>
        ))}
      </ul>

      <Button
        href={ctaUrl}
        variant={isPopular ? "primary" : "secondary"}
        size="lg"
        className="w-full"
      >
        Bestel Nu
      </Button>
    </Card>
  );
}
