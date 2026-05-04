/**
 * Statistics Format Utilities - Fungsi untuk memformat data statistik
 */

/**
 * Format total deforestation area dengan satuan dan locale
 * @param area - Luas deforestasi dalam ha
 * @returns Formatted string dengan satuan ha
 */
export const formatDeforestationArea = (area: number): string => {
    return `${area.toLocaleString('id-ID')} ha`
}

/**
 * Format total carbon emission dengan satuan dan locale
 * @param emission - Emisi karbon dalam ton CO₂
 * @returns Formatted string dengan satuan ton CO₂
 */
export const formatCarbonEmission = (emission: number): string => {
    return `${emission.toLocaleString('id-ID', { maximumFractionDigits: 0 })} ton CO₂`
}

/**
 * Format rentang tahun data statistik
 * @param startYear - Tahun awal
 * @param endYear - Tahun akhir
 * @returns Formatted string rentang tahun
 */
export const formatDataPeriod = (startYear: number, endYear: number): string => {
    if (startYear === endYear) {
        return `${startYear}`
    }

    const latestYear = Math.max(startYear, endYear)
    const earliestYear = Math.min(startYear, endYear)

    return `${latestYear} - ${earliestYear}`
}
