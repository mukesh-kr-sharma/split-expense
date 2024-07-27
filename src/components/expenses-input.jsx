"use client"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, } from "@/components/ui/table"
import { ComboBox } from "@/components/combobox";
import { useEffect, useRef, useState } from "react";
import { SelectUsersPopover } from "./selectusers";
import { useRouter, useSearchParams } from "next/navigation";
import { fetchUsers } from "./users-input";


const ExpensesInput = () => {
  const router = useRouter()
  const searchParams = useSearchParams()

  const expenseID = searchParams.get("expense_id")
  const [expenses, setExpenses] = useState([])
  const [users, setUsers] = useState([]);

  const selectPaidByUserOptions = users.map((user) => ({ 'value': user.id + "", 'label': user.name }))
  const [paidBySelect, setPaidBySelect] = useState("")
  const [selectedUsers, setSelectedUsers] = useState([])

  const addExpenseTransaction = async (inputTxn) => {
    const response = await fetch("/api/expense-transaction", {
      method: 'POST',
      body: JSON.stringify(inputTxn)
    })
    if (!response.ok) {
      throw new Error(`adding expense transaction failed: ${response.status} : ${response.statusText}`);
    }
    const json = await response.json();
    console.log("Expense transaction added", json);
    setExpenses([...expenses, json]);
  }

  const deleteExpenseTransaction = async (transactionToDelete) => {
    try {
      const response = await fetch("/api/expense-transaction", {
        method: 'DELETE',
        body: JSON.stringify(transactionToDelete)
      })
      if (!response.ok) {
        throw new Error(`deleting expense transaction failed: ${response.status}`);
      }
      const deletedTxn = await response.json();
      setExpenses(expenses.filter((currTxn => currTxn.id != deletedTxn.id)))
      console.log("Expense transaction deleted", deletedTxn)
    } catch (error) {
      console.error(error.message);
    }
  }

  useEffect(() => {

    const setUsersState = async () => {
      let tmp = await fetchUsers(expenseID)
      setUsers(tmp)
    }

    const setExpenseTxnState = async () => {
      let tmp = await fetchExpenseTranscations(expenseID)
      setExpenses(tmp)
    }

    setUsersState()
    setExpenseTxnState()
  }, [])

  useEffect(() => {
    console.log(expenses)
  }, [expenses])

  useEffect(() => {
    console.log(paidBySelect)
  }, [paidBySelect])

  return (
    <Card className="w-[650px]">
      <CardHeader>
        <CardTitle>Expenses</CardTitle>
        <CardDescription>Add expenses</CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[400px] overflow-x rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="min-w-8">Paid For</TableHead>
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
                  <ComboBox
                    options={selectPaidByUserOptions}
                    value={paidBySelect}
                    setValue={setPaidBySelect}
                  />
                </TableCell>
                <TableCell className="text-right">
                  <Input id="amount-input" type="number" className="flex-1 text-right" placeholder="Amount" />
                </TableCell>
                <TableCell>
                  <SelectUsersPopover
                    selectedUsers={selectedUsers}
                    setSelectedUsers={setSelectedUsers}
                  />
                </TableCell>
                <TableCell>
                  <Button className="mr-2" variant="outline" onClick={() => {
                    let tmp = {
                      'expense_id': expenseID,
                      'paid_for': document.getElementById('paid-for-input').value,
                      'paid_by': { id: parseInt(paidBySelect) },
                      'amount': parseFloat(document.getElementById('amount-input').value),
                      'participants': selectedUsers
                    }
                    addExpenseTransaction(tmp)

                    document.getElementById('paid-for-input').value = ''
                    document.getElementById('amount-input').value = 0
                    setPaidBySelect('')
                    setSelectedUsers([])

                  }}>Add</Button>
                </TableCell>
              </TableRow>
              {
                expenses.map((expense) => (
                  <TableRow key={expense.id}>
                    <TableCell className="font-medium">{expense.paid_for}</TableCell>
                    <TableCell>
                      {expense.paid_by && expense.paid_by.name}
                    </TableCell>
                    <TableCell className="text-right">Rs. {new Intl.NumberFormat('en-IN', { maximumSignificantDigits: 3 }).format(expense.amount)}
                    </TableCell>
                    <TableCell className="text-right">
                      {expense.participants && users && expense.participants.length == users.length ? "All" : expense.participants && expense.participants.length + ""}
                    </TableCell>
                    <TableCell>
                      <Button className="mr-2 px-2" variant="outline" onClick={() => {
                        deleteExpenseTransaction(expense)
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
        <Button onClick={() => router.push(`/?expense_id=${expenseID}&active_page=users`)}>Previous</Button>

        <Button onClick={() => router.push(`/?expense_id=${expenseID}&active_page=settlement`)}>Next</Button>
      </CardFooter>
    </Card>
  )
}

export default ExpensesInput



export const fetchExpenseTranscations = async (expenseID) => {
  const response = await fetch(`/api/expense-transaction?expense_id=${expenseID}`);
  if (!response.ok) {
    throw new Error(`Response status: ${response.status}`);
  }
  const json = await response.json()
  return json.transactions
}