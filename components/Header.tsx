"use client";

import { useState } from "react";
import Link from "next/link";
import { HamburgerIcon } from "./HamburgerIcon";
import { MobileMenu } from "./MobileMenu";

const navItems = [
  { href: "/", label: "Početna" },
  { href: "/usluge", label: "Usluge" },
  { href: "/ponuda-klima", label: "Ponuda klima" },
  { href: "/cenovnik", label: "Cenovnik" },
  { href: "/o-nama", label: "O nama" },
  { href: "/kontakt", label: "Kontakt" },
];

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-[color:var(--mk-border)] bg-white/90 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-center gap-4 px-4 py-3 sm:px-6">
        <Link href="/" className="flex min-w-0 shrink-0 items-center gap-3">
          <img
            src="/brand/matco.png"
            alt="MATCO Frigo & Elektro"
            className="h-10 w-auto drop-shadow-sm sm:h-12 xl:h-14"
          />
          <div className="min-w-0">
            <span className="block truncate text-base font-semibold text-[color:var(--mk-ink)] sm:text-lg">
              MATCO Frigo &amp; Elektro
            </span>
            <span className="hidden text-xs uppercase tracking-[0.2em] text-[color:var(--mk-muted)] sm:block">
              Frigo i elektro usluge
            </span>
          </div>
        </Link>

        <nav className="hidden flex-1 items-center justify-center gap-4 text-xs font-semibold text-[color:var(--mk-muted)] xl:flex xl:gap-6 xl:text-sm">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="whitespace-nowrap transition-colors hover:text-[color:var(--mk-blue)]"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <div className="hidden items-center gap-2 md:flex">
            <a
              className="whitespace-nowrap rounded-full bg-[color:var(--mk-orange)] px-3 py-2 text-xs font-semibold text-white transition hover:brightness-95 sm:px-4 sm:text-sm"
              href="tel:0645356387"
            >
              Pozovite 064 535 6387
            </a>
            <Link
              className="whitespace-nowrap rounded-full border border-[color:var(--mk-blue)] px-3 py-2 text-xs font-semibold text-[color:var(--mk-blue)] shadow-sm transition hover:bg-[color:var(--mk-blue)] hover:text-white sm:px-4 sm:text-sm"
              href="/kontakt"
            >
              Zakažite servis
            </Link>
          </div>

          <div className="xl:hidden">
            <HamburgerIcon
              isOpen={isMenuOpen}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            />
          </div>
        </div>
      </div>

      <MobileMenu
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        navItems={navItems}
      />
    </header>
  );
}
