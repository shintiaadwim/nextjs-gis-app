'use client'

import {
    LineChart,
    Line,
    BarChart,
    Bar,
    PieChart,
    Pie,
    Cell,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Legend,
} from 'recharts'
import { PIE_COLORS, TrendDataPoint, RegionDataPoint } from '@/utils/chartUtils'
import { ChartTooltip } from '@/components/ui/ChartTooltip'

type ChartSectionProps = {
    trendData: TrendDataPoint[]
    regionData: RegionDataPoint[]
}

export default function ChartSection({
    trendData,
    regionData,
}: ChartSectionProps) {
    if (!trendData || trendData.length === 0) {
        return (
            <div className="rounded-3xl border border-gray-300 bg-white p-6 shadow-lg">
                <p className="text-center text-gray-500">Tidak ada data untuk ditampilkan</p>
            </div>
        )
    }

    return (
        <div className="space-y-4 sm:space-y-6">
            <div className="grid gap-4 sm:gap-6 lg:grid-cols-2">
                {/* Line Chart - Tren */}
                <div className="group relative overflow-hidden rounded-xl sm:rounded-2xl border border-gray-300 p-3 sm:p-4 md:p-6 shadow-md sm:shadow-lg hover:shadow-lg transition-shadow bg-white animate-fade-in">
                    <div className="absolute inset-0 bg-linear-to-br from-blue-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    <div className="relative z-10">
                        <h3 className="mb-3 sm:mb-4 md:mb-6 text-base sm:text-lg md:text-xl font-bold text-gray-900">
                            📈 Tren Deforestasi
                        </h3>
                        <div className="h-60 sm:h-72 md:h-80">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={trendData} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                                    <XAxis
                                        dataKey="year"
                                        stroke="#9ca3af"
                                        fontSize={10}
                                        tick={{ fill: '#6b7280' }}
                                    />
                                    <YAxis
                                        stroke="#9ca3af"
                                        fontSize={10}
                                        tick={{ fill: '#6b7280' }}
                                        width={40}
                                    />
                                    <Tooltip content={<ChartTooltip />} />
                                    <Legend wrapperStyle={{ paddingTop: '20px' }} />
                                    <Line
                                        type="monotone"
                                        dataKey="areaHa"
                                        name="Luas (ha)"
                                        stroke="#2563eb"
                                        strokeWidth={2}
                                        dot={{ fill: '#2563eb', r: 4 }}
                                        activeDot={{ r: 6 }}
                                    />
                                    <Line
                                        type="monotone"
                                        dataKey="carbonEmissionTon"
                                        name="Emisi CO₂ (ton)"
                                        stroke="#3b82f6"
                                        strokeWidth={2}
                                        dot={{ fill: '#3b82f6', r: 4 }}
                                        activeDot={{ r: 6 }}
                                    />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    <div className="absolute -top-6 -right-6 sm:-top-8 sm:-right-8 w-12 h-12 sm:w-16 sm:h-16 bg-linear-to-br from-blue-200/20 to-blue-300/20 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>

                {/* Pie Chart - Komposisi */}
                <div className="group relative overflow-hidden rounded-xl sm:rounded-2xl border border-gray-300 p-3 sm:p-4 md:p-6 shadow-md sm:shadow-lg hover:shadow-lg transition-shadow bg-white animate-fade-in">
                    <div className="absolute inset-0 bg-linear-to-br from-blue-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    <div className="relative z-10">
                        <h3 className="mb-3 sm:mb-4 md:mb-6 text-base sm:text-lg md:text-xl font-bold text-gray-900">
                            🥧 Komposisi Emisi
                        </h3>
                        <div className="h-60 sm:h-72 md:h-80">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={regionData}
                                        dataKey="carbonEmissionTon"
                                        nameKey="province"
                                        innerRadius={60}
                                        outerRadius={100}
                                        paddingAngle={2}
                                        stroke="#ffffff"
                                        strokeWidth={2}
                                    >
                                        {regionData.map((entry, index) => (
                                            <Cell
                                                key={`cell-${entry.province}`}
                                                fill={PIE_COLORS[index % PIE_COLORS.length]}
                                            />
                                        ))}
                                    </Pie>
                                    <Tooltip content={<ChartTooltip />} />
                                    <Legend verticalAlign="bottom" height={36} />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    <div className="absolute -bottom-6 -left-6 sm:-bottom-8 sm:-left-8 w-12 h-12 sm:w-16 sm:h-16 bg-linear-to-tr from-blue-200/20 to-blue-300/20 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
            </div>

            {/* Bar Chart - Laju Deforestasi */}
            <div className="group relative overflow-hidden rounded-xl sm:rounded-2xl border border-gray-300 p-3 sm:p-4 md:p-6 shadow-md sm:shadow-lg hover:shadow-lg transition-shadow bg-white animate-fade-in">
                <div className="absolute inset-0 bg-linear-to-br from-blue-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div className="relative z-10">
                    <h3 className="mb-3 sm:mb-4 md:mb-6 text-base sm:text-lg md:text-xl font-bold text-gray-900">
                        📊 Laju Deforestasi
                    </h3>
                    <div className="h-60 sm:h-72 md:h-80">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={trendData} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                                <XAxis
                                    dataKey="year"
                                    stroke="#9ca3af"
                                    fontSize={10}
                                    tick={{ fill: '#6b7280' }}
                                />
                                <YAxis
                                    stroke="#9ca3af"
                                    fontSize={10}
                                    tick={{ fill: '#6b7280' }}
                                    width={40}
                                />
                                <Tooltip content={<ChartTooltip />} />
                                <Legend wrapperStyle={{ paddingTop: '20px' }} />
                                <Bar
                                    dataKey="areaHa"
                                    name="Luas Deforestasi (ha)"
                                    fill="#2563eb"
                                    radius={[8, 8, 0, 0]}
                                />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
                6 -left-6 sm:-top-8 sm:-left-8 w-12 h-12 sm:w-16 sm:h-16 bg-linear-to-br from-blue-200/20 to-gray-300/20 rounded-full blur-lg
                <div className="absolute -top-10 -left-10 w-20 h-20 bg-linear-to-br from-blue-200/20 to-gray-300/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
        </div>
    )
}
