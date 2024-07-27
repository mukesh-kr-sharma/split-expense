"use client"

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area"
import { Card, CardContent, CardFooter, CardHeader, CardTitle, } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, } from "@/components/ui/table"
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

const absoluteSum = (list) => {
    let sum = 0
    for (let i = 0; i < list.length; i++)
        sum += Math.abs(list[i])
    return sum
}

const SettlementSuggestion = () => {
    const router = useRouter()
    const searchParams = useSearchParams()

    const expenseID = searchParams.get("expense_id")

    const [settlements, setSettlements] = useState([])
    const [expenseDetails, setExpenseDetails] = useState({})

    useEffect(() => {
        const getExpenseDetails = async () => {
            const response = await fetch(`/api/expense?expense_id=${expenseID}`);
            if (!response.ok) {
                throw new Error(`Response status: ${response.status}`);
            }
            const data = await response.json()
            setExpenseDetails(data.expense)
        }
        getExpenseDetails()
    }, [expenseID])

    useEffect(() => {
        if (expenseDetails.id) {
            const users = expenseDetails?.users
            const transactions = expenseDetails?.transactions

            var expense_summary = {}

            users?.map((user) => {
                let total_paid = 0
                let self_expense = 0
                transactions.forEach((record) => {
                    if (record['paid_by']['id'] == user.id)
                        total_paid = total_paid + parseInt(record['amount'])

                    if (record['participants'].map((participant) => participant.id).includes(user.id))
                        self_expense += Math.round(record['amount'] / record['participants'].length)
                })

                let net_amount = total_paid - self_expense
                expense_summary[user.id] = {
                    name: user.name,
                    amount: net_amount
                }
            })

            var tmp_settlements = []
            var iterCount = 0
            console.log(absoluteSum(Object.entries(expense_summary).map(v => v[1].amount)))
            while (absoluteSum(Object.entries(expense_summary).map(v => v[1].amount)) > users?.length && iterCount < 1000) {
                iterCount += 1

                let min_user_id = Object.keys(expense_summary)[0]
                let min_amount = Object.values(expense_summary)[0]['amount']

                let max_user_id = min_user_id
                let max_amount = min_amount

                for (let key in expense_summary) {
                    if (expense_summary[key] === 0) {
                        delete expense_summary[key]
                        continue
                    }

                    if (expense_summary[key]['amount'] < min_amount) {
                        min_user_id = key
                        min_amount = expense_summary[key]['amount']
                    }
                    if (expense_summary[key]['amount'] > max_amount) {
                        max_user_id = key
                        max_amount = expense_summary[key]['amount']
                    }
                }

                if (Math.abs(min_amount) < max_amount) {
                    tmp_settlements.push({
                        'from': {id: min_user_id, name: expense_summary[min_user_id]['name']},
                        'to': {id: max_user_id, name: expense_summary[max_user_id]['name']},
                        'amount': Math.abs(min_amount)
                    })
                    delete expense_summary[min_user_id]
                    expense_summary[max_user_id]['amount'] = min_amount + max_amount
                } else {
                    tmp_settlements.push({
                        'from': {id: min_user_id, name: expense_summary[min_user_id]['name']},
                        'to': {id: max_user_id, name: expense_summary[max_user_id]['name']},
                        'amount': max_amount
                    })
                    delete expense_summary[max_user_id]
                    expense_summary[min_user_id]['amount'] = min_amount + max_amount
                }
            }
            setSettlements(tmp_settlements)
        }
    }, [expenseDetails])


    useEffect(()=>{
        console.log(settlements)
    }, [settlements])


    return (
        <Card className="w-[500px]">
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
                                        {record["from"]["name"]}
                                    </TableCell>
                                    <TableCell>
                                        {record["to"]["name"]}
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
                <Button onClick={() => router.push(`/?expense_id=${expenseID}&active_page=transactions`)}>Previous</Button>
            </CardFooter>
        </Card>
    )
}

export default SettlementSuggestion