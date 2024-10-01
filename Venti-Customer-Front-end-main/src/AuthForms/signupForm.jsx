/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import imageData from "../assets/imageData";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { RiEyeFill, RiEyeOffFill } from '@remixicon/react';
import EndPoints from "../Api/baseUrl/endPoints";
import { Success, Error } from "../components/toasts";
import { useNavigate } from "react-router-dom";

const SignupForm = () => {
  const { register, handleSubmit, formState: { touchedFields, isDirty, isValid, dirtyFields, isSubmitted, errors }, watch, reset } = useForm();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  }

  const toggleShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  }
  const onSubmit = async (values) => {
    try {
      setLoading(true)
      const { data } = await EndPoints.Auth.register(values)
      Success(data.message);
      reset();
      localStorage.setItem('email', values.email);
      navigate('/verification');
    } catch (error) {
      Error(error.response.data.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen"
    style={{ backgroundImage: `url(${imageData('login')})` }}>
       <div className="mx-auto max-w-screen-xl justify-center z-10 bg-gray-300 bg-opacity-75 rounded-lg px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-lg">
          <h1 className="text-center text-2xl font-bold sm:text-3xl">Get started today</h1>
          <p className="mx-auto mt-4 max-w-md text-center">
            Join Ventie today to stay connected with your friends, share your moments, and discover new interests.
          </p>
          <form onSubmit={handleSubmit(onSubmit)} className="mb-0 mt-6 space-y-4 rounded-lg p-4 sm:p-6 lg:p-8">
            <p className="text-center text-lg font-medium">Create your account</p>

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
              <label htmlFor="phoneNumber" className="sr-only">Phone Number</label>
              <div className="relative">
                <input
                  type="tel"
                  className="w-full rounded-lg border border-gray-200 p-4 pe-12 text-sm shadow-sm"
                  placeholder="Enter phone number"
                  {...register('phoneNumber', {
                    required: true,
                    minLength: 10
                  })}
                />
                {errors.phoneNumber && errors.phoneNumber.type === "required" && (
                  <span className="text-sm text-red-700">Phone number is required.</span>
                )}
                {errors.phoneNumber && errors.phoneNumber.type === "minLength" && (
                  <span className="text-sm text-red-700">
                    Phone number should be at-least 10 characters.
                  </span>
                )}
              </div>
            </div>

            <div>
              <label htmlFor="password" className="sr-only">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  className="w-full rounded-lg border border-gray-200 p-4 pe-12 text-sm shadow-sm"
                  placeholder="Enter password"
                  {...register("password", {
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
              {errors.password && errors.password.type === "required" && (
                <span className="text-sm text-red-700">Password is required.</span>
              )}
              {errors.password && errors.password.type === "minLength" && (
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
                    validate: value => value === watch('password') || "Passwords do not match"
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
                Sign up
              </button>
            ) : (
              <button className='button w-full'>
                <div className="animate-spin inline-block w-6 h-6 border-[3px] border-current border-t-transparent text-gray-400 rounded-full" role="status" aria-label="loading">
                  <span className="sr-only">Loading...</span>
                </div>
              </button>
            )}
            <p className="text-center text-sm">
              Already have an account?
              <Link to='/signin' className="underline">Sign In</Link>
            </p>
          </form>
        </div>
      </div>
    </div>

  )
}

export default SignupForm;
