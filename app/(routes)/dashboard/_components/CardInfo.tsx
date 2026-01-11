import { Budget } from '@/types/budget'
import { PiggyBank, ReceiptText, Wallet } from 'lucide-react'
import React, { useEffect, useState } from 'react'

export default function CardInfo({ budgetList }: { budgetList: Budget[] | undefined }) {
    const [totalBudget, setTotalBudget] = useState(0)
    const [totalSpend, setTotalSpend] = useState(0)
    const [totalItems, setTotalItems] = useState(0)
    useEffect(() => {
        budgetList && calculateCardInfo();
    }, [budgetList])
    const calculateCardInfo = () => {
        if (budgetList) {
            const totalBudgets = budgetList?.reduce((acc, budget) => acc + Number(budget.amount), 0);
            const totalSpend = budgetList?.reduce((acc, budget) => acc + budget.totalSpend, 0);
            setTotalBudget(totalBudgets)
            setTotalSpend(totalSpend)
            setTotalItems(budgetList?.length)
        }
    }
    return (
        <div>
            {budgetList ? (
                <div className='mt-7 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
                    <div className='p-7 border rounded-lg flex justify-between items-center'>
                        <div>
                            <h2 className="text-sm">Total Budgets</h2>
                            <h2 className='font-bold text-2xl'>${totalBudget}</h2>
                        </div>
                        <PiggyBank className='bg-primary text-white p-3 h-12 w-12 rounded-full' />
                    </div>
                    <div className='p-7 border rounded-lg flex justify-between items-center'>
                        <div>
                            <h2 className="text-sm">Total Spend</h2>
                            <h2 className='font-bold text-2xl'>${totalSpend}</h2>
                        </div>
                        <ReceiptText className='bg-primary text-white p-3 h-12 w-12 rounded-full' />
                    </div>
                    <div className='p-7 border rounded-lg flex justify-between items-center'>
                        <div>
                            <h2 className="text-sm">No. Of Budgets</h2>
                            <h2 className='font-bold text-2xl'>{totalItems}</h2>
                        </div>
                        <Wallet className='bg-primary text-white p-3 h-12 w-12 rounded-full' />
                    </div>
                </div>
            ) : (
                <div  className='mt-7 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
                    {[1, 2, 3].map((item, index) => (
                        <div key={`${item} - ${index}`} className="h-[160px] w-full bg-slate-200 animate-pulse rounded-lg"></div>
                    ))}
                </div>
            )}
        </div>
    )
}
