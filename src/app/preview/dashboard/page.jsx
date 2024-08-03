import { LinkBtn } from "@/components/custom/button";
import { Footer } from "@/components/custom/footer";
import { Header } from "@/components/custom/header";
import { Background } from "@/components/custom/ui";
import { auth, currentUser } from "@clerk/nextjs/server";

import { PlusCircleIcon } from "@heroicons/react/24/solid";
import { redirect } from "next/navigation";


const UserDashboard = async () => {

    const { userId } = auth();

    if (userId == null) {
        redirect("/preview")
    }

    const user = await currentUser()

    // Example data for expense groups (you might fetch this from an API)
    const expenseGroups = [
        { id: 1, name: 'Trip to Paris', description: 'Expenses for our Paris trip' },
        { id: 2, name: 'Office Supplies', description: 'Expenses for office supplies' },
        { id: 3, name: 'Dinner Party', description: 'Expenses for the dinner party' },
        { id: 4, name: 'Lunch Party', description: 'Expenses for the dinner party' },
        // { id: 5, name: 'Trip to Paris', description: 'Expenses for our Paris trip' },
        // { id: 6, name: 'Office Supplies', description: 'Expenses for office supplies' },
        // { id: 7, name: 'Dinner Party', description: 'Expenses for the dinner party' },
        // { id: 8, name: 'Lunch Party', description: 'Expenses for the dinner party' },
        // { id: 9, name: 'Trip to Paris', description: 'Expenses for our Paris trip' },
        // { id: 10, name: 'Office Supplies', description: 'Expenses for office supplies' },
        // { id: 11, name: 'Dinner Party', description: 'Expenses for the dinner party' },
        // { id: 12, name: 'Lunch Party', description: 'Expenses for the dinner party' },
    ];

    return (
        <Background>
            <Header />
            <div className="container p-4 mt-4 grow">
                <div className="flex justify-between">
                    <div>
                        <h1 className="mb-6 text-3xl font-bold text-gray-900">Your Expense Groups</h1>
                        <LinkBtn
                            href={"/preview/create-group"}
                            varient="blue"
                            className="inline-flex items-center mb-6"
                        >
                            <PlusCircleIcon className="mr-2 w-6 h-6" />
                            Create Expense Group
                        </LinkBtn>
                    </div>
                    <div>
                        <h1 className="mb-6 text-3xl font-bold text-gray-900">{"Welcome " + (user?.firstName ? user?.firstName : "") + "!"}</h1>
                    </div>
                </div>
                <div className="grid grid-cols-1 gap-6 mt-12 mb-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                    {expenseGroups.map((group) => (
                        <div
                            key={group.id}
                            className="p-6 bg-white rounded-lg shadow-lg transition-shadow duration-300 hover:shadow-2xl"
                        >
                            <h2 className="mb-3 text-2xl font-semibold text-gray-800">{group.name}</h2>
                            <p className="mb-4 text-gray-600">{group.description}</p>
                            <p className="text-sm text-gray-500">Date Created: {new Date(group.dateCreated).toLocaleDateString()}</p>
                        </div>
                    ))}
                </div>
            </div>
            <Footer />
        </Background>
    );
};

export default UserDashboard;
