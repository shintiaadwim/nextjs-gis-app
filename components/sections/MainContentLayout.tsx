'use client'

import ChartSection from '@/components/features/ChartSection'
import DeforestationMap from '@/components/features/DeforestationMap'
import FilterPanel from '@/components/features/FilterPanel'
import StatCard from '@/components/ui/StatCard'
import { DeforestationRecord, FilterOptions } from '@/lib/types'
import { ReactNode } from 'react'
import { TrendDataPoint, RegionDataPoint } from '@/utils/chartUtils'

type MainContentLayoutProps = {
    data: DeforestationRecord[]
    filters: FilterOptions
    onFilterChange: (filters: FilterOptions) => void
    filteredData: DeforestationRecord[]
    totals: {
        totalArea: number
        totalEmission: number
    }
    trendData: TrendDataPoint[]
    regionData: RegionDataPoint[]
    error: string | null
    loading: boolean
    sidebar?: ReactNode
}

export function MainContentLayout({
    data,
    filters,
    onFilterChange,
    filteredData,
    totals,
    trendData,
    regionData,
    error,
    loading,
    sidebar,
}: MainContentLayoutProps) {
    return (
        <div className="w-full">
            <div className="mx-auto max-w-6xl px-0 sm:px-0 md:px-0 py-8 sm:py-12 md:py-16">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8 px-4 sm:px-6 md:px-8">
                    {/* Left Column - Main Content */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Stat Cards */}
                        <div className="space-y-3 mb-2">
                            <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Statistik Deforestasi</h2>
                            <p className="text-sm text-gray-600">Ringkasan data kehilangan hutan dan emisi karbon</p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
                            <StatCard
                                label="Total luas deforestasi"
                                value={`${totals.totalArea.toLocaleString('id-ID')} ha`}
                                icon="🌳"
                                trend="down"
                                accent="from-red-50 to-red-100"
                            />
                            <StatCard
                                label="Estimasi total emisi"
                                value={`${totals.totalEmission.toLocaleString('id-ID', { maximumFractionDigits: 0 })} ton CO₂`}
                                icon="💨"
                                trend="up"
                                accent="from-orange-50 to-orange-100"
                            />
                        </div>

                        {/* Error Message */}
                        {error && (
                            <div className="rounded-lg bg-red-50 border border-red-200 p-4 text-sm text-red-800 flex items-start gap-3">
                                <span className="text-lg shrink-0">⚠️</span>
                                <div>
                                    <p className="font-semibold mb-1">Terjadi Kesalahan</p>
                                    <p className="text-xs sm:text-sm">{error}</p>
                                </div>
                            </div>
                        )}

                        {/* Charts Section */}
                        <div className="space-y-3 mb-2">
                            <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Visualisasi Trend</h2>
                            <p className="text-sm text-gray-600">Analisis tren deforestasi dan emisi karbon menurut waktu dan wilayah</p>
                        </div>

                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6 hover:shadow-md transition-shadow duration-300">
                            <ChartSection trendData={trendData} regionData={regionData} />
                        </div>

                        {/* Map Section */}
                        <div className="space-y-3 mb-2">
                            <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Peta Deforestasi</h2>
                            <p className="text-sm text-gray-600">Visualisasi geografis kehilangan hutan per provinsi</p>
                        </div>

                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-300">
                            <DeforestationMap data={filteredData} selectedYear={filters.year} />
                        </div>
                    </div>

                    {/* Right Column - Sidebar */}
                    <div className="lg:col-span-1">
                        {/* Sticky Sidebar Container */}
                        <div className="sticky top-4 sm:top-6 md:top-8 space-y-6 max-h-[calc(100vh-2rem)] sm:max-h-[calc(100vh-3rem)] md:max-h-[calc(100vh-4rem)] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
                            <FilterPanel
                                data={data}
                                selectedYear={filters.year}
                                selectedProvince={filters.province}
                                onChange={onFilterChange}
                            />

                            {/* Custom Sidebar Content */}
                            {sidebar && sidebar}

                            {/* Default Info Boxes */}
                            {!sidebar && (
                                <>
                                    {/* Info Box */}
                                    <div className="rounded-xl bg-linear-to-br from-blue-50 to-cyan-50 border border-blue-200 p-5 sm:p-6 shadow-sm shrink-0">
                                        <div className="space-y-4">
                                            <div>
                                                <h3 className="text-sm font-bold text-gray-900 mb-2 flex items-center gap-2">
                                                    <span>📐</span> Metodologi Perhitungan
                                                </h3>
                                                <p className="text-xs text-gray-600 leading-relaxed">
                                                    Estimasi emisi berbasis luas deforestasi dikalikan dengan faktor emisi karbon standar untuk Indonesia.
                                                </p>
                                            </div>

                                            <div className="bg-white rounded-lg p-3 border border-blue-100">
                                                <p className="text-xs font-mono text-blue-900 wrap-break-words">
                                                    <span className="text-blue-600 font-semibold">Emisi =</span> Luas (ha) × 45.5 tCO₂/ha
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Quick Info */}
                                    <div className="rounded-xl bg-linear-to-br from-emerald-50 to-teal-50 border border-emerald-200 p-5 sm:p-6 shadow-sm shrink-0">
                                        <h3 className="text-sm font-bold text-gray-900 mb-3 flex items-center gap-2">
                                            <span>💡</span> Tips Penggunaan
                                        </h3>
                                        <ul className="space-y-2 text-xs text-gray-700">
                                            <li className="flex gap-2">
                                                <span className="text-emerald-600 shrink-0">•</span>
                                                <span>Gunakan filter untuk fokus pada tahun atau provinsi spesifik</span>
                                            </li>
                                            <li className="flex gap-2">
                                                <span className="text-emerald-600 shrink-0">•</span>
                                                <span>Hover pada grafik untuk melihat detail data</span>
                                            </li>
                                            <li className="flex gap-2">
                                                <span className="text-emerald-600 shrink-0">•</span>
                                                <span>Peta menampilkan distribusi deforestasi geografis</span>
                                            </li>
                                        </ul>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
