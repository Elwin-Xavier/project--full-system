/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import EndPoints from '../../../Api/baseUrl/endPoints';
import { useNavigate } from 'react-router-dom';
import { Success, Error } from '../../../components/toasts';
import { ArrowLeft } from 'lucide-react';
import { useParams } from 'react-router-dom';

const Edit_event = () => {
    const [event, setEvent] = useState('')
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const [imagePreview, setImagePreview] = useState(null);
    const navigate = useNavigate()
    const { id } = useParams()

    const fetch_id = async (event_id) => {
        try {
            const { data } = await EndPoints.events.fetch_by_id(event_id)
            if (data.status == 200) {
                setEvent(data.event)
                reset(data.event);
            } else {
                throw new Error(data.message || "An Error Occurred!")
            }
        } catch (error) {
            Error(error.response.data.error || "Something went wrong!")
        }
    }

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const onSubmit = async (values) => {
        try {
            const formData = new FormData();
            Object.keys(values).forEach(key => {
                if (key === 'poster') {
                    formData.append(key, values[key][0]);
                } else {
                    formData.append(key, values[key]);
                }
            });
            const { data } = await EndPoints.events.update_event(id, formData)
            if (data.status == 200) {
                Success(data.message)
                reset()
                navigate("/creator/creator-events/coming-events");
            } else {
                throw new Error(data.message || "An Error Occurred")
            }
        } catch (error) {
            Error(error.response.data.error || "Something happened")
        }
    }
    useEffect(() => {
        fetch_id(id)
    }, [id])

    if (!event) {
        return <div className='justify-center'>Loading...</div>;
    }

    return (
        <div className='sm:border-l min-h-full'>
            <button onClick={() => window.history.back()} className='flex mt-6 sm:hidden'>
                <ArrowLeft /> Back
            </button>
            <div className="pt-4 pl-2">
                <h1 className="py-2 text-2xl font-semibold">Edit Events</h1>
                <p>Explore up and Coming events you&apos;re supposed to attend.</p>
            </div>
            <hr className="mt-4 mb-8" />
            <form className='px-4' onSubmit={handleSubmit(onSubmit)}>
                <div className="grid gap-6 mb-6 md:grid-cols-2">
                    <div>
                        <label className="block mb-2 text-md font-medium ">Events name</label>
                        <input type="text" className="bg-transparent border border-gray-300 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            defaultValue={event.eventName}
                            {...register("eventName", { required: "Event name is required" })} />
                        {errors.eventName && <p className="text-red-500 text-xs mt-1">{errors.eventName.message}</p>}
                    </div>
                    <div>
                        <label className="block mb-2 text-md font-medium  dark:text-white">Upload Event Poster</label>
                        <input type="file" className="bg-transparent border border-gray-300 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" accept="image/*"
                            {...register("poster",
                                {
                                    required: "Event poster is required",
                                    onChange: handleImageUpload
                                })} />
                        {errors.poster && <p className="text-red-500 text-xs mt-1">{errors.poster.message}</p>}
                    </div>
                    <div>
                        <label className="block mb-2 text-md font-medium  dark:text-white">Pin Event Location</label>
                        <input type="url" className="bg-transparent border border-gray-300  text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" defaultValue={event.LocationURL}
                            {...register("LocationURL", { required: "Pin Event Location is required" })} />
                        {errors.LocationURL && <p className="text-red-500 text-xs mt-1">{errors.LocationURL.message}</p>}
                    </div>
                    <div>
                        <label className="block mb-2 text-md font-medium  dark:text-white">Event Date</label>
                        <input type="text" className="bg-transparent border border-gray-300  text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            defaultValue={
                                event.date && !isNaN(new Date(event.date).getTime())
                                    ? new Date(event.date).toISOString().split('T')[0]
                                    : ''
                            }
                            {...register("date", { required: "Event date is required" })} />
                        {errors.date && <p className="text-red-500 text-xs mt-1">{errors.date.message}</p>}
                    </div>
                    <div>
                        <label className="block mb-2 text-md font-medium  dark:text-white">Event Time</label>
                        <input type="text" className="bg-transparent border border-gray-300  text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            defaultValue={event.time}
                            {...register("time", { required: "Event time is required" })} />
                        {errors.time && <p className="text-red-500 text-xs mt-1">{errors.time.message}</p>}
                    </div>
                    <div>
                        <label className="block mb-2 text-md font-medium  dark:text-white">Venue</label>
                        <input type="text" className="bg-transparent border border-gray-300  text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" defaultValue={event.venue}
                            {...register("venue", { required: "Event venue is required" })} />
                        {errors.venue && <p className="text-red-500 text-xs mt-1">{errors.venue.message}</p>}
                    </div>
                    <div>
                        <label className="block mb-2 text-md font-medium  dark:text-white">Invited Guest/MC/Host</label>
                        <input type="text" className="bg-transparent border border-gray-300  text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" defaultValue={event.guest} {...register("guest", { required: "Event guest/Host/MC is required" })} />
                        {errors.guest && <p className="text-red-500 text-xs mt-1">{errors.guest.message}</p>}
                    </div>
                </div>

                <div className="pt-4 pl-2">
                    <h1 className="py-2 text-xl font-semibold">Ticket Number and Price Per Ticket</h1>
                    <p>Fill all the ticket number field below and Price per ticket.</p>
                </div>
                <hr className="mt-4 mb-4" />
                <div className="grid gap-6 mb-6 md:grid-cols-2">
                    <div>
                        <label className="block mb-2 text-md font-medium  dark:text-white">Total VVIP Tickets (Optional)</label>
                        <input type="number" className="bg-transparent border border-gray-300  text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            defaultValue={event.Total_Tickets_VVIP}
                            {...register("Total_Tickets_VVIP")} />
                    </div>
                    <div>
                        <label className="block mb-2 text-md font-medium  dark:text-white">VVIP Price Per Ticket (Optional)</label>
                        <input type="number" className="bg-transparent border border-gray-300  text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            defaultValue={event.price_VVIP}
                            {...register("price_VVIP")} />
                    </div>
                    <div>
                        <label className="block mb-2 text-md font-medium  dark:text-white">Total VIP Tickets (Optional)</label>
                        <input type="number" className="bg-transparent border border-gray-300  text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            defaultValue={event.Total_Tickets_VIP}
                            {...register("Total_Tickets_VIP")} />
                    </div>
                    <div>
                        <label className="block mb-2 text-md font-medium  dark:text-white">VIP Price Per Ticket (Optional)</label>
                        <input type="number" className="bg-transparent border border-gray-300  text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            defaultValue={event.price_VIP}
                            {...register("price_VIP")} />
                    </div>
                    <div>
                        <label className="block mb-2 text-md font-medium  dark:text-white">Total Regular Tickets</label>
                        <input type="number" className="bg-transparent border border-gray-300  text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            defaultValue={event.Total_Tickets_Regular}
                            {...register("Total_Tickets_Regular", { required: "Total Number of Regular Ticket is required" })} />
                        {errors.Total_Tickets_Regular && <p className="text-red-500 text-xs mt-1">{errors.Total_Tickets_Regular.message}</p>}
                    </div>
                    <div>
                        <label className="block mb-2 text-md font-medium  dark:text-white">Regular Price Per Ticket</label>
                        <input type="number" className="bg-transparent border border-gray-300 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            defaultValue={event.price_Regular}
                            {...register("price_Regular", { required: "Regular Price Per Ticket is required" })} />
                        {errors.price_Regular && <p className="text-red-500 text-xs mt-1">{errors.price_Regular.message}</p>}
                    </div>
                    {/* <div>
                        <label htmlFor="early_bird" className="block mb-2 text-md font-medium  dark:text-white">Total Early Bird Tickets (Optional)</label>
                        <input type="number" id="early_bird" className="bg-transparent border border-gray-300  text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder='1000' {...register("Total_Early_bird")} />
                    </div> */}
                    <div>
                        <label className="block mb-2 text-md font-medium  dark:text-white">Price Group Of Five (Optional)</label>
                        <input type="number" className="bg-transparent border border-gray-300  text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            defaultValue={event.price_GroupofFive}
                            {...register("price_GroupofFive")} />
                    </div>
                    <div>
                        <label className="block mb-2 text-md font-medium  dark:text-white">Early Bird Price Per Ticket (Optional)</label>
                        <input type="number" className="bg-transparent border border-gray-300 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            defaultValue={event.price_Early_bird}
                            {...register("price_Early_bird")} />
                    </div>
                </div>
                <div className="mb-6">
                    <label className="block mb-2 text-md font-medium  dark:text-white">Description</label>
                    <textarea type="text" className="bg-transparent border border-gray-300  text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  " defaultValue={event.description}
                        {...register("description", { required: "Event description is required" })} />
                    {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description.message}</p>}
                </div>
                <div className='space-x-4 flex'>
                <button type="submit" className="text-white bg-rose-500 hover:bg-rose-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-md w-full sm:w-auto px-5 py-2.5 text-center">Submit</button>
                <button onClick={()=>window.history.back()} className="hidden sm:block border font-medium rounded-lg text-md w-full sm:w-auto px-5 py-2.5 text-center">Back</button>
                </div>
            </form>
        </div>
    )
}

export default Edit_event;