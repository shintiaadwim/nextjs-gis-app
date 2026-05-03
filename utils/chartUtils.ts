/**
 * Chart Utilities - Berisi konstanta dan fungsi untuk chart
 */

// Warna untuk Pie Chart dan visualisasi lainnya
export const PIE_COLORS = [
    '#2563eb', '#3b82f6', '#60a5fa', '#93c5fd', '#1e40af',
    '#1e3a8a', '#f59e0b', '#fbbf24', '#fcd34d', '#fed7aa',
    '#dc2626', '#ef4444', '#f87171', '#fca5a5', '#fee2e2',
    '#059669', '#10b981', '#34d399', '#6ee7b7', '#d1fae5',
    '#7c3aed', '#a78bfa', '#c4b5fd', '#ddd6fe', '#ede9fe',
    '#0891b2', '#06b6d4', '#22d3ee', '#67e8f9', '#cffafe',
    '#6b21a8', '#9333ea', '#c084fc', '#e9d5ff', '#fae8ff',
] as const

// Fungsi untuk format nomor dengan locale Indonesia
export const formatNumber = (value: number): string => {
    return value.toLocaleString('id-ID')
}

// Fungsi untuk mendapatkan warna berdasarkan index
export const getChartColor = (index: number): string => {
    return PIE_COLORS[index % PIE_COLORS.length]
}

// Tipe untuk chart tooltip
export type TooltipPayload = {
    color: string
    name: string
    value: number
}

// Tipe untuk chart data
export type TrendDataPoint = {
    year: number
    areaHa: number
    carbonEmissionTon: number
}

export type RegionDataPoint = {
    province: string
    areaHa: number
    carbonEmissionTon: number
}
