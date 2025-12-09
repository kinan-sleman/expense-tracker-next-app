import CreateBudget from "@/app/(routes)/dashboard/budgets/_components/CreateBudget";

export default function BudgetList() {
    return (
        <div className="mt-7">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                <div>

                    <CreateBudget />
                </div>

            </div>
        </div>
    )
}
