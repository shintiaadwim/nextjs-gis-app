'use client'

import Link from 'next/link'
import { useEffect, useMemo, useState } from 'react'
import {
  calculateTotals,
  getRegionSummary,
  getYearlyTrend,
  sampleDeforestationData,
} from '@/lib/data'
import { DeforestationRecord, FilterOptions } from '@/lib/types'

const fetchDataset = async (): Promise<DeforestationRecord[]> => {
  const response = await fetch('/api/data')
  if (!response.ok) {
    const message = await response.text()
    throw new Error(message || 'Gagal mengambil data')
  }
  const result = await response.json() as {
    success: boolean
    data: Array<{
      Province: string
      Year: number
      'Tree Cover Extent 2000 ha': number
      'Avg Annual Gross Emissions MgCO2e yr': number
    }>
  }

  return result.data.map((item) => ({
    year: item.Year,
    province: item.Province,
    areaHa: item['Tree Cover Extent 2000 ha'],
    carbonEmissionTon: item['Avg Annual Gross Emissions MgCO2e yr'],
  }))
}

export function HomePage() {
  const [data, setData] = useState<DeforestationRecord[]>([])
  const [filters, setFilters] = useState<FilterOptions>({})
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchDataset()
      .then((rows) => setData(rows.length > 0 ? rows : sampleDeforestationData))
      .catch((err) => {
        setError(err.message)
        setData(sampleDeforestationData)
      })
      .finally(() => setLoading(false))
  }, [])

  const filteredData = useMemo(() => {
    return data.filter((record) => {
      if (filters.year && record.year !== filters.year) return false
      if (filters.province && record.province !== filters.province) return false
      return true
    })
  }, [data, filters])

  const totals = calculateTotals(filteredData)
  const trendData = getYearlyTrend(filteredData)
  const regionData = getRegionSummary(filteredData)

  return (
    <div className="w-full min-h-screen overflow-hidden bg-white text-slate-900">
      {/* Hero Section */}
      <div className="relative flex min-h-[calc(100vh-5rem)] items-start overflow-hidden pt-4 sm:pt-8 lg:pt-10">

        <div className="relative mx-auto flex w-full max-w-6xl px-4 sm:px-6 md:px-8 py-10 sm:py-12 md:py-16 lg:py-20">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8 lg:gap-12">
            <div className="flex-1 min-w-0">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full mb-6 border border-slate-200 shadow-sm">
                <span className="text-lg">🌳</span>
                <p className="text-xs sm:text-sm font-semibold text-slate-700">Carbon Loss Tracker Indonesia</p>
              </div>

              <h1 className="font-bold leading-tight mb-4 sm:mb-6 wrap-break-words text-slate-900 sm:text-2xl lg:text-3xl xl:text-4xl">
                Estimasi Pelepasan Emisi Karbon Berdasarkan Deforestasi di Indonesia
              </h1>

              <p className="text-slate-600 leading-relaxed mb-8 sm:mb-10 max-w-2xl sm:text-sm lg:text-base">
                Monitoring deforestasi dan emisi CO₂ di wilayah Indonesia dengan visualisasi tren, perbandingan wilayah, dan estimasi karbon berbasis luas hutan yang hilang.
              </p>

              <Link
                href="#analytics"
                className="inline-flex items-center justify-center gap-2 px-5 sm:px-5 py-3 sm:py-3 bg-slate-900 hover:bg-slate-800 text-white font-semibold rounded-xl transition-all duration-200 text-sm sm:text-base active:scale-95 shadow-lg hover:shadow-xl"
              >
                <span>📊 Lihat Analisis Lengkap</span>
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>

            {/* Data Status Card */}
            <div className="w-full sm:w-auto shrink-0">
              <div className="bg-white text-slate-900 rounded-2xl p-6 sm:p-8 shadow-xl border border-slate-200">
                <div className="space-y-4">
                  <div>
                    <p className="text-xs sm:text-sm text-slate-500 font-medium uppercase tracking-[0.2em]">Total Dataset</p>
                    <p className="text-3xl sm:text-4xl font-bold mt-2">
                      {loading ? <span className="animate-pulse">···</span> : `${data.length}`}
                    </p>
                    <p className="text-xs sm:text-sm text-slate-500 mt-1">catatan tersedia</p>
                  </div>
                  {!loading && (
                    <div className="pt-3 border-t border-slate-200 flex items-center gap-2 text-emerald-600">
                      <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                      <span className="text-xs sm:text-sm">Sistem siap</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

