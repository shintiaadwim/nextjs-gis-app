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
            <div className="rounded-lg bg-white border border-gray-300 p-3 shadow-lg">
                {payload.map((entry, index) => (
                    <p key={index} style={{ color: entry.color }} className="text-xs font-semibold">
                        {entry.name}: {formatNumber(entry.value)}
                    </p>
                ))}
            </div>
        )
    }
    return null
}
