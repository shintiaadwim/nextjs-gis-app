import fs from "node:fs";
import path from "node:path";
import { Pool } from "pg";

const EMISSION_FACTOR_PER_HA = 45.5;

function loadEnvLocal() {
  const envPath = path.join(process.cwd(), ".env.local");
  if (!fs.existsSync(envPath)) return;

  const content = fs.readFileSync(envPath, "utf-8");
  for (const rawLine of content.split(/\r?\n/)) {
    const line = rawLine.trim();
    if (!line || line.startsWith("#")) continue;

    const eqIndex = line.indexOf("=");
    if (eqIndex === -1) continue;

    const key = line.slice(0, eqIndex).trim();
    let value = line.slice(eqIndex + 1).trim();

    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }

    if (!(key in process.env)) {
      process.env[key] = value;
    }
  }
}

function toNumber(value) {
  if (typeof value !== "string") return 0;
  const normalized = value.trim().replace(/\./g, "").replace(/,/g, ".");
  const parsed = Number(normalized);
  return Number.isFinite(parsed) ? parsed : 0;
}

function parseCsvRows(csvContent) {
  const lines = csvContent
    .split(/\r?\n/)
    .filter((line) => line.trim().length > 0);
  if (lines.length < 2) return [];

  const headers = lines[0].split(",").map((h) => h.trim());
  const rows = [];

  for (let i = 1; i < lines.length; i += 1) {
    const values = lines[i].split(",");
    const row = {};

    headers.forEach((header, index) => {
      row[header] = (values[index] ?? "").trim();
    });

    rows.push(row);
  }

  return rows;
}

async function main() {
  loadEnvLocal();

  const connectionString = process.env.POSTGRES_URL;
  if (!connectionString) {
    throw new Error("POSTGRES_URL belum ada. Isi dulu di file .env.local");
  }

  const csvPath = path.join(
    process.cwd(),
    "csv_indonesia",
    "Province_Tree_Cover_Loss.csv",
  );
  if (!fs.existsSync(csvPath)) {
    throw new Error(`CSV tidak ditemukan: ${csvPath}`);
  }

  const csvContent = fs.readFileSync(csvPath, "utf-8");
  const rows = parseCsvRows(csvContent);

  if (rows.length === 0) {
    throw new Error("CSV kosong atau gagal diparse.");
  }

  const yearColumns = Object.keys(rows[0])
    .map((col) => {
      const match = col.match(/^Tree Loss ha (\d{4})$/);
      return match ? { column: col, year: Number(match[1]) } : null;
    })
    .filter(Boolean);

  if (yearColumns.length === 0) {
    throw new Error("Kolom 'Tree Loss ha YYYY' tidak ditemukan di CSV.");
  }

  const pool = new Pool({
    connectionString,
    ssl:
      process.env.NODE_ENV === "production"
        ? { rejectUnauthorized: false }
        : undefined,
  });

  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    await client.query(`
      CREATE TABLE IF NOT EXISTS deforestation (
        id BIGSERIAL PRIMARY KEY,
        year INTEGER NOT NULL,
        province TEXT NOT NULL,
        area_ha DOUBLE PRECISION NOT NULL,
        carbon_emission_ton DOUBLE PRECISION NOT NULL,
        created_at TIMESTAMP DEFAULT NOW(),
        UNIQUE (year, province)
      )
    `);

    let insertedOrUpdated = 0;

    for (const row of rows) {
      const province = (row["Province"] || "").trim();
      if (!province || province.toLowerCase() === "indonesia") continue;

      for (const { column, year } of yearColumns) {
        const areaHa = toNumber(row[column]);
        if (areaHa <= 0) continue;

        const carbonEmissionTon = Number(
          (areaHa * EMISSION_FACTOR_PER_HA).toFixed(2),
        );

        await client.query(
          `
            INSERT INTO deforestation (year, province, area_ha, carbon_emission_ton)
            VALUES ($1, $2, $3, $4)
            ON CONFLICT (year, province)
            DO UPDATE SET
              area_ha = EXCLUDED.area_ha,
              carbon_emission_ton = EXCLUDED.carbon_emission_ton
          `,
          [year, province, areaHa, carbonEmissionTon],
        );

        insertedOrUpdated += 1;
      }
    }

    await client.query("COMMIT");

    const countResult = await client.query(
      "SELECT COUNT(*)::int AS total FROM deforestation",
    );
    const total = countResult.rows[0]?.total ?? 0;

    console.log(
      `Import selesai. Upsert baris: ${insertedOrUpdated}. Total di tabel: ${total}.`,
    );
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
    await pool.end();
  }
}

main().catch((error) => {
  console.error("Import gagal:", error.message);
  process.exit(1);
});
