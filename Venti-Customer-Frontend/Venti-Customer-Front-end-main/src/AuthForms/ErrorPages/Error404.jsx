/* eslint-disable no-unused-vars */
import React from 'react'
import { Link } from 'react-router-dom'

const Error404 = () => {
    return (
        <div className="grid h-screen place-content-center bg-white px-4">
            <div className="text-center">
                <h1 className="text-9xl font-black text-gray-400">404</h1>
                <p className="text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl">Uh-oh!</p>
                <p className="mt-4 text-gray-500">We can &apos; t find that page.</p>
                <Link
                type='button'
                    to="/signin"
                    className="button w-full mt-6 inline-block p-5 "
                >
                    Go Back
                </Link>
            </div>
        </div>
    )
}

export default Error404