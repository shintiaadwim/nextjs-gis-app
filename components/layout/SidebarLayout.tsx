"use client"

import clsx from 'clsx'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import type { PropsWithChildren, ReactNode } from 'react'
import { useEffect, useState } from 'react'

type SidebarLayoutProps = PropsWithChildren<{
    sidebar: ReactNode
}>

export function SidebarLayout({ sidebar, children }: SidebarLayoutProps) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false)

    useEffect(() => {
        if (!isSidebarOpen) {
            return
        }

        const { body } = document
        const originalOverflow = body.style.overflow
        body.style.overflow = 'hidden'

        return () => {
            body.style.overflow = originalOverflow
        }
    }, [isSidebarOpen])

    return (
        <div className="min-h-dvh bg-zinc-50 text-zinc-900">
            <div className="sticky top-0 z-30 flex items-center justify-between border-b border-zinc-200 bg-white px-4 py-3 md:hidden">
                <p className="text-sm font-semibold text-zinc-900">Dashboard</p>
                <button
                    type="button"
                    onClick={() => setIsSidebarOpen(true)}
                    className="rounded-lg p-2 text-zinc-600 transition hover:bg-zinc-100 hover:text-zinc-900"
                    aria-label="Open sidebar"
                >
                    <Bars3Icon className="size-6" />
                </button>
            </div>

            <div className="relative flex min-h-dvh">
                <div
                    className={clsx(
                        'fixed inset-0 z-40 bg-black/30 transition-opacity duration-200 md:hidden',
                        isSidebarOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
                    )}
                    onClick={() => setIsSidebarOpen(false)}
                />

                <div
                    className={clsx(
                        'fixed inset-y-0 left-0 z-50 w-72 max-w-[85vw] transition-transform duration-200 md:static md:z-0 md:w-20 md:max-w-none md:translate-x-0 lg:w-72',
                        isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
                    )}
                >
                    <button
                        type="button"
                        onClick={() => setIsSidebarOpen(false)}
                        className="absolute right-2 top-2 z-10 rounded-md p-2 text-zinc-600 transition hover:bg-zinc-100 hover:text-zinc-900 md:hidden"
                        aria-label="Close sidebar"
                    >
                        <XMarkIcon className="size-5" />
                    </button>

                    <div
                        onClick={(event) => {
                            const target = event.target as HTMLElement
                            if (target.closest('a')) {
                                setIsSidebarOpen(false)
                            }
                        }}
                        className="h-full"
                    >
                        {sidebar}
                    </div>
                </div>

                <main className="min-w-0 flex-1 px-4 py-4 sm:px-6 sm:py-6 xl:px-8 xl:py-8">{children}</main>
            </div>
        </div>
    )
}