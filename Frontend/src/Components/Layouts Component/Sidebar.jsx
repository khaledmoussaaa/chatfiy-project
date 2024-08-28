import React from 'react';
import { NavLink } from 'react-router-dom';
import {
    IconButton,
    Typography,
    List,
    ListItem,
    ListItemPrefix,
    Drawer,
    Card,
} from "@material-tailwind/react";
import {
    UserCircleIcon,
    InboxIcon,
    PowerIcon,
    UsersIcon
} from "@heroicons/react/24/solid";
import {
    Bars3Icon,
    HomeIcon,
    XMarkIcon,
} from "@heroicons/react/24/outline";
import useAuthContext from "../../Context/AuthContext";

const menuItems = [
    {
        icon: <HomeIcon className="h-5 w-5" />,
        title: 'Timeline',
        navigate: '/timeline/posts',
    },
    {
        icon: <InboxIcon className="h-5 w-5" />,
        title: 'Inbox',
        navigate: '/timeline/chats',
    },
    {
        icon: <UserCircleIcon className="h-5 w-5" />,
        title: 'Profile',
        navigate: '/timeline/profile',
    },
    {
        icon: <UsersIcon className="h-5 w-5" />,
        title: 'Friends',
        navigate: '/timeline/friends',
    },
    {
        icon: <PowerIcon className="h-5 w-5" />,
        title: 'Logout',
        navigate: '/logout',
        action: 'logout',
    },
];

function Sidebar({ Open }) {
    const { logout } = useAuthContext();
    const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);

    const openDrawer = () => {
        setIsDrawerOpen(true)
        Open();
    };
    const closeDrawer = () => {
        setIsDrawerOpen(false)
        Open();
    };

    const handleItemClick = (item) => {
        if (item.action === 'logout') {
            logout();
        }
        closeDrawer();
    };

    return (
        <>
            <IconButton variant="text" size="lg" onClick={openDrawer} className='m-3'>
                {isDrawerOpen ? (
                    <XMarkIcon className="h-8 w-8 stroke-2" />
                ) : (
                    <Bars3Icon className="h-8 w-8 stroke-2" />
                )}
            </IconButton>
            <Drawer open={isDrawerOpen} onClose={closeDrawer} overlay={false}>
                <Card
                    color="transparent"
                    shadow={false}
                    className="h-[calc(100vh-2rem)] w-full p-4"
                >
                    <div className="mb-2 flex items-center gap-4 p-4">
                        <img
                            src="/src/assets/images/Logo-Dark.png"
                            alt="brand"
                            className="h-8 w-8"
                        />
                        <Typography variant="h5" color="blue-gray">
                            Chatify
                        </Typography>
                    </div>
                    <List>
                        {menuItems.map((item, index) => (
                            <React.Fragment key={index}>
                                <NavLink
                                    to={item.navigate}
                                    onClick={() => handleItemClick(item)}
                                >
                                    <ListItem>
                                        <ListItemPrefix>
                                            {item.icon}
                                        </ListItemPrefix>
                                        {item.title}
                                  
                                    </ListItem>
                                </NavLink>
                                {index === 1 && <hr className="my-2 border-blue-gray-50" />}
                            </React.Fragment>
                        ))}
                    </List>
                </Card>
            </Drawer>
        </>
    );
}

export default Sidebar;
