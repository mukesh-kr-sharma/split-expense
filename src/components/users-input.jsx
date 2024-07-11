"use client"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Fragment, useContext, useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, } from "@/components/ui/card"

import MyContext from "@/my-context";


const UsersInput = () => {
    const { context, setContext } = useContext(MyContext)
    const [users, setUsers] = useState([]);

    const addUser = () => {
        let inputElement = document.getElementById("user-name-input");
        let inputValue = inputElement.value;
        if (!(inputValue == "" || users.includes(inputValue)))
            setUsers([...users, inputValue]);
        inputElement.value = "";
    }

    useEffect(() => {
        setContext({ ...context, users })
    }, [users])

    return (
        <Card className="w-[500px]" id="add-user-card">
            <CardHeader>
                <CardTitle>Users</CardTitle>
                <CardDescription>Add users for this expense report</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="flex w-full items-center space-x-2">
                    <Input id="user-name-input" type="text" className="flex-1" placeholder="Name" onKeyDown={(e) => e.key === "Enter" && addUser()} />
                    <Button type="submit" onClick={addUser}>Add</Button>
                </div>
                <ScrollArea className="h-[300px] w-full rounded-md border p-4 mt-4">
                    {users.map((user) => (
                        <Fragment key={user}>
                            <div className="flex flex-row justify-between">
                                <p className="text-sm">{user}</p>
                                <button className="m-0 border px-1.5 bg-slate-700 text-white rounded-full text-xs" onClick={() => setUsers(users.filter((currUser => currUser != user)))}>X</button>
                            </div>
                            <Separator className="my-2" />
                        </Fragment>
                    ))}
                </ScrollArea>

            </CardContent>
            <CardFooter>
                <Button onClick={() => {
                    document.getElementById("add-user-card").classList.add("hidden");
                    document.getElementById("settlement-card").classList.add("hidden");
                    document.getElementById("add-expense-card").classList.remove("hidden");
                }}>Next</Button>
            </CardFooter>
        </Card>
    )
}

export default UsersInput