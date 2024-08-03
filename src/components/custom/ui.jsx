"use client"

import { useEffect, useState } from "react"

export const Background = (props) => (
    <div className={"min-h-screen flex flex-col p-0 m-0 bg-gradient-to-tr from-blue-50 via-cyan-50 to-yellow-100 " + props.className}>
        {props.children}
    </div>
)

export const LoadingFootball = (props) => (
    <div className="flex items-center justify-center w-full h-[100vh] text-gray-900 dark:text-gray-100 dark:bg-gray-950">
        <div>
            <h1 className="flex items-center text-xl font-bold md:text-7xl">L<svg stroke="currentColor" fill="currentColor" strokeWidth="0"
                viewBox="0 0 24 24" className="animate-spin" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2ZM13.6695 15.9999H10.3295L8.95053 17.8969L9.5044 19.6031C10.2897 19.8607 11.1286 20 12 20C12.8714 20 13.7103 19.8607 14.4956 19.6031L15.0485 17.8969L13.6695 15.9999ZM5.29354 10.8719L4.00222 11.8095L4 12C4 13.7297 4.54894 15.3312 5.4821 16.6397L7.39254 16.6399L8.71453 14.8199L7.68654 11.6499L5.29354 10.8719ZM18.7055 10.8719L16.3125 11.6499L15.2845 14.8199L16.6065 16.6399L18.5179 16.6397C19.4511 15.3312 20 13.7297 20 12L19.997 11.81L18.7055 10.8719ZM12 9.536L9.656 11.238L10.552 14H13.447L14.343 11.238L12 9.536ZM14.2914 4.33299L12.9995 5.27293V7.78993L15.6935 9.74693L17.9325 9.01993L18.4867 7.3168C17.467 5.90685 15.9988 4.84254 14.2914 4.33299ZM9.70757 4.33329C8.00021 4.84307 6.53216 5.90762 5.51261 7.31778L6.06653 9.01993L8.30554 9.74693L10.9995 7.78993V5.27293L9.70757 4.33329Z">
                </path>
            </svg> ading . . .</h1>
        </div>
    </div>
)

export const Loading = () => (
    <div className="flex justify-center items-center h-screen">
        <div className="relative">
            <div className="w-24 h-24 rounded-full border-t-8 border-b-8 border-gray-200"></div>
            <div className="absolute top-0 left-0 w-24 h-24 rounded-full border-t-8 border-b-8 border-blue-500 animate-spin">
            </div>
        </div>
    </div>
)

export const LoadingDots = () => (
    <div className='flex justify-center items-center space-x-2 h-screen bg-white dark:invert'>
        <span className='sr-only'>Loading...</span>
        <div className='h-8 w-8 bg-black rounded-full animate-bounce [animation-delay:-0.3s]'></div>
        <div className='h-8 w-8 bg-black rounded-full animate-bounce [animation-delay:-0.15s]'></div>
        <div className='w-8 h-8 bg-black rounded-full animate-bounce'></div>
    </div>
)

export const LoadingExamples = () => (
    <div className="flex flex-wrap gap-4 justify-center p-4">
        <img className="w-20 h-20 animate-spin" src="https://www.svgrepo.com/show/173880/loading-arrows.svg" alt="Loading icon" />
        <img className="w-20 h-20 animate-spin" src="https://www.svgrepo.com/show/491270/loading-spinner.svg" alt="Loading icon" />
        <img className="w-20 h-20 animate-spin" src="https://www.svgrepo.com/show/474682/loading.svg" alt="Loading icon" />
        <img className="w-20 h-20 animate-spin" src="https://www.svgrepo.com/show/199956/loading-loader.svg" alt="Loading icon" />
        <img className="w-20 h-20 animate-spin" src="https://www.svgrepo.com/show/169757/loading-process.svg" alt="Loading icon" />
        <img className="w-20 h-20 animate-spin" src="https://www.svgrepo.com/show/70469/loading.svg" alt="Loading icon" />
        <img className="w-20 h-20 animate-spin" src="https://www.svgrepo.com/show/448500/loading.svg" alt="Loading icon" />
    </div>
)

export const Toast = (props) => {
    const toast = props.toast || {}
    const display = toast?.display || false
    const message = toast?.message || ''
    const status_ = toast?.status || status.LOADING

    const position = display && "-translate-x-72"

    return (
        <div className={`fixed bottom-20 w-60 transition-all ease-in-out min-w-fit left-[100vw] ${position}`}>
            <div id="toast" className="flex items-center p-4 w-full max-w-xs text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800" role="alert">
                <div className="flex mr-2 align-middle size-7">
                    {(status_ == status.LOADING) && (
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
                            <radialGradient id="a12" cx=".66" fx=".66" cy=".3125" fy=".3125" gradientTransform="scale(1.5)">
                                <stop offset="0" stopColor="#1E7DFF"></stop>
                                <stop offset=".3" stopColor="#1E7DFF" stopOpacity=".9"></stop>
                                <stop offset=".6" stopColor="#1E7DFF" stopOpacity=".6"></stop>
                                <stop offset=".8" stopColor="#1E7DFF" stopOpacity=".3"></stop>
                                <stop offset="1" stopColor="#1E7DFF" stopOpacity="0"></stop>
                            </radialGradient>
                            <circle transformOrigin="center" fill="none" stroke="url(#a12)" strokeWidth="15" strokeLinecap="round" strokeDasharray="200 1000" strokeDashoffset="0" cx="100" cy="100" r="70">
                                <animateTransform type="rotate" attributeName="transform" calcMode="spline" dur="2" values="360;0" keyTimes="0;1" keySplines="0 0 1 1" repeatCount="indefinite"></animateTransform>
                            </circle>
                            <circle transformOrigin="center" fill="none" opacity=".2" stroke="#1E7DFF" strokeWidth="15" strokeLinecap="round" cx="100" cy="100" r="70">
                            </circle>
                        </svg>
                    )}
                    {status_ == status.SUCCESS && (
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#30AF77">
                            <path d="M9 19c-.26 0-.51-.1-.71-.29l-6-6A.996.996 0 1 1 3.7 11.3l5.29 5.29L20.28 5.3a.996.996 0 1 1 1.41 1.41l-12 12c-.2.2-.45.29-.71.29Z"></path>
                        </svg>
                    )}
                </div>
                <div className="text-sm font-normal">
                    {message}
                </div>
                <div className="flex items-center space-x-2 ms-auto rtl:space-x-reverse">
                    <button type="button"
                        className="ms-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700"
                        data-dismiss="#toast"
                        aria-label="Close"
                        onClick={() => {
                            setVisible(false)
                        }}
                    >
                        <span className="sr-only">Close</span>
                        <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    )
}

export const status = {
    'LOADING': 'Loading',
    'SUCCESS': 'Success',
    'ERROR': 'Error'
}