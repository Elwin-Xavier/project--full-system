/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { IoMdClose } from "react-icons/io";
import { LuHelpCircle } from "react-icons/lu";

export function Modal({ closeModal }) {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setIsVisible(true), 50);
        return () => clearTimeout(timer);
    }, []);

    const modalStyles = {
        transform: isVisible ? 'translateY(0)' : 'translateY(100%)',
        opacity: isVisible ? 1 : 0,
        transition: 'transform 0.5s ease-out, opacity 0.5s ease-out',
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden">
            <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity duration-300"
                onClick={closeModal}
                style={{ opacity: isVisible ? 1 : 0 }}></div>
            <div className="relative w-full max-w-lg p-4" style={modalStyles}>
                <div className="relative bg-white rounded-lg shadow-lg dark:bg-gray-800">
                    <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                        <Link to="/report-a-problem" >
                        <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">
                            <LuHelpCircle/>
                        </h3>
                        </Link>
                        <button onClick={closeModal} type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white">
                            <IoMdClose className="w-6 h-6" aria-hidden="true" />
                            <span className="sr-only">Close modal</span>
                        </button>
                    </div>
                    
                    <div className="p-6 md:p-5 space-y-6 flex flex-col items-center justify-center">
                        <div className="text-center">
                            <h1 className="text-4xl font-bold">Log in to Ventie</h1>
                            <p>Manage your account, check notifications, like and comment on posts</p>
                        </div>
                        <Link
                            to="/signin"
                            className="button border rounded-full mx-auto w-4/5 block text-center py-2 px-4 transition duration-300 ease-in-out"
                        >
                            Login
                        </Link>
                        <div className="w-full flex items-center justify-center">
                            <hr className="w-full border-gray-300" />
                            <span className="px-3 text-gray-500">or</span>
                            <hr className="w-full border-gray-300" />
                        </div>
                        <Link
                            to="/signup"
                            className="button border rounded-full mx-auto w-4/5 block text-center py-2 px-4 transition duration-300 ease-in-out"
                        >
                            Sign up
                        </Link>
                    </div>
                    <div className="p-4 text-center">
                        <p>
                            By continuing with an account, you agree to our <Link to="/terms" className="text-blue-500">Terms of Service</Link> and acknowledge you have read our <Link to="/policies" className="text-blue-500">Policies</Link>.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
