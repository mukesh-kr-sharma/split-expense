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
import MyContext from "@/my-context"
import { useContext, useEffect, useState } from "react"

export function SelectUsersPopover({innerRef}) {
    const { context, setContext } = useContext(MyContext)
    const usersCount = context.users ? context.users.length : 0
    const [selectedUsers, setSelectedUsers] = useState([])

    useEffect(() => {
        console.log(selectedUsers)
        innerRef.current = selectedUsers
    }, [selectedUsers])

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
                        (checked) => checked ? setSelectedUsers(context.users) : setSelectedUsers([])}
                    />
                    <label htmlFor="selected-user-all" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">All</label>
                </div>
                {context.users && context.users.map((user, index) => (
                    <div className="flex items-center space-x-2 py-2" key={index}>
                        <Checkbox id={"selected-user-" + index} checked={selectedUsers.includes(user)} onCheckedChange={
                            (checked) => checked ?
                                setSelectedUsers([...selectedUsers, user]) :
                                setSelectedUsers(selectedUsers.filter((val) => val != user))
                        } />
                        <label htmlFor={"selected-user-" + index} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">{user}</label>
                    </div>
                ))}
            </PopoverContent>
        </Popover>
    )
}
