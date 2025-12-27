import Link from "next/link";
import { SectionBlocks } from "@/components/SectionBlocks";
import { filterSections, getPageBySlug, type Section } from "@/lib/content";

const fallbackSections: Section[] = [
  {
    heading: "KLIMA UREĐAJI",
    level: "h2",
    paragraphs: [],
  },
  {
    heading: "Servis i održavanje",
    level: "h3",
    paragraphs: [
      "- Servis klima 9/12 BTU (godišnji) — 2.500 RSD",
      "- Servis klima 18 BTU — 3.500 RSD",
      "- Servis klima 24 BTU — 4.500 RSD",
      "- Dubinsko čišćenje unutrašnje jedinice — 2.000 RSD",
      "- Dezinfekcija i antibakterijski tretman — 1.200 RSD",
    ],
  },
  {
    heading: "Ugradnja i demontaža",
    level: "h3",
    paragraphs: [
      "- Ugradnja 9/12 BTU (standardna instalacija do 3m) — 11.000 RSD",
      "- Ugradnja 18 BTU — 13.000 RSD",
      "- Ugradnja 24 BTU — 15.000 RSD",
      "- Demontaža unutrašnje + spoljne jedinice — 4.000 RSD",
      "- Doplata za dodatni metar instalacije — 2.000 RSD",
    ],
  },
  {
    heading: "Popravke i zamene",
    level: "h3",
    paragraphs: [
      "- Dijagnostika kvara — 1.500 RSD",
      "- Punjenje freonom (po uređaju) — od 6.500 RSD",
      "- Zamena kondenzatora — 4.500 RSD",
      "- Zamena ventilatora/turbine — 4.000 - 6.000 RSD",
      "- Popravka elektronike — po dogovoru",
    ],
  },
  {
    heading: "Dodatne usluge - klime",
    level: "h3",
    paragraphs: [
      "- Bušenje zida (beton) — 2.000 RSD",
      "- Štemovanje zida (po metru) — 1.200 RSD",
      "- Kondenz crevo (po metru) — 600 RSD",
      "- Izlazak na teren u gradu — 1.000 RSD",
      "- Hitna intervencija (isti dan) — 2.500 RSD",
    ],
  },
  {
    heading: "ELEKTRO USLUGE",
    level: "h2",
    paragraphs: [],
  },
  {
    heading: "Elektroinstalacije",
    level: "h3",
    paragraphs: [
      "- Kompletna elektroinstalacija stana/kuće — od 1.800 RSD/m²",
      "- Elektroinstalacije za poslovne prostore — od 2.000 RSD/m²",
      "- Građevinski elektro radovi (novi objekti) — od 2.500 RSD/m²",
      "- Delimična izmena instalacija — od 2.200 RSD/m²",
    ],
  },
  {
    heading: "Popravke i zamene",
    level: "h3",
    paragraphs: [
      "- Zamena utičnice ili prekidača — 1.500 RSD",
      "- Popravka instalacija (dijagnostika + rad) — od 2.000 RSD",
      "- Zamena razvodne table (12 osigurača) — 8.000 RSD",
      "- Zamena razvodne table (18 osigurača) — 10.000 RSD",
      "- Zamena razvodne table (24 osigurača) — 12.000 RSD",
    ],
  },
  {
    heading: "Montaža rasvete",
    level: "h3",
    paragraphs: [
      "- Ugradnja svetiljke/plafonjere — 1.200 RSD",
      "- Ugradnja LED trake (po metru) — 800 RSD",
      "- Ugradnja spoljne rasvete — od 1.500 RSD",
      "- Povezivanje luster/plafonskih svetala — 1.800 RSD",
    ],
  },
  {
    heading: "Dodatne usluge - elektro",
    level: "h3",
    paragraphs: [
      "- Bušenje zida za utičnice/prekidače — 800 RSD",
      "- Štemovanje za kablove (po metru) — 600 RSD",
      "- Izlazak na teren — 1.000 RSD",
      "- Hitna intervencija — 2.500 RSD",
    ],
  },
  {
    heading: "Napomena",
    level: "h3",
    paragraphs: [
      "Cene su informativne i mogu da variraju u zavisnosti od obima posla i potrebnog materijala.",
      "Za pravna lica izdaje se račun i garancija na izvršene usluge.",
      "Za tačnu cenu pozovite 060 404 0159.",
    ],
  },
];

export default async function CenovnikPage() {
  const page = await getPageBySlug("cenovnik");
  const sections = filterSections(page?.sections ?? fallbackSections);
  const intro =
    page?.sections?.find((section) => section.paragraphs?.length)?.paragraphs?.[0] ??
    "Cene su okvirne i zavise od kapaciteta, instalacije i stanja uređaja.";

  return (
    <div className="bg-[color:var(--mk-white)] text-[color:var(--mk-ink)]">
      <section className="border-b border-[color:var(--mk-border)] bg-gradient-to-b from-[color:var(--mk-blue-soft)] via-white to-white">
        <div className="mx-auto w-full max-w-5xl px-6 py-12">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[color:var(--mk-blue)]">
            Cenovnik
          </p>
          <h1 className="mt-3 text-3xl font-semibold text-[color:var(--mk-blue-deep)]">
            Cenovnik usluga
          </h1>
          <p className="mt-3 max-w-2xl text-sm text-[color:var(--mk-muted)]">{intro}</p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <a
              href="tel:0604040159"
              className="rounded-full bg-[color:var(--mk-orange)] px-5 py-2 text-center text-sm font-semibold text-white"
            >
              Pozovite za cenu
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
