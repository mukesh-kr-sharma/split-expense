"use client"

import { Button } from "@/components/custom/button";
import { Card, CardBody, CardDescription, CardTitle } from "@/components/custom/card";
import { ListItemWC, UList } from "@/components/custom/list";
import { useEffect, useState } from "react";
import { PencilSquareIcon, PlusCircleIcon, XCircleIcon } from '@heroicons/react/24/solid'

// export const metadata = {
//     title: 'Split Expense - Users',
//     description: 'This tool can help you to settle the expenses made by any people in a group.',
// };

const SettlementsPage = () => {

    const [displayPopover, setDisplayPopover] = useState(false)
    const [searchParticipantsText, setSearchParticipantsText] = useState("")

    useEffect(() => {
        const element_selector = ".popover-field"
        const onClick = (e) => {
            if (!e.target.matches(`${element_selector}, ${element_selector} *`)) {
                setDisplayPopover(false)
            }
        }
        document.addEventListener('click', onClick)
        return () => {
            window.removeEventListener('click', onClick)
        }
    }, [])

    const participants = ["Mukesh", "Rishabh", "Alisha", "Gourav", "Ajay"]
    const searchedParticipants = participants.filter((val) => val.toLocaleLowerCase().includes(searchParticipantsText))

    const settlements = [
        {
            id: 1,
            payee: 'Mukesh',
            receiver: 'Rishabh',
            amount: 2000
        },
        {
            id: 2,
            payee: 'Mukesh',
            receiver: 'Rishabh',
            amount: 2000
        },
        {
            id: 3,
            payee: 'Mukesh',
            receiver: 'Rishabh',
            amount: 2000
        },
    ]

    return <Card>
        <CardTitle>Settlement Suggestion</CardTitle>
        {/* <CardDescription>Add transactions for this expense report</CardDescription> */}
        <CardBody>
            <div className="overflow-auto [scrollbar-width:thin] pb-2 border border-slate-300 min-h-[300px] max-h-[600px]">
                <table className="w-full table-auto border-collapse">
                    <thead>
                        <tr>
                            <td className="px-3 py-2 border-b border-slate-300 text-gray-600 font-semibold">Payee</td>
                            <td className="px-3 py-2 border-b border-slate-300 text-gray-600 font-semibold">Receiver</td>
                            <td className="px-3 py-2 border-b border-slate-300 text-gray-600 font-semibold">Amount</td>
                        </tr>
                    </thead>
                    <tbody>
                        {settlements.map((txn, k_) => (
                            <tr>
                                <td className="px-3 py-2 border-y border-slate-300">{txn.payee}</td>
                                <td className="px-3 py-2 border-y border-slate-300">{txn.receiver}</td>
                                <td className="px-3 py-2 border-y border-slate-300">Rs. {txn.amount}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className='flex justify-between my-2'>
                <Button>Previous</Button>
                <Button>Next</Button>
            </div>
        </CardBody>
    </Card>

}

export default SettlementsPage