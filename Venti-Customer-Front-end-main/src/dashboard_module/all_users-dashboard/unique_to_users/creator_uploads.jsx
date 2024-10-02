/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import EndPoints from '../../../Api/baseUrl/endPoints';
import { Success, Error } from '../../../components/toasts';
import { useForm } from 'react-hook-form';
import { useAuth } from '../../../providers/AuthProvider';
import { ArrowLeft, CloudUpload, X } from 'lucide-react';

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

            const { data } = await EndPoints.Settings.creator_uploads(formData);
            if (data.status != 200) { throw new Error(data.message || 'An Error Occurred!') }
            Success(data.message)
        } catch (error) {
            Error(error?.response?.data?.error || error?.response?.data?.message);
        }
    };

    return (
        <div className=" ">
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-md">
                <div className="max-w-4xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
                    <div className="relative flex space-x-7 items-center justify-center">
                        <button
                            onClick={() => window.history.back()}
                            className="relative left-0 flex space-x-2 text-white hover:text-blue-200 transition duration-300 ease-in-out">
                            <ArrowLeft className="h-8 w-8" />
                        </button>
                        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
                            Verify your account
                        </h1>
                    </div>

                </div>
            </div>
            <div>
                <div className="block p-4 shadow-lg dark:shadow-slate-800 rounded-lg items-center justify-center">
                    <div className="">
                        <div className="flex sm:w-3/4">
                            <div className="rounded-lg p-8 ">
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
                                            <CloudUpload className="h-10 w-10 " />
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
                                            <CloudUpload className="h-10 w-10 " />
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
                                            <CloudUpload className="h-10 w-10 " />
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
                                    <div className="m-4 w-full">
                                        <button
                                            type="submit"
                                            className="button font-medium text-white rounded-lg ">
                                            Verify Account
                                        </button>
                                    </div>

                                </form>
                            </div>

                            <div className="p-4 hidden sm:block w-1/4 items-center">
                                <ul className='list-disc'>
                                    <li className=" text-lg">
                                        Provide All the required data.
                                    </li>
                                    <li className=" text-lg">
                                        Images should be clear and all data can be seen.
                                    </li>
                                </ul>

                                {idFrontImagePreview &&
                                    <div className="mt-8 p-2 ">
                                        <div className='relative'>
                                            <img src={idFrontImagePreview} className='object-cover h-40 w-40' alt="ID Front Preview" />
                                            <button
                                            onClick={()=>setIdFrontImagePreview(null)}
                                                className="absolute top-3 right-3 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-full p-2 shadow-md hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-200">
                                                <X className="w-6 h-6" />
                                            </button>
                                        </div>
                                        <div className="not-italic">ID/Passport Front</div>
                                    </div>
                                }
                                {idBackImagePreview &&
                                    <div className="mt-8 p-2">
                                        <div className='relative'>
                                            <img src={idBackImagePreview} className='object-cover h-40 w-40' alt="ID Back Preview" />
                                            <button
                                            onClick={()=>setIdBackImagePreview(null)}
                                                className="absolute top-3 right-3 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-full p-2 shadow-md hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-200">
                                                <X className="w-6 h-6" />
                                            </button>
                                        </div>
                                        <div className="not-italic">ID/Passport Back</div>
                                    </div>
                                }
                                {profileImagePreview &&
                                    <div className="mt-8 p-2 h-40 w-40">
                                        <div className='relative'>
                                            <img src={profileImagePreview} className='object-cover h-40 w-40' alt="Face Image Preview" />
                                            <button
                                                onClick={()=>setProfileImagePreview(null)}
                                                className="absolute top-3 right-3 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-full p-2 shadow-md hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-200">
                                                <X className="w-6 h-6" />
                                            </button>
                                        </div>
                                        <div className="not-italic">Face Image</div>
                                    </div>
                                }
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default Creator_uploads;
