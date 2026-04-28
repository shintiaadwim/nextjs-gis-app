import { SidebarLayout } from '@/components/layout/SidebarLayout'
import { AppSidebar } from '@/components/sections/Sidebar'
import type { PropsWithChildren } from 'react'

export function AppShell({ children }: PropsWithChildren) {
    return <SidebarLayout sidebar={<AppSidebar />}>{children}</SidebarLayout>
}
