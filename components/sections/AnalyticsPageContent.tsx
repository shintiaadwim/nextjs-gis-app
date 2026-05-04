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
        <div className="w-full bg-white">
            {/* Header Section */}
            <div className="bg-linear-to-b from-slate-900 to-slate-800 border-b border-slate-700">
                <div className="mx-auto max-w-6xl px-4 sm:px-6 md:px-8 py-8 sm:py-12 md:py-16 lg:py-20">
                    <p className="text-xs sm:text-sm font-medium uppercase tracking-wide text-cyan-400 mb-3 sm:mb-4">
                        Halaman Analisis
                    </p>
                    <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-white leading-tight mb-4 sm:mb-6 wrap-break-words">
                        Analisis Perbandingan Wilayah dan Karbon per Hektar
                    </h1>
                    <p className="text-sm sm:text-base lg:text-lg text-slate-300 max-w-2xl">
                        Lihat bagaimana provinsi berbeda berkontribusi terhadap emisi karbon
                        dari deforestasi dan bandingkan intensitas emisi per hektar.
                    </p>
                </div>
            </div>

            {/* Main Content */}
            <div className="mx-auto max-w-6xl px-4 sm:px-6 md:px-8 py-8 sm:py-12 md:py-16 lg:py-20">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Charts - 2 columns on large screens */}
                    <div className="lg:col-span-2">
                        <ChartSection trendData={trendData} regionData={regionData} />
                    </div>

                    {/* Region Comparison - 1 column */}
                    <div className="lg:col-span-1 h-fit">
                        <RegionComparison data={sampleDeforestationData} />
                    </div>
                </div>
            </div>
        </div>
    )
}
