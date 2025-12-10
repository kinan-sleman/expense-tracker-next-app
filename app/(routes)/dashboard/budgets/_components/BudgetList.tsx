"use client"
import BudgetItem from "@/app/(routes)/dashboard/budgets/_components/BudgetItem";
import CreateBudget from "@/app/(routes)/dashboard/budgets/_components/CreateBudget";
import { Budget } from "@/types/budget";
import { db } from "@/utils/dbConfig";
import { Budgets, Expenses } from "@/utils/schema";
import { useUser } from "@clerk/nextjs";
import { UserResource } from "@clerk/shared/index-BEQimpLu";
import { desc, eq, getTableColumns, sql } from "drizzle-orm";
import { useEffect, useState } from "react";

export default function BudgetList() {
    const { user } = useUser();
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
        <div className="mt-7">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                <div>
                    <CreateBudget refreshData={() => checkUserAndFetch(user)} />
                </div>
                {budgetList && Array.isArray(budgetList) && budgetList.length > 0 ? budgetList?.map((budget: Budget, i: number) => (
                    <BudgetItem key={i} budget={budget} />
                )) : [1, 2, 3, 4, 5].map((item, index) => (
                    <div className="w-full h-[150px] rounded-lg bg-slate-200 animate-pulse" key={index}></div>
                ))}
            </div>
        </div>
    )
}
