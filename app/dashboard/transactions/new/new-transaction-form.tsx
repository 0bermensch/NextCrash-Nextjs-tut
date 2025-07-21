"use client"

import TransactionForm, { transactionFormSchema } from '@/components/transaction-form';
import { Category } from '@/types/Categories';
import { format } from 'date-fns';
import { toast } from 'sonner';
import { z } from 'zod';
import { createTransaction } from './Actions';

type NewTransactionFormProps = {
    categories: Category[];   // ← replace with the actual type you need
};

const NewTransactionForm = ({ categories }: NewTransactionFormProps) => {
    const handleSubmit = async (data: z.infer<typeof transactionFormSchema>) => {
        const result = await createTransaction({
            amount: data.amount,
            transactionDate: format(data.transactionDate, "yyyy-MM-dd"),
            categoryId: data.categoryId,
            description: data.description
        })
        if (result.error) {
            toast.error(result.message)
            return
        }
        // if (result.error){
        //     toast({
        //         title: "error",
        //         description: result.message
        //     })
        // }
        console.log(result.id)
    }


    return <TransactionForm onSubmit={handleSubmit} categories={categories} />;
};

export default NewTransactionForm;
