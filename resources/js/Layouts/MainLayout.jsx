import Header from '@/Components/Nav/Header';
import Sidebar from '@/Components/Nav/Sidebar';
import React, { useState } from 'react'

const MainLayout = (props) => {
    const { children, user } = props;
    const [sidebarOpen, setSidebarOpen] = useState(false);
    return (
        <div>
            <div className="flex h-screen overflow-hidden">
                <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
                <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
                    <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
                    <main>
                        <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
                            {children}
                        </div>
                    </main>
                </div>
            </div>
        </div>
    )
}

export default MainLayout
