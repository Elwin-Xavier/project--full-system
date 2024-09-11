/* eslint-disable no-unused-vars */
import React from 'react'
import NavBar from '../navBar';

const Settings_bar = () => {
    return (
        <div className='sm:hidden dark:bg-black'>
            <NavBar/>
            <div className="m-10 max-w-sm">
                <label htmlFor="price" className="mb-2 block text-sm font-medium">Price</label>
                <div className="relative">
                </div>
            </div>

            <div className="m-10 max-w-sm">
                <label htmlFor="website" className="block text-sm font-medium text-gray-700">Website URL</label>
                <div className="flex rounded-md shadow-sm">
                    <div className="inline-flex min-w-fit items-center rounded-l-md border border-r-0 border-gray-200 bg-gray-50 px-4">
                        <span className="text-sm text-gray-500">http://</span>
                    </div>
                    <input type="text" name="website" id="website" className="block w-full rounded-r-md border border-gray-200 py-3 px-4 pr-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500" placeholder="www.example.com" />
                </div>
            </div>

            <div className="m-10 max-w-sm">
                <label htmlFor="phone" className="mb-2 block text-sm font-medium">Phone number</label>
                <div className="relative">
                    <input type="text" id="phone" name="inline-add-on" className="block w-full rounded-md border border-gray-200 py-3 px-4 pl-20 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500" placeholder="+1 (000) 000-0000" />
                    <div className="absolute inset-y-0 left-0 flex items-center px-3 text-gray-500">
                        <label htmlFor="country-code" className="sr-only">Country</label>
                        <select id="country-code" name="country-code" className="block w-full rounded-md border-transparent focus:border-blue-600 focus:ring-blue-600">
                            <option>US</option>
                            <option>CA</option>
                            <option>EU</option>
                        </select>
                    </div>
                </div>
            </div>

            <div className="m-10 grid max-w-lg space-y-3 rounded-md border py-4 px-8">
                <div className="relative flex items-start">
                    <div className="mt-1 flex h-5 items-center">
                        <input id="delete" name="delete" type="checkbox" className="rounded border-gray-200 text-blue-600 focus:ring-blue-500" aria-describedby="delete-description" checked />
                    </div>
                    <label htmlFor="delete" className="ml-3">
                        <span className="block text-sm font-semibold text-gray-800">Delete</span>
                        <span id="delete-description" className="block text-sm text-gray-600">Notify me when this action happens.</span>
                    </label>
                </div>

                <div className="relative flex items-start">
                    <div className="mt-1 flex h-5 items-center">
                        <input id="archive" name="archive" type="checkbox" className="rounded border-gray-200 text-blue-600 focus:ring-blue-500" aria-describedby="archive-description" />
                    </div>
                    <label htmlFor="archive" className="ml-3">
                        <span className="block text-sm font-semibold text-gray-800">Archive</span>
                        <span id="archive-description" className="block text-sm text-gray-600">Notify me when this action happens.</span>
                    </label>
                </div>
            </div>

        </div>
    )
}

export default Settings_bar;