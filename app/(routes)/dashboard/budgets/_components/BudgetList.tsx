"use client"
import BudgetItem from "@/app/(routes)/dashboard/budgets/_components/BudgetItem";
import CreateBudget from "@/app/(routes)/dashboard/budgets/_components/CreateBudget";
import { Budget } from "@/types/budget";
import { db } from "@/utils/dbConfig";
import { Budgets, Expenses } from "@/utils/schema";
import { useUser } from "@clerk/nextjs";
import { eq, getTableColumns, sql } from "drizzle-orm";
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
        setBudgetList(result)
    }

    useEffect(() => {
        if (user) {
            const userEmail = user.primaryEmailAddress?.emailAddress;
            if (userEmail) {
                getBudgetsList(userEmail);
            }
        }
    }, [user]);
    return (
        <div className="mt-7">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                <div>
                    <CreateBudget />
                </div>
                {budgetList?.map((budget: Budget, i: number) => (
                    <BudgetItem key={i} budget={budget} />
                ))}
            </div>
        </div>
    )
}
