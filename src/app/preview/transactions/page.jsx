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

const TransactionsPage = () => {

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

    const txns = [
        {
            id: 1,
            paid_for: 'Item 1',
            paid_by: 'Mukesh',
            amount: 2000,
            participants: ['Mukesh', 'Rishabh', 'Alisha']
        },
        {
            id: 2,
            paid_for: 'Item 2',
            paid_by: 'Rishabh',
            amount: 1000,
            participants: ['Rishabh', 'Alisha', 'Gourav']
        },
        {
            id: 3,
            paid_for: 'Item 3',
            paid_by: 'Alisha',
            amount: 4000,
            participants: ['Rishabh', 'Alisha', 'Ajay', 'Mukesh',]
        },
    ]

    return <Card>
        <CardTitle>Transactions</CardTitle>
        <CardDescription>Add transactions for this expense report</CardDescription>
        <CardBody>
            <div className="overflow-x-auto [scrollbar-width:thin] pb-2 border border-slate-300 min-h-[300px] max-h-[600px]">
                <table className="w-min table-auto border-collapse">
                    <thead>
                        <tr>
                            <td className="px-3 py-2 border-b border-slate-300 text-gray-600 font-semibold">Paid For</td>
                            <td className="px-3 py-2 border-b border-slate-300 text-gray-600 font-semibold">Paid By</td>
                            <td className="px-3 py-2 border-b border-slate-300 text-gray-600 font-semibold">Amount</td>
                            <td className="px-3 py-2 border-b border-slate-300 text-gray-600 font-semibold">Participants</td>
                            <td className="px-3 py-2 border-b border-slate-300 text-gray-600 font-semibold">Actions</td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="px-3 py-2 border-y border-slate-300">
                                <input type="text"
                                    className="px-3 py-1 mr-4 rounded-md border w-32 border-teal-800 text-sm"
                                    placeholder="Item Name" />
                            </td>
                            <td className="px-3 py-2 border-y border-slate-300">
                                <select className="px-3 py-1 mr-0 border border-teal-800 rounded-md text-sm" defaultValue={'DEFAULT'}>
                                    <option value="DEFAULT" disabled>Select User</option>
                                    <option>User 1</option>
                                    <option>User 2</option>
                                    <option>User 3</option>
                                </select>
                            </td>
                            <td className="px-3 py-2 border-y border-slate-300">
                                <div className="flex justify-between border border-teal-800 text-sm rounded-md">
                                    <span className="bg-white pl-3 pr-1 py-1 rounded-md text-gray-600">Rs. </span>
                                    <input type="text"
                                        className="pr-3 py-1 rounded-md w-16  focus:outline-none"
                                        placeholder="Item Name" />
                                </div>

                            </td>
                            <td className="px-3 py-2 border-y border-slate-300">
                                <div className="relative w-32 popover-field">
                                    <input type="text" placeholder="Participants"
                                        className="px-3 py-1 mr-4 w-full border border-teal-800 text-sm rounded-md"
                                        onClick={() => {
                                            setDisplayPopover(!displayPopover)
                                        }}
                                        onChange={(e) => {
                                            setSearchParticipantsText(e.target.value.toLocaleLowerCase())
                                            console.log(searchParticipantsText)
                                        }}
                                    />
                                    {displayPopover && (
                                        <div className="absolute top-8 border border-slate-400 w-40 rounded-md px-4 py-3 bg-white left-[50%] -translate-x-[50%]">
                                            <ul className="p-1">
                                                {searchedParticipants.length > 0 ? searchedParticipants.map((p, i) => (
                                                    <li key={i}>
                                                        <input type="checkbox" className="w-4 h-4 align-middle accent-teal-800" />
                                                        <label className="p-2 align-middle text-sm">{p}</label>
                                                    </li>
                                                )) : <li>
                                                    <label className="align-middle text-sm">No Result Found</label>
                                                </li>}
                                            </ul>
                                        </div>
                                    )}
                                </div>
                            </td>
                            <td className="px-3 py-2 border-y border-slate-300 flex justify-center">
                                <button className="align-middle">
                                    <PlusCircleIcon className="text-teal-700 size-7" />
                                </button>
                            </td>
                        </tr>
                        {txns.map((txn, k_) => (
                            <tr>
                                <td className="px-3 py-2 border-y border-slate-300">{txn.paid_for}</td>
                                <td className="px-3 py-2 border-y border-slate-300">{txn.paid_by}</td>
                                <td className="px-3 py-2 border-y border-slate-300">{txn.amount}</td>
                                <td className="px-3 py-2 border-y border-slate-300">
                                    <div className="flex whitespace-nowrap align-middle w-32  border rounded-lg border-teal-700 bg-teal-700">
                                        <div className="w-fit px-2 text-center rounded-s-lg border border-teal-700 bg-teal-700 text-white">
                                            {txn.participants.length == 4 ? "All" : txn.participants.length}
                                        </div>
                                        <div className="grow overflow-x-scroll [scrollbar-width:none] border rounded-e-lg">
                                            <input type="text" className="px-1 focus:outline-none" value={txn.participants.join(", ")} readOnly={true} />
                                        </div>
                                    </div>
                                </td>
                                <td className="px-3 py-2 border-y border-slate-300">
                                    <div className="justify-between text-center">
                                        <button className="align-middle">
                                            <XCircleIcon className="size-7 text-orange-600" />
                                        </button>
                                    </div>
                                </td>
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

export default TransactionsPage