import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Check, ChevronsUpDown } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"

import { useEffect, useState } from "react"
import { fetchUsers } from "./users-input"
import { useSearchParams } from "next/navigation"

export function SelectUsersPopover({ selectedUsers, setSelectedUsers }) {
    const [users, setUsers] = useState([]);
    const usersCount = users ? users.length : 0

    const searchParams = useSearchParams()

    const expenseID = searchParams.get("expense_id")

    useEffect(() => {
        const setUsersState = async () => {
            let tmp = await fetchUsers(expenseID)
            setUsers(tmp)
        }
        setUsersState()
    }, [])

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button variant="outline">
                    {selectedUsers.length == usersCount ? "All" : selectedUsers.length + ""}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="">
                <div className="flex items-center space-x-2 py-2">
                    <Checkbox id="selected-user-all" checked={usersCount == selectedUsers.length} onCheckedChange={
                        (checked) => checked ? setSelectedUsers(users.map((user) => {
                            delete user['expense_id']
                            return user
                        })) : setSelectedUsers([])}
                    />
                    <label htmlFor="selected-user-all" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">All</label>
                </div>
                {users?.map((user) => (
                    <div className="flex items-center space-x-2 py-2" key={user.id}>
                        <Checkbox id={"selected-user-" + user} checked={selectedUsers.includes(user)} onCheckedChange={(checked) => {
                            delete user['expense_id']
                            checked ?
                                setSelectedUsers([...selectedUsers, user]) :
                                setSelectedUsers(selectedUsers.filter((val) => val.id != user.id))
                        }
                        } />
                        <label htmlFor={"selected-user-" + user} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">{user.name}</label>
                    </div>
                ))}
            </PopoverContent>
        </Popover>
    )
}
