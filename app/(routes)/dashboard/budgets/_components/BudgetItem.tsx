"use client"
import { Budget } from "@/types/budget"

export default function BudgetItem({ budget }: { budget: Budget }) {
    const { amount, icon, name, totalItems, totalSpend } = budget
    return (
        <div className="p-5 border rounded-lg hover:shadow-md cursor-pointer">
            <div className="flex justify-between items-center">

                <div className="flex gap-2 items-center">
                    <h2 className="text-3xl p-2 bg-slate-100 rounded-full">{icon}</h2>
                    <div>
                        <h2 className="font-bold">{name}</h2>
                        <h2 className="text-xs text-gray-500">{totalItems} Item</h2>
                    </div>
                </div>
                <div>
                    <h2 className="font-bold text-primary text-lg">${amount}</h2>
                </div>
            </div>
            <div className="mt-5">
                <div className="flex justify-between items-center mb-3">
                    <h2 className="text-xs text-slate-400 ">${totalSpend ? totalSpend : 0} Spend</h2>
                    <h2 className="text-xs text-slate-400 ">${Number(amount) - totalSpend} Remaining</h2>
                </div>
                <div className="w-full bg-slate-300 h-2 rounded-full">
                    <div className="w-[40%] bg-primary h-2 rounded-full"></div>
                </div>
            </div>
        </div>
    )
}
