import { useEffect, useMemo, useState } from 'react'
import {
    calculateTotals,
    getRegionSummary,
    getYearlyTrend,
    sampleDeforestationData,
} from '@/lib/data'
import { DeforestationRecord, FilterOptions } from '@/lib/types'
import { TrendDataPoint, RegionDataPoint } from '@/utils/chartUtils'

const fetchDataset = async (): Promise<DeforestationRecord[]> => {
    const response = await fetch('/api/data')
    if (!response.ok) {
        const message = await response.text()
        throw new Error(message || 'Gagal mengambil data')
    }
    const result = await response.json() as {
        success: boolean
        data: Array<{
            Province: string
            Year: number
            'Tree Cover Extent 2000 ha': number
            'Avg Annual Gross Emissions MgCO2e yr': number
        }>
    }

    return result.data.map((item) => ({
        year: item.Year,
        province: item.Province,
        areaHa: item['Tree Cover Extent 2000 ha'],
        carbonEmissionTon: item['Avg Annual Gross Emissions MgCO2e yr'],
    }))
}

export interface UseStatisticsDataReturn {
    data: DeforestationRecord[]
    filters: FilterOptions
    filteredData: DeforestationRecord[]
    totals: {
        totalArea: number
        totalEmission: number
    }
    trendData: TrendDataPoint[]
    regionData: RegionDataPoint[]
    dataPeriod: string
    error: string | null
    loading: boolean
    onFilterChange: (filters: FilterOptions) => void
}

// Toggle salah satu dari dua opsi ini sesuai kebutuhan data fallback.
// const FALLBACK_DATA_PERIOD = '2001 - 2024'
const FALLBACK_DATA_PERIOD = '2018 - 2022'

export function useStatisticsData(): UseStatisticsDataReturn {
    const [data, setData] = useState<DeforestationRecord[]>([])
    const [filters, setFilters] = useState<FilterOptions>({})
    const [error, setError] = useState<string | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchDataset()
            .then((rows) => setData(rows.length > 0 ? rows : sampleDeforestationData))
            .catch((err) => {
                setError(err.message)
                setData(sampleDeforestationData)
            })
            .finally(() => setLoading(false))
    }, [])

    const filteredData = useMemo(() => {
        return data.filter((record) => {
            if (filters.year && record.year !== filters.year) return false
            if (filters.province && record.province !== filters.province) return false
            return true
        })
    }, [data, filters])

    const totals = calculateTotals(filteredData)
    const trendData = getYearlyTrend(filteredData)
    const regionData = getRegionSummary(filteredData)
    const dataPeriod = useMemo(() => FALLBACK_DATA_PERIOD, [])

    return {
        data,
        filters,
        filteredData,
        totals,
        trendData,
        regionData,
        dataPeriod,
        error,
        loading,
        onFilterChange: setFilters,
    }
}
