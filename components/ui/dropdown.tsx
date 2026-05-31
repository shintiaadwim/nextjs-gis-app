import clsx from 'clsx'
import Link from 'next/link'
import type { ElementType, HTMLAttributes, PropsWithChildren } from 'react'

type DropdownProps = PropsWithChildren<{ className?: string }>

type DropdownButtonProps = PropsWithChildren<{
    as?: ElementType
    className?: string
}> & Record<string, unknown>

type DropdownMenuProps = PropsWithChildren<
    {
        className?: string
        anchor?: string
    } & HTMLAttributes<HTMLDivElement>
>

type DropdownItemProps = PropsWithChildren<{
    href?: string
    className?: string
}> & Record<string, unknown>

const dropdownItemClassName = 'flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-[var(--foreground)] hover:bg-[rgba(255,255,255,0.03)]'

function isInternalHref(href: string) {
    return href.startsWith('/')
}

function getMenuPositionClassName(anchor?: string) {
    const isTop = anchor?.includes('top')
    const isStart = anchor?.includes('start')

    if (isTop && isStart) {
        return 'bottom-full left-0 mb-2'
    }

    if (isTop) {
        return 'bottom-full right-0 mb-2'
    }

    if (isStart) {
        return 'left-0 mt-2'
    }

    return 'right-0 mt-2'
}

export function Dropdown({ children, className }: DropdownProps) {
    return <div className={clsx('group/dropdown relative inline-block text-left', className)}>{children}</div>
}

export function DropdownButton({ children, as: As = 'button', className, ...props }: DropdownButtonProps) {
    return (
        <As className={clsx('inline-flex w-full items-center gap-2', className)} {...props}>
            {children}
        </As>
    )
}

export function DropdownMenu({ children, className, anchor, ...props }: DropdownMenuProps) {
    const positionClassName = getMenuPositionClassName(anchor)

    return (
        <div
            className={clsx(
                'invisible absolute z-50 rounded-xl border border-[var(--border-gray)] bg-[rgba(255,255,255,0.02)] p-1 opacity-0 shadow-lg transition group-focus-within/dropdown:visible group-focus-within/dropdown:opacity-100 group-hover/dropdown:visible group-hover/dropdown:opacity-100',
                positionClassName,
                className,
            )}
            {...props}
        >
            {children}
        </div>
    )
}

export function DropdownItem({ children, className, href, ...props }: DropdownItemProps) {
    if (href) {
        if (isInternalHref(href)) {
            return (
                <Link href={href} className={clsx(dropdownItemClassName, className)} {...props}>
                    {children}
                </Link>
            )
        }

        return (
            <a
                href={href}
                className={clsx(dropdownItemClassName, className)}
                {...props}
            >
                {children}
            </a>
        )
    }

    return (
        <button
            type="button"
            className={clsx(dropdownItemClassName, className)}
            {...props}
        >
            {children}
        </button>
    )
}

export function DropdownDivider() {
    return <div className="my-1 h-px bg-[var(--border-gray)]" />
}

export function DropdownLabel({ children }: PropsWithChildren) {
    return <span>{children}</span>
}
