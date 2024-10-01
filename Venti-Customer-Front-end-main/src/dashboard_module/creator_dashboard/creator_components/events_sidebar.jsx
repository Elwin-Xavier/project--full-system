/* eslint-disable no-unused-vars */
import React from 'react'
import { Link } from 'react-router-dom';
import { CalendarSearch } from 'lucide-react';
import { MdOutlineEventRepeat, MdEventAvailable, MdEvent, MdOutlineSummarize,MdOutlineCreateNewFolder } from "react-icons/md"

const Events_sidebar = () => {
    return (
        <div className=''>
            <div className="sm:hidden p-2 border-b text-md max-w-full font-medium text-center border-gray-200 dark:text-gray-400 dark:border-gray-700">
                <nav className="flex space-x-4">
                    <Link to="/creator/creator-events" className="border-b-2 border-transparent hover:text-rose-500 bg-transparent hover:border-rose-500 whitespace-nowrap">Events</Link>
                    <Link to="/creator/creator-events/coming-events" className="border-b-2 border-transparent hover:text-rose-500 bg-transparent hover:border-rose-500 whitespace-nowrap">Coming Events</Link>
                    <Link to="#" className="border-b-2 border-transparent hover:text-rose-500 bg-transparent hover:border-rose-500 whitespace-nowrap">Booked</Link>
                    <Link to="/creator/creator-events/summary" className="border-b-2 border-transparent hover:text-rose-500 bg-transparent hover:border-rose-500 whitespace-nowrap" aria-current="page">Summary</Link>
                </nav>
            </div>

            <div className="hidden col-span-2 min-w-fit h-screen sm:block mt-10 px-4 relative">
                <nav className="space-y-4  ">
                    <Link to="/creator/creator-events"
                        className="focus:bg-gray-100 items-center justify-center mt-5 px-4 py-2 rounded-md cursor-pointer flex dark:focus:bg-gray-200 hover:bg-gray-100 dark:hover:bg-gray-200 dark:focus:text-black dark:hover:text-gray-700 focus:outline-none">
                        <MdEvent className='h-6 w-6'/>
                        Events
                    </Link>
                    <Link to="/creator/creator-events/create-events"
                        className="focus:bg-gray-100 items-center justify-center  mt-5 cursor-pointer py-2 px-4 rounded-md transition flex dark:focus:bg-gray-200 hover:bg-gray-100 dark:hover:bg-gray-200 dark:focus:text-black dark:hover:text-gray-700  focus:outline-none">
                        <MdOutlineCreateNewFolder className='h-6 w-6'/>
                        Create
                    </Link>
                    <Link to="/creator/creator-events/coming-events"
                        className="focus:bg-gray-100 items-center justify-center mt-5 px-4 py-2 rounded-md cursor-pointer flex dark:focus:bg-gray-200 hover:bg-gray-100 dark:hover:bg-gray-200 dark:focus:text-black dark:hover:text-gray-700 focus:outline-none">
                        <MdOutlineEventRepeat className='h-6 w-6'/>
                        Coming
                    </Link>
                    <Link className="focus:bg-gray-100 items-center justify-center mt-5 px-4 py-2 rounded-md cursor-pointer flex dark:focus:bg-gray-200 hover:bg-gray-100 dark:hover:bg-gray-200 dark:focus:text-black dark:hover:text-gray-700 focus:outline-none">
                        <MdEventAvailable className='h-6 w-6' />
                        Booked
                    </Link>
                    <Link
                        to="/creator/creator-events/summary"
                        className="focus:bg-gray-100 items-center justify-center mt-5 px-4 py-2 rounded-md cursor-pointer flex dark:focus:bg-gray-200 hover:bg-gray-100 dark:hover:bg-gray-200 dark:focus:text-black dark:hover:text-gray-700 focus:outline-none">
                        <MdOutlineSummarize className='h-6 w-6' />
                        Report
                    </Link>
                </nav>
            </div>
        </div>
    )
}

export default Events_sidebar;