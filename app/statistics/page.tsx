import { AppShell } from '@/components/layout/AppShell'
import { StatisticsContent } from '@/components/sections/statistics/StatisticsPage'

export default function StatisticsPage() {
    return (
        <AppShell>
            <div className="px-2 py-2">
                <p className="text-xs sm:text-sm font-medium uppercase tracking-wide text-cyan-400 mb-2">📊 Statistik Deforestasi</p>
                <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-slate-900 leading-tight mb-2 wrap-break-words">Analisis Statistik Komprehensif</h1>
                <p className="text-xs sm:text-sm text-slate-600">Data statistik mendalam tentang deforestasi, emisi karbon, dan dampak lingkungan di seluruh Indonesia.</p>
            </div>

            <StatisticsContent />
        </AppShell>
    )
}
