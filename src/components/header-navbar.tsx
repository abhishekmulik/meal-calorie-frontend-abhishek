"use client"
import React, { useState } from 'react'
import ThemeToggle from './theme-toggle'
import { Menu, } from 'lucide-react'
import Logout from './common/logout'
import Link from 'next/link'
import { CALORIE_ROUTE, DASHBOARD_ROUTE } from '@/constants'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { Guarded } from './common/guarded'
import { User } from '@/types'
import { authStore } from '@/stores/authStore'


function NavigationLinks({ userInfo }: { userInfo: User | null }) {
    const path = usePathname()
    return <>
        <Guarded permission={!!userInfo}>
            <Link href={DASHBOARD_ROUTE} className={cn('hover:text-primary', path === DASHBOARD_ROUTE && 'text-primary font-semibold')}>
                Dashboard
            </Link>
        </Guarded>
        <Guarded permission={!!userInfo}>
            <Link href={CALORIE_ROUTE} className={cn('hover:text-primary', path === CALORIE_ROUTE && 'text-primary font-semibold')}>
                Get Calories
            </Link>
        </Guarded>
    </>
}

function HeaderNavbar() {
    const [open, setOpen] = useState(false)
    const userInfo = authStore((state) => state.user)
    return (
        <header className="backdrop-blur-lg bg-background/60 shadow-b-md z-10 sticky top-0 border-b border-b-foreground min-h-[68px]">
            <div className="flex w-full items-center justify-between px-4 py-4">
                <div className="hidden md:flex text-muted-foreground items-center gap-8 font-medium">
                    <NavigationLinks userInfo={userInfo} />
                </div>
                <Guarded permission={!!userInfo}>
                <button
                    className="md:hidden"
                    onClick={() => setOpen(!open)}
                >
                    <Menu size={22} />
                </button>
                </Guarded>
                <div className="text-muted-foreground flex items-center gap-8 ml-auto">
                    <ThemeToggle />
                    <Guarded permission={!!userInfo}>
                        <Logout />
                    </Guarded>
                </div>
            </div>
            {open && (
                <div className="md:hidden flex flex-col gap-4 px-4 pb-4 text-muted-foreground font-medium">
                    <NavigationLinks userInfo={userInfo} />
                </div>
            )}
        </header>

    )
}

export default HeaderNavbar