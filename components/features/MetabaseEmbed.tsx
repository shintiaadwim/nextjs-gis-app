'use client'

import { getMetabasePublicUrl } from '@/lib/metabase'

interface MetabaseEmbedProps {
  dashboardId?: string
  className?: string
}

export function MetabaseEmbed({
  dashboardId = '2',
  className = '',
}: MetabaseEmbedProps) {
  const url = getMetabasePublicUrl('dashboard', dashboardId)

  if (!url) {
    return (
      <div className="rounded-lg border border-red-200 bg-red-50 p-6 text-center">
        <p className="text-red-600 text-sm">Metabase URL not configured</p>
      </div>
    )
  }

  return (
    <div className={`relative w-full overflow-hidden rounded-lg ${className}`}>
      <iframe
        src={url}
        className="w-full border-0"
        style={{ aspectRatio: '16/10' }}
      />
    </div>
  )
}
