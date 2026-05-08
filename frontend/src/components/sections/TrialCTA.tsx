import Link from "next/link";
import { Phone, ArrowRight } from "lucide-react";

export function TrialCTA() {
  return (
    <section className="relative bg-ink py-20 lg:py-28 overflow-hidden">
      <div className="container-x grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        <div className="relative">
          <div className="img-placeholder rounded-2xl aspect-[4/3]" />
          <div className="absolute -bottom-6 -right-4 sm:right-8 bg-primary-500 rounded-xl p-6 text-white shadow-2xl">
            <div className="text-xs uppercase tracking-[0.25em] opacity-90">Ervaring</div>
            <div className="text-5xl font-extrabold mt-1">10 Jr</div>
          </div>
        </div>

        <div className="space-y-6">
          <span className="eyebrow">Test eerst</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight">
            Begin nu. Aarzel niet om{" "}
            <span className="text-primary-500">onze service te testen</span>
          </h2>
          <p className="text-foreground/70 text-lg">
            Test account. Volledige toegang tot alle kanalen en VOD.
          </p>

          <div className="bg-surface border border-surface-border rounded-xl p-6 flex items-center justify-between gap-6">
            <div>
              <div className="text-3xl font-extrabold text-white">€14.99 / maand</div>
              <div className="text-sm text-foreground/60 mt-1">
                1 maand testen — tevreden of geld terug.
              </div>
            </div>
            <Link
              href="/pricing"
              className="hidden sm:inline-flex w-12 h-12 rounded-full bg-primary-500 text-white items-center justify-center hover:bg-primary-400 transition-colors shrink-0"
            >
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/pricing" className="btn-red">
              Test Onze Service
            </Link>
            <a
              href="tel:+31000000000"
              className="inline-flex items-center gap-3 text-foreground/85 hover:text-primary-500 transition-colors"
            >
              <span className="w-10 h-10 rounded-full border border-surface-border flex items-center justify-center">
                <Phone className="w-4 h-4" />
              </span>
              <span>
                <span className="block text-xs text-foreground/50">Bel voor info</span>
                <span className="font-semibold">+31 000 000 000</span>
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
