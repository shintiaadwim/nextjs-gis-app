'use client'

import { useCSVContext } from '@/context/CSVContext'
import { generateYearArray, DEFAULT_REGIONS } from '@/utils/filterUtils'

export function DataFilter() {
    const { selectedYear, selectedProvince, setSelectedYear, setSelectedProvince } = useCSVContext()

    const years = generateYearArray()
    const provinces = [...DEFAULT_REGIONS]

    return (
        <article className="rounded-2xl border border-slate-200 bg-white p-8 text-slate-900 shadow-[0_10px_30px_rgba(15,23,42,0.06)]">
            <div className="space-y-2 mb-6">
                <h2 className="text-2xl font-bold">Filter Data</h2>
                <p className="text-sm text-slate-500">Pilih periode dan wilayah untuk analisis</p>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
                <label className="group">
                    <span className="block text-sm font-semibold text-slate-500 mb-2.5">Tahun</span>
                    <select
                        value={selectedYear}
                        onChange={(e) => setSelectedYear(e.target.value)}
                        className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 hover:border-slate-300"
                    >
                        {years.map((year) => (
                            <option key={year} value={year} className="text-slate-900">
                                {year === 'all' ? 'Semua Tahun' : year}
                            </option>
                        ))}
                    </select>
                </label>

                <label className="group">
                    <span className="block text-sm font-semibold text-slate-500 mb-2.5">Provinsi / Wilayah</span>
                    <select
                        value={selectedProvince}
                        onChange={(e) => setSelectedProvince(e.target.value)}
                        className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 hover:border-slate-300"
                    >
                        {provinces.map((province) => (
                            <option key={province} value={province} className="text-slate-900">
                                {province === 'all' ? 'Semua Wilayah' : province}
                            </option>
                        ))}
                    </select>
                </label>
            </div>

            <div className="mt-6 p-4 rounded-xl bg-slate-50 border border-slate-200">
                <p className="text-sm text-slate-600">
                    <span className="font-semibold">Filter Aktif:</span> {selectedYear === 'all' ? 'Semua Tahun' : `Tahun ${selectedYear}`} • {selectedProvince === 'all' ? 'Semua Wilayah' : selectedProvince}
                </p>
            </div>
        </article>
    )
}
