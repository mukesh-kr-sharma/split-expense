"use client"

import { Btn } from '@/components/custom/button';
import { Footer } from '@/components/custom/footer';
import { Header } from '@/components/custom/header';
import { Toast, status } from '@/components/custom/ui';
import { useEffect, useState } from 'react';
import { useUser } from '@clerk/nextjs';
import { redirect } from 'next/navigation';


const CreateGroup = () => {

    const [toast, setToast] = useState()
    const { user } = useUser();
    const [redirectTo, setRedirectTo] = useState("")

    useEffect(() => {
        if (redirectTo != "")
            redirect(redirectTo)
    }, [redirectTo])

    const createExpenseGroup = async (formData) => {
        const response = await fetch(`/preview/api/expense-group`, {
            method: 'POST',
            body: formData,
        });
        if (!response.ok)
            throw new Error(`adding expense transaction failed: ${response.status} : ${response.statusText}`);

        const result = await response.json();
        return result;
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setToast({ display: true, message: 'Creating group', status: status.LOADING })
        try {
            const formData = new FormData(e.target)
            let res = await createExpenseGroup(formData)
            console.log(res)
            setToast({ display: true, message: 'Group created', status: status.SUCCESS })
            setTimeout(() => {
                setToast()
                setRedirectTo(`/preview/group/${res.id}/users`)
            }, 2000)
        } catch (error) {
            setToast({ display: true, message: '', status: status.ERROR })
        }
    };

    return (
        <div className="flex flex-col p-0 m-0 min-h-screen bg-gradient-to-tr from-blue-50 via-cyan-50 to-yellow-100">
            <Toast toast={toast} />
            <Header />
            <div className='grow'>
                <div className='flex justify-center p-8 align-middle'>
                    <div className="p-8 w-full max-w-md bg-white rounded-lg shadow-lg">
                        <h1 className="mb-6 text-3xl font-bold text-center text-gray-900">Create New Group</h1>
                        <hr className='mb-8' />
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label htmlFor="name" className="block mb-1 text-sm font-medium text-gray-700">Group Name</label>
                                <input
                                    type="text" id="name" name="name" required
                                    className="px-4 py-2 w-full rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div>
                                <label htmlFor="description" className="block mb-1 text-sm font-medium text-gray-700">Description</label>
                                <textarea
                                    id="description" name="description" rows="4"
                                    className="px-4 py-2 w-full rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div className='flex gap-4'>
                                <input
                                    id="visibility" name="is_public" type='checkbox' value={true}
                                    className="mt-0.5 accent-red-600 size-4 shadow-sm focus:outline-none"
                                />
                                <label htmlFor="visibility" className="mb-1 text-sm font-medium text-gray-700">Do you like this group to be publicly accessible?</label>
                            </div>
                            <input type='hidden' name="created_by" value={user?.id || ''} />
                            <div className="flex justify-end">
                                <Btn type="submit" varient="blue">
                                    Create Group
                                </Btn>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default CreateGroup;
