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
            className={`group relative overflow-hidden rounded-3xl border border-gray-300 p-6 shadow-lg shadow-gray-200 hover-lift transition-all hover:shadow-blue-200 ${accent} animate-fade-in`}
        >
            <div className="absolute inset-0 bg-linear-to-br from-blue-100/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            <div className="relative z-10">
                <div className="flex items-center justify-between mb-2">
                    <p className="text-sm uppercase tracking-[0.24em] text-gray-600 font-medium">
                        {label}
                    </p>
                    {icon && (
                        <div className="text-2xl opacity-60 group-hover:opacity-100 transition-opacity">
                            {icon}
                        </div>
                    )}
                </div>

                <p className="text-3xl font-bold text-gray-900 mb-2 group-hover:scale-105 transition-transform duration-200">
                    {value}
                </p>

                <div className={`flex items-center gap-1 text-sm ${trendColor[trend]}`}>
                    <span>{trendIcon[trend]}</span>
                    <span className="opacity-80">vs periode sebelumnya</span>
                </div>
            </div>

            {/* Decorative gradient overlay */}
            <div className="absolute -top-10 -right-10 w-20 h-20 bg-linear-to-br from-blue-300/20 to-gray-300/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </div>
    )
}
