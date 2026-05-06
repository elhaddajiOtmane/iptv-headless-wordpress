import Link from "next/link";
import Image from "next/image";
import { getMenu } from "@/lib/queries/menus";
import { getGlobalOptions } from "@/lib/queries/globals";
import { Navigation } from "./Navigation";

export async function Header() {
  const menu = await getMenu("PRIMARY");
  const globals = await getGlobalOptions();

  const menuItems = menu?.menuItems?.nodes || [];
  const logo = globals?.siteLogo;

  return (
    <header className="sticky top-0 z-50 w-full glass border-b border-surface-border">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          {logo ? (
            <Image
              src={logo.sourceUrl}
              alt={logo.altText || "IPTV Nederland"}
              width={140}
              height={40}
              className="h-10 w-auto object-contain transition-transform group-hover:scale-105"
            />
          ) : (
            <span className="text-2xl font-heading font-bold text-gradient">
              IPTV NL
            </span>
          )}
        </Link>
        <Navigation items={menuItems} />
      </div>
    </header>
  );
}
