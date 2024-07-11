"use client";

import { ModeToggle } from "@/components/mode";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { useEffect, useState } from "react";
import Header from "@/components/header";
import UsersInput from "@/components/users-input";
import MyContext from "@/my-context";
import ExpensesInput from "@/components/expenses-input";
import SettlementSuggestion from "@/components/settlement";



export default function Home() {

  
  const [context, setContext] = useState({})

  useEffect(() => {
    console.log(context)
  }, [context])


  return (
    <div className="flex flex-col h-screen">
      <MyContext.Provider value={{ context, setContext }}>
        <Header />

        <main className="container flex-1 flex justify-center items-center">
          <UsersInput />
          <ExpensesInput />
          <SettlementSuggestion />
        </main>

      </MyContext.Provider>
    </div>
  )
}
