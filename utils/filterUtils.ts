/**
 * Filter Utilities - Berisi logika dan konstanta untuk filtering
 */

import { DeforestationRecord, FilterOptions } from '@/lib/types'

// Ekstrak tahun unik dari data
export const extractYears = (data: DeforestationRecord[]): number[] => {
    return Array.from(new Set(data.map((item) => item.year))).sort((a, b) => a - b)
}

// Ekstrak provinsi unik dari data
export const extractProvinces = (data: DeforestationRecord[]): string[] => {
    return Array.from(new Set(data.map((item) => item.province))).sort()
}

// Filter data berdasarkan pilihan tahun dan provinsi
export const filterData = (
    data: DeforestationRecord[],
    filters: FilterOptions
): DeforestationRecord[] => {
    return data.filter((item) => {
        if (filters.year !== undefined && item.year !== filters.year) {
            return false
        }
        if (filters.province !== undefined && item.province !== filters.province) {
            return false
        }
        return true
    })
}

// Konstanta untuk opsi filter
export const DEFAULT_FILTER_OPTIONS: FilterOptions = {
    year: undefined,
    province: undefined,
}

// Tahun default untuk dropdown
export const YEAR_RANGE = {
    start: 2001,
    end: 2024,
}

export const generateYearArray = (): string[] => {
    const years: string[] = ['all']
    for (let i = YEAR_RANGE.start; i <= YEAR_RANGE.end; i++) {
        years.push(String(i))
    }
    return years
}

// Wilayah default untuk dropdown (sebelumnya hardcoded di components)
export const DEFAULT_REGIONS = [
    'all',
    'Sumatra',
    'Kalimantan',
    'Sulawesi',
    'Papua',
    'Java',
    'Bali',
    'Nusa Tenggara',
] as const
