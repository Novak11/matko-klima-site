import Link from "next/link";

const links = [
  { href: "/", label: "Početna" },
  { href: "/usluge", label: "Usluge" },
  { href: "/ponuda-klima", label: "Ponuda klima" },
  { href: "/kontakt", label: "Kontakt" },
];

export function Footer() {
  return (
    <footer className="border-t border-[color:var(--mk-border)] bg-white">
      <div className="mx-auto w-full max-w-5xl px-6 py-10">
        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-3">
            <img
              src="/brand/matco.png"
              alt="MATCO Frigo & Elektro"
              className="h-12 w-auto drop-shadow-sm"
            />
            <div>
              <p className="text-lg font-semibold text-[color:var(--mk-blue-deep)]">
                MATCO Frigo &amp; Elektro
              </p>
              <p className="text-xs uppercase tracking-[0.2em] text-[color:var(--mk-muted)]">
                Servis i prodaja klime
              </p>
            </div>
          </div>

          <p className="text-sm text-[color:var(--mk-muted)]">
            Minimalni nacrt sajta. Sadržaj i kontakt informacije biće ažurirani prema
            finalnim materijalima klijenta.
          </p>

          <div className="flex flex-wrap gap-4 text-sm font-semibold text-[color:var(--mk-muted)]">
            {links.map((link) => (
              <Link key={link.href} href={link.href} className="hover:text-[color:var(--mk-blue)]">
                {link.label}
              </Link>
            ))}
          </div>

          <div className="rounded-2xl border border-[color:var(--mk-border)] bg-[color:var(--mk-blue-soft)] p-4 text-sm text-[color:var(--mk-blue-deep)]">
            <p className="font-semibold">Kontakt</p>
            <p className="mt-2 text-[color:var(--mk-muted)]">064 535 6387 · 063 122 08 26</p>
            <p className="mt-1 text-[color:var(--mk-muted)]">info@centarklimauredjaja.com</p>
          </div>
        </div>
      </div>
      <div className="border-t border-[color:var(--mk-border)] py-4 text-center text-xs text-[color:var(--mk-muted)]">
        © 2025 MATCO Frigo &amp; Elektro
      </div>
    </footer>
  );
}
