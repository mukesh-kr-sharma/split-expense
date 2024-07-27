"use client";

import { useRouter, useSearchParams } from 'next/navigation'
import { Button } from "@/components/ui/button";

import { Suspense, useEffect, useState } from "react";
import Header from "@/components/header";
import UsersInput from "@/components/users-input";
import ExpensesInput from "@/components/expenses-input";
import SettlementSuggestion from "@/components/settlement";
import { Input } from '@/components/ui/input';

function HomePage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [expenseID, setExpenseID] = useState(undefined)
  const [expenseIdInputField, setExpenseIdInputField] = useState("")
  const [activePage, setActivePage] = useState("")

  const generateExpenseID = async () => {
    try {
      const res = await fetch('/api/expense', { method: 'POST' })
      if (!res.ok)
        throw new Error(`Response status: ${res.status}`);
      const json = await res.json();
      router.push(`/?expense_id=${json.id}`)
    } catch (error) {
      console.error(error.message);
    }
  }

  useEffect(() => {
    setExpenseID(searchParams.get("expense_id"))
    setActivePage(searchParams.get("active_page"))
  }, [searchParams])

  return (
    <div className="flex flex-col h-screen">
      <Header />

      <main className="container flex-1 flex justify-center items-center flex-col">
        {expenseID !== undefined && expenseID !== null ? (
          <>
            {(activePage === "users" || activePage === undefined || activePage == null) && <UsersInput />}
            {activePage === "transactions" && <ExpensesInput />}
            {activePage === "settlement" && <SettlementSuggestion />}
          </>
        ) : (
          <>
            <Button onClick={generateExpenseID}>Create New Expense Report</Button>
            <br />
            <p>Or</p>
            <br />
            <div className='flex flex-row'>
              <Input type="text" placeholder="Enter Expense Report ID"
                onChange={(e) => setExpenseIdInputField(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && router.push(`/?expense_id=${expenseIdInputField}`)}
              />
              <Button onClick={() => router.push(`/?expense_id=${expenseIdInputField}`)}>Enter</Button>
            </div>
          </>
        )}
      </main>
    </div>
  )
}

export default function Home() {
  return <Suspense>
    <HomePage />
  </Suspense>

}
