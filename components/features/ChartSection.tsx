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
    const pieLegendItems = regionData.map((entry, index) => ({
        name: entry.province,
        color: PIE_COLORS[index % PIE_COLORS.length],
    }))

    if (!trendData || trendData.length === 0) {
        return (
            <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                <p className="text-center text-sm text-gray-500">Tidak ada data untuk ditampilkan</p>
            </div>
        )
    }

    return (
        <div className="space-y-6">
            {/* Charts Grid */}
            <div className="grid gap-6 lg:grid-cols-2 w-full">
                {/* Line Chart - Tren */}
                <div className="rounded-lg border border-gray-200 bg-white p-4 sm:p-5 md:p-6 shadow-sm hover:shadow-md transition-shadow">
                    <h3 className="mb-4 sm:mb-5 md:mb-6 text-base md:text-lg font-bold text-gray-900">📈 Tren Deforestasi</h3>
                    <div className="h-72 md:h-80 lg:h-96">
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
                                <Legend wrapperStyle={{ paddingTop: '20px', fontSize: '12px' }} />
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

                {/* Pie Chart - Komposisi */}
                <div className="rounded-lg border border-gray-200 bg-white p-4 sm:p-5 md:p-6 shadow-sm hover:shadow-md transition-shadow">
                    <h3 className="mb-4 sm:mb-5 md:mb-6 text-base md:text-lg font-bold text-gray-900">🥧 Komposisi Emisi</h3>
                    <div className="h-72 md:h-80 lg:h-96">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={regionData}
                                    dataKey="carbonEmissionTon"
                                    nameKey="province"
                                    innerRadius={52}
                                    outerRadius={88}
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
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                    <div className="mt-3 max-h-28 overflow-y-auto pr-1">
                        <div className="flex flex-wrap gap-x-3 gap-y-2 text-[11px] sm:text-xs leading-tight">
                            {pieLegendItems.map((item) => (
                                <div key={item.name} className="flex items-center gap-1.5 min-w-0">
                                    <span
                                        className="h-3 w-3 rounded-full shrink-0"
                                        style={{ backgroundColor: item.color }}
                                    />
                                    <span className="truncate text-gray-700">{item.name}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Bar Chart - Laju Deforestasi */}
            <div className="rounded-lg border border-gray-200 bg-white p-4 sm:p-5 md:p-6 shadow-sm hover:shadow-md transition-shadow">
                <h3 className="mb-4 sm:mb-5 md:mb-6 text-base md:text-lg font-bold text-gray-900">📊 Laju Deforestasi</h3>
                <div className="h-72 md:h-80 lg:h-96">
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
                            <Legend wrapperStyle={{ paddingTop: '20px', fontSize: '12px' }} />
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
        </div>
    )
}
