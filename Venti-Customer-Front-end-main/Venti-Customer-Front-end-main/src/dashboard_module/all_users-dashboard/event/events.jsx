/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import EndPoints from '../../../Api/baseUrl/endPoints';
import { Error } from '../../../components/toasts'
import { Calendar, MapPin, Clock } from 'lucide-react';

const Events = () => {
    const [events, setEvents] = useState([])
    const [loading, setLoading] = useState(true);

    const fetch_events = async () => {
        setLoading(true);
        try {
            const { data } = await EndPoints.events.fetch_all_events()
            if (data.status == 200) {
                setEvents(data.events)
            } else {
                throw new Error(data.error || "No Available Events")
            }
        } catch (error) {
            Error(error.response.data.error || 'Something went wrong')
        }
        finally{
            setLoading(false)
        }
    }
    useEffect(() => {
        fetch_events()
    }, [])

    if (loading) {
        return <div className="flex justify-center items-center h-screen">Loading...</div>;
    }
    if (!events) {
        return <div className="flex justify-center items-center h-screen">Event not found!</div>;
    }

    return (
        <div className="grid grid-cols-1 gap-5 p-5 sm:grid-cols-2 md:grid-cols-3 lg:gap-10">
            {events.map((event, index) => (
                <article key={index} className="group h-full dark:shadow-gray-500 p-2 overflow-hidden rounded-lg shadow-lg hover:bg-gray-50 dark:hover:bg-gray-800">
                    <div className='relative'>
                        <img
                            src={event.poster}
                            loading="lazy"
                            alt={event.eventName}
                            className=" w-full transform object-cover object-center transition duration-500 ease-in-out group-hover:scale-105 md:h-36 lg:h-48"
                        />
                        {event.price_Early_bird > 0 ? (
                            <span className="absolute top-0 left-0 m-2 rounded-full bg-black dark:bg-gray-50 dark:text-gray-800 px-2 text-center text-sm font-medium text-white">ksh: {event.price_Early_bird} Early Bird</span>
                        ) : (
                            <span></span>
                        )}
                    </div>

                    <div className="flex flex-col gap-2 p-4">
                        <h2 className="text-xl font-bold ">
                            <Link to={`/event/${event._id}`} className="transition duration-100 hover:text-rose-500 active:text-rose-600">{event.eventName}</Link>
                        </h2>

                        <p className="text-gray-500 dark:text-gray-200">{event.description}</p>
                        <div className="flex items-center mb-2">
                            <Calendar className="h-4 w-4 mr-2 text-gray-500" />
                            <span className="text-sm text-gray-600 dark:text-white">{new Date(event.date).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center mb-2">
                            <Clock className="h-4 w-4 mr-2 text-gray-500" />
                            <span className="text-sm text-gray-600 dark:text-white">{event.time}</span>
                        </div>
                        <div className="flex items-center">
                            <MapPin className="h-4 w-4 mr-2 text-gray-500" />
                            <span className="text-sm text-gray-600 dark:text-white">{event.venue}</span>
                        </div>

                        <div>
                            <Link to={`/event/${event._id}`} className="font-semibold text-rose-500 transition duration-100 hover:text-rose-600 active:text-rose-700">Book Event</Link>
                        </div>
                    </div>
                </article>
            ))}

        </div>

    )
}

export default Events;