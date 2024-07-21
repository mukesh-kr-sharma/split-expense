"use client"

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, } from "@/components/ui/table"
import { useContext, useEffect, useState } from "react";
import MyContext from "@/my-context";

const absoluteSum = (list) => {
    let sum = 0
    for (let i = 0; i < list.length; i++)
        sum += Math.abs(list[i])
    return sum
}

const SettlementSuggestion = () => {
    const { context, setContext } = useContext(MyContext)
    const [settlements, setSettlements] = useState([])

    useEffect(() => {
        const users = context['users'] || []
        const expenses = context['expenses'] || []

        var expense_summary = {}

        users.map((user) => {
            let total_paid = 0
            let self_expense = 0

            expenses.forEach((record) => {
                if (record['paid_by'] == user)
                    total_paid = total_paid + parseInt(record['amount'])

                if (record['participants'].includes(user))
                    self_expense += Math.round(record['amount'] / record['participants'].length)

            })

            let net_amount = total_paid - self_expense
            expense_summary[user] = net_amount
        })

        var tmp_settlements = []
        var iterCount = 0
        while (absoluteSum(Object.values(expense_summary)) > users.length && iterCount < 1000) {
            iterCount += 1

            let min_key = Object.keys(expense_summary)[0]
            let min_value = Object.values(expense_summary)[0]

            let max_key = min_key
            let max_value = min_value

            for (const key in expense_summary) {
                if (expense_summary[key] === 0) {
                    delete expense_summary[key]
                    continue
                }

                if (expense_summary[key] < min_value) {
                    min_key = key
                    min_value = expense_summary[key]
                }
                if (expense_summary[key] > max_value) {
                    max_key = key
                    max_value = expense_summary[key]
                }
            }

            if (Math.abs(min_value) < max_value) {
                tmp_settlements.push({
                    'from': min_key,
                    'to': max_key,
                    'amount': Math.abs(min_value)
                })
                delete expense_summary[min_key]
                expense_summary[max_key] = min_value + max_value
            } else {
                tmp_settlements.push({
                    'from': min_key,
                    'to': max_key,
                    'amount': max_value
                })
                delete expense_summary[max_key]
                expense_summary[min_key] = min_value + max_value
            }
        }
        setSettlements(tmp_settlements)
    }, [context])

    return (
        <Card className="w-[500px] hidden" id="settlement-card">
            <CardHeader>
                <CardTitle>Settlement</CardTitle>
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
                            {settlements.map((record, index) => (
                                <TableRow key={index}>
                                    <TableCell>
                                        {record["from"]}
                                    </TableCell>
                                    <TableCell>
                                        {record["to"]}
                                    </TableCell>
                                    <TableCell className="text-right">
                                        Rs. {record["amount"]}
                                    </TableCell>
                                </TableRow>
                            ))}

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