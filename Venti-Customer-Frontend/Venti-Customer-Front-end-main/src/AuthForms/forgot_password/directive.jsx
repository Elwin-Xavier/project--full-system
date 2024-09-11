/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import imageData from '../../assets/imageData';

const Directive = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(() => {
            navigate('/reset-password');
        }, 5000);

        // Cleanup the timer if the component unmounts before the timeout
        return () => clearTimeout(timer);
    }, [navigate]);

    return (
        <div className="flex items-center justify-center min-h-screen"   style={{ backgroundImage: `url(${imageData('login')})` }}>
            <div className="mx-auto my-10 max-w-xl rounded-xl px-4 py-6 text-gray-50">
                <div className="mb-5"></div>
                <div className="mb-3 text-3xl">
                    You&apos;re all set, Otp verification has been sent to your Email.
                </div>
                <div className="rounded-lg">
                    <p className="mb-2 text-gray-50 text-2xl">
                        You will submit the OTP with the new password
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Directive;
