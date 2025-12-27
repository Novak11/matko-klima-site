import { getPageBySlug } from "@/lib/content";

const serviceSlugs = [
  "servis-klima-uredaja",
  "ugradnja-klima-uredaja",
  "popravka-klima-uredaja",
  "ciscenje-klima-uredjaja",
  "punjenje-klima-uredaja",
  "zamena-kondenzatora",
  "demontaza-klima-uredaja",
];

// Electrical services (dummy data)
const electricalServices = [
  {
    slug: "elektroinstalacije",
    title: "Elektroinstalacije",
    intro: "Kompletna ugradnja elektroinstalacija za stanove, kuće i poslovne prostore.",
    price: "od 1.800 RSD/m²",
  },
  {
    slug: "zamena-uticnica-prekidaca",
    title: "Zamena utičnica i prekidača",
    intro: "Brza zamena i postavljanje novih utičnica, prekidača i osigurača.",
    price: "od 1.500 RSD",
  },
  {
    slug: "popravka-instalacija",
    title: "Popravka instalacija",
    intro: "Dijagnostika i popravka kvarova na električnoj instalaciji.",
    price: "od 2.000 RSD",
  },
  {
    slug: "montaza-rasvete",
    title: "Montaža rasvete",
    intro: "Ugradnja i povezivanje svetiljki, leda i plafonskih svetala.",
    price: "od 1.200 RSD",
  },
  {
    slug: "zamena-tablice",
    title: "Zamena razvodne table",
    intro: "Ugradnja i povezivanje nove razvodne table sa osiguračima.",
    price: "od 8.000 RSD",
  },
  {
    slug: "gradjevinski-elektro",
    title: "Građevinski elektro radovi",
    intro: "Elektroinstalacije za nove objekte, kompletna razvodna mreža.",
    price: "od 2.500 RSD/m²",
  },
];

// Pricing mapping from cenovnik
const servicePricing: Record<string, string> = {
  "servis-klima-uredaja": "od 2.500 RSD",
  "ugradnja-klima-uredaja": "od 11.000 RSD",
  "popravka-klima-uredaja": "od 1.500 RSD",
  "ciscenje-klima-uredjaja": "2.000 RSD",
  "punjenje-klima-uredaja": "od 6.500 RSD",
  "zamena-kondenzatora": "4.500 RSD",
  "demontaza-klima-uredaja": "4.000 RSD",
};

export default async function UslugePage() {
  const services = await Promise.all(
    serviceSlugs.map(async (slug) => {
      const page = await getPageBySlug(slug);
      const intro = page?.sections?.find((section) => section.paragraphs?.length)?.paragraphs?.[0];
      return {
        slug,
        title: page?.title ?? slug.replace(/-/g, " "),
        intro,
        price: servicePricing[slug] ?? "Po dogovoru",
      };
    })
  );

  return (
    <div className="bg-[color:var(--mk-white)] text-[color:var(--mk-ink)]">
      <section className="border-b border-[color:var(--mk-border)] bg-gradient-to-b from-[color:var(--mk-blue-soft)] via-white to-white">
        <div className="mx-auto w-full max-w-5xl px-6 py-12">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[color:var(--mk-blue)]">
            Usluge
          </p>
          <h1 className="mt-3 text-3xl font-semibold text-[color:var(--mk-blue-deep)]">
            Frigo i elektro usluge
          </h1>
          <p className="mt-3 max-w-2xl text-sm text-[color:var(--mk-muted)]">
            Svi ključni radovi na klimama i elektroinstalacijama — servis, ugradnja i popravke.
          </p>
        </div>
      </section>

      {/* HVAC Services Section */}
      <section className="mx-auto w-full max-w-5xl px-6 py-10">
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-[color:var(--mk-blue-deep)]">
            Klima uređaji
          </h2>
          <p className="mt-1 text-sm text-[color:var(--mk-muted)]">
            Servis, ugradnja i održavanje klima sistema
          </p>
        </div>
        <div className="space-y-4">
          {services.map((service) => (
            <div
              key={service.slug}
              className="rounded-2xl border-l-4 border-l-[color:var(--mk-blue)] border-r border-r-[color:var(--mk-border)] border-t border-t-[color:var(--mk-border)] border-b border-b-[color:var(--mk-border)] bg-white px-4 py-4 shadow-sm transition-all hover:shadow-md"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <h3 className="text-base font-semibold text-[color:var(--mk-blue-deep)]">
                    {service.title}
                  </h3>
                  {service.intro ? (
                    <p className="mt-1 text-sm text-[color:var(--mk-muted)]">
                      {service.intro}
                    </p>
                  ) : null}
                </div>
                <div className="shrink-0 text-right">
                  <p className="text-base font-semibold text-[color:var(--mk-orange)]">
                    {service.price}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Electrical Services Section */}
      <section className="mx-auto w-full max-w-5xl px-6 pb-10">
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-[color:var(--mk-blue-deep)]">
            Elektro usluge
          </h2>
          <p className="mt-1 text-sm text-[color:var(--mk-muted)]">
            Elektroinstalacije za stanove, kuće i građevinske objekte
          </p>
        </div>
        <div className="space-y-4">
          {electricalServices.map((service) => (
            <div
              key={service.slug}
              className="rounded-2xl border-l-4 border-l-[color:var(--mk-orange)] border-r border-r-[color:var(--mk-border)] border-t border-t-[color:var(--mk-border)] border-b border-b-[color:var(--mk-border)] bg-white px-4 py-4 shadow-sm transition-all hover:shadow-md"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <h3 className="text-base font-semibold text-[color:var(--mk-blue-deep)]">
                    {service.title}
                  </h3>
                  <p className="mt-1 text-sm text-[color:var(--mk-muted)]">
                    {service.intro}
                  </p>
                </div>
                <div className="shrink-0 text-right">
                  <p className="text-base font-semibold text-[color:var(--mk-orange)]">
                    {service.price}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
