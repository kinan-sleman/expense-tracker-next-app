"use client"

import { db } from "@/utils/dbConfig";
import { Budgets, Expenses } from "@/utils/schema";
import { useUser } from "@clerk/nextjs";
import { and, desc, eq, getTableColumns, sql } from "drizzle-orm";
import { useEffect, useState } from "react"
import { UserResource } from '@clerk/shared/index-BEQimpLu';
import { Budget } from "@/types/budget";
import BudgetItem from "@/app/(routes)/dashboard/budgets/_components/BudgetItem";
import AddExpense from "@/app/(routes)/dashboard/expenses/[id]/_components/AddExpense";
import { Expense } from "@/types/expense";
import ExpensesListTable from "@/app/(routes)/dashboard/expenses/[id]/_components/ExpensesListTable";

export default function ExpensesPage({ params }: {
    params: Promise<{ id: string }>;
}) {
    const { user } = useUser();
    const [budgetId, setBudgetId] = useState<number | null>(null);
    const [budgetInfo, setBudgetInfo] = useState<Budget>();
    const [paramsData, setParamsData] = useState<{ id: string } | null>(null);
    const [expensesList, setExpensesList] = useState<Expense[]>([])

    useEffect(() => {
        params.then(resolvedParams => {
            setParamsData(resolvedParams);
            const id = parseInt(resolvedParams.id, 10);
            if (!isNaN(id)) {
                setBudgetId(id);
            }
        }).catch(error => {
            console.error("Failed to resolve params:", error);
        });
    }, [params]);

    const getBudgetInfo = async (email: string, id: number) => {
        try {
            const result = await db.select({
                ...getTableColumns(Budgets),
                totalSpend: sql`sum(${Expenses.amount})`.mapWith(Number),
                totalItems: sql`count(${Expenses.id})`.mapWith(Number)
            })
                .from(Budgets)
                .leftJoin(Expenses, eq(Budgets.id, Expenses.budgetId))
                .where(
                    and(
                        eq(Budgets.createdBy, email),
                        eq(Budgets.id, id)
                    )
                )
                .groupBy(Budgets.id);
            setBudgetInfo(result[0]);
        } catch (error) {
            console.error("Failed to fetch budget list:", error);
            return [];
        }
    }

    const getExpensesList = async (budgetId: number) => {
        const result = await db.select()
            .from(Expenses).where(eq(Expenses.budgetId, budgetId))
            .orderBy(desc(Expenses.id));
        console.log({ result });
        setExpensesList(result)
    }

    const checkUserAndFetch = async (user: UserResource | null | undefined) => {
        if (user && budgetId) {
            const userEmail = user.primaryEmailAddress?.emailAddress;
            if (userEmail) {
                await getBudgetInfo(userEmail, budgetId);
                await getExpensesList(budgetId);
            }
        }
    }

    useEffect(() => {
        checkUserAndFetch(user);
    }, [user, budgetId]);

    return (
        <div className='p-10'>
            <h2 className="font-bold text-3xl">My Expenses</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 mt-6 gap-5">
                {budgetInfo ? (
                    <BudgetItem budget={budgetInfo} />
                ) : (
                    <div className="h-[150px] w-full bg-slate-200 rounded-lg animate-pulse"></div>
                )}
                <AddExpense
                    budgetId={Number(budgetId)}
                    user={user}
                    refreshData={() => checkUserAndFetch(user)}
                />
            </div>
            <div className="mt-4">
                <h2 className="font-bold text-lg">Latest Expenses</h2>
                <ExpensesListTable
                    refreshData={() => checkUserAndFetch(user)}
                    expensesList={expensesList} />
            </div>
        </div>
    )
}