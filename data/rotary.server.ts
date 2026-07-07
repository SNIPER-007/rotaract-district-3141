import { readFileSync } from "node:fs";
import { join } from "node:path";
import { normalizePhone, normalizeRotaryName, type RotaryDirectoryData } from "./rotary";

type ParsedRow = {
  name: string;
  position: string;
  phone: string;
  email: string;
};

function splitRows(markdown: string): ParsedRow[] {
  const lines = markdown.split(/\r?\n/).map((line) => line.trimEnd());
  const rows: ParsedRow[] = [];

  for (const line of lines) {
    if (!line || /^\s*Section\t/.test(line) || /^\s*\t/.test(line)) {
      continue;
    }

    const cols = line.split("\t");

    if (cols.length < 13) {
      continue;
    }

    const name = cols[1] ?? cols[7] ?? "";
    const position = cols[2] ?? "";
    const phone = cols[11] ?? "";
    const email = cols[12] ?? "";

    if (!name || !position || !phone || !email) {
      continue;
    }

    rows.push({
      name: normalizeRotaryName(name),
      position: position.replace(/\s+/g, " ").trim(),
      phone: normalizePhone(phone),
      email: email.replace(/\s+/g, " ").trim(),
    });
  }

  return rows;
}

export function loadRotaryDirectory(): RotaryDirectoryData {
  const markdownPath = join(process.cwd(), "rotary.md");
  const markdown = readFileSync(markdownPath, "utf8");
  const members = splitRows(markdown);

  return { members };
}
