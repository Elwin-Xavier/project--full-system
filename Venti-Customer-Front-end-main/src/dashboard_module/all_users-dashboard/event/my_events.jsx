/* eslint-disable no-unused-vars */
import React from 'react'
import { Download } from 'lucide-react';
import { Link } from 'react-router-dom';

const My_events = () => {
    const events = [
        {
            time: '08:00 - 09:00',
            title: 'Opening remarks',
            link: '#',
        },
        {
            time: '09:00 - 10:00',
            title: 'Bergside LLC: Controlling the video traffic flows',
            link: '#',
        },
        {
            time: '16:00 - 14:00',
            title: 'Scaling your brand from €0 to multimillion euros',
            link: '#',
        },
    ];
    return (
        <>
            <div className="w-full px-4 py-8">
                <section className="space-y-6">
                    {events.map((event, index) => (
                        <div key={index} className="flex flex-col lg:flex-row items-start lg:items-center justify-between border-b border-gray-200 dark:border-gray-700 pb-6">
                            <div className="flex flex-col lg:flex-row lg:items-center space-y-2 lg:space-y-0 lg:space-x-6 flex-grow">
                                <p className="w-full lg:w-48 text-lg font-normal text-gray-500 dark:text-gray-400 lg:text-right shrink-0">
                                    {event.time}
                                </p>
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex-grow">
                                    <Link to={event.link} className="hover:underline">
                                        {event.title}
                                    </Link>
                                </h3>
                            </div>
                            <Link to="#" className="flex items-center space-x-2 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 mt-2 lg:mt-0">
                                <Download size={20} />
                                <span className="text-sm font-medium">Download Ticket</span>
                            </Link>
                        </div>
                    ))}
                </section>
            </div>
        </>
    )
}
export default My_events;