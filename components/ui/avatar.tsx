import clsx from 'clsx'
import Image from 'next/image'

type AvatarProps = {
    src?: string
    initials?: string
    square?: boolean
    className?: string
    alt?: string
    slot?: string
}

export function Avatar({ src, initials, square = false, className, alt = '', slot }: AvatarProps) {
    const baseClassName = clsx(
        'inline-flex shrink-0 items-center justify-center overflow-hidden text-xs font-semibold',
        'bg-[rgba(255,255,255,0.03)] text-[var(--foreground)]',
        square ? 'rounded-lg' : 'rounded-full',
        slot === 'icon' ? 'size-6' : 'size-8',
        className,
    )

    if (src) {
        return <Image src={src} alt={alt} width={40} height={40} className={baseClassName} />
    }

    return <span className={baseClassName}>{initials ?? '?'}</span>
}
