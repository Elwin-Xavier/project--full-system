/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import EndPoints from '../../../Api/baseUrl/endPoints';
import { Success, Error } from '../../../components/toasts';
import { useNavigate } from 'react-router-dom';

const Create_events = () => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const [imagePreview, setImagePreview] = useState(null);
    const navigate = useNavigate()

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
            const { data } = await EndPoints.events.create_event(formData)
            if (data.status ==200) {
                Success(data.message)
                reset()
                navigate("/creator/creator-events");
            } else {
                throw new Error(data.message || "An Error Occurred")
            }
        } catch (error) {
            Error(error.response.data.error || "Something happened")
        }
    }
    return (
        <div className='sm:border-l min-h-full w-full items-center'>
            <div className="pt-4 pl-2">
                <h1 className="py-2 text-2xl font-semibold">Create An Event</h1>
                <p>Fill all the inputs below and make it accessible to your clients.</p>
            </div>
            <hr className="mt-4 mb-8" />
            <form className='px-4' onSubmit={handleSubmit(onSubmit)}>
                <div className="grid gap-6 mb-6 md:grid-cols-2">
                    <div>
                        <label htmlFor="event_name" className="block mb-2 text-md font-medium ">Events name</label>
                        <input type="text" id="event_name" className="bg-transparent border border-gray-300 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="***Enter event name***"  {...register("eventName", { required: "Event name is required" })} />
                        {errors.eventName && <p className="text-red-500 text-xs mt-1">{errors.eventName.message}</p>}
                    </div>
                    <div>
                        <label htmlFor="poster_upload" className="block mb-2 text-md font-medium  dark:text-white">Upload Event Poster</label>
                        <input type="file" id="poster_upload" className="bg-transparent border border-gray-300 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" accept="image/*"
                            {...register("poster",
                                {
                                    required: "Event poster is required",
                                    onChange: handleImageUpload
                                })} />
                        {errors.poster && <p className="text-red-500 text-xs mt-1">{errors.poster.message}</p>}
                    </div>
                    <div>
                        <label htmlFor="location" className="block mb-2 text-md font-medium  dark:text-white">Pin Event Location</label>
                        <input type="url" id="location" className="bg-transparent border border-gray-300  text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="google map link"
                            {...register("LocationURL", { required: "Pin Event Location is required" })} />
                        {errors.LocationURL && <p className="text-red-500 text-xs mt-1">{errors.LocationURL.message}</p>}
                    </div>
                    <div>
                        <label htmlFor="date" className="block mb-2 text-md font-medium  dark:text-white">Event Date</label>
                        <input type="date" id="date" className="bg-transparent border border-gray-300  text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" pattern="[YYYY]-[MM]-[DD]" {...register("date", { required: "Event date is required" })} />
                        {errors.date && <p className="text-red-500 text-xs mt-1">{errors.date.message}</p>}
                    </div>
                    <div>
                        <label htmlFor="time" className="block mb-2 text-md font-medium  dark:text-white">Event Time</label>
                        <input type="time" id="time" className="bg-transparent border border-gray-300  text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            {...register("time", { required: "Event time is required" })} />
                        {errors.time && <p className="text-red-500 text-xs mt-1">{errors.time.message}</p>}
                    </div>
                    <div>
                        <label htmlFor="venue" className="block mb-2 text-md font-medium  dark:text-white">Venue</label>
                        <input type="text" id="venue" className="bg-transparent border border-gray-300  text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="***Enter event venue***" {...register("venue", { required: "Event venue is required" })} />
                        {errors.venue && <p className="text-red-500 text-xs mt-1">{errors.venue.message}</p>}
                    </div>
                    <div>
                        <label htmlFor="guest" className="block mb-2 text-md font-medium  dark:text-white">Invited Guest/MC/Host</label>
                        <input type="text" id="guest" className="bg-transparent border border-gray-300  text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="***Enter the Event Host/MC/Guest(s)***" {...register("guest", { required: "Event guest/Host/MC is required" })} />
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
                        <label htmlFor="vvip" className="block mb-2 text-md font-medium  dark:text-white">Total VVIP Tickets (Optional)</label>
                        <input type="number" id="vvip" className="bg-transparent border border-gray-300  text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder='500' {...register("Total_Tickets_VVIP")} />
                    </div>
                    <div>
                        <label htmlFor="vvip_price" className="block mb-2 text-md font-medium  dark:text-white">VVIP Price Per Ticket (Optional)</label>
                        <input type="number" id="vvip_price" className="bg-transparent border border-gray-300  text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder='5000' {...register("price_VVIP")} />
                    </div>
                    <div>
                        <label htmlFor="vip" className="block mb-2 text-md font-medium  dark:text-white">Total VIP Tickets (Optional)</label>
                        <input type="number" id="vip" className="bg-transparent border border-gray-300  text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder='800' {...register("Total_Tickets_VIP")} />
                    </div>
                    <div>
                        <label htmlFor="vip_price" className="block mb-2 text-md font-medium  dark:text-white">VIP Price Per Ticket (Optional)</label>
                        <input type="number" id="vip_price" className="bg-transparent border border-gray-300  text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder='3000' {...register("price_VIP")} />
                    </div>
                    <div>
                        <label htmlFor="regular" className="block mb-2 text-md font-medium  dark:text-white">Total Regular Tickets</label>
                        <input type="number" id="regular" className="bg-transparent border border-gray-300  text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder='2000' {...register("Total_Tickets_Regular", { required: "Total Number of Regular Ticket is required" })} />
                        {errors.Total_Tickets_Regular && <p className="text-red-500 text-xs mt-1">{errors.Total_Tickets_Regular.message}</p>}
                    </div>
                    <div>
                        <label htmlFor="regular_price" className="block mb-2 text-md font-medium  dark:text-white">Regular Price Per Ticket</label>
                        <input type="number" id="regular_price" className="bg-transparent border border-gray-300  text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder='450' {...register("price_Regular", { required: "Regular Price Per Ticket is required" })} />
                        {errors.price_Regular && <p className="text-red-500 text-xs mt-1">{errors.price_Regular.message}</p>}
                    </div>
                    {/* <div>
                        <label htmlFor="early_bird" className="block mb-2 text-md font-medium  dark:text-white">Total Early Bird Tickets (Optional)</label>
                        <input type="number" id="early_bird" className="bg-transparent border border-gray-300  text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder='1000' {...register("Total_Early_bird")} />
                    </div> */}
                    <div>
                        <label htmlFor="group_of_five" className="block mb-2 text-md font-medium  dark:text-white">Price Group Of Five (Optional)</label>
                        <input type="number" id="group_of_five" className="bg-transparent border border-gray-300  text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder='2250' {...register("price_GroupofFive")} />
                    </div>
                    <div>
                        <label htmlFor="early_bird_price" className="block mb-2 text-md font-medium  dark:text-white">Early Bird Price Per Ticket (Optional)</label>
                        <input type="number" id="early_bird_price" className="bg-transparent border border-gray-300  text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder='300' {...register("price_Early_bird")} />
                    </div>
                </div>
                <div className="mb-6">
                    <label htmlFor="description" className="block mb-2 text-md font-medium  dark:text-white">Description</label>
                    <textarea type="text" id="confirm_password" className="bg-transparent border border-gray-300  text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  " placeholder="Write something about the event" {...register("description", { required: "Event description is required" })} />
                    {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description.message}</p>}
                </div>
                <button type="submit" className="text-white bg-rose-500 hover:bg-rose-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-md w-full sm:w-auto px-5 py-2.5 text-center">Submit</button>
            </form>
        </div>
    )
}

export default Create_events;