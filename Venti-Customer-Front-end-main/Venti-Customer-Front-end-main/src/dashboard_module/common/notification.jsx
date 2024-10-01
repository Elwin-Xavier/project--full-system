/* eslint-disable no-unused-vars */
import React from 'react'

const Notification = () => {
  return (
    <div className="block p-4 border border-gray-200 rounded-lg mb-2">
      <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        Notification Settings
      </h5>
      <p className="font-normal text-gray-700 dark:text-white border-b ">
        Stay updated with the latest discussions and feedback from the community.
      </p>
      <div className="grid border-b py-6 sm:grid-cols-2">
        <div className="">
          <h2 className="text-lg font-semibold leading-4 ">Comments</h2>
          <p className="">Stay updated with the latest discussions and feedback from the community.</p>
        </div>
        <div className="mt-4 flex items-center sm:justify-end">
          <div className="flex flex-col gap-3">
            <label htmlFor="email" className="relative inline-flex cursor-pointer items-center">
              <input type="checkbox" value="" id="email" className="peer sr-only" />
              <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:top-[2px] after:left-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-red-700 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none  dark:border-gray-600 dark:bg-gray-700"></div>
              <span className="ml-5 text-sm font-medium text-gray-900 dark:text-gray-300">Email</span>
            </label>
            <label htmlFor="sms" className="relative inline-flex cursor-pointer items-center">
              <input type="checkbox" value="" id="sms" className="peer sr-only" />
              <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:top-[2px] after:left-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-red-700 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none dark:border-red-600 dark:bg-gray-700 dark:peer-focus:ring-red-800"></div>
              <span className="ml-5 text-sm font-medium text-gray-900 dark:text-gray-300">SMS</span>
            </label>
          </div>
        </div>
      </div>

      <div className="grid border-b py-6 sm:grid-cols-2">
        <div className="">
          <h2 className="text-lg font-semibold leading-4 ">Reminders</h2>
          <p className="">Get timely reminders to keep you on track with important tasks.</p>
        </div>

        <div className="mt-4 flex items-center sm:justify-end">
          <div className="flex flex-col gap-3">
            <label htmlFor="rem-email" className="relative inline-flex cursor-pointer items-center">
              <input type="checkbox" value="" id="rem-email" className="peer sr-only" />
              <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:top-[2px] after:left-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-red-700 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none  dark:border-gray-600 dark:bg-gray-700"></div>
              <span className="ml-5 text-sm font-medium text-gray-900 dark:text-gray-300">Email</span>
            </label>
            <label htmlFor="rem-sms" className="relative inline-flex cursor-pointer items-center">
              <input type="checkbox" value="" id="rem-sms" className="peer sr-only" />
              <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:top-[2px] after:left-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-red-700 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none dark:border-gray-600 dark:bg-gray-700"></div>
              <span className="ml-5 text-sm font-medium text-gray-900 dark:text-gray-300">SMS</span>
            </label>
          </div>
        </div>
      </div>
      <div className="grid border-b py-6 sm:grid-cols-2">
        <div className="">
          <h2 className="text-lg font-semibold leading-4 ">Updates</h2>
          <p className="">Stay informed with the latest news and updates from our team.</p>
        </div>
        <div className="mt-4 flex items-center sm:justify-end">
          <div className="flex flex-col gap-3">
            <label htmlFor="update-email" className="relative inline-flex cursor-pointer items-center">
              <input type="checkbox" value="" id="update-email" className="peer sr-only" />
              <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:top-[2px] after:left-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-red-700 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none dark:border-gray-600 dark:bg-gray-700"></div>
              <span className="ml-5 text-sm font-medium text-gray-900 dark:text-gray-300">Email</span>
            </label>
            <label htmlFor="update-sms" className="relative inline-flex cursor-pointer items-center">
              <input type="checkbox" value="" id="update-sms" className="peer sr-only" />
              <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:top-[2px] after:left-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-red-700 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none dark:border-gray-600 dark:bg-gray-700"></div>
              <span className="ml-5 text-sm font-medium text-gray-900 dark:text-gray-300">SMS</span>
            </label>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Notification;