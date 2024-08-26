import React, { useState } from 'react'
import Navbar from './Navbar'
import Sidebar from './Sidebar'
import { Outlet } from 'react-router-dom'

function Main() {
    const [isOverlayOpen, setIsOverlyOpen] = useState(false);
    const handleOpen = () => {
        console.log("aaaa");
        setIsOverlyOpen(!isOverlayOpen);
    }
    return (
        <div className='h-full grid grid-rows-12 grid-cols-12 relative'>
            {/* Sidebar */}
            <div className='md:col-span-1 sticky top-0 z-20 SideMenu'><Sidebar Open={handleOpen} /></div>

            {isOverlayOpen &&
                <div className="Overlay">
                    {/* test */}
                </div>
            }

            {/* Navbar */}
            <div className='row-span-1 col-span-12 md:col-span-11 sticky top-0 z-10 bg-white'><Navbar /></div>
            {/* Main */}
            <div className='row-span-11 col-span-12 md:col-span-12'><Outlet /></div>
        </div>
    )
}

export default Main
