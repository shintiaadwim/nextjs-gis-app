'use client'

import ChartSection from '@/components/features/ChartSection'
import DeforestationMap from '@/components/features/DeforestationMap'
import FilterPanel from '@/components/features/FilterPanel'
import StatCard from '@/components/ui/StatCard'
import { useStatisticsData } from '@/hooks/useStatisticsData'
import { formatDeforestationArea, formatCarbonEmission } from '@/utils/statisticsFormatUtils'

export function StatisticsContent() {
    const {
        data, filters, filteredData, totals, trendData, regionData, dataPeriod, error, loading, onFilterChange,
    } = useStatisticsData()

    return (
        <div className="w-full min-h-screen">
            <div className="px-2 py-2">
                <div className="space-y-8">

                    <div className="lg:col-span-2 space-y-8">
                        <div className="space-y-3 mb-2">
                            <h2 className="text-lg sm:text-xl font-bold text-gray-900">Statistik Deforestasi</h2>
                            <p className="text-xs sm:text-sm text-gray-600">Ringkasan data kehilangan hutan dan emisi karbon</p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                            <StatCard
                                label="Total luas deforestasi"
                                value={formatDeforestationArea(totals.totalArea)}
                                icon="🌳"
                                trend="down"
                                accent="from-red-50 to-red-100"
                            />
                            <StatCard
                                label="Estimasi total emisi"
                                value={formatCarbonEmission(totals.totalEmission)}
                                icon="💨"
                                trend="up"
                                accent="from-orange-50 to-orange-100"
                            />
                            <StatCard
                                label="Data periode"
                                value={dataPeriod}
                                icon="📅"
                                trend="neutral"
                                accent="from-blue-50 to-cyan-100"
                            />
                        </div>

                        {error && (
                            <div className="rounded-lg bg-red-50 border border-red-200 p-3 text-xs sm:text-sm text-red-800 flex items-start gap-3">
                                <span className="text-base sm:text-lg shrink-0">⚠️</span>
                                <div>
                                    <p className="font-semibold mb-1 text-sm sm:text-base">Terjadi Kesalahan</p>
                                    <p className="text-xs sm:text-sm">{error}</p>
                                </div>
                            </div>
                        )}
                        <div className="lg:col-span-1 space-y-8">
                            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

                                <FilterPanel
                                    data={data}
                                    selectedYear={filters.year}
                                    selectedProvince={filters.province}
                                    onChange={onFilterChange}
                                />

                                <div className="rounded-xl bg-linear-to-br from-purple-50 to-indigo-50 border border-purple-200 p-5 sm:p-6 shadow-sm shrink-0">
                                    <div className="space-y-4">
                                        <h3 className="text-sm font-bold text-gray-900 flex items-center gap-2">📊 Rangkuman Sistem Perhitungan</h3>
                                        <p className="text-xs text-gray-600 leading-relaxed">
                                            Estimasi berbasis luas deforestasi dikalikan faktor emisi karbon standar. Perhitungan ini memungkinkan perbandingan area dan emisi antar wilayah serta tahun.
                                        </p>
                                        <p className="text-xs font-medium text-gray-700 mb-1">Rumus: Emisi CO₂ = Luas deforestasi (ha) × Faktor emisi (ton CO₂ / ha)</p>
                                        <div className="text-xs text-gray-500">Faktor emisi: ~150–200 ton CO₂ per hektar hutan tropis</div>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-3 mb-2">
                                <h2 className="text-lg sm:text-xl font-bold text-gray-900">Visualisasi Trend</h2>
                                <p className="text-xs sm:text-sm text-gray-600">Analisis tren deforestasi dan emisi karbon menurut waktu dan wilayah</p>
                            </div>
                            <ChartSection trendData={trendData} regionData={regionData} />

                            {/* <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-3 sm:p-4 hover:shadow-md transition-shadow duration-300">
                            </div> */}

                            <div className="space-y-3 mb-2">
                                <h2 className="text-lg sm:text-xl font-bold text-gray-900">Peta Deforestasi</h2>
                                <p className="text-xs sm:text-sm text-gray-600">Visualisasi geografis kehilangan hutan per provinsi</p>
                            </div>

                            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-300">
                                <DeforestationMap data={filteredData} selectedYear={filters.year} />
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}
