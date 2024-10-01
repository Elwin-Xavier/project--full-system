/* eslint-disable no-unused-vars */
import React from 'react'
import { Link } from 'react-router-dom'
import { Outlet } from 'react-router-dom'

const Events_layout = () => {
    return (
        <div className="py-6 sm:py-8 lg:py-12">
            <div className="max-w-screen px-4 md:px-8">
                <div className="mb-10 md:mb-16">
                    <h2 className="mb-4 text-center text-2xl font-bold md:mb-6 lg:text-3xl">Join Our Events</h2>
                    <p className="max-w-screen text-center md:text-lg">Explore the most recent and exciting events happening around you. Stay informed and engaged with our curated list of activities.</p>
                </div>
                <div className="mb-4 border-b ">
                    <ul className="flex flex-wrap -mb-px font-medium text-center text-xl" >
                        <li className="me-2">
                            <Link to='/events' className="inline-block p-4 rounded-t-lg hover:text-rose-600 hover:border-gray-300 dark:hover:text-rose-500 focus:text-rose-500 active:text-rose-500">All Events</Link>
                        </li>
                        <li className="me-2">
                            <Link to="/events/my-events" className="inline-block p-4 rounded-t-lg hover:text-rose-600 hover:border-gray-300 dark:hover:text-rose-500 focus:text-rose-500 active:text-rose-500" >My Bookings</Link>
                        </li>
                    </ul>
                </div>
                <Outlet />
            </div>
        </div>
    )
}

export default Events_layout