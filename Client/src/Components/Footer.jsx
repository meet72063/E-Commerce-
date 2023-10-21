import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPhone } from '@fortawesome/free-solid-svg-icons'
import { faFacebook } from '@fortawesome/free-brands-svg-icons'

const Footer = () => {
    return (

        <div className=' w-full  border-[0.1px] border-t-zinc-300 grid md:grid-cols-8 gap-10 py-9 justify-center  bg-[#f5ebe0]'>
            <div className='md:col-span-2 md:col-start-2 space-y-3 flex-col text-center md:text-left border-[0.01px] md:border-r-blue-gray-200 '>
                <h2 className='font-semibold'>CUSTOMER SERVICE</h2>
                <div className='space-y-1 text-gray-700 flex flex-col'>
                    <a href='#'>Contact Us</a>
                    <a href='#'>Sell With Us</a>
                    <a href='#'>Shipping</a>
                </div>

            </div>
            <div className='md:col-span-2 md:col-start-4 space-y-3 text-center md:text-left border-[0.01px] md:border-r-blue-gray-200'>
                <h2 className='font-semibold '>LINKS</h2>
                <div className='space-y-1 text-gray-700 flex flex-col'>
                    <a href='#'>Contact Us</a>
                    <a href='#'>Sell With Us</a>
                    <a href='#'>Shipping</a>
                </div>

            </div>
            <div className='md:col-span-2 md:col-start-6 space-y-3 text-center md:text-left'>
                <h2 className='font-semibold mb-3'>
                    Contact Us
                </h2>
                <a href="#" className="text-blue-800 flex items-center space-x-2  ">
                    <FontAwesomeIcon icon={faFacebook} size="2x" /> <span className='text-gray-700'>facebook</span>
                </a>

            </div>


        </div>
    )
}

export default Footer
