/* eslint-disable no-unused-vars */
import React from 'react'
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);
ChartJS.defaults.backgroundColor = 'transparent';

const Summary = () => {
    const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

    const data = {
        labels: labels,
        datasets: [{
            label: 'tests',
            data: [65, 59, 80, 81, 56, 55, 40],
            fill: false,
            borderColor: 'rgb(75, 192, 192)',
            backgroundColor: 'transparent',
            tension: 0.1
        }]
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Line Chart'
            }
        }
    };
    return (
        <>
            <div className='sm:border-l min-h-full w-full items-center'>
                <div className=''>
                    <div className="pt-4 pl-2">
                        <h1 className="py-2 text-2xl font-semibold">Accounts Summary</h1>
                        <p>Explore up and Coming events you&apos;re supposed to attend.</p>
                    </div>
                    <hr className="mt-1 mb-8" />
                    <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
                        <dl className="mt-6 grid grid-cols-1 gap-4 sm:mt-8 sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-4">
                            <div className="flex flex-col rounded-lg border border-gray-100 px-4 py-8 text-center">
                                <dt className="order-last text-lg font-medium ">Total Tickets Sold</dt>
                                <dd className="text-4xl font-extrabold  md:text-5xl">480</dd>
                            </div>
                            <div className="flex flex-col rounded-lg border border-gray-100 px-4 py-8 text-center">
                                <dt className="order-last text-lg font-medium ">Total Earned</dt>
                                <dd className="text-4xl font-extrabold  md:text-5xl"><span className='text-xl'>Ksh:</span>2400</dd>
                            </div>
                            <div className="flex flex-col rounded-lg border border-gray-100 px-4 py-8 text-center">
                                <dt className="order-last text-lg font-medium ">Total Withdrawn</dt>
                                <dd className="text-4xl font-extrabold  md:text-5xl"><span className='text-xl'>Ksh:</span>86</dd>
                            </div>
                            <div className="flex flex-col rounded-lg border border-gray-100 px-4 py-8 text-center">
                                <dt className="order-last text-lg font-medium ">Balance</dt>

                                <dd className="text-4xl font-extrabold text-justify md:text-5xl"><span className='text-xl'></span>8600</dd>
                            </div>
                        </dl>
                    </div>
                </div>
                <div className="mt-6 overflow-auto rounded-xl px-6 lg:px-4">
                    <Line options={options} data={data} />
                </div>

                <div className="mt-6 overflow-hidden rounded-xl px-6 lg:px-4">
                    <table className="min-w-full border border-collapse border-spacing-y-2 border-spacing-x-2">
                        <thead className="hidden border-b lg:table-header-group">
                            <tr className="">
                                <td className="whitespace-normal py-4 text-sm font-semibold sm:px-3">
                                    Date
                                </td>

                                <td className="whitespace-normal py-4 text-sm font-medium sm:px-3">Ticket</td>
                                <td className="whitespace-normal py-4 text-sm font-medium sm:px-3">Description</td>
                                {/* <td className="whitespace-normal py-4 text-sm font-medium sm:px-3">Shop</td> */}

                                <td className="whitespace-normal py-4 text-sm font-medium sm:px-3">Customer</td>
                                <td className="whitespace-normal py-4 text-sm font-medium sm:px-3">Dimensions</td>

                                <td className="whitespace-normal py-4 text-sm font-medium sm:px-3">Weight</td>

                                <td className="whitespace-normal py-4 text-sm font-medium sm:px-3">
                                    Price
                                </td>

                                <td className="whitespace-normal py-4 text-sm font-medium  sm:px-3">Status</td>
                            </tr>
                        </thead>

                        <tbody className=" lg:border-gray-300">
                            <tr className="border-b">
                                <td className="whitespace-no-wrap py-4 text-left text-sm  sm:px-3 lg:text-left">
                                    07 February, 2022
                                    <div className="mt-1 flex flex-col text-xs font-medium lg:hidden">
                                        <div className="flex items-center">
                                            Jane Doeson
                                        </div>
                                        <div className="flex items-center">

                                            Desktop Computer
                                        </div>
                                        <div className="">24 x 10 x 5 cm</div>
                                        <div className="flex items-center">
                                            1 Kg
                                        </div>
                                    </div>
                                </td>

                                <td className="whitespace-no-wrap hidden py-4 text-sm font-normal sm:px-3 lg:table-cell">62345231143</td>

                                <td className="whitespace-no-wrap hidden py-4 text-sm font-normal sm:px-3 lg:table-cell">Desktop Computer</td>

                                <td className="whitespace-no-wrap hidden py-4 text-left text-sm  sm:px-3 lg:table-cell lg:text-left">Jane Doeson</td>
                                <td className="whitespace-no-wrap hidden py-4 text-left text-sm  sm:px-3 lg:table-cell lg:text-left">24 x 10 x 5 cm</td>
                                <td className="whitespace-no-wrap hidden py-4 text-left text-sm  sm:px-3 lg:table-cell lg:text-left">1.0 Kg</td>
                                <td className="whitespace-no-wrap py-4 text-right text-sm  sm:px-3 lg:text-left">
                                    $59.00
                                    <span className="mt-1 ml-auto block w-fit whitespace-nowrap rounded-full bg-purple-100 px-2 py-0.5 text-center text-xs text-purple-800 lg:hidden">Action Required</span>
                                </td>

                                <td className="whitespace-no-wrap hidden py-4 text-sm font-normal  sm:px-3 lg:table-cell">
                                    <span className="ml-2 mr-3 whitespace-nowrap rounded-full bg-purple-100 px-2 py-0.5 text-purple-800">Action Required</span>
                                </td>
                            </tr>
                            <tr className="border-b">
                                <td className="whitespace-no-wrap py-4 text-left text-sm  sm:px-3 lg:text-left">
                                    07 February, 2022
                                    <div className="mt-1 flex flex-col text-xs font-medium lg:hidden">
                                        <div className="flex items-center">

                                            Jane Doeson
                                        </div>
                                        <div className="flex items-center">

                                            Desktop Computer
                                        </div>
                                        <div className="">24 x 10 x 5 cm</div>
                                        <div className="flex items-center">

                                            1 Kg
                                        </div>
                                    </div>
                                </td>

                                <td className="whitespace-no-wrap hidden py-4 text-sm font-normal  sm:px-3 lg:table-cell">62345231143</td>

                                <td className="whitespace-no-wrap hidden py-4 text-sm font-normal  sm:px-3 lg:table-cell">Desktop Computer</td>


                                <td className="whitespace-no-wrap hidden py-4 text-left text-sm  sm:px-3 lg:table-cell lg:text-left">Jane Doeson</td>
                                <td className="whitespace-no-wrap hidden py-4 text-left text-sm  sm:px-3 lg:table-cell lg:text-left">24 x 10 x 5 cm</td>
                                <td className="whitespace-no-wrap hidden py-4 text-left text-sm  sm:px-3 lg:table-cell lg:text-left">1.0 Kg</td>
                                <td className="whitespace-no-wrap py-4 text-right text-sm  sm:px-3 lg:text-left">
                                    $59.00
                                    <span className="mt-1 ml-auto block w-fit whitespace-nowrap rounded-full bg-blue-100 px-2 py-0.5 text-center text-xs text-blue-800 lg:hidden">Pending</span>
                                </td>

                                <td className="whitespace-no-wrap hidden py-4 text-sm font-normal  sm:px-3 lg:table-cell">
                                    <span className="ml-2 mr-3 whitespace-nowrap rounded-full bg-blue-100 px-2 py-0.5 text-blue-800">Pending</span>
                                </td>
                            </tr>
                            <tr className="border-b">
                                <td className="whitespace-no-wrap py-4 text-left text-sm  sm:px-3 lg:text-left">
                                    07 February, 2022
                                    <div className="mt-1 flex flex-col text-xs font-medium lg:hidden">
                                        <div className="flex items-center">
                                            Jane Doeson
                                        </div>
                                        <div className="flex items-center">

                                            Desktop Computer
                                        </div>
                                        <div className="">24 x 10 x 5 cm</div>
                                        <div className="flex items-center">

                                            1 Kg
                                        </div>
                                    </div>
                                </td>

                                <td className="whitespace-no-wrap hidden py-4 text-sm font-normal  sm:px-3 lg:table-cell">62345231143</td>

                                <td className="whitespace-no-wrap hidden py-4 text-sm font-normal  sm:px-3 lg:table-cell">Desktop Computer</td>
                                <td className="whitespace-no-wrap hidden py-4 text-left text-sm  sm:px-3 lg:table-cell lg:text-left">Jane Doeson</td>
                                <td className="whitespace-no-wrap hidden py-4 text-left text-sm  sm:px-3 lg:table-cell lg:text-left">24 x 10 x 5 cm</td>
                                <td className="whitespace-no-wrap hidden py-4 text-left text-sm  sm:px-3 lg:table-cell lg:text-left">1.0 Kg</td>
                                <td className="whitespace-no-wrap py-4 text-right text-sm  sm:px-3 lg:text-left">
                                    $59.00
                                    <span className="mt-1 ml-auto block w-fit whitespace-nowrap rounded-full bg-purple-100 px-2 py-0.5 text-center text-xs text-purple-800 lg:hidden">Action Required</span>
                                </td>

                                <td className="whitespace-no-wrap hidden py-4 text-sm font-normal  sm:px-3 lg:table-cell">
                                    <span className="ml-2 mr-3 whitespace-nowrap rounded-full bg-purple-100 px-2 py-0.5 text-purple-800">Action Required</span>
                                </td>
                            </tr>
                            <tr className="border-b">
                                <td className="whitespace-no-wrap py-4 text-left text-sm  sm:px-3 lg:text-left">
                                    07 February, 2022
                                    <div className="mt-1 flex flex-col text-xs font-medium lg:hidden">
                                        <div className="flex items-center">

                                            Jane Doeson
                                        </div>
                                        <div className="flex items-center">

                                            Desktop Computer
                                        </div>
                                        <div className="">24 x 10 x 5 cm</div>
                                        <div className="flex items-center">

                                            1 Kg
                                        </div>
                                    </div>
                                </td>

                                <td className="whitespace-no-wrap hidden py-4 text-sm font-normal  sm:px-3 lg:table-cell">62345231143</td>

                                <td className="whitespace-no-wrap hidden py-4 text-sm font-normal  sm:px-3 lg:table-cell">Desktop Computer</td>
                                <td className="whitespace-no-wrap hidden py-4 text-left text-sm  sm:px-3 lg:table-cell lg:text-left">Jane Doeson</td>
                                <td className="whitespace-no-wrap hidden py-4 text-left text-sm  sm:px-3 lg:table-cell lg:text-left">24 x 10 x 5 cm</td>
                                <td className="whitespace-no-wrap hidden py-4 text-left text-sm  sm:px-3 lg:table-cell lg:text-left">1.0 Kg</td>
                                <td className="whitespace-no-wrap py-4 text-right text-sm  sm:px-3 lg:text-left">
                                    $59.00
                                    <span className="mt-1 ml-auto block w-fit whitespace-nowrap rounded-full bg-blue-100 px-2 py-0.5 text-center text-xs text-blue-800 lg:hidden">Pending</span>
                                </td>

                                <td className="whitespace-no-wrap hidden py-4 text-sm font-normal  sm:px-3 lg:table-cell">
                                    <span className="ml-2 mr-3 whitespace-nowrap rounded-full bg-blue-100 px-2 py-0.5 text-blue-800">Pending</span>
                                </td>
                            </tr>
                            <tr className="border-b">
                                <td className="whitespace-no-wrap py-4 text-left text-sm  sm:px-3 lg:text-left">
                                    07 February, 2022
                                    <div className="mt-1 flex flex-col text-xs font-medium lg:hidden">
                                        <div className="flex items-center">

                                            Jane Doeson
                                        </div>
                                        <div className="flex items-center">

                                            Desktop Computer
                                        </div>
                                        <div className="">24 x 10 x 5 cm</div>
                                        <div className="flex items-center">

                                            1 Kg
                                        </div>
                                    </div>
                                </td>

                                <td className="whitespace-no-wrap hidden py-4 text-sm font-normal  sm:px-3 lg:table-cell">62345231143</td>

                                <td className="whitespace-no-wrap hidden py-4 text-sm font-normal  sm:px-3 lg:table-cell">Desktop Computer</td>
                                <td className="whitespace-no-wrap hidden py-4 text-left text-sm  sm:px-3 lg:table-cell lg:text-left">Jane Doeson</td>
                                <td className="whitespace-no-wrap hidden py-4 text-left text-sm  sm:px-3 lg:table-cell lg:text-left">24 x 10 x 5 cm</td>
                                <td className="whitespace-no-wrap hidden py-4 text-left text-sm  sm:px-3 lg:table-cell lg:text-left">1.0 Kg</td>
                                <td className="whitespace-no-wrap py-4 text-right text-sm  sm:px-3 lg:text-left">
                                    $59.00
                                    <span className="mt-1 ml-auto block w-fit whitespace-nowrap rounded-full bg-green-100 px-2 py-0.5 text-center text-xs text-green-800 lg:hidden">Delivered</span>
                                </td>

                                <td className="whitespace-no-wrap hidden py-4 text-sm font-normal  sm:px-3 lg:table-cell">
                                    <span className="ml-2 mr-3 whitespace-nowrap rounded-full bg-green-100 px-2 py-0.5 text-green-800">Delivered</span>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}

export default Summary;