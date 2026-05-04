'use client'

import { useStatsOverview } from '@/hooks/useStatsOverview'

export function StatsOverview() {
    const { stats, loading } = useStatsOverview()

    return (
        <>
            {stats.map((stat, idx) => (
                <article
                    key={idx}
                    className={`rounded-2xl border border-slate-100 bg-linear-to-br ${stat.bgGradient} p-6 shadow-md transition hover:shadow-lg ${loading ? 'opacity-60' : ''}`}
                >
                    <div className={`inline-flex rounded-lg ${stat.iconBg} p-3 mb-4`}>
                        <div className={`h-6 w-6 rounded ${stat.accentColor} opacity-40`} />
                    </div>
                    <p className="text-sm font-semibold uppercase tracking-wider text-slate-500">{stat.label}</p>
                    <p className={`mt-3 text-4xl font-bold ${stat.accentColor}`}>
                        {loading ? '...' : stat.value}
                    </p>
                    <p className={`mt-2 text-sm font-medium ${stat.trendColor}`}>{stat.trend}</p>
                </article>
            ))}
        </>
    )
}
