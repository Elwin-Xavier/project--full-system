import React from "react";
import Webcam from "react-webcam";
import { useCallback, useRef, useState } from "react";
import { FaCamera, FaUndo, FaSync } from 'react-icons/fa';
import { RxCross2 } from "react-icons/rx";

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
                    type="button" className="text-gray-400 m-6 fixed inset-0 z-10 bg-transparent text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="default-modal">
                        <RxCross2 className="w-10 h-10 font-extrabold text-cyan-100" aria-hidden="true"/>
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
                                <button
                                    onClick={retake}
                                    className="p-4 text-black rounded-full border border-red-600 bg-gray-100 transition duration-300 flex items-center text-lg">
                                    <FaUndo className="w-8 h-8" />
                                </button>
                            ) : (
                                <>
                                    <button
                                        onClick={capture}
                                        className="p-4 text-gray-800 border border-black bg-gray-100 rounded-full transition duration-300 flex items-center text-lg">
                                        <FaCamera className="w-8 h-8" />
                                    </button>
                                    <button
                                        onClick={switchCamera}
                                        className="text-white rounded-full transition duration-300 flex items-center text-lg">
                                        <FaSync className="w-6 h-6" />
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