import { Expense } from '@/types/expense'
import { db } from '@/utils/dbConfig';
import { Expenses } from '@/utils/schema';
import { eq } from 'drizzle-orm';
import { Trash } from 'lucide-react';
import { toast } from 'sonner';
import moment from 'moment';
export default function ExpensesListTable({ expensesList, refreshData }: {
    expensesList: Expense[],
    refreshData: () => Promise<void>

}) {
    const deleteExpense = async (id: number) => {
        const result = await db.delete(Expenses).where(eq(Expenses.id, id)).returning()
        if (result) {
            await refreshData();
            toast.error("Expense Deleted")
        }
    }
    return (
        <div className='mt-3'>
            <div className='grid grid-cols-5 md:grid-cols-4 bg-slate-200 p-2'>
                <h2>Name</h2>
                <h2>Amount</h2>
                <h2 className='text-center md:text-normal col-span-2 md:col-span-1'>Date</h2>
                <h2>Action</h2>
            </div>
            {expensesList?.map((expense: Expense, index) => {
                const { amount, budgetId, createdAt, id, name } = expense;
                return (
                    <div key={`${id} - ${budgetId} - ${createdAt}`} className='grid grid-cols-5 md:grid-cols-4 bg-slate-200 p-2'>
                        <h2 className='font-bold'>{name}</h2>
                        <h2 className='font-bold'>{amount}</h2>
                        <h2 className='font-bold text-center md:text-normal col-span-2 md:col-span-1'>{moment(createdAt).format('DD/MM/YYYY')}</h2>
                        <h2 className='font-bold'>
                            <Trash onClick={() => deleteExpense(id)} className='text-red-600 cursor-pointer' />
                        </h2>
                    </div>
                )
            })}
        </div>
    )
}
