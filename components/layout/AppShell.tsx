import { SidebarLayout } from '@/components/layout/SidebarLayout'
import { AppSidebar } from '@/components/sections/Sidebar'
import { CSVProvider } from '@/context/CSVContext'
import type { PropsWithChildren } from 'react'

export function AppShell({ children }: PropsWithChildren) {
    return (
        <CSVProvider>
            <SidebarLayout sidebar={<AppSidebar />}>{children}</SidebarLayout>
        </CSVProvider>
    )
}
