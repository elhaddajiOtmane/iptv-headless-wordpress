import Link from "next/link";
import Image from "next/image";
import { getMenu } from "@/lib/queries/menus";
import { getGlobalOptions } from "@/lib/queries/globals";

export async function Footer() {
  const menu = await getMenu("FOOTER");
  const globals = await getGlobalOptions();

  const menuItems = menu?.menuItems?.nodes || [];
  const logo = globals?.siteLogo;
  const footerText = globals?.footerText || "© 2026 IPTV Nederland. Alle rechten voorbehouden.";
  const socialLinks = globals?.socialLinks || [];

  return (
    <footer className="bg-surface border-t border-surface-border pt-16 pb-8 mt-auto">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="inline-block">
              {logo ? (
                <Image
                  src={logo.sourceUrl}
                  alt={logo.altText || "IPTV Nederland"}
                  width={140}
                  height={40}
                  className="h-10 w-auto object-contain opacity-80 hover:opacity-100 transition-opacity"
                />
              ) : (
                <span className="text-2xl font-heading font-bold text-foreground">
                  IPTV NL
                </span>
              )}
            </Link>
            <p className="text-foreground/60 max-w-sm">
              De meest betrouwbare en premium IPTV provider in Nederland en België. Ervaar TV kijken in de hoogste kwaliteit.
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="font-heading font-semibold text-lg mb-4 text-foreground">Snelle Links</h3>
            <ul className="space-y-3">
              {menuItems.map((item) => (
                <li key={item.id}>
                  <Link
                    href={item.path}
                    className="text-foreground/60 hover:text-primary-400 transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Socials */}
          <div>
            <h3 className="font-heading font-semibold text-lg mb-4 text-foreground">Volg Ons</h3>
            {socialLinks.length > 0 ? (
              <div className="flex gap-4">
                {socialLinks.map((social, idx) => (
                  <a
                    key={idx}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-surface-hover flex items-center justify-center text-foreground/80 hover:bg-primary-500 hover:text-white transition-all"
                  >
                    <span className="sr-only">{social.platform}</span>
                    {/* Minimalist text fallback or icon placeholder */}
                    {social.platform.charAt(0).toUpperCase()}
                  </a>
                ))}
              </div>
            ) : (
              <p className="text-foreground/60">Blijf op de hoogte via onze socials.</p>
            )}
          </div>
        </div>

        <div className="border-t border-surface-border pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-foreground/50">{footerText}</p>
          <div className="flex gap-6 text-sm text-foreground/50">
            <Link href="/privacy" className="hover:text-primary-400 transition-colors">Privacybeleid</Link>
            <Link href="/voorwaarden" className="hover:text-primary-400 transition-colors">Algemene Voorwaarden</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
