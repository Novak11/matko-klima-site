import Link from "next/link";
import { notFound } from "next/navigation";
import { SectionBlocks } from "@/components/SectionBlocks";
import { filterSections, getProductBySlug, getProductSlugs } from "@/lib/content";
import { resolveImage, resolveImages } from "@/lib/media";

export async function generateStaticParams() {
  const slugs = await getProductSlugs();
  return slugs.map((slug) => ({ slug }));
}

export default async function ProductPage({ params }: { params: { slug: string } }) {
  const product = await getProductBySlug(params.slug);
  if (!product) {
    notFound();
  }

  const sections = filterSections(product.sections || []);
  const image = resolveImage(product.featured_image || undefined);
  const gallery = resolveImages(product.images || []).slice(0, 3);
  const excerpt = product.excerpt_sections?.flatMap((section) => section.paragraphs) ?? [];

  const specLines = sections
    .flatMap((section) => section.paragraphs || [])
    .filter((line) => line.includes(":"))
    .slice(0, 10);

  return (
    <div className="bg-[color:var(--mk-white)] text-[color:var(--mk-ink)]">
      <section className="border-b border-[color:var(--mk-border)] bg-gradient-to-b from-[color:var(--mk-blue-soft)] via-white to-white">
        <div className="mx-auto w-full max-w-5xl px-6 py-12">
          <Link
            href="/ponuda-klima"
            className="text-xs font-semibold uppercase tracking-[0.28em] text-[color:var(--mk-blue)]"
          >
            ← Nazad na ponudu
          </Link>
          <h1 className="mt-3 text-3xl font-semibold text-[color:var(--mk-blue-deep)]">
            {product.title}
          </h1>
          {excerpt.length ? (
            <div className="mt-3 space-y-2 text-sm text-[color:var(--mk-muted)]">
              {excerpt.slice(0, 3).map((line) => (
                <p key={line}>{line}</p>
              ))}
            </div>
          ) : null}
          <div className="mt-4 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/kontakt"
              className="rounded-full bg-[color:var(--mk-orange)] px-5 py-2 text-center text-sm font-semibold text-white"
            >
              Zatražite ponudu
            </Link>
            <a
              href="tel:0645356387"
              className="rounded-full border border-[color:var(--mk-blue)] px-5 py-2 text-center text-sm font-semibold text-[color:var(--mk-blue)]"
            >
              Pozovite
            </a>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-5xl px-6 py-8">
        <div className="rounded-2xl border border-[color:var(--mk-border)] bg-white p-4 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="h-20 w-20 overflow-hidden rounded-xl bg-[color:var(--mk-blue-soft)]">
              {image ? <img src={image} alt={product.title} className="h-full w-full object-cover" /> : null}
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold text-[color:var(--mk-blue-deep)]">
                Brzi pregled specifikacija
              </p>
              <p className="mt-1 text-xs text-[color:var(--mk-muted)]">
                Najvažniji parametri izdvojeni za brzo čitanje.
              </p>
            </div>
          </div>
          {specLines.length ? (
            <ul className="mt-4 space-y-2 text-sm text-[color:var(--mk-muted)]">
              {specLines.map((line) => (
                <li key={line} className="border-b border-[color:var(--mk-border)] pb-2">
                  {line}
                </li>
              ))}
            </ul>
          ) : null}
        </div>

        {gallery.length ? (
          <div className="mt-4 grid grid-cols-3 gap-3">
            {gallery.map((item) => (
              <div
                key={item}
                className="h-20 overflow-hidden rounded-xl border border-[color:var(--mk-border)]"
              >
                <img src={item} alt="Detalj" className="h-full w-full object-cover" />
              </div>
            ))}
          </div>
        ) : null}
      </section>

      <section className="mx-auto w-full max-w-5xl px-6 pb-12">
        <SectionBlocks sections={sections} variant="minimal" maxParagraphs={12} />
      </section>
    </div>
  );
}
