import Link from "next/link";
import { SectionBlocks } from "@/components/SectionBlocks";
import { filterSections, getPageBySlug, type Section } from "@/lib/content";

const fallbackSections: Section[] = [
  {
    heading: "Servis i održavanje",
    level: "h2",
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
    level: "h2",
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
    level: "h2",
    paragraphs: [
      "- Dijagnostika kvara — 1.500 RSD",
      "- Punjenje freonom (po uređaju) — od 6.500 RSD",
      "- Zamena kondenzatora — 4.500 RSD",
      "- Zamena ventilatora/turbine — 4.000 - 6.000 RSD",
      "- Popravka elektronike — po dogovoru",
    ],
  },
  {
    heading: "Dodatne usluge",
    level: "h2",
    paragraphs: [
      "- Bušenje zida (beton) — 2.000 RSD",
      "- Štemovanje zida (po metru) — 1.200 RSD",
      "- Kondenz crevo (po metru) — 600 RSD",
      "- Izlazak na teren u gradu — 1.000 RSD",
      "- Hitna intervencija (isti dan) — 2.500 RSD",
    ],
  },
  {
    heading: "Napomena",
    level: "h3",
    paragraphs: [
      "Cene su informativne i mogu da variraju u zavisnosti od modela i stanja uređaja.",
      "Za pravna lica izdaje se račun i garancija na izvršene usluge.",
      "Za tačnu cenu pozovite 064 535 6387.",
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
              href="tel:0645356387"
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
