'use client'

import { useMemo } from 'react'
import { getRegionSummary, getYearlyTrend, sampleDeforestationData } from '@/lib/data'
import { useCSVContext } from '@/context/CSVContext'

const DEFAULT_TREND_DATA = [30, 52, 38, 64, 45, 72]

export function useAnalyticsPage() {
    const trendData = useMemo(() => getYearlyTrend(sampleDeforestationData), [])
    const regionData = useMemo(() => getRegionSummary(sampleDeforestationData), [])
    const { carbonData, loading, getFilteredData } = useCSVContext()
    const filteredCarbonData = useMemo(() => getFilteredData(carbonData), [carbonData, getFilteredData])

    const chartTrendData = useMemo(() => {
        if (!filteredCarbonData.length) return DEFAULT_TREND_DATA

        const row = filteredCarbonData[0]
        const values: number[] = []

        for (let i = 0; i < 24; i++) {
            const key = `Gross Emissions ${String(i).padStart(2, '0')}2 MgCO2e`
            const val = row[key]
            if (val) {
                const numVal = typeof val === 'string' ? parseFloat(val) : val
                values.push(Math.min(100, Math.max(10, (numVal / 1e9) * 100)))
            }
        }

        return values.length > 0 ? values : DEFAULT_TREND_DATA
    }, [filteredCarbonData])

    return {
        trendData,
        regionData,
        carbonData,
        loading,
        filteredCarbonData,
        chartTrendData,
    }
}
