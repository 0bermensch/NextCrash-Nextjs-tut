"use client"

import { AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Trash2Icon } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { deleteTransaction } from "./action";

export default function DeleteTransactionDialog({
    transactionId,
    transactionDate,
}: {
    transactionId: number;
    transactionDate: string;
}){
    const router = useRouter()
    const handleDeleteConfirm = async () => {
        const result = await deleteTransaction(transactionId)

        if (result?.error) {
            toast.error("error",{
                description: result.message
            })
            return
        }

        toast.success("Transaction Deleted", {
            description: "Transaction Deleted",   // optional second line
            // any other options (duration, action, etc.) go here
        });

        const [year,month] = transactionDate.split("_")

        router.push(`/dashboard/transactions?month=${month}&year=${year}`)
    }
    return(
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button variant="destructive" size="icon">
                    <Trash2Icon/>
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        Are you sure?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter className="flex justify-between">
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <Button onClick={handleDeleteConfirm} variant="destructive">Delete</Button>
                    
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}