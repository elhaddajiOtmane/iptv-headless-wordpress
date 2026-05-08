import Link from "next/link";
import { Check, Star } from "lucide-react";

export function WhoWeAre() {
  return (
    <section className="relative bg-ink py-20 lg:py-28 overflow-hidden">
      <div className="absolute -top-20 -right-20 w-[400px] h-[400px] rounded-full bg-primary-500/5 blur-[100px]" />

      <div className="container-x grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        {/* Left: Image collage */}
        <div className="relative">
          <div className="grid grid-cols-2 gap-4">
            <div className="img-placeholder rounded-lg aspect-[3/4]" />
            <div className="space-y-4 mt-12">
              <div className="img-placeholder rounded-lg aspect-square" />
              <div className="bg-primary-500 rounded-lg aspect-square flex flex-col items-center justify-center text-white p-6 text-center">
                <Star className="w-8 h-8 mb-2 fill-white" />
                <div className="text-sm font-medium uppercase tracking-wider opacity-90">
                  5 Star Reviews
                </div>
                <div className="text-5xl font-extrabold mt-2">500K</div>
                <div className="text-xs uppercase tracking-wider opacity-90 mt-1">
                  Active Subscriptions
                </div>
              </div>
            </div>
          </div>

          {/* Floating stats card */}
          <div className="absolute -bottom-6 -left-4 sm:left-8 bg-surface-2 border border-surface-border rounded-lg p-5 flex items-center gap-4 shadow-xl">
            <div className="img-placeholder w-12 h-12 rounded-md" />
            <div>
              <div className="text-xs text-foreground/50 uppercase tracking-wider">Rating</div>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-extrabold text-white">4.7</span>
                <div className="flex text-primary-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3 h-3 fill-current" />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Content */}
        <div className="space-y-6">
          <span className="eyebrow">Wie zijn wij</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight">
            Wij zijn trots om de beste{" "}
            <span className="text-primary-500">IPTV abonnementen</span> aan te bieden
          </h2>
          <p className="text-foreground/70 leading-relaxed text-lg">
            Onze beste IPTV abonnementen bieden hoge kwaliteit streaming, zonder buffering
            of vertraging. Navigeer eenvoudig door de kanalen via onze gebruiksvriendelijke
            interface en geniet van een vlekkeloze ervaring.
          </p>

          <ul className="space-y-3 pt-2">
            {[
              "Verbind meerdere apparaten tegelijkertijd",
              "Razendsnelle download snelheden — overal beschikbaar",
              "Volledig dekkende wifi connectie in huis",
            ].map((item) => (
              <li key={item} className="flex items-start gap-3 text-foreground/85">
                <span className="w-6 h-6 rounded-full bg-primary-500/15 text-primary-500 flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3.5 h-3.5" strokeWidth={3} />
                </span>
                {item}
              </li>
            ))}
          </ul>

          <div className="pt-4">
            <Link href="/pricing" className="btn-red">
              Abonneer Nu
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
