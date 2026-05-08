"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { WPMenuItem } from "@/lib/types";
import { motion, AnimatePresence } from "framer-motion";

export function Navigation({ items }: { items: WPMenuItem[] }) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const fallback: WPMenuItem[] = [
    { id: "h", label: "Home", path: "/", url: "/" },
    { id: "p", label: "Pakketten", path: "/pricing", url: "/pricing" },
    { id: "b", label: "Blog", path: "/blog", url: "/blog" },
    { id: "c", label: "Contact", path: "/contact", url: "/contact" },
  ];
  const links = items.length ? items : fallback;

  return (
    <>
      <nav className="hidden lg:flex items-center gap-9">
        {links.map((item) => {
          const isActive = pathname === item.path;
          return (
            <Link
              key={item.id}
              href={item.path}
              className={`nav-link relative ${isActive ? "text-primary-500" : ""}`}
            >
              {item.label}
              {isActive && (
                <span className="absolute -bottom-1.5 left-0 right-0 h-[2px] bg-primary-500" />
              )}
            </Link>
          );
        })}
      </nav>

      <button
        className="lg:hidden p-2 -mr-2 text-foreground/85 hover:text-primary-500"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle menu"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full left-0 right-0 bg-ink border-t border-surface-border lg:hidden shadow-2xl"
          >
            <div className="container-x py-6 flex flex-col gap-1">
              {links.map((item) => {
                const isActive = pathname === item.path;
                return (
                  <Link
                    key={item.id}
                    href={item.path}
                    onClick={() => setIsOpen(false)}
                    className={`text-base font-medium px-4 py-3 rounded-md transition-colors ${
                      isActive
                        ? "bg-primary-500/10 text-primary-500"
                        : "text-foreground/85 hover:bg-surface-hover"
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
              <Link
                href="/pricing"
                onClick={() => setIsOpen(false)}
                className="btn-red mt-2"
              >
                Bestel Nu
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
