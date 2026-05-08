import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export function MoviesGrid() {
  return (
    <section className="relative bg-ink py-20 lg:py-28 overflow-hidden">
      <div className="container-x">
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-4">
          <span className="eyebrow justify-center inline-flex">Geniet van je tijd</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight">
            Kijk nu films, series, shows,{" "}
            <span className="text-primary-500">anime en meer</span>
          </h2>
        </div>

        <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-4">
          {Array.from({ length: 12 }).map((_, i) => (
            <Link
              key={i}
              href="/pricing"
              className="group relative img-placeholder rounded-lg overflow-hidden aspect-[2/3] block"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-transparent opacity-60 group-hover:opacity-90 transition-opacity" />
              <div className="absolute inset-0 flex items-end p-3 translate-y-2 group-hover:translate-y-0 transition-transform">
                <div className="text-xs font-semibold text-white opacity-0 group-hover:opacity-100 transition-opacity">
                  Bekijk nu
                </div>
              </div>
              <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-primary-500/0 group-hover:bg-primary-500 flex items-center justify-center text-white transition-all opacity-0 group-hover:opacity-100">
                <ArrowUpRight className="w-4 h-4" />
              </div>
            </Link>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-5 mt-12">
          <span className="text-foreground/70">Alles wat je nodig hebt om te genieten van je tijd</span>
          <Link href="/pricing" className="btn-red">
            Krijg het nu
          </Link>
        </div>
      </div>
    </section>
  );
}
