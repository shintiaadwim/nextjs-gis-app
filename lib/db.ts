import { Pool, QueryResultRow } from "pg";
import { DeforestationRecord } from "./types";

const pool = new Pool({
  connectionString: process.env.POSTGRES_URL,
  ssl:
    process.env.NODE_ENV === "production"
      ? { rejectUnauthorized: false }
      : undefined,
});

export async function query<T extends QueryResultRow = QueryResultRow>(text: string, params?: unknown[]) {
  const result = await pool.query<T>(text, params);
  return result.rows;
}

export async function getDeforestationData(): Promise<DeforestationRecord[]> {
  const rows = await query<DeforestationRecord>(
    `SELECT year, province, area_ha AS "areaHa", carbon_emission_ton AS "carbonEmissionTon"
    FROM deforestation
    ORDER BY year, province`,
  );
  return rows;
}
