import { useMemo } from 'react'
import { useCSVContext } from '@/context/CSVContext'
import { formatNumber } from '@/utils/formatUtils'

export interface StatItem {
    label: string
    value: string
    trend: string
    trendColor: string
    bgGradient: string
    accentColor: string
    iconBg: string
}

export function useStatsOverview(): {
    stats: StatItem[]
    loading: boolean
} {
    const { carbonData, loading, getFilteredData } = useCSVContext()
    const filteredData = getFilteredData(carbonData)

    const stats = useMemo(() => {
        if (!filteredData.length) {
            return [
                {
                    label: 'Total Luas Deforestasi',
                    value: '0 ha',
                    trend: '↘ vs periode sebelumnya',
                    trendColor: 'text-rose-500',
                    bgGradient: 'from-rose-50 to-orange-50',
                    accentColor: 'text-rose-600',
                    iconBg: 'bg-rose-100',
                },
                {
                    label: 'Estimasi Total Emisi',
                    value: '0 ton CO₂',
                    trend: '↗ vs periode sebelumnya',
                    trendColor: 'text-emerald-500',
                    bgGradient: 'from-emerald-50 to-teal-50',
                    accentColor: 'text-emerald-600',
                    iconBg: 'bg-emerald-100',
                },
                {
                    label: 'Data Periode',
                    value: '2018 - 2022',
                    trend: '→ periode stabil',
                    trendColor: 'text-slate-500',
                    bgGradient: 'from-blue-50 to-cyan-50',
                    accentColor: 'text-blue-600',
                    iconBg: 'bg-blue-100',
                },
            ]
        }

        const row = filteredData[0]
        const treeExtent = row['Tree Cover Extent 2000 ha'] || 0
        const emissions = row['Avg Annual Gross Emissions MgCO2e yr'] || 0

        return [
            {
                label: 'Total Luas Deforestasi',
                value: `${formatNumber(treeExtent)} ha`,
                trend: '↘ vs periode sebelumnya',
                trendColor: 'text-rose-500',
                bgGradient: 'from-rose-50 to-orange-50',
                accentColor: 'text-rose-600',
                iconBg: 'bg-rose-100',
            },
            {
                label: 'Estimasi Total Emisi',
                value: `${formatNumber(emissions)} CO₂`,
                trend: '↗ vs periode sebelumnya',
                trendColor: 'text-emerald-500',
                bgGradient: 'from-emerald-50 to-teal-50',
                accentColor: 'text-emerald-600',
                iconBg: 'bg-emerald-100',
            },
            {
                label: 'Data Periode',
                value: '2018 - 2022',
                trend: '→ periode stabil',
                trendColor: 'text-slate-500',
                bgGradient: 'from-blue-50 to-cyan-50',
                accentColor: 'text-blue-600',
                iconBg: 'bg-blue-100',
            },
        ]
    }, [filteredData])

    return {
        stats,
        loading,
    }
}
