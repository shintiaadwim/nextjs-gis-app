'use client'

import { DeforestationRecord } from '@/lib/types'

export default function RegionComparison({
  data,
}: {
  data?: DeforestationRecord[]
}) {
  // Jika tidak ada props data, gunakan context atau fallback
  if (!data || data.length === 0) {
    return (
      <div className="rounded-3xl border border-gray-300 bg-white p-6 shadow-lg">
        <h2 className="text-lg font-semibold text-gray-900">Perbandingan Wilayah</h2>
        <p className="mt-4 text-center text-gray-500">Tidak ada data tersedia</p>
      </div>
    )
  }

  const summary = data.reduce<
    Record<string, { areaHa: number; emissionTon: number }>
  >((acc, record) => {
    if (!acc[record.province]) {
      acc[record.province] = { areaHa: 0, emissionTon: 0 }
    }
    acc[record.province].areaHa += record.areaHa
    acc[record.province].emissionTon += record.carbonEmissionTon
    return acc
  }, {})

  const regions = Object.entries(summary)
    .sort((a, b) => b[1].emissionTon - a[1].emissionTon)
    .slice(0, 10)

  const maxEmission = Math.max(...regions.map(([, data]) => data.emissionTon), 1)

  return (
    <div className="w-full rounded-xl border border-gray-200 bg-white p-5 sm:p-6 md:p-7 shadow-sm flex flex-col h-full">
      <h2 className="text-base md:text-lg font-bold text-gray-900 mb-1">
        📍 Perbandingan Wilayah
      </h2>
      <p className="text-xs md:text-sm text-gray-500 mb-5 md:mb-6">Top 10 wilayah berdasarkan emisi</p>

      <div className="flex-1 overflow-y-auto space-y-3 md:space-y-4">
        {regions.map(([province, summaryData]) => {
          const emissionPerHa = summaryData.emissionTon / Math.max(summaryData.areaHa, 1)
          const percentage = (summaryData.emissionTon / maxEmission) * 100

          return (
            <div
              key={province}
              className="rounded-lg border border-gray-200 bg-gray-50 p-3 md:p-4 hover:bg-blue-50 transition-colors"
            >
              <div className="flex items-start justify-between gap-3 mb-2 md:mb-3">
                <p className="font-semibold text-gray-900 text-xs md:text-sm leading-tight flex-1 wrap-break-words">{province}</p>
                <span className="text-xs md:text-sm font-bold text-blue-600 whitespace-nowrap shrink-0">
                  {emissionPerHa.toFixed(1)} tCO₂/ha
                </span>
              </div>

              <div className="h-1.5 md:h-2 w-full bg-gray-300 rounded-full overflow-hidden mb-3">
                <div
                  className="bg-blue-600 h-full rounded-full transition-all"
                  style={{ width: `${percentage}%` }}
                />
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs md:text-sm">
                <div>
                  <p className="text-gray-500 text-xs md:text-sm">Luas</p>
                  <p className="font-semibold text-gray-800">
                    {(summaryData.areaHa / 1000).toFixed(1)}K ha
                  </p>
                </div>
                <div>
                  <p className="text-gray-500 text-xs md:text-sm">Emisi</p>
                  <p className="font-semibold text-gray-800">
                    {(summaryData.emissionTon / 1000000).toFixed(1)}M ton
                  </p>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
