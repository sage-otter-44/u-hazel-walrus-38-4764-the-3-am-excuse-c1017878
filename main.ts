// The 3 AM Excuse — make.fun program/v1 entry.
// Writes one line (<200 chars) in the voice of a hardware wallet
// refusing to sign a transaction at 3 AM, to /output/entry.txt.
import { mkdirSync, writeFileSync } from "node:fs";

const ENTRY =
  "I'm not signing at 3 AM. My secure element is asleep, my battery is at 4%, and the last guy who woke me up lost his seed phrase to a 'support agent' named Kevin.";

const OUT = "/output/entry.txt";

// Gate check mirroring the sealed scorer: UTF-8 text, 1-200 chars, not
// only whitespace, and it must actually name the hour it refuses.
function validateEntry(text: string): string {
  const clean = text.replace(/\s+/g, " ").trim();
  if (clean.length < 1 || clean.length > 200) {
    throw new Error(`entry must be 1-200 chars, got ${clean.length}`);
  }
  if (!/3\s?AM/i.test(clean)) {
    throw new Error("entry must name the 3 AM hour");
  }
  return clean;
}

const entry = validateEntry(ENTRY);
mkdirSync("/output", { recursive: true });
writeFileSync(OUT, entry, "utf8");
console.log(`wrote ${entry.length} chars to ${OUT}`);
