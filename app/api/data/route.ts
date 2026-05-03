import { NextResponse } from "next/server";
import { sampleDeforestationData } from "@/lib/data";
import { getDeforestationData } from "@/lib/db";
import { getDeforestationDataFromZip } from "@/lib/csvLoader";

export async function GET() {
    if (process.env.POSTGRES_URL) {
        try {
            const rows = await getDeforestationData();
            const data = rows.map((r: { year: number; province: string; areaHa: number; carbonEmissionTon: number }) => ({
                Province: r.province,
                Year: r.year,
                'Tree Cover Extent 2000 ha': r.areaHa,
                'Avg Annual Gross Emissions MgCO2e yr': r.carbonEmissionTon,
            }));
            return NextResponse.json({ success: true, data });
        } catch (error) {
            const message = error instanceof Error ? error.message : String(error);
            console.error("PostgreSQL query failed:", message);
        }
    }

    try {
        const zipRows = await getDeforestationDataFromZip();
        const data = zipRows.map((r) => ({
            Province: r.province,
            Year: r.year,
            'Tree Cover Extent 2000 ha': r.areaHa,
            'Avg Annual Gross Emissions MgCO2e yr': r.carbonEmissionTon,
        }));
        return NextResponse.json({ success: true, data });
    } catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        console.error("CSV fallback failed:", message);
    }

    const data = sampleDeforestationData.map((r) => ({
        Province: r.province,
        Year: r.year,
        'Tree Cover Extent 2000 ha': r.areaHa,
        'Avg Annual Gross Emissions MgCO2e yr': r.carbonEmissionTon,
    }));
    return NextResponse.json({ success: true, data });
}
