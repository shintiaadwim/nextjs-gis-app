'use client'

import RegionComparison from "@/components/sections/RegionComparison"
import ChartSection from "@/components/features/ChartSection"
import { useAnalyticsPage } from '@/hooks/useAnalyticsPage'
import { sampleDeforestationData } from "@/lib/data"

const ANALYTICS_CARDS = [
    {
        id: 'charts',
        span: 'lg:col-span-2',
        sticky: false,
        className: '',
    },
    {
        id: 'comparison',
        span: 'lg:col-span-1',
        sticky: true,
        stickyTop: 'top-24',
        className: 'h-fit',
    },
]

export function AnalyticsPage() {
    const { trendData, regionData, chartTrendData, loading, filteredCarbonData } = useAnalyticsPage()

    const renderCard = (card: typeof ANALYTICS_CARDS[0]) => {
        const baseClasses = `${card.span} ${card.className}`
        const stickyClasses = card.sticky ? `${baseClasses} sticky ${card.stickyTop}` : baseClasses

        switch (card.id) {
            case 'charts':
                return (
                    <div key={card.id} className={stickyClasses}>
                        <ChartSection trendData={trendData} regionData={regionData} />
                    </div>
                )
            case 'comparison':
                return (
                    <div key={card.id} className={stickyClasses}>
                        <RegionComparison data={sampleDeforestationData} />
                    </div>
                )
            default:
                return null
        }
    }

    return (
        <div className="w-full min-h-screen">
            <div className="px-2 py-2">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 md:gap-4">
                    {ANALYTICS_CARDS.map(renderCard)}
                </div>
            </div>
        </div>
    )
}
