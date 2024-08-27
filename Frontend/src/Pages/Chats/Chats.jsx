import React, { useState } from 'react';
import Messages from './Messages';
import UserList from './UserList';

function Chats() {
    const [selectedChat, setSelectedChat] = useState(null); // Use null instead of an empty array

    const handleChatSelect = (chat_id, receiver_id) => {
        setSelectedChat({ chat_id, receiver_id });
    };

    console.log(selectedChat);
    

    return (
        <div className='h-full grid grid-rows-12 grid-cols-12 p-5'>
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
