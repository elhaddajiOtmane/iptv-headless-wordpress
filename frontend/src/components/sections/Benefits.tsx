import { Tv, Zap, Headphones, ShieldCheck, Wrench, Tag } from "lucide-react";

const benefits = [
  {
    icon: Tv,
    title: "Top Kanalen",
    description: "Geniet van top-rated TV kanalen met de beste streaming ervaring.",
  },
  {
    icon: Zap,
    title: "Snel Verbonden",
    description: "Direct toegang na inschrijving — gebruik dezelfde inloggegevens overal.",
  },
  {
    icon: Headphones,
    title: "24/7 Support",
    description: "Krijg 24 uur per dag, 7 dagen per week technische ondersteuning.",
  },
  {
    icon: ShieldCheck,
    title: "Privacy & Veiligheid",
    description: "Eenmalige betaling met 256-Bit encryptie. Je gegevens zijn veilig.",
  },
  {
    icon: Wrench,
    title: "DIY Installatie",
    description: "Geen tech-savvy nodig. Download de app op je TV en je bent klaar.",
  },
  {
    icon: Tag,
    title: "Beste Prijzen",
    description: "Je vindt nergens een betere prijs voor deze kwaliteit en service.",
  },
];

export function Benefits() {
  return (
    <section className="relative bg-surface-2 py-20 lg:py-28 overflow-hidden">
      <div className="container-x">
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-4">
          <span className="eyebrow justify-center inline-flex">Voordelen</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight">
            Alleen <span className="text-primary-500">voordelen</span>
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((b) => {
            const Icon = b.icon;
            return (
              <div
                key={b.title}
                className="group bg-surface border border-surface-border hover:border-primary-500/40 rounded-xl p-6 transition-colors"
              >
                <div className="flex gap-5 items-start">
                  <div className="w-14 h-14 rounded-lg bg-ink border border-surface-border text-primary-500 group-hover:bg-primary-500 group-hover:text-white flex items-center justify-center shrink-0 transition-colors">
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-extrabold mb-2">{b.title}</h3>
                    <p className="text-foreground/65 text-sm leading-relaxed">
                      {b.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
