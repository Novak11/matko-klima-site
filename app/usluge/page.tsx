import Link from "next/link";
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

export default async function UslugePage() {
  const services = await Promise.all(
    serviceSlugs.map(async (slug) => {
      const page = await getPageBySlug(slug);
      const intro = page?.sections?.find((section) => section.paragraphs?.length)?.paragraphs?.[0];
      return {
        slug,
        title: page?.title ?? slug.replace(/-/g, " "),
        intro,
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
            <Link
              key={service.slug}
              href={`/${service.slug}`}
              className="block rounded-2xl border border-[color:var(--mk-border)] bg-white px-4 py-4 shadow-sm"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-base font-semibold text-[color:var(--mk-blue-deep)]">
                    {service.title}
                  </h2>
                  {service.intro ? (
                    <p className="mt-1 text-sm text-[color:var(--mk-muted)]">
                      {service.intro}
                    </p>
                  ) : null}
                </div>
                <span className="text-sm font-semibold text-[color:var(--mk-orange)]">→</span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
