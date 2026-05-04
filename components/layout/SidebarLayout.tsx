"use client"

import clsx from 'clsx'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { useEffect, useState, ReactNode } from 'react'

export function SidebarLayout({ sidebar, children }: { sidebar: ReactNode; children: ReactNode }) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false)

    useEffect(() => {
        if (!isSidebarOpen) return

        const originalOverflow = document.body.style.overflow
        document.body.style.overflow = 'hidden'

        return () => {
            document.body.style.overflow = originalOverflow
        }
    }, [isSidebarOpen])

    return (
        <div className="min-h-screen bg-white text-zinc-900 md:flex overflow-x-hidden">

            {/* MOBILE HEADER */}
            <div className="sticky top-0 z-30 flex items-center justify-between border-b bg-white px-4 py-3 md:hidden">
                <p className="text-sm font-semibold">Dashboard</p>
                <button onClick={() => setIsSidebarOpen(true)}>
                    <Bars3Icon className="size-6" />
                </button>
            </div>

            {/* OVERLAY */}
            <div
                className={clsx(
                    'fixed inset-0 z-40 bg-black/30 md:hidden',
                    isSidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
                )}
                onClick={() => setIsSidebarOpen(false)}
            />

            {/* SIDEBAR */}
            <div
                className={clsx(
                    'fixed inset-y-0 left-0 z-50 w-56 transition-transform md:fixed md:inset-y-0 md:left-0 md:translate-x-0',
                    isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
                )}
            >
                <button
                    onClick={() => setIsSidebarOpen(false)}
                    className="absolute top-2 right-2 md:hidden"
                >
                    <XMarkIcon className="size-5" />
                </button>

                <div className="h-full overflow-y-auto bg-white">
                    {sidebar}
                </div>
            </div>

            {/* MAIN CONTENT */}
            <main className="flex-1 min-w-0 overflow-x-hidden px-4 sm:px-6 md:px-8 md:ml-56 py-6">
                {children}
            </main>
        </div>
    )
}