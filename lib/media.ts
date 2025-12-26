import fs from "fs";
import path from "path";

const ASSET_ROOT = path.resolve(process.cwd(), "public", "assets");

const HOST_MAP = [
  { hostMatch: /centarklimauredjaja\.com/i, folder: "centarklima" },
  { hostMatch: /novazza\.rs/i, folder: "novazza" },
];

export function resolveImage(source?: string | null): string | null {
  if (!source) return null;
  if (source.startsWith("data:")) return source;
  if (source.startsWith("/assets/")) return source;

  if (source.startsWith("content/assets/")) {
    return `/${source.replace("content/", "")}`;
  }

  if (source.startsWith("assets/")) {
    return `/${source}`;
  }

  if (source.startsWith("http")) {
    try {
      const url = new URL(source);
      const match = HOST_MAP.find((entry) => entry.hostMatch.test(url.hostname));
      if (match) {
        const filename = path.basename(url.pathname);
        const localPath = path.join(ASSET_ROOT, match.folder, filename);
        if (fs.existsSync(localPath)) {
          return `/assets/${match.folder}/${filename}`;
        }
      }
    } catch {
      return source;
    }
  }

  return source;
}

export function resolveImages(sources: string[] = []): string[] {
  const resolved: string[] = [];
  for (const src of sources) {
    const mapped = resolveImage(src);
    if (mapped) {
      resolved.push(mapped);
    }
  }
  return Array.from(new Set(resolved));
}
