"use client"

import { UserButton } from '@clerk/nextjs'
import { LayoutGrid, PiggyBank, ReceiptText, ShieldCheck } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect } from 'react'

export default function SideNav() {
    const menuList = [
        {
            id: 1,
            name: "Dashboard",
            href: "/dashboard",
            icon: LayoutGrid,
        },
        {
            id: 2,
            name: "Budgets",
            href: "/dashboard/budgets",
            icon: PiggyBank,
        },
        {
            id: 3,
            name: "Expenses",
            href: "/dashboard/expenses",
            icon: ReceiptText,
        },
        {
            id: 4,
            name: "Upgrade",
            href: "/dashboard/upgrade",
            icon: ShieldCheck,
        },
    ]
    const path = usePathname();
    useEffect(() => {
        console.log(path, 'path')
    }, [path])
    return (
        <div className='h-screen shadow-xm border p-5'>
            <Image
                src="/logo.svg"
                alt={"logo"}
                width={160}
                height={100}
            />
            <div className='flex flex-col gap-3 mt-5'>
                {menuList?.map(({ id, name, href, icon: Icon }) => (
                    <Link
                        key={id}
                        href={href}>
                        <h2
                            className={`flex items-center gap-2 text-gray-500 font-medium p-5 cursor-pointer rounded-md hover:text-primary hover:bg-blue-100 ${path === href ? 'text-primary bg-blue-100' : ''}`}
                        >
                            <Icon /> {name}
                        </h2>
                    </Link>
                ))}
            </div>
            <div className="fixed bottom-10 p-5 flex gap-2 items-center">
                <UserButton />
                profile
            </div>
        </div>
    )
}
