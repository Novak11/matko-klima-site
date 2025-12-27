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
            Kompletan servis i ugradnja klima uređaja
          </h1>
          <p className="mt-3 max-w-2xl text-sm text-[color:var(--mk-muted)]">
            Sve ključne usluge na jednom mestu, jasno i bez viška informacija.
          </p>
        </div>
      </section>

      <section className="mx-auto w-full max-w-5xl px-6 py-10">
        <div className="space-y-4">
          {services.map((service) => (
            <div
              key={service.slug}
              className="rounded-2xl border-l-4 border-l-[color:var(--mk-blue)] border-r border-r-[color:var(--mk-border)] border-t border-t-[color:var(--mk-border)] border-b border-b-[color:var(--mk-border)] bg-white px-4 py-4 shadow-sm transition-all hover:shadow-md"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <h2 className="text-base font-semibold text-[color:var(--mk-blue-deep)]">
                    {service.title}
                  </h2>
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
    </div>
  );
}
