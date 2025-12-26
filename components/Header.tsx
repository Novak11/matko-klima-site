"use client";

import { useRef } from "react";
import Link from "next/link";

const navItems = [
  { href: "/", label: "Početna" },
  { href: "/usluge", label: "Usluge" },
  { href: "/ponuda-klima", label: "Ponuda klima" },
  { href: "/cenovnik", label: "Cenovnik" },
  { href: "/o-nama", label: "O nama" },
  { href: "/kontakt", label: "Kontakt" },
];

export function Header() {
  const detailsRef = useRef<HTMLDetailsElement | null>(null);
  const closeMenu = () => {
    if (detailsRef.current) {
      detailsRef.current.open = false;
    }
  };

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
              Servis i prodaja klime
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

          <details ref={detailsRef} className="group relative xl:hidden">
            <summary className="cursor-pointer list-none rounded-full border border-[color:var(--mk-border)] px-3 py-2 text-xs font-semibold text-[color:var(--mk-muted)] sm:text-sm">
              Meni
            </summary>
            <div className="absolute right-0 mt-3 w-56 rounded-2xl border border-[color:var(--mk-border)] bg-white p-4 shadow-lg">
              <div className="flex flex-col gap-3 text-sm font-medium text-[color:var(--mk-ink)]">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="text-[color:var(--mk-ink)]"
                    onClick={closeMenu}
                  >
                    {item.label}
                  </Link>
                ))}
                <a
                  className="mt-2 rounded-full bg-[color:var(--mk-orange)] px-3 py-2 text-center text-white"
                  href="tel:0645356387"
                  onClick={closeMenu}
                >
                  Pozovite
                </a>
              </div>
            </div>
          </details>
        </div>
      </div>
    </header>
  );
}
