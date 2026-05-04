import { AppShell } from '@/components/layout/AppShell'
import { AnalyticsPage } from '@/components/sections/analytics/AnalyticsPage'

export default function Page() {
    return (
        <AppShell>
            <div className="px-2 py-2">
                <p className="text-xs sm:text-sm font-medium uppercase tracking-wide text-cyan-400 mb-2">📊 Halaman Analisis</p>
                <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-slate-900 leading-tight mb-2 wrap-break-words">Analisis Perbandingan Wilayah dan Karbon</h1>
                <p className="text-xs sm:text-sm text-slate-600">Lihat bagaimana provinsi berbeda berkontribusi terhadap emisi karbon dari deforestasi dan bandingkan intensitas emisi per hektar.</p>
            </div>

            <AnalyticsPage />
        </AppShell>
    )
}
