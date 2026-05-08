import { Quote, Star } from "lucide-react";

interface Testimonial {
  name: string;
  text: string;
  rating: number;
}

interface TestimonialsProps {
  testimonials?: Testimonial[];
}

const defaults: Testimonial[] = [
  {
    name: "Britteney Anderson",
    rating: 5,
    text: "Ondanks dat ik uiteindelijk bij IPTV NL ben gebleven, wil ik Sara complimenteren voor haar professionaliteit, kennis, geduld en uitstekende service.",
  },
  {
    name: "Victor James",
    rating: 5,
    text: "Geef niet op! Jullie doen veel goeds in een industrie die concurrentie nodig heeft. Ondanks dat ik uiteindelijk bij IPTV NL ben gebleven.",
  },
  {
    name: "Lisa de Vries",
    rating: 5,
    text: "Reageert snel, is duidelijk en denkt mee — precies wat ik zocht. De kwaliteit van het beeld is echt 4K, geen enkele buffering.",
  },
];

export function Testimonials({ testimonials }: TestimonialsProps) {
  const items = testimonials && testimonials.length ? testimonials : defaults;

  return (
    <section className="relative bg-ink py-20 lg:py-28 overflow-hidden">
      <div className="container-x">
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-4">
          <span className="eyebrow justify-center inline-flex">Recensies</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight">
            Aardig zijn moet geen{" "}
            <span className="text-primary-500">bijzaak</span> zijn
          </h2>
          <p className="text-foreground/65">
            De recensies zijn binnen — wij zijn net zo geobsedeerd door je internet als jij.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {items.slice(0, 3).map((t, i) => (
            <div
              key={i}
              className="bg-surface border border-surface-border rounded-xl p-7 relative"
            >
              <Quote className="absolute top-6 right-6 w-10 h-10 text-primary-500/15" />

              <div className="flex gap-1 mb-5 text-primary-500">
                {Array.from({ length: 5 }).map((_, j) => (
                  <Star
                    key={j}
                    className={`w-4 h-4 ${
                      j < t.rating ? "fill-current" : "text-surface-border"
                    }`}
                  />
                ))}
              </div>

              <p className="text-foreground/80 leading-relaxed mb-6">
                &ldquo;{t.text}&rdquo;
              </p>

              <div className="flex items-center gap-4 pt-5 border-t border-surface-border">
                <div className="img-placeholder w-12 h-12 rounded-full" />
                <div>
                  <div className="font-extrabold text-white">{t.name}</div>
                  <div className="text-xs text-foreground/50 uppercase tracking-wider">
                    Geverifieerde Klant
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
