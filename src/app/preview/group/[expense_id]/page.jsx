"use client";

import { Footer } from "@/components/custom/footer";
import { Header } from "@/components/custom/header";
import { Background } from "@/components/custom/ui";
import { useState } from 'react';

export default function page({ params }) {
    const expense_id = params.expense_id

    /// Chat GPT code starts 
    const [users, setUsers] = useState([]);
    const [newUserName, setNewUserName] = useState('');
    const [editUserId, setEditUserId] = useState(null);
    const [confirmDeleteId, setConfirmDeleteId] = useState(null);
    const [settlementsVisible, setSettlementsVisible] = useState(false);
    const [showTransactionModal, setShowTransactionModal] = useState(false);
    const [transactions, setTransactions] = useState([]);
    const [newTransaction, setNewTransaction] = useState({
        itemName: '',
        paidBy: '',
        amount: '',
        participants: []
    });
    const [selectedParticipants, setSelectedParticipants] = useState([]);

    // Add user to the list
    const addUser = () => {
        if (newUserName.trim()) {
            setUsers([...users, { id: Date.now(), name: newUserName }]);
            setNewUserName('');
        }
    };

    // Handle Enter key press
    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            addUser();
        }
    };

    // Edit user details
    const editUser = (id, newName) => {
        setUsers(users.map(user => user.id === id ? { ...user, name: newName } : user));
        setEditUserId(null);
    };

    // Delete user
    const deleteUser = (id) => {
        setUsers(users.filter(user => user.id !== id));
        setConfirmDeleteId(null);
    };

    // Handle input changes
    const handleTransactionInputChange = (e) => {
        const { name, value } = e.target;
        setNewTransaction(prev => ({ ...prev, [name]: value }));
    };

    // Handle participants change
    const handleParticipantChange = (e) => {
        const { value, checked } = e.target;
        setSelectedParticipants(prev =>
            checked
                ? [...prev, value]
                : prev.filter(participant => participant !== value)
        );
        setNewTransaction(prev => ({ ...prev, participants: selectedParticipants }));
    };

    // Handle 'All' checkbox
    const handleSelectAllParticipants = (e) => {
        if (e.target.checked) {
            setSelectedParticipants(users.map(user => user.id.toString()));
            setNewTransaction(prev => ({ ...prev, participants: users.map(user => user.id.toString()) }));
        } else {
            setSelectedParticipants([]);
            setNewTransaction(prev => ({ ...prev, participants: [] }));
        }
    };

    // Add transaction
    const addTransaction = () => {
        if (newTransaction.itemName.trim() && newTransaction.paidBy && newTransaction.amount) {
            setTransactions([...transactions, { ...newTransaction, id: Date.now() }]);
            setNewTransaction({
                itemName: '',
                paidBy: '',
                amount: '',
                participants: []
            });
            setSelectedParticipants([]);
            setShowTransactionModal(false);
        }
    };

    // Delete transaction
    const deleteTransaction = (id) => {
        setTransactions(transactions.filter(transaction => transaction.id !== id));
    };

    // Edit transaction
    const editTransaction = (id) => {
        const transaction = transactions.find(t => t.id === id);
        setNewTransaction(transaction);
        setShowTransactionModal(true);
    };

    /// Chat gpt code ends
    return (
        <Background>
            <Header />
            <main className="grow p-4 h-0">
                <div className="container h-full min-h-80 mx-auto grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                    {/* Users Section */}
                    <div className="h-full overflow-auto [scrollbar-width:thin] bg-white/50 shadow-md rounded-lg p-4">
                        <h2 className="text-xl font-semibold mb-4">Users</h2>
                        <div className="flex flex-col sm:flex-row sm:items-center mb-4">
                            <input
                                type="text"
                                value={newUserName}
                                onChange={(e) => setNewUserName(e.target.value)}
                                onKeyDown={handleKeyPress}
                                placeholder="Enter username"
                                className="border rounded-lg px-3 py-2 mb-2 sm:mb-0 sm:mr-2 flex-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <button
                                onClick={addUser}
                                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200"
                            >
                                Add
                            </button>
                        </div>
                        <ul>
                            {users.map(user => (
                                <li key={user.id} className="flex flex-col sm:flex-row items-center justify-between mb-3 p-2 border rounded-lg bg-gray-50">
                                    {editUserId === user.id ? (
                                        <input
                                            type="text"
                                            defaultValue={user.name}
                                            onBlur={(e) => editUser(user.id, e.target.value)}
                                            className="border rounded-lg px-3 py-2 mr-2 flex-1"
                                        />
                                    ) : (
                                        <span className="flex-1">{user.name}</span>
                                    )}
                                    {editUserId === user.id ? (
                                        <button
                                            onClick={() => editUser(user.id, user.name)}
                                            className="text-green-500 ml-2 hover:text-green-700"
                                        >
                                            Save
                                        </button>
                                    ) : (
                                        <button
                                            onClick={() => setEditUserId(user.id)}
                                            className="text-yellow-500 ml-2 hover:text-yellow-600"
                                        >
                                            Edit
                                        </button>
                                    )}
                                    <button
                                        onClick={() => setConfirmDeleteId(user.id)}
                                        className="text-red-500 ml-2 hover:text-red-600"
                                    >
                                        &#x2715;
                                    </button>
                                    {confirmDeleteId === user.id && (
                                        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
                                            <div className="bg-white p-6 rounded-lg shadow-lg">
                                                <p className="mb-4">Are you sure you want to delete {user.name}?</p>
                                                <div className="flex justify-end space-x-4">
                                                    <button
                                                        onClick={() => deleteUser(user.id)}
                                                        className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                                                    >
                                                        Yes
                                                    </button>
                                                    <button
                                                        onClick={() => setConfirmDeleteId(null)}
                                                        className="bg-gray-300 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500"
                                                    >
                                                        No
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Transactions Section */}
                    <div className="h-full overflow-auto [scrollbar-width:thin] bg-white/50 shadow-md rounded-lg p-4 col-span-2">
                        <h2 className="text-xl font-semibold mb-4">Transactions</h2>
                        <div className="flex justify-between">
                            <button
                                onClick={() => setShowTransactionModal(true)}
                                className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 mb-4"
                            >
                                Add Transaction Details
                            </button>
                            <button
                                onClick={() => setSettlementsVisible(true)}
                                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
                            >
                                Suggest Settlement
                            </button>
                        </div>
                        <table className="w-full border-collapse bg-white shadow-md rounded-lg">
                            <thead>
                                <tr className="border-b bg-gray-100">
                                    <th className="p-2 text-left">Item Name</th>
                                    <th className="p-2 text-left">Paid By</th>
                                    <th className="p-2 text-left">Amount</th>
                                    <th className="p-2 text-left">Participants</th>
                                    <th className="p-2 text-left">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {transactions.map(transaction => (
                                    <tr key={transaction.id} className="border-b">
                                        <td className="p-2">{transaction.itemName}</td>
                                        <td className="p-2">{users.find(user => user.id === transaction.paidBy)?.name || '-'}</td>
                                        <td className="p-2">{transaction.amount}</td>
                                        <td className="p-2">{transaction.participants.map(p => users.find(u => u.id.toString() === p)?.name).join(', ')}</td>
                                        <td className="p-2">
                                            <button
                                                onClick={() => editTransaction(transaction.id)}
                                                className="text-yellow-500 hover:text-yellow-600 mr-2"
                                            >
                                                Edit
                                            </button>
                                            <button
                                                onClick={() => deleteTransaction(transaction.id)}
                                                className="text-red-500 hover:text-red-600"
                                            >
                                                &#x2715;
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Settlements Section */}
                    {settlementsVisible && (
                        <div className="bg-white shadow-md rounded-lg p-4 col-span-1 md:col-span-2 lg:col-span-3 relative">
                            <button
                                onClick={() => setSettlementsVisible(false)}
                                className="absolute top-2 right-2 text-red-500 hover:text-red-700 focus:outline-none"
                                aria-label="Close"
                            >
                                &#x2715;
                            </button>
                            <h2 className="text-xl font-semibold mb-4">Settlements</h2>
                            <p className="text-gray-600">This section will contain information about settlements.</p>
                        </div>
                    )}
                </div>

                {/* Transaction Modal */}
                {showTransactionModal && (
                    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
                        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
                            <h2 className="text-xl font-semibold mb-4">Add Transaction</h2>
                            <form onSubmit={(e) => { e.preventDefault(); addTransaction(); }}>
                                <div className="mb-4">
                                    <label htmlFor="itemName" className="block text-gray-700 mb-2">Item Name</label>
                                    <input
                                        id="itemName"
                                        name="itemName"
                                        type="text"
                                        value={newTransaction.itemName}
                                        onChange={handleTransactionInputChange}
                                        className="border rounded-lg px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="paidBy" className="block text-gray-700 mb-2">Paid By</label>
                                    <select
                                        id="paidBy"
                                        name="paidBy"
                                        value={newTransaction.paidBy}
                                        onChange={handleTransactionInputChange}
                                        className="border rounded-lg px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    >
                                        <option value="">Select User</option>
                                        {users.map(user => (
                                            <option key={user.id} value={user.id}>{user.name}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="amount" className="block text-gray-700 mb-2">Amount</label>
                                    <div className="flex items-center border rounded-lg">
                                        <span className="px-3 text-gray-600">₹</span>
                                        <input
                                            id="amount"
                                            name="amount"
                                            type="number"
                                            value={newTransaction.amount}
                                            onChange={handleTransactionInputChange}
                                            className="border-none flex-1 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-700 mb-2">Participants</label>
                                    <div className="flex flex-wrap gap-4">
                                        <label className="flex items-center">
                                            <input
                                                type="checkbox"
                                                value="all"
                                                checked={selectedParticipants.length === users.length}
                                                onChange={handleSelectAllParticipants}
                                                className="mr-2"
                                            />
                                            All
                                        </label>
                                        {users.map(user => (
                                            <label key={user.id} className="flex items-center">
                                                <input
                                                    type="checkbox"
                                                    value={user.id}
                                                    checked={selectedParticipants.includes(user.id.toString())}
                                                    onChange={handleParticipantChange}
                                                    className="mr-2"
                                                />
                                                {user.name}
                                            </label>
                                        ))}
                                    </div>
                                </div>
                                <div className="flex justify-end">
                                    <button
                                        type="submit"
                                        className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
                                    >
                                        Add Transaction
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </main>
            <Footer />
        </Background>
    )
}