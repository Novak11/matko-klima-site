import Link from "next/link";
import { getPageBySlug } from "@/lib/content";

const serviceSlugs = [
  "servis-klima-uredaja",
  "ugradnja-klima-uredaja",
  "popravka-klima-uredaja",
  "ciscenje-klima-uredjaja",
  "punjenje-klima-uredaja",
  "zamena-kondenzatora",
];

const highlightHeadings = [
  "OVLAŠĆENI SERVISERI",
  "RAČUN I GARANCIJA",
  "UVEK SMO TU ZA VAS",
  "DAJEMO SAVETE",
];

export default async function Home() {
  const [home, contact, about, ...servicePages] = await Promise.all([
    getPageBySlug("pocetna"),
    getPageBySlug("kontakt"),
    getPageBySlug("o-nama"),
    ...serviceSlugs.map((slug) => getPageBySlug(slug)),
  ]);

  const heroTitle = home?.sections?.[0]?.heading ?? "Ovlašćeni servis klima uređaja";
  const heroSubtitle = home?.sections?.[1]?.heading ?? "Brz odziv i pouzdana usluga";
  const heroCopy = home?.sections?.[1]?.paragraphs?.[0];
  const heroCopyShort = heroCopy ? `${heroCopy.split(".")[0]}.` : undefined;

  const stats = [
    { value: "00-24", label: "Dostupnost" },
    { value: "1h", label: "Brz dolazak" },
    { value: "10", label: "Ekipa majstora" },
  ];

  const services = serviceSlugs.map((slug, index) => {
    const page = servicePages[index];
    const intro = page?.sections?.find((section) => section.paragraphs?.length)?.paragraphs?.[0];
    return {
      slug,
      title: page?.title ?? slug.replace(/-/g, " "),
      intro,
    };
  });

  const highlights = (about?.sections || [])
    .filter((section) => highlightHeadings.includes(section.heading || ""))
    .slice(0, 3);

  const contactLines = (contact?.sections?.[0]?.paragraphs ?? []).slice(0, 4);

  return (
    <div className="bg-[color:var(--mk-white)] pb-20 text-[color:var(--mk-ink)] md:pb-0">
      <section className="hero-grid border-b border-[color:var(--mk-border)] bg-gradient-to-b from-[color:var(--mk-blue-soft)] via-white to-white">
        <div className="mx-auto flex w-full max-w-4xl flex-col gap-6 px-6 py-12">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[color:var(--mk-blue)]">
            Ovlašćeni klima servis
          </p>
          <h1 className="text-5xl font-semibold text-[color:var(--mk-blue-deep)] md:text-6xl">
            {heroTitle}
          </h1>
          <p className="text-xl font-semibold text-[color:var(--mk-blue)] md:text-2xl">
            {heroSubtitle}
          </p>
          {heroCopyShort ? (
            <p className="text-base font-medium leading-relaxed text-[color:var(--mk-muted)] md:hidden">
              {heroCopyShort}
            </p>
          ) : null}
          {heroCopy ? (
            <p className="hidden text-lg font-medium leading-relaxed text-[color:var(--mk-muted)] md:block">
              {heroCopy}
            </p>
          ) : null}

          <div className="flex flex-wrap items-center gap-3 text-sm font-semibold text-[color:var(--mk-muted)]">
            <span className="rounded-full border border-[color:var(--mk-border)] bg-white px-3 py-1">
              Servis
            </span>
            <span className="rounded-full border border-[color:var(--mk-border)] bg-white px-3 py-1">
              Ugradnja
            </span>
            <span className="rounded-full border border-[color:var(--mk-border)] bg-white px-3 py-1">
              Popravka
            </span>
            <span className="text-xs uppercase tracking-[0.2em] text-[color:var(--mk-blue)]">
              Poziv → Dolazak → Rešenje
            </span>
          </div>

          <div className="rounded-2xl border border-[color:var(--mk-border)] bg-white p-4 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[color:var(--mk-blue)]">
              Hitna intervencija
            </p>
            <p className="mt-2 text-4xl font-semibold text-[color:var(--mk-blue-deep)]">
              064 535 6387
            </p>
            <p className="mt-1 text-sm font-medium text-[color:var(--mk-muted)]">
              Pozovite odmah za dolazak u najkraćem roku.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 md:hidden">
            <a
              href="tel:0645356387"
              className="rounded-full bg-[color:var(--mk-orange)] px-6 py-3 text-center text-sm font-semibold text-white"
            >
              Pozovite odmah
            </a>
            <Link
              href="/kontakt"
              className="rounded-full border border-[color:var(--mk-blue)] px-6 py-3 text-center text-sm font-semibold text-[color:var(--mk-blue)]"
            >
              Zakažite servis
            </Link>
          </div>
          <div className="hidden flex-wrap gap-3 md:flex">
            <a
              href="tel:0645356387"
              className="rounded-full bg-[color:var(--mk-orange)] px-6 py-3 text-sm font-semibold text-white"
            >
              Pozovite sada
            </a>
            <Link
              href="/kontakt"
              className="rounded-full border border-[color:var(--mk-blue)] px-6 py-3 text-sm font-semibold text-[color:var(--mk-blue)]"
            >
              Zakažite servis
            </Link>
          </div>

          <div className="grid grid-cols-3 gap-3">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-2xl border-t-4 border-t-[color:var(--mk-blue)] border-r border-r-[color:var(--mk-border)] border-l border-l-[color:var(--mk-border)] border-b border-b-[color:var(--mk-border)] bg-white p-3 text-center shadow-sm"
              >
                <p className="text-lg font-semibold text-[color:var(--mk-blue-deep)]">
                  {stat.value}
                </p>
                <p className="text-xs uppercase tracking-[0.2em] text-[color:var(--mk-blue)]">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-5xl px-6 py-12">
        <div className="flex flex-col gap-2">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[color:var(--mk-blue)]">
            Usluge
          </p>
          <h2 className="text-2xl font-semibold text-[color:var(--mk-blue-deep)]">
            Fokus na servis klima uređaja
          </h2>
          <p className="text-sm text-[color:var(--mk-muted)]">
            Prvo dijagnostika i servis, a zatim po potrebi ugradnja ili popravka.
          </p>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {services.slice(0, 4).map((service, index) => (
            <div
              key={service.slug}
              className={`rounded-2xl border-l-4 border-l-[color:var(--mk-blue)] border-r border-r-[color:var(--mk-border)] border-t border-t-[color:var(--mk-border)] border-b border-b-[color:var(--mk-border)] bg-white p-4 shadow-sm transition-all hover:shadow-md ${
                index > 2 ? "hidden sm:block" : ""
              }`}
            >
              <h3 className="text-base font-semibold text-[color:var(--mk-blue-deep)]">
                {service.title}
              </h3>
              {service.intro ? (
                <p className="mt-2 text-sm text-[color:var(--mk-muted)]">{service.intro}</p>
              ) : null}
            </div>
          ))}
        </div>

        <Link
          href="/usluge"
          className="mt-5 inline-flex rounded-full border border-[color:var(--mk-blue)] px-5 py-2 text-sm font-semibold text-[color:var(--mk-blue)]"
        >
          Sve usluge →
        </Link>
      </section>

      {highlights.length ? (
        <section className="mx-auto w-full max-w-5xl px-6 pb-12">
          <div className="grid gap-4 md:grid-cols-3">
            {highlights.map((item) => (
              <div
                key={item.heading}
                className="rounded-2xl border border-[color:var(--mk-border)] bg-[color:var(--mk-blue-soft)] p-4"
              >
                <h3 className="text-sm font-semibold text-[color:var(--mk-blue-deep)]">
                  {item.heading}
                </h3>
                <p className="mt-2 text-sm text-[color:var(--mk-muted)]">
                  {item.paragraphs?.[0]}
                </p>
              </div>
            ))}
          </div>
        </section>
      ) : null}

      <section className="mx-auto w-full max-w-4xl px-6 pb-12">
        <div className="rounded-2xl border border-[color:var(--mk-border)] bg-white p-6 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[color:var(--mk-blue)]">
            Kontakt informacije
          </p>
          <div className="mt-3 space-y-2 text-sm text-[color:var(--mk-muted)]">
            {contactLines[0] ? (
              <p className="md:hidden">{contactLines[0]}</p>
            ) : null}
            <div className="hidden space-y-2 md:block">
              {contactLines.map((line) => (
                <p key={line}>{line}</p>
              ))}
            </div>
          </div>
          <div className="mt-4 flex flex-col gap-3 sm:flex-row">
            <a
              href="tel:0645356387"
              className="rounded-full bg-[color:var(--mk-orange)] px-5 py-2 text-center text-sm font-semibold text-white"
            >
              Pozovite odmah
            </a>
            <Link
              href="/kontakt"
              className="rounded-full border border-[color:var(--mk-blue)] px-5 py-2 text-center text-sm font-semibold text-[color:var(--mk-blue)]"
            >
              Kontakt forma
            </Link>
          </div>
        </div>
      </section>

      <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-[color:var(--mk-border)] bg-white/95 px-4 py-3 backdrop-blur md:hidden">
        <div className="mx-auto flex w-full max-w-4xl gap-3">
          <a
            href="tel:0645356387"
            className="flex-1 rounded-full bg-[color:var(--mk-orange)] px-4 py-2 text-center text-sm font-semibold text-white"
          >
            Pozovite sada
          </a>
          <Link
            href="/kontakt"
            className="flex-1 rounded-full border border-[color:var(--mk-blue)] px-4 py-2 text-center text-sm font-semibold text-[color:var(--mk-blue)]"
          >
            Servis
          </Link>
        </div>
      </div>
    </div>
  );
}
