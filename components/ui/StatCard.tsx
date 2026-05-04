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
            className={`relative overflow-hidden rounded-xl border border-gray-200 p-4 md:p-5 shadow-sm hover:shadow-md transition-all duration-300 bg-linear-to-br ${accent}`}
        >
            <div className="flex flex-col space-y-4">
                <div className="flex items-start justify-between">
                    <p className="text-xs uppercase tracking-widest text-gray-600 font-semibold leading-tight flex-1">
                        {label}
                    </p>
                    {icon && <span className="text-xl md:text-2xl opacity-70 shrink-0">{icon}</span>}
                </div>

                <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 wrap-break-words">
                    {value}
                </p>

                <div className={`flex items-center gap-1 text-xs font-medium ${trendColor[trend]}`}>
                    <span>{trendIcon[trend]}</span>
                    <span>vs periode</span>
                </div>
            </div>
        </div>
    )
}
