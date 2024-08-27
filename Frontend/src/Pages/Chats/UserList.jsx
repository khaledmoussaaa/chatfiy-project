import { Avatar } from '@material-tailwind/react';
import React, { useEffect, useState } from 'react';
import { chatsUsers } from '../../../Api/Chats/Chats';

function UserList({ onChatSelected }) {
    const [chats, setChats] = useState([]);

    useEffect(() => {
        const getUserList = async () => {
            try {
                const data = await chatsUsers();
                setChats(data);
            } catch (error) {
                console.error('Error fetching posts:', error);
            }
        };
        getUserList();
    }, []);

    return (
        <div className='w-full'>
            <header className='mb-5 text-xl font-semibold text-gray-700'>Contacts</header>
            <ul className='*:flex *:items-center *:gap-2'>
                {chats.map((user, index) => (
                    <li key={index} onClick={() => onChatSelected(user.chat_id, user.id)}>
                        <Avatar src={user.media} size="sm" variant="circular" alt="User Avatar" className="border-2 border-white hover:z-10" />
                        <span>{user.name}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default UserList;
