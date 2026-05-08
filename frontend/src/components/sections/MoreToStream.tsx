import Link from "next/link";
import { Check } from "lucide-react";

export function MoreToStream() {
  return (
    <section className="relative bg-surface-2 py-20 lg:py-28 overflow-hidden">
      <div className="absolute top-1/2 -left-24 w-[300px] h-[300px] -translate-y-1/2 bg-primary-500/5 blur-[80px] rounded-full" />

      <div className="container-x grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        <div className="space-y-6">
          <span className="eyebrow">Onze content</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight">
            Meer om te <span className="text-primary-500">streamen</span>
          </h2>
          <p className="text-foreground/70 text-lg leading-relaxed">
            Met onze grote en uitgebreide collectie TV-kanalen mis je nooit meer je
            favoriete sportwedstrijden of TV-shows. Wees de eerste die nieuwe afleveringen
            ziet.
          </p>
          <p className="text-foreground/65 leading-relaxed">
            Bekijk wekelijks exclusieve sport kanalen. Top-rated klantenservice. Bundel je
            favoriete diensten in één abonnement.
          </p>

          <ul className="space-y-3 pt-2">
            {["25.000 wereldwijde 4K kanalen", "500K nieuwe en oude films"].map((item) => (
              <li key={item} className="flex items-center gap-3 text-foreground/85">
                <span className="w-6 h-6 rounded-full bg-primary-500/15 text-primary-500 flex items-center justify-center">
                  <Check className="w-3.5 h-3.5" strokeWidth={3} />
                </span>
                {item}
              </li>
            ))}
          </ul>

          <div className="pt-4">
            <Link href="/pricing" className="btn-red">
              Bekijk Content Lijst
            </Link>
          </div>
        </div>

        <div className="relative">
          <div className="grid grid-cols-2 gap-4">
            <div className="img-placeholder rounded-xl aspect-[4/5]" />
            <div className="img-placeholder rounded-xl aspect-[4/5] mt-12" />
          </div>
          {/* Floating play badge */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full bg-primary-500 flex items-center justify-center text-white shadow-2xl">
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 ml-1">
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
