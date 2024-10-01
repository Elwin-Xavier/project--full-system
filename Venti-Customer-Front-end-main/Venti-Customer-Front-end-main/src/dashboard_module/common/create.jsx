/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { BsX } from 'react-icons/bs';
import { IoImagesOutline, IoSend } from 'react-icons/io5';
import { CiFaceSmile } from "react-icons/ci";
import { GoIssueClosed } from "react-icons/go";
import { Success, Error } from '../../components/toasts';
import { MdErrorOutline } from "react-icons/md";
import Cropper from 'react-easy-crop';
import EmojiPicker from 'emoji-picker-react';
import getCroppedImg from './cropImage';
import EndPoints from '../../Api/baseUrl/endPoints';
import Swal from 'sweetalert2'

const Create = ({ closeCreate }) => {
    const [currentDiv, setCurrentDiv] = useState('select');
    const [selectedImage, setSelectedImage] = useState(null);
    const [crop, setCrop] = useState({ x: 0, y: 0 })
    const [rotation, setRotation] = useState(0)
    const [zoom, setZoom] = useState(1)
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null)
    const [croppedImage, setCroppedImage] = useState(null)
    const [error, setError] = useState('');
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const [textAreaContent, setTextAreaContent] = useState('');

    const onCropComplete = (croppedArea, croppedAreaPixels) => {
        setCroppedAreaPixels(croppedAreaPixels)
    }

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const fileType = file.type.split('/')[0];
            if (fileType === 'image') {
                setSelectedImage(URL.createObjectURL(file));
                setCurrentDiv('preview');
            } else {
                setError("File format Error");
            }
        }
    };

    const handleNext = async () => {
        try {
            const croppedImage = await getCroppedImg(
                selectedImage,
                croppedAreaPixels,
                rotation
            )
            setCroppedImage(croppedImage)
            setCurrentDiv('final');
        } catch (error) {
            Error('Error cropping image:', error);
        }
    };
    const pickEmoji = () => {
        setShowEmojiPicker(!showEmojiPicker);
    };
    const onEmojiClick = (code, emojiObject) => {
        setTextAreaContent(prevContent => prevContent + code.emoji);
        setShowEmojiPicker(false);
    };

    const onSubmit = async () => {
        try {
            const response = await fetch(croppedImage);
            const blob = await response.blob();

            const uniqueFilename = `${Date.now()}-${Math.random().toString(36).substring(7)}.jpg`;
            const formData = new FormData();
            formData.append('caption', textAreaContent);
            formData.append('image', blob, uniqueFilename); 

            const { data } = await EndPoints.posts.create_post(formData);
            if (data.status != 200) { throw new Error('An Error Occurred!') }
            setCurrentDiv('success');

        } catch (error) {
            Error(error?.response?.data?.error || error?.response?.data?.message);
        }
    };

    return (
        <>
            <div className="flex items-center justify-center fixed inset-0 z-50 bg-gray-900 bg-opacity-75">
                <button
                    onClick={closeCreate}
                    type="button"
                    className="text-gray-100 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 absolute top-4 right-4 dark:hover:bg-gray-600 dark:hover:text-white"
                    data-modal-hide="default-modal">
                    <BsX className='h-8 w-8' />
                    <span className="sr-only">Close modal</span>
                </button>
                {currentDiv === 'select' && (
                    <div id="default-modal" className="overflow-y-auto overflow-x-hidden flex justify-center items-center w-full h-full">
                        <div className="relative p-10 w-full max-w-xl max-h-full">
                            <div className="relative bg-white rounded-lg shadow-lg dark:bg-gray-800">
                                <div className="flex items-center justify-between p-4 border-b border-gray-200 rounded-t dark:border-gray-600">
                                    <div className="flex-grow text-center">
                                        {!error ? (
                                            <div className="flex-grow text-center">
                                                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                                                    Create New Post
                                                </h3>
                                            </div>
                                        ) : (
                                            <div className="flex-grow text-center">
                                                <h3 className="text-red-500 text-xl font-semibold dark:text-red-500">{error}</h3>
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <div className="p-10 m-10 flex flex-col justify-center items-center">
                                    {selectedImage ? (
                                        <img src={selectedImage} alt="Selected" className="w-full h-auto max-h-96 object-contain mb-4" />
                                    ) : (
                                        !error ? (
                                            <IoImagesOutline className="w-40 h-40 text-gray-500 dark:text-gray-400 mb-10" />
                                        ) : (
                                            <MdErrorOutline className="w-40 h-40 text-red-500 dark:text-red-400 mb-10" />
                                        )
                                    )}
                                    <div className="group mb-8">
                                        <label htmlFor="fileInputDragDrop" className="button cursor-pointer">
                                            <input id="fileInputDragDrop" type="file" className="sr-only" aria-describedby="validFileFormats" accept="image/*, video/*" onChange={handleImageChange} />
                                            {selectedImage ? 'Change Image' : 'Select from device'}
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
                {currentDiv === 'preview' && (
                    <div id="default-modal" className="overflow-y-auto overflow-x-hidden flex justify-center items-center w-full h-full">
                        <div className="relative p-10 w-full max-w-xl max-h-full">
                            <div className="relative bg-white rounded-lg shadow-lg dark:bg-gray-800">
                                <div className="flex items-center justify-between p-4 border-b border-gray-200 rounded-t dark:border-gray-600">
                                    <div className="flex-grow text-center">
                                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                                            Create New Post
                                        </h3>
                                    </div>
                                    <button
                                        onClick={handleNext}
                                        type="button"
                                        className="text-blue-600 bg-transparent hover:text-blue-900 rounded-lg text-lg dark:hover:bg-blue-600 dark:hover:text-white"
                                        data-modal-hide="default-modal">
                                        <span className="">Next</span>
                                    </button>
                                </div>
                                <div className="p-10 m-10 flex flex-col justify-center items-center">
                                    {selectedImage ? (
                                        <div className="w-full h-96 relative">
                                            <Cropper
                                                image={selectedImage}
                                                crop={crop}
                                                rotation={rotation}
                                                zoom={zoom}
                                                aspect={4 / 3}
                                                onCropChange={setCrop}
                                                onRotationChange={setRotation}
                                                onCropComplete={onCropComplete}
                                                onZoomChange={setZoom}
                                            />
                                        </div>
                                    ) : (
                                        <IoImagesOutline className="w-40 h-40 text-gray-500 dark:text-gray-400 mb-10" />
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                )}
                {currentDiv === 'final' && (
                    <div id="default-modal" className="overflow-y-auto overflow-x-hidden flex justify-center items-center w-full h-full">
                        <div className="relative p-10 w-full max-w-xl max-h-full">
                            <div className="relative bg-white rounded-lg shadow-lg dark:bg-gray-800">
                                <div className="flex items-center justify-between p-4 border-b border-gray-200 rounded-t dark:border-gray-600">
                                    <div className="flex-grow text-center">
                                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                                            Create New Post
                                        </h3>
                                    </div>
                                </div>
                                <div className="p-10 m-10 flex flex-col justify-center items-center">
                                    {croppedImage ? (
                                        <img src={croppedImage} alt="Cropped" />
                                    ) : (
                                        <IoImagesOutline className="w-40 h-40 text-gray-500 dark:text-gray-400 mb-10" />
                                    )}
                                </div>
                                {/* <form> */}
                                <label htmlFor="chat" className="sr-only">Add a Caption</label>
                                <div className="flex items-center px-3 py-2 rounded-lg bg-gray-50 dark:bg-gray-700">
                                    <button
                                        onClick={pickEmoji}
                                        type="button" className="p-2 text-gray-700 rounded-lg cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600">
                                        <CiFaceSmile className="w-5 h-5" />
                                        <span className="sr-only">Add emoji</span>
                                    </button>
                                    <textarea
                                        id="chat" rows="1"
                                        value={textAreaContent}
                                        onChange={(e) => setTextAreaContent(e.target.value)}
                                        className="block mx-4 p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        placeholder="Your message..."></textarea>
                                    <button type="submit"
                                        onClick={onSubmit}
                                        className="inline-flex justify-center p-2 text-blue-600 rounded-full cursor-pointer hover:bg-blue-100 dark:text-blue-500 dark:hover:bg-gray-600">
                                        <IoSend className="w-6 h-6 " />
                                        <span className="sr-only">Send message</span>
                                    </button>
                                </div>
                                {showEmojiPicker && (
                                    <div className="absolute bottom-20">
                                        <EmojiPicker onEmojiClick={onEmojiClick} />
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}
                {currentDiv === 'success' && (
                    <div id="default-modal" className="overflow-y-auto overflow-x-hidden flex justify-center items-center w-full h-full">
                        <div className="relative p-10 w-full max-w-xl max-h-full">
                            <div className="relative p-6 text-center bg-white rounded-lg shadow dark:bg-gray-800 sm:p-8">
                                <div className="w-full flex items-center justify-center mx-auto mb-6">
                                    <GoIssueClosed className="w-24 h-24 text-green-500 dark:text-green-400" />
                                    <span className="sr-only">Success</span>
                                </div>
                                <p className="text-2xl font-semibold text-gray-900 dark:text-white">Post Created Successfully!</p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default Create;
