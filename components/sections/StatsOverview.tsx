'use client'

import { useCSVContext } from '@/context/CSVContext'

export function StatsOverview() {
    const { carbonData, loading, getFilteredData } = useCSVContext()
    const filteredData = getFilteredData(carbonData)

    const getStats = () => {
        if (!filteredData.length) {
            return [
                { label: 'Total Luas Deforestasi', value: '0 ha', trend: '↘ vs periode sebelumnya', trendColor: 'text-rose-500', bgGradient: 'from-rose-50 to-orange-50', accentColor: 'text-rose-600', iconBg: 'bg-rose-100' },
                { label: 'Estimasi Total Emisi', value: '0 ton CO₂', trend: '↗ vs periode sebelumnya', trendColor: 'text-emerald-500', bgGradient: 'from-emerald-50 to-teal-50', accentColor: 'text-emerald-600', iconBg: 'bg-emerald-100' },
                { label: 'Data Periode', value: '2018 - 2022', trend: '→ periode stabil', trendColor: 'text-slate-500', bgGradient: 'from-blue-50 to-cyan-50', accentColor: 'text-blue-600', iconBg: 'bg-blue-100' },
            ]
        }

        const row = filteredData[0]

        const formatNumber = (num: string | number) => {
            const numValue = typeof num === 'string' ? parseFloat(num) : num
            if (numValue >= 1e9) return (numValue / 1e9).toFixed(1) + 'B'
            if (numValue >= 1e6) return (numValue / 1e6).toFixed(1) + 'M'
            if (numValue >= 1e3) return (numValue / 1e3).toFixed(1) + 'K'
            return numValue.toFixed(0)
        }

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
    }

    const stats = getStats()

    return (
        <>
            {stats.map((stat, idx) => (
                <article
                    key={idx}
                    className={`rounded-2xl border border-slate-100 bg-linear-to-br ${stat.bgGradient} p-6 shadow-md transition hover:shadow-lg ${loading ? 'opacity-60' : ''}`}
                >
                    <div className={`inline-flex rounded-lg ${stat.iconBg} p-3 mb-4`}>
                        <div className={`h-6 w-6 rounded ${stat.accentColor} opacity-40`} />
                    </div>
                    <p className="text-sm font-semibold uppercase tracking-wider text-slate-500">{stat.label}</p>
                    <p className={`mt-3 text-4xl font-bold ${stat.accentColor}`}>
                        {loading ? '...' : stat.value}
                    </p>
                    <p className={`mt-2 text-sm font-medium ${stat.trendColor}`}>{stat.trend}</p>
                </article>
            ))}
        </>
    )
}
