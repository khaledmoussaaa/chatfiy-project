import React, { useEffect, useState } from 'react';
import { fetchUsers, deleteUser } from '../../../Api/Users/Users';
import { NavLink } from 'react-router-dom';
import 'react-loading-skeleton/dist/skeleton.css'
import SekeletonTables from '../../Components/Skeleton/SekeletonTables';

function Users(props) {
    // States
    const [users, setUsers] = useState([]);
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [loading, setLoading] = useState(true); // Set initial loading state to true

    // Fetch Users
    useEffect(() => {
        const getUsers = async () => {
            try {
                const data = await fetchUsers();
                setUsers(data);
                setLoading(false)
            } catch (error) {
                console.error('Error fetching users:', error);
                setLoading(true)
            }
        };
        getUsers();
    }, []);

    // Toggle user selection
    const toggleUserSelection = (userId) => {
        const isSelected = selectedUsers.includes(userId);
        if (isSelected) {
            setSelectedUsers(selectedUsers.filter(id => id !== userId));
        } else {
            setSelectedUsers([...selectedUsers, userId]);
        }
    };

    // Delete selected users
    const deleteSelectedUsers = async () => {
        try {
            await Promise.all(selectedUsers.map(id => deleteUser(id)));
            setUsers(users.filter(user => !selectedUsers.includes(user.id))); // Remove deleted users from local state
            setSelectedUsers([]);
        } catch (error) {
            console.error('Error deleting users:', error);
        }
    };

    // Select All Checkbox by Users IDs
    const selectAllUsers = () => {
        if (selectedUsers.length === users.length) {
            setSelectedUsers([]);
        } else {
            const userIds = users.map((user) => user.id);
            setSelectedUsers(userIds);
        }
    };

    // Check if a user is selected
    const isSelected = (userId) => selectedUsers.includes(userId);

    return (
        <div className="overflow-auto w-full h-full p-2">
            <div className="sm:rounded-lg flex flex-col gap-3">
                <div>
                    <NavLink className={'p-2 float-right text-white text-sm rounded-md bg-slate-500'} to={'/dashboard/create'}>Create User</NavLink>
                    <div className="flex justify-between items-center mb-3">
                        <button className="text-red-500 cursor-pointer" onClick={deleteSelectedUsers} disabled={selectedUsers.length === 0}>Delete Selected</button>
                    </div>
                </div>
                <div className='w-full h-full relative'>
                    {loading ? (
                        <SekeletonTables height={30} length={users.length > 0 ? users.length : 5} />
                    ) : (
                        <table className="w-full absolute text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 shadow-md">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50  dark:text-gray-400">
                                <tr>
                                    <th scope="col" className="p-4">
                                        <div className="flex items-center">
                                            <input
                                                id="checkbox-all-search"
                                                type="checkbox"
                                                onClick={selectAllUsers}
                                                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                                checked={selectedUsers.length === users.length}
                                            />
                                            <label htmlFor="checkbox-all-search" className="sr-only">Select All</label>
                                        </div>
                                    </th>
                                    <th className="px-6 py-3">ID</th>
                                    <th className="px-6 py-3">Name</th>
                                    <th className="px-6 py-3">Email</th>
                                    <th className="px-6 py-3">Phone</th>
                                    <th className="px-6 py-3">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map((user, index) => (
                                    <tr key={index} className="bg-white border-b-2 border-gray-50 hover:bg-gray-50 dark:hover:bg-gray-100">
                                        <td className="w-4 p-4">
                                            <div className="flex items-center">
                                                <input
                                                    id={`checkbox-table-${index}`}
                                                    type="checkbox"
                                                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                                    checked={isSelected(user.id)}
                                                    onChange={() => toggleUserSelection(user.id)}
                                                />
                                                <label htmlFor={`checkbox-table-${index}`} className="sr-only">Select User</label>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">{user.id}</td>
                                        <td className="px-6 py-4">{user.name}</td>
                                        <td className="px-6 py-4">{user.email}</td>
                                        <td className="px-6 py-4">{user.phone}</td>
                                        <td className="px-6 py-4 flex gap-2">
                                            <NavLink className={'text-blue-500'} to={`/dashboard/edit/${user.id}`}>Edit</NavLink>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Users;
