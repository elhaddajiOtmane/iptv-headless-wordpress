import Link from "next/link";
import { Search, Tv, MonitorSmartphone, Clapperboard } from "lucide-react";

interface HeroProps {
  title: string;
  subtitle: string;
  ctaText: string;
  ctaUrl: string;
}

function MarqueeRow({
  count,
  size,
  direction,
  ratio,
}: {
  count: number;
  size: string;
  direction: "left" | "right";
  ratio: string;
}) {
  const items = Array.from({ length: count });
  return (
    <div className="overflow-hidden mask-fade">
      <div
        className={`marquee-track ${direction === "left" ? "marquee-left" : "marquee-right"}`}
      >
        {[...items, ...items].map((_, i) => (
          <div
            key={i}
            className={`img-placeholder shrink-0 rounded-lg ${size}`}
            style={{ aspectRatio: ratio }}
          />
        ))}
      </div>
    </div>
  );
}

export function Hero({ title, subtitle, ctaText, ctaUrl }: HeroProps) {
  const cleanTitle = title.replace(/\*\*(.*?)\*\*/g, "$1");

  return (
    <section className="relative overflow-hidden bg-ink pt-16 pb-24 lg:pt-20 lg:pb-32">
      {/* Background gradient + glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[600px] bg-primary-500/10 blur-[120px] rounded-full" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_0%,rgba(10,10,10,0.5)_60%,#0a0a0a_100%)]" />
      </div>

      {/* Background marquee rows of poster placeholders */}
      <div className="absolute inset-0 flex flex-col justify-center gap-3 opacity-40 pointer-events-none">
        <MarqueeRow count={9} direction="left" size="w-44 lg:w-56" ratio="2/3" />
        <MarqueeRow count={9} direction="right" size="w-44 lg:w-56" ratio="2/3" />
        <MarqueeRow count={9} direction="left" size="w-44 lg:w-56" ratio="2/3" />
      </div>

      <div className="absolute inset-0 bg-gradient-to-b from-ink/80 via-ink/60 to-ink pointer-events-none" />

      <div className="container-x relative z-10">
        <div className="max-w-3xl mx-auto text-center space-y-8 py-16 lg:py-24">
          <span className="eyebrow justify-center">Snelle IPTV verbinding</span>

          <h1
            className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.05]"
            dangerouslySetInnerHTML={{
              __html: cleanTitle.replace(
                /(IPTV|Premium|Streaming|Top Quality)/i,
                '<span class="text-primary-500">$1</span>'
              ),
            }}
          />

          <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
            {subtitle}
          </p>

          <form
            className="max-w-2xl mx-auto flex flex-col sm:flex-row gap-3 bg-surface/80 backdrop-blur-md p-2 rounded-md border border-surface-border"
            action={ctaUrl}
          >
            <div className="flex items-center gap-3 flex-1 px-4">
              <Search className="w-5 h-5 text-foreground/40 shrink-0" />
              <input
                type="text"
                placeholder="Zoek je favoriete content..."
                className="bg-transparent flex-1 h-12 outline-none text-foreground placeholder:text-foreground/40"
              />
            </div>
            <Link href={ctaUrl} className="btn-red shrink-0">
              {ctaText}
            </Link>
          </form>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-x-10 gap-y-3 pt-4 text-sm text-foreground/70">
            <span className="flex items-center gap-2">
              <MonitorSmartphone className="w-4 h-4 text-primary-500" />
              Verbind meerdere apparaten tegelijk
            </span>
            <span className="flex items-center gap-2">
              <Tv className="w-4 h-4 text-primary-500" />
              25.000+ kanalen in 4K
            </span>
            <span className="flex items-center gap-2">
              <Clapperboard className="w-4 h-4 text-primary-500" />
              500K+ films & series
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
