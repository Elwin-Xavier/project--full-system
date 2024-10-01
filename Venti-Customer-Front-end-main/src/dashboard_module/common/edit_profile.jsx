/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react'
import { IoIosArrowBack } from "react-icons/io";
import { FaRegEye, FaRegEyeSlash, FaArrowLeftLong } from "react-icons/fa6";
import { X, AlertCircle } from 'lucide-react';
import { IoPencil } from "react-icons/io5";
import { ImCancelCircle } from "react-icons/im";
import { Success, Error } from '../../components/toasts';
import EndPoints from '../../Api/baseUrl/endPoints';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../providers/AuthProvider';

const Edit_profile = () => {
    const { register, handleSubmit, watch, formState: { touchedFields, isDirty, isValid, dirtyFields, isSubmitted, errors } } = useForm();
    const [changePassword, setChangePassword] = useState(false);
    const [changeEmail, setChangeEmail] = useState(false);
    const [changeName, setChangeName] = useState(false);
    const [changePhone, setChangePhone] = useState(false);
    const [changeBio, setChangeBio] = useState(false)
    const [deleteModal, setDeleteModal] = useState(false)
    const navigate = useNavigate()
    const {setUser} = useAuth()

    const [showOldPassword, setShowOldPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);

    const [userData, setUserData] = useState([]);
    const [error, setError] = useState('');

    const fetch_user_data = async () => {
        try {
            const { data } = await EndPoints.profile.fetch_user_profile()
            if (data.status != 200) {
                throw new Error('An Error Occurred! Login to Again')
            }
            setUserData(data)
        } catch (error) {
            setError(error.response.data.error)
        }
    }

    useEffect(() => {
        fetch_user_data();
    }, [])

    const edit_password = () => {
        setChangePassword(true);
    }
    const edit_email = () => {
        setChangeEmail(true)
    }
    const edit_name = () => {
        setChangeName(true)
    }
    const edit_phone = () => {
        setChangePhone(true)
    }
    const close_edit_password = () => {
        setChangePassword(false);
    }

    const toggleShowOldPassword = () => {
        setShowOldPassword(!showOldPassword);
    }
    const toggleShowNewPassword = () => {
        setShowNewPassword(!showNewPassword)
    }
    const toggleShowConfirmPassword = () => {
        setShowConfirmPassword(!showConfirmPassword);
    }
    const update_name = async (values) => {

        try {
            const { data } = await EndPoints.profile.update_profile({
                username: values.name,
            })

            if (data.status != 200) { throw Error('An Error occured! Logout and login again') }
            else {
                Success(data.message)
                fetch_user_data()
                setChangeName(false);
            }
        } catch (error) {
            Error(error.response.data.message)
        }
    }

    const update_bio = async (values) => {
        try {
            const { data } = await EndPoints.profile.update_profile({
                bio: values.bio,
            })

            if (data.status != 200) { throw Error('An Error occured! Logout and login again') }
            else {
                Success(data.message)
                fetch_user_data()
                setChangeBio(false);
            }
        } catch (error) {
            Error(error.response.data.message)
        }
    }
    const update_email = async (values) => {
        try {
            const { data } = await EndPoints.profile.update_profile({
                email: values.new_email,
            })
            if (data.status != 200) { throw Error('An Error occured! Logout and login again') }
            else {
                Success(data.message)
                fetch_user_data()
                setChangeEmail(false);
            }
        } catch (error) {
            Error(error.response.data.message)
        }
    }

    const update_phone = async (values) => {
        try {
            const { data } = await EndPoints.profile.update_profile({
                phoneNumber: values.phone,
            })
            if (data.status != 200) { throw Error('An Error occured! Logout and login again') }
            else {
                Success(data.message)
                fetch_user_data()
                setChangePhone(false);
            }
        } catch (error) {
            Error(error.response.data.message)
        }
    }
    const delete_account = async () => {
        try {
            const { data } = await EndPoints.Auth.delete_users()
            Success(data.message)
            setUser(null)
            navigate('/')
        } catch (error) {
            Error(error.response.data.error)
        }
    }

    const updatePassword = async (values) => {
        try {
            const { data } = await EndPoints.Settings.update_password({
                currentPassword: values.currentPassword,
                newPassword: values.newPassword,
            })
            if (data.status != 200) { throw Error('An Error occured! Logout and login again') }
            else {
                Success(data.message)
                fetch_user_data()
                close_edit_password();
            }
        } catch (error) {
            Error(error.response.data.message)
        }
    }
    return (
        <div>
            <button
                onClick={() => window.history.back()}
                className='flex items-center ml-3'>
                <FaArrowLeftLong className='h-6 w-6' />
                <p className='font-bold hover:underline '>Back</p>
            </button>
            <div className="mx-4 min-h-screen max-w-screen-xl sm:mx-4 xl:mx-auto">
                <h1 className="border-b py-6 px-6 text-4xl font-semibold">Edit Profile</h1>
                <div className="grid grid-cols-8 pt-3 sm:grid-cols-10">
                    <div className="col-span-8 overflow-hidden rounded-xl sm:px-8 ">
                        <div className="pt-4">
                            <h1 className="py-2 text-2xl font-semibold">Profile settings</h1>
                        </div>
                        <hr className="mt-4 mb-8" />
                        <p className="py-2 text-xl font-semibold">Name</p>
                        {!changeName ? (
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                                <p className=""><strong>{userData.username}</strong></p>
                                <button
                                    onClick={edit_name}
                                    className="inline-flex text-sm font-semibold text-blue-600 underline decoration-2">
                                    <span><IoPencil /></span>Edit</button>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit(update_name)}>
                                <div className="items-center space-y-3 ">
                                    <div>
                                        <label htmlFor="name" className="sr-only">Profile Name</label>
                                        <div className="relative">
                                            <input
                                                id="name"
                                                type="text"
                                                className="w-full rounded-lg dark:bg-transparent dark:text-white text-black border border-gray-700 p-2 pe-12 text-sm shadow-sm"
                                                defaultValue={userData.username}
                                                {...register("name", {
                                                    required: "Profile name is required",
                                                })}
                                            />
                                        </div>
                                        {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
                                    </div>
                                    <div className="flex space-x-4 mt-4">
                                        <button
                                            type='submit'
                                            className="button rounded-lg">Save Name</button>
                                        <button
                                            onClick={() => setChangeName(false)}
                                            className="border flex items-center text-red-500 space-x-2 px-2 rounded-lg dark:hover:bg-red-100 hover:bg-red-100">
                                            <ImCancelCircle className='mr-2' />
                                            Cancel
                                        </button>
                                    </div>
                                </div>
                            </form>
                        )}

                        <hr className="mt-4 mb-8" />
                        <p className="py-2 text-xl font-semibold">Bio</p>
                        {!changeBio ? (
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                                <p className=""><strong>{userData.bio || ''}</strong></p>
                                <button
                                    onClick={() => setChangeBio(true)}
                                    className="inline-flex text-sm font-semibold text-blue-600 underline decoration-2">
                                    <span><IoPencil /></span>Edit</button>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit(update_bio)}>
                                <div className="items-center space-y-3 ">
                                    <div>
                                        <label htmlFor="bio" className="sr-only">Bio</label>
                                        <div className="relative">
                                            <textarea
                                                id="bio"
                                                type="text"
                                                className="w-full rounded-lg dark:bg-transparent dark:text-white text-black border border-gray-700 p-2 pe-12 text-sm shadow-sm"
                                                defaultValue={userData.bio}
                                                {...register("bio", {
                                                    required: "Profile Bio is required",
                                                })}
                                            />
                                        </div>
                                        {errors.bio && <p className="text-red-500 text-sm mt-1">{errors.bio.message}</p>}
                                    </div>
                                    <div className="flex space-x-4 mt-4">
                                        <button
                                            type='submit'
                                            className="button rounded-lg">Save Name</button>
                                        <button
                                            onClick={() => setChangeBio(false)}
                                            className="border flex items-center text-red-500 space-x-2 px-2 rounded-lg dark:hover:bg-red-100 hover:bg-red-100">
                                            <ImCancelCircle className='mr-2' />
                                            Cancel
                                        </button>
                                    </div>
                                </div>
                            </form>
                        )}

                        <hr className="mt-4 mb-8" />
                        <p className="py-2 text-xl font-semibold">Email Address</p>
                        {!changeEmail ? (
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                                <p className=""><strong>{userData.email}</strong></p>
                                <button
                                    onClick={edit_email}
                                    className="inline-flex text-sm font-semibold text-blue-600 underline decoration-2">
                                    <span><IoPencil /></span>Edit</button>
                            </div>
                        ) : (
                            // <form onSubmit={handleSubmit(update_email)}>
                            <div className="items-center space-y-3 ">
                                <div>
                                    <label htmlFor="email" className="sr-only">Email Address</label>
                                    <div className="relative">
                                        <input
                                            type="email"
                                            className="w-full rounded-lg border dark:bg-transparent dark:text-white text-black border-gray-700 p-2 pe-12 text-sm shadow-sm"
                                            defaultValue={userData.email}
                                            {...register("new_email", {
                                                required: "Profile Email is required",
                                            })}
                                        />
                                    </div>
                                    {errors.new_email && <p className="text-red-500 text-sm mt-1">{errors.new_email.message}</p>}
                                </div>
                                <div className="flex space-x-4 mt-4">
                                    <button
                                        onClick={handleSubmit(update_email)}
                                        className="button rounded-lg">Save Email</button>
                                    <button
                                        onClick={() => setChangeEmail(false)}
                                        className="border flex items-center text-red-500 space-x-2 px-2 rounded-lg dark:hover:bg-red-100 hover:bg-red-100">
                                        <ImCancelCircle className='mr-2' />
                                        Cancel
                                    </button>
                                </div>
                            </div>
                            // </form>
                        )}
                        <hr className="mt-4 mb-8" />
                        <p className="py-2 text-xl font-semibold">Phone Number</p>
                        {!changePhone ? (
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                                <p className=""><strong>{userData.phoneNumber}</strong></p>
                                <button
                                    onClick={edit_phone}
                                    className="inline-flex text-sm font-semibold text-blue-600 underline decoration-2">
                                    <span><IoPencil /></span>Edit</button>
                            </div>
                        ) : (
                            <div className="items-center space-y-3 ">
                                <div>
                                    <label htmlFor="phone" className="sr-only">Phone Number</label>
                                    <div className="relative">
                                        <input
                                            type="tel"
                                            className="w-full rounded-lg border dark:bg-transparent dark:text-white text-black font-medium border-gray-700 p-2 pe-12 text-sm shadow-sm"
                                            defaultValue={userData.phoneNumber}
                                            {...register("phone", {
                                                required: "Profile phone number is required",
                                            })}
                                        />
                                    </div>
                                    {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>}
                                </div>
                                <div className="flex space-x-4 mt-4">
                                    <button onClick={handleSubmit(update_phone)}
                                        className="button rounded-lg">Save Phone</button>
                                    <button
                                        onClick={() => setChangePhone(false)}
                                        className="border flex items-center text-red-500 space-x-2 px-2 rounded-lg dark:hover:bg-red-100 hover:bg-red-100">
                                        <ImCancelCircle className='mr-2' />
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        )}

                        <hr className="mt-4 mb-8" />
                        <p className="py-2 text-xl font-semibold">Password</p>
                        {!changePassword ? (
                            <>
                                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                                    <p className="">Last Updated <strong> 19/2/1965</strong></p>
                                    <button
                                        onClick={edit_password}
                                        className="inline-flex text-sm font-semibold text-blue-600 underline decoration-2">
                                        <span className=''><IoPencil /></span>Edit</button>
                                </div>
                            </>
                        ) : (
                            <>
                                <form onSubmit={handleSubmit(updatePassword)}>
                                    <div className="items-center space-y-3 ">
                                        <div>
                                            <label htmlFor="Old_password" className="">Old Password</label>
                                            <div className="relative">
                                                <input
                                                    type={showOldPassword ? "text" : "password"}
                                                    className="w-full rounded-lg border dark:bg-transparent dark:text-white text-black border-gray-700 p-2 pe-12 text-sm shadow-sm"
                                                    {...register("currentPassword", {
                                                        required: "Old password is required"
                                                    })}
                                                />
                                                <button
                                                    type="button"
                                                    onClick={toggleShowOldPassword}
                                                    className="absolute inset-y-0 end-0 grid place-content-center px-4"
                                                >
                                                    {showOldPassword ? (
                                                        <FaRegEye className="text-gray-600" />
                                                    ) : (
                                                        <FaRegEyeSlash className="text-gray-600" />
                                                    )}
                                                </button>
                                            </div>
                                            {errors.currentPassword && <p className="text-red-500 text-sm mt-1">{errors.currentPassword.message}</p>}
                                        </div>
                                        <div>
                                            <label htmlFor="new_password" className="">New Password</label>
                                            <div className="relative">
                                                <input
                                                    type={showNewPassword ? "text" : "password"}
                                                    className="w-full rounded-lg border dark:bg-transparent dark:text-white border-gray-700 p-2 text-black pe-12 text-sm shadow-sm"
                                                    {...register("newPassword", {
                                                        required: "New password is required",
                                                        minLength: {
                                                            value: 8,
                                                            message: "New password must be at least 8 characters long"
                                                        }
                                                    })}
                                                />
                                                <button
                                                    type="button"
                                                    onClick={toggleShowNewPassword}
                                                    className="absolute inset-y-0 end-0 grid place-content-center px-4"
                                                >
                                                    {showNewPassword ? (
                                                        <FaRegEye className="text-gray-600" />
                                                    ) : (
                                                        <FaRegEyeSlash className="text-gray-600" />
                                                    )}
                                                </button>
                                            </div>
                                            {errors.newPassword && <p className="text-red-500 text-sm mt-1">{errors.newPassword.message}</p>}
                                        </div>

                                        <div>
                                            <label htmlFor="confirm_password" className="">Confirm Password</label>
                                            <div className="relative">
                                                <input
                                                    type={showConfirmPassword ? "text" : "password"}
                                                    className="w-full rounded-lg border dark:bg-transparent dark:text-white text-black border-gray-700 p-2 pe-12 text-sm shadow-sm"
                                                    {...register("confirmPassword", {
                                                        required: "Please confirm your new password",
                                                        validate: value => value === watch('newPassword') || "Passwords do not match"
                                                    })}
                                                />
                                                <button
                                                    type="button"
                                                    onClick={toggleShowConfirmPassword}
                                                    className="absolute inset-y-0 end-0 grid place-content-center px-4"
                                                >
                                                    {showConfirmPassword ? (
                                                        <FaRegEye className="text-gray-600" />
                                                    ) : (
                                                        <FaRegEyeSlash className="text-gray-600" />
                                                    )}
                                                </button>
                                            </div>
                                            {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword.message}</p>}
                                        </div>
                                    </div>
                                    <p className="mt-2">Can&apos;t remember your current password. <a className="text-sm font-semibold text-blue-600 underline decoration-2" href="#">Recover Account</a></p>
                                    <div className="flex space-x-4 mt-4">
                                        <button className="button rounded-lg">Save Password</button>
                                        <button
                                            onClick={() => close_edit_password()}
                                            className="border flex items-center text-red-500 space-x-2 px-2 rounded-lg dark:hover:bg-red-100 hover:bg-red-100">
                                            <ImCancelCircle className='mr-2' />
                                            Cancel
                                        </button>
                                    </div>
                                </form>

                            </>
                        )}

                        <hr className="mt-4 mb-8" />

                        <div className="mb-10">
                            <p className="py-2 text-xl font-semibold">Delete Account</p>
                            <p className="inline-flex items-center rounded-full bg-rose-100 px-4 py-1 text-rose-600">
                                <svg xmlns="http://www.w3.org/2000/svg" className="mr-2 h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" />
                                </svg>
                                Proceed with caution
                            </p>
                            <p className="mt-2">Make sure you have taken backup of your account in case you ever need to get access to your data. We will completely wipe your data. There is no way to access your account after this action.</p>
                            <button onClick={()=>setDeleteModal(true)} className="ml-auto text-sm font-semibold text-rose-600 underline decoration-2">Continue with deletion</button>
                        </div>
                        {deleteModal && (
                            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                                <div className="w-full max-w-md p-6 mx-4 bg-white rounded-lg shadow-xl dark:bg-gray-800">
                                    <div className="flex justify-end">
                                        <button
                                            onClick={() => setDeleteModal(false)}
                                            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors duration-200"
                                        >
                                            <X size={24} />
                                        </button>
                                    </div>
                                    <div className="mt-4 text-center">
                                        <AlertCircle size={48} className="mx-auto text-red-500 dark:text-red-400" />
                                        <h2 className="mt-4 text-xl font-semibold text-gray-800 dark:text-gray-100">
                                            Confirm Deletion
                                        </h2>
                                        <p className="mt-2 text-gray-600 dark:text-gray-300">
                                            Are you sure you want to delete this account? This action cannot be undone.
                                        </p>
                                    </div>
                                    <div className="mt-6 flex justify-center space-x-4">
                                        <button
                                            onClick={delete_account}
                                            className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 transition-colors duration-200"
                                        >
                                            Yes, delete it
                                        </button>
                                        <button
                                            onClick={() => setDeleteModal(false)}
                                            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 transition-colors duration-200 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Edit_profile;