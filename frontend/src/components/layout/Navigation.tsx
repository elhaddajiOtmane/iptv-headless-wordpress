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

  return (
    <>
      <nav className="hidden md:flex items-center gap-8">
        {items.map((item) => {
          const isActive = pathname === item.path;
          return (
            <Link
              key={item.id}
              href={item.path}
              className={`text-sm font-medium transition-colors hover:text-primary-400 ${
                isActive ? "text-primary-500" : "text-foreground/80"
              }`}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Mobile Menu Toggle */}
      <button
        className="md:hidden p-2 -mr-2 text-foreground/80 hover:text-primary-400"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle menu"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 glass-card m-4 p-4 flex flex-col gap-4 md:hidden border-t border-surface-border shadow-2xl"
          >
            {items.map((item) => {
              const isActive = pathname === item.path;
              return (
                <Link
                  key={item.id}
                  href={item.path}
                  onClick={() => setIsOpen(false)}
                  className={`text-base font-medium px-4 py-2 rounded-xl transition-colors ${
                    isActive
                      ? "bg-primary-500/10 text-primary-500"
                      : "text-foreground/80 hover:bg-surface-hover"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
