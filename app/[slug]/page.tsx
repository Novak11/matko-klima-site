import Link from "next/link";
import { notFound } from "next/navigation";
import { SectionBlocks } from "@/components/SectionBlocks";
import { filterSections, getPageBySlug, getPageSlugs } from "@/lib/content";

export async function generateStaticParams() {
  const slugs = await getPageSlugs();
  return slugs
    .filter(
      (slug) =>
        slug !== "ponuda-klima" &&
        slug !== "usluge" &&
        slug !== "cenovnik" &&
        slug !== "o-nama" &&
        slug !== "kontakt"
    )
    .map((slug) => ({ slug }));
}

export default async function ContentPage({ params }: { params: { slug: string } }) {
  const page = await getPageBySlug(params.slug);
  if (!page) {
    notFound();
  }

  const sections = filterSections(page.sections || []);
  const intro = sections.find((section) => section.paragraphs?.length)?.paragraphs?.[0];

  return (
    <div className="bg-[color:var(--mk-white)] text-[color:var(--mk-ink)]">
      <section className="border-b border-[color:var(--mk-border)] bg-gradient-to-b from-[color:var(--mk-blue-soft)] via-white to-white">
        <div className="mx-auto flex w-full max-w-5xl flex-col gap-4 px-6 py-12">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[color:var(--mk-blue)]">
            {page.slug.replace(/-/g, " ")}
          </p>
          <h1 className="text-3xl font-semibold text-[color:var(--mk-blue-deep)]">
            {page.title}
          </h1>
          {intro ? (
            <p className="max-w-2xl text-sm leading-relaxed text-[color:var(--mk-muted)]">
              {intro}
            </p>
          ) : null}
          <div className="flex flex-col gap-3 sm:flex-row">
            <a
              href="tel:0645356387"
              className="rounded-full bg-[color:var(--mk-orange)] px-5 py-2 text-center text-sm font-semibold text-white"
            >
              Pozovite
            </a>
            <Link
              href="/kontakt"
              className="rounded-full border border-[color:var(--mk-blue)] px-5 py-2 text-center text-sm font-semibold text-[color:var(--mk-blue)]"
            >
              Zakažite servis
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-5xl px-6 py-10">
        <SectionBlocks sections={sections} variant="minimal" />
      </section>
    </div>
  );
}
