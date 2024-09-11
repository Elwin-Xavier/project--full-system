/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import imageData from '../assets/imageData';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import EndPoints from '../Api/baseUrl/endPoints';
import { Success, Error } from '../components/toasts';
import {useAuth} from '../providers/AuthProvider';
import { setToken } from '../utils/helpers';


const OtpForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [emailUser, setEmailUser] = useState('');
  const [maskedEmail, setMaskedEmail] = useState('');
  const navigate = useNavigate();
  const { setUser } = useAuth();

  function maskEmail() {
    const email = localStorage.getItem('email')
    if (email === null) {
      navigate('/signup')
    } else {
      let hide = email.split("@")[0].length - 2;
      var r = new RegExp(".{" + hide + "}@", "g")
      let data = email.replace(r, "***@");
      setMaskedEmail(data)
      setEmailUser(email)
    }
  }
  useEffect(() => {
    maskEmail();
  })

  const onSubmit = async (values) => {
    const formatData = {
      email: emailUser,
      otp: values.otp,
    }
    try {
      const { data } = await EndPoints.Auth.verify_otp(formatData)
      if (data.status != 200) { throw Error('An Error occurred!') }
      Success(data.message);
      setToken(data.token);
      setUser(data);
      navigate('/');
    } catch (error) {
      Error(error.response.data.message)
    }
  }
  const ResendOTP = async (email) => {
    const { data } = await EndPoints.Auth.resend_otp({ email })
    Success(data.message)
  }

  return (
    <div className="flex items-center justify-center min-h-screen"
    style={{ backgroundImage: `url(${imageData('login')})` }}>
      <div className="mx-auto max-w-screen-xl justify-center z-10 bg-gray-100 bg-opacity-75 rounded-lg px-4 py-16 sm:px-6 lg:px-8">
        <h1 className="text-center text-2xl font-bold text-indigo-600 sm:text-3xl">Verify Your Account</h1>
        <p className="mx-auto mt-4 max-w-md text-center text-gray-500">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Obcaecati sunt dolores deleniti
          inventore quaerat mollitia?
        </p>
        <form onSubmit={handleSubmit(onSubmit)} className="mb-0 mt-6 space-y-4 rounded-lg p-4 sm:p-6 lg:p-8">
          <p className="text-center text-lg font-medium">OTP code has been sent to <span>{maskedEmail}</span></p>
          <div>
            <label htmlFor="otp" className="sr-only">Verification Code</label>
            <div className="relative">
              <input
                type="text"
                maxLength={6}
                className="w-full items-center rounded-lg border border-gray-200 p-4 pe-12 text-md shadow-sm"
                placeholder="Enter code here"
                {...register("otp", {
                  required: "Code is required.",
                  pattern: {
                    value: /^[0-9]{6}$/,
                    message: "Code must be exactly 6 digits only."
                  }
                })}
              />
              {errors.otp && <span className="text-sm text-red-700">{errors.otp.message}</span>}
            </div>
          </div>
          <button
            type="submit"
            className="button w-full px-5 py-3"
          >
            Verify
          </button>
          <p className="text-center text-sm text-gray-500">
            Did not get code?
            <Link onClick={() => ResendOTP(emailUser)} className="underline">Resend</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default OtpForm;
