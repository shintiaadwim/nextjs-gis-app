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
    const trendChartMargin = { top: 5, right: 16, left: 8, bottom: 5 }

    const pieLegendItems = regionData.map((entry, index) => ({
        name: entry.province,
        color: PIE_COLORS[index % PIE_COLORS.length],
    }))

    if (!trendData || trendData.length === 0) {
        return (
            <div className="card p-6">
                <p className="text-center text-sm text-slate-500">Tidak ada data untuk ditampilkan</p>
            </div>
        )
    }

    return (
        <div className="space-y-6">
            {/* Charts Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {/* Tren Deforestasi - Dua Bar Chart (atas: Luas, bawah: Emisi) */}
                <div className="card p-4 sm:p-5 md:p-6 hover:shadow-md transition-shadow">
                    <h3 className="mb-4 sm:mb-5 md:mb-6 text-base md:text-lg font-bold text-slate-900">📈 Tren Deforestasi</h3>
                    <div className="h-96 grid grid-rows-2 gap-4">
                        <div className="h-44">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={trendData} margin={trendChartMargin}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                                    <XAxis dataKey="year" stroke="#9ca3af" fontSize={10} tick={{ fill: '#6b7280' }} />
                                    <YAxis stroke="#9ca3af" fontSize={10} tick={{ fill: '#6b7280' }} width={56} tickMargin={8} />
                                    <Tooltip content={<ChartTooltip />} />
                                    <Legend wrapperStyle={{ paddingTop: '6px', fontSize: '12px' }} />
                                    <Bar dataKey="areaHa" name="Luas (ha)" fill="#2563eb" radius={[6, 6, 0, 0]} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>

                        <div className="h-44">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={trendData} margin={trendChartMargin}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                                    <XAxis dataKey="year" stroke="#9ca3af" fontSize={10} tick={{ fill: '#6b7280' }} />
                                    <YAxis stroke="#9ca3af" fontSize={10} tick={{ fill: '#6b7280' }} width={56} tickMargin={8} />
                                    <Tooltip content={<ChartTooltip />} />
                                    <Legend wrapperStyle={{ paddingTop: '6px', fontSize: '12px' }} />
                                    <Bar dataKey="carbonEmissionTon" name="Emisi CO₂ (ton)" fill="#10b981" radius={[6, 6, 0, 0]} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>

                {/* Pie Chart - Komposisi */}
                <div className="card p-4 sm:p-5 md:p-6 hover:shadow-md transition-shadow">
                    <h3 className="mb-4 sm:mb-5 md:mb-6 text-base md:text-lg font-bold text-slate-900">🥧 Komposisi Emisi</h3>
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
                                    <span className="truncate text-slate-700">{item.name}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Bar Chart - Laju Deforestasi */}
                <div className="card p-4 sm:p-5 md:p-6 hover:shadow-md transition-shadow">
                    <h3 className="mb-4 sm:mb-5 md:mb-6 text-base md:text-lg font-bold text-slate-900">📊 Laju Deforestasi</h3>
                    <div className="h-72 md:h-80 lg:h-96">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={trendData} margin={trendChartMargin}>
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
                                    width={56}
                                    tickMargin={8}
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

        </div>
    )
}
