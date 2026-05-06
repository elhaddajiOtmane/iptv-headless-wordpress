import Image from "next/image";
import { Button } from "../ui/Button";
import { WPImage } from "@/lib/types";

interface HeroProps {
  title: string;
  subtitle: string;
  ctaText: string;
  ctaUrl: string;
  image?: WPImage;
}

export function Hero({ title, subtitle, ctaText, ctaUrl, image }: HeroProps) {
  return (
    <section className="relative overflow-hidden pt-24 pb-32 lg:pt-36 lg:pb-40">
      {/* Background decorations */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-500/20 rounded-full blur-[128px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/20 rounded-full blur-[128px]" />
      </div>

      <div className="container relative mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-24">
          <div className="flex-1 text-center lg:text-left space-y-8">
            <h1 
              className="text-5xl lg:text-7xl font-heading font-extrabold tracking-tight leading-[1.1]"
              dangerouslySetInnerHTML={{ __html: title.replace(/\*\*(.*?)\*\*/g, '<span class="text-gradient">$1</span>') }}
            />
            <p className="text-xl text-foreground/80 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              {subtitle}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
              <Button href={ctaUrl} size="lg" className="w-full sm:w-auto px-10">
                {ctaText}
              </Button>
              <Button href="#features" variant="ghost" size="lg" className="w-full sm:w-auto">
                Meer Informatie
              </Button>
            </div>
          </div>

          {image && (
            <div className="flex-1 w-full max-w-2xl lg:max-w-none relative">
              <div className="relative aspect-video rounded-2xl overflow-hidden glass-card">
                <Image
                  src={image.sourceUrl}
                  alt={image.altText || "IPTV preview"}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
