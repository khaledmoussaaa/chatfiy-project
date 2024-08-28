import React, { useEffect, useState } from "react";
import {
    Card,
    Avatar,
    Button,
    CardHeader,
    Typography,
    Menu,
    MenuHandler,
    MenuItem,
    MenuList,
} from "@material-tailwind/react";
import {
    Square3Stack3DIcon,
    UserCircleIcon,
} from "@heroicons/react/24/solid";

import { images } from "../../Constatnts/Images";
import { addOrAcceptFriend, myFriends, searchFriends } from "../../Api/Friends/Friends";
import { getUserId } from "../../Api/Api";

function Friends() {
    // Menu Data
    const data = [
        {
            label: "My Friends",
            value: "accepted",
            icon: Square3Stack3DIcon,
        },
        {
            label: "Friend Request",
            value: "pending",
            icon: UserCircleIcon,
        },
    ];

    // Use States
    const [friends, setFriends] = useState([]);
    const [filteredFriends, setFilteredFriends] = useState([]);
    const [selectedStatus, setSelectedStatus] = useState("accepted");
    const [update, setUpdate] = useState(0);
    const [search, setSearch] = useState('');

    // Fetch Friends
    useEffect(() => {
        const fetchFriends = async () => {
            try {
                const data = await myFriends(selectedStatus);
                setFriends(data.content);
                setFilteredFriends(data.content); // Initialize filtered friends
            } catch (error) {
                console.error("Error fetching friends:", error);
            }
        };

        fetchFriends();
    }, [update, selectedStatus]);

    // Search for New Friends
    useEffect(() => {
        if (search) {
            const fetchSearchedFriends = async () => {
                try {
                    const data = await searchFriends(search);
                    setFilteredFriends(data.content); // Update filtered friends with search results
                } catch (error) {
                    console.error("Error searching for friends:", error);
                }
            };
            fetchSearchedFriends();
        } else {
            // Reset to original friends list if search is cleared
            setFilteredFriends(friends);
        }
    }, [search, friends]);

    // Add Or Confirm Friend
    const addOrAccept = async (friend_id, status) => {
        try {
            await addOrAcceptFriend(friend_id, status);
            setUpdate((prev) => prev + 1);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div>
            <div className="flex justify-center gap-4">
                <div className="w-full max-w-sm min-w-[200px]">
                    <div className="relative">
                        <input
                            className="w-full pl-3 h-10 pr-28 py-2 bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-400 shadow-sm focus:shadow-md"
                            placeholder="Search, Name, Email" value={search} onChange={(e) => setSearch(e.target.value)}
                        />
                        <button className="absolute py-1.5 text-white text-sm right-1 top-1 my-auto px-3 flex items-center bg-blue-gray-900 rounded hover:bg-slate-700" type="button">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 mr-2">
                                <path fillRule="evenodd" d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z" clipRule="evenodd" />
                            </svg> Search
                        </button>
                    </div>
                </div>

                <Menu>
                    <MenuHandler>
                        <Button>Friends Filter</Button>
                    </MenuHandler>
                    <MenuList>
                        {data.map(({ label, value, icon }) => (
                            <MenuItem key={value} value={value} onClick={() => setSelectedStatus(value)}>
                                <div className="flex items-center gap-2">
                                    {React.createElement(icon, { className: "w-5 h-5" })}
                                    {label}
                                </div>
                            </MenuItem>
                        ))}
                    </MenuList>
                </Menu>
            </div>

            <section className="px-8 py-10">
                {filteredFriends.length === 0 ? (
                    <Typography variant="h5" color="blue-gray" className="text-center">
                        No friends found for this filter.
                    </Typography>
                ) : (
                    filteredFriends.map((friend) => (
                        <Card shadow={false} className="border border-gray-300 my-3" key={friend.id}>
                            <CardHeader shadow={false} floated={false} className="flex overflow-visible gap-y-4 flex-wrap items-start justify-between rounded-none">
                                <div className="h-20">
                                    <div className="flex items-center gap-2">
                                        <Avatar src={friend.media.original_url ?? images.profile}></Avatar>
                                        <Typography color="blue-gray" variant="h1" className="!text-xl mb-1 text-gray-700">{friend.name}</Typography>
                                    </div>
                                    <Typography color="blue-gray" className="!text-md font-normal text-gray-600">{friend.email}</Typography>
                                </div>
                                <div className="flex shrink-0 gap-2">
                                    {selectedStatus === 'accepted' && !friend.hasOwnProperty('isFriend') ? (
                                        <div className="flex gap-2">
                                            <Button size="sm" variant="outlined" className="border-gray-300" disabled>Friend</Button>
                                            <Button size="sm" variant="outlined" className="border-red-300" onClick={() => addOrAccept(friend.id, 'rejected')}>Deleted</Button>
                                        </div>
                                    ) : (
                                        <div className="flex gap-2">
                                            {friend.snedFriend_id !== getUserId() && !friend.hasOwnProperty('isFriend') ? (
                                                <div className="flex gap-2">
                                                    <Button size="sm" variant="filled" onClick={() => addOrAccept(friend.id, 'accepted')}>Accept</Button>
                                                    <Button size="sm" variant="outlined" className="border-gray-300" onClick={() => addOrAccept(friend.id, 'rejected')}>Rejected</Button>
                                                </div>
                                            ) : (
                                                friend.hasOwnProperty('isFriend') ? friend.isFriend === false ? 
                                                <Button size="sm" variant="filled" onClick={() => addOrAccept(friend.id, 'accepted')}>Add Friend</Button>
                                                : <Button size="sm" variant="filled" disabled>Friend</Button> 
                                                : <Button size="sm" variant="filled" disabled>Pending</Button>
                                            )}
                                        </div>
                                    )}
                                </div>
                            </CardHeader>
                        </Card>
                    ))
                )}
            </section>
        </div>
    );
}

export default Friends;
