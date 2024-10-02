/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import imageData from "../../assets/imageData";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { RiEyeFill, RiEyeOffFill } from '@remixicon/react';
import EndPoints from "../../Api/baseUrl/endPoints";
import { Success, Error } from "../../components/toasts";
import { useNavigate } from "react-router-dom";
import { setToken } from "../../utils/helpers";
import { useAuth } from "../../providers/AuthProvider";

const Reset_password = () => {
    const { register, handleSubmit, formState: { touchedFields, isDirty, isValid, dirtyFields, isSubmitted, errors }, watch, reset } = useForm();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { setUser } = useAuth();

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    }

    const toggleShowConfirmPassword = () => {
        setShowConfirmPassword(!showConfirmPassword);
    }
    const onSubmit = async (values) => {
        try {
            setLoading(true)
            const { data } = await EndPoints.Auth.reset_password(values)
            if (data.status != 200) { throw Error('An Error occured') }
            else {
                Success(data.message);
                setToken(data.token);
                setUser(data);
                navigate('/')
            }
        } catch (error) {
            Error(error.response.data.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-no-repeat bg-cover bg-center"
            style={{ backgroundImage: `url(${imageData('login')})` }}>
            <div className="absolute inset-0 bg-black opacity-60"></div>
            <div className="mx-auto max-w-screen-xl justify-center z-10 bg-gray-300 bg-opacity-75 rounded-lg px-4 py-16 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-lg">
                    <h1 className="text-center text-2xl font-bold sm:text-3xl">Reset Password</h1>
                    <p className="mx-auto mt-4 max-w-md text-center ">
                        Join Ventie today to stay connected with your friends, share your moments, and discover new interests.
                    </p>
                    <form onSubmit={handleSubmit(onSubmit)} className="mb-0 mt-6 space-y-4 rounded-lg p-4 sm:p-6 lg:p-8">
                        <p className="text-center text-lg font-medium">Reset your account password</p>

                        <div>
                            <label htmlFor="email" className="sr-only">Email</label>
                            <div className="relative">
                                <input
                                    type="email"
                                    className="w-full rounded-lg border border-gray-200 p-4 pe-12 text-sm shadow-sm"
                                    placeholder="Enter email"
                                    {...register("email", {
                                        required: true,
                                        pattern: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/
                                    })}
                                />
                                {errors.email && errors.email.type === "required" && (
                                    <span className="text-sm text-red-700">Email is required.</span>
                                )}
                                {errors.email && errors.email.type === "pattern" && (
                                    <span className="text-sm text-red-700">Email is not valid.</span>
                                )}
                            </div>
                        </div>

                        <div>
                            <label htmlFor="otp" className="sr-only">One Time Password</label>
                            <div className="relative">
                                <input
                                    type="number"
                                    className="w-full rounded-lg border border-gray-200 p-4 pe-12 text-sm shadow-sm"
                                    placeholder="Enter OTP"
                                    {...register('otp', {
                                        required: true,
                                        minLength: 6
                                    })}
                                />
                                {errors.otp && errors.otp.type === "required" && (
                                    <span className="text-sm text-red-700">OTP is required.</span>
                                )}
                                {errors.otp && errors.otp.type === "minLength" && (
                                    <span className="text-sm text-red-700">
                                        One time password should be at-least 6 characters.
                                    </span>
                                )}
                            </div>
                        </div>

                        <div>
                            <label htmlFor="newPassword" className="sr-only">Password</label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    className="w-full rounded-lg border border-gray-200 p-4 pe-12 text-sm shadow-sm"
                                    placeholder="Enter New password"
                                    {...register("newPassword", {
                                        required: true,
                                        minLength: 8
                                    })}
                                />
                                <button
                                    type="button"
                                    onClick={toggleShowPassword}
                                    className="absolute inset-y-0 end-0 grid place-content-center px-4"
                                >
                                    {showPassword ? (
                                        <RiEyeOffFill className="text-gray-400" />
                                    ) : (
                                        <RiEyeFill className="text-gray-400" />
                                    )}
                                </button>
                            </div>
                            {errors.newPassword && errors.newPassword.type === "required" && (
                                <span className="text-sm text-red-700">New Password is required.</span>
                            )}
                            {errors.newPassword && errors.newPassword.type === "minLength" && (
                                <span className="text-sm text-red-700">
                                    Password should be at-least 8 characters.
                                </span>
                            )}
                        </div>

                        <div>
                            <label htmlFor="confirm_password" className="sr-only">Confirm Password</label>
                            <div className="relative">
                                <input
                                    type={showConfirmPassword ? "text" : "password"}
                                    className="w-full rounded-lg border border-gray-200 p-4 pe-12 text-sm shadow-sm"
                                    placeholder="Confirm your password"
                                    {...register("confirm_password", {
                                        required: true,
                                        validate: value => value === watch('newPassword') || "Passwords do not match"
                                    })}
                                />
                                <button
                                    type="button"
                                    onClick={toggleShowConfirmPassword}
                                    className="absolute inset-y-0 end-0 grid place-content-center px-4"
                                >
                                    {showConfirmPassword ? (
                                        <RiEyeOffFill className="text-gray-400" />
                                    ) : (
                                        <RiEyeFill className="text-gray-400" />
                                    )}
                                </button>
                            </div>
                            {errors.confirm_password && <p className="text-red-500 text-sm mt-1">{errors.confirm_password.message}</p>}
                        </div>
                        {!loading ? (
                            <button
                                type="submit"
                                className="button inline-block w-full px-5 py-3"
                            >
                                Reset
                            </button>
                        ) : (
                            <button className='button w-full'>
                                <div className="animate-spin inline-block w-6 h-6 border-[3px] border-current border-t-transparent text-gray-400 rounded-full" role="status" aria-label="loading">
                                    <span className="sr-only">Loading...</span>
                                </div>
                            </button>
                        )}
                        <p className="text-center text-sm text-gray-900">
                            Didn&apos;t receive an otp?
                            <Link to='/forgot-password-email' className="underline">Resend</Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>

    )
}

export default Reset_password;
