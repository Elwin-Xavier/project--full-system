/* eslint-disable no-unused-vars */
import React from 'react'
import NavBar from '../common/navBar'
import Creator_navBar from './creator_components/creator_navBar'
import Creator_sidebar from './creator_components/creator_sidebar'
import { Outlet } from 'react-router-dom'

const Creator_layout = () => {
  return (
    <div className="flex dark:text-white dark:bg-black">
      <Creator_sidebar />
      <div className="flex h-screen w-full flex-col">
        <Creator_navBar />
        <div className="max-h-screen overflow-y-auto">
          <div className="flex gap-y-8 justify-center mb-10">
            <Outlet />
          </div>
        </div>
      </div>
    </div >
  )
}

export default Creator_layout