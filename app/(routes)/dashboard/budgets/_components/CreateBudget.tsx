"use client"

import { Button } from "@/components/ui/button";
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
import { Input } from "@/components/ui/input";
import { db } from "@/utils/dbConfig";
import { Budgets } from "@/utils/schema";
import { useUser } from "@clerk/nextjs";
import EmojiPicker, { EmojiClickData } from "emoji-picker-react"
import Image from "next/image";
import { useState } from "react"
import { toast } from "sonner";

export default function CreateBudget({ refreshData }: { refreshData: () => void }) {
  const [emojiIcon, setEmojiIcon] = useState("☺️");
  const [openEmojiPicker, setOpenEmojiPicker] = useState(false);
  const [budgetName, setBudgetName] = useState('');
  const [budgetAmount, setBudgetAmount] = useState<number | string>('');

  const handleEmojiClick = (emojiData: EmojiClickData) => {
    setEmojiIcon(emojiData.emoji);
    setOpenEmojiPicker(false);
  };

  const { user } = useUser();

  const handleCreateBudget = async () => {
    const amountValue = parseInt(budgetAmount as string);
    const userEmail = user?.primaryEmailAddress?.emailAddress;

    if (!budgetName || isNaN(amountValue) || amountValue <= 0 || !userEmail) {
      toast.error("Please provide a valid name, amount, and ensure you are logged in.");
      return;
    }
    const result = await db.insert(Budgets).values({
      name: budgetName,
      amount: amountValue.toString(),
      createdBy: userEmail,
      icon: emojiIcon,
    }).returning({ insertedId: Budgets.id });

    if (result && result.length > 0) {
      refreshData()
      toast.success("New Budget Created!")
    }
  };
  return (
    <div>
      <Dialog >
        <DialogTrigger asChild>
          <div className="bg-slate-100 p-10 flex flex-col items-center border-2 border-dashed rounded-md cursor-pointer hover:shadow-md transition-all duraiton-200">
            <h2 className="text-3xl">+</h2>
            <h2>Create New Budget</h2>
          </div>
        </DialogTrigger>

        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Budget</DialogTitle>
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
              <Input onChange={(e) => setBudgetName(e.target.value)} placeholder="E.g Home Decor" />
            </div>
            <div className="mt-2">
              <h2 className="text-black font-medium my-1">Budget Amount</h2>
              <Input type="number" onChange={(e) => setBudgetAmount(e.target.value)} placeholder="E.g $5000" />
            </div>
          </div>
          <DialogFooter className="sm:justify-start">
            <DialogClose asChild>
              <div className="flex items-center gap-2">
                <Button disabled={!(budgetName && budgetAmount)} onClick={handleCreateBudget}>
                  Create Budget
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