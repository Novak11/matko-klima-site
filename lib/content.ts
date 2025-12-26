import fs from "fs";
import path from "path";
import { promises as fsp } from "fs";

export type Section = {
  heading?: string | null;
  level?: string | null;
  paragraphs: string[];
};

export type PageRecord = {
  id: number;
  title: string;
  slug: string;
  source_url: string;
  sections: Section[];
  images: string[];
  links: string[];
  content_html?: string;
};

export type ProductRecord = {
  id: number;
  title: string;
  slug: string;
  source_url: string;
  excerpt_html?: string;
  content_html?: string;
  excerpt_sections?: Section[];
  sections: Section[];
  images: string[];
  links: string[];
  featured_image?: string | null;
};

const CONTENT_ROOT = resolveContentRoot();

function resolveContentRoot() {
  const candidates = [
    path.resolve(process.cwd(), "..", "content"),
    path.resolve(process.cwd(), "content"),
  ];
  for (const candidate of candidates) {
    if (fs.existsSync(candidate)) {
      return candidate;
    }
  }
  throw new Error("Content directory not found.");
}

async function readJson<T>(filePath: string): Promise<T> {
  const raw = await fsp.readFile(filePath, "utf8");
  return JSON.parse(raw) as T;
}

export async function getPageSlugs(): Promise<string[]> {
  const pagesDir = path.join(CONTENT_ROOT, "pages");
  const files = await fsp.readdir(pagesDir);
  return files
    .filter((file) => file.endsWith(".json"))
    .map((file) => file.replace(/\.json$/, ""));
}

export async function getPageBySlug(slug: string): Promise<PageRecord | null> {
  const pagePath = path.join(CONTENT_ROOT, "pages", `${slug}.json`);
  if (!fs.existsSync(pagePath)) {
    return null;
  }
  return readJson<PageRecord>(pagePath);
}

export async function getProductIndex(): Promise<
  Array<{ title: string; slug: string; source_url: string; featured_image?: string | null }>
> {
  const indexPath = path.join(CONTENT_ROOT, "products", "index.json");
  if (!fs.existsSync(indexPath)) {
    return [];
  }
  return readJson(indexPath);
}

export async function getProductSlugs(): Promise<string[]> {
  const productsDir = path.join(CONTENT_ROOT, "products");
  const files = await fsp.readdir(productsDir);
  return files
    .filter((file) => file.endsWith(".json") && file !== "index.json")
    .map((file) => file.replace(/\.json$/, ""));
}

export async function getProductBySlug(slug: string): Promise<ProductRecord | null> {
  const productPath = path.join(CONTENT_ROOT, "products", `${slug}.json`);
  if (!fs.existsSync(productPath)) {
    return null;
  }
  return readJson<ProductRecord>(productPath);
}

export function filterSections(sections: Section[] = []): Section[] {
  return sections.filter((section) => {
    if (!section) return false;
    if (section.paragraphs && section.paragraphs.length > 0) return true;
    return Boolean(section.heading);
  });
}
