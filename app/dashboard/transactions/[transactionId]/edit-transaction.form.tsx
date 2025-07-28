"use client"

import TransactionForm, { transactionFormSchema } from "@/components/transaction-form"
import { Category } from "@/types/Categories"
import { format } from "date-fns"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import z from "zod"
import { updateTransaction } from "./action"

export default function EditTransactionForm({
    categories,
    transaction,
} : {
    categories: Category[];
    transaction: {
        id: number;
        categoryId: number;
        amount: string;
        description: string;
        transactionDate: string;
    }
}) {
    const router = useRouter()
    const handleSubmit = async (data: z.infer<typeof transactionFormSchema>) => {
        const result = await updateTransaction({
            id: transaction.id,
            amount: data.amount,
            description: data.description,
            categoryId: data.categoryId,
            transactionDate: format(data.transactionDate, "yyyy-MM-dd")
        })
        

        if (result?.error) {
            toast.error("error",
                {
                    description: result.message,
                })
            return
        }
        toast.success("Transaction saved!", {
            description: "Transaction updated",   // optional second line
            // any other options (duration, action, etc.) go here
        });

        router.push(`/dashboard/transactions?month=${data.transactionDate.getMonth() + 1}$year=${data.transactionDate.getFullYear()}`)
    }


    return <TransactionForm defaultValues={{
        amount: Number(transaction.amount), categoryId: transaction.categoryId, description: transaction.description, transactionDate: new Date(transaction.transactionDate),
        transactionType: categories.find(category => category.id === transaction.categoryId)?.type ?? "income"
    }} onSubmit={handleSubmit} categories={categories} />;
};



