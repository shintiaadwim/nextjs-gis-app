'use client'

import ChartSection from '@/components/features/ChartSection'
import DeforestationMap from '@/components/features/DeforestationMap'
import FilterPanel from '@/components/features/FilterPanel'
import StatCard from '@/components/ui/StatCard'
import { useStatisticsData } from '@/hooks/useStatisticsData'
import { formatDeforestationArea, formatCarbonEmission } from '@/utils/statisticsFormatUtils'

export function StatisticsContent() {
    const {
        data, filters, filteredData, totals, trendData, regionData, error, loading, onFilterChange,
    } = useStatisticsData()

    return (
        <div className="w-full min-h-screen">
            <div className="px-2 py-2">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 md:gap-4">

                    <div className="lg:col-span-2 space-y-8">
                        <div className="space-y-3 mb-2">
                            <h2 className="text-lg sm:text-xl font-bold text-gray-900">Statistik Deforestasi</h2>
                            <p className="text-xs sm:text-sm text-gray-600">Ringkasan data kehilangan hutan dan emisi karbon</p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
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

                        <div className="space-y-3 mb-2">
                            <h2 className="text-lg sm:text-xl font-bold text-gray-900">Visualisasi Trend</h2>
                            <p className="text-xs sm:text-sm text-gray-600">Analisis tren deforestasi dan emisi karbon menurut waktu dan wilayah</p>
                        </div>

                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-3 sm:p-4 hover:shadow-md transition-shadow duration-300">
                            <ChartSection trendData={trendData} regionData={regionData} />
                        </div>

                        <div className="space-y-3 mb-2">
                            <h2 className="text-lg sm:text-xl font-bold text-gray-900">Peta Deforestasi</h2>
                            <p className="text-xs sm:text-sm text-gray-600">Visualisasi geografis kehilangan hutan per provinsi</p>
                        </div>

                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-300">
                            <DeforestationMap data={filteredData} selectedYear={filters.year} />
                        </div>
                    </div>

                    <div className="lg:col-span-1">
                        <div className="sticky top-4 sm:top-6 md:top-8 space-y-6 max-h-[calc(100vh-2rem)] sm:max-h-[calc(100vh-3rem)] md:max-h-[calc(100vh-4rem)] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
                            <FilterPanel
                                data={data}
                                selectedYear={filters.year}
                                selectedProvince={filters.province}
                                onChange={onFilterChange}
                            />

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

                            <div className="rounded-xl bg-linear-to-br from-blue-50 to-cyan-50 border border-blue-200 p-4 sm:p-5 shadow-sm shrink-0">
                                <div className="space-y-4">
                                    <div>
                                        <h3 className="text-xs sm:text-sm font-bold text-gray-900 mb-2 flex items-center gap-2">
                                            <span>📐</span> Metodologi Perhitungan
                                        </h3>
                                        <p className="text-[11px] sm:text-xs text-gray-600 leading-relaxed">
                                            Estimasi emisi berbasis luas deforestasi dikalikan dengan faktor emisi karbon standar untuk Indonesia.
                                        </p>
                                    </div>

                                    <div className="bg-white rounded-lg p-2.5 border border-blue-100">
                                        <p className="text-[11px] sm:text-xs font-mono text-blue-900 wrap-break-words">
                                            <span className="text-blue-600 font-semibold">Emisi =</span> Luas (ha) × 45.5 tCO₂/ha
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="rounded-xl bg-linear-to-br from-emerald-50 to-teal-50 border border-emerald-200 p-4 sm:p-5 shadow-sm shrink-0">
                                <h3 className="text-xs sm:text-sm font-bold text-gray-900 mb-3 flex items-center gap-2">
                                    <span>💡</span> Tips Penggunaan
                                </h3>
                                <ul className="space-y-2 text-[11px] sm:text-xs text-gray-700">
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
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
