'use client'

import { useEffect, useMemo, useState } from 'react'
import { MainContentLayout } from '@/components/sections/MainContentLayout'
import {
    calculateTotals,
    getRegionSummary,
    getYearlyTrend,
    sampleDeforestationData,
} from '@/lib/data'
import { DeforestationRecord, FilterOptions } from '@/lib/types'

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

export function StatisticsPageContent() {
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

    // Statistics-specific sidebar
    const statisticsSidebar = (
        <>
            {/* Statistics Info Box */}
            <div className="rounded-xl bg-linear-to-br from-purple-50 to-indigo-50 border border-purple-200 p-5 sm:p-6 shadow-sm shrink-0">
                <div className="space-y-4">
                    <div>
                        <h3 className="text-sm font-bold text-gray-900 mb-2 flex items-center gap-2">
                            <span>📈</span> Jenis Analisis
                        </h3>
                        <ul className="text-xs text-gray-600 space-y-1.5">
                            <li>• Tren temporal deforestasi</li>
                            <li>• Distribusi regional</li>
                            <li>• Estimasi emisi karbon</li>
                            <li>• Perbandingan antar wilayah</li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Custom Tips for Statistics */}
            <div className="rounded-xl bg-linear-to-br from-blue-50 to-cyan-50 border border-blue-200 p-5 sm:p-6 shadow-sm shrink-0">
                <h3 className="text-sm font-bold text-gray-900 mb-3 flex items-center gap-2">
                    <span>💡</span> Tips Analisis
                </h3>
                <ul className="space-y-2 text-xs text-gray-700">
                    <li className="flex gap-2">
                        <span className="text-blue-600 shrink-0">•</span>
                        <span>Filter berdasarkan tahun untuk melihat tren tahunan</span>
                    </li>
                    <li className="flex gap-2">
                        <span className="text-blue-600 shrink-0">•</span>
                        <span>Pilih provinsi untuk analisis regional detail</span>
                    </li>
                    <li className="flex gap-2">
                        <span className="text-blue-600 shrink-0">•</span>
                        <span>Bandingkan data antar periode untuk insights</span>
                    </li>
                </ul>
            </div>
        </>
    )

    return (
        <div className="w-full bg-linear-to-b from-slate-50 to-white min-h-screen">
            {/* Hero Section */}
            <div className="bg-linear-to-r from-purple-600 via-purple-700 to-indigo-700 text-white relative overflow-hidden">
                {/* Decorative background elements */}
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl -mr-48 -mt-48"></div>
                    <div className="absolute bottom-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl -ml-48 -mb-48"></div>
                </div>

                <div className="relative mx-auto max-w-6xl px-4 sm:px-6 md:px-8 py-12 sm:py-16 md:py-20 lg:py-24">
                    <div className="flex flex-col">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full mb-6 w-fit border border-white/30">
                            <span className="text-lg">📊</span>
                            <p className="text-xs sm:text-sm font-semibold">Statistik Deforestasi</p>
                        </div>

                        <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight mb-4 sm:mb-6 wrap-break-words">
                            Analisis Statistik Komprehensif
                        </h1>

                        <p className="text-sm sm:text-base lg:text-lg text-purple-100 leading-relaxed max-w-2xl">
                            Data statistik mendalam tentang deforestasi, emisi karbon, dan dampak lingkungan di seluruh Indonesia.
                        </p>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <MainContentLayout
                data={data}
                filters={filters}
                onFilterChange={setFilters}
                filteredData={filteredData}
                totals={totals}
                trendData={trendData}
                regionData={regionData}
                error={error}
                loading={loading}
                sidebar={statisticsSidebar}
            />
        </div>
    )
}
