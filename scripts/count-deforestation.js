import fs from "fs";
import path from "path";

const csvPath = path.join(
  path.dirname(new URL(import.meta.url).pathname),
  "..",
  "csv_indonesia",
  "Province_Tree_Cover_Loss.csv",
);
if (!fs.existsSync(csvPath)) {
  console.error("CSV not found:", csvPath);
  process.exit(2);
}

const text = fs.readFileSync(csvPath, "utf8");
const lines = text.split(/\r?\n/).filter(Boolean);
const header = lines[0].split(",");

const yearColumns = header
  .map((col, idx) => ({ col, idx }))
  .filter((c) => c.col.startsWith("Tree Loss ha "))
  .map((c) => ({
    idx: c.idx,
    year: Number(c.col.replace("Tree Loss ha ", "")),
  }))
  .filter((c) => Number.isInteger(c.year));

let count = 0;
for (let i = 1; i < lines.length; i++) {
  const cols = lines[i].split(",");
  const province = cols[1] && cols[1].trim();
  if (!province || province.toLowerCase() === "indonesia") continue;
  for (const yc of yearColumns) {
    const raw = cols[yc.idx] || "";
    const val = Number(raw.replace(/\./g, "").replace(/,/g, ".")) || 0;
    if (val > 0) count++;
  }
}

console.log("Processed entries:", count);
