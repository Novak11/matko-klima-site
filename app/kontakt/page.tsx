import Link from "next/link";
import { getPageBySlug } from "@/lib/content";

const fallbackIntro =
  "Pišite nam ili nas pozovite za hitan izlazak. Odgovaramo brzo i nudimo jasno rešenje.";

const contactCards = [
  {
    title: "Telefon",
    lines: ["Prodaja: 060 404 0159", "Servis: 063 122 08 26", "Montaža: 065 4616 519"],
  },
  {
    title: "Email",
    lines: ["info@matco.rs"],
  },
  {
    title: "Radno vreme",
    lines: ["08:00 - 20:00", "Hitne intervencije po dogovoru"],
  },
  {
    title: "Zona",
    lines: ["Pokrivamo celu teritoriju grada"],
  },
];

export default async function KontaktPage({
  searchParams,
}: {
  searchParams?: { sent?: string };
}) {
  const page = await getPageBySlug("kontakt");
  const intro =
    page?.sections?.find((section) => section.paragraphs?.length)?.paragraphs?.[0] ??
    fallbackIntro;

  const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_KEY;
  const isKeyMissing = !accessKey;
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
  const redirectUrl = siteUrl
    ? `${siteUrl.replace(/\/$/, "")}/kontakt?sent=1`
    : undefined;
  const isSent = searchParams?.sent === "1";

  return (
    <div className="bg-[color:var(--mk-white)] text-[color:var(--mk-ink)]">
      <section className="border-b border-[color:var(--mk-border)] bg-gradient-to-b from-[color:var(--mk-blue-soft)] via-white to-white">
        <div className="mx-auto w-full max-w-6xl px-6 py-12">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[color:var(--mk-blue)]">
            Kontakt
          </p>
          <h1 className="mt-3 text-4xl font-semibold text-[color:var(--mk-blue-deep)]">
            MATCO Frigo &amp; Elektro
          </h1>
          <p className="mt-3 max-w-2xl text-sm text-[color:var(--mk-muted)]">{intro}</p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <a
              href="tel:0604040159"
              className="rounded-full bg-[color:var(--mk-orange)] px-6 py-3 text-center text-sm font-semibold text-white"
            >
              Pozovite odmah
            </a>
            <Link
              href="/usluge"
              className="rounded-full border border-[color:var(--mk-blue)] px-6 py-3 text-center text-sm font-semibold text-[color:var(--mk-blue)]"
            >
              Pogledajte usluge
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-6 py-12">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr]">
          <div className="space-y-6">
            <div className="grid gap-4 sm:grid-cols-2">
              {contactCards.map((card) => (
                <div
                  key={card.title}
                  className="rounded-2xl border border-[color:var(--mk-border)] bg-white p-4 shadow-sm"
                >
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[color:var(--mk-blue)]">
                    {card.title}
                  </p>
                  <div className="mt-2 space-y-1 text-sm text-[color:var(--mk-muted)]">
                    {card.lines.map((line) => (
                      <p key={line}>{line}</p>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="rounded-2xl border border-[color:var(--mk-border)] bg-[color:var(--mk-blue-soft)] p-5 text-sm text-[color:var(--mk-blue-deep)]">
              <p className="font-semibold">Brz dogovor</p>
              <p className="mt-2 text-[color:var(--mk-muted)]">
                Pošaljite poruku i ostavite broj. Javljamo se u najkraćem roku.
              </p>
            </div>
          </div>

          <div className="rounded-3xl border border-[color:var(--mk-border)] bg-white p-6 shadow-sm">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-2xl font-semibold text-[color:var(--mk-blue-deep)]">
                  Pošaljite upit
                </h2>
                <p className="mt-2 text-sm text-[color:var(--mk-muted)]">
                  Popunite formu i dobijte povratni poziv.
                </p>
              </div>
              <span className="rounded-full bg-[color:var(--mk-orange-soft)] px-3 py-1 text-xs font-semibold text-[color:var(--mk-orange)]">
                Web3Forms
              </span>
            </div>

            {isSent ? (
              <div className="mt-4 rounded-2xl border border-[color:var(--mk-border)] bg-[color:var(--mk-orange-soft)] p-4 text-sm text-[color:var(--mk-blue-deep)]">
                Hvala! Poruka je poslata. Javljamo se uskoro.
              </div>
            ) : null}

            <form
              action="https://api.web3forms.com/submit"
              method="POST"
              className="mt-6 grid gap-4"
            >
              <input type="hidden" name="access_key" value={accessKey ?? "YOUR_ACCESS_KEY"} />
              <input type="hidden" name="from_name" value="MATCO Frigo & Elektro" />
              <input type="hidden" name="subject" value="Novi upit sa sajta" />
              {redirectUrl ? <input type="hidden" name="redirect" value={redirectUrl} /> : null}
              <input type="checkbox" name="botcheck" className="hidden" />

              <div className="grid gap-4 sm:grid-cols-2">
                <label className="flex flex-col gap-2 text-sm font-semibold text-[color:var(--mk-ink)]">
                  Ime i prezime
                  <input
                    type="text"
                    name="name"
                    placeholder="Vaše ime"
                    required
                    className="w-full rounded-2xl border border-[color:var(--mk-border)] bg-white px-4 py-3 text-sm text-[color:var(--mk-ink)] outline-none transition focus:border-[color:var(--mk-blue)]"
                  />
                </label>
                <label className="flex flex-col gap-2 text-sm font-semibold text-[color:var(--mk-ink)]">
                  Telefon
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Kontakt telefon"
                    required
                    className="w-full rounded-2xl border border-[color:var(--mk-border)] bg-white px-4 py-3 text-sm text-[color:var(--mk-ink)] outline-none transition focus:border-[color:var(--mk-blue)]"
                  />
                </label>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <label className="flex flex-col gap-2 text-sm font-semibold text-[color:var(--mk-ink)]">
                  Email
                  <input
                    type="email"
                    name="email"
                    placeholder="you@example.com"
                    required
                    className="w-full rounded-2xl border border-[color:var(--mk-border)] bg-white px-4 py-3 text-sm text-[color:var(--mk-ink)] outline-none transition focus:border-[color:var(--mk-blue)]"
                  />
                </label>
                <label className="flex flex-col gap-2 text-sm font-semibold text-[color:var(--mk-ink)]">
                  Vrsta usluge
                  <select
                    name="service"
                    className="w-full rounded-2xl border border-[color:var(--mk-border)] bg-white px-4 py-3 text-sm text-[color:var(--mk-ink)] outline-none transition focus:border-[color:var(--mk-blue)]"
                  >
                    <option value="Servis">Servis</option>
                    <option value="Ugradnja">Ugradnja</option>
                    <option value="Popravka">Popravka</option>
                    <option value="Ponuda klima">Ponuda klima</option>
                    <option value="Drugo">Drugo</option>
                  </select>
                </label>
              </div>

              <label className="flex flex-col gap-2 text-sm font-semibold text-[color:var(--mk-ink)]">
                Poruka
                <textarea
                  name="message"
                  placeholder="Kratko opišite problem ili zahtev"
                  rows={4}
                  className="w-full rounded-2xl border border-[color:var(--mk-border)] bg-white px-4 py-3 text-sm text-[color:var(--mk-ink)] outline-none transition focus:border-[color:var(--mk-blue)]"
                />
              </label>

              <button
                type="submit"
                disabled={isKeyMissing}
                className={`rounded-full px-6 py-3 text-sm font-semibold text-white transition ${
                  isKeyMissing
                    ? "bg-[color:var(--mk-muted)] opacity-70"
                    : "bg-[color:var(--mk-orange)] hover:brightness-95"
                }`}
              >
                Pošalji upit
              </button>

              {isKeyMissing ? (
                <p className="text-xs text-[color:var(--mk-muted)]">
                  Dodajte Web3Forms ključ u `NEXT_PUBLIC_WEB3FORMS_KEY` kako bi forma radila.
                </p>
              ) : null}
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
