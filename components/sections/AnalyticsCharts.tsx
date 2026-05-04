'use client'

import { useCSVContext } from '@/context/CSVContext'

export function AnalyticsCharts() {
    const { carbonData, loading, getFilteredData } = useCSVContext()
    const filteredCarbonData = getFilteredData(carbonData)

    const getTrendData = () => {
        if (!filteredCarbonData.length) return [30, 52, 38, 64, 45, 72]

        const row = filteredCarbonData[0]
        const values = []
        for (let i = 0; i < 24; i++) {
            const key = `Gross Emissions ${String(i).padStart(2, '0')}2 MgCO2e`
            const val = row[key]
            if (val) {
                const numVal = typeof val === 'string' ? parseFloat(val) : val
                values.push(Math.min(100, Math.max(10, (numVal / 1e9) * 100)))
            }
        }
        return values.length > 0 ? values : [30, 52, 38, 64, 45, 72]
    }

    return (
        <section className="grid gap-4 xl:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)_minmax(0,1fr)]">
            <article className="min-h-72 rounded-2xl border border-slate-100 bg-white p-6 shadow-md">
                <h2 className="text-lg font-semibold text-sky-500">Tren Deforestasi per Tahun</h2>
                <div className={`mt-6 flex h-52 items-end gap-3 rounded-2xl bg-slate-50 p-4 ${loading ? 'opacity-50' : ''}`}>
                    {getTrendData().map((height, index) => (
                        <div
                            key={index}
                            className="flex-1 rounded-t-2xl bg-linear-to-t from-sky-500 to-cyan-400 transition hover:from-sky-600 hover:to-cyan-500"
                            style={{ height: `${height}%` }}
                            title={`${height.toFixed(0)}%`}
                        />
                    ))}
                </div>
                <p className="mt-4 text-xs text-slate-500">
                    {loading ? 'Memuat data...' : `Data dari ${filteredCarbonData.length} baris`}
                </p>
            </article>

            <article className="min-h-72 rounded-2xl border border-slate-100 bg-white p-6 shadow-md">
                <h2 className="text-lg font-semibold text-sky-500">Komposisi Emisi per Wilayah</h2>
                <div className={`mt-6 flex items-center justify-center ${loading ? 'opacity-50' : ''}`}>
                    <div className="relative h-52 w-52 rounded-full bg-[conic-gradient(from_180deg,_#38bdf8_0_28%,_#2563eb_28%_52%,_#0f172a_52%_76%,_#94a3b8_76%_100%)] shadow-lg">
                        <div className="absolute inset-5.5 rounded-full bg-white flex items-center justify-center">
                            <span className="text-xs font-semibold text-slate-600">Komposisi</span>
                        </div>
                    </div>
                </div>
                <p className="mt-4 text-xs text-slate-500">
                    {loading ? 'Memuat data...' : 'Distribusi emisi antar wilayah'}
                </p>
            </article>

            <article className="min-h-72 rounded-2xl border border-slate-100 bg-white p-6 shadow-md">
                <h2 className="text-lg font-semibold text-sky-500">Rangkuman Sistem Perhitungan</h2>
                <p className="mt-4 text-sm leading-7 text-slate-600">
                    Estimasi berbasis luas deforestasi dikalikan faktor emisi standar. Hasil ringkasan membantu melihat dampak tiap wilayah dan memudahkan perbandingan antar periode.
                </p>

                <div className="mt-6 space-y-3">
                    {[
                        'Deforestasi dihitung dari selisih luas tutupan hutan',
                        'Emisi dikalkulasi menggunakan faktor CO₂ standar',
                        'Hasil dapat difilter berdasarkan tahun dan wilayah',
                    ].map((item) => (
                        <div
                            key={item}
                            className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700"
                        >
                            {item}
                        </div>
                    ))}
                </div>

                <p className="mt-4 text-xs text-slate-500">
                    {loading ? 'Memuat data...' : `Periode filter: ${filteredCarbonData.length > 0 ? 'Aktif' : 'Tidak ada data'}`}
                </p>
            </article>
        </section>
    )
}
