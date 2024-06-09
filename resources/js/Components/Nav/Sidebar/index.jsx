import { Link } from '@inertiajs/react';
import React, { Fragment, useEffect, useRef, useState } from 'react';
import SidebarLinkGroup from './SidebarLinkGroup';
import ApplicationLogo from '@/Components/ApplicationLogo';

const Sidebar = (props) => {
    const { sidebarOpen, setSidebarOpen } = props;
    const trigger = useRef();
    const sidebar = useRef();


    const pathname = window.location.pathname;
    const storedSidebarExpanded = localStorage.getItem('sidebar-expanded');

    const [sidebarExpanded, setSidebarExpanded] = useState(
        storedSidebarExpanded === null ? false : storedSidebarExpanded === 'true'
    );

    // close on click outside
    useEffect(() => {
        const clickHandler = ({ target }) => {
            if (!sidebar.current || !trigger.current) return;
            if (
                !sidebarOpen ||
                sidebar.current.contains(target) ||
                trigger.current.contains(target)
            )
                return;
            setSidebarOpen(false);
        };
        document.addEventListener('click', clickHandler);
        return () => document.removeEventListener('click', clickHandler);
    });

    // close if the esc key is pressed
    useEffect(() => {
        const keyHandler = ({ keyCode }) => {
            if (!sidebarOpen || keyCode !== 27) return;
            setSidebarOpen(false);
        };
        document.addEventListener('keydown', keyHandler);
        return () => document.removeEventListener('keydown', keyHandler);
    });

    useEffect(() => {
        localStorage.setItem('sidebar-expanded', sidebarExpanded.toString());
        if (sidebarExpanded) {
            document.querySelector('body')?.classList.add('sidebar-expanded');
        } else {
            document.querySelector('body')?.classList.remove('sidebar-expanded');
        }
    }, [sidebarExpanded]);

    return (
        <aside
            ref={sidebar}
            className={`absolute left-0 top-0 bottom-0 z-50 flex h-screen w-72 flex-col overflow-y-hidden bg-slate-200 duration-300 ease-linear lg:static lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'
                }`}
        >
            <div className="flex items-center justify-between gap-2 px-6 py-4 lg:py-6">
                <Link href="/">
                    <ApplicationLogo />
                </Link>
                <button
                    ref={trigger}
                    onClick={() => setSidebarOpen(!sidebarOpen)}
                    aria-controls="sidebar"
                    aria-expanded={sidebarOpen}
                    className="block lg:hidden"
                >
                    <svg
                        className="fill-current"
                        width="20"
                        height="18"
                        viewBox="0 0 20 18"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M19 8.175H2.98748L9.36248 1.6875C9.69998 1.35 9.69998 0.825 9.36248 0.4875C9.02498 0.15 8.49998 0.15 8.16248 0.4875L0.399976 8.3625C0.0624756 8.7 0.0624756 9.225 0.399976 9.5625L8.16248 17.4375C8.31248 17.5875 8.53748 17.7 8.76248 17.7C8.98748 17.7 9.17498 17.625 9.36248 17.475C9.69998 17.1375 9.69998 16.6125 9.36248 16.275L3.02498 9.8625H19C19.45 9.8625 19.825 9.4875 19.825 9.0375C19.825 8.55 19.45 8.175 19 8.175Z"
                            fill=""
                        />
                    </svg>
                </button>
            </div>
            <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
                <nav className="py-4 px-4 lg:mt-2 lg:px-6">
                    <div>
                        <h3 className="mb-4 ml-4 text-4xl font-bold text-slate-400">
                            MENU
                        </h3>
                        <ul className="mb-6 flex flex-col gap-1.5">
                            <SidebarLinkGroup activeCondition={pathname === '/' || pathname.includes('dashboard')}>
                                {(handleClick, open) => (
                                    <Fragment>
                                        <Link href="#"
                                            className={`group relative flex items-center gap-2 rounded-sm px-4 py-2 text-md font-medium text-slate-800 duration-300 ease-in-out hover:bg-slate-300 ${(pathname === '/' || pathname.includes('dashboard')) && 'bg-red-500 text-white'}`}
                                            onClick={(e) => {
                                                e.preventDefault();
                                                sidebarExpanded ? handleClick() : setSidebarExpanded(true);
                                            }}
                                        >
                                            Dashboard
                                            <svg
                                                className={`absolute right-4 top-1/2 -translate-y-1/2 fill-current ${open && 'rotate-180'}`}
                                                width="20"
                                                height="20"
                                                viewBox="0 0 20 20"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    clipRule="evenodd"
                                                    d="M4.41107 6.9107C4.73651 6.58527 5.26414 6.58527 5.58958 6.9107L10.0003 11.3214L14.4111 6.91071C14.7365 6.58527 15.2641 6.58527 15.5896 6.91071C15.915 7.23614 15.915 7.76378 15.5896 8.08922L10.5896 13.0892C10.2641 13.4147 9.73651 13.4147 9.41107 13.0892L4.41107 8.08922C4.08563 7.76378 4.08563 7.23614 4.41107 6.9107Z"
                                                    fill=""
                                                />
                                            </svg>
                                        </Link>
                                        {/* Dropdown Menu for Dashboard */}
                                        <div className={`translate transform overflow-hidden ${!open && 'hidden'}`}>
                                            <ul className="mt-4 mb-5.5 flex flex-col gap-2.5 pl-6">
                                                <li>
                                                    <Link
                                                        href="/dashboard"
                                                        className={({ isActive }) =>
                                                            'group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ' +
                                                            (isActive && '!text-white')
                                                        }
                                                    >
                                                        Overview
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link
                                                        href="/dashboard"
                                                        className={({ isActive }) =>
                                                            'group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ' +
                                                            (isActive && '!text-white')
                                                        }
                                                    >
                                                        Analytics
                                                    </Link>
                                                </li>
                                            </ul>
                                        </div>
                                        {/* Dropdown Menu End */}
                                    </Fragment>
                                )}
                            </SidebarLinkGroup>

                            <SidebarLinkGroup activeCondition={pathname.includes('products') || pathname.includes('categories')}>
                                {(handleClick, open) => (
                                    <Fragment>
                                        <Link href="#"
                                            className={`group relative flex items-center gap-2 rounded-sm px-4 py-2 text-md font-medium text-slate-800 duration-300 ease-in-out hover:bg-slate-300 ${(pathname.includes('products') || pathname.includes('categories') ) && 'bg-red-500 text-white'}`}
                                            onClick={(e) => {
                                                e.preventDefault();
                                                handleClick();
                                            }}
                                        >
                                            Product Management
                                            <svg
                                                className={`absolute right-4 top-1/2 -translate-y-1/2 fill-current ${open && 'rotate-180'}`}
                                                width="20"
                                                height="20"
                                                viewBox="0 0 20 20"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    clipRule="evenodd"
                                                    d="M4.41107 6.9107C4.73651 6.58527 5.26414 6.58527 5.58958 6.9107L10.0003 11.3214L14.4111 6.91071C14.7365 6.58527 15.2641 6.58527 15.5896 6.91071C15.915 7.23614 15.915 7.76378 15.5896 8.08922L10.5896 13.0892C10.2641 13.4147 9.73651 13.4147 9.41107 13.0892L4.41107 8.08922C4.08563 7.76378 4.08563 7.23614 4.41107 6.9107Z"
                                                    fill=""
                                                />
                                            </svg>
                                        </Link>
                                        <div className={`translate transform overflow-hidden ${!open && 'hidden'}`}>
                                            <ul className="mt-4 mb-5.5 flex flex-col gap-2.5 pl-6">
                                                <li>
                                                    <Link
                                                        href="/categories"
                                                        className={({ isActive }) =>
                                                            'group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ' +
                                                            (isActive && '!text-white')
                                                        }
                                                    >
                                                        Manage Categories
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link
                                                        href="/products"
                                                        className={({ isActive }) =>
                                                            'group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ' +
                                                            (isActive && '!text-white')
                                                        }
                                                    >
                                                        Manage Products
                                                    </Link>
                                                </li>
                                            </ul>
                                        </div>
                                    </Fragment>
                                )}
                            </SidebarLinkGroup>


                            <SidebarLinkGroup activeCondition={pathname.includes('orders')}>
                                {(handleClick, open) => (
                                    <Fragment>
                                        <Link href="#"
                                            className={`group relative flex items-center gap-2 rounded-sm px-4 py-2 text-md font-medium text-slate-800 duration-300 ease-in-out hover:bg-slate-300 ${pathname.includes('orders') && 'bg-red-500 text-white'}`}
                                            onClick={(e) => {
                                                e.preventDefault();
                                                handleClick();
                                            }}
                                        >
                                            Orders
                                            <svg
                                                className={`absolute right-4 top-1/2 -translate-y-1/2 fill-current ${open && 'rotate-180'}`}
                                                width="20"
                                                height="20"
                                                viewBox="0 0 20 20"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    clipRule="evenodd"
                                                    d="M4.41107 6.9107C4.73651 6.58527 5.26414 6.58527 5.58958 6.9107L10.0003 11.3214L14.4111 6.91071C14.7365 6.58527 15.2641 6.58527 15.5896 6.91071C15.915 7.23614 15.915 7.76378 15.5896 8.08922L10.5896 13.0892C10.2641 13.4147 9.73651 13.4147 9.41107 13.0892L4.41107 8.08922C4.08563 7.76378 4.08563 7.23614 4.41107 6.9107Z"
                                                    fill=""
                                                />
                                            </svg>
                                        </Link>
                                        <div className={`translate transform overflow-hidden ${!open && 'hidden'}`}>
                                            <ul className="mt-4 mb-5.5 flex flex-col gap-2.5 pl-6">
                                                <li>
                                                    <Link
                                                        href="/orders/manage"
                                                        className={({ isActive }) =>
                                                            'group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ' +
                                                            (isActive && '!text-white')
                                                        }
                                                    >
                                                        Manage Orders
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link
                                                        href="/orders/history"
                                                        className={({ isActive }) =>
                                                            'group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ' +
                                                            (isActive && '!text-white')
                                                        }
                                                    >
                                                        Order History
                                                    </Link>
                                                </li>
                                            </ul>
                                        </div>
                                    </Fragment>
                                )}
                            </SidebarLinkGroup>

                            <SidebarLinkGroup activeCondition={pathname.includes('inventory')}>
                                {(handleClick, open) => (
                                    <Fragment>
                                        <Link href="#"
                                            className={`group relative flex items-center gap-2 rounded-sm px-4 py-2 text-md font-medium text-slate-800 duration-300 ease-in-out hover:bg-slate-300 ${pathname.includes('inventory') && 'bg-red-500 text-white'}`}
                                            onClick={(e) => {
                                                e.preventDefault();
                                                handleClick();
                                            }}
                                        >
                                            Inventory
                                            <svg
                                                className={`absolute right-4 top-1/2 -translate-y-1/2 fill-current ${open && 'rotate-180'}`}
                                                width="20"
                                                height="20"
                                                viewBox="0 0 20 20"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    clipRule="evenodd"
                                                    d="M4.41107 6.9107C4.73651 6.58527 5.26414 6.58527 5.58958 6.9107L10.0003 11.3214L14.4111 6.91071C14.7365 6.58527 15.2641 6.58527 15.5896 6.91071C15.915 7.23614 15.915 7.76378 15.5896 8.08922L10.5896 13.0892C10.2641 13.4147 9.73651 13.4147 9.41107 13.0892L4.41107 8.08922C4.08563 7.76378 4.08563 7.23614 4.41107 6.9107Z"
                                                    fill=""
                                                />
                                            </svg>
                                        </Link>
                                        <div className={`translate transform overflow-hidden ${!open && 'hidden'}`}>
                                            <ul className="mt-4 mb-5.5 flex flex-col gap-2.5 pl-6">
                                                <li>
                                                    <Link
                                                        href="/inventory/manage"
                                                        className={({ isActive }) =>
                                                            'group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ' +
                                                            (isActive && '!text-white')
                                                        }
                                                    >
                                                        Manage Inventory
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link
                                                        href="/inventory/alerts"
                                                        className={({ isActive }) =>
                                                            'group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ' +
                                                            (isActive && '!text-white')
                                                        }
                                                    >
                                                        Stock Alerts
                                                    </Link>
                                                </li>
                                            </ul>
                                        </div>
                                    </Fragment>
                                )}
                            </SidebarLinkGroup>

                            <SidebarLinkGroup activeCondition={pathname.includes('recipe')}>
                                {(handleClick, open) => (
                                    <Fragment>
                                        <Link href="#"
                                            className={`group relative flex items-center gap-2 rounded-sm px-4 py-2 text-md font-medium text-slate-800 duration-300 ease-in-out hover:bg-slate-300 ${pathname.includes('recipe') && 'bg-red-500 text-white'}`}
                                            onClick={(e) => {
                                                e.preventDefault();
                                                handleClick();
                                            }}
                                        >
                                            Recipe Management
                                            <svg
                                                className={`absolute right-4 top-1/2 -translate-y-1/2 fill-current ${open && 'rotate-180'}`}
                                                width="20"
                                                height="20"
                                                viewBox="0 0 20 20"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    clipRule="evenodd"
                                                    d="M4.41107 6.9107C4.73651 6.58527 5.26414 6.58527 5.58958 6.9107L10.0003 11.3214L14.4111 6.91071C14.7365 6.58527 15.2641 6.58527 15.5896 6.91071C15.915 7.23614 15.915 7.76378 15.5896 8.08922L10.5896 13.0892C10.2641 13.4147 9.73651 13.4147 9.41107 13.0892L4.41107 8.08922C4.08563 7.76378 4.08563 7.23614 4.41107 6.9107Z"
                                                    fill=""
                                                />
                                            </svg>
                                        </Link>
                                        <div className={`translate transform overflow-hidden ${!open && 'hidden'}`}>
                                            <ul className="mt-4 mb-5.5 flex flex-col gap-2.5 pl-6">
                                                <li>
                                                    <Link
                                                        href="/recipe/manage"
                                                        className={({ isActive }) =>
                                                            'group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ' +
                                                            (isActive && '!text-white')
                                                        }
                                                    >
                                                        Manage Recipes
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link
                                                        href="/recipe/ingredients"
                                                        className={({ isActive }) =>
                                                            'group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ' +
                                                            (isActive && '!text-white')
                                                        }
                                                    >
                                                        Ingredients
                                                    </Link>
                                                </li>
                                            </ul>
                                        </div>
                                    </Fragment>
                                )}
                            </SidebarLinkGroup>

                            <SidebarLinkGroup activeCondition={pathname.includes('accounting')}>
                                {(handleClick, open) => (
                                    <Fragment>
                                        <Link href="#"
                                            className={`group relative flex items-center gap-2 rounded-sm px-4 py-2 text-md font-medium text-slate-800 duration-300 ease-in-out hover:bg-slate-300 ${pathname.includes('accounting') && 'bg-red-500 text-white'}`}
                                            onClick={(e) => {
                                                e.preventDefault();
                                                handleClick();
                                            }}
                                        >
                                            Accounting
                                            <svg
                                                className={`absolute right-4 top-1/2 -translate-y-1/2 fill-current ${open && 'rotate-180'}`}
                                                width="20"
                                                height="20"
                                                viewBox="0 0 20 20"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    clipRule="evenodd"
                                                    d="M4.41107 6.9107C4.73651 6.58527 5.26414 6.58527 5.58958 6.9107L10.0003 11.3214L14.4111 6.91071C14.7365 6.58527 15.2641 6.58527 15.5896 6.91071C15.915 7.23614 15.915 7.76378 15.5896 8.08922L10.5896 13.0892C10.2641 13.4147 9.73651 13.4147 9.41107 13.0892L4.41107 8.08922C4.08563 7.76378 4.08563 7.23614 4.41107 6.9107Z"
                                                    fill=""
                                                />
                                            </svg>
                                        </Link>
                                        <div className={`translate transform overflow-hidden ${!open && 'hidden'}`}>
                                            <ul className="mt-4 mb-5.5 flex flex-col gap-2.5 pl-6">
                                                <li>
                                                    <Link
                                                        href="/accounting/overview"
                                                        className={({ isActive }) =>
                                                            'group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ' +
                                                            (isActive && '!text-white')
                                                        }
                                                    >
                                                        Financial Overview
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link
                                                        href="/accounting/invoices"
                                                        className={({ isActive }) =>
                                                            'group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ' +
                                                            (isActive && '!text-white')
                                                        }
                                                    >
                                                        Invoices
                                                    </Link>
                                                </li>
                                            </ul>
                                        </div>
                                    </Fragment>
                                )}
                            </SidebarLinkGroup>

                            <SidebarLinkGroup activeCondition={pathname.includes('user-management')}>
                                {(handleClick, open) => (
                                    <Fragment>
                                        <Link href="#"
                                            className={`group relative flex items-center gap-2 rounded-sm px-4 py-2 text-md font-medium text-slate-800 duration-300 ease-in-out hover:bg-slate-300 ${pathname.includes('user-management') && 'bg-red-500 text-white'}`}
                                            onClick={(e) => {
                                                e.preventDefault();
                                                handleClick();
                                            }}
                                        >
                                            User Management
                                            <svg
                                                className={`absolute right-4 top-1/2 -translate-y-1/2 fill-current ${open && 'rotate-180'}`}
                                                width="20"
                                                height="20"
                                                viewBox="0 0 20 20"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    clipRule="evenodd"
                                                    d="M4.41107 6.9107C4.73651 6.58527 5.26414 6.58527 5.58958 6.9107L10.0003 11.3214L14.4111 6.91071C14.7365 6.58527 15.2641 6.58527 15.5896 6.91071C15.915 7.23614 15.915 7.76378 15.5896 8.08922L10.5896 13.0892C10.2641 13.4147 9.73651 13.4147 9.41107 13.0892L4.41107 8.08922C4.08563 7.76378 4.08563 7.23614 4.41107 6.9107Z"
                                                    fill=""
                                                />
                                            </svg>
                                        </Link>
                                        <div className={`translate transform overflow-hidden ${!open && 'hidden'}`}>
                                            <ul className="mt-4 mb-5.5 flex flex-col gap-2.5 pl-6">
                                                <li>
                                                    <Link
                                                        href="/user-management/accounts"
                                                        className={({ isActive }) =>
                                                            'group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ' +
                                                            (isActive && '!text-white')
                                                        }
                                                    >
                                                        Manage Accounts
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link
                                                        href="/user-management/roles"
                                                        className={({ isActive }) =>
                                                            'group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ' +
                                                            (isActive && '!text-white')
                                                        }
                                                    >
                                                        Manage Roles
                                                    </Link>
                                                </li>
                                            </ul>
                                        </div>
                                    </Fragment>
                                )}
                            </SidebarLinkGroup>

                            {/* Help & Support Section */}
                            <SidebarLinkGroup
                                activeCondition={pathname.includes('support')}
                            >
                                {(handleClick, open) => {
                                    return (
                                        <Fragment>
                                            <Link href="#"
                                                className={`group relative flex items-center gap-2 rounded-sm px-4 py-2 text-md font-medium text-slate-800 duration-300 ease-in-out hover:bg-slate-300 ${pathname.includes('support') && 'bg-red-500 text-white'}`}
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    handleClick();
                                                }}
                                            >
                                                Help &amp; Support
                                                <svg
                                                    className={`absolute right-4 top-1/2 -translate-y-1/2 fill-current ${open && 'rotate-180'}`}
                                                    width="20"
                                                    height="20"
                                                    viewBox="0 0 20 20"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        clipRule="evenodd"
                                                        d="M4.41107 6.9107C4.73651 6.58527 5.26414 6.58527 5.58958 6.9107L10.0003 11.3214L14.4111 6.91071C14.7365 6.58527 15.2641 6.58527 15.5896 6.91071C15.915 7.23614 15.915 7.76378 15.5896 8.08922L10.5896 13.0892C10.2641 13.4147 9.73651 13.4147 9.41107 13.0892L4.41107 8.08922C4.08563 7.76378 4.08563 7.23614 4.41107 6.9107Z"
                                                        fill=""
                                                    />
                                                </svg>
                                            </Link>
                                            <div className={`translate transform overflow-hidden ${!open && 'hidden'}`}>
                                                <ul className="mt-4 mb-5.5 flex flex-col gap-2.5 pl-6">
                                                    <li>
                                                        <Link
                                                            href="/support/documentation"
                                                            className={({ isActive }) =>
                                                                'group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ' +
                                                                (isActive && '!text-white')
                                                            }
                                                        >
                                                            Documentation
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link
                                                            href="/support/faq"
                                                            className={({ isActive }) =>
                                                                'group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ' +
                                                                (isActive && '!text-white')
                                                            }
                                                        >
                                                            FAQs
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link
                                                            href="/support/contact"
                                                            className={({ isActive }) =>
                                                                'group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ' +
                                                                (isActive && '!text-white')
                                                            }
                                                        >
                                                            Contact Us
                                                        </Link>
                                                    </li>
                                                </ul>
                                            </div>
                                        </Fragment>
                                    );
                                }}
                            </SidebarLinkGroup>
                        </ul>
                    </div>
                </nav>
            </div>

            <div className="absolute bottom-0 laft-0 right-0 bg-slate-800 text-white w-full p-2">
                <div className="flex justify-between items-center gap-1 text-xs">
                    <span className="">copyright &copy; {'2024'}</span>
                    <span className="">v1.0.0</span>
                </div>
            </div>
        </aside>
    );
}

export default Sidebar;
