import React, { useState } from 'react'



const CatogorySideBar = ({ openSideBar, setOpenSideBar }) => {


    return (
        <div onClick={(e) => e.stopPropagation()} className={`fixed top-0 left-0 w-[60vw] sm:w-[40vw]  bg-gray-200 space-y-5 z-30 h-screen ${!openSideBar && '-translate-x-[60vw]'} ease-in-out transition-all duration-1000 p-5 bg-white border-[0.01px] border-gray-500`}>
            <div className='mb-5 h-5 pb-8 flex justify-end border-b-gray-300 relative border-b-[0.01px]' >
                <button onClick={() => setOpenSideBar(false)} className='mr-2'>X</button>
            </div>


            {/* catoegories will come here */}

            <div className='p-3 text-xl '>
                <div className='font-semibold p-2'>
                    Shop By Categories
                </div>
                <div className='p-2  h-12 flex items-center font-thin hover:bg-white  hover:border-l-blue-600 hover:border-l-2 '>
                    <h2 className='text-lg'>Mens</h2>
                </div>
                <div className='p-2  h-12 flex items-center font-thin hover:bg-white  hover:border-l-blue-600 hover:border-l-2 '>
                    <h2 className='text-lg'>Mens</h2>
                </div>
                <div className='p-2  h-12 flex items-center font-thin hover:bg-white  hover:border-l-blue-600 hover:border-l-2 '>
                    <h2 className='text-lg'>Mens</h2>
                </div>
            </div>





        </div>
    )
}

export default CatogorySideBar
