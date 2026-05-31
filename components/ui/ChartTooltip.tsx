import { formatNumber, TooltipPayload } from '@/utils/chartUtils'

type ChartTooltipProps = {
    active?: boolean
    payload?: TooltipPayload[]
}

/**
 * Custom Tooltip untuk Chart
 * Logika tooltip sudah dipisahkan dari ChartSection component
 */
export function ChartTooltip({ active, payload }: ChartTooltipProps) {
    if (active && payload && payload.length) {
        return (
            <div className="rounded-xl border border-white/70 bg-white/75 px-3 py-2 shadow-2xl backdrop-blur-md">
                {payload.map((entry, index) => (
                    <p key={index} style={{ color: entry.color }} className="text-xs font-semibold leading-5 text-slate-900">
                        <span className="mr-1">{entry.name}:</span>
                        <span>{formatNumber(entry.value)}</span>
                    </p>
                ))}
            </div>
        )
    }
    return null
}
