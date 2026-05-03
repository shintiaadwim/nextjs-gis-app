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
    <div className="rounded-3xl border border-gray-300 bg-white p-6 shadow-lg">
      <h2 className="text-lg font-semibold text-gray-900 mb-2">
        📍 Perbandingan Wilayah
      </h2>
      <p className="text-xs text-gray-500 mb-6">Top 10 wilayah berdasarkan emisi</p>

      <div className="mt-6 space-y-4 max-h-96 overflow-y-auto">
        {regions.map(([province, summaryData]) => {
          const emissionPerHa = summaryData.emissionTon / Math.max(summaryData.areaHa, 1)
          const percentage = (summaryData.emissionTon / maxEmission) * 100

          return (
            <div
              key={province}
              className="rounded-2xl border border-gray-200 bg-gray-50 p-4 hover:bg-blue-50 transition-colors"
            >
              <div className="flex items-center justify-between gap-4 mb-2">
                <p className="font-semibold text-gray-900 text-sm">{province}</p>
                <span className="text-xs font-bold text-blue-600">
                  {emissionPerHa.toFixed(1)} tCO₂/ha
                </span>
              </div>

              {/* Progress bar */}
              <div className="mb-3 h-2 w-full bg-gray-300 rounded-full overflow-hidden">
                <div
                  className="bg-linear-to-r from-blue-600 to-blue-400 h-full rounded-full transition-all"
                  style={{ width: `${percentage}%` }}
                />
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs text-gray-600 sm:grid-cols-3">
                <div>
                  <p className="text-gray-500">Luas</p>
                  <p className="font-semibold text-gray-800">
                    {(summaryData.areaHa / 1000).toFixed(1)}K ha
                  </p>
                </div>
                <div>
                  <p className="text-gray-500">Emisi</p>
                  <p className="font-semibold text-gray-800">
                    {(summaryData.emissionTon / 1000000).toFixed(1)}M ton
                  </p>
                </div>
                <div className="hidden sm:block">
                  <p className="text-gray-500">Intensitas</p>
                  <p className="font-semibold text-blue-600">
                    {emissionPerHa.toFixed(1)}
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
