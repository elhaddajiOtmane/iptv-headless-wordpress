import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export function SportsNewsBanners() {
  return (
    <section className="relative bg-ink py-12 overflow-hidden">
      <div className="container-x grid md:grid-cols-2 gap-6">
        {/* Sports banner */}
        <div className="relative img-placeholder rounded-2xl p-8 lg:p-12 min-h-[300px] flex flex-col justify-end overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/70 to-transparent" />
          <div className="relative space-y-4 max-w-md">
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold leading-tight">
              Mis je <span className="text-primary-500">favoriete</span> wedstrijd niet
            </h3>
            <Link
              href="/pricing"
              className="inline-flex items-center gap-2 text-white font-semibold hover:text-primary-500 transition-colors"
            >
              Bekijk alle voetbal competities
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* News banner */}
        <div className="relative img-placeholder rounded-2xl p-8 lg:p-12 min-h-[300px] flex flex-col justify-end overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/70 to-transparent" />
          <div className="relative space-y-4 max-w-md">
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold leading-tight">
              Mis geen enkel <span className="text-primary-500">nieuws</span> meer
            </h3>
            <Link
              href="/pricing"
              className="inline-flex items-center gap-2 text-white font-semibold hover:text-primary-500 transition-colors"
            >
              Bekijk alle nieuwskanalen
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
