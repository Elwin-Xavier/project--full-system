/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import { IoSend, IoImageOutline, IoAdd, IoCallSharp, IoVideocam, IoSearch, IoArrowBack } from "react-icons/io5";
import { RxDotsVertical } from "react-icons/rx";

const Messages = () => {
    const [showConversations, setShowConversations] = useState(true);
    const [activeConversation, setActiveConversation] = useState(null);

    const conversations = [
        { id: 1, name: "John Doe", lastMessage: "Hey, how are you?", time: "2h", unread: 2 },
        { id: 2, name: "Jane Smith", lastMessage: "See you tomorrow!", time: "1d" },
        { id: 3, name: "Bob Johnson", lastMessage: "Thanks for your help", time: "2d" },
    ];

    const messages = [
        { id: 1, sender: "John Doe", content: "Hey, how's it going?", time: "10:00 AM" },
        { id: 2, sender: "You", content: "Not bad, just working on some projects. You?", time: "10:05 AM" },
        { id: 3, sender: "John Doe", content: "Same here. Want to grab lunch later?", time: "10:10 AM" },
    ];

    const handleConversationClick = (conversation) => {
        setActiveConversation(conversation);
        setShowConversations(false);
    };

    return (
        <div className="flex h-screen w-full ">
            {/* Conversation List */}
            <div className={`${showConversations ? 'flex' : 'hidden'} md:flex flex-col w-full md:w-1/3 lg:w-1/4 border-r border-gray-50`}>
                <div className="p-4 border-b">
                    <div className="flex items-center justify-between">
                        <h1 className="text-xl font-semibold">Messages</h1>
                        <button className="md:hidden">
                            <IoAdd />
                        </button>
                    </div>
                    <div className="mt-4 relative">
                        <input
                            type="text"
                            placeholder="Search"
                            className="w-full py-2 pl-10 pr-4 text-gray-700 dark:text-black dark:bg-transparent  rounded-full focus:outline-none focus:bg-white focus:ring-2 focus:ring-blue-400"
                        />
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                            <IoSearch className="text-gray-500" />
                        </div>
                    </div>
                </div>
                <div className="flex-1 overflow-y-auto">
                    {conversations.map((conversation) => (
                        <div 
                            key={conversation.id} 
                            className="flex items-center p-4 border-b cursor-pointer hover:bg-gray-50 dark:hover:text-black"
                            onClick={() => handleConversationClick(conversation)}>
                            <div className="w-12 h-12 bg-gray-300 rounded-full mr-4"></div>
                            <div className="flex-1">
                                <h3 className="font-semibold">{conversation.name}</h3>
                                <p className="text-sm text-gray-500 dark:hover:text-black truncate">{conversation.lastMessage}</p>
                            </div>
                            <div className="text-xs text-gray-400">{conversation.time}</div>
                            {conversation.unread && (
                                <div className="ml-2 bg-blue-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                                    {conversation.unread}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
            <div className={`${!showConversations ? 'flex' : 'hidden'} md:flex flex-col flex-1`}>
                {activeConversation && (
                    <>
                        <div className="flex items-center justify-between p-4 border-b">
                            <div className="flex items-center">
                                <button onClick={() => setShowConversations(true)} className="md:hidden mr-4">
                                    <IoArrowBack />
                                </button>
                                <div className="flex items-center">
                                    <div className="w-10 h-10 rounded-full bg-gray-300 dark:text-black mr-3"></div>
                                    <div>
                                        <h2 className="font-semibold">{activeConversation.name}</h2>
                                        <p className="text-xs text-gray-500 dark:text-gray-200">Active now</p>
                                    </div>
                                </div>
                            </div>
                            <div className="flex">
                                <button className="p-2"><IoCallSharp /></button>
                                <button className="p-2"><IoVideocam /></button>
                                <button className="p-2"><RxDotsVertical /></button>
                            </div>
                        </div>

                        <div className="flex-1 overflow-y-auto p-4">
                            {messages.map((message) => (
                                <div key={message.id} className={`flex ${message.sender === 'You' ? 'justify-end' : 'justify-start'} mb-4`}>
                                    <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${message.sender === 'You' ? 'bg-green-500 text-white' : 'bg-gray-200 dark:text-black'}`}>
                                        <p>{message.content}</p>
                                        <p className="text-xs mt-1 text-gray-500">{message.time}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="border-t p-4">
                            <div className="flex items-center bg-gray-100 rounded-full">
                                <button className="p-2 text-gray-500"><IoImageOutline /></button>
                                <input
                                    type="text"
                                    placeholder="Message..."
                                    className="flex-1 bg-transparent border-none focus:outline-none px-4"
                                />
                                <button className="p-2 text-blue-500"><IoSend /></button>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    )
}

export default Messages;