import { DeforestationRecord } from "./types";

export const emissionFactorPerHa = 45.5; // Ton CO2 per hektar sebagai contoh

export const sampleDeforestationData: DeforestationRecord[] = [
  {
    year: 2018,
    province: "Kalimantan Tengah",
    areaHa: 14500,
    carbonEmissionTon: 14500 * emissionFactorPerHa,
  },
  {
    year: 2018,
    province: "Sumatera Selatan",
    areaHa: 9800,
    carbonEmissionTon: 9800 * emissionFactorPerHa,
  },
  {
    year: 2019,
    province: "Kalimantan Tengah",
    areaHa: 12900,
    carbonEmissionTon: 12900 * emissionFactorPerHa,
  },
  {
    year: 2019,
    province: "Papua",
    areaHa: 7600,
    carbonEmissionTon: 7600 * emissionFactorPerHa,
  },
  {
    year: 2020,
    province: "Kalimantan Barat",
    areaHa: 10700,
    carbonEmissionTon: 10700 * emissionFactorPerHa,
  },
  {
    year: 2020,
    province: "Sumatera Selatan",
    areaHa: 11200,
    carbonEmissionTon: 11200 * emissionFactorPerHa,
  },
  {
    year: 2021,
    province: "Kalimantan Tengah",
    areaHa: 9400,
    carbonEmissionTon: 9400 * emissionFactorPerHa,
  },
  {
    year: 2021,
    province: "Papua",
    areaHa: 8600,
    carbonEmissionTon: 8600 * emissionFactorPerHa,
  },
  {
    year: 2022,
    province: "Kalimantan Tengah",
    areaHa: 10200,
    carbonEmissionTon: 10200 * emissionFactorPerHa,
  },
  {
    year: 2022,
    province: "Jawa Barat",
    areaHa: 4200,
    carbonEmissionTon: 4200 * emissionFactorPerHa,
  },
];

export function calculateTotals(data: DeforestationRecord[]) {
  const totalArea = data.reduce((sum, record) => sum + record.areaHa, 0);
  const totalEmission = data.reduce(
    (sum, record) => sum + record.carbonEmissionTon,
    0,
  );
  return { totalArea, totalEmission };
}

export function getYearlyTrend(data: DeforestationRecord[]) {
  const trend = new Map<
    number,
    { areaHa: number; carbonEmissionTon: number }
  >();
  data.forEach((record) => {
    const year = trend.get(record.year) ?? { areaHa: 0, carbonEmissionTon: 0 };
    year.areaHa += record.areaHa;
    year.carbonEmissionTon += record.carbonEmissionTon;
    trend.set(record.year, year);
  });
  return Array.from(trend.entries()).map(([year, values]) => ({
    year,
    ...values,
  }));
}

export function getRegionSummary(data: DeforestationRecord[]) {
  const summary = new Map<
    string,
    { areaHa: number; carbonEmissionTon: number }
  >();
  data.forEach((record) => {
    const region = summary.get(record.province) ?? {
      areaHa: 0,
      carbonEmissionTon: 0,
    };
    region.areaHa += record.areaHa;
    region.carbonEmissionTon += record.carbonEmissionTon;
    summary.set(record.province, region);
  });
  return Array.from(summary.entries()).map(([province, values]) => ({
    province,
    ...values,
  }));
}
