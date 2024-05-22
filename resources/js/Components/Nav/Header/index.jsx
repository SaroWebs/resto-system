import React, { useEffect } from 'react'

import { RiMenu2Fill } from "react-icons/ri";
import { AiOutlineClose } from "react-icons/ai";
import { FiSearch } from "react-icons/fi";

import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/react';
import DropdownNotification from '../Dropdown/Notification';
import UserAccount from '../Dropdown/UserAccount';

const Header = (props) => {
    const { sidebarOpen, setSidebarOpen, auth } = props;

    useEffect(() => {
      if(!auth.user){
        return 'this page is intended for logged in user only.. ';
      }
    }, [auth])
    
    return (
        <header className="sticky top-0 z-50 flex w-full bg-white shadow-sm">
            <div className="flex flex-grow items-center justify-between px-4 py-4 shadow-2 md:px-6 2xl:px-11">
                <div className="flex items-center gap-2 sm:gap-4 lg:hidden">
                    <button
                        aria-controls="sidebar"
                        onClick={(e) => {
                            e.stopPropagation();
                            props.setSidebarOpen(!props.sidebarOpen);
                        }}
                        className="z-50 p-1 shadow-sm lg:hidden"
                    >
                        {!sidebarOpen ? <RiMenu2Fill className='w-7 h-7' /> : <AiOutlineClose className='w-7 h-7' />}
                    </button>
                    <Link className="block flex-shrink-0 lg:hidden" href="/">
                        <ApplicationLogo />
                    </Link>
                </div>
                <div className="hidden sm:block">
                    <div className="">
                        <div className="relative">
                            <button className="absolute left-1 top-1/2 -translate-y-1/2">
                                <FiSearch className='w-7' />
                            </button>
                            <input
                                type="text"
                                placeholder="Type to search..."
                                className="w-full bg-transparent pl-9 pr-4 text-black focus:outline-none xl:w-125 rounded-full"
                            />
                        </div>
                    </div>
                </div>
                <div className="flex items-center gap-3 sm:gap-7 capitalize">
                    <ul className="flex items-center gap-2 sm:gap-4">
                        <DropdownNotification/>
                        <li>message</li>
                    </ul>
                    <UserAccount user={auth.user}/>
                </div>
            </div>
        </header>
    )
}

export default Header
