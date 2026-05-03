'use client'

import Link from 'next/link'
import { useEffect, useMemo, useState } from 'react'
import ChartSection from '@/components/features/ChartSection'
import DeforestationMap from '@/components/features/DeforestationMap'
import FilterPanel from '@/components/features/FilterPanel'
import StatCard from '@/components/ui/StatCard'
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
    <main className="container mx-auto px-4 py-8">
      <div className="mb-10 border border-blue-200 bg-linear-to-br from-blue-50 to-gray-50 p-10 shadow-lg shadow-blue-100 animate-fade-in">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="animate-slide-in">
            <p className="text-sm uppercase tracking-[0.28em] text-blue-600 font-medium">
              🌿 Carbon-Loss Tracker
            </p>
            <h1 className="mt-3 text-4xl font-bold text-gray-900 sm:text-5xl">
              Estimasi Pelepasan Emisi Karbon Berdasarkan Deforestasi di Indonesia
            </h1>
            <p className="mt-4 max-w-2xl text-gray-600 leading-relaxed">
              Monitoring deforestasi dan emisi CO₂ di wilayah Indonesia dengan
              visualisasi tren, perbandingan wilayah, dan estimasi karbon
              berbasis luas hutan yang hilang.
            </p>
            <div className="mt-6">
              <Link
                href="/analytics"
                className="inline-flex items-center gap-2 rounded-full bg-linear-to-r from-blue-600 to-blue-700 px-6 py-3 text-sm font-semibold text-white transition-all hover:from-blue-700 hover:to-blue-800 hover:shadow-lg hover:shadow-blue-300 hover:scale-105"
              >
                📊 Lihat analisis wilayah
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </Link>
            </div>
          </div>
          <div className="rounded-3xl bg-linear-to-br from-blue-600 to-gray-700 px-6 py-5 text-white shadow-lg shadow-blue-200 backdrop-blur-sm border border-blue-300 animate-fade-in">
            <p className="text-sm text-blue-100">Status dataset</p>
            <p className="mt-2 text-2xl font-bold text-white">
              {loading ? (
                <span className="animate-pulse">Memuat...</span>
              ) : (
                `${data.length} catatan`
              )}
            </p>
            {!loading && (
              <div className="mt-2 flex items-center gap-2 text-xs text-green-400">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                Data tersedia
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="grid gap-8 w-full">
        <section className="space-y-6 w-full">
          <div className="grid gap-3 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 w-full">
            <StatCard
              label="Total luas deforestasi"
              value={`${totals.totalArea.toLocaleString('id-ID')} ha`}
              icon="🌳"
              trend="down"
              accent="from-red-50 to-red-100"
            />
            <StatCard
              label="Estimasi total emisi"
              value={`${totals.totalEmission.toLocaleString('id-ID', {
                maximumFractionDigits: 0,
              })} ton CO₂`}
              icon="💨"
              trend="up"
              accent="from-orange-50 to-orange-100"
            />
            <StatCard
              label="Data periode"
              value="2018 - 2022"
              icon="📅"
              trend="neutral"
              accent="from-blue-50 to-blue-100"
            />
          </div>

          {error ? (
            <div className="rounded-3xl border border-red-500/20 bg-red-500/10 p-5 text-sm text-red-200">
              Terjadi kesalahan saat memuat data: {error}
            </div>
          ) : null}

          <ChartSection trendData={trendData} regionData={regionData} />

          <div className="animate-fade-in">
            <DeforestationMap data={filteredData} selectedYear={filters.year} />
          </div>
        </section>

        <aside className="space-y-6 w-full order-first lg:order-last lg:w-auto lg:h-fit">
          <FilterPanel
            data={data}
            selectedYear={filters.year}
            selectedProvince={filters.province}
            onChange={setFilters}
          />
          <div className="hidden lg:block group relative overflow-hidden rounded-2xl border border-gray-200 p-5 shadow-md bg-linear-to-br from-slate-50 to-gray-50 animate-fade-in lg:sticky lg:top-24">
            <div className="absolute inset-0 bg-linear-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            <div className="relative z-10">
              <h2 className="text-sm font-bold text-gray-900 mb-3">
                📊 Info Sistem
              </h2>
              <p className="text-gray-600 text-sm leading-relaxed">
                Estimasi berbasis luas deforestasi dikalikan faktor emisi karbon
                standar. Perhitungan ini memungkinkan perbandingan area dan
                emisi antar wilayah serta tahun.
              </p>
              <div className="mt-4 rounded-lg bg-blue-50 p-3 text-gray-700 border border-blue-200 text-xs space-y-2">
                <p className="text-gray-700 font-semibold">📐 Rumus:</p>
                <p className="font-mono text-blue-900 bg-white/70 px-2 py-1 rounded text-xs">
                  Emisi = Luas (ha) × 45.5 ton CO₂/ha
                </p>
                <p className="text-gray-500">
                  ℹ️ Standar faktor emisi hutan tropis
                </p>
              </div>
            </div>

            <div className="absolute -bottom-8 -right-8 w-16 h-16 bg-linear-to-tl from-blue-200/30 to-cyan-200/30 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </div>
        </aside>
      </div>
    </main>
  )
}
