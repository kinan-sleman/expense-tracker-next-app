export interface Expense {
    amount: string;
    budgetId: number | null;
    createdBy: string;
    createdAt: Date | null;
    id: number;
    name: string;
}