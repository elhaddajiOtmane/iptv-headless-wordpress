import Link from "next/link";
import { Phone } from "lucide-react";
import { getMenu } from "@/lib/queries/menus";
import { getGlobalOptions } from "@/lib/queries/globals";

const SocialIcon = ({ d }: { d: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4" aria-hidden="true">
    <path d={d} />
  </svg>
);

const SOCIALS: { label: string; href: string; d: string }[] = [
  {
    label: "Facebook",
    href: "#",
    d: "M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06C2 17.08 5.66 21.21 10.44 22v-7.03H7.9v-2.91h2.54V9.85c0-2.51 1.49-3.89 3.77-3.89 1.09 0 2.24.19 2.24.19v2.47h-1.26c-1.24 0-1.63.77-1.63 1.56v1.87h2.78l-.44 2.91h-2.34V22C18.34 21.21 22 17.08 22 12.06z",
  },
  {
    label: "Twitter",
    href: "#",
    d: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z",
  },
  {
    label: "Instagram",
    href: "#",
    d: "M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.71 3.71 0 0 1-1.38-.9 3.71 3.71 0 0 1-.9-1.38c-.16-.42-.36-1.06-.41-2.23-.06-1.27-.07-1.65-.07-4.85s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41C8.42 2.17 8.8 2.16 12 2.16zm0 5.5a4.34 4.34 0 1 0 0 8.68 4.34 4.34 0 0 0 0-8.68zm0 7.16a2.82 2.82 0 1 1 0-5.64 2.82 2.82 0 0 1 0 5.64zm5.52-7.34a1.02 1.02 0 1 1-2.03 0 1.02 1.02 0 0 1 2.03 0z",
  },
  {
    label: "YouTube",
    href: "#",
    d: "M23.5 6.2a3.02 3.02 0 0 0-2.12-2.13C19.5 3.55 12 3.55 12 3.55s-7.5 0-9.38.52A3.02 3.02 0 0 0 .5 6.2 31.7 31.7 0 0 0 0 12a31.7 31.7 0 0 0 .5 5.8 3.02 3.02 0 0 0 2.12 2.13C4.5 20.45 12 20.45 12 20.45s7.5 0 9.38-.52a3.02 3.02 0 0 0 2.12-2.13c.34-1.9.5-3.83.5-5.8 0-1.97-.16-3.9-.5-5.8zM9.6 15.6V8.4l6.27 3.6-6.27 3.6z",
  },
];

export async function Footer() {
  const menu = await getMenu("FOOTER");
  const globals = await getGlobalOptions();

  const menuItems = menu?.menuItems?.nodes || [];
  const footerText = globals?.footerText || "© 2026 IPTV Nederland. Alle rechten voorbehouden.";

  const services = [
    { label: "Internet", path: "/pricing" },
    { label: "TV", path: "/pricing" },
    { label: "Telefoon", path: "/contact" },
    { label: "Wireless", path: "/pricing" },
    { label: "Pakketten", path: "/pricing" },
  ];

  const company = [
    { label: "Over Ons", path: "/contact" },
    { label: "Pakketten", path: "/pricing" },
    { label: "Contact", path: "/contact" },
    { label: "Privacy", path: "/privacy" },
    { label: "Voorwaarden", path: "/voorwaarden" },
  ];

  const info = [
    { label: "Blog", path: "/blog" },
    { label: "Resources", path: "/blog" },
    { label: "Locaties", path: "/contact" },
    { label: "Betalen", path: "/contact" },
  ];

  return (
    <footer className="bg-ink-soft border-t border-surface-border mt-auto">
      <div className="container-x py-16 lg:py-20">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-10 lg:gap-8">
          {/* Brand column */}
          <div className="col-span-2 space-y-6">
            <Link href="/" className="inline-flex items-center gap-2">
              <div className="img-placeholder w-10 h-10 rounded-md flex items-center justify-center">
                <span className="text-primary-500 font-extrabold text-xl">N</span>
              </div>
              <span className="text-2xl font-extrabold tracking-tight text-white">
                IPTV<span className="text-primary-500">.</span>NL
              </span>
            </Link>
            <p className="text-foreground/60 max-w-sm leading-relaxed">
              We helpen onze gemeenschappen verbinden, werken en floreren sinds 2015.
              Premium IPTV — gemaakt voor Nederland en België.
            </p>

            <div>
              <h4 className="text-sm font-semibold text-foreground/50 uppercase tracking-[0.2em] mb-4">
                Sociale Media
              </h4>
              <div className="flex gap-3">
                {SOCIALS.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    aria-label={s.label}
                    className="w-10 h-10 rounded-full border border-surface-border flex items-center justify-center text-foreground/70 hover:bg-primary-500 hover:text-white hover:border-primary-500 transition-colors"
                  >
                    <SocialIcon d={s.d} />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-base font-extrabold text-white mb-5 relative pb-3">
              Services
              <span className="absolute bottom-0 left-0 w-8 h-[2px] bg-primary-500" />
            </h3>
            <ul className="space-y-3">
              {services.map((s) => (
                <li key={s.label}>
                  <Link
                    href={s.path}
                    className="text-foreground/65 hover:text-primary-500 transition-colors text-sm"
                  >
                    {s.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-base font-extrabold text-white mb-5 relative pb-3">
              Bedrijf
              <span className="absolute bottom-0 left-0 w-8 h-[2px] bg-primary-500" />
            </h3>
            <ul className="space-y-3">
              {(menuItems.length ? menuItems.map(m => ({ label: m.label, path: m.path })) : company).map((c) => (
                <li key={c.label}>
                  <Link
                    href={c.path}
                    className="text-foreground/65 hover:text-primary-500 transition-colors text-sm"
                  >
                    {c.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Information / Contact */}
          <div>
            <h3 className="text-base font-extrabold text-white mb-5 relative pb-3">
              Informatie
              <span className="absolute bottom-0 left-0 w-8 h-[2px] bg-primary-500" />
            </h3>
            <ul className="space-y-3 mb-6">
              {info.map((c) => (
                <li key={c.label}>
                  <Link
                    href={c.path}
                    className="text-foreground/65 hover:text-primary-500 transition-colors text-sm"
                  >
                    {c.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Contact Strip */}
        <div className="mt-12 pt-10 border-t border-surface-border grid sm:grid-cols-2 gap-6">
          <a href="tel:+31000000000" className="flex items-center gap-4 group">
            <span className="w-12 h-12 rounded-full bg-primary-500/10 text-primary-500 flex items-center justify-center group-hover:bg-primary-500 group-hover:text-white transition-colors">
              <Phone className="w-5 h-5" />
            </span>
            <span>
              <span className="block text-xs text-foreground/50 uppercase tracking-[0.2em]">
                Voor klantenservice
              </span>
              <span className="block text-lg font-extrabold text-white">+31 000 000 000</span>
            </span>
          </a>
          <a href="tel:+31000000001" className="flex items-center gap-4 group">
            <span className="w-12 h-12 rounded-full bg-primary-500/10 text-primary-500 flex items-center justify-center group-hover:bg-primary-500 group-hover:text-white transition-colors">
              <Phone className="w-5 h-5" />
            </span>
            <span>
              <span className="block text-xs text-foreground/50 uppercase tracking-[0.2em]">
                Voor nieuwe klanten
              </span>
              <span className="block text-lg font-extrabold text-white">+31 000 000 001</span>
            </span>
          </a>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-surface-border">
        <div className="container-x py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-foreground/50">
          <p>{footerText}</p>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-primary-500 transition-colors">
              Privacy
            </Link>
            <Link href="/voorwaarden" className="hover:text-primary-500 transition-colors">
              Voorwaarden
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
