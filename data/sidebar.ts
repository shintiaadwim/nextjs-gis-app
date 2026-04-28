import type { ComponentType, SVGProps } from 'react'
import {
    ArrowRightStartOnRectangleIcon,
    Cog8ToothIcon,
    LightBulbIcon,
    PlusIcon,
    ShieldCheckIcon,
    UserIcon,
} from '@heroicons/react/16/solid'
import {
    Cog6ToothIcon,
    HomeIcon,
    MegaphoneIcon,
    Square2StackIcon,
    TicketIcon,
} from '@heroicons/react/20/solid'

export type SidebarIcon = ComponentType<SVGProps<SVGSVGElement>>

export type SidebarNavItem = {
    href: string
    label: string
    icon: SidebarIcon
}

export type SidebarMenuItem = {
    href: string
    label: string
    icon: SidebarIcon
}

export const mainNavigation: SidebarNavItem[] = [
    { href: '/', label: 'Dashboard', icon: HomeIcon },
    { href: '/events', label: 'Events', icon: Square2StackIcon },
    { href: '/orders', label: 'Orders', icon: TicketIcon },
    { href: '/settings', label: 'Settings', icon: Cog6ToothIcon },
    { href: '/broadcasts', label: 'Broadcasts', icon: MegaphoneIcon },
]

export const teamMenu: SidebarMenuItem[] = [
    { href: '/teams/1/settings', label: 'Settings', icon: Cog8ToothIcon },
    { href: '/teams/create', label: 'New team...', icon: PlusIcon },
]

export const profileMenu: SidebarMenuItem[] = [
    { href: '/my-profile', label: 'My profile', icon: UserIcon },
    { href: '/settings', label: 'Settings', icon: Cog8ToothIcon },
    { href: '/privacy-policy', label: 'Privacy policy', icon: ShieldCheckIcon },
    { href: '/share-feedback', label: 'Share feedback', icon: LightBulbIcon },
    { href: '/logout', label: 'Sign out', icon: ArrowRightStartOnRectangleIcon },
]
