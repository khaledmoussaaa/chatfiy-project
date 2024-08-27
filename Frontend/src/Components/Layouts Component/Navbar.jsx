import React from 'react'
import { Avatar, Badge } from "@material-tailwind/react";
import Header from '../Auth Component/Header';
import { getMedia } from '../../Api/Api';

function Navbar() {
    const media = getMedia();
    return (
        <>
            <nav className='w-full h-full p-4 flex items-center justify-between'>
                <Header header="Posts" subheader="Hi, Please enter your details." />
                <Badge placement="top-end" overlap="circular" color="green" withBorder>
                    <Avatar src={`${media}`} alt="avatar" />
                </Badge>
            </nav>
        </>
    )
};

export default Navbar