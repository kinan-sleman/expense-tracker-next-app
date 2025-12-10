export interface Budget {
    totalSpend: number;
    totalItems: number;
    id: number;
    name: string;
    amount: string;
    icon: string | null;
    createdBy: string;
}