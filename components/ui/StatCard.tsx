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
            className={`relative overflow-hidden rounded-xl border border-gray-200 p-6 md:p-7 lg:p-8 shadow-sm hover:shadow-md transition-all duration-300 bg-linear-to-br ${accent}`}
        >
            <div className="flex flex-col space-y-4">
                <div className="flex items-start justify-between">
                    <p className="text-xs md:text-sm uppercase tracking-widest text-gray-600 font-semibold leading-tight flex-1">
                        {label}
                    </p>
                    {icon && <span className="text-2xl md:text-3xl opacity-70 shrink-0">{icon}</span>}
                </div>

                <p className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 wrap-break-words">
                    {value}
                </p>

                <div className={`flex items-center gap-1 text-xs md:text-sm font-medium ${trendColor[trend]}`}>
                    <span>{trendIcon[trend]}</span>
                    <span>vs periode</span>
                </div>
            </div>
        </div>
    )
}
