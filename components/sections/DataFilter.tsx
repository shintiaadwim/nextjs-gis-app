'use client'

import { useCSVContext } from '@/context/CSVContext'
import { generateYearArray, DEFAULT_REGIONS } from '@/utils/filterUtils'

export function DataFilter() {
    const { selectedYear, selectedProvince, setSelectedYear, setSelectedProvince } = useCSVContext()

    const years = generateYearArray()
    const provinces = [...DEFAULT_REGIONS]

    return (
        <article className="rounded-2xl border border-slate-100 bg-linear-to-br from-slate-900 via-slate-800 to-slate-950 p-8 text-white shadow-xl">
            <div className="space-y-2 mb-6">
                <h2 className="text-2xl font-bold">Filter Data</h2>
                <p className="text-sm text-slate-400">Pilih periode dan wilayah untuk analisis</p>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
                <label className="group">
                    <span className="block text-sm font-semibold text-slate-300 mb-2.5">Tahun</span>
                    <select
                        value={selectedYear}
                        onChange={(e) => setSelectedYear(e.target.value)}
                        className="w-full rounded-xl border-2 border-slate-600 bg-slate-700/50 px-4 py-3 text-white placeholder-slate-400 outline-none transition focus:border-cyan-400 focus:bg-slate-700 focus:ring-2 focus:ring-cyan-400/20 hover:border-slate-500"
                    >
                        {years.map((year) => (
                            <option key={year} value={year} className="text-slate-900">
                                {year === 'all' ? 'Semua Tahun' : year}
                            </option>
                        ))}
                    </select>
                </label>

                <label className="group">
                    <span className="block text-sm font-semibold text-slate-300 mb-2.5">Provinsi / Wilayah</span>
                    <select
                        value={selectedProvince}
                        onChange={(e) => setSelectedProvince(e.target.value)}
                        className="w-full rounded-xl border-2 border-slate-600 bg-slate-700/50 px-4 py-3 text-white placeholder-slate-400 outline-none transition focus:border-cyan-400 focus:bg-slate-700 focus:ring-2 focus:ring-cyan-400/20 hover:border-slate-500"
                    >
                        {provinces.map((province) => (
                            <option key={province} value={province} className="text-slate-900">
                                {province === 'all' ? 'Semua Wilayah' : province}
                            </option>
                        ))}
                    </select>
                </label>
            </div>

            <div className="mt-6 p-4 rounded-lg bg-slate-700/30 border border-slate-600">
                <p className="text-sm text-slate-300">
                    <span className="font-semibold">Filter Aktif:</span> {selectedYear === 'all' ? 'Semua Tahun' : `Tahun ${selectedYear}`} • {selectedProvince === 'all' ? 'Semua Wilayah' : selectedProvince}
                </p>
            </div>
        </article>
    )
}
