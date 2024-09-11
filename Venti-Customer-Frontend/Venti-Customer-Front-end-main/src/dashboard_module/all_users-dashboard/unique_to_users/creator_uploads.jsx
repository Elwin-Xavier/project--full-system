/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { IoCloudUploadOutline, IoArrowBack } from "react-icons/io5";
import EndPoints from '../../../Api/baseUrl/endPoints';
import { Success, Error } from '../../../components/toasts';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { useAuth } from '../../../providers/AuthProvider';
import { GoArrowLeft } from "react-icons/go";

const Creator_uploads = () => {
    const { user } = useAuth();
    const [idFrontImage, setIdFrontImage] = useState(null);
    const [idFrontImagePreview, setIdFrontImagePreview] = useState('');
    const [idBackImage, setIdBackImage] = useState(null);
    const [idBackImagePreview, setIdBackImagePreview] = useState('');
    const [profileImage, setProfileImage] = useState(null);
    const [profileImagePreview, setProfileImagePreview] = useState('');

    const handleFrontImageUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            setIdFrontImage(file);
            setIdFrontImagePreview(URL.createObjectURL(file));
        }
    };

    const handleBackImageUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            setIdBackImage(file);
            setIdBackImagePreview(URL.createObjectURL(file));
        }
    };

    const handleFaceImageUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            setProfileImage(file);
            setProfileImagePreview(URL.createObjectURL(file));
        }
    };
    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = async (values) => {
        try {
            const formData = new FormData();
            formData.append('userId', user.userId)
            formData.append('fullName', values.fullName);
            formData.append('idNumber', values.idNumber);
            formData.append('address', values.address);
            formData.append('idFrontImage', idFrontImage);
            formData.append('idBackImage', idBackImage);
            formData.append('profileImage', profileImage);

            const {data} = await EndPoints.Settings.creator_uploads(formData);
            if(data.status !=200){throw new Error(data.message || 'An Error Occurred!')}
            Success(data.message)
        } catch (error) {
            Error(error?.response?.data?.error || error?.response?.data?.message);
        }
    };

    return (
        <div className="container justify-center p-4 flex flex-col min-h-full">
            <button onClick={()=>window.history.back()} className='flex mb-5 items-center font-bold'>
            <GoArrowLeft className='h-6 w-6' /> 
            Back
            </button>
            
            <h1 className="text-2xl font-bold mb-6">Settings</h1>
            <div className="block pl-4 pr-4 pt-4 border border-gray-200 rounded-lg items-center justify-center">
                <h5 className="mb-2 text-2xl font-bold tracking-tight ">
                    Verify your account
                </h5>
                <p className="font-normal text-gray-700 border-b dark:text-white">
                    We request for this documents to verify the creator.
                </p>
                <div className="max-w-screen-xl sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 gap-x-16 gap-y-8 lg:grid-cols-5">
                        <div className="rounded-lg p-8 lg:col-span-3 lg:p-12">
                            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                                <div>
                                    <label htmlFor="fullName">Full Name</label>
                                    <input
                                        className="w-full rounded-lg border border-gray-400 dark:border-gray-100 dark:bg-transparent p-3 text-sm"
                                        placeholder="Enter full name"
                                        type="text"
                                        id="fullName"
                                        {...register('fullName', { required: 'Full name is required' })}
                                    />
                                    {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName.message}</p>}
                                </div>
                                <div>
                                    <label htmlFor="idNumber">ID no./Passport</label>
                                    <input
                                        className="w-full rounded-lg border border-gray-400 dark:border-gray-100 dark:bg-transparent p-3 text-sm"
                                        placeholder="Enter Identity number"
                                        type="text"
                                        id="idNumber"
                                        {...register('idNumber', { required: 'ID number is required' })}
                                    />
                                    {errors.idNumber && <p className="text-red-500 text-sm mt-1">{errors.idNumber.message}</p>}
                                </div>
                                <div>
                                    <label htmlFor="address">Address</label>
                                    <input
                                        className="w-full rounded-lg border border-gray-400 dark:border-gray-100 dark:bg-transparent p-3 text-sm"
                                        placeholder="Enter Address"
                                        type="text"
                                        id="address"
                                        {...register('address', { required: 'Address is required' })}
                                    />
                                    {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address.message}</p>}
                                </div>

                                <p className="block mb-2 text-sm font-medium dark:text-gray-300">Attach front photo of the identity document for the country you specified above.</p>
                                <p className="block mb-2 text-sm font-medium dark:text-gray-300">Make sure the following data is visible:</p>
                                <p className="block mb-2 text-sm font-medium dark:text-gray-300">- Number</p>
                                <p className="block mb-2 text-sm font-medium dark:text-gray-300">- Country of issue</p>

                                <div className="flex items-center font-sans">
                                    <label className="cursor-pointer flex w-full max-w-lg flex-col items-center rounded-xl border-2 border-dashed p-6 text-center">
                                        <IoCloudUploadOutline className="h-10 w-10 " />
                                        <h2 className="mt-4 text-xl font-medium text-gray-700 tracking-wide">ID/Passport Front Image</h2>
                                        <p className="mt-2 text-gray-500 tracking-wide">Upload or drag & drop your file PNG, JPG. </p>
                                        <input
                                            id="front_id_file"
                                            type="file"
                                            accept="image/*"
                                            className="hidden"
                                            onChange={handleFrontImageUpload}
                                        />
                                    </label>
                                </div>

                                <p className="block mb-2 text-sm font-medium dark:text-gray-300">Attach back photo of the identity document for the country you specified above.</p>
                                <p className="block mb-2 text-sm font-medium dark:text-gray-300">Make sure the following data is visible:</p>
                                <p className="block mb-2 text-sm font-medium dark:text-gray-300">- Number</p>
                                <p className="block mb-2 text-sm font-medium dark:text-gray-300">- Country of issue</p>

                                <div className="flex items-center font-sans">
                                    <label className="cursor-pointer flex w-full max-w-lg flex-col items-center rounded-xl border-2 border-dashed p-6 text-center">
                                        <IoCloudUploadOutline className="h-10 w-10 " />
                                        <h2 className="mt-4 text-xl font-medium text-gray-700 tracking-wide">ID/Passport Back Image</h2>
                                        <p className="mt-2 text-gray-500 tracking-wide">Upload or drag & drop your file PNG, JPG. </p>
                                        <input
                                            id="back_id_file"
                                            type="file"
                                            accept="image/*"
                                            className="hidden"
                                            onChange={handleBackImageUpload}
                                        />
                                    </label>
                                </div>

                                <p className="block mb-2 text-sm font-medium dark:text-gray-300">Attach Passport Size photo of your face.</p>
                                <p className="block mb-2 text-sm font-medium dark:text-gray-300">Make sure it is visible:</p>

                                <div className="flex items-center font-sans">
                                    <label className="cursor-pointer flex w-full max-w-lg flex-col items-center rounded-xl border-2 border-dashed p-6 text-center">
                                        <IoCloudUploadOutline className="h-10 w-10 " />
                                        <h2 className="mt-4 text-xl font-medium text-gray-700 tracking-wide">Face Image</h2>
                                        <p className="mt-2 text-gray-500 tracking-wide">Upload or drag & drop your file PNG, JPG. </p>
                                        <input
                                            id="face_image_file"
                                            type="file"
                                            accept="image/*"
                                            className="hidden"
                                            onChange={handleFaceImageUpload}
                                        />
                                    </label>
                                </div>

                                <div className="mt-4 flex space-x-6">
                                    <button
                                        type="submit"
                                        className="button inline-block w-full px-5 py-3 font-medium text-white rounded-lg sm:w-auto">
                                        Verify Account
                                    </button>
                                    <Link to='/settings-page'
                                        type="submit"
                                        className="flex items-center w-full px-5 py-3 font-medium border hover:bg-gray-200 dark:hover:text-black rounded-lg sm:w-auto">
                                        <IoArrowBack/>Back
                                    </Link>
                                </div>
                            </form>
                        </div>

                        <div className="lg:col-span-2 lg:py-12">
                            <p className="max-w-xl text-lg">
                                - Provide All the required data.
                            </p>
                            <p className="max-w-xl text-lg">
                                - Images should be clear and all data can be seen.
                            </p>
                            {idFrontImagePreview &&
                                <div className="mt-8 p-2 h-40 w-40">
                                    <img src={idFrontImagePreview} alt="ID Front Preview" />
                                    <div className="not-italic">ID/Passport Front</div>
                                </div>
                            }
                            {idBackImagePreview &&
                                <div className="mt-8 p-2 h-40 w-40">
                                    <img src={idBackImagePreview} alt="ID Back Preview" />
                                    <div className="not-italic">ID/Passport Back</div>
                                </div>
                            }
                            {profileImagePreview &&
                                <div className="mt-8 p-2 h-40 w-40">
                                    <img src={profileImagePreview} alt="Face Image Preview" />
                                    <div className="not-italic">Face Image</div>
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Creator_uploads;
