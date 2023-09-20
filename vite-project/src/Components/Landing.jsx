import React from 'react'
import Carousel from '../Components/Carousel'

const Landing = () => {
    return (
        <>
            <div className=' grid grid-cols-1 md:grid-cols-10 gap-3 h-full   xl:h-96 items-center  '>
                <div className='md:col-span-2 order-2 md:order-1 '>
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQpyuMp65A-8fxfYs0zcMXbD1LuYJv9NWQK9w&usqp=CAU" alt="" className='w-full ' />

                </div>

                <div className='md:col-span-6 md:col-start-3 order-1  '>
                    <Carousel />
                </div>

                <div className='md:col-span-2 py-3 order-3' >
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTfgf2rIiI5uaxvJk1oyVM4YN4Z0vImEl8oGw&usqp=CAU" alt="" className='w-full' />
                </div>

            </div>
        </>
    )
}



export default Landing
