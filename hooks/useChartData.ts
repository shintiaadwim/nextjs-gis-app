'use client'

import { useMemo } from 'react'
import { DeforestationRecord } from '@/lib/types'
import { getYearlyTrend, getRegionSummary } from '@/lib/data'
import { TrendDataPoint, RegionDataPoint } from '@/utils/chartUtils'

/**
 * Hook untuk memproses data deforestasi menjadi format chart
 * Memisahkan logika data processing dari component rendering
 */
export function useChartData(data: DeforestationRecord[]) {
    // Memoize trend data calculation
    const trendData = useMemo(() => {
        if (!data || data.length === 0) return []
        return getYearlyTrend(data) as TrendDataPoint[]
    }, [data])

    // Memoize region data calculation
    const regionData = useMemo(() => {
        if (!data || data.length === 0) return []
        return getRegionSummary(data) as RegionDataPoint[]
    }, [data])

    return {
        trendData,
        regionData,
        hasData: trendData.length > 0 && regionData.length > 0,
    }
}
