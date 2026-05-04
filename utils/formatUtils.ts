/**
 * Format Utilities - Fungsi untuk memformat data
 */

/**
 * Format number dengan suffix K, M, B
 * @param num - number atau string yang akan diformat
 * @returns formatted string
 */
export const formatNumber = (num: string | number): string => {
    const numValue = typeof num === 'string' ? parseFloat(num) : num
    if (numValue >= 1e9) return (numValue / 1e9).toFixed(1) + 'B'
    if (numValue >= 1e6) return (numValue / 1e6).toFixed(1) + 'M'
    if (numValue >= 1e3) return (numValue / 1e3).toFixed(1) + 'K'
    return numValue.toFixed(0)
}
