import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { format } from "date-fns"
import Link from "next/link"
import z from "zod"

const today = new Date()

const searchSchema = z.object({
    year: z.coerce.number().min(today.getFullYear() - 100).max(today.getFullYear() + 1).catch(today.getFullYear()),
    month: z.coerce.number().min(1).max(12).catch(today.getMonth() + 1)

})

const TransactionPage = async ({
    searchParams
}: {
    searchParams: Promise<{ year?: string; month?: string }>
}) => {
    const searchParamsValues = await searchParams

    const {month, year} = searchSchema.parse(searchParamsValues)

    const selectedDate = new Date(year, month - 1, 1)
    

    return (
        <div className="max-w-screen-xl mx-auto py-10">
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink asChild>
                            <Link href="/dashboard">Dashboard</Link>
                        </BreadcrumbLink>

                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage>Transaction</BreadcrumbPage>

                    </BreadcrumbItem>

                </BreadcrumbList>
            </Breadcrumb>
            <Card className="mt-4">
                <CardHeader>
                    <CardTitle className="flex justify-between">
                        <span>{format(selectedDate, "MMM yyyy")} Transactions </span>
                        <div>dropdowns</div>

                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <Button asChild>
                        <Link href="/dashboard/transactions/new">
                            New Transaction
                        </Link>
                    </Button>
                </CardContent>
            </Card>
        </div>
    )
}

export default TransactionPage