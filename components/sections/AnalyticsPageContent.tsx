import {
    getRegionSummary,
    getYearlyTrend,
    sampleDeforestationData,
} from "@/lib/data"
import RegionComparison from "@/components/sections/RegionComparison"
import ChartSection from "@/components/features/ChartSection"

export function AnalyticsPageContent() {
    const trendData = getYearlyTrend(sampleDeforestationData)
    const regionData = getRegionSummary(sampleDeforestationData)

    return (
        <main className="container mx-auto px-4 py-8">
            <div className="mb-10 rounded-4xl border border-white/10 bg-slate-950/80 p-10 shadow-2xl shadow-slate-900/50">
                <p className="text-sm uppercase tracking-[0.28em] text-cyan-300/80">
                    Halaman Analisis
                </p>
                <h1 className="mt-3 text-4xl font-semibold text-white">
                    Analisis Perbandingan Wilayah dan Karbon per Hektar
                </h1>
                <p className="mt-4 max-w-2xl text-slate-300">
                    Lihat bagaimana provinsi berbeda berkontribusi terhadap emisi karbon
                    dari deforestasi dan bandingkan intensitas emisi per hektar.
                </p>
            </div>

            <div className="grid gap-6 lg:grid-cols-[0.9fr_0.8fr]">
                <div className="space-y-6">
                    <ChartSection trendData={trendData} regionData={regionData} />
                </div>
                <RegionComparison data={sampleDeforestationData} />
            </div>
        </main>
    )
}
