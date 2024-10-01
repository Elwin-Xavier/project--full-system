/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom';
import EndPoints from '../../../Api/baseUrl/endPoints';
import { Success, Error } from '../../../components/toasts';
import { Calendar, MapPin, Clock, Users, Pin, ArrowRight, ArrowLeft, CircleX } from 'lucide-react';

const Event_readmore = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const [event, setEvent] = useState(null);
    const [tickets, setTickets] = useState({
        Early_bird: 0,
        Regular: 0,
        VIP: 0,
        VVIP: 0
    });
    const [loading, setLoading] = useState(true);
    const [pay, setPay] = useState(false)
    const [purchaseSummary, setPurchaseSummary] = useState(null);

    const fetch_an_event = async (eventId) => {
        setLoading(true);
        try {
            const { data } = await EndPoints.events.fetch_by_id(eventId)
            if (data.status === "200") {
                setEvent(data.event)
            } else {
                throw new Error(data.error || 'Something happened!')
            }
        } catch (error) {
            Error(error.response?.data?.error || 'Something went wrong!')
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetch_an_event(id)
    }, [id])

    const handleTicketChange = (type, action) => {
        if (!event) return;
        setTickets(prev => ({
            ...prev,
            [type]: action === 'increment'
                ? Math.min(prev[type] + 1, event[`Total_Tickets_${type}`] || 0)
                : Math.max(0, prev[type] - 1)
        }));
    }

    const calculateTotal = (type) => {
        if (!event) return 0;
        return tickets[type] * (event[`price_${type}`] || 0);
    }

    const totalAmount = event ? Object.keys(tickets).reduce((sum, type) => sum + calculateTotal(type), 0) : 0;

    const handleBuyTicket = () => {
        if (totalAmount === 0) {
            Error('Please select at least one ticket.');
            return;
        }

        console.log('Total VVIP:', calculateTotal('VVIP'));
        console.log('Total VIP:', calculateTotal('VIP'));
        console.log('Total Regular:', calculateTotal('Regular'));
        console.log('Total Early Bird:', calculateTotal('Early_bird'));
        console.log(tickets)

        // Create purchase summary
        // const summary = Object.entries(tickets)
        //     .filter(([_, count]) => count > 0)
        //     .map(([type, count]) => `${type.replace('_', ' ')}: ${count}`);

        // setPurchaseSummary(summary);

        // console.log(purchaseSummary);
    }



    if (loading) {
        return <div className="flex justify-center items-center h-screen">Loading...</div>;
    }

    if (!event) {
        return <div className="flex justify-center items-center h-screen">Event not found</div>;
    }

    return (
        <div className='h-full'>
            <div className="flex flex-col px-4 rounded-3xl lg:max-w-screen lg:flex-row">
                <div className="lg:w-1/2 lg:pr-8 justify-center items-center">
                <Link onClick={()=>window.history.back()} className='flex items-center font-bold '>
                    <ArrowLeft className='w-8'/>
                    <span className='text-xl'>Back</span>
                </Link>
                    <div className="mt-4 justify-center items-center">
                        <h2 className="text-6xl font-bold">{event.eventName}</h2>
                        <hr className='text-gray-400 mb-4' />
                        <div className='flex items-center p-2 space-x-2'>
                            <Calendar className='text-gray-600' />
                            <h4 className='text-2xl text-rose-500'>{new Date(event.date).toDateString()}</h4>
                        </div>
                        <div className='flex items-center p-2 space-x-2'>
                            <MapPin className='text-gray-600' />
                            <h4 className='text-2xl'>{event.venue}</h4>
                            <Pin className='text-gray-600' />
                            <Link to={event.LocationURL} target='_blank' className='text-blue-500'>Google Map</Link>
                        </div>
                        <div className='flex items-center p-2 space-x-2'>
                            <Clock className='text-gray-600' />
                            <h4 className='text-lg'>{event.time}</h4>
                            <Users className='text-gray-600' />
                            <h4 className='text-lg'>{event.guest}</h4>
                        </div>
                        <p className="mt-6 text-2xl">{event.description}</p>
                    </div>
                </div>
                <div className=" mb-8 lg:order-1 lg:mb-0 lg:w-1/3">
                    <img
                        loading='lazy'
                        className="border-blue-600/10 border shadow-md w-full h-auto"
                        src={event.poster}
                        alt={event.eventName}
                    />
                </div>
            </div>

            <div className="shadow-lg dark:shadow-gray-500 border dark:border-none">
                <div className="px-4 py-6 sm:px-8 sm:py-10">
                    <div className="flow-root">
                        <ul className="-my-8">
                            {['Early_bird', 'Regular', 'VIP', 'VVIP'].map((type) => (
                                <li key={type} className="flex flex-col space-y-3 py-6 text-left sm:flex-row sm:space-x-5 sm:space-y-0">
                                    <div className="relative flex flex-1 flex-col justify-between">
                                        <div className="sm:col-gap-5 sm:grid sm:grid-cols-2 p-2">
                                            <div className="pr-8 sm:pr-5">
                                                <p className="text-base font-semibold ">{type.replace('_', ' ')}</p>
                                                <p className="mx-0 mt-1 mb-0 text-sm">{event[`Total_Tickets_${type}`] || 0} available</p>
                                            </div>
                                            <div className="mt-4 flex items-end justify-between sm:mt-0 sm:items-start sm:justify-end">
                                                <p className="shrink-0 w-20 text-base font-semibold sm:order-2 sm:ml-8 sm:text-right">
                                                    <span>Ksh:</span>{event[`price_${type}`] || 0}
                                                </p>
                                                <div className="sm:order-1">
                                                    <div className="mx-auto flex h-8 items-stretch ">
                                                        <button
                                                            onClick={() => handleTicketChange(type, 'decrement')}
                                                            className="flex items-center justify-center rounded-l-md bg-gray-200 text-black px-4 transition hover:bg-black hover:text-white"
                                                        >
                                                            -
                                                        </button>
                                                        <div className="flex w-full items-center justify-center bg-gray-100 text-black px-4 text-xs uppercase transition">
                                                            {tickets[type]}
                                                        </div>
                                                        <button
                                                            onClick={() => handleTicketChange(type, 'increment')}
                                                            className="flex items-center justify-center rounded-r-md bg-gray-200 text-black px-4 transition hover:bg-black hover:text-white"
                                                        >
                                                            +
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="mt-6 border-t border-b py-2">
                        {['Early_bird', 'Regular', 'VIP', 'VVIP'].map((type) => (
                            <div key={type} className="flex items-center justify-between">
                                <p className="text-sm">Total {type.replace('_', ' ')}</p>
                                <p className="text-lg font-semibold "><span>Ksh</span>{calculateTotal(type).toFixed(2)}</p>
                            </div>
                        ))}
                    </div>
                    <div className="mt-6 flex items-center justify-between">
                        <p className="text-sm font-medium">Total</p>
                        <p className="text-2xl font-semibold"><span className="text-xs font-normal">KSH</span> {totalAmount.toFixed(2)}</p>
                    </div>

                    <div className="mt-6 text-center">
                        <button
                            onClick={() => setPay(true)}
                            type="button"
                            className="group inline-flex w-full items-center justify-center rounded-md bg-rose-500 px-6 py-4 text-lg font-semibold transition-all duration-200 ease-in-out focus:shadow hover:bg-rose-800"
                            disabled={totalAmount === 0}
                        >
                            BUY TICKET
                            <ArrowRight className="group-hover:ml-8 ml-4 h-6 w-6 transition-all" />
                        </button>
                        <span>Before you Buy Tickect make sure to select ticket type and Number of tickets you want.(i.e VVIP select 2 tickets)</span>
                        {/* <button 
                            onClick={handleBuyTicket}
                            type="button" 
                            className="group inline-flex w-full items-center justify-center rounded-md bg-rose-500 px-6 py-4 text-lg font-semibold transition-all duration-200 ease-in-out focus:shadow hover:bg-rose-800"
                            disabled={totalAmount === 0}
                        >
                            BUY TICKET
                            <ArrowRight className="group-hover:ml-8 ml-4 h-6 w-6 transition-all" />
                        </button> */}
                    </div>
                </div>
            </div>
            {pay && (
                <div className="overflow-y-auto overflow-x-hidden fixed inset-0 z-50 flex justify-center items-center w-full h-full bg-opacity-40 bg-gray-200">
                    <div className="relative p-4 w-full max-w-2xl max-h-full">
                        <div className="relative bg-white rounded-lg shadow dark:bg-black">
                            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                                    Payment Information
                                </h3>
                                <button type="button"
                                    onClick={() => setPay(false)}
                                    className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white">
                                    <CircleX className="w-6 h-6" />
                                    <span className="sr-only">Close modal</span>
                                </button>
                            </div>
                            <div className="shadow-lg p-6">
                                {/* <form> */}
                                    <div className="grid grid-cols-2 gap-6">
                                        <div className="col-span-2 sm:col-span-1">
                                            <label htmlFor="card-number" className="block text-sm font-medium mb-2">Card Number</label>
                                            <input type="text" name="card-number" id="card-number" placeholder="0000 0000 0000 0000" className="w-full py-3 px-4 border border-gray-400 rounded-lg focus:outline-none focus:border-blue-500 dark:bg-transparent" />
                                        </div>
                                        <div className="col-span-2 sm:col-span-1">
                                            <label htmlFor="expiration-date" className="block text-sm font-medium mb-2">Expiration Date</label>
                                            <input type="text" name="expiration-date" id="expiration-date" placeholder="MM / YY" className="w-full py-3 px-4 border border-gray-400 rounded-lg focus:outline-none focus:border-blue-500 dark:bg-transparent" />
                                        </div>
                                        <div className="col-span-2 sm:col-span-1">
                                            <label htmlFor="cvv" className="block text-sm font-medium mb-2">CVV</label>
                                            <input type="text" name="cvv" id="cvv" placeholder="000" className="w-full py-3 px-4 border border-gray-400 rounded-lg focus:outline-none focus:border-blue-500 dark:bg-transparent" />
                                        </div>
                                        <div className="col-span-2 sm:col-span-1">
                                            <label htmlFor="card-holder" className="block text-sm font-medium mb-2">Card Holder</label>
                                            <input type="text" name="card-holder" id="card-holder" placeholder="Full Name" className="w-full py-3 px-4 border border-gray-400 rounded-lg focus:outline-none focus:border-blue-500 dark:bg-transparent" />
                                        </div>
                                    </div>
                                    <div className="col-span-2 sm:col-span-1">
                                            <label htmlFor="email" className="block text-sm font-medium mb-2">Email Address</label>
                                            <input type="email" id='email' placeholder="info@example.com" className="w-full py-3 px-4 border border-gray-400 rounded-lg focus:outline-none focus:border-blue-500 dark:bg-transparent" />
                                        </div>
                                    <div className="mt-8">
                                        <button 
                                        onClick={handleBuyTicket}
                                        type="submit" className="w-full bg-rose-500 hover:bg-rose-600 text-white font-medium py-3 rounded-lg focus:outline-none">Submit</button>
                                    </div>
                                {/* </form> */}
                            </div>
                        </div>
                    </div>
                </div>
            )}

        </div>
    )
}

export default Event_readmore;