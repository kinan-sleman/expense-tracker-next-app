import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { db } from "@/utils/dbConfig";
import { Expenses } from "@/utils/schema";
import { useState } from "react";
import { UserResource } from '@clerk/shared/index-BEQimpLu';
import { toast } from "sonner";
import { Loader } from "lucide-react";

export default function AddExpense({
    budgetId,
    user,
    refreshData
}: {
    budgetId: number,
    user: UserResource | null | undefined,
    refreshData: () => Promise<void>
}) {
    const [name, setName] = useState('');
    const [amount, setAmount] = useState('');
    const [loading, setLoading] = useState(false);

    const addNewExpense = async () => {
        setLoading(true);
        const amountNum = parseFloat(amount);
        const userEmail = user?.primaryEmailAddress?.emailAddress;
        if (!userEmail) {
            toast.error("User email not found");
            setLoading(false);
            return;
        }
        try {
            const result = await db.insert(Expenses).values({
                name: name.trim(),
                amount: amountNum.toString(),
                budgetId,
                createdBy: userEmail
            }).returning({ insertedId: Expenses.id });

            if (result && result.length > 0) {
                toast.success("New Expense Added");
                await refreshData();
                setName('');
                setAmount('');
            }
        } catch (error) {
            console.error("Failed to add expense:", error);
            toast.error("Failed to add expense");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="p-5 border rounded-lg">
            <h2 className="font-bold text-lg">Add Expense</h2>
            <div className="mt-2">
                <h2 className="text-black font-medium my-1">Expense Name</h2>
                <Input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="E.g Bedroom Decor"
                />
            </div>
            <div className="mt-2">
                <h2 className="text-black font-medium my-1">Expense Amount</h2>
                <Input
                    value={amount}
                    onChange={(e) => setAmount(e.target.value.replace(/[^0-9.]/g, ''))}
                    placeholder="E.g 1000"
                    type="text"
                    inputMode="decimal"
                />
            </div>
            <Button
                onClick={addNewExpense}
                disabled={!name.trim() || !amount.trim() || parseFloat(amount) <= 0 || loading}
                className="mt-3 w-full flex gap-2"
            >
                {loading ?
                    <>
                        <Loader className="animate-spin" /> Adding...
                    </> : "Add New Expense"
                }
            </Button>
        </div>
    )
}