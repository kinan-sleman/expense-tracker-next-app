"use client"

import { ReactNode, useEffect } from 'react';
import SideNav from './_components/SideNav';
import DashboardHeader from './_components/DashboardHeader';
import { useUser } from '@clerk/clerk-react';
import { db } from './../../../utils/dbConfig';
import { Budgets } from '@/utils/schema';
import { eq } from "drizzle-orm"
import { useRouter } from 'next/navigation';

export default function DashboardLayout({ children }: { children: ReactNode }) {
    const { user, isLoaded } = useUser();
    const router = useRouter();

    const checkUserBudgets = async (email: string) => {
        const result = await db.select()
            .from(Budgets)
            .where(eq(Budgets.createdBy, email));

        console.log({ result });
        if (result.length === 0) {
            router.replace('/dashboard/budgets');
        }
    }

    useEffect(() => {
        if (isLoaded && user) {
            const userEmail = user.primaryEmailAddress?.emailAddress;
            if (userEmail) {
                checkUserBudgets(userEmail);
            }
        }
    }, [isLoaded, user]);

    return (
        <div>
            <div className='fixed md:w-64 hidden md:block border shadow-md'>
                <SideNav />
            </div>
            <div className='md:ml-64'>
                <DashboardHeader />
                {children}
            </div>
        </div>
    )
}