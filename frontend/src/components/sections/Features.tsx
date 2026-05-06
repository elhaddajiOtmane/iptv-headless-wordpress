import { Card } from "../ui/Card";
import { Tv, Zap, Shield, Smartphone, Globe, Headphones } from "lucide-react";

interface Feature {
  title: string;
  description: string;
  iconName: string;
}

interface FeaturesProps {
  features: Feature[];
}

export function Features({ features }: FeaturesProps) {
  // Map icon strings to lucide-react icons
  const getIcon = (name: string) => {
    switch (name.toLowerCase()) {
      case "tv": return <Tv className="w-8 h-8" />;
      case "zap": return <Zap className="w-8 h-8" />;
      case "shield": return <Shield className="w-8 h-8" />;
      case "smartphone": return <Smartphone className="w-8 h-8" />;
      case "globe": return <Globe className="w-8 h-8" />;
      case "headphones": return <Headphones className="w-8 h-8" />;
      default: return <Tv className="w-8 h-8" />;
    }
  };

  return (
    <section id="features" className="py-24 bg-surface/30">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl font-heading font-bold mb-6">
            Waarom kiezen voor <span className="text-gradient">IPTV NL</span>?
          </h2>
          <p className="text-lg text-foreground/70">
            Ontdek alle voordelen van ons premium IPTV netwerk. Sneller, stabieler en meer content dan ooit tevoren.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, i) => (
            <Card key={i} variant="bordered" className="group hover:border-primary-500/50 transition-colors">
              <div className="w-14 h-14 rounded-xl bg-primary-500/10 text-primary-400 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-primary-500 group-hover:text-white transition-all">
                {getIcon(feature.iconName)}
              </div>
              <h3 className="text-xl font-heading font-semibold mb-3">{feature.title}</h3>
              <p className="text-foreground/70 leading-relaxed">
                {feature.description}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
