"use client"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, } from "@/components/ui/table"
import { ComboBox } from "@/components/combobox";
import { useContext } from "react";
import MyContext from "@/my-context";
import { SelectUsersPopover } from "./selectusers";

const SettlementSuggestion = () => {
    const { context, setContext } = useContext(MyContext)

    const tmp_users = ['mukesh', 'rishabh', 'gourav']

    const tmp = [
        { 'paid_by': 'mukesh', 'amount': 1000, 'participants': ['mukesh', 'rishabh'] },
        { 'paid_by': 'rishabh', 'amount': 2000, 'participants': ['gourav', 'rishabh'] },
        { 'paid_by': 'gourav', 'amount': 500, 'participants': ['gourav', 'rishabh'] },
        { 'paid_by': 'rishabh', 'amount': 1200, 'participants': ['mukesh', 'gourav', 'rishabh'] },
        { 'paid_by': 'rishabh', 'amount': 3000, 'participants': ['mukesh', 'gourav', 'rishabh'] },
        { 'paid_by': 'mukesh', 'amount': 600, 'participants': ['mukesh', 'gourav', 'rishabh'] }
    ]

    var expense_summary = {}

    tmp_users.map((user) => {
        let total_paid = 0
        let self_expense = 0

        tmp.forEach((record) => {
            if (record['paid_by'] == user)
                total_paid = total_paid + record['amount']

            if (record['participants'].includes(user))
                self_expense += record['amount'] / record['participants'].length
        })

        let net_amount = total_paid - self_expense
        expense_summary[user] = net_amount
    })

    
    console.log(expense_summary)


    return (
        <Card className="w-[500px] hidden" id="settlement-card">
            <CardHeader>
                <CardTitle>Settlement</CardTitle>
                {/* <CardDescription>Add expenses</CardDescription> */}



            </CardHeader>
            <CardContent>
                <ScrollArea className="h-[400px] w-full rounded-md border">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Payee</TableHead>
                                <TableHead>Receiver</TableHead>
                                <TableHead className="text-right">Amount</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            <TableRow>
                                <TableCell className="font-medium">
                                    <Input id="paid-for-input" type="text" className="flex-1" placeholder="Item name" />
                                </TableCell>
                                <TableCell>
                                    wed
                                </TableCell>
                                <TableCell className="text-right">
                                    <Input id="amount-input" type="number" className="flex-1 text-right" placeholder="Amount" />
                                </TableCell>
                            </TableRow>

                        </TableBody>
                    </Table>

                </ScrollArea>

            </CardContent>
            <CardFooter>
                <Button onClick={() => {
                    document.getElementById("add-user-card").classList.add("hidden");;
                    document.getElementById("add-expense-card").classList.remove("hidden");
                    document.getElementById("settlement-card").classList.add("hidden");
                }}>Previous</Button>
            </CardFooter>
        </Card>
    )
}

export default SettlementSuggestion