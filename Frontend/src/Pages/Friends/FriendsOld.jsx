import React, { useEffect, useState } from "react";
import {
    Card,
    Button,
    CardBody,
    CardHeader,
    Typography,
} from "@material-tailwind/react";
import { myFriends, addOrAccept, searchFriends } from "../../Api/Friends/Friends";

function Friends() {
    const [friends, setFriends] = useState([]);
    const [selectedStatus, setSelectedStatus] = useState("accepted");
    const [searchQuery, setSearchQuery] = useState("");
    const [filteredFriends, setFilteredFriends] = useState([]);

    useEffect(() => {
        const fetchFriends = async () => {
            try {
                const data = await myFriends(selectedStatus);
                setFriends(data.content);
            } catch (error) {
                console.error('Error fetching friends:', error);
            }
        };

        const fetchFilteredFriends = async () => {
            try {
                const data = await searchFriends(searchQuery);
                setFilteredFriends(data.content);
            } catch (error) {
                console.error('Error searching friends:', error);
            }
        };

        if (searchQuery) {
            fetchFilteredFriends();
        } else {
            fetchFriends();
        }
    }, [selectedStatus, searchQuery]);

    const handleFriendAction = async (friend_id, action) => {
        try {
            await addOrAccept(friend_id, action);
            const data = await myFriends(selectedStatus);
            setFriends(data.content);
        } catch (error) {
            console.error('Error handling friend action:', error);
        }
    };

    const getButtonText = (status) => {
        switch (status) {
            case "accepted":
                return "Friends";
            case "pending":
                return "Accept";
            case "rejected":
                return "Add Friend";
            default:
                return "";
        }
    };

    return (
        <div>
            <div className="flex flex-col items-center gap-5 mb-4">
                <div className="w-full max-w-sm min-w-[200px] mx-auto">
                    <div className="relative flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="absolute w-5 h-5 top-2.5 left-2.5 text-slate-500">
                            <path fillRule="evenodd" d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z" clipRule="evenodd" />
                        </svg>

                        <input
                            className="w-full pl-10 h-10 pr-3 py-2 bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-400 shadow-sm focus:shadow-md"
                            placeholder="Search..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                </div>

                <div className="w-full flex justify-center mb-4">
                    <div className="flex space-x-4">
                        <Button
                            variant={selectedStatus === "accepted" ? "filled" : "outlined"}
                            color="gray"
                            onClick={() => setSelectedStatus("accepted")}
                        >
                            Accepted
                        </Button>
                        <Button
                            variant={selectedStatus === "pending" ? "filled" : "outlined"}
                            color="gray"
                            onClick={() => setSelectedStatus("pending")}
                        >
                            Pending
                        </Button>
                        <Button
                            variant={selectedStatus === "rejected" ? "filled" : "outlined"}
                            color="gray"
                            onClick={() => setSelectedStatus("rejected")}
                        >
                            Rejected
                        </Button>
                    </div>
                </div>
            </div>

            <section className="px-8 py-10">
                {(searchQuery ? filteredFriends : friends).map((friend) => (
                    <Card key={friend.id} shadow={false} className="border border-gray-300 mb-4">
                        <CardHeader
                            shadow={false}
                            floated={false}
                            className="flex overflow-visible gap-y-4 flex-wrap items-start justify-between rounded-none"
                        >
                            <div>
                                <Typography
                                    color="blue-gray"
                                    variant="h1"
                                    className="!text-2xl mb-1"
                                >
                                    {friend.name}
                                </Typography>
                                <Typography
                                    color="blue-gray"
                                    className="!text-lg font-normal text-gray-600"
                                >
                                    {friend.email}
                                </Typography>
                            </div>
                            <div className="flex shrink-0 gap-2">
                                <Button
                                    size="sm"
                                    variant="outlined"
                                    className="border-gray-300"
                                    onClick={() => {
                                        const action = selectedStatus === "pending" ? "accepted" : "rejected";
                                        handleFriendAction(friend.id, action);
                                    }}
                                >
                                    {friend.isFriend ? "Friends" : getButtonText(selectedStatus)}
                                </Button>
                            </div>
                        </CardHeader>
                        <CardBody className="grid xl:grid-cols-3 grid-cols-1 gap-4 px-4">
                        </CardBody>
                    </Card>
                ))}
            </section>
        </div>
    );
}

export default Friends;
