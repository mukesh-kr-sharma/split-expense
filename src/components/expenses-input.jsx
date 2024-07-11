"use client"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, } from "@/components/ui/card"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow, } from "@/components/ui/table"
import { ComboBox } from "@/components/combobox";
import { useContext, useEffect, useRef, useState } from "react";
import MyContext from "@/my-context";
import { SelectUsersPopover } from "./selectusers";


const ExpensesInput = () => {
  const { context, setContext } = useContext(MyContext)

  const selectPaidByUserOptions = context.users ? context.users.map((user) => ({ 'value': user, 'label': user })) : []
  const selectedPaidByUserRef = useRef('');

  const selectedParticipants = useRef([])
  const [expenses, setExpenses] = useState([])

  useEffect(() => {
    setContext({ ...context, expenses })
  }, [expenses])

  return (
    <Card className="w-[700px] hidden" id="add-expense-card">
      <CardHeader>
        <CardTitle>Expenses</CardTitle>
        <CardDescription>Add expenses</CardDescription>



      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[400px] w-full rounded-md border">
          <Table>
            {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
            <TableHeader>
              <TableRow>
                <TableHead>Paid For</TableHead>
                <TableHead>Paid By</TableHead>
                <TableHead className="text-right">Amount</TableHead>
                <TableHead>Participants</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">
                  <Input id="paid-for-input" type="text" className="flex-1" placeholder="Item name" />
                </TableCell>
                <TableCell>
                  <ComboBox options={selectPaidByUserOptions} innerRef={selectedPaidByUserRef} />
                </TableCell>
                <TableCell className="text-right">
                  <Input id="amount-input" type="number" className="flex-1 text-right" placeholder="Amount" />
                </TableCell>
                <TableCell>
                  <SelectUsersPopover innerRef={selectedParticipants} />
                </TableCell>
                <TableCell>
                  <Button className="mr-2" variant="outline" onClick={() => {
                    setExpenses([...expenses, {
                      'paid_for': document.getElementById('paid-for-input').value,
                      'paid_by': selectedPaidByUserRef.current,
                      'amount': document.getElementById('amount-input').value,
                      'participants': selectedParticipants.current
                    }])

                    document.getElementById('paid-for-input').value = ''
                    document.getElementById('amount-input').value = 0

                  }}>Add</Button>
                </TableCell>
              </TableRow>
              {
                expenses.map((expense, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{expense.paid_for}</TableCell>
                    <TableCell>{expense.paid_by}</TableCell>
                    <TableCell className="text-right">Rs. {new Intl.NumberFormat('en-IN', { maximumSignificantDigits: 3 }).format(expense.amount)}
                    </TableCell>
                    <TableCell className="text-right">{expense.participants.length == context.users.length ? "All" : expense.participants.length + ""}</TableCell>
                    <TableCell>
                      <Button className="mr-2 px-2" variant="outline" onClick={() => {
                        setExpenses(expenses.filter((val, id1) => id1 != index))
                      }}>Delete</Button>
                    </TableCell>
                  </TableRow>
                ))
              }
            </TableBody>
          </Table>

        </ScrollArea>

      </CardContent>
      <CardFooter className="flex justify-between">
        <Button onClick={() => {
          document.getElementById("add-user-card").classList.remove("hidden");
          document.getElementById("add-expense-card").classList.add("hidden");
          document.getElementById("settlement-card").classList.add("hidden");
        }}>Previous</Button>

        <Button onClick={() => {
          document.getElementById("add-user-card").classList.add("hidden");
          document.getElementById("add-expense-card").classList.add("hidden");
          document.getElementById("settlement-card").classList.remove("hidden");
        }}>Next</Button>
      </CardFooter>
    </Card>
  )
}

export default ExpensesInput