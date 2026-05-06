import { Star } from "lucide-react";
import { Card } from "../ui/Card";

interface Testimonial {
  name: string;
  text: string;
  rating: number;
}

interface TestimonialsProps {
  testimonials: Testimonial[];
}

export function Testimonials({ testimonials }: TestimonialsProps) {
  return (
    <section className="py-24 overflow-hidden relative">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl font-heading font-bold mb-6">
            Wat onze klanten <span className="text-accent">zeggen</span>
          </h2>
          <p className="text-lg text-foreground/70">
            Duizenden tevreden klanten in Nederland en België gingen je voor.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, i) => (
            <Card key={i} variant="glass" className="flex flex-col">
              <div className="flex gap-1 mb-6 text-accent">
                {Array.from({ length: 5 }).map((_, j) => (
                  <Star
                    key={j}
                    className={`w-5 h-5 ${j < testimonial.rating ? "fill-current" : "text-surface-border"}`}
                  />
                ))}
              </div>
              <p className="text-foreground/80 italic mb-8 flex-1 text-lg">
                &quot;{testimonial.text}&quot;
              </p>
              <div className="flex items-center gap-4 mt-auto">
                <div className="w-10 h-10 rounded-full bg-primary-500/20 flex items-center justify-center text-primary-400 font-bold font-heading">
                  {testimonial.name.charAt(0)}
                </div>
                <div>
                  <div className="font-semibold">{testimonial.name}</div>
                  <div className="text-sm text-foreground/50">Geverifieerde Klant</div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
