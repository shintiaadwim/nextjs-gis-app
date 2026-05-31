import Link from 'next/link'
import { HomePage } from '@/components/sections/HomePage'
import { AnalyticsPage } from '@/components/sections/analytics/AnalyticsPage'
import { StatisticsContent } from '@/components/sections/statistics/StatisticsPage'
import { MetabaseEmbed } from '@/components/features/MetabaseEmbed'
import { PersistentSideNav } from '@/components/layout/PersistentSideNav'

const DASHBOARD_IDS = [
    'b77a7d40-2597-4961-abef-d178eddb3a7f',
    'a83c6f2c-62a4-4834-bcc6-2b94e0e0e51b',
    'a1de201c-3144-47d5-a403-76b26ecf1f1e',
]

export function UnifiedExperience() {
    return (
        <main className="bg-[#f8fafc] text-slate-900 lg:pl-64">
            <PersistentSideNav />

            <section id="landing" className="scroll-mt-28 bg-white">
                <HomePage />
            </section>

            <section id="analytics" className="scroll-mt-28 border-t border-slate-900/10 bg-slate-950 text-white">
                <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
                    <div className="mb-10 max-w-3xl space-y-3">
                        <p className="text-xs sm:text-sm font-semibold uppercase tracking-[0.3em] text-cyan-400">
                            Analitik
                        </p>
                        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
                            Analisis Perbandingan Wilayah dan Karbon
                        </h2>
                        <p className="text-sm sm:text-base text-slate-300">
                            Lihat tren, perbandingan provinsi, dan kontribusi emisi karbon dari deforestasi dalam satu alur yang nyambung dengan landing page.
                        </p>
                    </div>

                    <AnalyticsPage />
                </div>
            </section>

            <section id="statistics" className="scroll-mt-28 border-t border-slate-200 bg-slate-50">
                <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8 lg:py-16">
                    <div className="mb-10 max-w-3xl space-y-3">
                        <p className="text-xs sm:text-sm font-semibold uppercase tracking-[0.25em] text-cyan-700">
                            Statistik
                        </p>
                        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
                            Ringkasan Statistik dan Pemetaan Deforestasi
                        </h2>
                        <p className="text-sm sm:text-base text-slate-600">
                            Statistik, filter data, peta, dan ringkasan emisi ditampilkan berurutan di bawah analitik.
                        </p>
                    </div>

                    <StatisticsContent />
                </div>
            </section>

            <section id="dashboard" className="scroll-mt-28 border-t border-slate-900/10 bg-slate-950 text-white">
                <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8 lg:py-16">
                    <div className="mb-10 max-w-3xl space-y-3">
                        <p className="text-xs sm:text-sm font-semibold uppercase tracking-[0.3em] text-cyan-400">
                            Dashboard
                        </p>
                        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
                            Dashboard Metabase
                        </h2>
                        <p className="text-sm sm:text-base text-slate-300">
                            Bagian ini sudah dipersiapkan untuk embedding Metabase. Jika URL publik tersedia, dashboard akan tampil di sini.
                        </p>
                    </div>

                    <div className="grid gap-6 xl:grid-cols-3">
                        {DASHBOARD_IDS.map((dashboardId) => (
                            <MetabaseEmbed key={dashboardId} dashboardId={dashboardId} className="bg-white shadow-sm ring-1 ring-slate-200" />
                        ))}
                    </div>
                </div>
            </section>
        </main>
    )
}