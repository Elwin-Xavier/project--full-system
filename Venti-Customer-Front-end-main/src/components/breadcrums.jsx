/* eslint-disable react/prop-types */
import React from 'react';
import { Link } from 'react-router-dom';
import { HiHome } from "react-icons/hi2";
import { IoIosArrowForward } from "react-icons/io";

const Breadcrumb = ({ links }) => {
    return (
        <nav aria-label="Breadcrumb">
            <ol className="flex items-center gap-1 text-lg text-gray-600 dark:text-white">
                {links.map((link, index) => (
                    <React.Fragment key={index}>
                        {index > 0 && (
                            <li className="rtl:rotate-180">
                                <IoIosArrowForward />
                            </li>
                        )}
                        <li>
                            {index === links.length - 1 ? (
                                <span className="block text-gray-700 dark:text-white">
                                    {link.label}
                                </span>
                            ) : link.path === '/' ? (
                                <Link to={link.path} className="block transition hover:text-gray-700 dark:text-white">
                                    <span className="sr-only">Home</span>
                                    <HiHome />
                                </Link>
                            ) : (
                                <Link to={link.path} className="block transition hover:text-gray-700 dark:text-white">
                                    {link.label}
                                </Link>
                            )}
                        </li>
                    </React.Fragment>
                ))}
            </ol>
        </nav>
    );
};

export default Breadcrumb;