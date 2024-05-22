import React, { useEffect, useRef, useState } from 'react'
import { Link } from '@inertiajs/react';
import { FaRegUser } from "react-icons/fa6";


const UserAccount = (props) => {
    const { user } = props;
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const trigger = useRef();
    const dropdown = useRef();

    useEffect(() => {
        const clickHandler = ({ target }) => {
            if (!dropdown.current) return;
            if (
                !dropdownOpen ||
                dropdown.current.contains(target) ||
                trigger.current.contains(target)
            )
                return;
            setDropdownOpen(false);
        };
        document.addEventListener('click', clickHandler);
        return () => document.removeEventListener('click', clickHandler);
    });

    useEffect(() => {
        const keyHandler = ({ keyCode }) => {
            if (!dropdownOpen || keyCode !== 27) return;
            setDropdownOpen(false);
        };
        document.addEventListener('keydown', keyHandler);
        return () => document.removeEventListener('keydown', keyHandler);
    });

    return (
        <div className="relative">
            <button
                ref={trigger}
                onClick={(e) => {
                    setDropdownOpen(!dropdownOpen);
                }}
                className="relative flex h-10 w-10 items-center justify-center rounded-full border-[0.5px] border-stroke bg-gray hover:text-primary"
            >
                <img src={user.profile_image} alt="" className="w-12 rounded-full border p-1" />
                {/* <FaRegUser className='w-8 h-8' /> */}
            </button>
            <div ref={dropdown}
                onFocus={() => setDropdownOpen(true)}
                onBlur={() => setDropdownOpen(false)}
                className={`absolute -right-27 mt-2 flex h-90 w-60 flex-col rounded-md border border-stroke bg-white shadow-md sm:right-0 sm:w-60 ${dropdownOpen === true ? 'block' : 'hidden'
                    }`}>
                <div className="py-2 px-4">
                    <h3 className="text-xl font-bold text-gray-600">
                        Hi, {user.name}
                    </h3>
                </div>
                <ul className="flex h-auto flex-col overflow-y-auto">
                    <li>
                        <Link
                            className="flex flex-col gap-2 border-t border-stroke px-4 py-3 hover:bg-gray-2"
                            href='/'
                        >
                            <span className="capitalise">Settings</span>
                        </Link>
                    </li>
                    <li>
                        <Link
                            className="flex flex-col gap-2 border-t border-stroke px-4 py-3 hover:bg-gray-2"
                            href={route('profile.edit')}
                        >
                            <span className="capitalise">profile</span>
                        </Link>
                    </li>
                    <li>
                        <Link
                            className="flex flex-col gap-2 border-t border-stroke px-4 py-3 hover:bg-gray-2"
                            href={route('logout')}
                            method="post"
                        >
                            <span className="capitalise">log out</span>
                        </Link>
                    </li>
                </ul>

            </div>
        </div>
    )
}

export default UserAccount
