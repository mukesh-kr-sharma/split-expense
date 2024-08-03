"use client";

import { Button } from "@/components/custom/button";
import { Card, CardBody, CardDescription, CardTitle } from "@/components/custom/card";
import { ListItemWC, UList } from "@/components/custom/list";

// export const metadata = {
//     title: 'Split Expense - Users',
//     description: 'This tool can help you to settle the expenses made by any people in a group.',
// };

const UsersPage = () => (
    <Card>
        <CardTitle>Users</CardTitle>
        <CardDescription>Add users for this expense report</CardDescription>
        <CardBody>
            <div className='flex justify-between'>
                <input type="text" placeholder='Enter Name' className='grow px-4 py-2.5 mr-4 rounded-md border min-w-24 border-teal-800' />
                <Button>Add</Button>
            </div>
            <div className='border rounded-md my-4'>
                <UList>
                    <ListItemWC>User 1</ListItemWC>
                    <ListItemWC>User 2</ListItemWC>
                    <ListItemWC>User 3</ListItemWC>
                </UList>
            </div>
            <div className='flex justify-between my-2'>
                <Button>Previous</Button>
                <Button>Next</Button>
            </div>
        </CardBody>
    </Card>

)

export default UsersPage