import React, { useState } from 'react';
import Messages from './Messages';
import UserList from './UserList';

function Chats() {
    const [selectedChat, setSelectedChat] = useState(null); // Use null instead of an empty array

    const handleChatSelect = (chat_id, receiver_id, receiver_name) => {
        setSelectedChat({ chat_id, receiver_id, receiver_name });
    };

    return (
        <div className='h-full grid grid-rows-12 grid-cols-12 p-5 gap-3'>
            {/* UserList */}
            <div className='row-span-full md:col-span-2'>
                <UserList onChatSelected={handleChatSelect} />
            </div>
            {/* Messages */}
            <div className='row-span-full md:col-span-10'>
                <Messages selectedChat={selectedChat} />
            </div>
        </div>
    );
}

export default Chats;
