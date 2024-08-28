import React, { useEffect, useState } from 'react'
import { Avatar, Badge } from "@material-tailwind/react";
import Header from '../Auth Component/Header';
import { getAuth, getMedia } from '../../Api/Api';
import { images } from '../../Constatnts/Images';

function Navbar() {
    const media = getMedia();
    const [auth, setAuth] = useState([getAuth()]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const authData = await getAuth();
                setAuth(authData);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <>
            <nav className=' p-4 fixed top-0 right-0'>
                <div className='flex items-center justify-between'>
                    <Header header={auth.name} subheader={auth.email} />
                    <Badge placement="top-end" overlap="circular" color="green" withBorder>
                        <Avatar src={`${media ?? images.profile}`} alt="avatar" />
                    </Badge>
                </div>
            </nav>
        </>
    )
};

export default Navbar