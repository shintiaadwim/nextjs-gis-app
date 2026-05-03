'use client'

import { useMemo } from 'react'
import { DeforestationRecord } from '@/lib/types'
import { extractYears, extractProvinces } from '@/utils/filterUtils'

/**
 * Hook untuk mengekstrak opsi filter dari data
 * Memisahkan logika ekstraksi data dari component rendering
 */
export function useFilterOptions(data: DeforestationRecord[]) {
    const years = useMemo(() => {
        if (!data || data.length === 0) return []
        return extractYears(data)
    }, [data])

    const provinces = useMemo(() => {
        if (!data || data.length === 0) return []
        return extractProvinces(data)
    }, [data])

    return {
        years,
        provinces,
    }
}
