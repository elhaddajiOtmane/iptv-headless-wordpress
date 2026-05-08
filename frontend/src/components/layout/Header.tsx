import Link from "next/link";
import { Phone, ShoppingBag, Search } from "lucide-react";
import { getMenu } from "@/lib/queries/menus";
import { Navigation } from "./Navigation";

export async function Header() {
  const menu = await getMenu("PRIMARY");
  const menuItems = menu?.menuItems?.nodes || [];

  return (
    <header className="sticky top-0 z-50 w-full glass border-b border-surface-border">
      <div className="container-x h-20 flex items-center justify-between gap-6">
        <Link href="/" className="flex items-center gap-2 group shrink-0">
          <div className="img-placeholder w-10 h-10 rounded-md flex items-center justify-center">
            <span className="text-primary-500 font-extrabold text-xl">N</span>
          </div>
          <span className="text-2xl font-extrabold tracking-tight text-white">
            IPTV<span className="text-primary-500">.</span>NL
          </span>
        </Link>

        <Navigation items={menuItems} />

        <div className="flex items-center gap-3">
          <a
            href="tel:+31000000000"
            className="hidden lg:flex items-center gap-3 text-sm"
          >
            <span className="w-10 h-10 rounded-full border border-surface-border flex items-center justify-center text-primary-500">
              <Phone className="w-4 h-4" />
            </span>
            <span className="flex flex-col">
              <span className="text-xs text-foreground/50 uppercase tracking-wider">Bel ons</span>
              <span className="text-foreground font-semibold">+31 000 000 000</span>
            </span>
          </a>

          <button
            aria-label="Zoeken"
            className="hidden md:flex w-10 h-10 rounded-full border border-surface-border items-center justify-center text-foreground/70 hover:text-primary-500 hover:border-primary-500 transition-colors"
          >
            <Search className="w-4 h-4" />
          </button>

          <button
            aria-label="Winkelmandje"
            className="hidden md:flex relative w-10 h-10 rounded-full border border-surface-border items-center justify-center text-foreground/70 hover:text-primary-500 hover:border-primary-500 transition-colors"
          >
            <ShoppingBag className="w-4 h-4" />
            <span className="absolute -top-1 -right-1 bg-primary-500 text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
              1
            </span>
          </button>

          <Link
            href="/pricing"
            className="hidden sm:inline-flex btn-red text-sm py-2.5 px-5"
          >
            Bestel Nu
          </Link>
        </div>
      </div>
    </header>
  );
}
