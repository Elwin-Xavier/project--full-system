/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';

const Security_settings = () => {
    const [isChange2Factor, setIsChange2Factor] = useState(false);
    const [isChangeSecurityQuiz, setIsChangeSecurityQuiz] = useState(false);

    useEffect(() => {
        if (isChangeSecurityQuiz || isChange2Factor) {
            window.dispatchEvent(new Event('resize'));
            setTimeout(() => {
                window.scrollTo({
                    top: document.body.scrollHeight,
                    behavior: 'smooth'
                });
            }, 100);
        }
    }, [isChangeSecurityQuiz, isChange2Factor]);

    return (
        <div className="p-4 border border-gray-200 rounded-lg mb-2">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                Security Settings
            </h5>
            <p className="font-normal text-gray-700 dark:text-white">
                Stay updated with the latest discussions and feedback from the community.
            </p>
            <hr className="mt-4 mb-8" />
            <p className="py-2 text-lg font-semibold">Security Questions</p>
            {!isChangeSecurityQuiz ? (
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                    <p className="text-lg">Last Changed: <strong>12/4/1960</strong></p>
                    <button
                        onClick={() => setIsChangeSecurityQuiz(true)}
                        className="inline-flex text-sm font-semibold text-blue-600 hover:underline decoration-2"
                    >
                        Update
                    </button>
                </div>
            ) : (
                <form className="w-full space-y-4">
                    <section className="rounded-lg space-y-2">
                        <div>
                            <label htmlFor="question1" className="block mb-2 text-sm font-medium">
                                Question 1
                            </label>
                            <select
                                id="question1"
                                className="w-full p-2 border-b border-dashed outline-none border-gray-300 bg-transparent focus:border-blue-500 dark:bg-transparent dark:border-gray-600"
                            >
                                <option className='dark:text-black'>What was the name of your first pet?</option>
                                <option className='dark:text-black'>In what city were you born?</option>
                                <option className='dark:text-black'>What is your mother&apos;s maiden name?</option>
                            </select>
                        </div>
                        <div>
                            <label htmlFor="answer1" className="block mb-1 text-sm font-medium">
                                Answer 1
                            </label>
                            <input
                                type="text"
                                id="answer1"
                                className="w-full p-2 border-b border-gray-500 outline-none bg-transparent focus:ring-blue-500 focus:border-blue-500 dark:border-gray-600"
                                placeholder="Enter your answer"
                            />
                        </div>

                        <div>
                            <label htmlFor="question2" className="block mb-1 text-sm font-medium">
                                Question 2
                            </label>
                            <select
                                id="question2"
                                className="w-full p-2 border-b border-dashed outline-none border-gray-300 bg-transparent focus:border-blue-500 dark:bg-transparent dark:border-gray-600"
                            >
                                <option className='dark:text-black'>What was your childhood nickname?</option>
                                <option className='dark:text-black'>What is the name of your favorite childhood friend?</option>
                                <option className='dark:text-black'>What street did you live on in third grade?</option>
                            </select>
                        </div>

                        <div>
                            <label
                                htmlFor="answer2"
                                className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
                            >
                                Answer 2
                            </label>
                            <input
                                type="text"
                                id="answer2"
                                className="w-full p-2 border-b border-gray-500 outline-none bg-transparent focus:ring-blue-500 focus:border-blue-500 dark:border-gray-600"
                                placeholder="Enter your answer"
                            />
                        </div>
                    </section>
                    <div className="flex flex-col sm:flex-row gap-2">
                        <button
                            className="flex-grow sm:flex-grow-0 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            type="button"
                        >
                            Save Answers
                        </button>
                        <button
                            onClick={() => setIsChangeSecurityQuiz(false)}
                            className="flex-grow sm:flex-grow-0 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            type="button"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            )}

            <hr className="mt-4 mb-8" />
            <p className="py-2 text-lg font-semibold">Two Factor Verification</p>
            {!isChange2Factor ? (
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                    <p className="text-lg">Last Changed: <strong>12/4/1960</strong></p>
                    <button
                        onClick={() => setIsChange2Factor(true)}
                        className="inline-flex text-sm font-semibold text-blue-600 hover:underline decoration-2"
                    >
                        Update
                    </button>
                </div>
            ) : (
                <form className="w-full space-y-4 mb-4">
                    <section className="rounded-lg space-y-2">
                        <div>
                            <label htmlFor="question1" className="block mb-2 text-sm font-medium">
                                Question 1
                            </label>
                            <select
                                id="question1"
                                className="w-full p-2 border-b border-dashed outline-none border-gray-300 bg-transparent focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600"
                            >
                                <option>What was the name of your first pet?</option>
                                <option>In what city were you born?</option>
                                <option>What is your mother&apos;s maiden name?</option>
                            </select>
                        </div>

                        <div>
                            <label htmlFor="answer1" className="block mb-1 text-sm font-medium">
                                Answer 1
                            </label>
                            <input
                                type="text"
                                id="answer1"
                                className="w-full p-2 border-b border-gray-500 outline-none bg-transparent focus:ring-blue-500 focus:border-blue-500 dark:border-gray-600"
                                placeholder="Enter your answer"
                            />
                        </div>

                        <div>
                            <label htmlFor="question2" className="block mb-1 text-sm font-medium">
                                Question 2
                            </label>
                            <select
                                id="question2"
                                className="w-full p-2 border-b border-dashed outline-none border-gray-300 bg-transparent focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600"
                            >
                                <option>What was your childhood nickname?</option>
                                <option>What is the name of your favorite childhood friend?</option>
                                <option>What street did you live on in third grade?</option>
                            </select>
                        </div>

                        <div>
                            <label
                                htmlFor="answer2"
                                className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
                            >
                                Answer 2
                            </label>
                            <input
                                type="text"
                                id="answer2"
                                className="w-full p-2 border-b border-gray-500 outline-none bg-transparent focus:ring-blue-500 focus:border-blue-500 dark:border-gray-600"
                                placeholder="Enter your answer"
                            />
                        </div>
                    </section>
                    <div className="flex flex-col sm:flex-row gap-2">
                        <button
                            className="flex-grow sm:flex-grow-0 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            type="button"
                        >
                            Save Answers
                        </button>
                        <button
                            onClick={() => setIsChange2Factor(false)}
                            className="flex-grow sm:flex-grow-0 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            type="button"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            )}
        </div>
    );
};

export default Security_settings;

