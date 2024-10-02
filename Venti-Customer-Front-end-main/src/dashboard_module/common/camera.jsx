/* eslint-disable no-unused-vars */
import Webcam from "react-webcam";
import React, { useCallback, useRef, useState } from "react";
import { Check, X, Aperture, RotateCcw, RefreshCcw } from 'lucide-react';

const Camera = ({ closeCamera }) => {
    const webcamRef = useRef(null);
    const [imgSrc, setImgSrc] = useState(null);
    const [mirrored, setMirrored] = useState(true);
    const [currentDiv, setCurrentDiv] = useState('takeImage');
    const [facingMode, setFacingMode] = useState("user");

    const videoConstraints = {
        aspectRatio: 4 / 3,
        facingMode: facingMode
    };

    const capture = useCallback(() => {
        const imageSrc = webcamRef.current.getScreenshot();
        setImgSrc(imageSrc);
    }, [webcamRef]);

    const retake = () => {
        setImgSrc(null);
    };

    const switchCamera = () => {
        setFacingMode(prevMode => prevMode === "user" ? "environment" : "user");
        setMirrored(prevMirrored => !prevMirrored);
    };

    return (
        <>
            {currentDiv === 'takeImage' && (
                <div className="fixed sm:hidden inset-0 z-50 flex flex-col overflow-hidden items-center max-h-screen">
                    <button
                        onClick={closeCamera}
                        type="button" className="text-gray-400 right-2 m-6 fixed inset-0 z-10 bg-transparent text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="default-modal">
                        <X className="w-10 h-10 font-extrabold text-gray-100" aria-hidden="true" />
                        <span className="sr-only">Close modal</span>
                    </button>
                    <div className="relative overflow-hidden flex top-0 bottom-0 h-screen  w-full border-4">
                        {imgSrc ? (
                            <img
                                src={imgSrc}
                                alt="captured"
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <Webcam
                                audio={false}
                                ref={webcamRef}
                                screenshotFormat="image/jpeg"
                                screenshotQuality={0.8}
                                mirrored={mirrored}
                                videoConstraints={videoConstraints}
                                className="w-full h-full object-cover"
                            />
                        )}
                        <div className="absolute z-10 justify-center items-center bottom-4 left-1/2 transform -translate-x-1/2 flex gap-4">
                            {imgSrc ? (
                                <div className="flex space-x-6 items-center">
                                    <button
                                        onClick={retake}
                                        className="p-4 text-black rounded-full border border-red-600 bg-gray-100 transition duration-300 flex items-center text-lg">
                                        <RotateCcw className="w-8 h-8" />
                                    </button>
                                    <button className="p-4 text-white rounded-full border bg-rose-500 transition duration-300 flex items-center text-lg">
                                        <Check className="w-6 h-6" />
                                    </button>
                                </div>
                            ) : (
                                <>
                                    <button
                                        onClick={capture}
                                        className="p-4 text-gray-800 border border-black bg-gray-100 rounded-full transition duration-300 flex items-center text-lg">
                                        <Aperture className="w-8 h-8" />
                                    </button>
                                    <button
                                        onClick={switchCamera}
                                        className="text-white rounded-full transition duration-300 flex items-center text-lg">
                                        <RefreshCcw className="w-6 h-6" />
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default Camera;