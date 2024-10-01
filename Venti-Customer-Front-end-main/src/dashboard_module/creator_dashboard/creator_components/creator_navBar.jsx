/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { FaRegCircleUser } from "react-icons/fa6";
import { IoSettings } from "react-icons/io5";
import { HiOutlineSearch } from "react-icons/hi";
import { useAuth } from '../../../providers/AuthProvider';
import { toggleDarkMode, loadTheme } from '../../../utils/themeChanger';

const Creator_navBar = () => {
    const { user } = useAuth();
    const [isDarkTheme, setIsDarkTheme] = useState(false);
    useEffect(() => {
        loadTheme()
        setIsDarkTheme(document.documentElement.classList.contains('dark'));
    }, [])
    const handleChange = () => {
        toggleDarkMode()
    }

    return (
        <div>
            <header className="relative flex flex-col items-center bg-red-20 px-4 py-4 sm:flex-row md:h-20">
                <div className="flex w-full flex-col justify-between overflow-hidden transition-all sm:max-h-full sm:flex-row sm:items-center">
                    {user !== null ? (
                        <>
                            <div className="relative ml-0 flex items-center justify-between rounded-md sm:ml-auto">
                                <span className="sm:hidden h-10 w-full rounded-md dark:bg-transparent pr-4 outline-none focus:border-blue-500">
                                    <span className=" inline-flex text-white h-8 w-8 items-center justify-center rounded-full bg-red-600 align-bottom text-2xl font-bold">V</span>
                                    <span className="text-xl">entie</span>
                                </span>
                                <label htmlFor="dark" className="sm:hidden relative inline-flex ml-2 cursor-pointer items-center">
                                    <input type="checkbox" onChange={handleChange} className="peer sr-only" checked={isDarkTheme} />
                                    <div className="peer h-6 w-11 rounded-full bg-gray-100 border after:absolute after:top-[2px] after:left-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-rose-500 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-blue-300 dark:border-gray-600 dark:bg-gray-700 dark:peer-focus:ring-blue-800"></div>
                                    <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">Display </span>
                                </label>
                                <Link
                                    to="/creator/creator-settings"
                                    className='sm:hidden text-gray-500 dark:text-gray-100 hover:text-blue-500 ml-3'>
                                    <IoSettings className='h-6 w-6' />
                                </Link>
                            </div>
                            <ul className="mx-auto mt-4 flex space-x-6 sm:mx-10 sm:mt-0 rounded-full">
                                <li className="hidden sm:block">
                                    <button className="h-10 w-10 flex items-center justify-center rounded-xl border text-gray-300 dark:text-gray-100">
                                        <FaRegCircleUser className="h-6 w-6" />
                                    </button>
                                </li>
                                <li className="hidden sm:block">
                                    <button className="flex items-center justify-center text-gray-600 dark:text-gray-100">
                                        <span className="hidden sm:block">{user.username}</span>
                                    </button>
                                </li>
                            </ul>
                        </>
                    ) : (
                        <>
                            <div className="relative ml-0 flex items-center justify-between rounded-md sm:ml-auto">
                                <span className="sm:hidden h-10 w-full rounded-md dark:bg-transparent pr-4 outline-none focus:border-blue-500">
                                    <span className=" inline-flex text-white h-8 w-8 items-center justify-center rounded-full bg-red-600 align-bottom text-2xl font-bold">V</span>
                                    <span className="text-xl">entie</span>
                                </span>
                                <label htmlFor="dark" className="sm:hidden relative inline-flex ml-2 cursor-pointer items-center">
                                    <input type="checkbox" onChange={handleChange} className="peer sr-only" checked={isDarkTheme} />
                                    <div className="peer h-6 w-11 rounded-full bg-white border after:absolute after:top-[2px] after:left-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-rose-500 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-blue-300 dark:border-gray-600 dark:bg-gray-700 dark:peer-focus:ring-blue-800"></div>
                                    <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">Display </span>
                                </label>
                                <Link to="/settings-page"
                                    className='text-gray-500 dark:text-gray-50 cursor-pointer hover:bg-gray-200 dark:hover:text-white ml-3'>
                                    <IoSettings className='sm:hidden h-6 w-6' />
                                </Link>
                            </div>
                            <div className="relative w-full">
                                <ul className="relative right-0 flex items-center justify-end sm:mr-0 sm:mt-0 rounded-full">
                                    <li className="hidden sm:block">
                                        <Link to="/signin" className="button text-gray-400 right-0">Login</Link>
                                    </li>
                                </ul>
                            </div>
                        </>
                    )}
                </div>
            </header>
        </div>
    )
}

export default Creator_navBar;