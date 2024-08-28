import {
    Input,
    Option,
    Select,
    Button,
    Dialog,
    Textarea,
    IconButton,
    Typography,
    DialogBody,
    DialogHeader,
    DialogFooter,
    Avatar
} from "@material-tailwind/react";
import { XMarkIcon } from "@heroicons/react/24/outline"; import React, { useEffect, useState } from 'react';
import { chatsUsers, getFriends, newChat } from '../../Api/Chats/Chats';

function UserList({ onChatSelected }) {
    const [chats, setChats] = useState([]);
    const [selectedUserId, setSelectedUserId] = useState(null);
    const [friends, setFriends] = useState([]);
    const [update, setUpdate] = useState(0);

    useEffect(() => {
        const getUserList = async () => {
            try {
                const data = await chatsUsers();
                setChats(data);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };
        getUserList();
    }, [update]);

    const handleUserClick = (chat_id, user_id, receiver_name) => {
        setSelectedUserId(user_id);
        onChatSelected(chat_id, user_id, receiver_name);
    };

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(!open);

    useEffect(() => {
        const getFriendsList = async () => {
            try {
                const data = await getFriends();
                setFriends(data.content);
            } catch (error) {
                console.error('Error fetching profile data:', error);
            }
        };
        getFriendsList();
    }, []);

    const addNewChat = async (user_id) => {
        try {
            const data = await newChat(user_id);
            setUpdate((prev) => prev + 1);
        } catch (error) {
            console.error('Error fetching profile data:', error);
        }
    }

    return (
        <div className='w-full'>
            <>
                <Button onClick={handleOpen} variant="gradient">
                    Add New Chat
                </Button>
                <Dialog size="sm" open={open} handler={handleOpen} className="p-4">
                    <DialogHeader className="relative m-0 block">
                        <Typography variant="h4" color="blue-gray">
                            Add New Chat
                        </Typography>
                        <IconButton
                            size="sm"
                            variant="text"
                            className="!absolute right-3.5 top-3.5"
                            onClick={handleOpen}
                        >
                            <XMarkIcon className="h-4 w-4 stroke-2" />
                        </IconButton>
                    </DialogHeader>
                    <DialogBody className="space-y-4 pb-6">
                        <div>
                            <Typography
                                variant="small"
                                color="blue-gray"
                                className="mb-2 text-left font-medium"
                            >
                            </Typography>
                            <Select
                                className="!w-full !border-[1.5px] !border-blue-gray-200/90 !border-t-blue-gray-200/90 bg-white text-gray-800 ring-4 ring-transparent placeholder:text-gray-600 focus:!border-primary focus:!border-t-blue-gray-900 group-hover:!border-primary"
                                placeholder="1"
                                labelProps={{
                                    className: "hidden",
                                }}
                            >
                                {friends.map((friend) => (
                                    <Option onClick={() => addNewChat(friend.id)}>{friend.name}</Option>
                                ))}
                            </Select>
                        </div>
                        <div className="flex gap-4">
                        </div>
                    </DialogBody>
                    <DialogFooter>
                        <Button className="ml-auto" onClick={handleOpen}>
                            Add New Chat
                        </Button>
                    </DialogFooter>
                </Dialog>
            </>
            <header className='mt-5 text-xl font-semibold text-gray-700'>Contacts</header>
            <ul className='flex flex-col'>
                {chats.map((user) => (
                    <li
                        key={user.id}
                        onClick={() => handleUserClick(user.chat_id, user.id, user.name)}
                        className={`flex items-center gap-2 p-2 cursor-pointer rounded-lg transition-colors ${selectedUserId === user.id ? 'bg-gray-200' : 'hover:bg-gray-100'
                            }`}
                    >
                        <Avatar
                            src={user.media}
                            size="sm"
                            variant="circular"
                            alt="User Avatar"
                            className="border-2 border-white"
                        />
                        <span>{user.name}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default UserList;
