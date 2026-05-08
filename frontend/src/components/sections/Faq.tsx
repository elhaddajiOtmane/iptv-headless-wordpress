"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";

const faqs = [
  {
    question: "Welke apparaten worden ondersteund?",
    answer:
      "Onze IPTV werkt op vrijwel alle moderne apparaten: smart TVs, Android/iOS smartphones en tablets, Apple TV, Fire Stick, MAG-boxen, en op je computer via een browser of VLC.",
  },
  {
    question: "Hoe krijg ik technische ondersteuning?",
    answer:
      "Ons supportteam is 24/7 bereikbaar via WhatsApp, e-mail en live chat. We reageren doorgaans binnen enkele minuten.",
  },
  {
    question: "Hoe lang duurt het voor ik de service kan gebruiken?",
    answer:
      "Direct na betaling ontvang je per e-mail je inloggegevens. Activatie gebeurt automatisch en je kunt meteen beginnen met kijken.",
  },
  {
    question: "Hoe zit het met het terugbetalingsbeleid?",
    answer:
      "Je hebt de eerste 24 uur na aanschaf een 100% geld-terug-garantie. Niet tevreden? Dan krijg je het volledige bedrag terug.",
  },
  {
    question: "Kan ik op meerdere apparaten tegelijk kijken?",
    answer:
      "Ja, afhankelijk van je gekozen pakket kun je op 1, 2 of meerdere apparaten gelijktijdig streamen.",
  },
];

export function Faq() {
  const [open, setOpen] = useState<number>(0);

  return (
    <section className="relative bg-ink py-20 lg:py-28 overflow-hidden">
      <div className="container-x grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        <div className="space-y-6">
          <span className="eyebrow">FAQ</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight">
            Vind wat je{" "}
            <span className="text-primary-500">wilt weten</span>
          </h2>

          <div className="space-y-3 pt-4">
            {faqs.map((faq, i) => {
              const isOpen = open === i;
              return (
                <div
                  key={i}
                  className={`border rounded-lg transition-colors overflow-hidden ${
                    isOpen
                      ? "bg-surface border-primary-500/40"
                      : "bg-surface/50 border-surface-border hover:border-surface-border"
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? -1 : i)}
                    className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left"
                  >
                    <span className="font-semibold text-foreground">{faq.question}</span>
                    <span
                      className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-colors ${
                        isOpen ? "bg-primary-500 text-white" : "bg-ink text-foreground/70"
                      }`}
                    >
                      {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                    </span>
                  </button>
                  <div
                    className={`grid transition-all duration-300 ${
                      isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="px-5 pb-5 text-foreground/70 leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="relative hidden lg:block">
          <div className="img-placeholder rounded-2xl aspect-[3/4]" />
          <div className="absolute top-8 -left-6 bg-surface border border-surface-border rounded-lg p-4 flex items-center gap-3 shadow-xl">
            <div className="w-10 h-10 rounded-full bg-primary-500 text-white flex items-center justify-center font-bold">
              ?
            </div>
            <div>
              <div className="text-xs text-foreground/50 uppercase tracking-wider">Hulp nodig?</div>
              <div className="font-semibold text-white">24/7 Support</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
