'use client'

import { useStatsOverview } from '@/hooks/useStatsOverview'

export function StatsOverview() {
    const { stats, loading } = useStatsOverview()

    return (
        <>
            {stats.map((stat, idx) => (
                <article
                    key={idx}
                    className={`rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_10px_30px_rgba(15,23,42,0.06)] transition hover:shadow-md ${loading ? 'opacity-60' : ''}`}
                >
                    <div className={`inline-flex rounded-lg border border-slate-200 bg-slate-50 p-3 mb-4`}>
                        <div className={`h-6 w-6 rounded ${stat.accentColor} opacity-40`} />
                    </div>
                    <p className="text-sm font-semibold uppercase tracking-[0.22em] text-slate-500">{stat.label}</p>
                    <p className={`mt-3 text-4xl font-bold ${stat.accentColor}`}>
                        {loading ? '...' : stat.value}
                    </p>
                    <p className={`mt-2 text-sm font-medium ${stat.trendColor}`}>{stat.trend}</p>
                </article>
            ))}
        </>
    )
}
