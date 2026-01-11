'use client';

import { Button } from '@/components/ui/button'
import { PenBox } from 'lucide-react'
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import EmojiPicker, { EmojiClickData } from 'emoji-picker-react'
import { Input } from '@/components/ui/input'
import { useEffect, useState } from 'react'
import { useUser } from '@clerk/nextjs'
import { toast } from 'sonner'
import { db } from '@/utils/dbConfig'
import { Budgets } from '@/utils/schema'
import { Budget } from '@/types/budget';
import { eq } from 'drizzle-orm'

export default function EditBudget({ refreshData, budgetInfo }: { refreshData: () => void, budgetInfo: Budget | undefined }) {
    const [emojiIcon, setEmojiIcon] = useState(budgetInfo?.icon);
    const [openEmojiPicker, setOpenEmojiPicker] = useState(false);
    const [budgetName, setBudgetName] = useState<string>('');
    const [budgetAmount, setBudgetAmount] = useState<number | string>('');

    useEffect(() => {
        if (budgetInfo) {
            setEmojiIcon(budgetInfo.icon);
            setBudgetName(budgetInfo.name);
            setBudgetAmount(budgetInfo.amount);
        }
    }, [budgetInfo]);

    const handleEmojiClick = (emojiData: EmojiClickData) => {
        setEmojiIcon(emojiData.emoji);
        setOpenEmojiPicker(false);
    };

    const { user } = useUser();

    const handleUpdateBudget = async () => {
        const amountValue = parseInt(budgetAmount as string);
        const userEmail = user?.primaryEmailAddress?.emailAddress;

        if (!budgetName || isNaN(amountValue) || amountValue <= 0 || !userEmail || !budgetInfo) {
            toast.error("Please provide a valid name, amount, and ensure you are logged in.");
            return;
        }

        const result = await db.update(Budgets).set({
            name: budgetName,
            amount: amountValue.toString(),
            icon: emojiIcon,
        }).where(eq(Budgets.id, budgetInfo.id))
            .returning();

        if (result && result.length > 0) {
            refreshData()
            toast.success("Budget Updated!")
        }
    };
    return (
        <div>

            <Dialog >
                <DialogTrigger asChild>
                    <Button className="flex gap-2"><PenBox /> Edit</Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Update Budget</DialogTitle>
                        <DialogDescription>
                            Select an icon, choose a dedicated amount, and give your budget a name.
                        </DialogDescription>
                    </DialogHeader>

                    <div className="mt-4 flex flex-col gap-5">

                        <div className="flex items-center gap-4 relative">
                            <p className="text-lg font-medium">Choose Icon:</p>

                            <Button
                                variant="outline"
                                className="p-0 border-0 text-[25px] min-h-16 min-w-16"
                                onClick={() => setOpenEmojiPicker(!openEmojiPicker)}
                            >
                                {emojiIcon}
                            </Button>
                            <div className="absolute z-10 top-16 -left-8 md:left-32">
                                <EmojiPicker open={openEmojiPicker} onEmojiClick={handleEmojiClick} />
                            </div>
                        </div>
                        <div className="mt-2">
                            <h2 className="text-black font-medium my-1">Budget Name</h2>
                            <Input defaultValue={budgetInfo?.name} onChange={(e) => setBudgetName(e.target.value)} placeholder="E.g Home Decor" />
                        </div>
                        <div className="mt-2">
                            <h2 className="text-black font-medium my-1">Budget Amount</h2>
                            <Input defaultValue={budgetInfo?.amount} type="number" onChange={(e) => setBudgetAmount(e.target.value)} placeholder="E.g $5000" />
                        </div>
                    </div>
                    <DialogFooter className="sm:justify-start">
                        <DialogClose asChild>
                            <div className="flex items-center gap-2">
                                <Button disabled={!(budgetName && budgetAmount)} onClick={handleUpdateBudget}>
                                    Update Budget
                                </Button>
                                <Button type="button" variant="secondary">
                                    Close
                                </Button>
                            </div>
                        </DialogClose>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}
