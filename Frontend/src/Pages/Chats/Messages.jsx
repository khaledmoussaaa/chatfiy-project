import { Avatar } from '@material-tailwind/react';
import React, { useEffect, useState } from 'react';
import { messagesUsers, sendMessage } from '../../../Api/Chats/Chats';
import Pusher from 'pusher-js';
import { getUserId } from '../../../Api/Api';
import dayjs from 'dayjs';
import isToday from 'dayjs/plugin/isToday'; // Import the isToday plugin

dayjs.extend(isToday); // Extend dayjs with the isToday plugin

function Messages({ selectedChat }) {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');

    const chat_id = selectedChat?.chat_id;
    const receiver_id = selectedChat?.receiver_id;
    const auth = getUserId();

    // Get Messages Between Users
    useEffect(() => {
        if (chat_id) {
            const getMessagesUsers = async () => {
                try {
                    const data = await messagesUsers(chat_id);
                    const groupedMessages = groupMessagesByDate(data.content);
                    setMessages(groupedMessages);
                } catch (error) {
                    console.error('Error fetching messages..', error);
                }
            };

            getMessagesUsers();
        }
    }, [receiver_id]);

    useEffect(() => {
        Pusher.logToConsole = true;

        const pusher = new Pusher('9dcc0082ae400746d639', {
            cluster: 'ap2',
            encrypted: true,
        });

        const channel = pusher.subscribe(`messages.${receiver_id}`);
        channel.bind('MessageSent', function (data) {
            const newMessage = data.content;
            const groupedMessages = groupMessagesByDate([...messages.flat(), newMessage]);
            setMessages(groupedMessages);
        });

    }, [receiver_id, messages]);

    // Group messages by date
    const groupMessagesByDate = (messages) => {
        return messages.reduce((groups, message) => {
            const date = dayjs(message.created_at).format('YYYY-MM-DD');
            if (!groups[date]) {
                groups[date] = [];
            }
            groups[date].push(message);
            return groups;
        }, {});
    };

    // Send Message
    const sendNewMessage = async () => {
        try {
            await sendMessage(chat_id, newMessage);
            const data = await messagesUsers(chat_id);
            const groupedMessages = groupMessagesByDate(data.content);
            setMessages(groupedMessages);
            setNewMessage(''); // Clear the input after sending
        } catch (error) {
            console.error('Error in sending message..', error);
        }
    }

    return (
        <div className='w-full h-full flex flex-col'>
            <header className='mb-5 text-xl font-semibold text-gray-700'>Chats With Khaled</header>
            <div className='border w-full h-full rounded-2xl relative overflow-hidden flex flex-col'>
                <div className='overflow-y-auto h-[calc(100%-70px)]'>
                    {Object.keys(messages).map((date) => (
                        <div key={date}>
                            <header className='w-fit my-5 mx-auto py-2 px-3 text-center bg-gray-200 text-gray-700 rounded-3xl'>
                                {dayjs(date).isToday() ? 'Today' : dayjs(date).format('dddd, MMMM D')}
                            </header>
                            {messages[date].map((message) => (
                                <div key={message.id} className={`flex items-center mx-2 gap-3 max-w-xl ${message.user_id == auth ? 'ml-auto flex-row-reverse' : 'mr-auto'}`}>
                                    <Avatar
                                        size="sm"
                                        variant="circular"
                                        alt="User Avatar"
                                        src={message.media}
                                        className="border-2 border-white hover:z-10"
                                    />
                                    <p className={`p-3 my-2 ${message.user_id == auth ? 'bg-orange-50 text-black' : 'bg-purple-50'} rounded-2xl ${message.user_id == auth ? 'rounded-br-sm' : 'rounded-bl-sm'}`}>
                                        {message.message}
                                    </p>
                                </div>
                            ))}
                        </div>
                    ))}
                </div>

                <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex w-[95%] flex-row items-center gap-2 rounded-[99px] border border-gray-200 bg-gray-100 p-1">
                    <div className="relative grid h-full w-full min-w-[200px]">
                        <textarea
                            rows="1"
                            placeholder="Your Message"
                            className="peer h-full min-h-full w-full resize-y rounded-[7px] !border-0 border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder:text-blue-gray-300 placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:border-transparent focus:border-t-transparent focus:outline-0 disabled:resize-none disabled:border-0 disabled:bg-blue-gray-50"
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}>
                        </textarea>
                        <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all before:content-none after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all after:content-none peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500"></label>
                    </div>
                    <div>
                        <button onClick={sendNewMessage} className="relative h-10 max-h-[40px] w-10 max-w-[40px] select-none rounded-full text-center align-middle font-sans text-xs font-medium uppercase text-gray-900 transition-all hover:bg-gray-900/10 active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none">
                            <span className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
                                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M12.9576 7.71521C13.0903 7.6487 13.2019 7.54658 13.2799 7.42027C13.3579 7.29396 13.3992 7.14845 13.3992 7.00001C13.3992 6.85157 13.3579 6.70606 13.2799 6.57975C13.2019 6.45344 13.0903 6.35132 12.9576 6.28481L1.75762 0.68481C1.61875 0.615383 1.46266 0.587838 1.30839 0.605509C1.15412 0.623179 1.00801 0.685281 0.888948 0.783508C0.769888 0.881735 0.683237 1.01165 0.64189 1.15523C0.600542 1.2988 0.60612 1.44915 0.657315 1.58981L2.83095 7.00001L0.657315 12.4102C0.60612 12.5509 0.600542 12.7012 0.64189 12.8448C0.683237 12.9884 0.769888 13.1183 0.888948 13.2165C1.00801 13.3147 1.15412 13.3768 1.30839 13.3945C1.46266 13.4122 1.61875 13.3846 1.75762 13.3152L12.9576 7.71521Z"
                                        fill="currentColor"></path>
                                </svg>
                            </span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Messages;
