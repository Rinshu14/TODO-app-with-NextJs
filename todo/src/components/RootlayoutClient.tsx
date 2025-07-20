'use client'
import React from 'react'
import Header from "./Header"
import useCentralStore from '@/app/store/CentralStore'
import SideBar from './SideBar'

const RootlayoutClient = ({ children, userData, taskData }: any) => {

    const isSidebarOpen = useCentralStore((state) => state.isSidebarOpen)

    return (
        <div className='h-[100dvh] w-full grid grid-rows-[auto_1fr]'>
            <Header userData={userData} taskData={taskData} />
            <div className={`relative h-full w-full grid  ${isSidebarOpen ? "grid-cols-[2fr_1fr]" : "grid-cols-1"}`} >
                <main className='h-full'>
                    {children}
                </main>
                {isSidebarOpen &&
                    <SideBar />
                }

            </div>

        </div>
    )
}

export default RootlayoutClient