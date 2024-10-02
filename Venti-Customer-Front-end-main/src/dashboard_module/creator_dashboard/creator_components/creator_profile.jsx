/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { TbTableFilled } from "react-icons/tb";
import { FaWindowRestore, FaCircleUser, FaPhone } from "react-icons/fa6";
import { IoPencil } from "react-icons/io5";
import { RiMailFill } from "react-icons/ri";
import EndPoints from '../../../Api/baseUrl/endPoints';
import { Success, Error } from '../../../components/toasts';
import { Heart, MessageCircle, Trash2, Search, Mail, Phone, Pencil, CircleUserRound, Grid2X2 } from 'lucide-react';

const Creator_profile = () => {
    const [previewImage, setPreviewImage] = useState(null);
    const [currentDiv, setCurrentDiv] = useState('posts');
    const [divs, setDivs] = useState('profile');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState([]);
    const [userposts, setUserPosts] = useState([])

    const fetch_user = async () => {
        try {
            const { data } = await EndPoints.profile.fetch_user_profile()
            if (data.status != 200) {
                throw new Error('An Error occurred!')
            }
            setUser(data)
        } catch (error) {
            Error(error.response.data.error || 'Profile does not exist!')
        }
    }
    const fetch_user_posts = async () => {
        try {
            const { data } = await EndPoints.posts.fetch_users_posts()
            if (data.status == 200) {
                setUserPosts(data.posts)
            } else {
                throw new Error
            }
        } catch (error) {
            Error(error.response.data.error)
        }
    }

    useEffect(() => {
        fetch_user()
        fetch_user_posts()
    }, [])

    const handleFileInputChange = async (event) => {
        const file = event.target.files[0];
        if (file) {
            if (!file.type.startsWith('image/')) {
                setError('Please select a valid image file');
                setPreviewImage(null);
                return;
            }
            setError('');
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewImage(reader.result);
            };
            reader.readAsDataURL(file);
            await uploadImage(file);
        } else {
            setPreviewImage(null);
        }
    };

    const uploadImage = async (file) => {
        setLoading(true);
        try {
            const formData = new FormData();
            formData.append('profilePicture', file);

            const { data } = await EndPoints.profile.update_profile(formData);

            if (data.status != 200) {
                throw new Error('Image upload failed');
            }
            setUser(data.user)
            Success(data.message)
        } catch (error) {
            setError('Error uploading image: ' + (error.message || 'Unknown error'));
        } finally {
            setLoading(false);
        }
    };

    const handleClick = () => {
        document.getElementById('fileInput').click();
    };

    const delete_post = async (id) => {
        try {
            const { data } = await EndPoints.posts.delete(id)
            if (data.status == 200) {
                Success(data.message)
                fetch_user_posts()
            } else {
                throw new Error
            }
        } catch (error) {
            Error(error.response.data.error)
        }
    }
    return (
        <>
                       <div className="h-full px-4 flex flex-col items-center">
                <div className="relative flex flex-col w-full min-w-0 mb-6 break-words bg-clip-border rounded-2xl bg-light/30 draggable ">
                    <div className="px-9 pt-9 flex-auto min-h-[70px] pb-0 bg-transparent">
                        <div className="flex flex-col sm:flex-row items-center">
                            <div className="relative mb-6 sm:mb-0 sm:mr-6">
                                {user.profilePicture ? (
                                    <img
                                        className="w-32 h-32 sm:w-40 sm:h-40 rounded-full object-cover border-4 border-gray-200 dark:border-gray-700"
                                        src={user.profilePicture}
                                        alt={user.username}
                                    />
                                ) : (
                                    <CircleUserRound className="w-32 h-32 sm:w-40 sm:h-40 text-gray-400 dark:text-gray-600" />
                                )}
                                <button
                                    onClick={handleClick}
                                    className="absolute bottom-0 right-0 bg-blue-500 hover:bg-blue-600 text-white rounded-full p-2 shadow-lg transition duration-200"
                                >
                                    <Pencil className="w-5 h-5" />
                                </button>
                                <input
                                    type="file"
                                    id="fileInput"
                                    className="hidden"
                                    accept="image/jpeg,image/png,image/jpg"
                                    onChange={handleFileInputChange}
                                />
                            </div>
                            <div className="flex flex-wrap items-start justify-between mb-2">
                                <div className="flex flex-col">
                                    <div className="flex items-center mb-2">
                                        <p className="text-secondary-inverse hover:text-primary transition-colors duration-200 ease-in-out font-semibold text-[1.5rem] mr-1">
                                            {user.username}
                                        </p>
                                    </div>
                                    <div className="flex flex-wrap pr-2 mb-4 font-medium">
                                        <p className="flex items-center mb-2 mr-5 hover:text-primary">
                                            <span className="mr-1">
                                                <Phone className="w-5 h-5" />
                                            </span> {user.phoneNumber}
                                        </p>
                                        <p className="flex items-center mb-2 mr-5 text-secondary-dark hover:text-primary">
                                            <span className="mr-1">
                                                <Mail className="w-5 h-5" />
                                            </span>{user.email}
                                        </p>
                                    </div>

                                </div>
                                <div className="mt-8 flex justify-center sm:justify-start">
                                    <Link
                                        to="/creator/edit-creator-profile"
                                        className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-200">
                                        Edit Profile
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div className="pt-6 mx-6 mt-6 text-center border-gray-200 dark:border-gray-700/50">
                            <div>
                                <div className="w-full px-6">
                                    <p className="mb-4 font-light leading-relaxed text-gray-600 dark:text-gray-400">
                                        {user.bio || ''}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <hr className="w-full h-px border-neutral-200" />
                        <div className="hidden sm:flex group flex-wrap items-center justify-center font-semibold list-none border-b-2 border-transparent border-solid">
                            <Link onClick={() => setCurrentDiv('posts')}
                                className="flex items-center mt-2 -mb-[2px]">
                                <Grid2X2 className='mr-2' />
                                <span
                                    aria-controls="summary"
                                    className="py-5 mr-10 sm:mr-3 lg:mr-10 transition-colors duration-200 ease-in-out border-b-2 border-transparent group-[.active-summary]:border-primary group-[.active-summary]:text-primary text-muted hover:border-primary"
                                >
                                    Posts
                                </span>
                            </Link>
                        </div>

                        <div className=" sm:hidden group flex flex-wrap items-center justify-center font-semibold list-none border-b-2 border-transparent border-solid active-assignments">
                            <Link onClick={() => setCurrentDiv('posts')}
                                className="flex items-center mt-2 -mb-[2px]">
                                <Grid2X2 className='mr-2' />
                                <span
                                    aria-controls="summary"
                                    className="py-5 mr-10 sm:mr-3 lg:mr-10 transition-colors duration-200 ease-in-out border-b-2 border-transparent group-[.active-summary]:border-primary group-[.active-summary]:text-primary text-muted hover:border-primary">
                                    Posts
                                </span>
                            </Link>
                        </div>
                        <div>
                            <hr className="w-full h-px border-neutral-200 mb-2" />
                            <>
                                {userposts.length === 0 ? (
                                    <div className="flex justify-center my-12">
                                        <div className="max-w-sm text-center">
                                            <Search className="w-8 h-8 text-blue-500 mx-auto" />
                                            <h3 className="mt-6 text-2xl text-gray-800 dark:text-gray-200">No Posts Found</h3>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                        {userposts.map((post, index) => (
                                            <div key={index} className="group relative overflow-hidden rounded-xl shadow-lg transition-all duration-300 hover:shadow-2xl hover:scale-105">
                                                <img
                                                    className="h-64 w-full object-cover transition-transform duration-300 group-hover:scale-110"
                                                    src={post.imageUrl}
                                                    alt={`Post ${index + 1}`}
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black opacity-0 transition-opacity duration-300 group-hover:opacity-70" />
                                                <div className="absolute inset-0 flex flex-col justify-between p-4 opacity-0 transition-all duration-300 group-hover:opacity-100">
                                                    <div className="self-end">
                                                        <button
                                                            onClick={() => delete_post(post._id)}
                                                            className="p-2 bg-red-500 rounded-full text-white hover:bg-red-600 transition-colors duration-300"
                                                            aria-label="Delete post"
                                                        >
                                                            <Trash2 className="w-4 h-4" />
                                                        </button>
                                                    </div>
                                                    <div>
                                                        <div className="flex items-center space-x-4 text-white mb-2">
                                                            <p className="flex items-center space-x-1">
                                                                <Heart className="w-4 h-4" />
                                                                <span>{post.likes.length}</span>
                                                            </p>
                                                            <p className="flex items-center space-x-1">
                                                                <MessageCircle className="w-4 h-4" />
                                                                <span>{post.comments.length}</span>
                                                            </p>
                                                        </div>
                                                        <p className="text-sm text-white font-medium line-clamp-2">
                                                            {post.caption}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </>
                        </div>
                    </div>
                </div>
            </div >
        </>
    )
}

export default Creator_profile;