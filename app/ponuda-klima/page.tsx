import Link from "next/link";
import { getPageBySlug, getProductIndex } from "@/lib/content";
import { resolveImage } from "@/lib/media";

export default async function PonudaPage() {
  const [ponuda, products] = await Promise.all([
    getPageBySlug("ponuda-klima"),
    getProductIndex(),
  ]);

  const intro = ponuda?.sections?.[0]?.paragraphs ?? [];

  return (
    <div className="bg-[color:var(--mk-white)] text-[color:var(--mk-ink)]">
      <section className="border-b border-[color:var(--mk-border)] bg-gradient-to-b from-[color:var(--mk-blue-soft)] via-white to-white">
        <div className="mx-auto w-full max-w-5xl px-6 py-12">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[color:var(--mk-blue)]">
            Ponuda klima
          </p>
          <h1 className="mt-3 text-3xl font-semibold text-[color:var(--mk-blue-deep)]">
            Klima uređaji iz Novazza ponude
          </h1>
          <div className="mt-3 space-y-2 text-sm text-[color:var(--mk-muted)]">
            {intro.slice(0, 2).map((line) => (
              <p key={line}>{line}</p>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-5xl px-6 py-10">
        <div className="space-y-4">
          {products.map((product) => {
            const image = resolveImage(product.featured_image || undefined);
            return (
              <Link
                key={product.slug}
                href={`/ponuda-klima/${product.slug}`}
                className="flex items-center gap-4 rounded-2xl border border-[color:var(--mk-border)] bg-white p-4 shadow-sm"
              >
                <div className="h-16 w-16 overflow-hidden rounded-xl bg-[color:var(--mk-blue-soft)]">
                  {image ? (
                    <img src={image} alt={product.title} className="h-full w-full object-cover" />
                  ) : null}
                </div>
                <div className="flex-1">
                  <h2 className="text-sm font-semibold text-[color:var(--mk-blue-deep)]">
                    {product.title}
                  </h2>
                  <p className="mt-1 text-xs text-[color:var(--mk-muted)]">
                    Detalji i specifikacije
                  </p>
                </div>
                <span className="text-sm font-semibold text-[color:var(--mk-orange)]">→</span>
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
}
