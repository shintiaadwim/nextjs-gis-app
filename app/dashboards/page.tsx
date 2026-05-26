import { AppShell } from '@/components/layout/AppShell'
import { MetabaseEmbed } from '@/components/features/MetabaseEmbed'

export default function DashboardsPage() {
  return (
    <AppShell>
      <div className="px-2 py-2">
        <p className="text-xs sm:text-sm font-medium uppercase tracking-wide text-cyan-400 mb-2">
          📊 Metabase Dashboard
        </p>
        <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-slate-900 leading-tight mb-2">
          Dashboard Interaktif
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 mb-6">
          Visualisasi dan analisis data interaktif menggunakan Metabase.
        </p>

        <MetabaseEmbed dashboardId="b77a7d40-2597-4961-abef-d178eddb3a7f" />

        <MetabaseEmbed dashboardId="a83c6f2c-62a4-4834-bcc6-2b94e0e0e51b" />

        <MetabaseEmbed dashboardId="a1de201c-3144-47d5-a403-76b26ecf1f1e" />
      </div>
    </AppShell>
  )
}
