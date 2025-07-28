"use client"

import TransactionForm, { transactionFormSchema } from '@/components/transaction-form';
import { Category } from '@/types/Categories';
import { format } from 'date-fns';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { z } from 'zod';
import { createTransaction } from './actions';

type NewTransactionFormProps = {
    categories: Category[];   // ← replace with the actual type you need
};

const NewTransactionForm = ({ categories }: NewTransactionFormProps) => {
    const router = useRouter()
    const handleSubmit = async (data: z.infer<typeof transactionFormSchema>) => {
        const result = await createTransaction({
            amount: data.amount,
            transactionDate: format(data.transactionDate, "yyyy-MM-dd"),
            categoryId: data.categoryId,
            description: data.description
        })
        if (result.error) {
            toast.error("error",
                {
                    description: result.message,
                })
            return
        }
        toast.success("Transaction saved!", {
            description: result.message,   // optional second line
            // any other options (duration, action, etc.) go here
        });

        router.push(`/dashboard/transactions?month=${data.transactionDate.getMonth() + 1}$year=${data.transactionDate.getFullYear()}`)
    }


    return <TransactionForm onSubmit={handleSubmit} categories={categories} />;
};

export default NewTransactionForm;