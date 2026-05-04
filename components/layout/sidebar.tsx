import clsx from 'clsx'
import Link from 'next/link'
import type { AnchorHTMLAttributes, HTMLAttributes, PropsWithChildren } from 'react'

type ClassNameProps = PropsWithChildren<{ className?: string }>
type SidebarItemProps = PropsWithChildren<AnchorHTMLAttributes<HTMLAnchorElement>>
type SidebarBodyProps = PropsWithChildren<HTMLAttributes<HTMLDivElement>>

function isInternalHref(href: string) {
    return href.startsWith('/')
}

export function Sidebar({ children, className }: ClassNameProps) {
    return (
        <aside
            className={clsx(
                'fixed top-0 left-0 h-screen w-56 flex flex-col border-r border-zinc-200 bg-white overflow-y-auto',
                className
            )}
        >
            {children}
        </aside>
    )
}

export function SidebarHeader({ children, className }: ClassNameProps) {
    return <div className={clsx('border-b border-zinc-200 p-3', className)}>{children}</div>
}

export function SidebarBody({ children, className, ...props }: SidebarBodyProps) {
    return (
        <div
            className={clsx(
                'flex min-h-0 flex-1 flex-col overflow-y-auto p-3',
                className
            )}
            {...props}
        >
            {children}
        </div>
    )
}

export function SidebarFooter({ children, className }: ClassNameProps) {
    return <div className={clsx('mt-auto border-t border-zinc-200 p-3', className)}>{children}</div>
}

export function SidebarSection({ children, className }: ClassNameProps) {
    return <section className={clsx('mb-4 flex flex-col gap-1', className)}>{children}</section>
}

export function SidebarItem({ children, className, ...props }: SidebarItemProps) {
    const { href, ...restProps } = props

    const itemClassName = clsx(
        'flex items-center gap-2 rounded-lg px-2 py-2 text-sm text-zinc-700 transition hover:bg-zinc-100',
        className
    )

    if (typeof href === 'string' && isInternalHref(href)) {
        return (
            <Link href={href} className={itemClassName} {...restProps}>
                {children}
            </Link>
        )
    }

    return (
        <a href={href} className={itemClassName} {...restProps}>
            {children}
        </a>
    )
}

export function SidebarLabel({ children, className }: ClassNameProps) {
    return <span className={clsx('truncate', className)}>{children}</span>
}