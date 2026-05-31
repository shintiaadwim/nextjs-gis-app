'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'

const NAV_ITEMS = [
    { id: 'landing', label: 'Landing', number: '01' },
    { id: 'analytics', label: 'Analitik', number: '02' },
    { id: 'statistics', label: 'Statistik', number: '03' },
    { id: 'dashboard', label: 'Dashboard', number: '04' },
] as const

export function PersistentSideNav() {
    const [activeId, setActiveId] = useState('analytics')
    const isDarkSection = activeId === 'analytics' || activeId === 'dashboard'
    const asideClassName = isDarkSection
        ? 'fixed left-3 top-[16vh] z-40 hidden h-[68vh] w-44 lg:block'
        : 'fixed left-3 top-[16vh] z-40 hidden h-[68vh] w-44 lg:block'
    const panelClassName = isDarkSection
        ? 'bg-slate-950/85 text-white/40 backdrop-blur-xl'
        : 'bg-white/90 text-slate-500 backdrop-blur-xl'
    const activeNumberClassName = isDarkSection ? 'text-cyan-300/90' : 'text-cyan-700'
    const activeLabelClassName = isDarkSection ? 'text-slate-100/95' : 'text-slate-900'
    const passiveNumberClassName = isDarkSection ? 'text-slate-700/40' : 'text-slate-400'
    const passiveLabelClassName = isDarkSection ? 'text-slate-500/35' : 'text-slate-500'
    const activeLinkClassName = isDarkSection
        ? 'text-slate-100 opacity-100 font-semibold'
        : 'text-slate-900 opacity-100 font-semibold'
    const passiveLinkClassName = isDarkSection
        ? 'text-slate-600 opacity-30 hover:opacity-60 hover:text-slate-500'
        : 'text-slate-500 opacity-50 hover:opacity-80 hover:text-slate-700'

    useEffect(() => {
        const sections = NAV_ITEMS
            .map((item) => document.getElementById(item.id))
            .filter((section): section is HTMLElement => Boolean(section))

        if (!sections.length) return undefined

        const updateActiveSection = () => {
            const probeLine = window.scrollY + window.innerHeight * 0.35

            let currentSection = sections[0]

            for (const section of sections) {
                if (section.offsetTop <= probeLine) {
                    currentSection = section
                }
            }

            setActiveId(currentSection.id)
        }

        updateActiveSection()
        window.addEventListener('scroll', updateActiveSection, { passive: true })
        window.addEventListener('resize', updateActiveSection)

        return () => {
            window.removeEventListener('scroll', updateActiveSection)
            window.removeEventListener('resize', updateActiveSection)
        }
    }, [])

    return (
        <aside className={asideClassName}>
            <div className="flex h-full items-center">
                <nav className={`flex h-full w-full flex-col justify-center px-2 transition-colors duration-300 ${panelClassName}`}>
                    <div className="space-y-2">
                        {NAV_ITEMS.map((item) => {
                            const active = item.id === activeId

                            return (
                                <Link
                                    key={item.id}
                                    href={`#${item.id}`}
                                    className={`flex items-center gap-2 py-0.5 pl-2.5 pr-1 transition ${active
                                        ? activeLinkClassName
                                        : passiveLinkClassName
                                        }`}
                                >
                                    <span className={`min-w-7 text-[9px] font-medium tracking-[0.3em] ${active ? activeNumberClassName : passiveNumberClassName}`}>
                                        {item.number}
                                    </span>
                                    <span className={`text-[11px] font-semibold uppercase tracking-[0.22em] ${active ? activeLabelClassName : passiveLabelClassName}`}>
                                        {item.label}
                                    </span>
                                </Link>
                            )
                        })}
                    </div>
                </nav>
            </div>
        </aside>
    )
}