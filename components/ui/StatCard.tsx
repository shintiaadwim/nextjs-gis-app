type StatCardProps = {
    label: string
    value: string
    accent?: string
    icon?: string
    trend?: 'up' | 'down' | 'neutral'
}

export default function StatCard({
    label,
    value,
    accent = 'bg-linear-to-br from-blue-50 to-gray-50',
    icon,
    trend = 'neutral',
}: StatCardProps) {
    const trendColor = {
        up: 'text-green-600',
        down: 'text-red-600',
        neutral: 'text-gray-500',
    }

    const trendIcon = {
        up: '↗',
        down: '↘',
        neutral: '→',
    }

    return (
        <div
            className={`group relative overflow-hidden rounded-xl sm:rounded-2xl border border-gray-200 p-3 sm:p-4 md:p-5 shadow-sm hover:shadow-md transition-all duration-300 bg-linear-to-br ${accent} animate-fade-in`}
        >
            <div className="absolute inset-0 bg-linear-to-br from-white/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            <div className="relative z-10 space-y-2 sm:space-y-3">
                <div className="flex items-start justify-between gap-2">
                    <p className="text-xs sm:text-sm uppercase tracking-widest text-gray-600 font-bold leading-tight">
                        {label}
                    </p>
                    {icon && (
                        <div className="text-lg sm:text-xl opacity-70 group-hover:opacity-100 transition-opacity shrink-0">
                            {icon}
                        </div>
                    )}
                </div>

                <p className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 wrap-break-words">
                    {value}
                </p>

                <div className={`flex items-center gap-1 text-xs font-medium ${trendColor[trend]}`}>
                    <span>{trendIcon[trend]}</span>
                    <span className="opacity-75 hidden sm:inline">vs periode</span>
                    <span className="opacity-75 sm:hidden">periode</span>
                </div>
            </div>

            {/* Decorative gradient */}
            <div className="absolute -top-6 -right-6 sm:-top-8 sm:-right-8 w-12 h-12 sm:w-16 sm:h-16 bg-linear-to-br from-white/30 to-transparent rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </div>
    )
}
