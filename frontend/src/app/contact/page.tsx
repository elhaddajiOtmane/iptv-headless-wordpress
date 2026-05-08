import { Metadata } from "next";
import { getPageByUri } from "@/lib/queries/pages";
import { buildMetadata, webPageJsonLd } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";
import { ContactForm } from "@/components/ui/ContactForm";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { Mail, MapPin, Phone } from "lucide-react";
import { Card } from "@/components/ui/Card";

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPageByUri("/contact");
  return buildMetadata({
    seo: page?.seo,
    fallbackTitle: "Contact",
    fallbackDescription:
      "Neem contact met ons op voor al uw vragen over onze IPTV diensten.",
    path: "/contact",
  });
}

const fallbackContact = {
  emailAddress: "info@iptv-nederland.com",
  whatsappNumber: "+31000000000",
  physicalAddress: "Nederland",
};

export default async function ContactPage() {
  const page = await getPageByUri("/contact");
  const { emailAddress, whatsappNumber, physicalAddress } =
    page?.contactFields ?? fallbackContact;

  return (
    <div className="flex flex-col min-h-screen">
      <JsonLd data={webPageJsonLd({
        title: page?.seo?.title || "Contact",
        description: page?.seo?.metaDesc || "Neem contact op",
        path: "/contact",
      })} />
      <main className="flex-1 bg-ink py-20 lg:py-28">
        <div className="container-x max-w-6xl">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="eyebrow justify-center inline-flex">Contact</span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight">
              Neem <span className="text-primary-500">contact</span> op
            </h1>
            <p className="text-lg text-foreground/70">
              Heb je een vraag over onze pakketten, installatie of iets anders? Ons support team staat 7 dagen per week voor je klaar.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
            {/* Contact Info & Direct Links */}
            <div className="space-y-8">
              <h2 className="text-3xl font-heading font-bold">Contact Informatie</h2>
              <p className="text-foreground/70 text-lg leading-relaxed">
                De snelste manier om ons te bereiken is via WhatsApp. Stuur ons een berichtje en we antwoorden doorgaans binnen enkele minuten.
              </p>

              <div className="space-y-6 pt-4">
                {whatsappNumber && (
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-[#25D366]/10 flex items-center justify-center text-[#25D366] shrink-0">
                      <Phone className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">WhatsApp</h3>
                      <p className="text-foreground/70 mb-2">{whatsappNumber}</p>
                      <WhatsAppButton phoneNumber={whatsappNumber} />
                    </div>
                  </div>
                )}

                {emailAddress && (
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary-500/10 flex items-center justify-center text-primary-400 shrink-0">
                      <Mail className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">E-mail</h3>
                      <a href={`mailto:${emailAddress}`} className="text-primary-400 hover:underline">
                        {emailAddress}
                      </a>
                    </div>
                  </div>
                )}

                {physicalAddress && (
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-surface-border flex items-center justify-center shrink-0">
                      <MapPin className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">Adres</h3>
                      <p className="text-foreground/70 whitespace-pre-line">
                        {physicalAddress}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <Card variant="glass" className="p-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary-500/10 rounded-full blur-3xl" />
                <div className="relative z-10">
                  <h2 className="text-2xl font-heading font-bold mb-6">Stuur een bericht</h2>
                  <ContactForm />
                </div>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
