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

const pieColors = [
    '#2563eb', '#3b82f6', '#60a5fa', '#93c5fd', '#1e40af',
    '#1e3a8a', '#f59e0b', '#fbbf24', '#fcd34d', '#fed7aa',
    '#dc2626', '#ef4444', '#f87171', '#fca5a5', '#fee2e2',
    '#059669', '#10b981', '#34d399', '#6ee7b7', '#d1fae5',
    '#7c3aed', '#a78bfa', '#c4b5fd', '#ddd6fe', '#ede9fe',
    '#0891b2', '#06b6d4', '#22d3ee', '#67e8f9', '#cffafe',
    '#6b21a8', '#9333ea', '#c084fc', '#e9d5ff', '#fae8ff',
]

type ChartSectionProps = {
    trendData: Array<{ year: number; areaHa: number; carbonEmissionTon: number }>
    regionData: Array<{
        province: string
        areaHa: number
        carbonEmissionTon: number
    }>
}

const CustomTooltip = ({ active, payload }: { active?: boolean; payload?: Array<{ color: string; name: string; value: number }> }) => {
    if (active && payload && payload.length) {
        return (
            <div className="rounded-lg bg-white border border-gray-300 p-3 shadow-lg">
                {payload.map((entry, index) => (
                    <p key={index} style={{ color: entry.color }} className="text-xs font-semibold">
                        {entry.name}: {entry.value.toLocaleString('id-ID')}
                    </p>
                ))}
            </div>
        )
    }
    return null
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
        <div className="space-y-6">
            <div className="grid gap-6 lg:grid-cols-2">
                {/* Line Chart - Tren */}
                <div className="group relative overflow-hidden rounded-3xl border border-gray-300 p-6 shadow-lg shadow-gray-200 hover-lift glass bg-white animate-fade-in">
                    <div className="absolute inset-0 bg-linear-to-br from-blue-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    <div className="relative z-10">
                        <h3 className="mb-6 text-xl font-bold text-gray-900">
                            📈 Tren Deforestasi per Tahun
                        </h3>
                        <div className="h-80">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={trendData} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                                    <XAxis
                                        dataKey="year"
                                        stroke="#9ca3af"
                                        fontSize={12}
                                        tick={{ fill: '#6b7280' }}
                                    />
                                    <YAxis
                                        stroke="#9ca3af"
                                        fontSize={12}
                                        tick={{ fill: '#6b7280' }}
                                    />
                                    <Tooltip content={<CustomTooltip />} />
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

                    <div className="absolute -top-10 -right-10 w-20 h-20 bg-linear-to-br from-blue-200/20 to-blue-300/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>

                {/* Pie Chart - Komposisi */}
                <div className="group relative overflow-hidden rounded-3xl border border-gray-300 p-6 shadow-lg shadow-gray-200 hover-lift glass bg-white animate-fade-in">
                    <div className="absolute inset-0 bg-linear-to-br from-blue-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    <div className="relative z-10">
                        <h3 className="mb-6 text-xl font-bold text-gray-900">
                            🥧 Komposisi Emisi per Wilayah
                        </h3>
                        <div className="h-80">
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
                                                fill={pieColors[index % pieColors.length]}
                                            />
                                        ))}
                                    </Pie>
                                    <Tooltip content={<CustomTooltip />} />
                                    <Legend verticalAlign="bottom" height={36} />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    <div className="absolute -bottom-10 -left-10 w-20 h-20 bg-linear-to-tr from-blue-200/20 to-blue-300/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
            </div>

            {/* Bar Chart - Laju Deforestasi */}
            <div className="group relative overflow-hidden rounded-3xl border border-gray-300 p-6 shadow-lg shadow-gray-200 hover-lift glass bg-white animate-fade-in">
                <div className="absolute inset-0 bg-linear-to-br from-blue-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div className="relative z-10">
                    <h3 className="mb-6 text-xl font-bold text-gray-900">
                        📊 Laju Deforestasi per Tahun
                    </h3>
                    <div className="h-95">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={trendData} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                                <XAxis
                                    dataKey="year"
                                    stroke="#9ca3af"
                                    fontSize={12}
                                    tick={{ fill: '#6b7280' }}
                                />
                                <YAxis
                                    stroke="#9ca3af"
                                    fontSize={12}
                                    tick={{ fill: '#6b7280' }}
                                />
                                <Tooltip content={<CustomTooltip />} />
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

                <div className="absolute -top-10 -left-10 w-20 h-20 bg-linear-to-br from-blue-200/20 to-gray-300/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
        </div>
    )
}
