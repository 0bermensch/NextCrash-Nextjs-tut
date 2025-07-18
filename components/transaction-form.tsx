"use client"

import { zodResolver } from "@hookform/resolvers/zod";
import { addDays, format, setDate } from "date-fns";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "./ui/form";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "./ui/select";
// import { Select } from "react-day-picker"
import { Popover, PopoverContent, PopoverTrigger } from "@radix-ui/react-popover";
import { Calendar, CalendarIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { date, z } from "zod";
import { Button } from "./ui/button";


// I need to run javascript in the browser, so the "use-client" is used to make this client-side rendering


//z.coerce - accept whatever, convert, then validate. html form control always gives string
const transactionFormSchema = z.object({
    transactionType: z.enum(["income", "expense"]),
    categoryId: z.coerce.number().positive("Please select a category"),
    transactionDate: z.coerce.date().max(addDays(new Date(), 1), "Transaction date cannot be in the future"),
    amount: z.coerce.number().positive("Amount must be greater than 0"),
    description: z.string().min(3, "Description must contain at least 3 characters").max(300, "Description must contain a maximum of 300 characters")
})

// zodresolver - bridge between zod and react hook form

// useForm expects a resolver: a function that receives the form values and returns { values, errors }.

// @hookform/resolvers/zod gives you that adapter:

// });
// Runtime – on every handleSubmit (and on blur/change if you enable it) React Hook Form passes the current data to zodResolver, which internally does
// schema.safeParse(data).

// If successful → values are returned and the submit callback runs.

// If failed → the ZodError is converted into RHF’s error shape and your UI shows messages.

// Compile-time – the generic <z.infer<typeof transactionFormSchema>> means TypeScript knows the exact shape of form.getValues(), form.setValue(), etc., and it matches the runtime validation 1-for-1.

const TransactionForm = () => {
    const form = useForm<z.infer<typeof transactionFormSchema>>({
        resolver: zodResolver(transactionFormSchema),
        defaultValues: {
            amount: 0,
            categoryId: 0,
            description: "",
            transactionDate: new Date(),
            transactionType: "income"
        }
    })

    const handleSubmit = async (date: z.infer<typeof transactionFormSchema>) => {

    }
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)}>
                <fieldset className="grid grid-cols-2 gap-y-5 gap-x-2 items-start">
                    <FormField control={form.control} name="transactionType" render={({ field }) => {
                        return (
                            <FormItem>
                                <FormLabel>Transaction Type</FormLabel>

                                <FormControl>
                                    <Select onValueChange={field.onChange} value={field.value}>
                                        <SelectTrigger>
                                            <SelectValue />

                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="income">
                                                Income
                                            </SelectItem>
                                            <SelectItem value="expense">
                                                Expense
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>

                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )
                    }} />
                    <FormField control={form.control} name="categoryId" render={({ field }) => {
                        return (
                            <FormItem>
                                <FormLabel>Category</FormLabel>
                                <FormControl>
                                    <Select onValueChange={field.onChange} value={field.value.toString()}>
                                        <SelectTrigger>
                                            <SelectValue />

                                        </SelectTrigger>
                                        <SelectContent>
                                        </SelectContent>
                                    </Select>

                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )
                    }} />
                    <FormField control={form.control} name="categoryId" render={({ field }) => {
                        return (
                            <FormItem>
                                <FormLabel>Transaction Date</FormLabel>
                                <FormControl>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <Button
                                                variant="outline"
                                                data-empty={!date}
                                                className="field.value-[empty=true]:text-muted-foreground w-[280px] justify-start text-left font-normal"
                                            >
                                                <CalendarIcon />
                                                {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0">
                                            <Calendar
  mode="single"
  selected={date}
  onSelect={setDate}
  /* ✨ override the icons so they strip the prop that upsets React 19 */
  components={{
    IconLeft: ({ selected, ...props }) => (
      <CalendarIcon className="h-4 w-4" {...props} />
    ),
    IconRight: ({ selected, ...props }) => (
      <CalendarIcon className="h-4 w-4" {...props} />
    ),
  }}
/>

                                        </PopoverContent>
                                    </Popover>

                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )
                    }} />
                </fieldset>

            </form>
        </Form>

    )
}

export default TransactionForm

