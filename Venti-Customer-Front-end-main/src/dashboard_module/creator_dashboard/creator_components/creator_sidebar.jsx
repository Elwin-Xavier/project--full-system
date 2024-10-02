/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useRef } from 'react'
import { Link } from 'react-router-dom';
import { FaCircleUser, FaMoon, FaRegSun } from "react-icons/fa6";
import { LuSunMedium } from "react-icons/lu";
import { RiCalendarEventFill, RiMessageFill, RiFileWarningLine, RiLogoutCircleRLine } from "react-icons/ri";
import { AiFillSetting, AiFillHome, AiOutlineSearch } from "react-icons/ai";
import { IoIosAddCircle } from "react-icons/io";
import { IoMenu } from "react-icons/io5";
import { toggleDarkMode, loadTheme } from '../../../utils/themeChanger';
import { logout } from '../../../utils/helpers';
import { useAuth } from '../../../providers/AuthProvider';
import Camera from '../../common/camera';
import { Modal } from '../../../components/modal';
import Create from '../../common/create';

const Creator_sidebar = () => {

    const menuRef = useRef(null);
    const dropdownRef = useRef(null);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isCameraOpen, setIsCameraOpen] = useState(false);
    const { user } = useAuth();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isCreate, setIsCreate] = useState(false);

    useEffect(() => {
        loadTheme();

        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                // setIsMenuOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);
    const toggleDropdown = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const CloseModal = () => {
        setIsModalOpen(false);
    };
    useEffect(() => {
        if (dropdownRef.current) {
            if (isMenuOpen) {
                dropdownRef.current.style.maxHeight = `${dropdownRef.current.scrollHeight}px`;
            } else {
                dropdownRef.current.style.maxHeight = '0px';
            }
        }
    }, [isMenuOpen]);

    const OpenCamera = () => {
        if (user === null) {
            setIsModalOpen(true)
        } else {
            setIsCameraOpen(true);
        }
    }
    const closeCamera = () => {
        setIsCameraOpen(false);
    }

    const create = () => {
        if (user === null) {
            setIsModalOpen(true)
        } else {
            setIsCreate(true);
        }
    }
    const closeCreate = () => {
        setIsCreate(false);
    }
    return (
        <div className="fixed z-50 md:relative border-r">
            <nav ref={menuRef} className="peer-checked:w-64 left-0 z-10 flex h-screen w-0 flex-col xs:hidden overflow-hidden shadow transition-all md:h-100dvh md:overflow-auto md:w-40 lg:w-72">
                <div className="mt-0 py-4 pl-10 md:mt-10">
                    <span className="">
                        <span className=" inline-flex text-white h-8 w-8 items-center justify-center rounded-full bg-red-600 align-bottom text-2xl font-bold">V</span>
                        <span className="text-xl">entie</span>
                    </span>
                </div>
                <ul className="mt-4 space-y-3 md:mt-5">
                    <li className="relative">
                        <Link to='/creator'
                            // onClick={() => handleSidebarClick('home')}
                            className="focus:bg-gray-100 dark:focus:bg-gray-200 hover:bg-gray-100 dark:hover:bg-gray-200 dark:focus:text-black dark:hover:text-gray-700 flex w-full space-x-2 rounded-md px-10 py-4 focus:outline-none">
                            <span>
                                <AiFillHome className="h-6 w-6" />
                            </span>
                            <span>Home</span>
                        </Link>
                    </li>
                    {/* <li className="relative">
                        <button className="focus:bg-gray-100 dark:focus:bg-gray-200 hover:bg-gray-100 dark:hover:bg-gray-200 dark:hover:text-gray-700 dark:focus:text-black flex w-full space-x-2 rounded-md px-10 py-4 focus:outline-none">
                            <span>
                                <AiOutlineSearch className="h-6 w-6" />
                            </span>
                            <span>Search</span>
                        </button>
                    </li> */}
                    <li className="relative">
                        <Link to='creator-events'
                            className="focus:bg-gray-100 dark:focus:bg-gray-200 hover:bg-gray-100 dark:hover:bg-gray-200 dark:focus:text-black dark:hover:text-gray-700 flex w-full space-x-2 rounded-md px-10 py-4 focus:outline-none">
                            <span>
                                <RiCalendarEventFill className="h-6 w-6" />
                            </span>
                            <span>Events</span>
                        </Link>
                    </li>
                    {/* <li className="relative">
                        <Link to='/messages'
                            className="focus:bg-gray-100 dark:focus:bg-gray-200 hover:bg-gray-100 dark:hover:bg-gray-200 dark:focus:text-black dark:hover:text-gray-700 flex w-full space-x-2 rounded-md px-10 py-4 focus:outline-none">
                            <span className="text-2xl">
                                <RiMessageFill aria-hidden="true" />
                            </span>
                            <span>Messages</span>
                        </Link>
                    </li> */}
                    <li className="relative">
                        <button
                            onClick={() => create()}
                            className="focus:bg-gray-100 dark:focus:bg-gray-200 hover:bg-gray-100 dark:hover:bg-gray-200 dark:focus:text-black dark:hover:text-gray-700 flex w-full space-x-2 rounded-md px-10 py-4 focus:outline-none">
                            <span>
                                <IoIosAddCircle className="h-6 w-6" />
                            </span>
                            <span>Post</span>
                        </button>
                    </li>
                    {/* <li className="relative">
                        <Link to="/creator/creator-settings"
                            className="focus:bg-gray-100 dark:focus:bg-gray-200 hover:bg-gray-100 dark:hover:bg-gray-200 dark:focus:text-black dark:hover:text-gray-700 flex w-full space-x-2 rounded-md px-10 py-4 focus:outline-none">
                            <span>
                                <AiFillSetting className="h-6 w-6" />
                            </span>
                            <span>Settings</span>
                        </Link>
                    </li> */}
                    <li className="relative">
                        <Link to='creator-profile'
                            className="focus:bg-gray-100 dark:focus:bg-gray-200 hover:bg-gray-100 dark:hover:bg-gray-200 dark:focus:text-black dark:hover:text-gray-700 flex w-full space-x-2 rounded-md px-10 py-4 focus:outline-none">
                            <span>
                                <FaCircleUser className="h-6 w-6" />
                            </span>
                            <span>Profile</span>
                        </Link>
                    </li>
                    <li className="relative">
                        <button
                            onClick={toggleDropdown}
                            className=" flex w-full space-x-2 rounded-md px-10 py-4 focus:outline-none">
                            <span>
                                <IoMenu className="h-6 w-6" />
                            </span>
                            <span>Menu</span>
                        </button>
                        <ul
                            ref={dropdownRef}
                            className={`transition-max-height px-10 duration-300 ease-in-out overflow-hidden ${isMenuOpen ? 'max-h-screen' : 'max-h-0'
                                }`}>
                            <button
                                onClick={() => toggleDarkMode()}
                                className="focus:bg-gray-100 dark:focus:bg-gray-200 hover:bg-gray-100 dark:focus:text-black dark:hover:bg-gray-200 dark:hover:text-gray-700 flex w-full space-x-2 rounded-md px-10 py-4 focus:outline-none">
                                <LuSunMedium className="flex-shrink-0" />
                                <span>Switch Modes</span>
                            </button>
                            <Link to="/report-a-problem"
                                className="focus:bg-gray-100 dark:focus:bg-gray-200 hover:bg-gray-100 dark:focus:text-black dark:hover:bg-gray-200 dark:hover:text-gray-700 flex w-full space-x-2 rounded-md px-10 py-4 focus:outline-none">
                                <RiFileWarningLine className='flex-shrink-0' />
                                Report a problem
                            </Link>
                            <hr className='text-black' />
                            <Link
                                onClick={() => logout()}
                                className="focus:bg-gray-100 dark:focus:bg-gray-200 hover:bg-gray-100 dark:focus:text-black dark:hover:bg-gray-200 dark:hover:text-gray-700 flex w-full space-x-2 rounded-md px-10 py-4 focus:outline-none">
                                <RiLogoutCircleRLine className='flex-shrink-0' />
                                Logout
                            </Link>
                        </ul>
                    </li>
                </ul>
            </nav>

            <div className="sm:hidden fixed z-50 w-full h-16 max-w-lg -translate-x-1/2 bg-white dark:bg-black border-t border-slate-600 bottom-0 left-1/2 ">
                <div className="grid h-full max-w-lg grid-cols-5 mx-auto">
                    <Link to='/creator'
                        data-tooltip-target="tooltip-home" type="button" className="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-200 dark:hover:text-white group">
                        <AiFillHome className="w-5 h-5 text-gray-500 dark:text-gray-400 group-hover:bg-gray-200 dark:group-hover:text-gray-700" aria-hidden="true" />
                        <span className="sr-only">Home</span>
                    </Link>

                    <Link to="/creator/creator-events"
                        data-tooltip-target="tooltip-wallet" type="button" className="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-200 dark:hover:text-white group">
                        <RiCalendarEventFill className="w-5 h-5 text-gray-500 dark:text-gray-400 group-hover:bg-gray-200 dark:group-hover:text-gray-700" aria-hidden="true" />
                        <span className="sr-only">Events</span>
                    </Link>
                    <div className="flex items-center justify-center">
                        <button data-tooltip-target="tooltip-new" type="button"
                            onClick={OpenCamera}
                            className="inline-flex items-center justify-center border-2 border-black dark:border-white dark:hover:text-white hover:bg-gray-200 w-10 h-10 font-medium rounded-full group  focus:outline-none ">
                            <IoIosAddCircle className="w-4 h-4 text-gray-700 dark:text-gray-700" />
                            <span className="sr-only">Post</span>
                        </button>
                    </div>

                    <Link to="#"
                        data-tooltip-target="tooltip-settings" type="button" className="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-200 dark:hover:text-gray-50 group">
                        <RiMessageFill className="w-5 h-5 text-gray-500 dark:text-gray-400 group-hover:bg-gray-200 dark:group-hover:text-gray-700" />
                        <span className="sr-only">Messages</span>
                    </Link>

                    <Link data-tooltip-target="tooltip-profile" type="button"
                        to='/creator/creator-profile'
                        className="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-200 dark:hover:text-white group">
                        <FaCircleUser className="w-5 h-5 text-gray-500 dark:text-gray-400 group-hover:bg-gray-200 dark:group-hover:text-gray-700" />
                        <span className="sr-only">Profile</span>
                    </Link>
                </div>
            </div>
            {isCreate && (<Create closeCreate={closeCreate} />)}
            {
                isModalOpen && (
                    <Modal closeModal={CloseModal} />
                )
            }
            {
                isCameraOpen && (
                    <Camera closeCamera={closeCamera} />
                )
            }
        </div>
    )
}

export default Creator_sidebar