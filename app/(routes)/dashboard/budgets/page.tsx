import BudgetList from '@/app/(routes)/dashboard/budgets/_components/BudgetList'

export default function Budgets() {
    return (
        <div className='p-10'>
            <h2 className="font-bold text-3xl">My Budgets</h2>
            <BudgetList />
        </div>
    )
}
