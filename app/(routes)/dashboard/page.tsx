"use client"
import CardInfo from '@/app/(routes)/dashboard/_components/CardInfo'
import { Budget } from '@/types/budget';
import { db } from '@/utils/dbConfig';
import { Budgets, Expenses } from '@/utils/schema';
import { useUser } from '@clerk/nextjs'
import { UserResource } from '@clerk/shared/index-BEQimpLu';
import { desc, eq, getTableColumns, sql } from 'drizzle-orm';
import { useEffect, useState } from 'react';

export default function Dashboard() {
    const { user } = useUser()
    const [budgetList, setBudgetList] = useState<Budget[]>();
    const getBudgetsList = async (email: string) => {
        const result = await db.select({
            ...getTableColumns(Budgets),
            totalSpend: sql`sum(${Expenses.amount})`.mapWith(Number),
            totalItems: sql`count(${Expenses.id})`.mapWith(Number)
        })
            .from(Budgets)
            .leftJoin(Expenses, eq(Budgets.id, Expenses.budgetId))
            .where(eq(Budgets.createdBy, email))
            .groupBy(Budgets.id)
            .orderBy(desc(Budgets.id))
        setBudgetList(result)
    }
    const checkUserAndFetch = (user: UserResource | null | undefined) => {
        if (user) {
            const userEmail = user.primaryEmailAddress?.emailAddress;
            if (userEmail) {
                getBudgetsList(userEmail);
            }
        }
    }
    useEffect(() => {
        checkUserAndFetch(user)
    }, [user]);

    return (
        <div className='p-8'>
            <h1 className="font-bold text-3xl">Hi, {user?.fullName} ✌</h1>
            <p className="text-gray-500">Here's what happening with your money, Let's manage your expenses</p>
            <CardInfo budgetList={budgetList}/>
        </div>
    )
}
