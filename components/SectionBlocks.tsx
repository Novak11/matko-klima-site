import type { ReactNode } from "react";
import type { Section } from "@/lib/content";

type SectionBlocksProps = {
  sections: Section[];
  maxParagraphs?: number;
  variant?: "cards" | "minimal";
};

function normalizeParagraphs(paragraphs: string[]) {
  const seen = new Set<string>();
  return paragraphs
    .map((paragraph) => paragraph.replace(/\s+/g, " ").trim())
    .filter((paragraph) => {
      if (!paragraph) return false;
      if (/^\d+$/.test(paragraph) || paragraph === "→") return false;
      const key = paragraph.toLowerCase();
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
}

function renderParagraphs(paragraphs: string[]) {
  const nodes: ReactNode[] = [];
  let listItems: string[] = [];

  const flushList = () => {
    if (listItems.length === 0) return;
    nodes.push(
      <ul
        key={`list-${nodes.length}`}
        className="mt-3 space-y-2 pl-5 text-sm text-[color:var(--mk-muted)]"
      >
        {listItems.map((item) => (
          <li key={item} className="list-disc">
            {item}
          </li>
        ))}
      </ul>
    );
    listItems = [];
  };

  paragraphs.forEach((paragraph, index) => {
    const trimmed = paragraph.trim();
    if (trimmed.startsWith("- ")) {
      listItems.push(trimmed.replace(/^[-]\s+/, ""));
      return;
    }
    flushList();
    nodes.push(
      <p
        key={`p-${index}`}
        className="mt-3 text-sm leading-relaxed text-[color:var(--mk-muted)]"
      >
        {paragraph}
      </p>
    );
  });

  flushList();
  return nodes;
}

export function SectionBlocks({
  sections,
  maxParagraphs,
  variant = "cards",
}: SectionBlocksProps) {
  const filtered = sections.filter((section) => section.paragraphs?.length || section.heading);
  const containerClass =
    variant === "minimal" ? "space-y-8" : "space-y-10";
  const cardClass =
    variant === "minimal"
      ? "border-b border-[color:var(--mk-border)] pb-6"
      : "rounded-3xl border border-[color:var(--mk-border)] bg-[color:var(--mk-blue-soft)] p-6 shadow-sm";

  return (
    <div className={containerClass}>
      {filtered.map((section, index) => {
        const cleaned = normalizeParagraphs(section.paragraphs || []);
        const limited = maxParagraphs ? cleaned.slice(0, maxParagraphs) : cleaned;
        return (
        <div
          key={`${section.heading ?? "section"}-${index}`}
          className={cardClass}
        >
          {section.heading ? (
            <h2 className="text-xl font-semibold text-[color:var(--mk-ink)]">
              {section.heading}
            </h2>
          ) : null}
          {limited.length ? renderParagraphs(limited) : null}
        </div>
      );
      })}
    </div>
  );
}
