/* eslint-disable no-unused-vars */
import React from 'react'
import { Outlet, Link } from 'react-router-dom';
import Events_sidebar from './events_sidebar';

const Creator_events_layout = () => {
  return (
    <div className="min-h-screen w-full mx-2">
      <div className="grid sm:grid-cols-10 py-8">
        <Events_sidebar className=" h-full"/>
        <div className="col-span-8 sm:px-8 sm:ml-8">
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default Creator_events_layout;