/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { Pencil, Trash2, CircleX } from 'lucide-react';
import { Tooltip } from 'react-tooltip'
import 'react-tooltip/dist/react-tooltip.css'
import EndPoints from '../../../Api/baseUrl/endPoints';
import { Success } from '../../../components/toasts';

const Coming_events = () => {
  const [events, setEvents] = useState([])
  const [updateData, setUpdateDate] = useState([])
  const [edit, setEdit] = useState(false)

  const fetch_events = async () => {
    const { data } = await EndPoints.events.fetch_creator_events()
    if (data.Status == 200) {
      setEvents(data.events)
    }
  }

  const delete_ = async (id) => {
    try {
      const { data } = await EndPoints.events.delete_event(id)
      if (data.status == 200) {
        Success(data.message)
        fetch_events()
      } else {
        throw new Error(data.message || "An Error Occurred!")
      }
    } catch (error) {
      Error(error.response.data.error || "Something went wrong")
    }
  }

  useEffect(() => {
    fetch_events()
  }, [])

  return (
    <div className='sm:border-l'>
      <div className="pt-4 pl-2">
        <h1 className="py-2 text-2xl font-semibold">Up-Coming Events</h1>
        <p>Explore up and Coming events you&apos;re supposed to attend.</p>
      </div>
      <hr className="mt-4 mb-8" />
      <div className="sm:hidden block ">
        <div className="max-w-xl mx-auto p-8">
          <div className="flow-root">
            <ul className="-mb-8">
              {events.map((event, index) => (
                <li key={index}>
                  <div className="relative pb-8">
                    <span className="absolute top-5 left-5 -ml-px h-full w-0.5 bg-gray-400 dark:bg-current" aria-hidden="true"></span>
                    <div className="relative flex items-start space-x-3">
                      <div>
                        <div className="relative px-1">
                          <div className="h-8 w-8 bg-blue-500 rounded-full ring-8 ring-transparent flex items-center justify-center">
                            <span className='font-bold text-white'>1</span>
                          </div>
                        </div>
                      </div>
                      <div className="min-w-0 flex-1 py-0">
                        <div className="text-md">
                          <div>
                            <a href="#" className="font-bold text-lg mr-2">{event.eventName}</a>
                            <div className="my-0.5 relative inline-flex items-center rounded-full border border-gray-300 px-3 py-0.5 text-sm">
                              <div className="absolute flex-shrink-0 flex items-center justify-center">
                                <span className="h-1.5 w-1.5 rounded-full bg-green-500" aria-hidden="true"></span>
                              </div>
                              <div className="ml-3.5 font-medium">Feature</div>
                            </div>
                          </div>
                          <span className="whitespace-nowrap text-md font-bold text-rose-500">{new Date(event.date).toDateString()}, {event.time}</span>
                        </div>
                        <div className="mt-2">
                          <span className="whitespace-nowrap text-md font-bold">{event.venue}</span>
                          <p>
                            <span className='font-bold'>Guest: </span>{event.guest}
                          </p>
                        </div>
                        <div className="mt-2 justify-end items-end flex space-x-2">
                          <Link to={`/creator/creator-events/edit-event/${event._id}`} >
                            <span className="whitespace-nowrap hover:text-blue-500 text-md font-bold">
                              <Pencil />
                            </span>
                          </Link>
                          <button onClick={() => delete_(event._id)}>
                            <span className='font-bold hover:text-red-500'><Trash2 /></span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* on Large screen */}
      <div className="hidden sm:block mx-auto mt-8">
        <div className="mx-auto max-w-screen px-4 sm:px-6 lg:px-8">
          <div className="mt-8">
          {events.map((event, index) => (
            <ul key={index} className="space-y-6">
                <li className="flex items-center  p-2 gap-4">
                  <img
                    src={event.poster}
                    alt=""
                    className="size-20 rounded object-cover"
                  />

                  <div>
                    <h3 className="text-md font-bold">{event.eventName}</h3>
                    <dl className="mt-0.5 space-y-px text-md">
                      <div>
                        <dt className="inline">Date: </dt>
                        <dd className="inline">{new Date(event.date).toDateString()}</dd>
                      </div>

                      <div>
                        <dt className="inline">Time: </dt>
                        <dd className="inline">{event.time}</dd>
                      </div>
                    </dl>
                  </div>
                  <div>
                    <h3 className="text-md font-bold">{event.venue}</h3>
                  </div>
                  <div>
                    <h3 className="text-md font-bold">{event.guest}</h3>
                  </div>

                  <div className="flex flex-1 items-center justify-end gap-4">
                    <Link to={`/creator/creator-events/edit-event/${event._id}`} id="clickable" className='flex'>
                      < Pencil className='size-4' />
                      <span className='sr-only'>Edit</span>
                    </Link>
                    <Tooltip anchorSelect="#clickable" className='rounded-lg bg-blue-500 dark:bg-blue-500 dark:text-black'
                      style={{ backgroundColor: "rgb(1, 61, 255)" }}
                      clickable>
                      <button to={`/creator/creator-events/edit-event/${event._id}`}>Edit Event</button>
                    </Tooltip>

                    <button onClick={() => delete_(event._id)} id="not-clickable" className="transition hover:text-red-600">
                      <span className="sr-only">Remove item</span>
                      <Trash2 className="size-4" />
                    </button>
                    <Tooltip
                      anchorSelect="#not-clickable"
                      style={{ backgroundColor: "rgb(236, 26, 26)" }}
                      clickable>
                      <button onClick={() => delete_(event._id)} className="text-white hover:text-red-100 transition-colors duration-200">
                        Delete Event
                      </button>
                    </Tooltip>
                  </div>
                </li>
            </ul>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Coming_events;