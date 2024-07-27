"use client"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Fragment, useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, } from "@/components/ui/card"

import { useRouter, useSearchParams } from "next/navigation";


const UsersInput = () => {
    const router = useRouter()
    const searchParams = useSearchParams()
    const expenseID = searchParams.get("expense_id")
    const [users, setUsers] = useState([]);

    const addUser = async () => {
        let inputElement = document.getElementById("user-name-input");
        let inputValue = inputElement.value;
        if (!(inputValue == "" || users.includes(inputValue))) {
            try {
                const response = await fetch("/api/expense-user", {
                    method: 'POST',
                    body: JSON.stringify({ expense_id: expenseID, name: inputValue })
                })
                if (!response.ok) {
                    throw new Error(`adding expense user failed: ${response.status}`);
                }
                const json = await response.json();
                console.log("Expense user added", json);
                setUsers([...users, json]);
            } catch (error) {
                console.error(error.message);
            }
        }
        inputElement.value = "";
    }

    const deleteUser = async (userToDelete) => {
        try {
            const response = await fetch("/api/expense-user", {
                method: 'DELETE',
                body: JSON.stringify(userToDelete)
            })
            if (!response.ok) {
                throw new Error(`deleting expense user failed: ${response.status}`);
            }
            const deletedUser = await response.json();
            setUsers(users.filter((currUser => currUser.id != deletedUser.id)))
            console.log("Expense user deleted", deletedUser)
        } catch (error) {
            console.error(error.message);
        }
    }

    useEffect(() => {

        const setUsersState = async () => {
            let tmp = await fetchUsers(expenseID)
            setUsers(tmp)
        }
        setUsersState()
    }, [])


    return (
        <Card className="w-[500px]">
            <CardHeader>
                <CardTitle>Users</CardTitle>
                <CardDescription>Add users for this expense report</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="flex w-full items-center space-x-2">
                    <Input id="user-name-input" type="text" className="flex-1" placeholder="Name"
                        onKeyDown={(e) => e.key === "Enter" && addUser()} />
                    <Button type="submit" onClick={addUser}>Add</Button>
                </div>
                <ScrollArea className="h-[300px] w-full rounded-md border p-4 mt-4">
                    {users.map((user) => (
                        <Fragment key={user.id}>
                            <div className="flex flex-row justify-between">
                                <p className="text-sm">{user.name}</p>
                                <button className="m-0 border px-1.5 bg-slate-700 text-white rounded-full text-xs"
                                    onClick={() => deleteUser(user)}
                                >
                                    X
                                </button>
                            </div>
                            <Separator className="my-2" />
                        </Fragment>
                    ))}
                </ScrollArea>

            </CardContent>
            <CardFooter className="flex justify-between">
                <Button onClick={() => router.push(`/`)}>Previous</Button>
                <Button onClick={() => router.push(`/?expense_id=${expenseID}&active_page=transactions`)}>Next</Button>
            </CardFooter>
        </Card>
    )
}

export default UsersInput

// Global function
export const fetchUsers = async (expenseID) => {
    const response = await fetch(`/api/expense-user?expense_id=${expenseID}`);
    if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
    }
    const json = await response.json();
    return json.users
}