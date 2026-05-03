"use client"

import { Avatar } from '@/components/ui/avatar'
import {
    Dropdown,
    DropdownButton,
    DropdownDivider,
    DropdownItem,
    DropdownLabel,
    DropdownMenu,
} from '@/components/ui/dropdown'
import {
    Sidebar,
    SidebarBody,
    SidebarFooter,
    SidebarHeader,
    SidebarItem,
    SidebarLabel,
    SidebarSection,
} from '@/components/layout/sidebar'
import { mainNavigation, profileMenu } from '@/data/sidebar'
import clsx from 'clsx'
import { usePathname } from 'next/navigation'
import {
    ChevronUpIcon,
} from '@heroicons/react/16/solid'

export function AppSidebar() {
    const pathname = usePathname()

    return (
        <Sidebar>
            <SidebarHeader>
                <span className="block truncate text-xs/5 font-normal text-zinc-500">erica@example.com</span>
            </SidebarHeader>

            <SidebarBody>
                <SidebarSection>
                    {mainNavigation.map(({ href, label, icon: Icon }) => {
                        const isActive = href === '/' ? pathname === '/' : pathname.startsWith(href)

                        return (
                            <SidebarItem
                                key={href}
                                href={href}
                                className={clsx(
                                    'transition-all duration-200 ease-out md:max-lg:justify-center md:max-lg:px-0',
                                    isActive && 'bg-zinc-100 font-medium text-zinc-950 shadow-sm'
                                )}
                                title={label}
                                aria-current={isActive ? 'page' : undefined}
                            >
                                <Icon className="size-5" />
                                <SidebarLabel className="md:max-lg:hidden">{label}</SidebarLabel>
                            </SidebarItem>
                        )
                    })}
                </SidebarSection>
            </SidebarBody>

            <SidebarFooter>
                <Dropdown>
                    <DropdownButton as={SidebarItem} href="#" className="md:max-lg:justify-center md:max-lg:px-0">
                        <span className="flex min-w-0 items-center gap-3">
                            <Avatar src="https://i.pravatar.cc/150?u=erica@example.com" className="size-10" square alt="" />
                            <span className="min-w-0 md:max-lg:hidden">
                                <span className="block truncate text-sm/5 font-medium text-zinc-950">Erica</span>
                                <span className="block truncate text-xs/5 font-normal text-zinc-500">erica@example.com</span>
                            </span>
                        </span>
                        <ChevronUpIcon className="ml-auto size-4 md:max-lg:hidden" />
                    </DropdownButton>
                    <DropdownMenu className="min-w-64" anchor="top start">
                        {profileMenu.slice(0, 2).map(({ href, label, icon: Icon }) => (
                            <DropdownItem key={href} href={href}>
                                <Icon className="size-4" />
                                <DropdownLabel>{label}</DropdownLabel>
                            </DropdownItem>
                        ))}
                        <DropdownDivider />
                        {profileMenu.slice(2).map(({ href, label, icon: Icon }) => (
                            <DropdownItem key={href} href={href}>
                                <Icon className="size-4" />
                                <DropdownLabel>{label}</DropdownLabel>
                            </DropdownItem>
                        ))}
                    </DropdownMenu>
                </Dropdown>
            </SidebarFooter>
        </Sidebar>
    )
}
