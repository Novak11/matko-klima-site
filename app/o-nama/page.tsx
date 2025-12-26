import Link from "next/link";
import { SectionBlocks } from "@/components/SectionBlocks";
import { filterSections, getPageBySlug, type Section } from "@/lib/content";

const fallbackSections: Section[] = [
  {
    heading: "MATCO Frigo & Elektro",
    level: "h1",
    paragraphs: [
      "- Servis i prodaja klima uređaja",
      "- Brz izlazak na teren i pouzdana dijagnostika",
      "- Fokus na urednoj i bezbednoj ugradnji",
    ],
  },
  {
    heading: "O nama",
    level: "h2",
    paragraphs: [
      "MATCO Frigo & Elektro je tim majstora specijalizovan za servis, ugradnju i održavanje klima uređaja. Radimo brzo i precizno, uz jasno objašnjenje kvara i preporuku najboljeg rešenja.",
      "Na terenu smo svakodnevno, a prioritet nam je servis i stabilan rad uređaja tokom cele sezone. Kada je potrebno, obezbeđujemo i ugradnju ili zamenu uređaja uz dogovor oko termina.",
      "Usluge obavljamo za fizička i pravna lica. Izdajemo račun i garanciju, a svaki posao završavamo uredno i bez skrivenih troškova.",
    ],
  },
  {
    heading: "OVLAŠĆENI SERVISERI",
    level: "h4",
    paragraphs: [
      "Radimo prema servisnim standardima proizvođača i pratimo preporuke održavanja za različite brendove klima uređaja.",
    ],
  },
  {
    heading: "RAČUN I GARANCIJA",
    level: "h4",
    paragraphs: [
      "Po završetku intervencije izdajemo račun i garanciju na izvršene usluge.",
    ],
  },
  {
    heading: "UVEK SMO TU ZA VAS",
    level: "h4",
    paragraphs: [
      "Brzo se javljamo, dolazimo u dogovoreno vreme i po potrebi radimo hitne intervencije.",
    ],
  },
  {
    heading: "DAJEMO SAVETE",
    level: "h4",
    paragraphs: [
      "Pružamo praktične savete za pravilno korišćenje, bolju efikasnost i duži vek uređaja.",
    ],
  },
];

export default async function ONamaPage() {
  const page = await getPageBySlug("o-nama");
  const sections = filterSections(page?.sections ?? fallbackSections);
  const intro =
    page?.sections?.find((section) => section.heading === "O nama")?.paragraphs?.[0] ??
    "Fokusirani smo na pouzdan servis i urednu ugradnju klima uređaja.";

  return (
    <div className="bg-[color:var(--mk-white)] text-[color:var(--mk-ink)]">
      <section className="border-b border-[color:var(--mk-border)] bg-gradient-to-b from-[color:var(--mk-blue-soft)] via-white to-white">
        <div className="mx-auto w-full max-w-5xl px-6 py-12">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[color:var(--mk-blue)]">
            O nama
          </p>
          <h1 className="mt-3 text-3xl font-semibold text-[color:var(--mk-blue-deep)]">
            MATCO Frigo &amp; Elektro
          </h1>
          <p className="mt-3 max-w-2xl text-sm text-[color:var(--mk-muted)]">{intro}</p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <a
              href="tel:0645356387"
              className="rounded-full bg-[color:var(--mk-orange)] px-5 py-2 text-center text-sm font-semibold text-white"
            >
              Pozovite nas
            </a>
            <Link
              href="/kontakt"
              className="rounded-full border border-[color:var(--mk-blue)] px-5 py-2 text-center text-sm font-semibold text-[color:var(--mk-blue)]"
            >
              Kontakt
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
